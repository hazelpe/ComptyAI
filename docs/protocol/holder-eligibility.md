# Holder eligibility

The proposed protocol allocates a funded epoch pool among eligible holders. The repository uses named fixture accounts and integer weights; it does not read wallets or prove ownership.

A production policy must publish the token address, chain, snapshot block, finality rule, eligible balances, excluded addresses, minimum balance and any holding-period requirement. Addresses such as treasury, burn, pool and exchange custody addresses require an explicit inclusion policy.

Snapshot balances alone are vulnerable to temporary holdings around a known snapshot. Time-weighted balances, a holding period or other controls are possible design choices. None is implemented here. Wallet splitting also matters if a future policy uses per-account caps or nonlinear weights.

The reference allocator uses linear weights and deterministic rounding. It normalizes identifiers to lowercase, rejects duplicate accounts and gives zero-weight accounts no credits. For real ERC-20 balances, use base-unit `BigInt` or a documented normalized weight system; do not put an 18-decimal raw token balance into a JavaScript `Number`.

The meaning of selling tokens after a snapshot, claim windows and whether unused credits roll forward must be settled before a live launch. The local ledger retains its issued allowance until expiry, and has no continuous balance revocation.
