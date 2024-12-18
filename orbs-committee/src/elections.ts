import {
  ContractRegistryAddressUpdated as ContractRegistryAddressUpdatedEvent,
  GuardianStatusUpdated as GuardianStatusUpdatedEvent,
  GuardianVotedOut as GuardianVotedOutEvent,
  GuardianVotedUnready as GuardianVotedUnreadyEvent,
  InitializationComplete as InitializationCompleteEvent,
  Locked as LockedEvent,
  MinSelfStakePercentMilleChanged as MinSelfStakePercentMilleChangedEvent,
  RegistryManagementTransferred as RegistryManagementTransferredEvent,
  StakeChanged as StakeChangedEvent,
  Unlocked as UnlockedEvent,
  VoteOutCasted as VoteOutCastedEvent,
  VoteOutPercentMilleThresholdChanged as VoteOutPercentMilleThresholdChangedEvent,
  VoteUnreadyCasted as VoteUnreadyCastedEvent,
  VoteUnreadyPercentMilleThresholdChanged as VoteUnreadyPercentMilleThresholdChangedEvent,
  VoteUnreadyTimeoutSecondsChanged as VoteUnreadyTimeoutSecondsChangedEvent
} from "../x/generated/Elections/Elections"
import {
  ContractRegistryAddressUpdated,
  GuardianStatusUpdated,
  GuardianVotedOut,
  GuardianVotedUnready,
  InitializationComplete,
  Locked,
  MinSelfStakePercentMilleChanged,
  RegistryManagementTransferred,
  StakeChanged,
  Unlocked,
  VoteOutCasted,
  VoteOutPercentMilleThresholdChanged,
  VoteUnreadyCasted,
  VoteUnreadyPercentMilleThresholdChanged,
  VoteUnreadyTimeoutSecondsChanged
} from "../x/generated/schema"

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

export function handleGuardianStatusUpdated(
  event: GuardianStatusUpdatedEvent
): void {
  let entity = new GuardianStatusUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.guardian = event.params.guardian
  entity.readyToSync = event.params.readyToSync
  entity.readyForCommittee = event.params.readyForCommittee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGuardianVotedOut(event: GuardianVotedOutEvent): void {
  let entity = new GuardianVotedOut(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.guardian = event.params.guardian

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGuardianVotedUnready(
  event: GuardianVotedUnreadyEvent
): void {
  let entity = new GuardianVotedUnready(
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

export function handleMinSelfStakePercentMilleChanged(
  event: MinSelfStakePercentMilleChangedEvent
): void {
  let entity = new MinSelfStakePercentMilleChanged(
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

export function handleStakeChanged(event: StakeChangedEvent): void {
  let entity = new StakeChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.addr = event.params.addr
  entity.selfDelegatedStake = event.params.selfDelegatedStake
  entity.delegatedStake = event.params.delegatedStake
  entity.effectiveStake = event.params.effectiveStake

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

export function handleVoteOutCasted(event: VoteOutCastedEvent): void {
  let entity = new VoteOutCasted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.voter = event.params.voter
  entity.subject = event.params.subject

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteOutPercentMilleThresholdChanged(
  event: VoteOutPercentMilleThresholdChangedEvent
): void {
  let entity = new VoteOutPercentMilleThresholdChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newValue = event.params.newValue
  entity.oldValue = event.params.oldValue

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteUnreadyCasted(event: VoteUnreadyCastedEvent): void {
  let entity = new VoteUnreadyCasted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.voter = event.params.voter
  entity.subject = event.params.subject
  entity.expiration = event.params.expiration

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteUnreadyPercentMilleThresholdChanged(
  event: VoteUnreadyPercentMilleThresholdChangedEvent
): void {
  let entity = new VoteUnreadyPercentMilleThresholdChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newValue = event.params.newValue
  entity.oldValue = event.params.oldValue

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteUnreadyTimeoutSecondsChanged(
  event: VoteUnreadyTimeoutSecondsChangedEvent
): void {
  let entity = new VoteUnreadyTimeoutSecondsChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newValue = event.params.newValue
  entity.oldValue = event.params.oldValue

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
