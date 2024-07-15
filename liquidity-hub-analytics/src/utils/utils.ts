import {Address, BigDecimal, BigInt, Bytes, ethereum, log} from "@graphprotocol/graph-ts";
import {ERC20Contract} from "../../generated/ExclusiveDutchOrderReactor/ERC20Contract";
import {ERC20SymbolBytes} from "../../generated/ExclusiveDutchOrderReactor/ERC20SymbolBytes";
import {chainlinkOracle} from "../../generated/ExclusiveDutchOrderReactor/chainlinkOracle";
import {pythOracle} from "../../generated/ExclusiveDutchOrderReactor/pythOracle";
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
    getOracleAddress,
    ORDER_SIGNATURE,
    QUICK_DECIMALS,
    QUICK_USDC_POOL,
    THE_BUSD_POOL,
    THE_DECIMALS,
    TUPLE_PREFIX,
    BOO_WFTM_POOL,
    WFTM_ADDRESS,
    QUICK_ADDRESS,
    BOO_ADDRESS,
    THE_ADDRESS,
    PYTH_ORACLE_ADDRESS
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

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
    let contract = ERC20Contract.bind(tokenAddress);

    // try types uint8 for decimals
    let decimalResult = contract.try_decimals();
    if (!decimalResult.reverted) {
        return decimalResult.value;
    }

    log.warning(
        "[getTokenParams]token {} decimals() call reverted; default to 18 decimals",
        [tokenAddress.toHexString()]
    );
    return BigInt.fromI32(18)
}

function generateDivFactor(input: string): BigDecimal {
    let num: i32 = <i32>parseInt(input, 10);
    return BigDecimal.fromString("1" + "0".repeat(num));
}

function getV2Price(poolAddress: string): BigDecimal {
    const contract = UniswapV2Pair.bind(Address.fromString(poolAddress));
    const token0 = contract.token0()
    const token0Decimals = fetchTokenDecimals(token0)
    const token1 = contract.token1()
    const token1Decimals = fetchTokenDecimals(token1)
    const reserves = contract.getReserves()
    return (reserves.value0.toBigDecimal()/generateDivFactor(token0Decimals.toString())) / (reserves.value1.toBigDecimal()/generateDivFactor(token1Decimals.toString()))
}

function fetchPriceFromPyth(priceFeedId: string): BigDecimal {
    const pythOracleContract = pythOracle.bind(Address.fromString(PYTH_ORACLE_ADDRESS))
    let getPriceResult = pythOracleContract.try_getPrice(Bytes.fromHexString(priceFeedId))
    let price: BigInt
    let expo: i32
    if (!getPriceResult.reverted) {
        log.info('{}', ['using getPrice'])
        price = getPriceResult.value.price
        expo = getPriceResult.value.expo
    } else {
        log.info('{}', ['using getPriceUnsafe'])
        const getPriceUnsafeResult = pythOracleContract.try_getPriceUnsafe(Bytes.fromHexString(priceFeedId))
        if (getPriceUnsafeResult.reverted) return BigDecimal.fromString("0")
        price = getPriceUnsafeResult.value.price
        expo = getPriceUnsafeResult.value.expo
    }
    log.info('price: {}, expo: {}', [price.toString(), expo.toString()])

    const scaleFactor = BigInt.fromI32(10).pow(u8(Math.abs(expo)))
    const result = price.toBigDecimal().div(scaleFactor.toBigDecimal())

    log.info('finished fetchPriceFromPyth. result: {}', [result.toString()])
    return result
}

export function fetchUSDValue(assetName: string, assetAddress: string): BigDecimal | null {
    log.info("fetchUSDValue for assets {} {}", [assetName, assetAddress])
    if (assetName == "QUICK" && assetAddress == QUICK_ADDRESS) return getV2Price(QUICK_USDC_POOL)/BigDecimal.fromString(QUICK_DECIMALS); // only for matic
    if (assetName == "THE" && assetAddress == THE_ADDRESS) return getV2Price(THE_BUSD_POOL)/BigDecimal.fromString(THE_DECIMALS); // only for bsc
    if (assetName == "BOO" && assetAddress == BOO_ADDRESS) { // only for ftm
        const booWftm = getV2Price(BOO_WFTM_POOL);
        const ftmPrice = fetchUSDValue("WFTM", WFTM_ADDRESS);
        return booWftm * ftmPrice!;
    }
    const oracleId = getOracleAddress(assetName);
    if (oracleId && oracleId != '') {
        const assetDecimals = fetchTokenDecimals(Address.fromString(assetAddress)).toString()
        if (oracleId.length == 66) {
            return fetchPriceFromPyth(oracleId).div(generateDivFactor(assetDecimals))
        } else {
            const oracleAddress: Address = Address.fromString(oracleId);
            const oracleContract = chainlinkOracle.bind(oracleAddress);
            return oracleContract.latestAnswer().divDecimal(generateDivFactor(assetDecimals)).div(FACTOR_1E8); // divide by decimals and by 1e8
        }
    }
    return null;
}

export function fetchTokenUsdValue(swap: Swap): BigDecimal {
    let baseAssetsUsd: BigDecimal | null;

    if (swap.srcAmount) {
        baseAssetsUsd = fetchUSDValue(swap.srcTokenSymbol!, swap.srcTokenAddress!)
        if (baseAssetsUsd) {
            return baseAssetsUsd * BigDecimal.fromString(swap.srcAmount!)
        }
    }
    if (swap.dstTokenSymbol && swap.dexAmountOut) {
        baseAssetsUsd = fetchUSDValue(swap.dstTokenSymbol!, swap.dstTokenAddress!);
        if (baseAssetsUsd) {
            return baseAssetsUsd * BigDecimal.fromString(swap.dexAmountOut!)
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
        [EXECUTOR_ADDRESS_V3, EXECUTOR_ADDRESS_V2].includes(executorAddress) ? EXECUTE_SIGNATURE_V2 : EXECUTE_SIGNATURE_V1

    const executeDecoded = parseTX(event, executeSig)
    const orderRaw = executeSig == EXECUTE_SIGNATURE_V1 ?
        executeDecoded.at(0).toTuple().at(0).toBytes() :
        executeDecoded.at(0).toArray().at(0).toTuple().at(0).toBytes()
    const order = ethereum.decode(ORDER_SIGNATURE, orderRaw)
    return order!.toTuple().at(-1).toArray()
}
