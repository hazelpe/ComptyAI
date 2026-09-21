import { identifier, integer } from '../../../../packages/compute-core/src/validation.mjs';

/** Deterministic local adapter; does not rent or contact a GPU provider. */
export class MockGpuProvider {
  #calls = 0;
  get callCount() { return this.#calls; }

  run({ requestId, reservedCredits, simulatedUsageCredits, fail = false }) {
    identifier(requestId, 'requestId');
    integer(reservedCredits, 'reservedCredits', 1);
    integer(simulatedUsageCredits, 'simulatedUsageCredits');
    if (simulatedUsageCredits > reservedCredits) throw new Error('Mock usage exceeds reservation');
    this.#calls += 1;
    if (fail) throw new Error('Simulated GPU provider failure');
    return { jobId: `mock:${requestId}`, usedCredits: simulatedUsageCredits, provider: 'local-mock' };
  }
}
