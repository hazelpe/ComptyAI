import test from 'node:test';
import assert from 'node:assert/strict';
import { CreditLedger } from '../../packages/credit-ledger/src/index.mjs';

const setup = (now = () => 100) => new CreditLedger({ allocations: [{ account: 'alice', credits: 100 }], expiresAt: 200, now });
const reserve = ledger => ledger.reserve({ account: 'alice', requestId: 'job-1', credits: 60 });
const conserved = balance => assert.equal(balance.issued, balance.available + balance.reserved + balance.consumed + balance.expired);

test('settlement charges actual usage and releases unused credits', () => {
  const ledger = setup();
  reserve(ledger);
  assert.equal(ledger.balance('alice').available, 40);
  ledger.settle('job-1', 45);
  assert.deepEqual(ledger.balance('alice'), { issued: 100, reserved: 0, consumed: 45, available: 55, expired: 0 });
  conserved(ledger.balance('alice'));
});
test('identical retries are idempotent and conflicting retries fail', () => {
  const ledger = setup();
  reserve(ledger);
  reserve(ledger);
  assert.equal(ledger.balance('alice').reserved, 60);
  assert.throws(() => ledger.reserve({ account: 'alice', requestId: 'job-1', credits: 30 }), /conflict/);
  ledger.settle('job-1', 40);
  ledger.settle('job-1', 40);
  assert.equal(ledger.balance('alice').consumed, 40);
  assert.throws(() => ledger.settle('job-1', 41), /Conflicting/);
  assert.throws(() => ledger.cancel('job-1'), /Settled/);
});
test('cancellation restores funds and terminal retries do not reopen a job', () => {
  const ledger = setup();
  reserve(ledger);
  ledger.cancel('job-1');
  ledger.cancel('job-1');
  assert.equal(reserve(ledger).status, 'cancelled');
  assert.equal(ledger.balance('alice').available, 100);
  assert.throws(() => ledger.settle('job-1', 1), /no longer active/);
});
test('expiry rejects new reservations but preserves prior usage settlement', () => {
  let now = 100;
  const ledger = setup(() => now);
  reserve(ledger);
  now = 200;
  assert.throws(() => ledger.reserve({ account: 'alice', requestId: 'late', credits: 1 }), /expired/);
  ledger.settle('job-1', 30);
  assert.deepEqual(ledger.balance('alice'), { issued: 100, reserved: 0, consumed: 30, available: 0, expired: 70 });
  conserved(ledger.balance('alice'));
});
test('refuses overspending and invalid usage without changing balances', () => {
  const ledger = setup();
  reserve(ledger);
  assert.throws(() => ledger.reserve({ account: 'alice', requestId: 'job-2', credits: 41 }), /Insufficient/);
  assert.throws(() => ledger.settle('job-1', 61), /exceeds/);
  assert.throws(() => ledger.settle('job-1', -1));
  assert.equal(ledger.balance('alice').reserved, 60);
  conserved(ledger.balance('alice'));
});
test('callers cannot mutate internal accounts or requests through return values', () => {
  const ledger = setup();
  const request = reserve(ledger);
  request.status = 'settled';
  ledger.balance('alice').available = 9999;
  assert.equal(ledger.balance('alice').available, 40);
  assert.equal(ledger.settle('job-1', 1).usedCredits, 1);
});
test('rejects duplicate issuance and unknown accounts', () => {
  assert.throws(() => new CreditLedger({ allocations: [{ account: 'a', credits: 1 }, { account: 'A', credits: 2 }], expiresAt: 200 }), /Duplicate/);
  assert.throws(() => setup().balance('bob'), /Unknown account/);
});
