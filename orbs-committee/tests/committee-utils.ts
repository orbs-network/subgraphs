import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CommitteeChange,
  CommitteeSnapshot,
  ContractRegistryAddressUpdated,
  InitializationComplete,
  Locked,
  MaxCommitteeSizeChanged,
  RegistryManagementTransferred,
  Unlocked
} from "../generated/Committee/Committee"

export function createCommitteeChangeEvent(
  addr: Address,
  weight: BigInt,
  certification: boolean,
  inCommittee: boolean
): CommitteeChange {
  let committeeChangeEvent = changetype<CommitteeChange>(newMockEvent())

  committeeChangeEvent.parameters = new Array()

  committeeChangeEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  committeeChangeEvent.parameters.push(
    new ethereum.EventParam("weight", ethereum.Value.fromUnsignedBigInt(weight))
  )
  committeeChangeEvent.parameters.push(
    new ethereum.EventParam(
      "certification",
      ethereum.Value.fromBoolean(certification)
    )
  )
  committeeChangeEvent.parameters.push(
    new ethereum.EventParam(
      "inCommittee",
      ethereum.Value.fromBoolean(inCommittee)
    )
  )

  return committeeChangeEvent
}

export function createCommitteeSnapshotEvent(
  addrs: Array<Address>,
  weights: Array<BigInt>,
  certification: Array<boolean>
): CommitteeSnapshot {
  let committeeSnapshotEvent = changetype<CommitteeSnapshot>(newMockEvent())

  committeeSnapshotEvent.parameters = new Array()

  committeeSnapshotEvent.parameters.push(
    new ethereum.EventParam("addrs", ethereum.Value.fromAddressArray(addrs))
  )
  committeeSnapshotEvent.parameters.push(
    new ethereum.EventParam(
      "weights",
      ethereum.Value.fromUnsignedBigIntArray(weights)
    )
  )
  committeeSnapshotEvent.parameters.push(
    new ethereum.EventParam(
      "certification",
      ethereum.Value.fromBooleanArray(certification)
    )
  )

  return committeeSnapshotEvent
}

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

export function createMaxCommitteeSizeChangedEvent(
  newValue: i32,
  oldValue: i32
): MaxCommitteeSizeChanged {
  let maxCommitteeSizeChangedEvent = changetype<MaxCommitteeSizeChanged>(
    newMockEvent()
  )

  maxCommitteeSizeChangedEvent.parameters = new Array()

  maxCommitteeSizeChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newValue",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(newValue))
    )
  )
  maxCommitteeSizeChangedEvent.parameters.push(
    new ethereum.EventParam(
      "oldValue",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(oldValue))
    )
  )

  return maxCommitteeSizeChangedEvent
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
