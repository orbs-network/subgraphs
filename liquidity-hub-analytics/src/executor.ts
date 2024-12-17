import {Address, BigDecimal, BigInt, ByteArray, crypto, log} from '@graphprotocol/graph-ts'
import {Resolved as ResolvedEvent, Surplus as SurplusEvent} from "../generated/ExecutorV5/Executor"
import {Resolved, Surplus, Swap, ExtraOut} from "../generated/schema"
import {ExtraOut as ExtraOutEvent} from "../generated/ExecutorV6/Executor"
import {fetchTokenSymbol, fetchTokenUsdValue, formatTimestamp, hexStringToAmount,} from "./utils/utils"
import {NATIVE_ASSET, TREASURY_ADDRESS, TREASURY_ADDRESS_NEW} from "./utils/constants";
import {calcMetrics} from "./exclusive-dutch-order-reactor";

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
      const to = "0x" + thisLog.topics.at(2).toHexString().slice(26) // remove leading zeroes
      if ((to == TREASURY_ADDRESS || to == TREASURY_ADDRESS_NEW) && thisLog.address.toHexString() == dstTokenAddress) {
        gasFees = hexStringToAmount(thisLog.data);
      }
    }
  }

  let swap = Swap.load(id)
  if (swap == null) {
    swap = new Swap(id)
    swap.dexAmountOut = dexAmountOut.toString()
  }
  else {
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

  const userSurplus = event.params.amount - event.params.refshare
  let swap = Swap.load(id)
  if (swap != null) {
    const dexAmountOut = swap.dexAmountOut != null ? BigInt.fromString(swap.dexAmountOut!) : BigInt.fromString("0")
    swap.dexAmountOut = (dexAmountOut + userSurplus).toString()
    swap.dollarValue = fetchTokenUsdValue(swap);
  }
  else {
    swap = new Swap(id)
    swap.userAddress = ""
    swap.dollarValue = BigDecimal.fromString("0")
    swap.executorAddress = ""
    swap.timestamp = ""
    swap.txHash = event.transaction.hash
    swap.dexAmountOut = userSurplus.toString()
  }
  swap.fees = event.params.refshare.toString()
  swap.save()
}

export function handleResolvedV6(event: ResolvedEvent): void {
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

  const dstTokenAddress = event.params.outToken.toHexString()
  const dexAmountOut = event.params.outAmount

  let swap = Swap.load(id)
  if (swap == null) {
    swap = new Swap(id)
    swap.dexAmountOut = dexAmountOut.toString()
  }
  else {
    swap.dexAmountOut = (BigInt.fromString(swap.dexAmountOut!) + dexAmountOut).toString()
  }

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

export function handleExtraOut(event: ExtraOutEvent): void {
  const id = event.transaction.hash
  let entity = new ExtraOut(id)
  entity.recipient = event.params.recipient
  entity.token = event.params.token
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let swap = Swap.load(id)
  if (swap == null) {
    swap = new Swap(id)
    swap.userAddress = ""
    swap.dollarValue = BigDecimal.fromString("0")
    swap.executorAddress = ""
    swap.timestamp = ""
    swap.txHash = event.transaction.hash
  }
  // if (event.params.recipient.toHexString() == TREASURY_ADDRESS_NEW) {
    swap.gasFees = event.params.amount.toString()
  // }
}