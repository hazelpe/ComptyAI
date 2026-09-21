# Transparency reporting

An epoch report should make the funding-to-usage path inspectable without publishing user prompts or private workload outputs.

| Report section | Required detail |
| --- | --- |
| Receipts | Network, asset, finalized block range, receipt references and totals |
| Treasury | Opening balance, inflows, reserve, spending, refunds and closing balance |
| Capacity | GPU tier, purchased units, unit definition and commitment window |
| Allocation | Snapshot block, rules, eligible weight, issued and unallocated credits |
| Utilization | Reserved, consumed, expired and released credits |
| Reconciliation | Provider invoices, metering differences and corrective actions |

Separate fictional demo values, testnet measurements and production metrics. Report exact time windows and sources. An onchain transfer is evidence of payment, not proof that a GPU job completed successfully. Redact provider credentials and confidential commercial terms while preserving enough information to check the accounting totals.
