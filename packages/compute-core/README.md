# Compute core

Pure reference functions for fee budgeting and holder allocation. Import from `src/index.mjs`.

`planBudget()` accepts integer cents and basis points. Intermediate multiplication uses `BigInt`; outputs must remain safe integers. The credit pool is rounded down to whole GPU minutes. Rounding residue remains uncommitted in the treasury.

`allocateCredits()` takes unique accounts with non-negative integer weights. It uses proportional shares and largest remainders, breaking equal-remainder ties by normalized account name. Zero-weight accounts receive zero. If there are no eligible holders, all credits remain unallocated.

The demo uses fixture weights, not verified wallet balances. Production snapshot collection, exclusions, holding periods and identity controls are separate integration work.
