# Security

This repository is a reference prototype. Its in-memory credit ledger, mock provider and proposed Solidity interfaces are not a production protocol or an audited implementation. Do not use the prototype as a custody service.

For ordinary local-demo bugs, open an issue with a minimal reproduction and expected behavior. For a sensitive finding, use GitHub’s **Report a vulnerability** flow if private vulnerability reporting is enabled. If no private channel is available, open an issue asking the maintainer to establish one without including exploit details, credentials or private information.

Never include wallet private keys, seed phrases, provider secrets or live authentication tokens in fixtures, logs or issues. The example environment file contains public network metadata and empty address fields only.

Before a production rollout, the project needs a contract review process, authenticated persistent accounting, transaction finality rules, provider reconciliation and documented incident handling. None of those is represented as complete here.
