import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { planBudget, allocateCredits } from '../../packages/compute-core/src/index.mjs';
import { CreditLedger } from '../../packages/credit-ledger/src/index.mjs';
import { executeMockJob } from '../../services/scheduler/src/index.mjs';
import { MockGpuProvider } from '../../services/scheduler/src/providers/mock.mjs';

test('documented CLI runs the actual fixtures with a provider adapter', () => {
  const script = fileURLToPath(new URL('../../apps/console/src/index.mjs', import.meta.url));
  const output = execFileSync(process.execPath, [script], { encoding: 'utf8' });
  const report = JSON.parse(output.slice(output.indexOf('{')));
  assert.equal(report.job.provider, 'local-mock');
  assert.equal(report.holderBalance.available, 8010);
  assert.equal(report.budget.totalCredits, 16200);
});

test('fixture epoch funds credits, settles usage and avoids duplicate execution', async () => {
  const fixture = JSON.parse(await readFile(new URL('../../examples/epochs/demo-epoch.json', import.meta.url)));
  const budget = planBudget(fixture);
  const { allocations } = allocateCredits(fixture.holders, budget.totalCredits);
  const ledger = new CreditLedger({ allocations, expiresAt: 200, now: () => 100 });
  const provider = new MockGpuProvider();
  const job = { ledger, provider, account: 'holder-alice', requestId: 'integration-1', maxCredits: 120, simulatedUsageCredits: 90 };
  assert.equal(executeMockJob(job).status, 'settled');
  assert.equal(executeMockJob(job).usedCredits, 90);
  assert.equal(provider.callCount, 1);
  assert.equal(ledger.balance('holder-alice').available, 8010);
  const all = allocations.map(row => ledger.balance(row.account));
  assert.equal(all.reduce((sum, row) => sum + row.available + row.reserved + row.consumed + row.expired, 0), budget.totalCredits);
});
test('a confirmed mock failure releases its complete reservation', () => {
  const ledger = new CreditLedger({ allocations: [{ account: 'a', credits: 50 }], expiresAt: 200, now: () => 100 });
  const provider = new MockGpuProvider();
  const job = { ledger, provider, account: 'a', requestId: 'failure-1', maxCredits: 50, simulatedUsageCredits: 10, fail: true };
  assert.throws(() => executeMockJob(job), /Simulated GPU provider failure/);
  assert.equal(ledger.balance('a').available, 50);
  assert.equal(executeMockJob(job).status, 'cancelled');
  assert.equal(provider.callCount, 1);
});
