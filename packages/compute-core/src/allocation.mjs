import { identifier, integer } from './validation.mjs';

/** Largest-remainder allocation: exact total, stable ties, no floating-point drift. */
export function allocateCredits(holders, totalCredits) {
  integer(totalCredits, 'totalCredits');
  if (!Array.isArray(holders)) throw new TypeError('holders must be an array');
  const seen = new Set();
  const rows = holders.map(({ account, weight }) => {
    identifier(account, 'account');
    integer(weight, 'weight');
    // Case-insensitive normalization also prevents mixed-case EVM address duplication.
    const key = account.toLowerCase();
    if (seen.has(key)) throw new Error(`Duplicate account: ${account}`);
    seen.add(key);
    return { account: key, weight };
  });
  const eligible = rows.filter(row => row.weight > 0);
  const weightSum = eligible.reduce((sum, row) => sum + BigInt(row.weight), 0n);
  if (weightSum === 0n) {
    return { allocations: rows.map(row => ({ ...row, credits: 0 })), unallocatedCredits: totalCredits };
  }
  const units = BigInt(totalCredits);
  const ranked = eligible.map(row => ({
    ...row,
    credits: Number(units * BigInt(row.weight) / weightSum),
    remainder: units * BigInt(row.weight) % weightSum,
  }));
  ranked.sort((a, b) => a.remainder === b.remainder
    ? (a.account < b.account ? -1 : a.account > b.account ? 1 : 0)
    : a.remainder > b.remainder ? -1 : 1);
  let remaining = totalCredits - ranked.reduce((sum, row) => sum + row.credits, 0);
  for (const row of ranked) {
    if (remaining === 0) break;
    row.credits += 1;
    remaining -= 1;
  }
  const credits = new Map(ranked.map(row => [row.account, row.credits]));
  return {
    allocations: rows.map(row => ({ ...row, credits: credits.get(row.account) ?? 0 })),
    unallocatedCredits: 0,
  };
}
