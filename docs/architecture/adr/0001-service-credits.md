# ADR 0001: use service credits for compute access

**Status:** proposed; implemented in the local reference model only.

**Context.** Holders need a way to consume a funded service. A second transferable token would introduce trading and settlement concerns unrelated to GPU usage.

**Decision.** Model Compute Credits as expiring, non-transferable per-epoch entitlements. Associate a credit with a defined GPU tier and authorize jobs through reservation and metered settlement.

**Consequences.** The design can bound issued allowances by an available budget and prevent duplicate local consumption. It also needs a trusted or verifiable metering process and an authenticated, durable gateway. Credits do not prove that an offchain provider executed a workload correctly.

**Open questions.** Final credit units, expiry policy, provider failure compensation and wallet claim mechanics require a later decision before production implementation.
