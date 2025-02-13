import {Address, BigInt, ByteArray, crypto, ethereum, log} from '@graphprotocol/graph-ts'
import {Fill as FillEvent,} from "../generated/ExclusiveDutchOrderReactor/ExclusiveDutchOrderReactor"
import {Fill, Swap, SwapDaily, SwapTotal} from "../generated/schema"
import {
  bytesToBigInt,
  fetchTokenSymbol,
  fetchTokenUsdValue,
  formatTimestamp,
  getFeesAddress,
  getOrderOutput,
  hexStringToAmount,
} from "./utils/utils"
import {NATIVE_ASSET, SWAP_TOTAL_ID, TREASURY_ADDRESS} from "./utils/constants";

export function calcMetrics(swap: Swap): void {
  // store daily volume
  const day = swap.timestamp.slice(0, 10)
  let daily = SwapDaily.load(day)
  if (daily == null) {
    daily = new SwapDaily(day)
    daily.date = day
    daily.dailyTotalCalculatedValue = swap.dollarValue
    daily.dailyCount = 1
  }
  else {
    daily.dailyTotalCalculatedValue = daily.dailyTotalCalculatedValue + swap.dollarValue
    daily.dailyCount += 1
  }
  daily.save()

  // store cumulative volume
  let total = SwapTotal.load(SWAP_TOTAL_ID)
  if (total == null) {
    total = new SwapTotal(SWAP_TOTAL_ID)
    total.cumulativeTotalCalculatedValue = swap.dollarValue
    total.totalCount = 1
  }
  else {
    total.cumulativeTotalCalculatedValue = total.cumulativeTotalCalculatedValue + swap.dollarValue
    total.totalCount += 1
  }
  total.save()
}

export function handleFill(event: FillEvent): void {
  // TODO: will have to change once we introduce multi-orders AND once we implement swapper != receiver
  const id = event.transaction.hash.concatI32(event.logIndex.toI32());
  let fill = new Fill(id)
  fill.orderHash = event.params.orderHash
  fill.filler = event.params.filler
  fill.swapper = event.params.swapper
  fill.nonce = event.params.nonce
  fill.blockNumber = event.block.number
  fill.blockTimestamp = event.block.timestamp
  fill.transactionHash = event.transaction.hash
  fill.save()

  let swap = new Swap(id)
  swap.txHash = event.transaction.hash
  swap.timestamp = formatTimestamp(event.block.timestamp)
  swap.userAddress = event.params.swapper.toHexString()

  log.debug('txHash: {}', [swap.txHash.toHexString()])

  const executorAddress = event.params.filler.toHexString()
  swap.executorAddress = executorAddress
  const feesAddress: string = getFeesAddress(event, executorAddress);

  // TODO: change in case of contract changes
  const orderOutput: Array<ethereum.Value> = getOrderOutput(event, executorAddress)

  let swapperOutputs: Array<ethereum.Tuple> = [];
  for (let i = 0; i < orderOutput.length; i++) {
    const output = orderOutput[i].toTuple()
    const outputAddress = output.at(-1).toAddress().toHexString()
    if (outputAddress == swap.userAddress) {
      swapperOutputs.push(output);
    }
    else if (outputAddress == TREASURY_ADDRESS) {
      swap.gasFees = output.at(1).toBigInt().toString()
    }
  }
  const outputTokenAddress = swapperOutputs[0].at(0).toAddress()
  swap.dstTokenAddress = outputTokenAddress.toHexString()
  let dexAmountOut = BigInt.fromString("0")

  if (outputTokenAddress == Address.zero()) { // zero address indicates that this is not a token but native asset
    swap.dstTokenSymbol = NATIVE_ASSET;
    // swapper might get multiple outputs (e.g. fee refund). Need to find the biggest one and use the average between min and max amount out
    for (let i = 0; i < swapperOutputs.length; i++) {
      const swapperOutput = swapperOutputs[i]
      const minAmount = swapperOutput.at(1).toBigInt()
      const maxAmount = swapperOutput.at(2).toBigInt()
      const avg = ((minAmount+maxAmount)/BigInt.fromString("2"))
      dexAmountOut = avg > dexAmountOut ? avg : dexAmountOut
    }
  }
  else {
    swap.dstTokenSymbol = fetchTokenSymbol(outputTokenAddress)
  }

  const TRANSFER = "Transfer(address,address,uint256)";
  const transferSignature = crypto.keccak256(ByteArray.fromUTF8(TRANSFER));
  const logs = event.receipt!.logs;
  for (let i = 0; i < logs.length; i++) {
    const thisLog = logs[i];
    const logSignature = thisLog.topics[0];
    if (logSignature == transferSignature) {
      const from = "0x" + thisLog.topics.at(1).toHexString().slice(26) // remove leading zeroes
      const to = "0x" + thisLog.topics.at(2).toHexString().slice(26) // remove leading zeroes
      if (!swap.srcAmount && from == swap.userAddress && to == executorAddress) { // first Transfer from the swapper into the contract
        swap.srcAmount = hexStringToAmount(thisLog.data);
        swap.srcTokenAddress = thisLog.address.toHexString()
        swap.srcTokenSymbol = fetchTokenSymbol(thisLog.address)
      }
      else if (from == executorAddress && to == swap.userAddress) {
        dexAmountOut = dexAmountOut + bytesToBigInt(thisLog.data)!
      }
      else if (to == feesAddress && thisLog.address.toHexString() == swap.dstTokenAddress) {
        swap.fees = hexStringToAmount(thisLog.data);
      }
      else if (!swap.gasFees && to == TREASURY_ADDRESS && thisLog.address.toHexString() == swap.dstTokenAddress) {
        swap.gasFees = hexStringToAmount(thisLog.data);
      }
    }
  }
  swap.dexAmountOut = dexAmountOut.toString()
  swap.dollarValue = fetchTokenUsdValue(swap);
  swap.save();

  calcMetrics(swap)
}
