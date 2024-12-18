import {
  ContractRegistryAddressUpdated as ContractRegistryAddressUpdatedEvent,
  GenesisRefTimeDelayChanged as GenesisRefTimeDelayChangedEvent,
  InitializationComplete as InitializationCompleteEvent,
  Locked as LockedEvent,
  MinimumInitialVcPaymentChanged as MinimumInitialVcPaymentChangedEvent,
  Payment as PaymentEvent,
  RegistryManagementTransferred as RegistryManagementTransferredEvent,
  SubscriberAdded as SubscriberAddedEvent,
  SubscriberRemoved as SubscriberRemovedEvent,
  SubscriptionChanged as SubscriptionChangedEvent,
  Unlocked as UnlockedEvent,
  VcConfigRecordChanged as VcConfigRecordChangedEvent,
  VcCreated as VcCreatedEvent,
  VcOwnerChanged as VcOwnerChangedEvent
} from "../generated/Subscriptions/Subscriptions"
import {
  ContractRegistryAddressUpdated,
  GenesisRefTimeDelayChanged,
  InitializationComplete,
  Locked,
  MinimumInitialVcPaymentChanged,
  Payment,
  RegistryManagementTransferred,
  SubscriberAdded,
  SubscriberRemoved,
  SubscriptionChanged,
  Unlocked,
  VcConfigRecordChanged,
  VcCreated,
  VcOwnerChanged
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

export function handleGenesisRefTimeDelayChanged(
  event: GenesisRefTimeDelayChangedEvent
): void {
  let entity = new GenesisRefTimeDelayChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newGenesisRefTimeDelay = event.params.newGenesisRefTimeDelay

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

export function handleMinimumInitialVcPaymentChanged(
  event: MinimumInitialVcPaymentChangedEvent
): void {
  let entity = new MinimumInitialVcPaymentChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newMinimumInitialVcPayment = event.params.newMinimumInitialVcPayment

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePayment(event: PaymentEvent): void {
  let entity = new Payment(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vcId = event.params.vcId
  entity.by = event.params.by
  entity.amount = event.params.amount
  entity.tier = event.params.tier
  entity.rate = event.params.rate

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

export function handleSubscriberAdded(event: SubscriberAddedEvent): void {
  let entity = new SubscriberAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.subscriber = event.params.subscriber

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSubscriberRemoved(event: SubscriberRemovedEvent): void {
  let entity = new SubscriberRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.subscriber = event.params.subscriber

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSubscriptionChanged(
  event: SubscriptionChangedEvent
): void {
  let entity = new SubscriptionChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vcId = event.params.vcId
  entity.owner = event.params.owner
  entity.name = event.params.name
  entity.genRefTime = event.params.genRefTime
  entity.tier = event.params.tier
  entity.rate = event.params.rate
  entity.expiresAt = event.params.expiresAt
  entity.isCertified = event.params.isCertified
  entity.deploymentSubset = event.params.deploymentSubset

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

export function handleVcConfigRecordChanged(
  event: VcConfigRecordChangedEvent
): void {
  let entity = new VcConfigRecordChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vcId = event.params.vcId
  entity.key = event.params.key
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVcCreated(event: VcCreatedEvent): void {
  let entity = new VcCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vcId = event.params.vcId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVcOwnerChanged(event: VcOwnerChangedEvent): void {
  let entity = new VcOwnerChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vcId = event.params.vcId
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
