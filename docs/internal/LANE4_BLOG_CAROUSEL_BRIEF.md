# Lane 4 — Blog carousels (locked)

**Status:** Locked 31 Jul 2026  
**Job:** Turn a published Sanity blog `post` into a LinkedIn document carousel that drives traffic to `sysbilt.com/blog/[slug]`.  
**Visual:** `scripts/automations/social/cards/lane4-blog-carousel.html` → Browserless **1080×1350**  
**Font:** Oswald (display) + Inter (body). Locked.

Lane 4 is the only lane whose job is **site traffic**. Lanes 1–3 build audience. This one converts.

---

## Where it sits

| Lane | Name | Notes |
|------|------|--------|
| 1 | Website news | Neutral newsroom. No Instagram. |
| 2 | Charts | Sourced data. No Instagram. |
| 3 | Industry news | AI commentary. No Instagram. |
| **4** | **Blog carousels** | **This brief. Instagram mirror on.** |
| — | Adoption | Parked. Do not build. |

---

## Cadence (ceiling, not target)

| | |
|---|---|
| **Volume** | Up to **2/week** |
| **Channels** | Personal LinkedIn (primary) + company page echo + **Instagram mirror** + Facebook echo |
| **Format** | LinkedIn document carousel via Postiz (`post_as_images_carousel: true`) |
| **Spacing** | Respect the shared personal-feed calendar (avoid L2 Mon/Wed 15:00 and L3 Tue/Thu/Sat 11:00) |
| **Tags** | `lane-4` only. **Do not** add `no-ig-mirror` (mirror must fire) |

Suggested slots once the machine is live: e.g. Thu 17:00 and Sun 10:00 Sydney (adjust if the global gap rule tightens).

---

## Rendering

- HTML tokens → Browserless PNG per frame (same Mini stack as Lanes 1–3).
- Upload PNGs to Postiz in order. Set `post_as_images_carousel: true` + `carousel_name`.
- **Do not** assemble a PDF yourself. Postiz builds the LinkedIn document from the images.
- Frame count **4–9**. Only include frames the article supports. Hook + CTA always. Page markers use real `TOTAL`.

### Themes

`theme-dark` | `theme-cream` | `theme-red` | `theme-gold`  
Frame 1 always `theme-dark`. Do not repeat the same theme on consecutive frames.  
Readable accents only: gold-on-dark `#D4A84B`, red-on-dark `#FF6B6B`, crimson `#9A1730` on cream.

### Footer chrome

- **SYSBILT** wordmark + `sysbilt.com` on every frame.
- **No** personal byline.

### CTA

Last frame button = full article URL (`sysbilt.com/blog/[slug]`), never the homepage. Same URL in the LinkedIn first comment.

---

## Copy rules

- Teach first. No SYSBILT pitch in mid-deck body copy (footer wordmark is fine).
- Australian English. No em dashes, exclamation marks, emojis, semicolons. Contractions on. No banned hype. No “small business” as a label.
- Stats only from the article, with `SOURCE` on the stat frame. No figure → no stat frame.
- Captions need approval polish, but structure is locked:

**Personal LinkedIn**  
Pain/teach caption → “Link is in the comments” → `#sysbilt` + 3–5 lowercase tags.  
First comment: one short tip, then bare `sysbilt.com/blog/[slug]`.

**Company / Instagram**  
Shorter, more visual. **Link in bio** (no first-comment URL pattern on IG).

---

## Selection and recycling

- Source: Sanity `_type == "post"`.
- Start with **manual slug** (`POST` webhook). Auto-queue later.
No repost logic needed soon: Postiz already has Lane 4-style carousels queued through **September**. When that runway ends, recycle with a **3-month** minimum gap. Date changes for existing carousels happen in **Postiz only** until the Lane 4 machine exists.

Editable frame JSON between generate and render so a rejected deck can be fixed without regenerating copy. Path for tests: `scripts/automations/social/lane4/`.

---

## Approval

Same shape as Lanes 2–3: schedule → Slack `#content` with slug, frame count, Postiz, kill → do nothing and it goes. Confirm document posts once with a live draft test.

---

## Reuse from Lanes 1–3

Browserless Mini, Postiz upload/`/posts`, Slack kill, DeepSeek for **copy only**, voice rules. Rebuild: HTML fill for N frames, Sanity blog fetch, carousel settings, dual caption packs (LI vs IG).

---

## Test deck

Example filled JSON (real Sanity post, no invented stats):  
`scripts/automations/social/lane4/test-5-manual-processes.json`

Reference live caption style (already in Postiz, leave as-is):  
`what-kpis-should-5m-business-track-weekly`
