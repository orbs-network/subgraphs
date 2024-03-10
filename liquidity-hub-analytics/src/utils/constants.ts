import {BigDecimal} from "@graphprotocol/graph-ts";

export const EXECUTE_SIGNATURE_V4 = '((bytes,bytes)[],(address,bytes)[],address,address[])'
export const FACTOR_1E8 = BigDecimal.fromString("1e8");
export const TUPLE_PREFIX = '0x0000000000000000000000000000000000000000000000000000000000000020'
export const ORDER_SIGNATURE = '((address,address,uint256,uint256,address,bytes),uint256,uint256,address,uint256,(address,uint256,uint256),(address,uint256,uint256,address)[])'
export const SWAP_TOTAL_ID = "TOTAL"

export const EXECUTOR_ADDRESS_V1 = ''
export const EXECUTE_SIGNATURE_V1 = ''
export const EXECUTOR_ADDRESS_V2 = ''
export const EXECUTOR_ADDRESS_V3 = ''
export const EXECUTE_SIGNATURE_V2 = ''
export const EXECUTOR_ADDRESS_V4 = '0x120971cac17b63ffdadf862724925914b025a9e6'

export const TREASURY_ADDRESS = '0xb1baf397b3946a81c7f5c54807474ecf194dc446'
export const FEES_ADDRESS = '0xbe2dae039bb3b92e8f457e69bfd6543604a297f2'

export const QUICK_USDC_POOL = ''
export const QUICK_DECIMALS = ''

export const THE_BUSD_POOL = '0x34b897289fccb43c048b2cea6405e840a129e021'
export const THE_DECIMALS = '1e18'

export const NATIVE_ASSET = 'BNB'

export function getOracleAddress(asset: string): string | null {
    if (asset == "USDT" || asset == "USDV" || asset == "lisUSD") return '0xB97Ad0E74fa7d920791E90258A6E2085088b4320' // address, decimals
    if (asset == "USDC" || asset == "axlUSDC") return '0x51597f405303C4377E36123cBc172b13269EA163'
    if (asset == "TUSD") return '0xa3334A9762090E827413A7495AfeCE76F41dFc06'
    if (asset == "DAI" || asset == "BUSD") return '0x132d3C0B1D2cEa0BC552588063bdBb210FDeecfA'
    if (asset == "USDD") return '0x51c78c299C42b058Bf11d47FbB74aC437C6a0c8C'
    if (asset == "ETH" || asset == "WETH" || asset == "BETH") return '0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e'
    if (asset == "BTC" || asset == "WBTC" || asset == "BTCB") return '0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf'
    if (asset == "MATIC" || asset == "WMATIC") return '0x7CA57b0cA6367191c94C8914d7Df09A57655905f'
    if (asset == "BNB" || asset == "WBNB" || asset == "slisBNB") return '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE'
    if (asset == "CAKE" || asset == "Cake") return '0xB6064eD41d4f67e353768aA239cA86f4F73665a1'
    if (asset == "1INCH") return '0x9a177Bb9f5b6083E962f9e62bD21d4b5660Aeb03'
    if (asset == "AAVE") return '0xA8357BF572460fC40f4B0aCacbB2a6A61c89f475'
    if (asset == "ADA") return '0xa767f745331D267c7751297D982b050c93985627'
    if (asset == "ALGO") return ''
    if (asset == "APE") return ''
    if (asset == "AVAX") return '0x5974855ce31EE8E1fff2e76591CbF83D7110F151'
    if (asset == "AXS") return '0x7B49524ee5740c99435f52d731dFC94082fE61Ab'
    if (asset == "BAT") return ''
    if (asset == "BCH") return '0x43d80f616DAf0b0B42a928EeD32147dC59027D41'
    if (asset == "CRV") return ''
    if (asset == "DOGE") return '0x3AB0A0d137D4F946fBB19eecc6e92E64660231C8'
    if (asset == "DOT") return '0xC333eb0086309a16aa7c8308DfD32c8BBA0a2592'
    if (asset == "ETC") return ''
    if (asset == "FIL") return '0xE5dbFD9003bFf9dF5feB2f4F445Ca00fb121fb83'
    if (asset == "FTM") return '0xe2A47e87C0f4134c8D06A41975F6860468b2F925'
    if (asset == "FXS") return '0x0E9D55932893Fb1308882C7857285B2B0bcc4f4a'
    if (asset == "GRT") return ''
    if (asset == "ICP") return '0x84210d9013A30C6ab169e28840A6CC54B60fa042'
    if (asset == "LINK") return '0xca236E327F629f9Fc2c30A4E95775EbF0B89fac8'
    if (asset == "LTC") return '0x74E72F37A8c415c8f1a98Ed42E78Ff997435791D'
    if (asset == "MKR") return ''
    if (asset == "QNT") return ''
    if (asset == "SAND") return ''
    if (asset == "SHIB") return '0xA615Be6cb0f3F36A641858dB6F30B9242d0ABeD8'
    if (asset == "SOL") return '0x0E8a53DD9c13589df6382F13dA6B3Ec8F919B323'
    if (asset == "SUSHI") return '0xa679C72a97B654CFfF58aB704de3BA15Cde89B07'
    if (asset == "TRX") return '0xF4C5e535756D11994fCBB12Ba8adD0192D9b88be'
    if (asset == "UNI") return '0xb57f259E7C24e56a1dA00F66b55A5640d9f9E7e4'
    if (asset == "XRP") return '0x93A67D414896A280bF8FFB3b389fE3686E014fda'
    return null;
}
