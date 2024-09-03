import {
  ContractRegistryAddressUpdated as ContractRegistryAddressUpdatedEvent,
  Delegated as DelegatedEvent,
  DelegatedStakeChanged as DelegatedStakeChangedEvent,
  DelegationInitialized as DelegationInitializedEvent,
  InitializationComplete as InitializationCompleteEvent,
  Locked as LockedEvent,
  RegistryManagementTransferred as RegistryManagementTransferredEvent,
  Unlocked as UnlockedEvent
} from "../generated/Delegations/Delegations"
import {
  ContractRegistryAddressUpdated,
  Delegated,
  DelegatedStakeChanged,
  DelegationInitialized,
  InitializationComplete,
  Locked,
  RegistryManagementTransferred,
  Unlocked,
  GuardianToDelegators,
  DelegatorToGuardian,
  Delegator,
  DelegatorMap,
  GuardianInfo,
  DelegationStakes,
  DelegateActions
} from "../generated/schema"
import {BigInt} from "@graphprotocol/graph-ts";

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

export function handleDelegated(event: DelegatedEvent): void {
  let entity = new Delegated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  const from = event.params.from.toHexString()
  const to = event.params.to.toHexString()

  let delegator = DelegatorToGuardian.load(from)
  if (delegator != null) {
    // Remove delegator from current guardian
    const currentGuardian = GuardianToDelegators.load(delegator.guardian)!
    let delegators = currentGuardian.delegators
    const index = delegators.indexOf(from)
    if (index != -1) {
      delegators.splice(index, 1)
      currentGuardian.delegators = delegators
      currentGuardian.save()
    }
  } else {
    // Create a new delegator
    delegator = new DelegatorToGuardian(from)
  }
  delegator.guardian = to
  delegator.save()

  // Update the new guardian
  let guardian = GuardianToDelegators.load(to)
  if (guardian == null) {
    guardian = new GuardianToDelegators(to)
    guardian.delegators = [from]
  } else {
    const delegators = guardian.delegators
    delegators.push(from)
    guardian.delegators = delegators
  }
  guardian.save()
}

export function handleDelegatedStakeChanged(
  event: DelegatedStakeChangedEvent
): void {
  let entity = new DelegatedStakeChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.addr = event.params.addr
  entity.selfDelegatedStake = event.params.selfDelegatedStake
  entity.delegatedStake = event.params.delegatedStake
  entity.delegator = event.params.delegator
  entity.delegatorContributedStake = event.params.delegatorContributedStake

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let g = GuardianInfo.load(entity.addr)
  let dm: DelegatorMap | null = null
  let d: Delegator | null = null

  if (g == null) {
    g = new GuardianInfo(entity.addr)
    g.nDelegates = BigInt.fromI32(0)
  }
  if (entity.delegator != entity.addr) {
    // Check if the GuardianInfo already has a delegatorMap
    if (g.delegatorMap != null) {
      dm = DelegatorMap.load(g.delegatorMap)
    } else {
      dm = new DelegatorMap(entity.delegator)
      g.delegatorMap = entity.delegator // Assuming delegatorMap is a reference by ID
      g.nDelegates = g.nDelegates.plus(BigInt.fromI32(1)) // Increment the delegate count
    }

    // Check if the DelegatorMap already has the delegator
    d = Delegator.load(entity.delegator)
    if (d == null) {
      d = new Delegator(entity.delegator)
    }

    d.lastChangeBlock = entity.blockNumber
    d.lastChangeTime = entity.blockTimestamp
    d.address = entity.delegator
    d.stake = entity.delegatorContributedStake
    d.save()

    dm.delegator = entity.delegator // Store delegator ID as a reference
    dm.save()
  }

    // let ds = g.delegationStakes
    // if (ds != null) {
    //   ds.blockNumber = entity.blockNumber
    //   ds.selfStake = entity.selfDelegatedStake
    //   ds.delegatedStake = entity.delegatedStake.minus(entity.selfDelegatedStake)
    //   ds.totalStake = entity.delegatedStake
    //   ds.nDelegates = g.nDelegates
    // }
    // else {
    //
    // }
    // g.delegatorMap = dm
    // d.delegationStakes = DelegationStakes
    g.save()
}

export function handleDelegationInitialized(
  event: DelegationInitializedEvent
): void {
  let entity = new DelegationInitialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

// export function handleDelegationsImported(
//   event: DelegationsImportedEvent
// ): void {
//   let entity = new DelegationsImported(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.from = event.params.from
//   entity.to = event.params.to
//
//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash
//
//   entity.save()
// }

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
