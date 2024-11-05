import {Address, BigDecimal, BigInt, ByteArray, crypto, log} from '@graphprotocol/graph-ts'
import {Resolved as ResolvedEvent, Surplus as SurplusEvent} from "../generated/ExecutorV5/Executor"
import {Resolved, Surplus, Swap, SwapDaily, SwapTotal} from "../generated/schema"

import {fetchTokenSymbol, fetchTokenUsdValue, formatTimestamp, hexStringToAmount,} from "./utils/utils"
import {NATIVE_ASSET, SWAP_TOTAL_ID, TREASURY_ADDRESS, TREASURY_ADDRESS_NEW} from "./utils/constants";

function calcMetrics(swap: Swap): void {
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

export function handleResolved(event: ResolvedEvent): void {
  const id = event.transaction.hash;

  let entity = new Resolved(id)
  entity.orderHash = event.params.orderHash
  entity.swapper = event.params.swapper
  entity.ref = event.params.ref
  entity.inToken = event.params.inToken
  entity.outToken = event.params.outToken
  entity.inAmount = event.params.inAmount
  entity.outAmount = event.params.outAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  log.debug('txHash: {}', [event.transaction.hash.toHexString()])

  let fees = "0"
  let gasFees = "0"
  const dstTokenAddress = event.params.outToken.toHexString()
  const dexAmountOut = event.params.outAmount

  const TRANSFER = "Transfer(address,address,uint256)";
  const transferSignature = crypto.keccak256(ByteArray.fromUTF8(TRANSFER));
  const logs = event.receipt!.logs;
  for (let i = 0; i < logs.length; i++) {
    const thisLog = logs[i];
    const logSignature = thisLog.topics[0];
    if (logSignature == transferSignature) {
      const from = "0x" + thisLog.topics.at(1).toHexString().slice(26) // remove leading zeroes
      const to = "0x" + thisLog.topics.at(2).toHexString().slice(26) // remove leading zeroes
      // if (to == event.params.ref.toHexString()) {
      //   fees = hexStringToAmount(thisLog.data);
      // }
      if ((to == TREASURY_ADDRESS || to == TREASURY_ADDRESS_NEW) && thisLog.address.toHexString() == dstTokenAddress) {
        gasFees = hexStringToAmount(thisLog.data);
      }
    }
  }

  let swap = Swap.load(id)
  if (swap == null) {
    swap = new Swap(id)
    swap.fees = fees
    swap.dexAmountOut = dexAmountOut.toString()
  }
  else {
    swap.fees = (BigInt.fromString(swap.fees!) + BigInt.fromString(fees)).toString()
    swap.dexAmountOut = (BigInt.fromString(swap.dexAmountOut!) + dexAmountOut).toString()
  }

  swap.gasFees = gasFees
  swap.txHash = event.transaction.hash
  swap.timestamp = formatTimestamp(event.block.timestamp)
  swap.userAddress = event.params.swapper.toHexString()

  swap.executorAddress = event.address.toHexString()
  swap.srcTokenAddress = event.params.inToken.toHexString()
  swap.srcTokenSymbol = fetchTokenSymbol(event.params.inToken)
  swap.dstTokenAddress = dstTokenAddress
  swap.dstTokenSymbol = event.params.outToken == Address.zero() ? NATIVE_ASSET : fetchTokenSymbol(event.params.outToken)
  swap.srcAmount = event.params.inAmount.toString()

  swap.dollarValue = fetchTokenUsdValue(swap);
  swap.save();

  calcMetrics(swap)
}

export function handleSurplus(event: SurplusEvent): void {
  const id = event.transaction.hash
  let entity = new Surplus(id)
  entity.swapper = event.params.swapper
  entity.ref = event.params.ref
  entity.token = event.params.token
  entity.amount = event.params.amount
  entity.refshare = event.params.refshare

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let swap = Swap.load(id)
  if (swap != null) {
    const fees = swap.fees != null ? BigInt.fromString(swap.fees!) : BigInt.fromString("0")
    const dexAmountOut = swap.dexAmountOut != null ? BigInt.fromString(swap.dexAmountOut!) : BigInt.fromString("0")
    swap.fees = (fees + event.params.refshare).toString()
    swap.dexAmountOut = (dexAmountOut + event.params.amount - event.params.refshare).toString()
    swap.dollarValue = fetchTokenUsdValue(swap);
    swap.save()
    calcMetrics(swap)
  }
  else {
    swap = new Swap(id)
    swap.userAddress = ""
    swap.dollarValue = BigDecimal.fromString("0")
    swap.executorAddress = ""
    swap.timestamp = ""
    swap.txHash = event.transaction.hash
    swap.fees = event.params.refshare.toString()
    swap.dexAmountOut = (event.params.amount - event.params.refshare).toString()
    swap.save()
  }
}
