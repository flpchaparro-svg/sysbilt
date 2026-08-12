# Lane 1 — Website News (social + card)

**Status:** Locked 10 Aug 2026 (day-spread restore + first-comment link)  
**Channels:** Felipe personal LinkedIn + Facebook, same slot. **Company LinkedIn page via personal repost plug +2 hours (one post, shared).** No Instagram.  
**Visual:** `scripts/automations/social/cards/lane1-news-card.html` → Browserless **1200×630** into Sanity `mainImage`  
**Spine:** NEWS auto-publish (no email gate) → Social Distribute → Slack `#content`

Lane 1 is website news. **All stories go live on the site in the NEWS run.** Social is a separate drip so the personal feed stays roomy for other lanes.

---

## Website

| Rule | Detail |
|------|--------|
| Publish | Every story from the NEWS run goes live **immediately** |
| Retain | **14 days**, then cleared |
| Social | Does not wait on the site; site is not dripped |

---

## Shared personal feed (Sydney)

| Slot | Lane |
|------|------|
| **11:00 Tue / Thu / Sat** | Lane 3 industry (3/week) |
| **15:00 Mon / Wed** | Lane 2 charts (2/week) |
| **08:00 Mon–Fri** | Toolkit / blog carousels (existing runway) |
| **12:00 daily** | Lane 1 news social (one story per day) |

Lane 1 skips reserved L2/L3 windows (±40 min) if a slot would land on them.

---

## Social cadence

| Step | When |
|------|------|
| Sanity draft + site publish | NEWS run (all stories) |
| Social day 0 | **Today at 12:00 Sydney** if that hour is still ahead, else tomorrow 12:00 |
| Days 1–6 | One story per following calendar day at 12:00 |
| Story 8+ | All remaining on the **Sunday** in that 7-day window (20 min stagger), so Monday’s next NEWS batch starts clean |
| Copy | **Full** Sanity body (title + full `introText`). No truncation |
| Link | First comment only: `See more news → https://sysbilt.com/news` (not in the caption body) |
| Company LinkedIn | **Not a second Postiz post.** Personal LI uses Postiz repost plug → company page +2h |
| No repeat | Skips Sanity ids + source URLs already posted in the last **21 days** |
| Instagram | Never |

Slack in `#content`: title, phase, times, Sanity studio link, Postiz, kill link.

Kill: `GET …/webhook/sysbilt-lane1-cancel?postId=…&companyPostId=…`

Postiz: create as `schedule`, then **force-schedule** PUT so personal LinkedIn does not sit as Draft.

---

## Card injection

`body class = "{{PHASE}} {{LEN}} {{MOTIF}}"`

| Token | Source |
|-------|--------|
| PHASE | `phase1`/`horizon` → `phase-01`, `phase2` → `phase-02`, `phase3` → `phase-03` |
| LEN | plain title length: short &lt;35, mid 35–65, long 65–90 |
| MOTIF | pillar map (nodes / grid / bars) |
| TAG | short pillar label |
| HEADLINE | Sanity title with one `&lt;em&gt;` accent word |

---

## Ops

- Deploy social: `./scripts/automations/n8n/deploy-social-pipeline.sh`
- Patch NEWS live mode: `node scripts/automations/n8n/patch-news-lane1-asap.mjs`
- Test social: `POST https://n8n.sysbilt.com/webhook/sysbilt-social-test`

## Hard bans (do not re-invent)

- No same-day multi drip / 90-minute packing for Lane 1 news
- No 280-character caption cut
- No news URL in the post body (first comment only)
- No separate company LinkedIn Postiz post (use personal→page repost plug only)
