# Credit ledger

Models one epoch of non-transferable compute entitlements in memory.

1. Issue the validated allocation once when constructing a ledger.
2. Reserve a maximum number of credits before accepting a job.
3. Settle metered use and release the unused reservation, or cancel a failed job.
4. Refuse new reservations after expiry; allow an existing job to settle.

Request IDs are idempotency keys: identical retries do not charge twice, while mismatched retries fail. Retrying a cancelled reservation returns its terminal state and does not reopen it. Mutating a returned object cannot change internal balances.

Every account obeys `issued = available + reserved + consumed + expired`. This class has no database, wallet authentication, concurrency control across processes or real GPU access. See [credit lifecycle](../../docs/protocol/compute-credits.md) before extending it.
