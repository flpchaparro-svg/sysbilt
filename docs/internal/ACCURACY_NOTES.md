# Accuracy notes (repo vs external docs)

**Checked against repo / manifest:** 9 July 2026  
**Checker:** Cursor agent (not a live HTML crawl of every URL)

Use this when syncing external docs. Fix either the doc or the codebase/CMS, then strike the row.

---

## Confirmed aligned

| Claim | Source |
|-------|--------|
| `robots.txt`: `Allow: /`, `Disallow: /studio/`, sitemap pointer | `public/robots.txt` |
| Homepage meta: growing-companies framing | `src/constants/seoMeta.ts` (`Business Systems for Growing Companies`) |
| Build chain: `stamp-meta.mjs` + `verify-seo.mjs` in `npm run build` | `package.json` |
| Pillar copy in `src/constants/pillar1Copy.ts` … `pillar7Copy.ts` | Repo |
| Only `copy/privacy.md` remains under `copy/` | Repo |
| Footer: `© [year] SYSBILT. Sydney, Australia.` | `src/components/GlobalFooter.tsx` |
| Felipe Chaparro legal/founder appearances (four places) | `AgreementCover`, `AgreementSignBlock`, `ArchitectPage`, `TheArchitect` |
| Eight book hubs, 12 chapters each, keyword slugs (e.g. `what-a-business-website-is-for`) | `src/generated/contentManifest.generated.ts`, `src/App.tsx` |
| Four personas in Sanity (`The Builder`, `Scaler`, `Controller`, `Visionary`) | `studio/schemaTypes/post.ts` |
| 24 toolkit slugs in manifest | `TOOLKIT_SLUGS` |
| Postiz hostname in channel playbook | `scripts/automations/postiz/bootstrap-mac-mini.sh` |
| Sybil implemented in `api/chat.ts` (Gemini) | Repo |
| `useCdn: true` on Sanity client | `src/sanityClient.ts` |
| No prices on public site (pricing doc is internal-only) | No pricing in `src/` pages |

---

## Corrections needed (doc or site)

### 1. Blog post count — **update BRAND_FACTS / SEO_MASTER**

Docs say **70** blog posts. Build manifest (`BLOG_SLUGS`) has **69** published slugs as of 9 Jul 2026. Refresh the count after the next Sanity publish or fix the number in both docs.

### 2. Sitemap URL total — **re-verify live**

Docs say **224** URLs (verified live 2026-07-07). Manifest-only arithmetic today: 69 blog + 24 toolkit + 10 standalone guides + 8 book hubs + (8 × 12) chapters + core routes ≈ **222** content slugs before static/pillar routes. Re-run `/sitemap.xml` or `verify-seo` after sync; update docs if the count moved.

### 3. Revenue band on `/architect` — **fix site (violates BRAND_FACTS)**

`BRAND_FACTS.md` says revenue range **never** appears in reader-facing copy.  
`src/constants/seoMeta.ts` → `architect.description` still includes **"$1M to $20M"**. Remove or rephrase to match the growing-companies standard.

### 4. Persona guide: “system pages” — **fix PERSONA guide**

`SYSBILT_Persona_Reference_Guide.md` §7 describes **one page per phase** (Get Clients / Scale Faster / See Clearly). The app has a **single** `/system` page (`SystemPage.tsx`), not three phase URLs. Update the persona doc to match `/system`, or split routes if product intent changed.

### 5. Blog byline “Felipe Chaparro” — **CMS-dependent**

`CHANNEL_PLAYBOOK.md` requires blog bylines to Felipe. Code defaults to **`SYSBILT TEAM`** when Sanity `author` is empty (`BlogPostPage.tsx`). Confirm each post’s author in Sanity; doc is correct as editorial rule, not guaranteed live.

### 6. Toolkit “small business” — **open SEO work (doc correct)**

`SEO_MASTER.md` flags legacy toolkit `metaTitle` patterns. Still true in schema hints:

- `studio/schemaTypes/toolkitItem.ts`: badge option `best-for-small-business`, focus-keyword example with “small business”.

Migration is Sanity content + schema cleanup, not just meta copy.

### 7. Sybil system prompt wording — **minor site drift**

`CHANNEL_PLAYBOOK.md` / brand rules: growing businesses, not “small”.  
`api/chat.ts` system prompt still says **“small Sydney-based team”**. Consider aligning with “growing Australian businesses”.

### 8. `postinstall` / Puppeteer — **SEO_MASTER stale artefact note**

`SEO_MASTER.md` lists dead `postinstall` Chrome download as cosmetic.  
`package.json` still runs `postinstall`: `npx puppeteer browsers install chrome` (Puppeteer remains a devDependency for optional local prerender scripts). Update SEO_MASTER: either remove postinstall in a future cleanup or reclassify as “optional local prerender only”.

### 9. Prerender scripts — **partially stale**

`SEO_MASTER.md`: prerender removed from production path (correct: `middleware.ts` has no prerender).  
`scripts/site/prerender.mjs` and `prerender-run.mjs` still exist for **local** use. Doc should say “not in Vercel build” rather than “dead files” if you keep local prerender.

### 10. CHANNEL_PLAYBOOK version footer

Header says **v1.1**; closing line says **v1.0**. Cosmetic; pick one version on next edit.

### 11. Amanda (content) — **UNVERIFIED in repo**

`BRAND_FACTS.md` lists Amanda on the team. No code reference found; fine as brand fact, not verifiable from git.

### 12. Email addresses — **UNVERIFIED in repo**

`hello@sysbilt.com`, `help@sysbilt.com`, `felipe@sysbilt.com` are not referenced in source. Confirm DNS/mailbox setup outside the repo.

---

## Infrastructure docs (separate)

Live Mac Mini / n8n / Postiz state was **not** re-checked during this content sync. See UNVERIFIED sections in `SERVER_ARCHITECTURE.md` and `N8N_MASTER.md` (9 Jul 2026).

---

*After you fix an item, delete or move its row to a “Resolved” section with date.*
