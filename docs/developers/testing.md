# Testing

`npm test` runs Node’s built-in test runner. The suite focuses on money/credit conservation, deterministic rounding, invalid inputs, idempotency, expiry and provider failure recovery. `npm run check` verifies local Markdown links, JSON files, JavaScript syntax and required brand assets. `npm run verify` runs those checks and the demo together.

Tests do not contact Robinhood Chain, rent GPUs or validate Solidity bytecode. The contracts directory contains interface proposals only. There is no audit or live-system validation claim.

When modifying accounting code, add a test that demonstrates the violated invariant before the fix. Avoid snapshots that merely mirror the current implementation. The workflow runs on both Windows and Linux with Node.js 22.
