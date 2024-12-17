import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { CommitteeChange } from "../generated/schema"
import { CommitteeChange as CommitteeChangeEvent } from "../generated/committee/committee"
import { handleCommitteeChange } from "../src/committee"
import { createCommitteeChangeEvent } from "./committee-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let addr = Address.fromString("0x0000000000000000000000000000000000000001")
    let weight = BigInt.fromI32(234)
    let certification = "boolean Not implemented"
    let inCommittee = "boolean Not implemented"
    let newCommitteeChangeEvent = createCommitteeChangeEvent(
      addr,
      weight,
      certification,
      inCommittee
    )
    handleCommitteeChange(newCommitteeChangeEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CommitteeChange created and stored", () => {
    assert.entityCount("CommitteeChange", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CommitteeChange",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "addr",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CommitteeChange",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "weight",
      "234"
    )
    assert.fieldEquals(
      "CommitteeChange",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "certification",
      "boolean Not implemented"
    )
    assert.fieldEquals(
      "CommitteeChange",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "inCommittee",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
