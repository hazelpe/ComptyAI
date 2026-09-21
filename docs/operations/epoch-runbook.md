# Proposed epoch runbook

This runbook describes a future operator process. No production operator service is included.

1. Reconcile fee receipts against a finalized chain state and deduplicate receipt identifiers.
2. Publish the fee asset, treasury share, reserve policy and epoch window.
3. Obtain a priced GPU capacity commitment and include relevant service costs.
4. Finalize the holder snapshot and record its eligibility/exclusion policy.
5. Allocate only funded capacity; publish the pool size and reproducible allocation inputs.
6. Enable authenticated claims and reservations through a persistent ledger.
7. Monitor job failures, queue depth, capacity utilization and budget deviations.
8. Close new reservations at expiry, reconcile existing jobs and publish the epoch report.

If provider availability becomes uncertain, pause new job admission and reconcile accepted jobs before releasing reservations. If an accounting discrepancy appears, stop new allocations and investigate the receipt-to-credit trail. Publish corrected figures with an explanation; do not silently rewrite an epoch’s history.
