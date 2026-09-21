import { integer } from './validation.mjs';

/** Integer-only budgeting. Prices and fee receipts are illustrative USD cents. */
export function planBudget({ protocolFeesCents, treasuryShareBps, reserveBps, gpuHourPriceCents }) {
  integer(protocolFeesCents, 'protocolFeesCents');
  integer(treasuryShareBps, 'treasuryShareBps');
  integer(reserveBps, 'reserveBps');
  integer(gpuHourPriceCents, 'gpuHourPriceCents', 1);
  if (treasuryShareBps > 10_000 || reserveBps > 10_000) {
    throw new RangeError('Basis points cannot exceed 10000');
  }
  const fees = BigInt(protocolFeesCents);
  const treasury = fees * BigInt(treasuryShareBps) / 10_000n;
  const reserve = treasury * BigInt(reserveBps) / 10_000n;
  const spendable = treasury - reserve;
  const minutes = spendable * 60n / BigInt(gpuHourPriceCents);
  if (minutes > BigInt(Number.MAX_SAFE_INTEGER)) throw new RangeError('Capacity exceeds safe integer range');
  return Object.freeze({
    protocolFeesCents,
    treasuryCents: Number(treasury),
    reserveCents: Number(reserve),
    computeBudgetCents: Number(spendable),
    // One demo credit represents one minute of the configured example GPU tier.
    totalCredits: Number(minutes),
    otherProtocolCents: Number(fees - treasury),
  });
}
