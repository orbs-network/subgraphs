import {Address, BigDecimal, BigInt, Bytes, log} from "@graphprotocol/graph-ts";
import {ERC20Contract} from "../../generated/TWAP/ERC20Contract";
import {ERC20SymbolBytes} from "../../generated/TWAP/ERC20SymbolBytes";
import {chainlinkOracle} from "../../generated/TWAP/chainlinkOracle";
import {pythOracle} from "../../generated/TWAP/pythOracle";
import {UniswapV2Pair} from "../../generated/TWAP/UniswapV2Pair";
import {PancakePair} from "../../generated/TWAP/PancakePair";
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
    BSWAP_ADDRESS, CHR_ADDRESS, CHR_USDC_POOL, CHR_DECIMALS, ARX_ADDRESS, ARX_WETH_POOL, BSWAP_WETH_POOL, BASE_WETH_ADDRESS, ARB_WETH_ADDRESS,
    LYNX_ADDRESS, LYNX_WETH_POOL, LINEA_WETH_ADDRESS,
    PYTH_ORACLE_ADDRESS
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
    let token0: Address;
    let token1: Address;
    let reserves0: BigDecimal;
    let reserves1: BigDecimal;

    log.info('poolAddress: {}', [poolAddress])

    const uniContract = UniswapV2Pair.bind(Address.fromString(poolAddress))
    const tryToken0 = uniContract.try_token0()
    if (tryToken0.reverted) {
        log.info('{}', ['reverted'])
        const pancakeContract = PancakePair.bind(Address.fromString(poolAddress))
        token0 = pancakeContract.token0()
        log.info('{}', ['token0'])
        token1 = pancakeContract.token1()
        log.info('{}', ['token1'])
        const reserves = pancakeContract.getReserves()
        reserves0 = reserves.value0.toBigDecimal()
        reserves1 = reserves.value1.toBigDecimal()
    }
    else {
        log.info('{}', ['else'])
        token0 = tryToken0.value
        log.info('{}', ['else token0'])
        token1 = uniContract.token1()
        log.info('{}', ['else token1'])
        const reserves = uniContract.getReserves()
        reserves0 = reserves.value0.toBigDecimal()
        reserves1 = reserves.value1.toBigDecimal()
    }
    const token0Decimals = fetchTokenDecimals(token0)
    const token1Decimals = fetchTokenDecimals(token1)
    return (reserves0/generateDivFactor(token0Decimals.toString())) / (reserves1/generateDivFactor(token1Decimals.toString()))
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

export function fetchUSDValue(assetName: string, assetAddress: string): BigDecimal {
    log.info('fetchUSDValue. {}, {}', [assetName, assetAddress])
    if (assetName == "QUICK" && assetAddress == QUICK_ADDRESS) return getV2Price(QUICK_USDC_POOL) / BigDecimal.fromString(QUICK_DECIMALS); // only for matic
    if (assetName == "THE" && assetAddress == THE_ADDRESS) return getV2Price(THE_BUSD_POOL) / BigDecimal.fromString(THE_DECIMALS); // only for bsc
    if (assetName == "CHR" && assetAddress == CHR_ADDRESS) return BigDecimal.fromString(CHR_DECIMALS) / getV2Price(CHR_USDC_POOL); // only for arbitrum
    if (assetName == "ARX" && assetAddress == ARX_ADDRESS) { // only for arbitrum
        const arxWeth = getV2Price(ARX_WETH_POOL)
        const wethPrice = fetchUSDValue("WETH", ARB_WETH_ADDRESS);
        return arxWeth * wethPrice
    }
    if (assetName == "BSWAP" && assetAddress == BSWAP_ADDRESS) { // only for base
        const bswapWeth = getV2Price(BSWAP_WETH_POOL)
        const wethPrice = fetchUSDValue("WETH", BASE_WETH_ADDRESS);
        return bswapWeth * wethPrice
    }
    if (assetName == "BOO" && assetAddress == BOO_ADDRESS) { // only for ftm
        const booWftm = getV2Price(BOO_WFTM_POOL);
        const ftmPrice = fetchUSDValue("WFTM", WFTM_ADDRESS);
        return booWftm * ftmPrice;
    }
    if (assetName == "LYNX" && assetAddress == LYNX_ADDRESS) { // only for linea
        const lynxWeth = getV2Price(LYNX_WETH_POOL);
        const wethPrice = fetchUSDValue("WETH", LINEA_WETH_ADDRESS);
        return wethPrice/lynxWeth;
    }
    const oracle = getOracleAddress(assetName);
    if (oracle && oracle != '') {
        const assetDecimals = fetchTokenDecimals(Address.fromString(assetAddress)).toString()
        log.info('assetDecimals. {}', [assetDecimals.toString()])
        if (oracle.length == 66) {
            return fetchPriceFromPyth(oracle).div(generateDivFactor(assetDecimals))
        } else {
            const oracleAddress: Address = Address.fromString(oracle);
            log.info('oracleAddress. {}', [oracleAddress.toHexString()])
            if (oracleAddress) {
                const oracleContract = chainlinkOracle.bind(oracleAddress);
                const latestAnswer = oracleContract.try_latestAnswer()
                if (!latestAnswer.reverted) return latestAnswer.value.divDecimal(generateDivFactor(assetDecimals)).div(FACTOR_1E8); // divide by decimals and by 1e8
            }
        }
    }
    return BigDecimal.fromString("0");
}
