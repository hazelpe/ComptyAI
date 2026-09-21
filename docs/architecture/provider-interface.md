# Provider integration contract

A future provider adapter should normalize four operations: quote a specific GPU tier, submit an idempotent job, query job state and obtain metered usage. Cancellation must distinguish a confirmed stop from an uncertain network response.

| Field | Meaning |
| --- | --- |
| `requestId` | Stable application idempotency key |
| `providerJobId` | Provider-assigned execution reference |
| `gpuTier` | Hardware and resource profile |
| `maxCredits` | Hard authorized usage limit |
| `usedCredits` | Reconciled usage in the same unit |
| `status` | Queued, running, succeeded, failed, cancelled or unknown |

Provider retries must reuse the same idempotency key. Persist the reservation and intended dispatch before submitting a job, then reconcile ambiguous outcomes with the provider. A timeout cannot be interpreted as proof that no compute was consumed.

The mock adapter in `services/scheduler/src/providers/mock.mjs` uses integer simulated minutes and deterministic failure injection. It makes no external calls, stores no prompts and does not emulate asynchronous execution. Its behavior is useful for reference tests but is not a production adapter contract in executable form.
