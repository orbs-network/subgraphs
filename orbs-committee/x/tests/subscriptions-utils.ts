import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
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
} from "../generated/Subscriptions/Subscriptions"

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

export function createGenesisRefTimeDelayChangedEvent(
  newGenesisRefTimeDelay: BigInt
): GenesisRefTimeDelayChanged {
  let genesisRefTimeDelayChangedEvent = changetype<GenesisRefTimeDelayChanged>(
    newMockEvent()
  )

  genesisRefTimeDelayChangedEvent.parameters = new Array()

  genesisRefTimeDelayChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newGenesisRefTimeDelay",
      ethereum.Value.fromUnsignedBigInt(newGenesisRefTimeDelay)
    )
  )

  return genesisRefTimeDelayChangedEvent
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

export function createMinimumInitialVcPaymentChangedEvent(
  newMinimumInitialVcPayment: BigInt
): MinimumInitialVcPaymentChanged {
  let minimumInitialVcPaymentChangedEvent =
    changetype<MinimumInitialVcPaymentChanged>(newMockEvent())

  minimumInitialVcPaymentChangedEvent.parameters = new Array()

  minimumInitialVcPaymentChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newMinimumInitialVcPayment",
      ethereum.Value.fromUnsignedBigInt(newMinimumInitialVcPayment)
    )
  )

  return minimumInitialVcPaymentChangedEvent
}

export function createPaymentEvent(
  vcId: BigInt,
  by: Address,
  amount: BigInt,
  tier: string,
  rate: BigInt
): Payment {
  let paymentEvent = changetype<Payment>(newMockEvent())

  paymentEvent.parameters = new Array()

  paymentEvent.parameters.push(
    new ethereum.EventParam("vcId", ethereum.Value.fromUnsignedBigInt(vcId))
  )
  paymentEvent.parameters.push(
    new ethereum.EventParam("by", ethereum.Value.fromAddress(by))
  )
  paymentEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  paymentEvent.parameters.push(
    new ethereum.EventParam("tier", ethereum.Value.fromString(tier))
  )
  paymentEvent.parameters.push(
    new ethereum.EventParam("rate", ethereum.Value.fromUnsignedBigInt(rate))
  )

  return paymentEvent
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

export function createSubscriberAddedEvent(
  subscriber: Address
): SubscriberAdded {
  let subscriberAddedEvent = changetype<SubscriberAdded>(newMockEvent())

  subscriberAddedEvent.parameters = new Array()

  subscriberAddedEvent.parameters.push(
    new ethereum.EventParam(
      "subscriber",
      ethereum.Value.fromAddress(subscriber)
    )
  )

  return subscriberAddedEvent
}

export function createSubscriberRemovedEvent(
  subscriber: Address
): SubscriberRemoved {
  let subscriberRemovedEvent = changetype<SubscriberRemoved>(newMockEvent())

  subscriberRemovedEvent.parameters = new Array()

  subscriberRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "subscriber",
      ethereum.Value.fromAddress(subscriber)
    )
  )

  return subscriberRemovedEvent
}

export function createSubscriptionChangedEvent(
  vcId: BigInt,
  owner: Address,
  name: string,
  genRefTime: BigInt,
  tier: string,
  rate: BigInt,
  expiresAt: BigInt,
  isCertified: boolean,
  deploymentSubset: string
): SubscriptionChanged {
  let subscriptionChangedEvent = changetype<SubscriptionChanged>(newMockEvent())

  subscriptionChangedEvent.parameters = new Array()

  subscriptionChangedEvent.parameters.push(
    new ethereum.EventParam("vcId", ethereum.Value.fromUnsignedBigInt(vcId))
  )
  subscriptionChangedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  subscriptionChangedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  subscriptionChangedEvent.parameters.push(
    new ethereum.EventParam(
      "genRefTime",
      ethereum.Value.fromUnsignedBigInt(genRefTime)
    )
  )
  subscriptionChangedEvent.parameters.push(
    new ethereum.EventParam("tier", ethereum.Value.fromString(tier))
  )
  subscriptionChangedEvent.parameters.push(
    new ethereum.EventParam("rate", ethereum.Value.fromUnsignedBigInt(rate))
  )
  subscriptionChangedEvent.parameters.push(
    new ethereum.EventParam(
      "expiresAt",
      ethereum.Value.fromUnsignedBigInt(expiresAt)
    )
  )
  subscriptionChangedEvent.parameters.push(
    new ethereum.EventParam(
      "isCertified",
      ethereum.Value.fromBoolean(isCertified)
    )
  )
  subscriptionChangedEvent.parameters.push(
    new ethereum.EventParam(
      "deploymentSubset",
      ethereum.Value.fromString(deploymentSubset)
    )
  )

  return subscriptionChangedEvent
}

export function createUnlockedEvent(): Unlocked {
  let unlockedEvent = changetype<Unlocked>(newMockEvent())

  unlockedEvent.parameters = new Array()

  return unlockedEvent
}

export function createVcConfigRecordChangedEvent(
  vcId: BigInt,
  key: string,
  value: string
): VcConfigRecordChanged {
  let vcConfigRecordChangedEvent = changetype<VcConfigRecordChanged>(
    newMockEvent()
  )

  vcConfigRecordChangedEvent.parameters = new Array()

  vcConfigRecordChangedEvent.parameters.push(
    new ethereum.EventParam("vcId", ethereum.Value.fromUnsignedBigInt(vcId))
  )
  vcConfigRecordChangedEvent.parameters.push(
    new ethereum.EventParam("key", ethereum.Value.fromString(key))
  )
  vcConfigRecordChangedEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromString(value))
  )

  return vcConfigRecordChangedEvent
}

export function createVcCreatedEvent(vcId: BigInt): VcCreated {
  let vcCreatedEvent = changetype<VcCreated>(newMockEvent())

  vcCreatedEvent.parameters = new Array()

  vcCreatedEvent.parameters.push(
    new ethereum.EventParam("vcId", ethereum.Value.fromUnsignedBigInt(vcId))
  )

  return vcCreatedEvent
}

export function createVcOwnerChangedEvent(
  vcId: BigInt,
  previousOwner: Address,
  newOwner: Address
): VcOwnerChanged {
  let vcOwnerChangedEvent = changetype<VcOwnerChanged>(newMockEvent())

  vcOwnerChangedEvent.parameters = new Array()

  vcOwnerChangedEvent.parameters.push(
    new ethereum.EventParam("vcId", ethereum.Value.fromUnsignedBigInt(vcId))
  )
  vcOwnerChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  vcOwnerChangedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return vcOwnerChangedEvent
}
