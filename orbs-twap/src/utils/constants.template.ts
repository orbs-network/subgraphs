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
    if (routerAddress == "0xd63430c74c8e70d9dbdca04c6a9e6e9e929028da") return "Thena"
    if (routerAddress == "0xc2abc02acd77bb2407efa22348da9afc8b375290") return "Thena"
    if (routerAddress == "0x2b2fabdbfa4a15da0d351f947c14f4520db0bdc1") return "Thena"
    if (routerAddress == "0xb2bafe188fad927240038cc4fff2d771d8a58905") return "PancakeSwap"
    if (routerAddress == "0xe2a0c3b9ad19a18c4bba7fffbe5bc1b0e58db1ce") return "PancakeSwap"
    if (routerAddress == "0x3a9df3ee209b802d0337383f5abce3204d623588") return "PancakeSwap"
    if (routerAddress == "0x807488adad033e95c438f998277be654152594dc") return "PancakeSwap"
    if (routerAddress == "0x3a9df3ee209b802d0337383f5abce3204d623588") return "PancakeSwap"
    if (routerAddress == "0x26d0ec4be402bce03aaa8aaf0cf67e9428ba54ef") return "QuickSwap"
    if (routerAddress == "0x8fcc245209be85c49d738d0ce5613f74e5d91e86") return "QuickSwap"
    if (routerAddress == "0xefe1b6096838949156e5130604434a2a13c68c68") return "BaseSwap"
    if (routerAddress == "0xaca3155c17530c4aa96746f226fcc049658490d2") return "BaseSwap"
    if (routerAddress == "0x10695e3c265639e46d45c7bb427a4a4fd449af1e") return "SushiSwap"
    if (routerAddress == "0xc55943fa6509004b2903ed8f8ab7347bfc47d0ba") return "SushiSwap"
    if (routerAddress == "0x846f2b29ef314bf3d667981b4ffdadc5b858312a") return "SushiSwap"
    if (routerAddress == "0x08c41f5d1c844061f6d952e25827eeaa576c6536") return "SushiSwap"
    if (routerAddress == "0x1d1e69a706367e62a58cbc8c6924089ee379248f") return "SushiSwap"
    if (routerAddress == "0x8ffde23fba2d7aea9c3cbf2d5b7b533bb46754a8") return "Arbidex"
    if (routerAddress == "0x49d21052f4695d16c7cce6ef561301aa4d840420") return "Arbidex"
    if (routerAddress == "0xceff098c9199c5d9cf24078dc14eb8f787631cc0") return "Chronos"
    if (routerAddress == "0x0178e50adaf3b925f27ac518fcd952ce7f9a3b36") return "Chronos"
    if (routerAddress == "0x101e1b65bb516fb5f4547c80bae0b51f1b8d7a22") return "DragonSwap"
    if (routerAddress == "0xf2f933fafbdb97062cfa3c447ff373e76a90efd6") return "DragonSwap"
    if (routerAddress == "0x10ed1f36e4ebe76e161c9aadda20be841bc0082c") return "PancakeSwap"
    if (routerAddress == "0xe20167871db616ddffd0fd870d9bc068c350dd1f") return "PancakeSwap"
    if (routerAddress == "0x72e3e1fd5d2ee2f1c2eb695206d490a1d45c3835") return "Lynex"
    if (routerAddress == "0x2b2fabdbfa4a15da0d351f947c14f4520db0bdc1") return "Lynex"
    if (routerAddress == "0xd54b17197f17e058f4a0859cffc8c9de42d87560") return "SpookySwap"
    if (routerAddress == "0xad97b770ad64ae47fc7d64b3bd820dcdbf9ff7da") return "SpookySwap"
    if (routerAddress == "0xb65f827ae17c7ccfdd44ccea72dc23c0e8d79a8c") return "SpookySwap"
    if (routerAddress == "0x725eb4907dfb5266dfb43134c45c6b245a2bf52c") return "SpookySwap"
    if (routerAddress == "0xc7aab11b7ee9ca89e6aeb975702e5be6c14987c6") return "SpookySwap"
    if (routerAddress == "0x4e2000dc371704c9cbcaeb8e7baff6813fb83063") return "TeaFi"
    if (routerAddress == "0xe9d3b4cf5b0cc392e78c1a4dd9885d449eef9793") return "TeaFi"
    if (routerAddress == "0xc454abb5b0ca974a4397139764478c736327d2b0") return "Retro"
    if (routerAddress == "0xb7a3d74895bfd3aff6780525e36d79fcf26a895f") return "Retro"
    if (routerAddress == "0xe5012ebde5e26ee3ea41992154731a03023cf274") return "SwapX"
    if (routerAddress == "0xda902994b7f7a1ecdd8de02e4a17dbff2e6f67b7") return "SwapX"
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
