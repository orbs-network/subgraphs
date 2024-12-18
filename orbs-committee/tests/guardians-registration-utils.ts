import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  ContractRegistryAddressUpdated,
  GuardianDataUpdated,
  GuardianMetadataChanged,
  GuardianRegistered,
  GuardianUnregistered,
  InitializationComplete,
  Locked,
  RegistryManagementTransferred,
  Unlocked
} from "../generated/GuardiansRegistration/GuardiansRegistration"

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

export function createGuardianDataUpdatedEvent(
  guardian: Address,
  isRegistered: boolean,
  ip: Bytes,
  orbsAddr: Address,
  name: string,
  website: string,
  registrationTime: BigInt
): GuardianDataUpdated {
  let guardianDataUpdatedEvent = changetype<GuardianDataUpdated>(newMockEvent())

  guardianDataUpdatedEvent.parameters = new Array()

  guardianDataUpdatedEvent.parameters.push(
    new ethereum.EventParam("guardian", ethereum.Value.fromAddress(guardian))
  )
  guardianDataUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "isRegistered",
      ethereum.Value.fromBoolean(isRegistered)
    )
  )
  guardianDataUpdatedEvent.parameters.push(
    new ethereum.EventParam("ip", ethereum.Value.fromFixedBytes(ip))
  )
  guardianDataUpdatedEvent.parameters.push(
    new ethereum.EventParam("orbsAddr", ethereum.Value.fromAddress(orbsAddr))
  )
  guardianDataUpdatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  guardianDataUpdatedEvent.parameters.push(
    new ethereum.EventParam("website", ethereum.Value.fromString(website))
  )
  guardianDataUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "registrationTime",
      ethereum.Value.fromUnsignedBigInt(registrationTime)
    )
  )

  return guardianDataUpdatedEvent
}

export function createGuardianMetadataChangedEvent(
  guardian: Address,
  key: string,
  newValue: string,
  oldValue: string
): GuardianMetadataChanged {
  let guardianMetadataChangedEvent = changetype<GuardianMetadataChanged>(
    newMockEvent()
  )

  guardianMetadataChangedEvent.parameters = new Array()

  guardianMetadataChangedEvent.parameters.push(
    new ethereum.EventParam("guardian", ethereum.Value.fromAddress(guardian))
  )
  guardianMetadataChangedEvent.parameters.push(
    new ethereum.EventParam("key", ethereum.Value.fromString(key))
  )
  guardianMetadataChangedEvent.parameters.push(
    new ethereum.EventParam("newValue", ethereum.Value.fromString(newValue))
  )
  guardianMetadataChangedEvent.parameters.push(
    new ethereum.EventParam("oldValue", ethereum.Value.fromString(oldValue))
  )

  return guardianMetadataChangedEvent
}

export function createGuardianRegisteredEvent(
  guardian: Address
): GuardianRegistered {
  let guardianRegisteredEvent = changetype<GuardianRegistered>(newMockEvent())

  guardianRegisteredEvent.parameters = new Array()

  guardianRegisteredEvent.parameters.push(
    new ethereum.EventParam("guardian", ethereum.Value.fromAddress(guardian))
  )

  return guardianRegisteredEvent
}

export function createGuardianUnregisteredEvent(
  guardian: Address
): GuardianUnregistered {
  let guardianUnregisteredEvent = changetype<GuardianUnregistered>(
    newMockEvent()
  )

  guardianUnregisteredEvent.parameters = new Array()

  guardianUnregisteredEvent.parameters.push(
    new ethereum.EventParam("guardian", ethereum.Value.fromAddress(guardian))
  )

  return guardianUnregisteredEvent
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
