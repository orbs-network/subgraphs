import {
  ContractRegistryAddressUpdated as ContractRegistryAddressUpdatedEvent,
  GuardianDataUpdated as GuardianDataUpdatedEvent,
  GuardianMetadataChanged as GuardianMetadataChangedEvent,
  GuardianRegistered as GuardianRegisteredEvent,
  GuardianUnregistered as GuardianUnregisteredEvent,
  InitializationComplete as InitializationCompleteEvent,
  Locked as LockedEvent,
  RegistryManagementTransferred as RegistryManagementTransferredEvent,
  Unlocked as UnlockedEvent
} from "../generated/GuardiansRegistration/GuardiansRegistration"
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

export function handleGuardianDataUpdated(
  event: GuardianDataUpdatedEvent
): void {
  let entity = new GuardianDataUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.guardian = event.params.guardian
  entity.isRegistered = event.params.isRegistered
  entity.ip = event.params.ip
  entity.orbsAddr = event.params.orbsAddr
  entity.name = event.params.name
  entity.website = event.params.website
  entity.registrationTime = event.params.registrationTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGuardianMetadataChanged(
  event: GuardianMetadataChangedEvent
): void {
  let entity = new GuardianMetadataChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.guardian = event.params.guardian
  entity.key = event.params.key
  entity.newValue = event.params.newValue
  entity.oldValue = event.params.oldValue

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGuardianRegistered(event: GuardianRegisteredEvent): void {
  let entity = new GuardianRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.guardian = event.params.guardian

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGuardianUnregistered(
  event: GuardianUnregisteredEvent
): void {
  let entity = new GuardianUnregistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.guardian = event.params.guardian

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
