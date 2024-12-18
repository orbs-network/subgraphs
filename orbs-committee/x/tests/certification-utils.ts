import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  ContractRegistryAddressUpdated,
  GuardianCertificationUpdate,
  InitializationComplete,
  Locked,
  RegistryManagementTransferred,
  Unlocked
} from "../generated/Certification/Certification"

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

export function createGuardianCertificationUpdateEvent(
  guardian: Address,
  isCertified: boolean
): GuardianCertificationUpdate {
  let guardianCertificationUpdateEvent =
    changetype<GuardianCertificationUpdate>(newMockEvent())

  guardianCertificationUpdateEvent.parameters = new Array()

  guardianCertificationUpdateEvent.parameters.push(
    new ethereum.EventParam("guardian", ethereum.Value.fromAddress(guardian))
  )
  guardianCertificationUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "isCertified",
      ethereum.Value.fromBoolean(isCertified)
    )
  )

  return guardianCertificationUpdateEvent
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
