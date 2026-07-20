import {
  BootstrapRewardsAssigned as BootstrapRewardsAssignedEvent,
  FeesAssigned as FeesAssignedEvent,
  BootstrapRewardsWithdrawn as BootstrapRewardsWithdrawnEvent,
  FeesWithdrawn as FeesWithdrawnEvent
} from "../generated/FeesAndBootstrapRewards/FeesAndBootstrapRewards"
import {
  BootstrapRewardsAssigned,
  FeesAssigned,
  BootstrapRewardsWithdrawn,
  FeesWithdrawn
} from "../generated/schema"

export function handleBootstrapRewardsAssigned(event: BootstrapRewardsAssignedEvent): void {
  let entity = new BootstrapRewardsAssigned(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.guardian = event.params.guardian
  entity.amount = event.params.amount
  entity.totalAwarded = event.params.totalAwarded
  entity.certification = event.params.certification
  entity.bootstrapPerMember = event.params.bootstrapPerMember
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.logIndex = event.logIndex
  entity.txIndex = event.transaction.index
  entity.save()
}

export function handleFeesAssigned(event: FeesAssignedEvent): void {
  let entity = new FeesAssigned(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.guardian = event.params.guardian
  entity.amount = event.params.amount
  entity.totalAwarded = event.params.totalAwarded
  entity.certification = event.params.certification
  entity.feesPerMember = event.params.feesPerMember
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.logIndex = event.logIndex
  entity.txIndex = event.transaction.index
  entity.save()
}

export function handleBootstrapRewardsWithdrawn(event: BootstrapRewardsWithdrawnEvent): void {
  let entity = new BootstrapRewardsWithdrawn(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.guardian = event.params.guardian
  entity.amount = event.params.amount
  entity.totalWithdrawn = event.params.totalWithdrawn
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.logIndex = event.logIndex
  entity.txIndex = event.transaction.index
  entity.save()
}

export function handleFeesWithdrawn(event: FeesWithdrawnEvent): void {
  let entity = new FeesWithdrawn(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.guardian = event.params.guardian
  entity.amount = event.params.amount
  entity.totalWithdrawn = event.params.totalWithdrawn
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.logIndex = event.logIndex
  entity.txIndex = event.transaction.index
  entity.save()
}
