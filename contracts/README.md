# Proposed onchain interfaces

The files under `src/interfaces/` are **design proposals**, not deployable protocol implementations. They describe event and read-function shapes that an eventual integration might expose. There is no token contract, withdrawal implementation, authorization system, deployment script or audit here.

The proposal keeps onchain fee attribution and snapshot commitments separate from the offchain credit ledger. A published snapshot root alone does not authenticate a holder or establish a complete claim protocol.

Before implementation, choose asset units, custody roles, snapshot hashing rules, funding and withdrawal rules, upgrade policy and emergency controls. Specify the required invariants, add a Solidity build/test toolchain and obtain review before handling real funds. The Node.js test suite does not compile or validate these interfaces.
