# Liquidity Hub Analytics Subgraph

https://thegraph.com/explorer/subgraphs/3PoRophV5nkusfKGkk2D5rL6ibErsTvmUvYsaHNTUsGZ


This subgraph, `liquidity-hub-analytics`, is designed to capture and analyze Fill events happening on the Liquidity Hub protocol.

Currently supports [Quickswap](https://quickswap.exchange) on Polygon.


## Schemas


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