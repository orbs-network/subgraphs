import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ContractRegistryAddressUpdated,
  InitializationComplete,
  Locked,
  ProtocolVersionChanged,
  RegistryManagementTransferred,
  Unlocked
} from "../generated/Protocol/Protocol"

export function createContractRegistryAddressUpdatedEvent(
  addr: Address
): ContractRegistryAddressUpdated {
  let contractRegistryAddressUpdatedEvent =
    changetype<ContractRegistryAddressUpdated>(newMockEvent())

  contractRegistryAddressUpdatedEvent.parameters = new Array()

  contractRegistryAddressUpdatedEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )

  return contractRegistryAddressUpdatedEvent
}

export function createInitializationCompleteEvent(): InitializationComplete {
  let initializationCompleteEvent = changetype<InitializationComplete>(
    newMockEvent()
  )

  initializationCompleteEvent.parameters = new Array()

  return initializationCompleteEvent
}

export function createLockedEvent(): Locked {
  let lockedEvent = changetype<Locked>(newMockEvent())

  lockedEvent.parameters = new Array()

  return lockedEvent
}

export function createProtocolVersionChangedEvent(
  deploymentSubset: string,
  currentVersion: BigInt,
  nextVersion: BigInt,
  fromTimestamp: BigInt
): ProtocolVersionChanged {
  let protocolVersionChangedEvent = changetype<ProtocolVersionChanged>(
    newMockEvent()
  )

  protocolVersionChangedEvent.parameters = new Array()

  protocolVersionChangedEvent.parameters.push(
    new ethereum.EventParam(
      "deploymentSubset",
      ethereum.Value.fromString(deploymentSubset)
    )
  )
  protocolVersionChangedEvent.parameters.push(
    new ethereum.EventParam(
      "currentVersion",
      ethereum.Value.fromUnsignedBigInt(currentVersion)
    )
  )
  protocolVersionChangedEvent.parameters.push(
    new ethereum.EventParam(
      "nextVersion",
      ethereum.Value.fromUnsignedBigInt(nextVersion)
    )
  )
  protocolVersionChangedEvent.parameters.push(
    new ethereum.EventParam(
      "fromTimestamp",
      ethereum.Value.fromUnsignedBigInt(fromTimestamp)
    )
  )

  return protocolVersionChangedEvent
}

export function createRegistryManagementTransferredEvent(
  previousRegistryAdmin: Address,
  newRegistryAdmin: Address
): RegistryManagementTransferred {
  let registryManagementTransferredEvent =
    changetype<RegistryManagementTransferred>(newMockEvent())

  registryManagementTransferredEvent.parameters = new Array()

  registryManagementTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousRegistryAdmin",
      ethereum.Value.fromAddress(previousRegistryAdmin)
    )
  )
  registryManagementTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "newRegistryAdmin",
      ethereum.Value.fromAddress(newRegistryAdmin)
    )
  )

  return registryManagementTransferredEvent
}

export function createUnlockedEvent(): Unlocked {
  let unlockedEvent = changetype<Unlocked>(newMockEvent())

  unlockedEvent.parameters = new Array()

  return unlockedEvent
}
