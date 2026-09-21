# Credit allocation model

For an integer pool `C` and non-negative eligible weights `wᵢ`, an account’s exact share is `C × wᵢ / Σw`. The reference model floors every share, then gives remaining whole credits to the largest fractional remainders.

Equal remainders are resolved by ascending normalized account identifier. This makes the result independent of the input order. Zero-weight accounts never participate in remainder distribution.

For `C = 16,200` and weights `50, 30, 20`, allocations are `8,100, 4,860, 3,240`. For `C = 2` and equal weights for accounts `a`, `b`, `c`, allocations are `1, 1, 0`.

Two invariants hold: every allocation is a non-negative integer, and the sum of allocations plus the unallocated pool equals `C`. If all weights are zero or the holder list is empty, the entire pool remains unallocated. Duplicate normalized accounts are rejected.

Largest-remainder rounding can favor lexically earlier identifiers in repeated equal-weight ties. A production policy may choose a published, auditable rotating tie-breaker; the repository deliberately uses the simpler deterministic reference rule.
