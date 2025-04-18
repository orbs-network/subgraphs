import {Address, BigDecimal, crypto, log, ByteArray} from '@graphprotocol/graph-ts'
import {fetchTokenSymbol, fetchUSDValue, formatTimestamp, hexStringToAmount,} from "./utils/utils"
import {TWAP_ADDRESS, getDexByRouter, FEES_ADDRESS} from "./utils/constants";
import {OrderFilled as OrderFilledEvent, OrderCreated as OrderCreatedEvent, OrderCompleted as OrderCompletedEvent, OrderCanceled as OrderCanceledEvent, TWAP} from "../generated/TWAP/TWAP"
import {OrderFilled, FilledDaily, FilledTotal, DailyActiveUsers, OrderCreated, CreatedDaily, CreatedTotal, Status, StatusNew, OutputTokens} from "../generated/schema"

function saveOutputToken(dstTokenAddress: string): void {
  // save a list of distinct output token addresses (used for token refinery)
  let outputTokens = OutputTokens.load("OutputTokens")
  if (outputTokens == null) {
    outputTokens = new OutputTokens("OutputTokens")
    outputTokens.tokenAddresses = [dstTokenAddress]
  } else {
    const tokens = outputTokens.tokenAddresses
    if (!tokens.includes(dstTokenAddress)) {
      tokens.push(dstTokenAddress)
      outputTokens.tokenAddresses = tokens
    }
  }
  outputTokens.save()
}

export function handleOrderFilled(event: OrderFilledEvent): void {
  let entity = new OrderFilled(
      event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.TWAP_id = event.params.id.toU32()
  entity.twapAddress = event.address.toHexString()
  entity.userAddress = event.params.maker
  entity.exchange = event.params.exchange
  entity.taker = event.params.taker
  entity.srcAmountIn = event.params.srcAmountIn.toString()
  entity.dstAmountOut = event.params.dstAmountOut.toString()
  entity.dstFee = event.params.dstFee
  entity.srcFilledAmount = event.params.srcFilledAmount

  entity.type = entity.srcAmountIn == entity.srcFilledAmount.toString() ? "LIMIT" : "TWAP"

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.timestamp = formatTimestamp(event.block.timestamp)
  entity.dex = getDexByRouter(event.params.exchange.toHexString())

  const twapContract = TWAP.bind(Address.fromString(TWAP_ADDRESS));
  const order = twapContract.order(event.params.id)
  const askTuple = order.at(6).toTuple()
  const srcTokenAddress = askTuple.at(1).toAddress()
  const dstTokenAddress = askTuple.at(2).toAddress()
  entity.srcTokenAddress = srcTokenAddress.toHexString()
  entity.dstTokenAddress = dstTokenAddress.toHexString()
  entity.srcTokenSymbol = fetchTokenSymbol(srcTokenAddress)
  entity.dstTokenSymbol = fetchTokenSymbol(dstTokenAddress)

  entity.dollarValueIn = fetchUSDValue(entity.srcTokenSymbol!, entity.srcTokenAddress!) * BigDecimal.fromString(event.params.srcAmountIn.toString())
  entity.dollarValueOut = fetchUSDValue(entity.dstTokenSymbol!, entity.dstTokenAddress!) * BigDecimal.fromString(event.params.dstAmountOut.toString())
  let dollarValue: BigDecimal = entity.dollarValueOut;
  if (entity.dollarValueIn != BigDecimal.zero()) {
    dollarValue = entity.dollarValueIn
  }

  const TRANSFER = "Transfer(address,address,uint256)";
  const transferSignature = crypto.keccak256(ByteArray.fromUTF8(TRANSFER));
  const logs = event.receipt!.logs;
  for (let i = 0; i < logs.length; i++) {
    const thisLog = logs[i];
    const logSignature = thisLog.topics[0];
    if (logSignature == transferSignature) {
      const to = "0x" + thisLog.topics.at(2).toHexString().slice(26) // remove leading zeroes
      if (to == FEES_ADDRESS) {
        entity.dexFee = hexStringToAmount(thisLog.data);
        break
      }
    }
  }

  entity.save()

 // store daily volume
  const day = entity.timestamp.slice(0, 10)
  const key = `${entity.dex}_${day}`
  let daily = FilledDaily.load(key)
  if (daily == null) {
    daily = new FilledDaily(key)
    daily.date = day
    daily.dailyTotalCalculatedValue = dollarValue
    daily.dailyCount = 1
    daily.dex = entity.dex
  }
  else {
    daily.dailyTotalCalculatedValue = daily.dailyTotalCalculatedValue + dollarValue
    daily.dailyCount += 1
  }
  daily.save()

  // store cumulative volume
  let total = FilledTotal.load(entity.dex)
  if (total == null) {
    total = new FilledTotal(entity.dex)
    total.cumulativeTotalCalculatedValue = dollarValue
    total.totalCount = 1
  }
  else {
    total.cumulativeTotalCalculatedValue = total.cumulativeTotalCalculatedValue + dollarValue
    total.totalCount += 1
  }
  total.save()

  saveOutputToken(dstTokenAddress.toHexString())
}

export function handleOrderCreated(event: OrderCreatedEvent): void {
  let entity = new OrderCreated(
      event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Contract_id = event.params.id
  entity.twapAddress = event.address.toHexString()
  entity.maker = event.params.maker
  entity.exchange = event.params.exchange
  entity.ask_exchange = event.params.ask.exchange
  entity.ask_srcToken = event.params.ask.srcToken
  entity.ask_dstToken = event.params.ask.dstToken
  entity.ask_srcAmount = event.params.ask.srcAmount
  entity.ask_srcBidAmount = event.params.ask.srcBidAmount
  entity.ask_dstMinAmount = event.params.ask.dstMinAmount
  entity.ask_deadline = event.params.ask.deadline
  entity.ask_bidDelay = event.params.ask.bidDelay
  entity.ask_fillDelay = event.params.ask.fillDelay
  entity.ask_data = event.params.ask.data

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.timestamp = formatTimestamp(event.block.timestamp)

  entity.srcTokenSymbol = fetchTokenSymbol(Address.fromBytes(entity.ask_srcToken))
  entity.dstTokenSymbol = fetchTokenSymbol(Address.fromBytes(entity.ask_dstToken))
  entity.dex = getDexByRouter(entity.exchange.toHexString())

  entity.type = entity.ask_srcAmount == entity.ask_srcBidAmount ? "LIMIT" : "TWAP"

  // log.info('ask_srcToken: {}', [entity.ask_srcToken.toHexString()])
  // log.info('ask_dstToken: {}', [entity.ask_dstToken.toHexString()])
  // log.info('srcTokenSymbol/assetName: {}', [entity.srcTokenSymbol!])
  // log.info('dstTokenSymbol: {}', [entity.dstTokenSymbol!])

  entity.dollarValueIn = fetchUSDValue(entity.srcTokenSymbol!, entity.ask_srcToken.toHexString()) * BigDecimal.fromString(entity.ask_srcAmount.toString())

  entity.save()

  let statusEntity = new Status(event.params.id.toString())
  statusEntity.save()

  const id = `${event.address.toHexString()}_${event.params.id.toString()}`
  let statusNewEntity = new StatusNew(id)
  statusNewEntity.twapId = event.params.id.toString()
  statusNewEntity.twapAddress = event.address.toHexString()
  statusNewEntity.save()

  const day = entity.timestamp.slice(0, 10)
  const key = `${entity.dex}_${day}`

  // store daily volume
  let daily = CreatedDaily.load(key)
  if (daily == null) {
    daily = new CreatedDaily(key)
    daily.date = day
    // daily.dailyTotalCalculatedValue = entity.dollarValueIn
    daily.dailyCount = 1
    daily.dex = entity.dex
  }
  else {
    // daily.dailyTotalCalculatedValue = daily.dailyTotalCalculatedValue + entity.dollarValueIn
    daily.dailyCount += 1
  }
  daily.save()

  // store cumulative volume
  let total = CreatedTotal.load(entity.dex)
  if (total == null) {
    total = new CreatedTotal(entity.dex)
    // total.cumulativeTotalCalculatedValue = entity.dollarValueIn
    total.totalCount = 1
  }
  else {
    // total.cumulativeTotalCalculatedValue = total.cumulativeTotalCalculatedValue + entity.dollarValueIn
    total.totalCount += 1
  }
  total.save()

  // DAUs
  const userAddress = entity.maker.toHexString()
  let dau = DailyActiveUsers.load(key)
  if (dau == null) {
    dau = new DailyActiveUsers(key)
    dau.count = 1
    dau.userAddresses = [userAddress]
  }
  else {
    if (!dau.userAddresses.includes(userAddress)) {
      dau.count += 1
      let userAddresses = dau.userAddresses
      userAddresses.push(userAddress)
      dau.userAddresses = userAddresses
    }
  }
  dau.save()
}

export function handleOrderCompleted(event: OrderCompletedEvent): void {
  let entity = Status.load(event.params.id.toString())
  if (entity != null) {
    entity.status = "COMPLETED"
    entity.save()
  }

  const idNew = `${event.address.toHexString()}_${event.params.id.toString()}`
  let entityNew = StatusNew.load(idNew)
  if (entityNew != null) {
    entityNew.status = "COMPLETED"
    entityNew.save()
  }
}

export function handleOrderCanceled(event: OrderCanceledEvent): void {
  let entity = Status.load(event.params.id.toString())
  if (entity != null) {
    entity.status = "CANCELED"
    entity.save()
  }

  const idNew = `${event.address.toHexString()}_${event.params.id.toString()}`
  let entityNew = StatusNew.load(idNew)
  if (entityNew != null) {
    entityNew.status = "CANCELED"
    entityNew.save()
  }
}
