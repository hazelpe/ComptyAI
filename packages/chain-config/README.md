# Chain configuration

Public network metadata lives in `src/networks.mjs`. The default is Robinhood Chain Testnet. This package does not make RPC calls or claim any ComptyAI deployment.

Before integrating, verify `eth_chainId` against the intended network and configure an appropriate provider endpoint. Public RPC endpoints have rate limits. Read [network details and sources](../../docs/developers/robinhood-chain.md).
