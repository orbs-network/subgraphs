import {
  Staked as StakedEvent,
  Restaked as RestakedEvent,
  Unstaked as UnstakedEvent,
  Withdrew as WithdrewEvent
} from "../generated/Stake/Stake"
import {
  Staked,
  Restaked,
  Unstaked,
  Withdrew
} from "../generated/schema"

export function handleStaked(event: StakedEvent): void {
  let entity = new Staked(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.stakeOwner = event.params.stakeOwner
  entity.amount = event.params.amount
  entity.totalStakedAmount = event.params.totalStakedAmount
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.logIndex = event.logIndex
  entity.txIndex = event.transaction.index
  entity.save()
}

export function handleRestaked(event: RestakedEvent): void {
  let entity = new Restaked(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.stakeOwner = event.params.stakeOwner
  entity.amount = event.params.amount
  entity.totalStakedAmount = event.params.totalStakedAmount
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.logIndex = event.logIndex
  entity.txIndex = event.transaction.index
  entity.save()
}

export function handleUnstaked(event: UnstakedEvent): void {
  let entity = new Unstaked(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.stakeOwner = event.params.stakeOwner
  entity.amount = event.params.amount
  entity.totalStakedAmount = event.params.totalStakedAmount
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.logIndex = event.logIndex
  entity.txIndex = event.transaction.index
  entity.save()
}

export function handleWithdrew(event: WithdrewEvent): void {
  let entity = new Withdrew(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.stakeOwner = event.params.stakeOwner
  entity.amount = event.params.amount
  entity.totalStakedAmount = event.params.totalStakedAmount
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.logIndex = event.logIndex
  entity.txIndex = event.transaction.index
  entity.save()
}
