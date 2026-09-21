# README banners

| File | Placement |
| --- | --- |
| `01-hero.png` | Project introduction and supplied logo |
| `02-compute-flow.png` | Five-step activity-to-compute mechanism |
| `03-holder-access.png` | Holder snapshot, allowance and usage |
| `04-manifesto.png` | Closing project principle |

PNG exports are used in the README for reliable GitHub rendering. Editable standalone SVG layouts are kept in `source/`. The hero source embeds the supplied logo so that it has no external image dependency.

To regenerate with the optional Sharp image renderer:

```sh
npm install --no-save --package-lock=false sharp
node scripts/generate-banners.mjs
```

This tool is only needed to edit artwork; the application, demo, checks and tests do not depend on it. Rendering uses available Arial/Helvetica and Consolas/monospace fonts, so typography can differ slightly between operating systems. Commit both sources and exports after reviewing all four images.
