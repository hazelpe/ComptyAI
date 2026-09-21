# Robinhood Chain

ComptyAI targets Robinhood Chain. Its local example defaults to testnet metadata and never submits transactions.

| Property | Mainnet | Testnet |
| --- | --- | --- |
| Chain ID | `4663` | `46630` |
| Native gas currency | ETH | ETH |
| Public RPC | `https://rpc.mainnet.chain.robinhood.com` | `https://rpc.testnet.chain.robinhood.com` |
| Explorer | [Mainnet explorer](https://robinhoodchain.blockscout.com) | [Testnet explorer](https://explorer.testnet.chain.robinhood.com) |

The metadata was checked against the [official connection guide](https://docs.robinhood.com/chain/connecting/) on **2026-09-22**. The guide describes Robinhood Chain as an Arbitrum Layer 2 on Ethereum with ETH for gas. Public RPC endpoints are rate-limited; production integration should choose an appropriate provider.

Before connecting an application, check the returned `eth_chainId` and reject a mismatch. Before any deployment, establish the environment, inspect the implementation and record verified contract addresses in an explicit deployment record. This repository intentionally leaves token and treasury addresses unset.

Additional official reference: [deploy a contract](https://docs.robinhood.com/chain/deploy-smart-contracts/). Follow current upstream instructions when implementation is ready; this repository does not execute them.
