# Guide chapter cover images

Two ratios per chapter when using photos:

| Surface | Ratio | Folder | Used by |
|---------|-------|--------|---------|
| **Web chapter hero** | 16:9 landscape | `shared/web/` | `/guides/.../:chapterSlug` |
| **A4 PDF opener** | Portrait (~3:4) | `shared/print/` | `/guides/.../read` |

Guide-specific files live under `built-to-work/web|print/` and `built-to-sell/web|print/`.

Path registry: `src/guides/shared-cover-assets.ts`  
Types: `src/guides/chapter-cover-types.ts` (`webSrc`, `printSrc`, `alt`)

**Do not delete landscape and portrait pairs** — same subject, different crops.

Export targets:
- Web: **1600×900** WebP
- Print: **768×1376** (or similar portrait) WebP
