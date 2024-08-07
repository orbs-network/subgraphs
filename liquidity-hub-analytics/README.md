# Liquidity Hub Analytics Subgraph

This subgraph, `liquidity-hub-analytics`, is designed to capture and analyze Fill events happening on the Liquidity Hub protocol.

Currently supports:
- [Quickswap](https://quickswap.exchange) on Polygon: [Polygon subgraph](https://thegraph.com/explorer/subgraphs/3PoRophV5nkusfKGkk2D5rL6ibErsTvmUvYsaHNTUsGZ)
- [Thena](https://thena.fi) on BSC: [BSC subgraph](https://thegraph.com/explorer/subgraphs/A3itXkopA3FG5CGKJrzQZPB2FWsC9BWw3b7GBdK4zGf2)
- [SpookySwap](https://spooky.fi) on FTM: [FTM subgraph](https://thegraph.com/explorer/subgraphs/4VBQsK9AFVqieegH3Pn6d4mjJDyNKgYbZqnHBMWnc3a7)
- [IntentX](https://app.intentx.io/spot-trading) on Base: [Base subgraph](https://thegraph.com/explorer/subgraphs/GyMgk1kzLVDjb9BbswjvdbUbGPbpmbwpDFJG9dRzevQs)
- [Fenix](https://www.fenixfinance.io/trade/swap) on Blast: [Blast subgraph](https://thegraph.com/explorer/subgraphs/9t4ThzX4V8hZFFkRaeyobkRMS2e6KYHoNuM7qgRdFfRj)

## Schemas
### Fill
Describes the Fill event
- id: Bytes!
- orderHash: Bytes!
- filler: Bytes!
- swapper: Bytes!
- nonce: BigInt!
- blockNumber: BigInt!
- blockTimestamp: BigInt!
- transactionHash: Bytes!
### Swap
Describes a swap tx executed via LH
- id: Bytes!
- userAddress: String!
- srcTokenSymbol: String
- srcTokenAddress: String
- srcAmount: String
- dstTokenSymbol: String
- dollarValue: BigDecimal!
- dstTokenAddress: String
- dexAmountOut: String
- executorAddress: String!
- timestamp: String!
- txHash: Bytes!
- fees: String
- gasFees: String
### SwapDaily
Trading volume divided into days 
- id: String!
- date: String!
- dailyTotalCalculatedValue: BigDecimal!
- dailyCount: Int
### SwapTotal
Accumulated trading volume
- id: String!
- cumulativeTotalCalculatedValue: BigDecimal!
- totalCount: Int

## Event Handler

The event handler defined in this subgraph is responsible for processing `Fill` events emitted by the Liquidity Hub protocol. Below is a breakdown of the handler's functionality:

### Function: handleFill
- This function is invoked upon receiving a `Fill` event.
- It initializes variables and entities to store relevant data from the event.
- Data such as `orderHash`, `filler`, `swapper`, `nonce`, and more are extracted and saved into the `Fill` entity.
- Information about the swap, including the transaction hash, timestamp, user address, and executor address, is stored in the `Swap` entity.
- Tokens involved in the swap are identified and their details (such as symbol and address) are fetched and stored.
- The function calculates the amount of tokens exchanged, considering various scenarios such as native MATIC and token transfers.
- Transaction logs are analyzed to extract relevant information such as token transfers and fees.
- Calculations are performed to determine the value of tokens exchanged in USD.
- Daily and cumulative volumes are updated based on the swap data.

## Building and deploying
1. Create a new subgraph via the studio web UI.
2. Authenticate in CLI: `graph auth --studio <key>`
3. Create/edit the relevant json in the config dir and add the relevant scripts in package.json.
#### `npm run prepare-<network>`
Generates subgraph.yaml and constants.ts for a particular network.
Currently supported networks are matic and bsc.
#### `graph codegen && graph build`
Generates AssemblyScript types for smart contract ABIs and the subgraph schema + Compiles the subgraph to WebAssembly.
#### `npm run deploy-<network>`
Deploys the subgraph for particular network to the official Graph Node. Runs the "prepare" command as well.

## Usage
To utilize this subgraph, deploy it to a suitable indexing service such as The Graph, and query the generated GraphQL API to retrieve analytics data related to Liquidity Hub protocol swaps.

### Examples
#### Select by tx hash
```graphql
{
  swaps(where:{txHash:"0xa9a616d0d5146d03fa106cfdc2b50e71229e26068218455044a59f3460d59dd7"}) {
    id
    userAddress
    srcTokenSymbol
    srcTokenAddress
    srcAmount
    dstTokenSymbol
    dstTokenAddress
    dexAmountOut
    srcTokenSymbol
    srcTokenAddress
    txHash
    dollarValue
    fees
    gasFees
    timestamp
    executorAddress
  }
}
```
#### Select swaps that took place on 2024-02-21 and source token was USDC
```graphql
{
  swaps(where:{srcTokenSymbol: "USDC", timestamp_contains:"2024-02-21"}) {
    id
    userAddress
    srcTokenSymbol
    srcTokenAddress
    srcAmount
    dstTokenSymbol
    dstTokenAddress
    dexAmountOut
    srcTokenSymbol
    srcTokenAddress
    txHash
    fees
    gasFees
    timestamp
    dollarValue
    executorAddress
  }
}
```
#### Get volume by day
```graphql
{
  swapDailies {
    id
    dailyTotalCalculatedValue
  }
}
```
#### Get accumulated swaps
```graphql
{
  swapTotals {
    id
    totalCount
    cumulativeTotalCalculatedValue
  }
}
```