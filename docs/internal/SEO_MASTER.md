# SYSBILT — SEO Master

**Version 1.2 | 21 September 2026 | Internal only. The single source of truth for the state of SYSBILT's SEO: what's done, what's guarded, the keyword direction, and the list of resolved issues nobody should re-open. Replaces the March 2026 SEO Keyword Tables, which are retired.**

**Companion file: `SEARCH_LANE_BRIEF.md`** owns the demand question (what Australians actually search for, which doors we open, and the Google Business Profile local pack play). This file owns technical state, guards and off-page.

Read this before diagnosing anything SEO-related. Most "problems" raised in a fresh chat are things already fixed months ago. The do-not-resurface list at the end exists so we stop re-litigating settled work.

---

## The one rule for this file

**Ground truth before assertions.** Before claiming anything is broken, verify it against the live site (curl the apex, read the raw HTML) or the current file in Cursor. The GitHub sync in the Claude project is point-in-time and goes stale after Cursor commits. If it can't be verified, say "from older notes, please confirm". Never flag something as broken off a stale snapshot. This rule exists because it has cost real hours: a whole launch-prep session was lost to re-flagging robots.txt, meta tags, and voice issues that were already fixed, all because the assertions came from stale files instead of the live site.

---

## Current state (verified live 2026-07-07)

- **Sitemap:** Sanity-driven at `/sitemap.xml`, 224 URLs. Seven pillar pages, 70 blog posts, 24 toolkit pages, and the guides section (index, standalone guides, and all eight book hubs at twelve chapters each). The sitemap is generated from the same source data the site uses, never hand-maintained.
- **robots.txt:** `Allow: /`, `Disallow: /studio/`, with the sitemap pointer. Correct.
- **Canonicals:** present and self-referential on the homepage, blog posts, and guide chapters. Verified on live raw HTML.
- **Titles:** unique per route, keyword-led, pattern "[Page-specific] | SYSBILT". Verified across homepage, pillars, blog, guides.
- **Open Graph:** full OG set including `og:locale` `en_AU` and the branded `og-sysbilt.png` share image (1200x630). Verified.
- **Structured data:** build-time JSON-LD stamped into the head. Homepage carries Organization, WebSite, and ImageObject. Stamped per route class, parseable with zero JavaScript.
- **Framing:** the live meta has moved fully onto the growing-businesses standard. Homepage: "Business Systems for Growing Companies". Pillars: "... for Growing Businesses". The "small business" framing is gone from the deployed meta.

## The build-chain guards (how it stays fixed)

Two scripts run in the build and are the reason on-page SEO stays correct without manual policing:

- **`scripts/stamp-meta.mjs`** runs post-build. It stamps every route with a unique title, description, canonical, OG, and Twitter tags, plus build-time JSON-LD per route class (via tsx). Vercel serves these static files before the SPA rewrite, so crawlers get a fully-formed head with no JavaScript. This is what fixed the core indexation problem: crawlers were previously seeing an near-empty client-rendered shell.
- **`scripts/verify-seo.mjs`** is a build guard wired in after stamp-meta. It aborts the deploy on violations: missing or duplicate titles, missing or wrong canonicals, an unexpected noindex, missing or malformed JSON-LD, anti-drift checks, and sitemap parity. It generates its check-set from the same source data the site uses, never by fetching production, and it hard-fails on a Sanity fetch error rather than shipping a half-stamped build.

**Operating rule for the guard.** When the guard fails a build, the failures are findings, not bugs in the guard. Never modify pages, routes, or the guard's own assertions just to force a green build. Silencing a guard to get green is how guards die. Report the violations, fix the underlying pages, rebuild.

## The division of labour (what verifies what)

- **Cursor** implements inside the workspace and can run the full build, including stamp-meta, because it reaches Sanity's API.
- **Felipe** reviews and pushes. Vercel deploys automatically.
- **Claude** verifies from outside: reads pushed code and hammers the live site's raw HTML. Claude's sandbox cannot run the build (it can't reach Sanity mid-build) and cannot push. The one check Claude can't do from the sandbox is Google's Rich Results test, which is a browser job on three or four URLs after a structured-data change.

Nobody grades their own homework. That separation is the working method, not a limitation to route around.

---

## Keyword direction (the current standard)

**Demand check added 2026-09-21. The framing below is settled and unchanged. What was never checked was whether anyone searches for it.** They largely do not: `standard operating procedure software` is 90 a month in Australia, and `business automation sydney`, `automation agency sydney`, `n8n consultant`, `make.com consultant` and `sop software australia` return no measurable volume at all. Meanwhile `ai agency` is 6,600 and `seo sydney` is 2,900, both services we already sell.

The resolution is to keep the brand and add doors in the language people search, not to reposition the company. Full demand tables, the local pack play and the door list live in **`SEARCH_LANE_BRIEF.md`**. Read it before planning any new keyword work.

All keyword work still follows this:

- **The frame is "growing businesses" and "growing companies", plus "Australian businesses".** This is the deployed standard, not an aspiration.
- **"Small business" is retired as a keyword target**, in titles, meta, headers, and body, across the whole site. It carries more raw search volume, and we are deliberately not chasing it, because the brand positioning (premium operators, $1M to $20M, never "small business") outweighs the volume. This is a settled trade-off, not an oversight. Do not "optimise" it back in.
- **No tradie, trade, or blue-collar keyword framing** anywhere. See `BRAND_FACTS.md` for the full audience rule.
- **Service pages (pillars)** hold the local and commercial intent. They target the service plus the growing-business frame, for example "CRM for growing businesses", "business automation Australia". They're where conversion lives.
- **Blog posts** target one informational long-tail question each, matched to one persona. The focus keyword goes in the title, the opening, and at least one header, naturally.
- **Toolkit pages** target "{Tool} for business Australia", "how to use {Tool} in your business", and "{Tool} review Australia". Never a city or state term (nobody searches a global tool by city, and it reads fake). Never "small business". Full rules in the Toolkit Post Agent Instruction.
- **Guides and book chapters** target the broad educational head terms for each service, and interlink heavily. See the Book Series Master for the series' internal-linking model.

## Per-surface SEO fields

Blog and toolkit items carry structured SEO fields in Sanity: focus keyword, SEO title (under 60 characters, keyword-led), SEO description (under 160 characters, written for a human to click), and for blogs the target persona and business phase. The stamp-meta script reads these; if a field is blank the guard will flag it.

---

## Open SEO work

- **Soft 404s (code shipped 2026-09-21, confirm live after deploy).** Unknown URLs used to return `200` with the homepage body and `canonical=https://sysbilt.com/`. Middleware now serves `dist/404.html` with HTTP 404 and `X-Robots-Tag: noindex, follow`. Local stamp + verify-seo passed 21 Sep 2026. Live `curl -I` of a fake path was still `200` until deploy. Confirm with `curl -I` on a fake path after deploy. Until that check passes, treat the GSC duplicate buckets as still open.
- **Conversion tracking (code shipped 2026-09-21, GA4 key events still Felipe).** Contact, Sybil, and `/go` access now fire `generate_lead` and `form_submit` after a successful save. Mark those events as key events in GA4. Three months to 2026-09-20: 871 sessions, 295 users, 8 `form_start`, **zero** `form_submit`.
- **Sitemap advertises a redirect (open).** `/evidence-vault` is not in the stamp-meta route list. Confirm the live sitemap after the next deploy. The `308` in `vercel.json` stays.
- **22 titles over 60 characters (open).** Google truncates them. Full list is reproducible by crawling the sitemap; mostly blog posts and guides.
- **Toolkit metaTitle migration (on-page, open).** The 24 toolkit pages published before July 2026 still carry the old "{Tool} for small business" metaTitle in Sanity. Verified live on the HubSpot and GoHighLevel pages 2026-07-07. New toolkit pages follow the current pattern ("{Tool} for growing businesses | SYSBILT"), but the existing 24 need retitling in Sanity to match. This is the one place "small business" is still live on the site. A batch update of the Sanity `metaTitle` field for the toolkit items clears it.
- **Off-page and Domain Rating (open, tracked below).** On-page is resolved and guarded. Off-page is where the next real gains are. Baseline and the quarter list live in the section after this one.
- **GSC recovery: the call was wrong, corrected 2026-09-21.** We expected the indexed count to trend back up toward the full sitemap. It has not, and Google is not stalling, it is declining. **116 Discovered currently not indexed** plus **33 Crawled currently not indexed** is 149 of 224 URLs. The 116 lines up with the 96 book chapters and 8 hubs added to the sitemap on 9 Aug. The content is not thin (chapters run 1,416 words median in the deployed HTML). The domain has not earned the crawl budget for 224 URLs. This is an off-page symptom, not an on-page one, and **adding pages makes the number grow**. Do not treat it as a bug to fix on the site.

---

## Off-page and Domain Rating (tracked)

Ahrefs Domain Rating (DR) is a 0 to 100 score of followed unique referring domains. Extra links from the same domain do not raise it again. A page that dumps thousands of outbound links passes almost nothing. GBP, LinkedIn, Instagram, and most directories are nofollow: useful for people, useless for DR.

When a followed link from a new real domain lands, tick the item, note the domain, and leave the PBN row alone.

### Baseline (verified 2026-09-21, previous check 2026-09-10)

- **DR 0.** DataForSEO rank returned no score at all. For scale, the domains beating us on our own target keywords: `safetyculture.com` 543, `opcentral.com.au` 389, `thedigitalprojectmanager.com` 389, `trainual.com` 372, `scribe.com` 355.
- **11 backlinks from 11 referring domains** (was 9 and 9 on 10 Sep), first seen 3 Aug 2026. Every one is the same PBN pattern: casino and scraper domains, `/all/2799/33.html` style paths, ~3,000 outbound links per page, anchor text reading "Buy Backlinks Online Cheap". Auto-generated by spam networks scraping new domains, not bought. They do not move DR.
- DataForSEO **spam score 64 / 100** (was 63).
- **Legitimate referring domains: zero.** That is the number that matters and it has not moved.

### Do not

- Buy guest-post packs, "DA50 PBN" links, or anything that looks like those `/all/2799/33.html` pages.
- Mass-submit to junk directories.
- Disavow the existing PBN links to chase DR. Google's disavow tool does not change Ahrefs DR. Only open a disavow if Search Console shows a manual action.
- Treat GBP, LinkedIn, Instagram, or the Amazon capstone as DR work. Amazon is usually nofollow, and the capstone is sequenced later in `BOOK_SERIES_MASTER.md`. **This is a DR statement only.** Corrected 2026-09-21: it was being read as "GBP is not worth effort", which is wrong. The local 3-pack is a separate ranking system that ignores backlinks entirely, and it is currently our best route to leads. See `SEARCH_LANE_BRIEF.md`.
- Set DR 40+ as a near-term target. From 0, the useful target is **DR 10 to 20**.

### This quarter (in order)

- [ ] **Client site credits.** Ask existing clients, where the relationship already holds, for a quiet "Site by SYSBILT" followed link to `https://sysbilt.com` in the footer. Do not force it. Each live client site is a new referring domain. Note domains here as they go live:
  - none yet
- [ ] **Real directories, one profile each, then stop.** HubSpot Solutions Partner if we can get in. n8n Experts/Creators. Then at most one or two agency listings that still follow (Clutch, Sortlist).
  - HubSpot: not started
  - n8n: not started
  - Other: not started
- [ ] **One citable asset.** A toolkit page, a book diagram, or a short original Australia-only stat from data we already pull. Journalists and bloggers link to a number or a tool, not a service page. Asset URL: not chosen
- [ ] **Mentions with a URL, not just the name.** Australian ops and founder podcasts with followed show notes. Quote services (Connectively, SourceBottle). One SmartCompany / Dynamic Business style piece if there is a real story. The link should be `https://sysbilt.com`, preferably to the page they used.
  - none yet
- [ ] **90-day picture.** Eight to fifteen followed links from real sites (client credits, one partner directory, two podcasts, one press mention, one resource citation). Recheck DR. Date / score: not yet

This is a search-and-referrals play, not ads, which matches `BRAND_FACTS.md`.

---

## Do-not-resurface list (resolved, verified, closed)

These are fixed. Do not re-flag them from a stale file or a fresh-chat hunch. If one genuinely looks broken again on the live site, verify on the live raw HTML first, then treat it as a new regression with a date, not a reopening of the old issue.

- **Prerender middleware: removed.** The old prerender call (which only activated for bot user-agents and served a stale or empty shell) was stripped from `middleware.ts` and the `PRERENDER_TOKEN` deleted from Vercel. This was a root cause of crawlers seeing empty pages. Gone. Do not reintroduce a prerender step; stamp-meta replaced it.
- **Client-rendered empty shell to crawlers: fixed.** Crawlers now get a fully-stamped static head before the SPA rewrite, via stamp-meta. Fetching the apex returns a small SPA shell in the body but a complete, correct head, that's expected and correct, not a bug.
- **June indexation drop (roughly 74 to 52): root cause fixed.** It was Google clustering identical raw shells as duplicates in the window after prerender removal and before stamp-meta stabilised. The fix is deployed; recovery is a GSC monitoring item, not a code problem.
- **Canonicals: implemented.** Self-referential canonicals across core pages, pillars, blog posts, and guides, with `og:url` matched to the canonical. Verified live.
- **Build-time JSON-LD: implemented.** Stamped into the head per route class via tsx, parseable with no JavaScript. Verified live on the homepage (Organization, WebSite, ImageObject).
- **OG share image: fixed.** The real branded image now lives at `/images/og-sysbilt.png` (the earlier placeholder mix-up is resolved). Verified in the live OG tags.
- **robots.txt: correct.** Apex domain, `Allow: /`, `Disallow: /studio/`, sitemap pointer. Verified live. (The old wrong-domain version is long gone.)
- **`trailingSlash: false` 308 redirects: live** in `vercel.json`.
- **`useCdn: true`: set** on the Sanity client. The noindex-on-fetch-error bug for toolkit, guides, and blog is fixed.
- **Blog "DRAFT" label: fixed.** It was `formatDate` returning "DRAFT" when `publishedAt` was null on an otherwise-published post, not a real draft. Fixed by setting the date and making `publishedAt` required with a default in `post.ts`. Not a GROQ filter problem; the GROQ draft filter once suggested was wrong and not applied.
- **Blog inline image alt text: fixed.** `blockContent.ts` now has a required `alt` field and the Portable Text image serializer reads `value.alt`. (The guide schema `guideBlockContent.ts` always had it.)
- **Homepage meta, HubSpot form ID, contact-page voice:** all resolved during launch prep. Verified live. Do not re-flag from old snapshots.
- **Sitemap parity:** guarded by verify-seo. The count moves as content is added in Sanity; a changed count is normal, not drift.

## Stale artefacts to ignore (cosmetic only, not SEO-affecting)

These are dead files and leftovers with no SEO impact. Cleaning them is housekeeping, not a fix, and not urgent:

- The dead `postinstall` Chrome download (a leftover from the removed prerender path).
- Dead prerender files still sitting in the repo.
- `public/_redirects` (a Netlify artefact; the site is on Vercel).

Don't present any of these as an SEO problem. They don't affect indexing, meta, or structured data.

---

## What "good" looks like from the outside (the verification pass)

When a structured-data or meta change ships, the outside check is: pull the raw HTML on one URL per route class (homepage, a pillar, a blog post, a toolkit item, a book chapter) and confirm each carries a unique title, a self-referential canonical, the right OG set, and parseable JSON-LD of the correct type, all with zero JavaScript. Then Google's Rich Results test on a few URLs from the browser. If all of that holds, on-page is healthy and attention belongs on off-page.

---

## Personal YouTube (not this file)

Site SEO stays here. Felipe's YouTube is a different surface: `docs/internal/YOUTUBE_PERSONAL.md` and Channel Playbook §9.

Do not treat that channel as a Gemini channel, and do not fold its titles or descriptions into sysbilt.com meta. Gemini at work is the first **basic course** (a playlist on YouTube, exercises on `/learn/gemini`). The channel is the teaching brand. More basic courses follow (Claude, ChatGPT, other tools).

---

*End of SEO Master v1.2. When an SEO issue is genuinely fixed and verified, move it into the do-not-resurface list with a one-line description so it never gets re-litigated. When the keyword direction changes, change it here first. When a real followed referring domain lands, tick it in the off-page section above.*
