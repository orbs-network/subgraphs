import {
  ContractRegistryAddressUpdated as ContractRegistryAddressUpdatedEvent,
  Delegated as DelegatedEvent,
  DelegatedStakeChanged as DelegatedStakeChangedEvent,
  DelegationInitialized as DelegationInitializedEvent,
  DelegationsImported as DelegationsImportedEvent,
  InitializationComplete as InitializationCompleteEvent,
  Locked as LockedEvent,
  RegistryManagementTransferred as RegistryManagementTransferredEvent,
  Unlocked as UnlockedEvent
} from "../generated/Delegations/Delegations"
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
} from "../generated/schema"

export function handleContractRegistryAddressUpdated(
  event: ContractRegistryAddressUpdatedEvent
): void {
  let entity = new ContractRegistryAddressUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.addr = event.params.addr

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDelegated(event: DelegatedEvent): void {
  let entity = new Delegated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDelegatedStakeChanged(
  event: DelegatedStakeChangedEvent
): void {
  let entity = new DelegatedStakeChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.addr = event.params.addr
  entity.selfDelegatedStake = event.params.selfDelegatedStake
  entity.delegatedStake = event.params.delegatedStake
  entity.delegator = event.params.delegator
  entity.delegatorContributedStake = event.params.delegatorContributedStake

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDelegationInitialized(
  event: DelegationInitializedEvent
): void {
  let entity = new DelegationInitialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDelegationsImported(
  event: DelegationsImportedEvent
): void {
  let entity = new DelegationsImported(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to

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

export function handleLocked(event: LockedEvent): void {
  let entity = new Locked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

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

export function handleUnlocked(event: UnlockedEvent): void {
  let entity = new Unlocked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
