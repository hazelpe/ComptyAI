# Scheduler reference

`src/index.mjs` connects a local credit reservation to `src/providers/mock.mjs`. A successful job settles actual simulated usage; a failed job cancels its reservation. A completed request retry does not invoke the mock provider again.

The adapter is synchronous and deterministic. It is not a hosted API, queue, rental integration or proof of available GPU capacity. A production adapter needs provider-side idempotency, durable state, metering reconciliation, job timeouts and explicit handling of an uncertain submission outcome. Never release a real reservation merely because a network request times out: the provider may still be running the job.

See [provider contract](../../docs/architecture/provider-interface.md) and [operational runbook](../../docs/operations/epoch-runbook.md).
