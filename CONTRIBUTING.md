# Contributing to ComptyAI

Start by reading the [protocol overview](docs/protocol/overview.md) and [architecture](docs/architecture/system-design.md). Open an issue with the problem, expected behavior and proposed scope before making a large design change.

For code changes, use Node.js 22 or newer and run:

```sh
npm run verify
```

Keep units explicit: fee inputs are integer cents in the demo, percentages are basis points and credits represent minutes of one example GPU tier. Real token amounts need their own base-unit policy. Preserve credit conservation and idempotent transitions; add a focused regression test when changing those behaviors.

Documentation should distinguish implemented behavior, proposals and fictional examples. Do not add invented partnerships, deployed addresses, audited-status claims, GPU capacity or pricing. Record an authoritative source and verification date when changing network metadata.

Keep pull requests focused. Explain the user-visible or protocol behavior, why it changes and how it was checked. Use the supplied issue and PR templates. Sensitive findings belong in a private channel as described in [SECURITY.md](SECURITY.md).
