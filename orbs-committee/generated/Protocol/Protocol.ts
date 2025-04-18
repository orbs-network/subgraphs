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

export class ContractRegistryAddressUpdated extends ethereum.Event {
  get params(): ContractRegistryAddressUpdated__Params {
    return new ContractRegistryAddressUpdated__Params(this);
  }
}

export class ContractRegistryAddressUpdated__Params {
  _event: ContractRegistryAddressUpdated;

  constructor(event: ContractRegistryAddressUpdated) {
    this._event = event;
  }

  get addr(): Address {
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

export class Locked extends ethereum.Event {
  get params(): Locked__Params {
    return new Locked__Params(this);
  }
}

export class Locked__Params {
  _event: Locked;

  constructor(event: Locked) {
    this._event = event;
  }
}

export class ProtocolVersionChanged extends ethereum.Event {
  get params(): ProtocolVersionChanged__Params {
    return new ProtocolVersionChanged__Params(this);
  }
}

export class ProtocolVersionChanged__Params {
  _event: ProtocolVersionChanged;

  constructor(event: ProtocolVersionChanged) {
    this._event = event;
  }

  get deploymentSubset(): string {
    return this._event.parameters[0].value.toString();
  }

  get currentVersion(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get nextVersion(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get fromTimestamp(): BigInt {
    return this._event.parameters[3].value.toBigInt();
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

export class Unlocked extends ethereum.Event {
  get params(): Unlocked__Params {
    return new Unlocked__Params(this);
  }
}

export class Unlocked__Params {
  _event: Unlocked;

  constructor(event: Unlocked) {
    this._event = event;
  }
}

export class Protocol__deploymentSubsetsResult {
  value0: boolean;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;

  constructor(value0: boolean, value1: BigInt, value2: BigInt, value3: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBoolean(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    return map;
  }

  getExists(): boolean {
    return this.value0;
  }

  getNextVersion(): BigInt {
    return this.value1;
  }

  getFromTimestamp(): BigInt {
    return this.value2;
  }

  getCurrentVersion(): BigInt {
    return this.value3;
  }
}

export class Protocol extends ethereum.SmartContract {
  static bind(address: Address): Protocol {
    return new Protocol("Protocol", address);
  }

  deploymentSubsetExists(deploymentSubset: string): boolean {
    let result = super.call(
      "deploymentSubsetExists",
      "deploymentSubsetExists(string):(bool)",
      [ethereum.Value.fromString(deploymentSubset)],
    );

    return result[0].toBoolean();
  }

  try_deploymentSubsetExists(
    deploymentSubset: string,
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "deploymentSubsetExists",
      "deploymentSubsetExists(string):(bool)",
      [ethereum.Value.fromString(deploymentSubset)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  deploymentSubsets(param0: string): Protocol__deploymentSubsetsResult {
    let result = super.call(
      "deploymentSubsets",
      "deploymentSubsets(string):(bool,uint256,uint256,uint256)",
      [ethereum.Value.fromString(param0)],
    );

    return new Protocol__deploymentSubsetsResult(
      result[0].toBoolean(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
    );
  }

  try_deploymentSubsets(
    param0: string,
  ): ethereum.CallResult<Protocol__deploymentSubsetsResult> {
    let result = super.tryCall(
      "deploymentSubsets",
      "deploymentSubsets(string):(bool,uint256,uint256,uint256)",
      [ethereum.Value.fromString(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Protocol__deploymentSubsetsResult(
        value[0].toBoolean(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
      ),
    );
  }

  getContractRegistry(): Address {
    let result = super.call(
      "getContractRegistry",
      "getContractRegistry():(address)",
      [],
    );

    return result[0].toAddress();
  }

  try_getContractRegistry(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getContractRegistry",
      "getContractRegistry():(address)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getProtocolVersion(deploymentSubset: string): BigInt {
    let result = super.call(
      "getProtocolVersion",
      "getProtocolVersion(string):(uint256)",
      [ethereum.Value.fromString(deploymentSubset)],
    );

    return result[0].toBigInt();
  }

  try_getProtocolVersion(
    deploymentSubset: string,
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getProtocolVersion",
      "getProtocolVersion(string):(uint256)",
      [ethereum.Value.fromString(deploymentSubset)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
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

  isLocked(): boolean {
    let result = super.call("isLocked", "isLocked():(bool)", []);

    return result[0].toBoolean();
  }

  try_isLocked(): ethereum.CallResult<boolean> {
    let result = super.tryCall("isLocked", "isLocked():(bool)", []);
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

  locked(): boolean {
    let result = super.call("locked", "locked():(bool)", []);

    return result[0].toBoolean();
  }

  try_locked(): ethereum.CallResult<boolean> {
    let result = super.tryCall("locked", "locked():(bool)", []);
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

  get _contractRegistry(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _registryAdmin(): Address {
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

export class CreateDeploymentSubsetCall extends ethereum.Call {
  get inputs(): CreateDeploymentSubsetCall__Inputs {
    return new CreateDeploymentSubsetCall__Inputs(this);
  }

  get outputs(): CreateDeploymentSubsetCall__Outputs {
    return new CreateDeploymentSubsetCall__Outputs(this);
  }
}

export class CreateDeploymentSubsetCall__Inputs {
  _call: CreateDeploymentSubsetCall;

  constructor(call: CreateDeploymentSubsetCall) {
    this._call = call;
  }

  get deploymentSubset(): string {
    return this._call.inputValues[0].value.toString();
  }

  get initialProtocolVersion(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class CreateDeploymentSubsetCall__Outputs {
  _call: CreateDeploymentSubsetCall;

  constructor(call: CreateDeploymentSubsetCall) {
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

export class LockCall extends ethereum.Call {
  get inputs(): LockCall__Inputs {
    return new LockCall__Inputs(this);
  }

  get outputs(): LockCall__Outputs {
    return new LockCall__Outputs(this);
  }
}

export class LockCall__Inputs {
  _call: LockCall;

  constructor(call: LockCall) {
    this._call = call;
  }
}

export class LockCall__Outputs {
  _call: LockCall;

  constructor(call: LockCall) {
    this._call = call;
  }
}

export class RefreshContractsCall extends ethereum.Call {
  get inputs(): RefreshContractsCall__Inputs {
    return new RefreshContractsCall__Inputs(this);
  }

  get outputs(): RefreshContractsCall__Outputs {
    return new RefreshContractsCall__Outputs(this);
  }
}

export class RefreshContractsCall__Inputs {
  _call: RefreshContractsCall;

  constructor(call: RefreshContractsCall) {
    this._call = call;
  }
}

export class RefreshContractsCall__Outputs {
  _call: RefreshContractsCall;

  constructor(call: RefreshContractsCall) {
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

export class SetContractRegistryCall extends ethereum.Call {
  get inputs(): SetContractRegistryCall__Inputs {
    return new SetContractRegistryCall__Inputs(this);
  }

  get outputs(): SetContractRegistryCall__Outputs {
    return new SetContractRegistryCall__Outputs(this);
  }
}

export class SetContractRegistryCall__Inputs {
  _call: SetContractRegistryCall;

  constructor(call: SetContractRegistryCall) {
    this._call = call;
  }

  get newContractRegistry(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetContractRegistryCall__Outputs {
  _call: SetContractRegistryCall;

  constructor(call: SetContractRegistryCall) {
    this._call = call;
  }
}

export class SetProtocolVersionCall extends ethereum.Call {
  get inputs(): SetProtocolVersionCall__Inputs {
    return new SetProtocolVersionCall__Inputs(this);
  }

  get outputs(): SetProtocolVersionCall__Outputs {
    return new SetProtocolVersionCall__Outputs(this);
  }
}

export class SetProtocolVersionCall__Inputs {
  _call: SetProtocolVersionCall;

  constructor(call: SetProtocolVersionCall) {
    this._call = call;
  }

  get deploymentSubset(): string {
    return this._call.inputValues[0].value.toString();
  }

  get nextVersion(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get fromTimestamp(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SetProtocolVersionCall__Outputs {
  _call: SetProtocolVersionCall;

  constructor(call: SetProtocolVersionCall) {
    this._call = call;
  }
}

export class SetRegistryAdminCall extends ethereum.Call {
  get inputs(): SetRegistryAdminCall__Inputs {
    return new SetRegistryAdminCall__Inputs(this);
  }

  get outputs(): SetRegistryAdminCall__Outputs {
    return new SetRegistryAdminCall__Outputs(this);
  }
}

export class SetRegistryAdminCall__Inputs {
  _call: SetRegistryAdminCall;

  constructor(call: SetRegistryAdminCall) {
    this._call = call;
  }

  get _registryAdmin(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetRegistryAdminCall__Outputs {
  _call: SetRegistryAdminCall;

  constructor(call: SetRegistryAdminCall) {
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

export class UnlockCall extends ethereum.Call {
  get inputs(): UnlockCall__Inputs {
    return new UnlockCall__Inputs(this);
  }

  get outputs(): UnlockCall__Outputs {
    return new UnlockCall__Outputs(this);
  }
}

export class UnlockCall__Inputs {
  _call: UnlockCall;

  constructor(call: UnlockCall) {
    this._call = call;
  }
}

export class UnlockCall__Outputs {
  _call: UnlockCall;

  constructor(call: UnlockCall) {
    this._call = call;
  }
}
