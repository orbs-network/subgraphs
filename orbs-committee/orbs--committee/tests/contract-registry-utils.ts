import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  ContractAddressUpdated,
  ContractRegistryUpdated,
  InitializationComplete,
  ManagerChanged,
  RegistryManagementTransferred
} from "../generated/ContractRegistry/ContractRegistry"

export function createContractAddressUpdatedEvent(
  contractName: string,
  addr: Address,
  managedContract: boolean
): ContractAddressUpdated {
  let contractAddressUpdatedEvent = changetype<ContractAddressUpdated>(
    newMockEvent()
  )

  contractAddressUpdatedEvent.parameters = new Array()

  contractAddressUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "contractName",
      ethereum.Value.fromString(contractName)
    )
  )
  contractAddressUpdatedEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  contractAddressUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "managedContract",
      ethereum.Value.fromBoolean(managedContract)
    )
  )

  return contractAddressUpdatedEvent
}

export function createContractRegistryUpdatedEvent(
  newContractRegistry: Address
): ContractRegistryUpdated {
  let contractRegistryUpdatedEvent = changetype<ContractRegistryUpdated>(
    newMockEvent()
  )

  contractRegistryUpdatedEvent.parameters = new Array()

  contractRegistryUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newContractRegistry",
      ethereum.Value.fromAddress(newContractRegistry)
    )
  )

  return contractRegistryUpdatedEvent
}

export function createInitializationCompleteEvent(): InitializationComplete {
  let initializationCompleteEvent = changetype<InitializationComplete>(
    newMockEvent()
  )

  initializationCompleteEvent.parameters = new Array()

  return initializationCompleteEvent
}

export function createManagerChangedEvent(
  role: string,
  newManager: Address
): ManagerChanged {
  let managerChangedEvent = changetype<ManagerChanged>(newMockEvent())

  managerChangedEvent.parameters = new Array()

  managerChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromString(role))
  )
  managerChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newManager",
      ethereum.Value.fromAddress(newManager)
    )
  )

  return managerChangedEvent
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
