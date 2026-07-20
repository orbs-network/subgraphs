import {
  GuardianRegistered as GuardianRegisteredEvent
} from "../generated/GuardiansRegistration/GuardiansRegistration"
import {
  GuardianRegistered
} from "../generated/schema"

export function handleGuardianRegistered(event: GuardianRegisteredEvent): void {
  let entity = new GuardianRegistered(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.guardian = event.params.guardian
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.logIndex = event.logIndex
  entity.txIndex = event.transaction.index
  entity.save()
}
