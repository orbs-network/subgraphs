import {Address, BigDecimal, BigInt, Bytes, ethereum, log} from "@graphprotocol/graph-ts";
import {ERC20Contract} from "../../generated/ExclusiveDutchOrderReactor/ERC20Contract";
import {ERC20SymbolBytes} from "../../generated/ExclusiveDutchOrderReactor/ERC20SymbolBytes";
import {chainlinkOracle} from "../../generated/ExclusiveDutchOrderReactor/chainlinkOracle";
import {UniswapV2Pair} from "../../generated/ExclusiveDutchOrderReactor/UniswapV2Pair";
import {
    EXECUTE_SIGNATURE_V1,
    EXECUTE_SIGNATURE_V2,
    EXECUTE_SIGNATURE_V4,
    EXECUTOR_ADDRESS_V2,
    EXECUTOR_ADDRESS_V3,
    EXECUTOR_ADDRESS_V4,
    FACTOR_1E8,
    FEES_ADDRESS,
    getAssetInfo,
    ORDER_SIGNATURE,
    QUICK_USDC_POOL,
    TUPLE_PREFIX
} from "./constants";
import {Swap} from "../../generated/schema";

export function bytesToBigInt(b: Bytes): BigInt | null {
    if (b.length > 32) {
        log.error("[toBigInt]Invalid input length {}", [b.length.toString()]);
        return null;
    }
    const paddedByteString = `0x${b.toHexString().slice(2).padStart(32, "0")}`;
    // reverse() for little endian
    const correctBytes = Bytes.fromUint8Array(
        Bytes.fromHexString(paddedByteString).reverse()
    );
    return BigInt.fromUnsignedBytes(correctBytes);
}

export function formatTimestamp(epoch: BigInt): string {
    const milliEpoch = epoch * BigInt.fromI32(1000)
    const date = new Date(milliEpoch.toU64()); // Convert epoch to milliseconds
    return date.toISOString(); // Convert to ISO string format
}

export function hexStringToAmount(data: Bytes): string {
    return bytesToBigInt(data)!.toString()
}

export function fetchTokenSymbol(tokenAddress: Address): string {
    let contract = ERC20Contract.bind(tokenAddress);
    let contractSymbolBytes = ERC20SymbolBytes.bind(tokenAddress);

    // try types string and bytes32 for symbol
    let symbolValue = "Unknown";
    let symbolResult = contract.try_symbol();
    if (!symbolResult.reverted) {
        return symbolResult.value;
    }

    function isNullEthValue(value: string): boolean {
        return (
            value ==
            "0x0000000000000000000000000000000000000000000000000000000000000001"
        );
    }

    // non-standard ERC20 implementation
    let symbolResultBytes = contractSymbolBytes.try_symbol();
    if (!symbolResultBytes.reverted) {
        // for broken pairs that have no symbol function exposed
        if (!isNullEthValue(symbolResultBytes.value.toHexString())) {
            return symbolResultBytes.value.toString();
        }
    }
    log.warning(
        "[getTokenParams]Fail to get symbol for token {}; default to 'Unknown'",
        [tokenAddress.toHexString()]
    );
    return symbolValue;
}

function generateDivFactor(input: string): BigDecimal {
    let num: i32 = <i32>parseInt(input, 10);
    return BigDecimal.fromString("1" + "0".repeat(num));
}

export function addTrailingZeroes(input: string): BigDecimal {
    let num: i32 = <i32>parseInt(input, 10);
    let result: string = "1";
    for (let i: i32 = 0; i < num; i++) {
        result += "0";
    }
    return BigDecimal.fromString(result);
}

function getQuickPrice(): BigDecimal {
    const contract = UniswapV2Pair.bind(Address.fromString(QUICK_USDC_POOL));
    const reserves = contract.getReserves()
    return (reserves.value0.toBigDecimal()/BigDecimal.fromString("1e6")) / (reserves.value1.toBigDecimal()/BigDecimal.fromString("1e18"))
}

export function fetchUSDValue(asset: string): BigDecimal | null {
    if (asset == "QUICK") return getQuickPrice()/BigDecimal.fromString("1e18");
    const assetInfo = getAssetInfo(asset);
    if (assetInfo) {
        const assetAddress: Address = Address.fromString(assetInfo[0]);
        if (assetAddress) {
            const oracleContract = chainlinkOracle.bind(assetAddress);
            return oracleContract.latestAnswer().divDecimal(generateDivFactor(assetInfo[1])).div(FACTOR_1E8); // divide by decimals and by 1e8
        }
    }
    return null;
}

export function fetchDstTokenUsdValue(swap: Swap): BigDecimal {
    let baseAssetsUsd: BigDecimal | null;

    if (swap.dstTokenSymbol && swap.dexAmountOut) {
        baseAssetsUsd = fetchUSDValue(swap.dstTokenSymbol!);
        if (baseAssetsUsd) {
            return baseAssetsUsd * BigDecimal.fromString(swap.dexAmountOut!)
        }
    }
    if (swap.srcAmount) {
        baseAssetsUsd = fetchUSDValue(swap.srcTokenSymbol!)
        if (baseAssetsUsd) {
            return baseAssetsUsd * BigDecimal.fromString(swap.srcAmount!)
        }
    }
    return BigDecimal.fromString("0");
}

function parseTX(event: ethereum.Event, executeSig: string): ethereum.Tuple {
    const inputDataHexString = event.transaction.input.toHexString().slice(10); // take away function signature: '0x????????'
    const hexStringToDecode = TUPLE_PREFIX + inputDataHexString; // prepend tuple offset
    const executeRaw = Bytes.fromByteArray(Bytes.fromHexString(hexStringToDecode));
    return ethereum.decode(executeSig, executeRaw)!.toTuple()
}

function parseFeesAddress(event: ethereum.Event, executeSig: string): string {
    const executeDecoded = parseTX(event, executeSig);
    return executeDecoded.at(2).toAddress().toHexString()
}

export function getFeesAddress(event: ethereum.Event, executorAddress: string): string {
    if (executorAddress == EXECUTOR_ADDRESS_V4) return parseFeesAddress(event, EXECUTE_SIGNATURE_V4)
    return FEES_ADDRESS
}

export function getOrderOutput(event: ethereum.Event, executorAddress: string): Array<ethereum.Value> { // TODO: will have to change once we introduce multi-orders
    const executeSig = executorAddress == EXECUTOR_ADDRESS_V4 ? EXECUTE_SIGNATURE_V4 :
        [EXECUTOR_ADDRESS_V3, EXECUTOR_ADDRESS_V2].includes(executorAddress) ? EXECUTE_SIGNATURE_V2 :EXECUTE_SIGNATURE_V1

    const executeDecoded = parseTX(event, executeSig)
    const orderRaw = executeSig == EXECUTE_SIGNATURE_V1 ?
        executeDecoded.at(0).toTuple().at(0).toBytes() :
        executeDecoded.at(0).toArray().at(0).toTuple().at(0).toBytes()
    const order = ethereum.decode(ORDER_SIGNATURE, orderRaw)
    return order!.toTuple().at(-1).toArray()
}
