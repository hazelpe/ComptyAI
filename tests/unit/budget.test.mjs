import test from 'node:test';
import assert from 'node:assert/strict';
import { planBudget } from '../../packages/compute-core/src/budget.mjs';

const sample = { protocolFeesCents: 100000, treasuryShareBps: 6000, reserveBps: 1000, gpuHourPriceCents: 200 };
test('budget preserves funds and yields the documented fictional capacity', () => {
  assert.deepEqual(planBudget(sample), {
    protocolFeesCents: 100000, treasuryCents: 60000, reserveCents: 6000,
    computeBudgetCents: 54000, totalCredits: 16200, otherProtocolCents: 40000,
  });
});
test('zero revenue and a full reserve issue no credits', () => {
  assert.equal(planBudget({ ...sample, protocolFeesCents: 0 }).totalCredits, 0);
  assert.equal(planBudget({ ...sample, reserveBps: 10000 }).totalCredits, 0);
});
test('fractional capacity rounds down within the available budget', () => {
  const result = planBudget({ ...sample, protocolFeesCents: 7, treasuryShareBps: 10000, reserveBps: 0 });
  assert.equal(result.totalCredits, 2);
  assert.ok(result.totalCredits * 200 <= result.computeBudgetCents * 60);
});
test('rejects invalid rates, fractional inputs, zero prices and overflow', () => {
  for (const override of [{ treasuryShareBps: 10001 }, { reserveBps: -1 }, { gpuHourPriceCents: 0 }, { protocolFeesCents: 1.2 }, { protocolFeesCents: NaN }]) {
    assert.throws(() => planBudget({ ...sample, ...override }));
  }
  assert.throws(() => planBudget({ protocolFeesCents: Number.MAX_SAFE_INTEGER, treasuryShareBps: 10000, reserveBps: 0, gpuHourPriceCents: 1 }), /safe integer/);
});
