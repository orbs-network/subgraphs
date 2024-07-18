import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ContractRegistryAddressUpdated,
  Delegated,
  DelegatedStakeChanged,
  DelegationInitialized,
  DelegationsImported,
  InitializationComplete,
  Locked,
  RegistryManagementTransferred,
  Unlocked
} from "../generated/Delegations/Delegations"

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

export function createDelegatedEvent(from: Address, to: Address): Delegated {
  let delegatedEvent = changetype<Delegated>(newMockEvent())

  delegatedEvent.parameters = new Array()

  delegatedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  delegatedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return delegatedEvent
}

export function createDelegatedStakeChangedEvent(
  addr: Address,
  selfDelegatedStake: BigInt,
  delegatedStake: BigInt,
  delegator: Address,
  delegatorContributedStake: BigInt
): DelegatedStakeChanged {
  let delegatedStakeChangedEvent = changetype<DelegatedStakeChanged>(
    newMockEvent()
  )

  delegatedStakeChangedEvent.parameters = new Array()

  delegatedStakeChangedEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  delegatedStakeChangedEvent.parameters.push(
    new ethereum.EventParam(
      "selfDelegatedStake",
      ethereum.Value.fromUnsignedBigInt(selfDelegatedStake)
    )
  )
  delegatedStakeChangedEvent.parameters.push(
    new ethereum.EventParam(
      "delegatedStake",
      ethereum.Value.fromUnsignedBigInt(delegatedStake)
    )
  )
  delegatedStakeChangedEvent.parameters.push(
    new ethereum.EventParam("delegator", ethereum.Value.fromAddress(delegator))
  )
  delegatedStakeChangedEvent.parameters.push(
    new ethereum.EventParam(
      "delegatorContributedStake",
      ethereum.Value.fromUnsignedBigInt(delegatorContributedStake)
    )
  )

  return delegatedStakeChangedEvent
}

export function createDelegationInitializedEvent(
  from: Address,
  to: Address
): DelegationInitialized {
  let delegationInitializedEvent = changetype<DelegationInitialized>(
    newMockEvent()
  )

  delegationInitializedEvent.parameters = new Array()

  delegationInitializedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  delegationInitializedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return delegationInitializedEvent
}

export function createDelegationsImportedEvent(
  from: Array<Address>,
  to: Address
): DelegationsImported {
  let delegationsImportedEvent = changetype<DelegationsImported>(newMockEvent())

  delegationsImportedEvent.parameters = new Array()

  delegationsImportedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddressArray(from))
  )
  delegationsImportedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return delegationsImportedEvent
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
