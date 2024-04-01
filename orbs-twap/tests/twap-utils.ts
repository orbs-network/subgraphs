import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  OrderBid,
  OrderCanceled,
  OrderCompleted,
  OrderCreated,
  OrderFilled
} from "../generated/TWAP/TWAP"

export function createOrderBidEvent(
  id: BigInt,
  maker: Address,
  exchange: Address,
  slippagePercent: BigInt,
  bid: ethereum.Tuple
): OrderBid {
  let orderBidEvent = changetype<OrderBid>(newMockEvent())

  orderBidEvent.parameters = new Array()

  orderBidEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  orderBidEvent.parameters.push(
    new ethereum.EventParam("maker", ethereum.Value.fromAddress(maker))
  )
  orderBidEvent.parameters.push(
    new ethereum.EventParam("exchange", ethereum.Value.fromAddress(exchange))
  )
  orderBidEvent.parameters.push(
    new ethereum.EventParam(
      "slippagePercent",
      ethereum.Value.fromUnsignedBigInt(slippagePercent)
    )
  )
  orderBidEvent.parameters.push(
    new ethereum.EventParam("bid", ethereum.Value.fromTuple(bid))
  )

  return orderBidEvent
}

export function createOrderCanceledEvent(
  id: BigInt,
  maker: Address,
  sender: Address
): OrderCanceled {
  let orderCanceledEvent = changetype<OrderCanceled>(newMockEvent())

  orderCanceledEvent.parameters = new Array()

  orderCanceledEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  orderCanceledEvent.parameters.push(
    new ethereum.EventParam("maker", ethereum.Value.fromAddress(maker))
  )
  orderCanceledEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return orderCanceledEvent
}

export function createOrderCompletedEvent(
  id: BigInt,
  maker: Address,
  exchange: Address,
  taker: Address
): OrderCompleted {
  let orderCompletedEvent = changetype<OrderCompleted>(newMockEvent())

  orderCompletedEvent.parameters = new Array()

  orderCompletedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  orderCompletedEvent.parameters.push(
    new ethereum.EventParam("maker", ethereum.Value.fromAddress(maker))
  )
  orderCompletedEvent.parameters.push(
    new ethereum.EventParam("exchange", ethereum.Value.fromAddress(exchange))
  )
  orderCompletedEvent.parameters.push(
    new ethereum.EventParam("taker", ethereum.Value.fromAddress(taker))
  )

  return orderCompletedEvent
}

export function createOrderCreatedEvent(
  id: BigInt,
  maker: Address,
  exchange: Address,
  ask: ethereum.Tuple
): OrderCreated {
  let orderCreatedEvent = changetype<OrderCreated>(newMockEvent())

  orderCreatedEvent.parameters = new Array()

  orderCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam("maker", ethereum.Value.fromAddress(maker))
  )
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam("exchange", ethereum.Value.fromAddress(exchange))
  )
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam("ask", ethereum.Value.fromTuple(ask))
  )

  return orderCreatedEvent
}

export function createOrderFilledEvent(
  id: BigInt,
  maker: Address,
  exchange: Address,
  taker: Address,
  srcAmountIn: BigInt,
  dstAmountOut: BigInt,
  dstFee: BigInt,
  srcFilledAmount: BigInt
): OrderFilled {
  let orderFilledEvent = changetype<OrderFilled>(newMockEvent())

  orderFilledEvent.parameters = new Array()

  orderFilledEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  orderFilledEvent.parameters.push(
    new ethereum.EventParam("maker", ethereum.Value.fromAddress(maker))
  )
  orderFilledEvent.parameters.push(
    new ethereum.EventParam("exchange", ethereum.Value.fromAddress(exchange))
  )
  orderFilledEvent.parameters.push(
    new ethereum.EventParam("taker", ethereum.Value.fromAddress(taker))
  )
  orderFilledEvent.parameters.push(
    new ethereum.EventParam(
      "srcAmountIn",
      ethereum.Value.fromUnsignedBigInt(srcAmountIn)
    )
  )
  orderFilledEvent.parameters.push(
    new ethereum.EventParam(
      "dstAmountOut",
      ethereum.Value.fromUnsignedBigInt(dstAmountOut)
    )
  )
  orderFilledEvent.parameters.push(
    new ethereum.EventParam("dstFee", ethereum.Value.fromUnsignedBigInt(dstFee))
  )
  orderFilledEvent.parameters.push(
    new ethereum.EventParam(
      "srcFilledAmount",
      ethereum.Value.fromUnsignedBigInt(srcFilledAmount)
    )
  )

  return orderFilledEvent
}
