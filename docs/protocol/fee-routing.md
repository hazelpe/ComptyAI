# Fee routing

Revenue must originate from an implemented fee source: for example, an explicitly supported trading venue, protocol action or service charge. EVM transfers and Robinhood Chain gas payments are not automatically ComptyAI revenue. A token tax, trading venue integration or fee split must be designed separately if selected.

For every receipt, record the chain ID, transaction hash, log index, asset, amount, source and confirmation status. The transaction hash and log index form a deduplication key within a chain. Finality rules and reorg handling must be defined before offchain accounting commits receipts.

The local model receives an already-reconciled fee amount in integer USD cents. A production treasury would need asset-specific base-unit accounting and a conversion policy if the provider invoices in a different currency. The demo does not assume ETH or token balances can be valued without an exchange rate.

The treasury share is a configurable fraction of collected protocol revenue. It is distinct from a trading fee rate. The fixture’s 60% share therefore does **not** mean a 60% tax on a token trade.

Unresolved choices include supported revenue sources, collection asset, collection authority, share parameters and change procedures. Any chosen implementation needs tests for unauthorized withdrawals, duplicate events, fee-on-transfer assets and unsupported token behavior.
