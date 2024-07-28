# Orbs TWAP Analytics Subgraph

This subgraph, `orbs-twap`, is designed to capture and analyze Fill events happening on the [dTWAP](https://www.orbs.com/dtwap/) protocol.

Currently supports:
- [BSC](https://thegraph.com/explorer/subgraphs/4NfXEi8rreQsnAr4aJ45RLCKgnjcWX46Lbt9SadiCcz6)
- [Polygon](https://thegraph.com/explorer/subgraphs/3PyRPWSvDnMowGbeBy7aNsvUkD5ZuxdXQw2RdJq4NdXi)
- [Base](https://thegraph.com/explorer/subgraphs/DFhaPQb3HATXkpsWNZw3gydYHehLBVEDiSk4iBdZJyps)
- [Arbitrum](https://thegraph.com/explorer/subgraphs/83bpQexEaqBjHaQbKoFTbtvCXuo5RudRkfLgtRUYqo2c)

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
- type: String!
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

### OrderCreated
- id: Bytes!
- Contract_id: BigInt! # uint64
- maker: Bytes! # address
- exchange: Bytes! # address
- ask_exchange: Bytes! # address
- ask_srcToken: Bytes! # address
- ask_dstToken: Bytes! # address
- ask_srcAmount: BigInt! # uint256
- ask_srcBidAmount: BigInt! # uint256
- ask_dstMinAmount: BigInt! # uint256
- ask_deadline: BigInt! # uint32
- ask_bidDelay: BigInt! # uint32
- ask_fillDelay: BigInt! # uint32
- ask_data: Bytes! # bytes 
- blockNumber: BigInt!
- blockTimestamp: BigInt!
- transactionHash: Bytes!
- srcTokenSymbol: String 
- dstTokenSymbol: String 
- dollarValueIn: BigDecimal!
- timestamp: String!
- dex: String!
- type: String!

### CreatedDaily
- id: String!
- date: String!
- dailyCount: Int 
- dex: String!

### CreatedTotal
- id: String!
- totalCount: Int

### DailyActiveUsers 
- id: String!
- userAddresses: [String!]!
- count: Int!

## Building and deploying
1. Create a new subgraph via the studio web UI.
2. Authenticate in CLI: `graph auth --studio <key>`
3. Create/edit the relevant json in the config dir 
4. For new DEXes - add the exchange address to `getDexByRouter` and the DEX token to `fetchUSDValue`.
5. add the relevant scripts in package.json.
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
#### Orders created on 2023-06-21
```graphql
{
    orderCreateds(where:{timestamp_contains:"2023-06-21"}) {
        id
        Contract_id
        ask_bidDelay
        ask_data
        ask_deadline
        ask_dstMinAmount
        ask_dstToken
        ask_fillDelay
        ask_exchange
        ask_srcToken
        ask_srcBidAmount
        ask_srcAmount
        blockNumber
        blockTimestamp
        dex
        dollarValueIn
        dstTokenSymbol
        exchange
        maker
        srcTokenSymbol
        timestamp
        transactionHash
        type
    }
}
```
#### LIMIT orders created
```graphql
{
    orderCreateds(where:{type:"LIMIT"}) { # other option is TWAP
        id
        Contract_id
        ask_bidDelay
        ask_data
        ask_deadline
        ask_dstMinAmount
        ask_dstToken
        ask_fillDelay
        ask_exchange
        ask_srcToken
        ask_srcBidAmount
        ask_srcAmount
        blockNumber
        blockTimestamp
        dex
        dollarValueIn
        dstTokenSymbol
        exchange
        maker
        srcTokenSymbol
        timestamp
        transactionHash
        type
    }
}
```
#### Get orders creation volume by day for Thena
```graphql
{
  createdDailies(where:{dex: "Thena"}) {
    id
    dailyCount
  }
}
```
#### Get accumulated order creations
```graphql
{
    createdTotals {
        id
        totalCount
    }
}
```
#### Get DAUs for PancakeSwap
```graphql
{
    dailyActiveUsers_collection(where:{id_starts_with:"PancakeSwap"}) {
        id
        count
    }
}
```
#### Select Filled order by order ID
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
      type
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
      type
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
      type
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
      type
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