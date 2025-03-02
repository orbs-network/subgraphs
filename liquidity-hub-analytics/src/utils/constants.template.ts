import {BigDecimal} from "@graphprotocol/graph-ts";

export const EXECUTE_SIGNATURE_V4 = '((bytes,bytes)[],(address,bytes)[],address,address[])'
export const FACTOR_1E8 = BigDecimal.fromString("1e8");
export const TUPLE_PREFIX = '0x0000000000000000000000000000000000000000000000000000000000000020'
export const ORDER_SIGNATURE = '((address,address,uint256,uint256,address,bytes),uint256,uint256,address,uint256,(address,uint256,uint256),(address,uint256,uint256,address)[])'
export const SWAP_TOTAL_ID = "TOTAL"

// The following addresses should be in lower case

export const EXECUTOR_ADDRESS_V1 = '{{executorAddressV1}}'.toLowerCase()
export const EXECUTE_SIGNATURE_V1 = '{{executeSignatureV1}}'.toLowerCase()
export const EXECUTOR_ADDRESS_V2 = '{{executorAddressV2}}'.toLowerCase()
export const EXECUTOR_ADDRESS_V3 = '{{executorAddressV3}}'.toLowerCase()
export const EXECUTE_SIGNATURE_V2 = '{{executeSignatureV2}}'.toLowerCase()
export const EXECUTOR_ADDRESS_V4 = '{{executorAddressV4}}'.toLowerCase()

export const TREASURY_ADDRESS = '{{treasuryAddress}}'.toLowerCase()
export const TREASURY_ADDRESS_NEW = '{{treasuryAddressNew}}'.toLowerCase()
export const FEES_ADDRESS = '{{feesAddress}}'.toLowerCase()

export const QUICK_ADDRESS = '{{quickAddress}}'.toLowerCase()
export const QUICK_USDC_POOL = '{{quickUsdcPool}}'.toLowerCase()
export const QUICK_DECIMALS = '{{quickDecimals}}'

export const THE_ADDRESS = '{{theAddress}}'.toLowerCase()
export const THE_BUSD_POOL = '{{theBusdPool}}'.toLowerCase()
export const THE_DECIMALS = '{{theDecimals}}'

export const BOO_ADDRESS = '{{booAddress}}'.toLowerCase()
export const BOO_WFTM_POOL = '{{booWftmPool}}'.toLowerCase()
export const BOO_DECIMALS = '{{booDecimals}}'
export const WFTM_ADDRESS = '{{wftmAddress}}'

export const LYNX_ADDRESS = '{{lynxAddress}}'.toLowerCase()
export const LYNX_WETH_POOL = '{{lynxWethPool}}'.toLowerCase()
export const LINEA_WETH_ADDRESS = '{{lineaWethAddress}}'.toLowerCase()

export const PYTH_ORACLE_ADDRESS = '{{pythOracleAddress}}'

export const NATIVE_ASSET = '{{nativeAsset}}'

export function getOracleAddress(asset: string): string | null {
    if (asset == "USDT" || asset == "USDV" || asset == "lisUSD") return '{{usdt}}'
    if (asset == "USDC" || asset == "axlUSDC" || asset == "multiUSDC" || asset == "USDC.e") return '{{usdc}}'
    if (asset == "TUSD") return '{{tusd}}'
    if (asset == "USDB") return '{{usdb}}'
    if (asset == "USDe") return '{{usde}}'
    if (asset == "DAI" || asset == "BUSD") return '{{dai}}'
    if (asset == "USDD") return '{{usdd}}'
    if (asset == "ETH" || asset == "WETH" || asset == "BETH") return '{{eth}}'
    if (asset == "BTC" || asset == "WBTC" || asset == "BTCB") return '{{btc}}'
    if (asset == "MATIC" || asset == "WMATIC") return '{{matic}}'
    if (asset == "BNB" || asset == "WBNB" || asset == "slisBNB") return '{{bnb}}'
    if (asset == "CAKE" || asset == "Cake") return '{{cake}}'
    if (asset == "1INCH") return '{{1inch}}'
    if (asset == "AAVE") return '{{aave}}'
    if (asset == "ADA") return '{{ada}}'
    if (asset == "ALGO") return '{{algo}}'
    if (asset == "APE") return '{{ape}}'
    if (asset == "AVAX") return '{{avax}}'
    if (asset == "ARB") return '{{arb}}'
    if (asset == "AXS") return '{{axs}}'
    if (asset == "BAT") return '{{bat}}'
    if (asset == "BCH") return '{{bch}}'
    if (asset == "BLAST") return '{{blast}}'
    if (asset == "BLUR") return '{{blur}}'
    if (asset == "CRV") return '{{crv}}'
    if (asset == "CVX") return '{{cvx}}'
    if (asset == "DOGE") return '{{doge}}'
    if (asset == "DOT") return '{{dot}}'
    if (asset == "ETC") return '{{etc}}'
    if (asset == "ENS") return '{{ens}}'
    if (asset == "FIL") return '{{fil}}'
    if (asset == "FTM" || asset == "WFTM") return '{{ftm}}'
    if (asset == "FOXY") return '{{foxy}}'
    if (asset == "FXS") return '{{fxs}}'
    if (asset == "GRT") return '{{grt}}'
    if (asset == "ICP") return '{{icp}}'
    if (asset == "LINK") return '{{link}}'
    if (asset == "LTC") return '{{ltc}}'
    if (asset == "MKR") return '{{mkr}}'
    if (asset == "pxETH") return '{{pxeth}}'
    if (asset == "POL") return '{{pol}}'
    if (asset == "QNT") return '{{qnt}}'
    if (asset == "RDNT") return '{{rdnt}}'
    if (asset == "RPL") return '{{rpl}}'
    if (asset == "S" || asset == "wS") return '{{s}}'
    if (asset == "SAND") return '{{sand}}'
    if (asset == "SHIB") return '{{shib}}'
    if (asset == "SOL") return '{{sol}}'
    if (asset == "SUSHI") return '{{sushi}}'
    if (asset == "stETH") return '{{steth}}'
    if (asset == "wstETH" ) return '{{wsteth}}'
    if (asset == "SNX") return '{{snx}}'
    if (asset == "TRX") return '{{trx}}'
    if (asset == "UNI") return '{{uni}}'
    if (asset == "XRP") return '{{xrp}}'
    return null;
}
