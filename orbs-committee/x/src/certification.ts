import {
  ContractRegistryAddressUpdated as ContractRegistryAddressUpdatedEvent,
  GuardianCertificationUpdate as GuardianCertificationUpdateEvent,
  InitializationComplete as InitializationCompleteEvent,
  Locked as LockedEvent,
  RegistryManagementTransferred as RegistryManagementTransferredEvent,
  Unlocked as UnlockedEvent
} from "../generated/Certification/Certification"
import {
  ContractRegistryAddressUpdated,
  GuardianCertificationUpdate,
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

export function handleGuardianCertificationUpdate(
  event: GuardianCertificationUpdateEvent
): void {
  let entity = new GuardianCertificationUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.guardian = event.params.guardian
  entity.isCertified = event.params.isCertified

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
