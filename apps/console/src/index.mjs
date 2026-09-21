import { readFile } from 'node:fs/promises';
import { planBudget, allocateCredits } from '../../../packages/compute-core/src/index.mjs';
import { CreditLedger } from '../../../packages/credit-ledger/src/index.mjs';
import { defaultNetwork } from '../../../packages/chain-config/src/networks.mjs';
import { executeMockJob } from '../../../services/scheduler/src/index.mjs';
import { MockGpuProvider } from '../../../services/scheduler/src/providers/mock.mjs';

const fixture = JSON.parse(await readFile(new URL('../../../examples/epochs/demo-epoch.json', import.meta.url), 'utf8'));
const job = JSON.parse(await readFile(new URL('../../../examples/jobs/inference.json', import.meta.url), 'utf8'));
const budget = planBudget(fixture);
const { allocations, unallocatedCredits } = allocateCredits(fixture.holders, budget.totalCredits);
const ledger = new CreditLedger({ allocations, expiresAt: 2_000, now: () => 1_000 });
const result = executeMockJob({ ...job, ledger, provider: new MockGpuProvider() });

console.log('ComptyAI | Turn token activity into compute.');
console.log('LOCAL SIMULATION — illustrative values, no RPC calls or GPU rentals.');
console.log(JSON.stringify({
  epochId: fixture.epochId,
  targetNetwork: defaultNetwork,
  budget,
  allocations,
  unallocatedCredits,
  job: result,
  holderBalance: ledger.balance(job.account),
}, null, 2));
