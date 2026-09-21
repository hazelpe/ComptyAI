# Compute Credits

A Compute Credit is a non-transferable service allowance associated with a holder and an epoch. It is not a token balance, a claim on treasury assets or a cash redemption mechanism.

The demo defines one credit as one minute on one fictional GPU tier. Real services must bind credits to an explicit hardware profile and workload policy; a minute on one GPU is not automatically interchangeable with a minute on another.

## Lifecycle

```text
Issued → Available → Reserved → Consumed
                       └────→ Released to available balance
Available → Expired at the epoch boundary
```

Reservations must fit the available balance. A successful job consumes actual metered credits and releases the unused reservation. A confirmed failure releases the full reservation. Expiry prevents new reservations; already reserved jobs can settle afterward. Released credits become expired if settlement happens after the epoch boundary.

The [reference ledger](../../packages/credit-ledger/src/index.mjs) enforces this conservation rule:

`issued = available + reserved + consumed + expired`

Request IDs prevent duplicate charges for repeated calls. A retried request must preserve its account and reserved amount. A settled request cannot be cancelled, and a cancelled request cannot be silently reopened.

Production requirements include authenticated wallet sessions, atomic persistence, replay-resistant job requests, rate limits, a meter reconciliation policy and recovery of abandoned reservations. There is no credit cash-out or transfer operation in the reference design.
