import {Address, BigDecimal, BigInt, Bytes, log} from "@graphprotocol/graph-ts";
import {ERC20Contract} from "../../generated/TWAP/ERC20Contract";
import {ERC20SymbolBytes} from "../../generated/TWAP/ERC20SymbolBytes";
import {chainlinkOracle} from "../../generated/TWAP/chainlinkOracle";
import {UniswapV2Pair} from "../../generated/TWAP/UniswapV2Pair";
import {
    BOO_WFTM_POOL,
    FACTOR_1E8,
    getOracleAddress, NATIVE_ASSET,
    QUICK_DECIMALS,
    QUICK_USDC_POOL,
    THE_BUSD_POOL,
    THE_DECIMALS,
    WFTM_ADDRESS,
    QUICK_ADDRESS,
    BOO_ADDRESS,
    THE_ADDRESS,
} from "./constants";

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

    if (tokenAddress == Address.zero()) return NATIVE_ASSET;

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

export function fetchUSDValue(assetName: string, assetAddress: string): BigDecimal {
    if (assetName == "QUICK" && assetAddress == QUICK_ADDRESS) return getV2Price(QUICK_USDC_POOL)/BigDecimal.fromString(QUICK_DECIMALS); // only for matic
    if (assetName == "THE" && assetAddress == THE_ADDRESS) return getV2Price(THE_BUSD_POOL)/BigDecimal.fromString(THE_DECIMALS); // only for bsc
    if (assetName == "BOO" && assetAddress == BOO_ADDRESS) { // only for ftm
        const booWftm = getV2Price(BOO_WFTM_POOL);
        const ftmPrice = fetchUSDValue("WFTM", WFTM_ADDRESS);
        return booWftm * ftmPrice;
    }
    const oracle = getOracleAddress(assetName);
    if (oracle && oracle != '') {
        const oracleAddress: Address = Address.fromString(oracle);
        const assetDecimals = fetchTokenDecimals(Address.fromString(assetAddress)).toString()
        if (oracleAddress) {
            const oracleContract = chainlinkOracle.bind(oracleAddress);
            return oracleContract.latestAnswer().divDecimal(generateDivFactor(assetDecimals)).div(FACTOR_1E8); // divide by decimals and by 1e8
        }
    }
    return BigDecimal.fromString("0");
}
