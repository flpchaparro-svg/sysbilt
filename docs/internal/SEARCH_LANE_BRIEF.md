# SYSBILT — Search lane brief

**Version 1.1 | 21 September 2026 | Internal only. Where search demand actually sits in Australia, which doors we open to meet it, and how the Google Business Profile earns leads without domain authority.**

Read this with `SEO_MASTER.md`. That file owns the technical state and the off-page list. This file owns the demand question: what people type, what we sell, and which of the two actually meet.

`BRAND_FACTS.md` still wins all contradictions. Nothing here changes the brand, the audience, or the "small business" ban.

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

This is the part that works without domain authority, and it is why it leads.

The local 3-pack is a separate ranking system from organic. It weighs proximity to the searcher, primary category, service relevance and review signal. It does not care about backlinks. A brand-new listing can hold position one, and in this category it currently does.

### What the Sydney packs look like (verified 21 September 2026)

| Query | Pack holders | Their review counts |
|---|---|---|
| ai agency sydney | AI Sydney, AI Consulting Group, AI Digital Solutions | 1 review at 3.0, 15 reviews, 1 review |
| ai automation agency sydney | Ential, Advnz AI Automation, A.I. automation | 4 reviews, 1 review, none |
| web design sydney | Small Business Web Designs, Designpluz, Spark Interact | 130, 112, 81 reviews at 4.9 to 5.0 |

Six AI listings hold 22 reviews between them. The highest single count is 15. Next door, the web design pack needs a hundred.

**Note what "AI Sydney" proves.** It holds position one for `ai agency sydney` on a 3.0 rating from a single review. It wins on name and category match, not reputation. Reviews are necessary here, not sufficient. The category and service configuration on the listing matter at least as much.

### Review target

- **4** is where we are. Already mid-pack.
- **10** clears five of the six listings. Two weeks of asking.
- **20 at 4.8 or better** makes us the clear review leader in the category with margin. This is the target.

Stop at twenty for now. A new company jumping to forty in a month is the velocity pattern that gets a listing filtered, and we do not need it to win this pack.

**Coach the ask.** A review that names the work carries relevance weight that a generic one does not. "Felipe set up an AI assistant that answers our enquiries" beats "great service, highly recommended". Same effort from the client, much better signal. Build that prompt into the Feedback Review send rather than asking for a rating alone.

### Profile configuration

**The Business Profile API is not approved.** Verified 25 August 2026: the Cloud project `SYSBILT n8n` completes OAuth but the locations list returns empty, which is Google's unapproved-access behaviour. Nothing in the repo calls the Business Profile API. All profile work below is manual in the GBP interface until access lands.

Three things to set, in order of impact:

1. **Primary category.** The single biggest relevance lever and it costs nothing. Open the category picker and choose the closest match to the AI lane. Google has been adding AI-related categories, so check the current list rather than assuming. If no AI category exists, the pack holders sit under software and consulting categories. Set one primary and add the rest as secondary.
2. **Services.** Add each service under its search name: AI assistant setup, AI phone answering, business automation, CRM setup, website design, Google Business Profile management, local SEO. The services list feeds relevance directly.
3. **Description.** Paste this, then keep weekly Sell Updates:

   We set up AI assistants and AI consulting for growing Australian companies in Sydney. Phone answering, website chat, CRM, automation, websites, and Google Business Profile work, built so the pieces connect. You can buy one piece now or the system over time.

Keep the weekly Sell Updates running. That cadence is already working and should not be interrupted.

Paste-ready services (one line each): AI assistant setup. AI phone answering. Business automation. CRM setup. Website design. Google Business Profile management. Local SEO.

---

## The doors to build

Small, surgical, no new content wave.

| Door | Page | Target language | Status |
|---|---|---|---|
| AI lane | `/pillar4` | AI assistants and AI consulting for growing Australian companies, Sydney | Code shipped 21 Sep 2026. Meta and opening rewritten. Confirm on the next deploy. |
| Search lane | `/go/local-pack`, `/go/onpage-search`, `/go/google-profile` | Local listing / Maps, on-page search, Google Business Profile management | Code and Sanity titles shipped 21 Sep 2026. Pages stay noindex. Confirm on the next deploy. |
| Ops lane | `/pillar2` | CRM setup, job and field service systems | Later, lower priority |

The AI door goes first. It has the most demand, the weakest competition and the product is already built.

---

## Measurement

There is currently no way to tell whether any of this works until the next deploy is live and Felipe marks the new events as key events in GA4. Code now fires `generate_lead` and `form_submit` after a successful contact form, Sybil contact form, and `/go` access wizard save. Unknown URLs are set to return HTTP 404 from `dist/404.html` instead of the homepage. Local `npm run build` (stamp-meta + verify-seo) passed 21 Sep 2026. Live `curl` of a fake path was still HTTP 200 with homepage HTML until deploy. Confirm both on the live site after deploy.

**The metric for this quarter is review count and tracked enquiries, not position and not impressions.** Position is already fixed. Impressions are falling for good reasons. Neither of them pays.

---

## Sequence

1. Measurement: form submit events (code shipped, mark as GA4 key events after deploy), real 404s (code shipped, confirm live).
2. Profile: primary category, services, description. Manual, same afternoon. Paste-ready copy is in the profile section above.
3. Reviews: 4 to 10 in two weeks, 10 to 20 over the quarter. Feedback Review drafts now name the work. Send `/r/sysbilt` to recent clients.
4. AI door: `/pillar4` meta and opening rewrite. Code shipped 21 Sep 2026.
5. Search door: meta pass on `/go/google-profile`, `/go/local-pack`, `/go/onpage-search`. Code and Sanity shipped 21 Sep 2026.
6. Off-page: keep working the quarter list in `SEO_MASTER.md`. It is still the only thing that lifts domain rank.

---

*End of Search lane brief v1.1. When a volume figure is rechecked, update the table and the date. When a door ships, mark it. When the review count moves, note it in the local pack section.*
