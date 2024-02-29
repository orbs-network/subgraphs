import {BigDecimal} from "@graphprotocol/graph-ts";

export const EXECUTOR_ADDRESS_V1 = "0x64bc3532991d8147167ee028a7adbf01c05594f7"
export const EXECUTE_SIGNATURE_V1 = '((bytes,bytes),(address,address,uint256,address,bytes)[])'
export const EXECUTOR_ADDRESS_V2 = "0x25135c8513fd5c54eca806f040d323cb60995b4a"
export const EXECUTOR_ADDRESS_V3 = "0x1a08d64fb4a7d0b6da5606a1e4619c147c3fb95e"
export const EXECUTE_SIGNATURE_V2 = '((bytes,bytes)[],(address,bytes)[])'
export const EXECUTOR_ADDRESS_V4 = "0x896d9b9eee18f6c88c5575b78247834029375575"
export const EXECUTE_SIGNATURE_V4 = '((bytes,bytes)[],(address,bytes)[],address,address[])'

export const TREASURY_ADDRESS = "0x7ae466596c57241459ebae32d2e64f51da68f3b8"
export const QUICK_USDC_POOL = "0x747375305b825c49fb97ee0ac09d19ec9ef94bd2"
export const FEES_ADDRESS = "0xbd098db9ad3dbaf2bdaf581340b2662d9a3ca8d2"

export const FACTOR_1E8 = BigDecimal.fromString("1e8");
export const TUPLE_PREFIX = '0x0000000000000000000000000000000000000000000000000000000000000020'
export const ORDER_SIGNATURE = '((address,address,uint256,uint256,address,bytes),uint256,uint256,address,uint256,(address,uint256,uint256),(address,uint256,uint256,address)[])'
export const SWAP_TOTAL_ID = "TOTAL"

export function getAssetInfo(asset: string): string[] | null {
    if (asset == "USDT") return ["0x0A6513e40db6EB1b165753AD52E80663aeA50545", "6"] // address, decimals
    if (asset == "USDC" || asset == "axlUSDC") return ["0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7", "6"]
    if (asset == "TUSD") return ["0x7C5D415B64312D38c56B54358449d0a4058339d2", "18"]
    if (asset == "DAI") return ["0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D", "18"]
    if (asset == "ETH" || asset == "WETH") return ["0xF9680D99D6C9589e2a93a78A04A279e509205945", "18"]
    if (asset == "BTC" || asset == "WBTC") return ["0xc907E116054Ad103354f2D350FD2514433D57F6f", "8"]
    if (asset == "MATIC" || asset == "WMATIC") return ["0xAB594600376Ec9fD91F8e885dADF0CE036862dE0", "18"]
    if (asset == "1INCH") return ["0x443C5116CdF663Eb387e72C688D276e702135C87", "18"]
    if (asset == "AAVE") return ["0x72484B12719E23115761D5DA1646945632979bB6", "18"]
    if (asset == "ADA") return ["0x882554df528115a743c4537828DA8D5B58e52544", "18"]
    if (asset == "ALGO") return ["0x03Bc6D9EFed65708D35fDaEfb25E87631a0a3437", "18"]
    if (asset == "APE") return ["0x2Ac3F3Bfac8fC9094BC3f0F9041a51375235B992", "18"]
    if (asset == "AVAX") return ["0xe01eA2fbd8D76ee323FbEd03eB9a8625EC981A10", "18"]
    if (asset == "AXS") return ["0x9c371aE34509590E10aB98205d2dF5936A1aD875", "18"]
    if (asset == "BAT") return ["0x2346Ce62bd732c62618944E51cbFa09D985d86D2", "18"]
    if (asset == "BCH") return ["0x327d9822e9932996f55b39F557AEC838313da8b7", "18"]
    if (asset == "CRV") return ["0x336584C8E6Dc19637A5b36206B1c79923111b405", "18"]
    if (asset == "DOGE") return ["0xbaf9327b6564454F4a3364C33eFeEf032b4b4444", "18"]
    if (asset == "DOT") return ["0xacb51F1a83922632ca02B25a8164c10748001BdE", "18"]
    if (asset == "ETC") return ["0xDf3f72Be10d194b58B1BB56f2c4183e661cB2114", "18"]
    if (asset == "FILL") return ["0xa07703E5C2eD1516107c7c72A494493Dcb99C676", "18"]
    if (asset == "FTM") return ["0x58326c0F831b2Dbf7234A4204F28Bba79AA06d5f", "18"]
    if (asset == "FXS") return ["0x6C0fe985D3cAcbCdE428b84fc9431792694d0f51", "18"]
    if (asset == "GRT") return ["0x3FabBfb300B1e2D7c9B84512fe9D30aeDF24C410", "18"]
    if (asset == "ICP") return ["0x84227A76a04289473057BEF706646199D7C58c34", "18"]
    if (asset == "LINK") return ["0xd9FFdb71EbE7496cC440152d43986Aae0AB76665", "18"]
    if (asset == "LTC") return ["0xEB99F173cf7d9a6dC4D889C2Ad7103e8383b6Efa", "18"]
    if (asset == "MKR") return ["0xa070427bF5bA5709f70e98b94Cb2F435a242C46C", "18"]
    if (asset == "QNT") return ["0xF7F291042F6Cbc4deC0Ad75c17786511a530dbe8", "18"]
    if (asset == "SAND") return ["0x3D49406EDd4D52Fb7FFd25485f32E073b529C924", "18"]
    if (asset == "SHIB") return ["0x3710abeb1A0Fc7C2EC59C26c8DAA7a448ff6125A", "18"]
    if (asset == "SOL") return ["0x10C8264C0935b3B9870013e057f330Ff3e9C56dC", "18"]
    if (asset == "SUSHI") return ["0x49B0c695039243BBfEb8EcD054EB70061fd54aa0", "18"]
    if (asset == "TRX") return ["0x307cCF7cBD17b69A487b9C3dbe483931Cf3E1833", "18"]
    if (asset == "UNI") return ["0xdf0Fb4e4F928d2dCB76f438575fDD8682386e13C", "18"]
    if (asset == "XRP") return ["0x785ba89291f676b5386652eB12b30cF361020694", "18"]
    return null;
}
