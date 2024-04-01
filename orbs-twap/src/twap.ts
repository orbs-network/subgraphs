import {
  OrderBid as OrderBidEvent,
  OrderCanceled as OrderCanceledEvent,
  OrderCompleted as OrderCompletedEvent,
  OrderCreated as OrderCreatedEvent,
  OrderFilled as OrderFilledEvent
} from "../generated/TWAP/TWAP"
import {
  OrderBid,
  OrderCanceled,
  OrderCompleted,
  OrderCreated,
  OrderFilled
} from "../generated/schema"

export function handleOrderBid(event: OrderBidEvent): void {
  let entity = new OrderBid(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.TWAP_id = event.params.id
  entity.maker = event.params.maker
  entity.exchange = event.params.exchange
  entity.slippagePercent = event.params.slippagePercent
  entity.bid_time = event.params.bid.time
  entity.bid_taker = event.params.bid.taker
  entity.bid_exchange = event.params.bid.exchange
  entity.bid_dstAmount = event.params.bid.dstAmount
  entity.bid_dstFee = event.params.bid.dstFee
  entity.bid_data = event.params.bid.data

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOrderCanceled(event: OrderCanceledEvent): void {
  let entity = new OrderCanceled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.TWAP_id = event.params.id
  entity.maker = event.params.maker
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOrderCompleted(event: OrderCompletedEvent): void {
  let entity = new OrderCompleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.TWAP_id = event.params.id
  entity.maker = event.params.maker
  entity.exchange = event.params.exchange
  entity.taker = event.params.taker

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOrderCreated(event: OrderCreatedEvent): void {
  let entity = new OrderCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.TWAP_id = event.params.id
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

  entity.save()
}

export function handleOrderFilled(event: OrderFilledEvent): void {
  let entity = new OrderFilled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.TWAP_id = event.params.id
  entity.maker = event.params.maker
  entity.exchange = event.params.exchange
  entity.taker = event.params.taker
  entity.srcAmountIn = event.params.srcAmountIn
  entity.dstAmountOut = event.params.dstAmountOut
  entity.dstFee = event.params.dstFee
  entity.srcFilledAmount = event.params.srcFilledAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
