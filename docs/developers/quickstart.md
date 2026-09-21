# Developer quickstart

Install Node.js 22 or newer, clone the repository and run these commands from its root:

```sh
npm run demo
npm run check
npm test
```

No `npm install` is required: runtime code and tests use built-in Node.js modules. The local demo reads JSON fixtures by module-relative paths and does not load `.env` or make RPC calls.

To change the fictional epoch, edit `examples/epochs/demo-epoch.json`. Keep cents, basis points and weights as integers. To change the example job, edit `examples/jobs/inference.json`; usage must not exceed its reserved maximum or the holder’s issued balance.

The modules can also be imported directly:

```js
import { planBudget, allocateCredits } from '../../../packages/compute-core/src/index.mjs';
```

That path is an example for a module at the same directory depth as `apps/console/src/index.mjs`. Adjust it for the importing file. The packages are repository modules, not published npm packages.

For network integration, consult [Robinhood Chain](robinhood-chain.md). No deployment command is included because the Solidity files are proposed interfaces rather than deployable implementations.
