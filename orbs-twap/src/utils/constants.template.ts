import {BigDecimal} from "@graphprotocol/graph-ts";

export const FACTOR_1E8 = BigDecimal.fromString("1e8");
export const UNIQUE_USERS_TODAY_ID = "UUT"

export const TWAP_ADDRESS = '{{twapAddress}}'

export const QUICK_ADDRESS = '{{quickAddress}}'.toLowerCase()
export const QUICK_USDC_POOL = '{{quickUsdcPool}}'.toLowerCase()
export const QUICK_DECIMALS = '{{quickDecimals}}'

export const THE_ADDRESS = '{{theAddress}}'.toLowerCase()
export const THE_BUSD_POOL = '{{theBusdPool}}'.toLowerCase()
export const THE_DECIMALS = '{{theDecimals}}'

export const BSWAP_ADDRESS = '{{bswapAddress}}'.toLowerCase()
export const BSWAP_WETH_POOL = '{{bswapWethPool}}'.toLowerCase()
export const BSWAP_DECIMALS = '{{bswapDecimals}}'
export const BASE_WETH_ADDRESS = '{{baseWethAddress}}'.toLowerCase()

export const BOO_ADDRESS = '{{booAddress}}'.toLowerCase()
export const BOO_WFTM_POOL = '{{booWftmPool}}'.toLowerCase()
export const BOO_DECIMALS = '{{booDecimals}}'
export const WFTM_ADDRESS = '{{wftmAddress}}'

export const CHR_ADDRESS = '{{chrAddress}}'.toLowerCase()
export const CHR_USDC_POOL = '{{chrUsdcPool}}'.toLowerCase()
export const CHR_DECIMALS = '{{chrDecimals}}'

export const ARX_ADDRESS = '{{arxAddress}}'.toLowerCase()
export const ARX_WETH_POOL = '{{arxWethPool}}'.toLowerCase()
export const ARX_DECIMALS = '{{arxDecimals}}'
export const ARB_WETH_ADDRESS = '{{arbWethAddress}}'.toLowerCase()

export const LYNX_ADDRESS = '{{lynxAddress}}'.toLowerCase()
export const LYNX_WETH_POOL = '{{lynxWethPool}}'.toLowerCase()
export const LINEA_WETH_ADDRESS = '{{lineaWethAddress}}'.toLowerCase()

export const PYTH_ORACLE_ADDRESS = '{{pythOracleAddress}}'

export const FEES_ADDRESS = '{{feesAddress}}'

export const NATIVE_ASSET = '{{nativeAsset}}'

export function getDexByRouter(routerAddress: string): string { // use only lower case
    if (routerAddress == "0xd63430c74c8e70d9dbdca04c6a9e6e9e929028da" || routerAddress == "0xc2abc02acd77bb2407efa22348da9afc8b375290") return "Thena"
    if (routerAddress == "0xb2bafe188fad927240038cc4fff2d771d8a58905") return "PancakeSwap"
    if (routerAddress == "0x26d0ec4be402bce03aaa8aaf0cf67e9428ba54ef") return "QuickSwap"
    if (routerAddress == "0xefe1b6096838949156e5130604434a2a13c68c68") return "BaseSwap"
    if (routerAddress == "0x10695e3c265639e46d45c7bb427a4a4fd449af1e") return "SushiSwap"
    if (routerAddress == "0xc55943fa6509004b2903ed8f8ab7347bfc47d0ba") return "SushiSwap"
    if (routerAddress == "0x846f2b29ef314bf3d667981b4ffdadc5b858312a") return "SushiSwap"
    if (routerAddress == "0x08c41f5d1c844061f6d952e25827eeaa576c6536") return "SushiSwap"
    if (routerAddress == "0x8ffde23fba2d7aea9c3cbf2d5b7b533bb46754a8") return "Arbidex"
    if (routerAddress == "0xceff098c9199c5d9cf24078dc14eb8f787631cc0") return "Chronos"
    if (routerAddress == "0x101e1b65bb516fb5f4547c80bae0b51f1b8d7a22") return "DragonSwap"
    if (routerAddress == "0x10ed1f36e4ebe76e161c9aadda20be841bc0082c") return "PancakeSwap"
    if (routerAddress == "0xe20167871db616ddffd0fd870d9bc068c350dd1f") return "PancakeSwap"
    if (routerAddress == "0x72e3e1fd5d2ee2f1c2eb695206d490a1d45c3835") return "Lynex"
    if (routerAddress == "0xd54b17197f17e058f4a0859cffc8c9de42d87560") return "SpookySwap"
    if (routerAddress == "0xad97b770ad64ae47fc7d64b3bd820dcdbf9ff7da") return "SpookySwap"
    return "Unknown"
}

export function getOracleAddress(asset: string): string | null {
    if (asset == "USDT" || asset == "USDV" || asset == "lisUSD" || asset == "USD+") return '{{usdt}}'
    if (asset == "USDC" || asset == "axlUSDC" || asset == "multiUSDC" || asset == "USDbC") return '{{usdc}}'
    if (asset == "TUSD") return '{{tusd}}'
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
    if (asset == "ARB") return '{{arb}}'
    if (asset == "AVAX") return '{{avax}}'
    if (asset == "AXS") return '{{axs}}'
    if (asset == "BAT") return '{{bat}}'
    if (asset == "BCH") return '{{bch}}'
    if (asset == "CRV") return '{{crv}}'
    if (asset == "CVX") return '{{cvx}}'
    if (asset == "DOGE") return '{{doge}}'
    if (asset == "DOT") return '{{dot}}'
    if (asset == "ETC") return '{{etc}}'
    if (asset == "FIL") return '{{fil}}'
    if (asset == "FTM" || asset == "WFTM") return '{{ftm}}'
    if (asset == "FOXY") return '{{foxy}}'
    if (asset == "FXS") return '{{fxs}}'
    if (asset == "GMX") return '{{gmx}}'
    if (asset == "GNS") return '{{gns}}'
    if (asset == "GRT") return '{{grt}}'
    if (asset == "ICP") return '{{icp}}'
    if (asset == "LDO") return '{{ldo}}'
    if (asset == "LINK") return '{{link}}'
    if (asset == "LTC") return '{{ltc}}'
    if (asset == "MAGIC") return '{{magic}}'
    if (asset == "MKR") return '{{mkr}}'
    if (asset == "OP") return '{{op}}'
    if (asset == "PENDLE") return '{{pendle}}'
    if (asset == "PEPE") return '{{pepe}}'
    if (asset == "POL") return '{{pol}}'
    if (asset == "QNT") return '{{qnt}}'
    if (asset == "RDNT") return '{{rdnt}}'
    if (asset == "RPL") return '{{rpl}}'
    if (asset == "S" || asset == "wS") return '{{s}}'
    if (asset == "SAND") return '{{sand}}'
    if (asset == "SHIB") return '{{shib}}'
    if (asset == "SOL") return '{{sol}}'
    if (asset == "SUSHI") return '{{sushi}}'
    if (asset == "SNX") return '{{snx}}'
    if (asset == "TIA") return '{{tia}}'
    if (asset == "TRX") return '{{trx}}'
    if (asset == "UNI") return '{{uni}}'
    if (asset == "XRP") return '{{xrp}}'
    if (asset == "TAO") return '{{tao}}'
    if (asset == "ENS") return '{{ens}}'
    if (asset == "stETH") return '{{steth}}'
    if (asset == "SEI" || asset == "WSEI") return '{{sei}}'
    return null;
}
