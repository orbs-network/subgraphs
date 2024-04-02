import {Address, BigDecimal} from '@graphprotocol/graph-ts'
import {fetchTokenSymbol, fetchUSDValue, formatTimestamp,} from "./utils/utils"
import {TWAP_ADDRESS, FILLED_TOTAL_ID, getDexByRouter} from "./utils/constants";
import {OrderFilled as OrderFilledEvent, TWAP} from "../generated/TWAP/TWAP"
import {OrderFilled, FilledDaily, FilledTotal} from "../generated/schema"

export function handleOrderFilled(event: OrderFilledEvent): void {
  let entity = new OrderFilled(
      event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.TWAP_id = event.params.id.toU32()
  entity.userAddress = event.params.maker
  entity.exchange = event.params.exchange
  entity.taker = event.params.taker
  entity.srcAmountIn = event.params.srcAmountIn.toString()
  entity.dstAmountOut = event.params.dstAmountOut.toString()
  entity.dstFee = event.params.dstFee
  entity.srcFilledAmount = event.params.srcFilledAmount

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
  let dollarValue: BigDecimal = entity.dollarValueIn;
  if (entity.dollarValueOut != BigDecimal.zero()) {
    dollarValue = entity.dollarValueOut
  }

  entity.save()

  // // store daily volume
  const day = entity.timestamp.slice(0, 10)
  let daily = FilledDaily.load(day)
  if (daily == null) {
    daily = new FilledDaily(day)
    daily.date = day
    daily.dailyTotalCalculatedValue = dollarValue
    daily.dailyCount = 1
  }
  else {
    daily.dailyTotalCalculatedValue = daily.dailyTotalCalculatedValue + dollarValue
    daily.dailyCount += 1
  }
  daily.save()

  // store cumulative volume
  let total = FilledTotal.load(FILLED_TOTAL_ID)
  if (total == null) {
    total = new FilledTotal(FILLED_TOTAL_ID)
    total.cumulativeTotalCalculatedValue = dollarValue
    total.totalCount = 1
  }
  else {
    total.cumulativeTotalCalculatedValue = total.cumulativeTotalCalculatedValue + dollarValue
    total.totalCount += 1
  }
  total.save()
}
