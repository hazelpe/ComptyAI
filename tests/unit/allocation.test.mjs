import test from 'node:test';
import assert from 'node:assert/strict';
import { allocateCredits } from '../../packages/compute-core/src/allocation.mjs';

test('allocates the complete pool proportionally', () => {
  const { allocations, unallocatedCredits } = allocateCredits([
    { account: 'a', weight: 50 }, { account: 'b', weight: 30 }, { account: 'c', weight: 20 },
  ], 16200);
  assert.deepEqual(allocations.map(row => row.credits), [8100, 4860, 3240]);
  assert.equal(unallocatedCredits, 0);
});
test('equal remainders have deterministic order-independent ties', () => {
  const holders = ['c', 'b', 'a'].map(account => ({ account, weight: 1 }));
  const normalized = rows => rows.allocations.sort((a, b) => a.account.localeCompare(b.account));
  const output = normalized(allocateCredits(holders, 2));
  assert.deepEqual(output.map(row => row.credits), [1, 1, 0]);
  assert.deepEqual(output, normalized(allocateCredits([...holders].reverse(), 2)));
});
test('zero weights receive nothing; an empty eligible set retains its pool', () => {
  assert.equal(allocateCredits([], 7).unallocatedCredits, 7);
  assert.equal(allocateCredits([{ account: 'a', weight: 0 }], 7).unallocatedCredits, 7);
  assert.deepEqual(allocateCredits([{ account: 'a', weight: 0 }, { account: 'b', weight: 3 }], 2).allocations.map(row => row.credits), [0, 2]);
});
test('rejects duplicate normalized accounts and invalid weights', () => {
  assert.throws(() => allocateCredits([{ account: 'ALICE', weight: 1 }, { account: 'alice', weight: 1 }], 3), /Duplicate/);
  assert.throws(() => allocateCredits([{ account: 'a', weight: -1 }], 3));
  assert.throws(() => allocateCredits([{ account: 'a', weight: 1.5 }], 3));
  assert.throws(() => allocateCredits([{ account: '', weight: 1 }], 3));
});
test('integer conservation over varied pools and large intermediate products', () => {
  for (let pool = 0; pool < 200; pool += 1) {
    const result = allocateCredits([{ account: 'a', weight: Number.MAX_SAFE_INTEGER }, { account: 'b', weight: 1234567 }, { account: 'c', weight: 0 }], pool);
    assert.equal(result.allocations.reduce((sum, row) => sum + row.credits, 0) + result.unallocatedCredits, pool);
    assert.ok(result.allocations.every(row => Number.isSafeInteger(row.credits) && row.credits >= 0));
  }
});
