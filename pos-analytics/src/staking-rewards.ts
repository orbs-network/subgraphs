import {
  StakingRewardsAllocated as StakingRewardsAllocatedEvent,
  DelegatorStakingRewardsAssigned as DelegatorStakingRewardsAssignedEvent,
  GuardianStakingRewardsAssigned as GuardianStakingRewardsAssignedEvent,
  StakingRewardsClaimed as StakingRewardsClaimedEvent
} from "../generated/StakingRewards/StakingRewards"
import {
  StakingRewardsAllocated,
  DelegatorStakingRewardsAssigned,
  GuardianStakingRewardsAssigned,
  StakingRewardsClaimed
} from "../generated/schema"

export function handleStakingRewardsAllocated(event: StakingRewardsAllocatedEvent): void {
  let entity = new StakingRewardsAllocated(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.allocatedRewards = event.params.allocatedRewards
  entity.stakingRewardsPerWeight = event.params.stakingRewardsPerWeight
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.logIndex = event.logIndex
  entity.txIndex = event.transaction.index
  entity.save()
}

export function handleDelegatorStakingRewardsAssigned(event: DelegatorStakingRewardsAssignedEvent): void {
  let entity = new DelegatorStakingRewardsAssigned(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.delegator = event.params.delegator
  entity.amount = event.params.amount
  entity.totalAwarded = event.params.totalAwarded
  entity.guardian = event.params.guardian
  entity.delegatorRewardsPerToken = event.params.delegatorRewardsPerToken
  entity.delegatorRewardsPerTokenDelta = event.params.delegatorRewardsPerTokenDelta
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.logIndex = event.logIndex
  entity.txIndex = event.transaction.index
  entity.save()
}

export function handleGuardianStakingRewardsAssigned(event: GuardianStakingRewardsAssignedEvent): void {
  let entity = new GuardianStakingRewardsAssigned(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.guardian = event.params.guardian
  entity.amount = event.params.amount
  entity.totalAwarded = event.params.totalAwarded
  entity.delegatorRewardsPerToken = event.params.delegatorRewardsPerToken
  entity.delegatorRewardsPerTokenDelta = event.params.delegatorRewardsPerTokenDelta
  entity.stakingRewardsPerWeight = event.params.stakingRewardsPerWeight
  entity.stakingRewardsPerWeightDelta = event.params.stakingRewardsPerWeightDelta
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.logIndex = event.logIndex
  entity.txIndex = event.transaction.index
  entity.save()
}

export function handleStakingRewardsClaimed(event: StakingRewardsClaimedEvent): void {
  let entity = new StakingRewardsClaimed(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.addr = event.params.addr
  entity.claimedDelegatorRewards = event.params.claimedDelegatorRewards
  entity.claimedGuardianRewards = event.params.claimedGuardianRewards
  entity.totalClaimedDelegatorRewards = event.params.totalClaimedDelegatorRewards
  entity.totalClaimedGuardianRewards = event.params.totalClaimedGuardianRewards
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.logIndex = event.logIndex
  entity.txIndex = event.transaction.index
  entity.save()
}
