/** Synchronous reference path only. Real providers require durable job orchestration. */
export function executeMockJob({ ledger, provider, account, requestId, maxCredits, simulatedUsageCredits, fail = false }) {
  const reservation = ledger.reserve({ account, requestId, credits: maxCredits });
  if (reservation.status !== 'reserved') return reservation;
  try {
    const result = provider.run({ requestId, reservedCredits: maxCredits, simulatedUsageCredits, fail });
    return { ...ledger.settle(requestId, result.usedCredits), provider: result.provider, jobId: result.jobId };
  } catch (error) {
    ledger.cancel(requestId);
    throw error;
  }
}
