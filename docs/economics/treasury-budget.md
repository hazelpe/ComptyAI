# Treasury budget model

Let `F` be reconciled fee revenue in integer cents, `t` the treasury share in basis points, `r` the reserve fraction in basis points, and `p` the quoted price in cents per GPU-hour.

```text
treasury = floor(F × t / 10,000)
reserve = floor(treasury × r / 10,000)
spendable = treasury − reserve
credit pool = floor(spendable × 60 / p)
```

All inputs must be non-negative safe integers, `p` must be positive, and each basis-point value must be at most 10,000. Intermediate products use `BigInt` to avoid multiplication drift. The output pool must still fit the safe integer range.

With the fixture’s fictional $1,000 receipt, 60% share, 10% reserve and $2/hour price, the model budgets $540 for 270 hours, represented by 16,200 credits. These are demonstration assumptions, not provider pricing or financial forecasts.

Rounding always reduces commitments. Unspent rounding residue stays in the treasury; it is not assigned as extra credits. Other costs, provider billing increments and capacity availability must be incorporated into a real quote before issuance.
