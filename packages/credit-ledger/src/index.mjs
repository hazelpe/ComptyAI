import { identifier, integer } from '../../compute-core/src/validation.mjs';

/** In-memory, single-process reference ledger. Not a persistent service or token. */
export class CreditLedger {
  #accounts = new Map();
  #requests = new Map();
  #expiresAt;
  #now;

  constructor({ allocations, expiresAt, now = () => Date.now() }) {
    integer(expiresAt, 'expiresAt', 1);
    if (!Array.isArray(allocations)) throw new TypeError('allocations must be an array');
    if (typeof now !== 'function') throw new TypeError('now must be a function');
    for (const { account, credits } of allocations) {
      const key = identifier(account, 'account').toLowerCase();
      integer(credits, 'credits');
      if (this.#accounts.has(key)) throw new Error(`Duplicate account: ${account}`);
      this.#accounts.set(key, { issued: credits, reserved: 0, consumed: 0 });
    }
    this.#expiresAt = expiresAt;
    this.#now = now;
  }

  #account(account) {
    const key = identifier(account, 'account').toLowerCase();
    const row = this.#accounts.get(key);
    if (!row) throw new Error(`Unknown account: ${account}`);
    return [key, row];
  }

  balance(account) {
    const [, row] = this.#account(account);
    const expired = this.#now() >= this.#expiresAt;
    const unused = row.issued - row.reserved - row.consumed;
    return { ...row, available: expired ? 0 : unused, expired: expired ? unused : 0 };
  }

  reserve({ account, requestId, credits }) {
    const [key, row] = this.#account(account);
    identifier(requestId, 'requestId');
    integer(credits, 'credits', 1);
    const existing = this.#requests.get(requestId);
    if (existing) {
      if (existing.account !== key || existing.reservedCredits !== credits) {
        throw new Error('Request ID conflicts with an existing reservation');
      }
      return { ...existing };
    }
    if (this.#now() >= this.#expiresAt) throw new Error('Credit epoch has expired');
    if (this.balance(key).available < credits) throw new Error('Insufficient compute credits');
    row.reserved += credits;
    const request = { requestId, account: key, reservedCredits: credits, status: 'reserved' };
    this.#requests.set(requestId, request);
    return { ...request };
  }

  settle(requestId, usedCredits) {
    identifier(requestId, 'requestId');
    integer(usedCredits, 'usedCredits');
    const request = this.#requests.get(requestId);
    if (!request) throw new Error('Unknown request');
    if (request.status === 'settled') {
      if (request.usedCredits !== usedCredits) throw new Error('Conflicting settlement');
      return { ...request };
    }
    if (request.status !== 'reserved') throw new Error('Reservation is no longer active');
    if (usedCredits > request.reservedCredits) throw new Error('Usage exceeds reservation');
    const [, row] = this.#account(request.account);
    row.reserved -= request.reservedCredits;
    row.consumed += usedCredits;
    Object.assign(request, { status: 'settled', usedCredits });
    return { ...request };
  }

  cancel(requestId) {
    identifier(requestId, 'requestId');
    const request = this.#requests.get(requestId);
    if (!request) throw new Error('Unknown request');
    if (request.status === 'cancelled') return { ...request };
    if (request.status !== 'reserved') throw new Error('Settled requests cannot be cancelled');
    const [, row] = this.#account(request.account);
    row.reserved -= request.reservedCredits;
    request.status = 'cancelled';
    return { ...request };
  }
}
