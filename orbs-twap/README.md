# Orbs TWAP Analytics Subgraph

This subgraph, `orbs-twap`, is designed to capture and analyze Fill events happening on the [dTWAP](https://www.orbs.com/dtwap/) protocol.

Currently supports:
- [BSC](https://thegraph.com/explorer/subgraphs/4NfXEi8rreQsnAr4aJ45RLCKgnjcWX46Lbt9SadiCcz6)
- [Polygon](https://thegraph.com/explorer/subgraphs/3PyRPWSvDnMowGbeBy7aNsvUkD5ZuxdXQw2RdJq4NdXi)

## Schemas
### OrderFilled
Describes the Fill event
- id: Bytes!
- TWAP_id: Int!
- userAddress: Bytes!
- exchange: Bytes!
-  dex: String!
- taker: Bytes!
- srcAmountIn: String!
- dstAmountOut: String!
- dstFee: BigInt!
- srcFilledAmount: BigInt!
- blockNumber: BigInt!
- blockTimestamp: BigInt!
- transactionHash: Bytes!
- timestamp: String!
- srcTokenAddress: String
- dstTokenAddress: String
- srcTokenSymbol: String
- dstTokenSymbol: String
- dollarValueIn: BigDecimal!
- dollarValueOut: BigDecimal!
### FilledDaily
Trading volume divided into days 
- id: String!
- date: String!
- dailyTotalCalculatedValue: BigDecimal!
- dailyCount: Int
### FilledTotal
Accumulated trading volume
- id: String!
- cumulativeTotalCalculatedValue: BigDecimal!
- totalCount: Int

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
To utilize this subgraph, deploy it to a suitable indexing service such as The Graph, and query the generated GraphQL API to retrieve analytics data related to dTWAP protocol swaps.

### Examples
#### Select by order ID
```graphql
{
  orderFilleds(where:{TWAP_id:445}) {
      id
      TWAP_id
      userAddress
      exchange
      dex
      taker
      srcAmountIn
      dstAmountOut
      dstFee
      srcFilledAmount
      blockNumber
      blockTimestamp
      transactionHash
      timestamp
      srcTokenAddress
      dstTokenAddress
      srcTokenSymbol
      dstTokenSymbol
      dollarValueIn
      dollarValueOut
  }
}
```
#### Select by Thena exchange
```graphql
{
  orderFilleds(where:{dex:"Thena"}) {
      id
      TWAP_id
      userAddress
      exchange
      dex
      taker
      srcAmountIn
      dstAmountOut
      dstFee
      srcFilledAmount
      blockNumber
      blockTimestamp
      transactionHash
      timestamp
      srcTokenAddress
      dstTokenAddress
      srcTokenSymbol
      dstTokenSymbol
      dollarValueIn
      dollarValueOut
  }
}
```
#### Select by PancakeSwap exchange
```graphql
{
  orderFilleds(where:{dex:"PancakeSwap"}) {
      id
      TWAP_id
      userAddress
      exchange
      dex
      taker
      srcAmountIn
      dstAmountOut
      dstFee
      srcFilledAmount
      blockNumber
      blockTimestamp
      transactionHash
      timestamp
      srcTokenAddress
      dstTokenAddress
      srcTokenSymbol
      dstTokenSymbol
      dollarValueIn
      dollarValueOut
  }
}
```
#### Select swaps that took place on 2023-06-21 and source token was USDT
```graphql
{
  orderFilleds(where:{srcTokenSymbol: "USDT", timestamp_contains:"2023-06-21"}) {
      id
      TWAP_id
      userAddress
      exchange
      dex
      taker
      srcAmountIn
      dstAmountOut
      dstFee
      srcFilledAmount
      blockNumber
      blockTimestamp
      transactionHash
      timestamp
      srcTokenAddress
      dstTokenAddress
      srcTokenSymbol
      dstTokenSymbol
      dollarValueIn
      dollarValueOut
  }
}
```
#### Get volume by day for Thena
```graphql
{
  filledDailies(where:{dex: "Thena"}) {
    id
    dailyCount
    dailyTotalCalculatedValue
  }
}
```
#### Get accumulated swaps
```graphql
{
  filledTotals {
    id
    totalCount
    cumulativeTotalCalculatedValue
  }
}
```