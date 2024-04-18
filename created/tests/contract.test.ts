import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { OrderBid } from "../generated/schema"
import { OrderBid as OrderBidEvent } from "../generated/Contract/Contract"
import { handleOrderBid } from "../src/contract"
import { createOrderBidEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let id = BigInt.fromI32(234)
    let maker = Address.fromString("0x0000000000000000000000000000000000000001")
    let exchange = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let slippagePercent = BigInt.fromI32(234)
    let bid = "ethereum.Tuple Not implemented"
    let newOrderBidEvent = createOrderBidEvent(
      id,
      maker,
      exchange,
      slippagePercent,
      bid
    )
    handleOrderBid(newOrderBidEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("OrderBid created and stored", () => {
    assert.entityCount("OrderBid", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "OrderBid",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "maker",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "OrderBid",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "exchange",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "OrderBid",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "slippagePercent",
      "234"
    )
    assert.fieldEquals(
      "OrderBid",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bid",
      "ethereum.Tuple Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
