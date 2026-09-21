# Protocol overview

ComptyAI proposes a direct connection between token activity and productive AI capacity:

```text
Token activity → Protocol fees → Compute Treasury → GPU rentals → Holder access
```

The system needs two kinds of accounting. Treasury accounting tracks real receipts, reserves and provider payments. Credit accounting tracks which holders may consume the rented capacity. A credit allocation must never be treated as evidence that the corresponding GPU capacity has already been secured.

An epoch is the accounting window for a budget and an eligible-holder snapshot. Before credits become usable, the operator should reconcile receipts, obtain a capacity quote, fund the allocation and publish its policy. A gateway then authorizes jobs against each holder’s remaining allowance.

The reference repository implements budgeting, weighted allocation and a mock execution lifecycle. It does not collect trading fees, custody funds, verify wallet ownership or rent physical GPUs. These boundaries let contributors review the proposed mechanism without pretending that external integrations already exist.

Three project principles guide the design: **Turn token activity into compute. Hold tokens. Get compute. We don’t accumulate tokens. We accumulate compute.**
