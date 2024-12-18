import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
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
} from "../x/generated/Elections/Elections"

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

export function createGuardianStatusUpdatedEvent(
  guardian: Address,
  readyToSync: boolean,
  readyForCommittee: boolean
): GuardianStatusUpdated {
  let guardianStatusUpdatedEvent = changetype<GuardianStatusUpdated>(
    newMockEvent()
  )

  guardianStatusUpdatedEvent.parameters = new Array()

  guardianStatusUpdatedEvent.parameters.push(
    new ethereum.EventParam("guardian", ethereum.Value.fromAddress(guardian))
  )
  guardianStatusUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "readyToSync",
      ethereum.Value.fromBoolean(readyToSync)
    )
  )
  guardianStatusUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "readyForCommittee",
      ethereum.Value.fromBoolean(readyForCommittee)
    )
  )

  return guardianStatusUpdatedEvent
}

export function createGuardianVotedOutEvent(
  guardian: Address
): GuardianVotedOut {
  let guardianVotedOutEvent = changetype<GuardianVotedOut>(newMockEvent())

  guardianVotedOutEvent.parameters = new Array()

  guardianVotedOutEvent.parameters.push(
    new ethereum.EventParam("guardian", ethereum.Value.fromAddress(guardian))
  )

  return guardianVotedOutEvent
}

export function createGuardianVotedUnreadyEvent(
  guardian: Address
): GuardianVotedUnready {
  let guardianVotedUnreadyEvent = changetype<GuardianVotedUnready>(
    newMockEvent()
  )

  guardianVotedUnreadyEvent.parameters = new Array()

  guardianVotedUnreadyEvent.parameters.push(
    new ethereum.EventParam("guardian", ethereum.Value.fromAddress(guardian))
  )

  return guardianVotedUnreadyEvent
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

export function createMinSelfStakePercentMilleChangedEvent(
  newValue: BigInt,
  oldValue: BigInt
): MinSelfStakePercentMilleChanged {
  let minSelfStakePercentMilleChangedEvent =
    changetype<MinSelfStakePercentMilleChanged>(newMockEvent())

  minSelfStakePercentMilleChangedEvent.parameters = new Array()

  minSelfStakePercentMilleChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newValue",
      ethereum.Value.fromUnsignedBigInt(newValue)
    )
  )
  minSelfStakePercentMilleChangedEvent.parameters.push(
    new ethereum.EventParam(
      "oldValue",
      ethereum.Value.fromUnsignedBigInt(oldValue)
    )
  )

  return minSelfStakePercentMilleChangedEvent
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

export function createStakeChangedEvent(
  addr: Address,
  selfDelegatedStake: BigInt,
  delegatedStake: BigInt,
  effectiveStake: BigInt
): StakeChanged {
  let stakeChangedEvent = changetype<StakeChanged>(newMockEvent())

  stakeChangedEvent.parameters = new Array()

  stakeChangedEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  stakeChangedEvent.parameters.push(
    new ethereum.EventParam(
      "selfDelegatedStake",
      ethereum.Value.fromUnsignedBigInt(selfDelegatedStake)
    )
  )
  stakeChangedEvent.parameters.push(
    new ethereum.EventParam(
      "delegatedStake",
      ethereum.Value.fromUnsignedBigInt(delegatedStake)
    )
  )
  stakeChangedEvent.parameters.push(
    new ethereum.EventParam(
      "effectiveStake",
      ethereum.Value.fromUnsignedBigInt(effectiveStake)
    )
  )

  return stakeChangedEvent
}

export function createUnlockedEvent(): Unlocked {
  let unlockedEvent = changetype<Unlocked>(newMockEvent())

  unlockedEvent.parameters = new Array()

  return unlockedEvent
}

export function createVoteOutCastedEvent(
  voter: Address,
  subject: Address
): VoteOutCasted {
  let voteOutCastedEvent = changetype<VoteOutCasted>(newMockEvent())

  voteOutCastedEvent.parameters = new Array()

  voteOutCastedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  voteOutCastedEvent.parameters.push(
    new ethereum.EventParam("subject", ethereum.Value.fromAddress(subject))
  )

  return voteOutCastedEvent
}

export function createVoteOutPercentMilleThresholdChangedEvent(
  newValue: BigInt,
  oldValue: BigInt
): VoteOutPercentMilleThresholdChanged {
  let voteOutPercentMilleThresholdChangedEvent =
    changetype<VoteOutPercentMilleThresholdChanged>(newMockEvent())

  voteOutPercentMilleThresholdChangedEvent.parameters = new Array()

  voteOutPercentMilleThresholdChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newValue",
      ethereum.Value.fromUnsignedBigInt(newValue)
    )
  )
  voteOutPercentMilleThresholdChangedEvent.parameters.push(
    new ethereum.EventParam(
      "oldValue",
      ethereum.Value.fromUnsignedBigInt(oldValue)
    )
  )

  return voteOutPercentMilleThresholdChangedEvent
}

export function createVoteUnreadyCastedEvent(
  voter: Address,
  subject: Address,
  expiration: BigInt
): VoteUnreadyCasted {
  let voteUnreadyCastedEvent = changetype<VoteUnreadyCasted>(newMockEvent())

  voteUnreadyCastedEvent.parameters = new Array()

  voteUnreadyCastedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  voteUnreadyCastedEvent.parameters.push(
    new ethereum.EventParam("subject", ethereum.Value.fromAddress(subject))
  )
  voteUnreadyCastedEvent.parameters.push(
    new ethereum.EventParam(
      "expiration",
      ethereum.Value.fromUnsignedBigInt(expiration)
    )
  )

  return voteUnreadyCastedEvent
}

export function createVoteUnreadyPercentMilleThresholdChangedEvent(
  newValue: BigInt,
  oldValue: BigInt
): VoteUnreadyPercentMilleThresholdChanged {
  let voteUnreadyPercentMilleThresholdChangedEvent =
    changetype<VoteUnreadyPercentMilleThresholdChanged>(newMockEvent())

  voteUnreadyPercentMilleThresholdChangedEvent.parameters = new Array()

  voteUnreadyPercentMilleThresholdChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newValue",
      ethereum.Value.fromUnsignedBigInt(newValue)
    )
  )
  voteUnreadyPercentMilleThresholdChangedEvent.parameters.push(
    new ethereum.EventParam(
      "oldValue",
      ethereum.Value.fromUnsignedBigInt(oldValue)
    )
  )

  return voteUnreadyPercentMilleThresholdChangedEvent
}

export function createVoteUnreadyTimeoutSecondsChangedEvent(
  newValue: BigInt,
  oldValue: BigInt
): VoteUnreadyTimeoutSecondsChanged {
  let voteUnreadyTimeoutSecondsChangedEvent =
    changetype<VoteUnreadyTimeoutSecondsChanged>(newMockEvent())

  voteUnreadyTimeoutSecondsChangedEvent.parameters = new Array()

  voteUnreadyTimeoutSecondsChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newValue",
      ethereum.Value.fromUnsignedBigInt(newValue)
    )
  )
  voteUnreadyTimeoutSecondsChangedEvent.parameters.push(
    new ethereum.EventParam(
      "oldValue",
      ethereum.Value.fromUnsignedBigInt(oldValue)
    )
  )

  return voteUnreadyTimeoutSecondsChangedEvent
}
