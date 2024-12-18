import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { ContractAddressUpdated } from "../generated/schema"
import { ContractAddressUpdated as ContractAddressUpdatedEvent } from "../generated/ContractRegistry/ContractRegistry"
import { handleContractAddressUpdated } from "../src/contract-registry"
import { createContractAddressUpdatedEvent } from "./contract-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let contractName = "Example string value"
    let addr = Address.fromString("0x0000000000000000000000000000000000000001")
    let managedContract = "boolean Not implemented"
    let newContractAddressUpdatedEvent = createContractAddressUpdatedEvent(
      contractName,
      addr,
      managedContract
    )
    handleContractAddressUpdated(newContractAddressUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ContractAddressUpdated created and stored", () => {
    assert.entityCount("ContractAddressUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ContractAddressUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "contractName",
      "Example string value"
    )
    assert.fieldEquals(
      "ContractAddressUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "addr",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ContractAddressUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "managedContract",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
