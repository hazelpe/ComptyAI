# Fictional epoch walkthrough

The fixtures are intended to make the protocol mechanics reproducible. They contain no real wallet addresses or provider credentials.

Run `npm run demo` from the root. The example reads `epochs/demo-epoch.json`, calculates a budget, allocates credits to three fictional holders, then runs `jobs/inference.json` through the mock provider.

| Calculation | Result |
| --- | ---: |
| 100,000 fee cents × 6,000 / 10,000 | 60,000 treasury cents |
| 60,000 × 1,000 / 10,000 | 6,000 reserve cents |
| 60,000 − 6,000 | 54,000 compute budget cents |
| 54,000 × 60 / 200 | 16,200 GPU-minute credits |
| 50% / 30% / 20% allocation | 8,100 / 4,860 / 3,240 credits |
| First holder: 8,100 − 120 reserved | 7,980 temporarily available |
| Settle 90 used, release 30 | 8,010 available, 90 consumed |

The console reports `provider: local-mock`. No real job is submitted. Every run resets state so results are deterministic. Adjust fee receipts, prices or holder weights to explore how a smaller funded pool affects the allocation.
