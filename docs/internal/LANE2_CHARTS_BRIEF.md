# Lane 2 — Charts writing brief (locked)

**Status:** Locked 31 Jul 2026 (freshness: current year or ≤6 months + Browserless cards)  
**Channel:** Felipe personal LinkedIn (primary) + Facebook echo. No Instagram.  
**Visual:** HTML chart templates → Browserless  
**Size:** **1080×1080** square  
**Templates:** `scripts/automations/social/cards/lane2/` (`01`…`07`)  
**Bank:** `scripts/automations/social/lane2-topics.json`

Lane 2 is not website news (Lane 1) and not industry opinion cards (Lane 3). One sourced chart → one image → one caption.

---

## Job

The **chart does the what**. The **caption does the arithmetic**.  
If a number is visible on the card, do not restate it unless you are doing something to it.

No SYSBILT product pitch.

---

## Caption formula (locked)

1. **The relationship, not the headline.** Open with what is behind the number: the gap, the ratio, who owns what. The big figure is already on the card.  
2. **One derived number.** Something the reader cannot see and would not work out. Use only banked `derived` lines. Never invent maths.  
3. **The caveat.** What the number does not mean, or who reads it wrong. This is where trust comes from.  
4. **Your position,** tied back to a growing business.  
5. End with exactly: `Source in the first comment.`

**Spacing:** short paragraphs, blank line between each. Usually 4–6. About 100–160 words. Personal “I” allowed sparingly. Write like a person who read the study, not a dashboard.

### Hard bans

- No listing the bars / segments the image already shows  
- No “that is not a typo”  
- No “the real battle is X”  
- No “My take:”  
- No “who still owns” / “still the winner” / present-tense market leadership on a stale study  
- No em dashes, exclamation marks, emojis, prices, book-a-call  
- No “small business/es” or “small teams”

---

## Cadence (live machine)

| | |
|---|---|
| **08:00 Sydney, Mon / Wed** | Pick 1 unused topic → fill HTML → Browserless → schedule LI + FB (**2/week**) |
| **15:00 Sydney** | Auto-publish unless cancelled (reserved; Lane 1 skips ±40m on Mon/Wed) |
| **No unused topic** | Skip |
| **Manual** | `POST …/webhook/sysbilt-lane2` `{ "topicId": "…" }` |
| **Kill** | `GET …/webhook/sysbilt-lane2-cancel?postId=…` |

---

## Sources (standardise here)

Prefer recurring publishers. Card footer uses exact `sourceLine` from the bank (never append a year if the line already has one).

### Freshness (hard)

A topic may auto-pick only if `active !== false` **and**:

- `sourceYear` is the **current calendar year**, **or**
- `sourceAsOf` (ISO date) is within **`cadence.maxAgeMonths`** (default **6**)

Stale study cards stay in the bank with `active: false` and `inactiveReason` until numbers are refreshed. Do not caption old figures as live winners.

| Source id | Publisher | Cadence | Use for |
|-----------|-----------|---------|---------|
| `datareportal-digital` | DataReportal | Annual Digital Overview + monthly country packs | Social reach, internet users |
| `statcounter-platform` | Statcounter | Monthly | Mobile / desktop / browser / search share |
| `sparktoro-datos-zeroclick` | SparkToro / Datos | Periodic studies | Zero-click search |
| `mckinsey-state-of-ai` | McKinsey State of AI | Annual | Gen AI at work |
| `brightlocal-reviews` | BrightLocal | Annual | Review trust |
| `okta-businesses-at-work` | Okta | Annual | SaaS stack sprawl |
| `litmus-state-of-email` | Litmus | Annual | Email ROI benchmarks |
| `gartner-crm` | Gartner | Periodic | CRM vendor share |
| `sysbilt-operator` | SYSBILT | Illustrative only | Pattern cards, must say so |

Full registry lives under `sources` in `lane2-topics.json`.

---

## Templates

| Id | Use |
|----|-----|
| `01-bars` | Ranking. Exactly 5 rows |
| `02-columns` | Same, vertical |
| `03-line` | Trend. 4–8 points |
| `04-share-bar` | Share of whole. 5 segments = 100 |
| `05-share-pie` | One slice dominates. 5 = 100 |
| `06-comparison` | Left vs right. 5 rows |
| `07-stat` | One giant figure |

Tone: `tone-problem` | `tone-gain` | `tone-neutral`  
Fonts: Inter + Lora, `display=swap`

---

## Bank fields the writer must honour

Per topic: `relationship`, `derived[]`, `caveat`, `position`, `sourceLine`, `sourceUrl`, `sourceYear`, `sourceAsOf`, `softClaim`, optional `active` / `inactiveReason`.

If `softClaim` is true, soften with around / roughly / surveys put it near. Name the source period when it is not “this month.”

---

## Parking lot

- Lane 3 cream / volume refresh  
- Lane 3 automation packs  
- Flexible row counts beyond 5  
- Auto-pull latest DataReportal / Statcounter numbers into the bank  
- Reactivate CRM / zero-click / reviews once 2025–2026 study cuts are banked  
