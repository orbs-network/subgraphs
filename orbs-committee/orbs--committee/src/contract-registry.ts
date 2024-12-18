import {
  ContractAddressUpdated as ContractAddressUpdatedEvent,
  ContractRegistryUpdated as ContractRegistryUpdatedEvent,
  InitializationComplete as InitializationCompleteEvent,
  ManagerChanged as ManagerChangedEvent,
  RegistryManagementTransferred as RegistryManagementTransferredEvent
} from "../generated/ContractRegistry/ContractRegistry"
import {
  ContractAddressUpdated,
  ContractRegistryUpdated,
  InitializationComplete,
  ManagerChanged,
  RegistryManagementTransferred
} from "../generated/schema"

export function handleContractAddressUpdated(
  event: ContractAddressUpdatedEvent
): void {
  let entity = new ContractAddressUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.contractName = event.params.contractName
  entity.addr = event.params.addr
  entity.managedContract = event.params.managedContract

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleContractRegistryUpdated(
  event: ContractRegistryUpdatedEvent
): void {
  let entity = new ContractRegistryUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newContractRegistry = event.params.newContractRegistry

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitializationComplete(
  event: InitializationCompleteEvent
): void {
  let entity = new InitializationComplete(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleManagerChanged(event: ManagerChangedEvent): void {
  let entity = new ManagerChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.newManager = event.params.newManager

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRegistryManagementTransferred(
  event: RegistryManagementTransferredEvent
): void {
  let entity = new RegistryManagementTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousRegistryAdmin = event.params.previousRegistryAdmin
  entity.newRegistryAdmin = event.params.newRegistryAdmin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
