import {
  CommitteeChange as CommitteeChangeEvent,
  CommitteeSnapshot as CommitteeSnapshotEvent,
  ContractRegistryAddressUpdated as ContractRegistryAddressUpdatedEvent,
  InitializationComplete as InitializationCompleteEvent,
  Locked as LockedEvent,
  MaxCommitteeSizeChanged as MaxCommitteeSizeChangedEvent,
  RegistryManagementTransferred as RegistryManagementTransferredEvent,
  Unlocked as UnlockedEvent
} from "../generated/Committee/Committee"
import {
  CommitteeChange,
  CommitteeSnapshot,
  ContractRegistryAddressUpdated,
  InitializationComplete,
  Locked,
  MaxCommitteeSizeChanged,
  RegistryManagementTransferred,
  Unlocked
} from "../generated/schema"

export function handleCommitteeChange(event: CommitteeChangeEvent): void {
  let entity = new CommitteeChange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.addr = event.params.addr
  entity.weight = event.params.weight
  entity.certification = event.params.certification
  entity.inCommittee = event.params.inCommittee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

// export function handleCommitteeSnapshot(event: CommitteeSnapshotEvent): void {
//   let entity = new CommitteeSnapshot(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.addrs = event.params.addrs
//   entity.weights = event.params.weights
//   entity.certification = event.params.certification
//
//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash
//
//   entity.save()
// }

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

export function handleMaxCommitteeSizeChanged(
  event: MaxCommitteeSizeChangedEvent
): void {
  let entity = new MaxCommitteeSizeChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newValue = event.params.newValue
  entity.oldValue = event.params.oldValue

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
