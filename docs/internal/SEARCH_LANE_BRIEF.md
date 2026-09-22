# SYSBILT — Search lane brief

**Version 1.2 | 22 September 2026 | Internal only. Where search demand actually sits in Australia, which doors we open to meet it, and how we earn leads without domain authority.**

Read this with `SEO_MASTER.md`. That file owns the technical state and the off-page list. This file owns the demand question: what people type, what we sell, and which of the two actually meet.

`BRAND_FACTS.md` still wins all contradictions. Nothing here changes the brand, the audience, or the "small business" ban.

---

## Shipped and verified (22 September 2026)

Checked against the live site, GA4, and the live Sydney SERPs. Not checked against a claim in a commit message.

| Item | State |
|---|---|
| Real 404s on unknown URLs | Done. `404` + `noindex, follow` + no canonical + "Page not found \| SYSBILT" |
| `/evidence-vault` out of the sitemap | Done. Still `308`s to `/proof`, which is correct, it is just no longer advertised |
| Titles over 60 characters | Done. 22 to 0, and `verify-seo.mjs` now fails the build over 60 |
| Sitemap health | 223 URLs, all `200`, every canonical self-referencing, exactly one `h1` each, nothing noindexed inside it |
| `generate_lead` / `form_submit` events | Firing. Wired to `/contact`, Sybil, funnel access, and the website wizard |
| GA4 key events | **Not done.** The events fire, `keyEvents` still reads 0. Nothing is counted as a conversion |
| Google profile description | Done. The new AI and profile language is live in the knowledge panel |
| Google reviews | 4 to **5, rating 5.0** |
| `/pillar4` title and meta | Done. 46-character title, 141-character description, both in search language |
| `/pillar4` H1 | Done. Now reads "AI assistants and consulting for growing companies", and `verify-seo` fails the build if any pillar `h1` stops matching its copy constant |
| Hidden keyword headings | Done. All 60 `sr-only` plus `aria-hidden` pairs removed and guarded. The homepage `h1` is a variant the guard cannot see and is still open |
| The three `/go` search pages | Copy rewritten, but **no search value**. `/go/*` is `noindex` at the edge and absent from the sitemap by design. See the corrected door list below |
| Monthly monitor | Done. `npm run seo:check`, scheduled on the 1st, posts to Slack through n8n. See `SEO_MASTER.md` |

One thing still loose: seven guide-hub meta descriptions run 170 to 205 characters, which Google truncates. The monitor reports them every month.

---

## Two corrections to version 1.0

### Reviews were not the blocker

Version 1.0 said reviews were the whole lever. The live packs say otherwise. SYSBILT now has 5 reviews at 5.0 and appears in neither AI pack:

| Pack | Holders and review counts | SYSBILT |
|---|---|---|
| ai agency sydney | 1 at 3.0, 15 at 5.0, 1 at 5.0 | 5 at 5.0, not in the pack |
| ai consultant sydney | 15 at 5.0, 3 at 5.0, 1 at 5.0 | 5 at 5.0, not in the pack |

We already beat two of the three holders in each pack on review count. **Every holder has "AI" in the business name.** AI Sydney, AI Consulting Group, AI Digital Solutions, Ai Consultancy, AI Consultants Australia. Business name match is doing the work, and we are not renaming the company.

So: keep asking for reviews, because they close deals and they matter for every other pack. Stop treating the count as the thing standing between us and `ai agency sydney`.

### The primary category is actively wrong

The profile reads **Computer consultant**. That places us in the `computer consultant sydney` pack against itGenius (609 reviews, 15 years), Kaine Mathrick Tech (110 reviews) and Computer One (20 years). Unwinnable, and it does nothing for any AI query. Changing it is free and it is the highest-value profile action left.

---

## Why this exists

On-page SEO has been resolved and guarded since August. Average position improved from 57 to 15 across the quarter and clicks moved from zero a week to two a week. The repair worked.

It did not produce business, and the reason was never technical. Two numbers explain it:

- `sysbilt.com` has **no domain rank at all**. The only 11 backlinks are PBN spam.
- The biggest content bet, `standard operating procedure software`, gets **90 searches a month in Australia** and its first page is Scribe, Trainual, SafetyCulture and Reddit under an AI Overview.

We had never volume-checked the keyword direction. When we did, the demand turned out to be real and close by, just described in words the site does not use.

---

## The demand study (DataForSEO, Google Ads, Australia, September 2026)

Twelve-month average volume. Google groups close variants, so near-duplicate phrases return identical figures. Read each line on its own, do not add them up.

### The AI lane

| Keyword | AU / month | Competition | What we already sell |
|---|---:|---|---|
| ai agency | 6,600 | Medium | AI assistants, Site AI Chat, Team AI |
| ai consultant | 1,000 | Medium | AI assistants, SOP to AI Playbook |
| ai for business | 720 | Medium | AI assistants, Team AI |
| ai automation agency | 390 | Medium | Automation, AI Phone Setup |
| chatgpt for business | 390 | Low | Team AI training |

### The search and profile lane

| Keyword | AU / month | Competition | What we already sell |
|---|---:|---|---|
| seo agency | 4,400 | Low | On-Page Search Pack, Local Pack |
| seo services | 3,600 | Low | On-Page Search Pack |
| seo sydney | 2,900 | Medium | On-Page Search Pack, Local Pack |
| seo agency sydney | 1,300 | Medium | On-Page Search Pack |
| local seo | 880 | Low | Local Pack, Profile Posting |
| local seo sydney | 390 | Low | Local Pack |
| google business profile management | 170 | Low | Google Profile Fix, Profile Posting |

### The web lane (real volume, hardest pack)

| Keyword | AU / month | Competition |
|---|---:|---|
| digital marketing agency | 4,400 | Medium |
| website design sydney | 2,400 | Medium |
| website designer near me | 1,600 | Medium |
| digital marketing agency sydney | 1,000 | Medium |
| marketing agency sydney | 880 | High |
| ecommerce website design | 590 | Medium |
| website maintenance | 480 | Medium |

### The operations lane

| Keyword | AU / month | Competition | What we already sell |
|---|---:|---|---|
| field service software | 720 | Low | CRM and lead tracking |
| job management software | 390 | Medium | CRM and lead tracking |
| online booking system | 390 | Medium | Booking System |
| systems integrator | 390 | Low | The system |
| crm software australia | 260 | Medium | CRM and lead tracking |
| quoting software | 260 | Medium | Quote Capture, Quote Follow-Up |
| power bi consultant | 210 | Medium | Dashboards and reporting |
| it consultant sydney | 210 | Medium | The system |
| crm consultant | 90 | Low | CRM Rescue |

### Terms with no measurable Australian demand

These returned nothing. The positioning assumed they existed.

`business automation sydney`, `automation agency sydney`, `n8n consultant`, `make.com consultant`, `sop software australia`.

Nobody searches for "business systems" or "business automation Sydney". They search for an AI agency, an SEO agency or a web designer, then describe the systems problem on the call. That is the whole finding.

---

## The decision

**Keep the brand. Add doors in the language people search.**

SYSBILT stays a system architecture and automation firm for growing Australian companies. Connection-sight stays the differentiator. Nothing in `BRAND_FACTS.md` changes.

What changes is that the service pages stop being the only entry and start being findable. A person searching `ai consultant sydney` should land on our AI assistants page, recognise it as the thing they searched for, and then meet the system pitch underneath.

This is a naming change on the doors, not a repositioning.

### Do not

- Reopen "small business" as a keyword target. It is retired in `BRAND_FACTS.md` and that stands regardless of volume.
- Chase `web design sydney`. The volume is real and the pack is held by firms with 81 to 130 reviews after a decade. Wrong fight.
- Claim to be something we are not. We do not sell software and we do not white-label. "AI agency" is a search phrase we can honestly meet, not a new identity.
- Publish a new content wave. 149 URLs are already waiting to be indexed.

---

## The local pack play

**Read the corrections above first.** This section was written believing reviews were the lever. They are not, for the AI packs specifically. What stands is everything about category and services.

The local 3-pack is a separate ranking system from organic. It weighs proximity to the searcher, primary category, service relevance, business name match and review signal. It does not care about backlinks. A brand-new listing can hold position one, and in this category it currently does.

### What the Sydney packs look like (verified 21 September 2026)

| Query | Pack holders | Their review counts |
|---|---|---|
| ai agency sydney | AI Sydney, AI Consulting Group, AI Digital Solutions | 1 review at 3.0, 15 reviews, 1 review |
| ai automation agency sydney | Ential, Advnz AI Automation, A.I. automation | 4 reviews, 1 review, none |
| web design sydney | Small Business Web Designs, Designpluz, Spark Interact | 130, 112, 81 reviews at 4.9 to 5.0 |

Six AI listings hold 22 reviews between them. The highest single count is 15. Next door, the web design pack needs a hundred.

**Note what "AI Sydney" proves.** It holds position one for `ai agency sydney` on a 3.0 rating from a single review. It wins on name and category match, not reputation. Reviews are necessary here, not sufficient. The category and service configuration on the listing matter at least as much.

### Review target

- **5 at 5.0** is where we are (22 Sep). Already ahead of two of the three holders in both AI packs.
- **10** is still worth having. It clears five of the six AI listings and it is the floor for every other pack we might enter.
- **20 at 4.8 or better** stays the quarter target.

Stop at twenty for now. A new company jumping to forty in a month is the velocity pattern that gets a listing filtered.

Reviews are no longer the blocking item. Treat them as background work that keeps running, not the thing the lane waits on.

**Coach the ask.** A review that names the work carries relevance weight that a generic one does not. "Felipe set up an AI assistant that answers our enquiries" beats "great service, highly recommended". Same effort from the client, much better signal. Build that prompt into the Feedback Review send rather than asking for a rating alone.

### Profile configuration

**The Business Profile API is not approved.** Verified 25 August 2026: the Cloud project `SYSBILT n8n` completes OAuth but the locations list returns empty, which is Google's unapproved-access behaviour. Nothing in the repo calls the Business Profile API. All profile work below is manual in the GBP interface until access lands.

Three things to set, in order of impact:

1. **Primary category. Open, and now the top priority.** It currently reads **Computer consultant**, which is the MSP and IT-support pack: itGenius on 609 reviews, Kaine Mathrick on 110, Computer One at 20 years old. Wrong room, and it does nothing for any AI query. Search the category picker for artificial intelligence, automation, software, and business consulting, then set the closest honest match as primary and move the rest to secondary. Google keeps adding categories, so read the live list rather than trusting this note.
2. **Services. Open.** Add each service under its search name: AI assistant setup, AI phone answering, business automation, CRM setup, website design, Google Business Profile management, local SEO. The services list feeds relevance directly, and since the business-name match is off the table, category and services are the only pack levers we control.
3. **Description. Done 22 Sep**, live in the knowledge panel. Kept here for reference:

   We set up AI assistants and AI consulting for growing Australian companies in Sydney. Phone answering, website chat, CRM, automation, websites, and Google Business Profile work, built so the pieces connect. You can buy one piece now or the system over time.

Keep the weekly Sell Updates running. That cadence is already working and should not be interrupted.

Paste-ready services (one line each): AI assistant setup. AI phone answering. Business automation. CRM setup. Website design. Google Business Profile management. Local SEO.

---

## The AI organic SERP is winnable at zero authority

This is the most useful thing the 22 September recheck found, and it changes the priority order.

Version 1.0 assumed DR 0 locked us out of organic. That is true of `standard operating procedure software`, where page one is SafetyCulture (rank 543) and Trainual (372). It is **not** true of the Sydney AI terms. Live domain ranks against live page-one positions:

| Domain | Rank | Where it sits |
|---|---:|---|
| sydneyaiagency.com | **0** | #2 organic, `ai agency sydney` (6,600 a month) |
| aiconsultantsaustralia.com | **0** | local pack #3, `ai consultant sydney` |
| aidigital.solutions | 83 | local pack #3, `ai agency sydney` |
| lightningventures.com.au | 88 | #7 organic via `/ai-agency/sydney/` |
| absolutelyai.com.au | 139 | #10 organic via a buyer's-guide post |
| ailabaustralia.com | 143 | #1 organic |
| sysbilt.com | **0** | nowhere |

A domain with no measurable backlinks holds position two for a 6,600-a-month keyword. Two of the seven are exact-match domains, which we cannot copy, but `lightningventures.com.au` and `absolutelyai.com.au` are not: they rank on a single dedicated page each, from rank 88 and 139.

So the read flips. **The organic AI page is a better bet than the AI local pack**, because the pack is decided by a business name we will not change, while the organic result is decided by a page we can write. Both packs also sit under an AI Overview with a Reddit thread on page one, which is where an honest Australian buyer's guide gets cited.

---

## The doors to build

Small, surgical, no new content wave.

| Door | Page | Target language | Status |
|---|---|---|---|
| AI lane, meta | `/pillar4` | AI assistants and AI consulting for growing Australian companies, Sydney | **Done**, live and verified 22 Sep. 46-char title, 141-char description, body opening in search language |
| AI lane, H1 | `/pillar4` | Same | **Open.** The rewritten `pillar4Copy.hero.headline` is dead code. The `h1` is hardcoded in `Pillar4.tsx` and still reads "Stop answering the same questions over and over" |
| Search lane | `/go/local-pack`, `/go/onpage-search`, `/go/google-profile` | Local listing / Maps, on-page search, Google Business Profile management | Copy shipped 21 Sep. **Zero search value**: `/go/*` is noindex at the edge and out of the sitemap by design. Good for conversion, not a door. A real search door needs a public indexable page |
| Ops lane | `/pillar2` | CRM setup, job and field service systems | Later, lower priority |

The AI door goes first. It has the most demand, the competition is beatable at our authority, and the product is already built.

**The `/go` pages are not doors.** `routePolicy.ts` classifies every `/go/*` path as `noindex-shell` and the middleware sets `X-Robots-Tag: noindex, follow` at the edge. That is deliberate and it should stay: the funnel is for people we send there, not for Google. Any indexable search door has to be a public page, which means a pillar page or a new public service page. Do not "fix" the `/go` noindex to chase rankings.

---

## Measurement

Verified live 22 Sep: unknown URLs return a real `404` from `dist/404.html`, and `generate_lead` plus `form_submit` are arriving in GA4 from `/contact`, the Sybil form, the `/go` access wizard, and the website wizard.

**One step is missing and it makes the rest meaningless.** GA4 still reports `keyEvents` as 0 for both events, so nothing is counted as a conversion. In GA4, Admin, Events, toggle **Mark as key event** on `generate_lead`. Thirty seconds, not retroactive, so do it before anything else in the sequence.

**The metric for this quarter is tracked enquiries, not position and not impressions.** Position is already fixed. Impressions are falling for good reasons. Neither of them pays. Review count stays on the board but it is background work now, not the blocker.

---

## Sequence

1. **GA4 key events.** Mark `generate_lead` as a key event. Nothing else is measurable until this is on. Felipe only, thirty seconds.
2. **Profile category and services.** Move off Computer consultant, add the seven services. Manual, one afternoon, highest-value profile action left. Felipe only, the API is not approved.
3. **The AI organic page.** A dedicated page targeting `ai agency sydney` and `ai consulting sydney`, written as an honest Australian buyer's guide rather than a service pitch. Evidence says this ranks at our authority. Biggest single upside left in the lane.
4. **Reviews.** 5 to 10, then 20 over the quarter. Background work, do not gate anything on it.
5. **Off-page.** Keep working the quarter list in `SEO_MASTER.md`. Still the only thing that lifts domain rank.
6. **Tidy-ups.** The seven long guide-hub meta descriptions, and the homepage `h1` decision.

Done 22 Sep: the `/pillar4` H1, all 60 hidden keyword headings, and the monthly monitor.

### Next check

**Late October 2026.** Earlier than that and there is nothing to read: the 404 and title work shipped on 21 and 22 September, and Google needs several weeks of recrawl before the GSC indexing buckets move.

What to pull, and what would count as it working:

| Reading | Now (22 Sep) | Working looks like |
|---|---|---|
| GA4 key events | 0 configured | `generate_lead` marked, a real count of tracked enquiries |
| GSC "Duplicate without user-selected canonical" | 11 | trending to 0, those URLs move to "Not found (404)" |
| GSC "Discovered currently not indexed" | 116 | flat or down, not up. It grows if we publish |
| Google reviews | 5 at 5.0 | 10 or better |
| Profile primary category | Computer consultant | anything in the AI or automation family |
| Legitimate referring domains | 0 | 1 or more |
| `ai agency sydney` position | not ranking | in the top 50 at all, once the page exists |

---

*End of Search lane brief v1.2. When a volume figure is rechecked, update the table and the date. When a door ships, mark it. When the review count moves, note it in the local pack section.*
