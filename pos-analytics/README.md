# pos-analytics subgraph

Indexes every contract event consumed by
[`@orbs-network/pos-analytics-lib`](https://github.com/orbs-network/pos-analytics-lib)
(the data layer of [analytics.orbs.network](https://analytics.orbs.network)), so the
analytics UI can query indexed events instead of scanning full-chain `eth_getLogs`
history through RPC providers (Polygon history is ~65M blocks and growing; provider
range caps make client-side scanning take from minutes to hours).

One immutable entity type per event, 1:1 with the raw log - aggregation stays in the
lib. Event signatures, entities and mappings are generated from the lib's ABIs and
topic hashes, so they are exactly the events the lib reads today:

| Datasource | Events |
|---|---|
| Stake | Staked, Restaked, Unstaked, Withdrew |
| Delegations | Delegated, DelegatedStakeChanged |
| StakingRewards | StakingRewardsAllocated, DelegatorStakingRewardsAssigned, GuardianStakingRewardsAssigned, StakingRewardsClaimed |
| FeesAndBootstrapRewards | BootstrapRewardsAssigned, FeesAssigned, BootstrapRewardsWithdrawn, FeesWithdrawn |
| GuardiansRegistration | GuardianRegistered |

Addresses and start blocks (in `config/`) were read from the on-chain ContractRegistry
on 2026-07-19; neither chain has migrated these contracts since PoS V2 deployment, so a
single address per datasource suffices.

## Build & deploy

```
npm install
npm run prepare-mainnet   # or prepare-matic
npm run codegen
npm run build
# deploy to your graph-node (same flow as the delegations subgraph)
```

Both network configs pass `graph codegen` + `graph build` (graph-cli 0.67.3).

Note: full backfill is required after first deployment - mainnet indexes from block
9,830,000 and matic from 25,487,295 (the Stake contract deployments).
