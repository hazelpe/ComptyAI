# Compute Treasury

The proposed treasury converts a bounded amount of protocol revenue into a useful compute allowance. It should retain an operational reserve, commit spending to a selected GPU tier and record both the purchased capacity and the resulting provider invoices.

The local budget follows this order:

1. Take the configured share of collected protocol fees.
2. Take an operational reserve from that treasury share.
3. Convert the remaining budget to whole minutes at the illustrative GPU price.
4. Allocate no more than those minutes as demo credits.

In a live system, a price quote alone is insufficient. Issue usable credits only after capacity and payment terms are confirmed. Include taxes, minimum billing increments, storage and network charges in the service budget when applicable.

Provider execution and invoice verification are offchain trust dependencies. Onchain payment records prove transfers, not completed GPU work. Treasury reporting should reconcile receipts, payments, refunds, unspent cash and metered usage.

The custody model is undecided. Multisignature authorization, spending limits and time-delayed policy changes are proposed controls, not implemented features. No mainnet treasury address or operator role is established here.
