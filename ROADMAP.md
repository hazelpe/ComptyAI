# Roadmap

Milestones are ordered by dependency, not by promised dates. Checked items exist in this repository; unchecked items are future work.

## 01 · Define the mechanism

- [x] Project identity, logo and README artwork.
- [x] Fee-to-compute protocol documentation and Chinese introduction.
- [x] Local budget, allocation, credit ledger and mock provider.
- [x] Tests for conservation, rounding, expiry and idempotency.

## 02 · Resolve the protocol policy

- [ ] Select fee-generating integrations and collection assets.
- [ ] Define token parameters, eligibility, snapshot policy and credit units.
- [ ] Specify custody, spending authorization and policy change procedures.
- [ ] Confirm a GPU tier, provider pricing and capacity commitments.

Acceptance: publish a complete, reviewable policy with no ambiguous accounting units or unfunded capacity claims.

## 03 · Build the testnet path

- [ ] Implement and test contracts on Robinhood Chain Testnet.
- [ ] Build durable, authenticated credit accounting.
- [ ] Integrate a provider sandbox, queue and metering reconciliation.
- [ ] Provide a holder interface for claiming and consuming credits.

Acceptance: reproduce one complete testnet epoch from fee receipt through a metered job, including failure and recovery paths.

## 04 · Review and launch readiness

- [ ] Review contract security and operational custody controls.
- [ ] Exercise provider outages, reorgs and duplicate-event recovery.
- [ ] Publish verified deployment references and an epoch transparency report.
- [ ] Define service limits and support procedures before public access.

Acceptance: independently reviewable code, documented operations and confirmed funded capacity. No mainnet launch date is specified.
