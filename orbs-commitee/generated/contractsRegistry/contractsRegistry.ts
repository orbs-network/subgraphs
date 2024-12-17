// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class ContractAddressUpdated extends ethereum.Event {
  get params(): ContractAddressUpdated__Params {
    return new ContractAddressUpdated__Params(this);
  }
}

export class ContractAddressUpdated__Params {
  _event: ContractAddressUpdated;

  constructor(event: ContractAddressUpdated) {
    this._event = event;
  }

  get contractName(): string {
    return this._event.parameters[0].value.toString();
  }

  get addr(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get managedContract(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class ContractRegistryUpdated extends ethereum.Event {
  get params(): ContractRegistryUpdated__Params {
    return new ContractRegistryUpdated__Params(this);
  }
}

export class ContractRegistryUpdated__Params {
  _event: ContractRegistryUpdated;

  constructor(event: ContractRegistryUpdated) {
    this._event = event;
  }

  get newContractRegistry(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class InitializationComplete extends ethereum.Event {
  get params(): InitializationComplete__Params {
    return new InitializationComplete__Params(this);
  }
}

export class InitializationComplete__Params {
  _event: InitializationComplete;

  constructor(event: InitializationComplete) {
    this._event = event;
  }
}

export class ManagerChanged extends ethereum.Event {
  get params(): ManagerChanged__Params {
    return new ManagerChanged__Params(this);
  }
}

export class ManagerChanged__Params {
  _event: ManagerChanged;

  constructor(event: ManagerChanged) {
    this._event = event;
  }

  get role(): string {
    return this._event.parameters[0].value.toString();
  }

  get newManager(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class RegistryManagementTransferred extends ethereum.Event {
  get params(): RegistryManagementTransferred__Params {
    return new RegistryManagementTransferred__Params(this);
  }
}

export class RegistryManagementTransferred__Params {
  _event: RegistryManagementTransferred;

  constructor(event: RegistryManagementTransferred) {
    this._event = event;
  }

  get previousRegistryAdmin(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newRegistryAdmin(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class contractsRegistry extends ethereum.SmartContract {
  static bind(address: Address): contractsRegistry {
    return new contractsRegistry("contractsRegistry", address);
  }

  getContract(contractName: string): Address {
    let result = super.call("getContract", "getContract(string):(address)", [
      ethereum.Value.fromString(contractName),
    ]);

    return result[0].toAddress();
  }

  try_getContract(contractName: string): ethereum.CallResult<Address> {
    let result = super.tryCall("getContract", "getContract(string):(address)", [
      ethereum.Value.fromString(contractName),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getManagedContracts(): Array<Address> {
    let result = super.call(
      "getManagedContracts",
      "getManagedContracts():(address[])",
      [],
    );

    return result[0].toAddressArray();
  }

  try_getManagedContracts(): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall(
      "getManagedContracts",
      "getManagedContracts():(address[])",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  getManager(role: string): Address {
    let result = super.call("getManager", "getManager(string):(address)", [
      ethereum.Value.fromString(role),
    ]);

    return result[0].toAddress();
  }

  try_getManager(role: string): ethereum.CallResult<Address> {
    let result = super.tryCall("getManager", "getManager(string):(address)", [
      ethereum.Value.fromString(role),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getPreviousContractRegistry(): Address {
    let result = super.call(
      "getPreviousContractRegistry",
      "getPreviousContractRegistry():(address)",
      [],
    );

    return result[0].toAddress();
  }

  try_getPreviousContractRegistry(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getPreviousContractRegistry",
      "getPreviousContractRegistry():(address)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  initializationAdmin(): Address {
    let result = super.call(
      "initializationAdmin",
      "initializationAdmin():(address)",
      [],
    );

    return result[0].toAddress();
  }

  try_initializationAdmin(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "initializationAdmin",
      "initializationAdmin():(address)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  isInitializationComplete(): boolean {
    let result = super.call(
      "isInitializationComplete",
      "isInitializationComplete():(bool)",
      [],
    );

    return result[0].toBoolean();
  }

  try_isInitializationComplete(): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isInitializationComplete",
      "isInitializationComplete():(bool)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isRegistryAdmin(): boolean {
    let result = super.call("isRegistryAdmin", "isRegistryAdmin():(bool)", []);

    return result[0].toBoolean();
  }

  try_isRegistryAdmin(): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isRegistryAdmin",
      "isRegistryAdmin():(bool)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  pendingRegistryAdmin(): Address {
    let result = super.call(
      "pendingRegistryAdmin",
      "pendingRegistryAdmin():(address)",
      [],
    );

    return result[0].toAddress();
  }

  try_pendingRegistryAdmin(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "pendingRegistryAdmin",
      "pendingRegistryAdmin():(address)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  registryAdmin(): Address {
    let result = super.call("registryAdmin", "registryAdmin():(address)", []);

    return result[0].toAddress();
  }

  try_registryAdmin(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "registryAdmin",
      "registryAdmin():(address)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _previousContractRegistry(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get registryAdmin(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ClaimRegistryManagementCall extends ethereum.Call {
  get inputs(): ClaimRegistryManagementCall__Inputs {
    return new ClaimRegistryManagementCall__Inputs(this);
  }

  get outputs(): ClaimRegistryManagementCall__Outputs {
    return new ClaimRegistryManagementCall__Outputs(this);
  }
}

export class ClaimRegistryManagementCall__Inputs {
  _call: ClaimRegistryManagementCall;

  constructor(call: ClaimRegistryManagementCall) {
    this._call = call;
  }
}

export class ClaimRegistryManagementCall__Outputs {
  _call: ClaimRegistryManagementCall;

  constructor(call: ClaimRegistryManagementCall) {
    this._call = call;
  }
}

export class InitializationCompleteCall extends ethereum.Call {
  get inputs(): InitializationCompleteCall__Inputs {
    return new InitializationCompleteCall__Inputs(this);
  }

  get outputs(): InitializationCompleteCall__Outputs {
    return new InitializationCompleteCall__Outputs(this);
  }
}

export class InitializationCompleteCall__Inputs {
  _call: InitializationCompleteCall;

  constructor(call: InitializationCompleteCall) {
    this._call = call;
  }
}

export class InitializationCompleteCall__Outputs {
  _call: InitializationCompleteCall;

  constructor(call: InitializationCompleteCall) {
    this._call = call;
  }
}

export class LockContractsCall extends ethereum.Call {
  get inputs(): LockContractsCall__Inputs {
    return new LockContractsCall__Inputs(this);
  }

  get outputs(): LockContractsCall__Outputs {
    return new LockContractsCall__Outputs(this);
  }
}

export class LockContractsCall__Inputs {
  _call: LockContractsCall;

  constructor(call: LockContractsCall) {
    this._call = call;
  }
}

export class LockContractsCall__Outputs {
  _call: LockContractsCall;

  constructor(call: LockContractsCall) {
    this._call = call;
  }
}

export class RenounceRegistryManagementCall extends ethereum.Call {
  get inputs(): RenounceRegistryManagementCall__Inputs {
    return new RenounceRegistryManagementCall__Inputs(this);
  }

  get outputs(): RenounceRegistryManagementCall__Outputs {
    return new RenounceRegistryManagementCall__Outputs(this);
  }
}

export class RenounceRegistryManagementCall__Inputs {
  _call: RenounceRegistryManagementCall;

  constructor(call: RenounceRegistryManagementCall) {
    this._call = call;
  }
}

export class RenounceRegistryManagementCall__Outputs {
  _call: RenounceRegistryManagementCall;

  constructor(call: RenounceRegistryManagementCall) {
    this._call = call;
  }
}

export class SetContractCall extends ethereum.Call {
  get inputs(): SetContractCall__Inputs {
    return new SetContractCall__Inputs(this);
  }

  get outputs(): SetContractCall__Outputs {
    return new SetContractCall__Outputs(this);
  }
}

export class SetContractCall__Inputs {
  _call: SetContractCall;

  constructor(call: SetContractCall) {
    this._call = call;
  }

  get contractName(): string {
    return this._call.inputValues[0].value.toString();
  }

  get addr(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get managedContract(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }
}

export class SetContractCall__Outputs {
  _call: SetContractCall;

  constructor(call: SetContractCall) {
    this._call = call;
  }
}

export class SetManagerCall extends ethereum.Call {
  get inputs(): SetManagerCall__Inputs {
    return new SetManagerCall__Inputs(this);
  }

  get outputs(): SetManagerCall__Outputs {
    return new SetManagerCall__Outputs(this);
  }
}

export class SetManagerCall__Inputs {
  _call: SetManagerCall;

  constructor(call: SetManagerCall) {
    this._call = call;
  }

  get role(): string {
    return this._call.inputValues[0].value.toString();
  }

  get manager(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class SetManagerCall__Outputs {
  _call: SetManagerCall;

  constructor(call: SetManagerCall) {
    this._call = call;
  }
}

export class SetNewContractRegistryCall extends ethereum.Call {
  get inputs(): SetNewContractRegistryCall__Inputs {
    return new SetNewContractRegistryCall__Inputs(this);
  }

  get outputs(): SetNewContractRegistryCall__Outputs {
    return new SetNewContractRegistryCall__Outputs(this);
  }
}

export class SetNewContractRegistryCall__Inputs {
  _call: SetNewContractRegistryCall;

  constructor(call: SetNewContractRegistryCall) {
    this._call = call;
  }

  get newRegistry(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetNewContractRegistryCall__Outputs {
  _call: SetNewContractRegistryCall;

  constructor(call: SetNewContractRegistryCall) {
    this._call = call;
  }
}

export class TransferRegistryManagementCall extends ethereum.Call {
  get inputs(): TransferRegistryManagementCall__Inputs {
    return new TransferRegistryManagementCall__Inputs(this);
  }

  get outputs(): TransferRegistryManagementCall__Outputs {
    return new TransferRegistryManagementCall__Outputs(this);
  }
}

export class TransferRegistryManagementCall__Inputs {
  _call: TransferRegistryManagementCall;

  constructor(call: TransferRegistryManagementCall) {
    this._call = call;
  }

  get newRegistryAdmin(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferRegistryManagementCall__Outputs {
  _call: TransferRegistryManagementCall;

  constructor(call: TransferRegistryManagementCall) {
    this._call = call;
  }
}

export class UnlockContractsCall extends ethereum.Call {
  get inputs(): UnlockContractsCall__Inputs {
    return new UnlockContractsCall__Inputs(this);
  }

  get outputs(): UnlockContractsCall__Outputs {
    return new UnlockContractsCall__Outputs(this);
  }
}

export class UnlockContractsCall__Inputs {
  _call: UnlockContractsCall;

  constructor(call: UnlockContractsCall) {
    this._call = call;
  }
}

export class UnlockContractsCall__Outputs {
  _call: UnlockContractsCall;

  constructor(call: UnlockContractsCall) {
    this._call = call;
  }
}
