import {
  Delegated as DelegatedEvent,
  DelegatedStakeChanged as DelegatedStakeChangedEvent
} from "../generated/Delegations/Delegations"
import {
  Delegated,
  DelegatedStakeChanged
} from "../generated/schema"

export function handleDelegated(event: DelegatedEvent): void {
  let entity = new Delegated(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.from = event.params.from
  entity.to = event.params.to
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.logIndex = event.logIndex
  entity.txIndex = event.transaction.index
  entity.save()
}

export function handleDelegatedStakeChanged(event: DelegatedStakeChangedEvent): void {
  let entity = new DelegatedStakeChanged(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.addr = event.params.addr
  entity.selfDelegatedStake = event.params.selfDelegatedStake
  entity.delegatedStake = event.params.delegatedStake
  entity.delegator = event.params.delegator
  entity.delegatorContributedStake = event.params.delegatorContributedStake
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.logIndex = event.logIndex
  entity.txIndex = event.transaction.index
  entity.save()
}
