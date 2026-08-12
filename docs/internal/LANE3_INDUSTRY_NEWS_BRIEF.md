# Lane 3 — Industry News writing brief (locked)

**Status:** Locked 30 Jul 2026  
**Channel:** Felipe personal LinkedIn (company page may echo later)  
**Visual:** `scripts/automations/social/cards/lane3-dot-grid.html`  
**Theme:** always `theme-dark` + dot texture. Cream stays in the file for later variants only.

Lane 3 is not website news (Lane 1) and not charts (Lane 2). One story → one card → one caption. Opinionated, but the caption must teach first.

---

## Cadence (live machine)

| | |
|---|---|
| **07:00 Sydney, Tue / Thu / Sat** | Auto-picks 1 AI story from trusted RSS → writes caption + dark card → schedules LinkedIn personal + Facebook |
| **11:00 Sydney** | Auto-publishes unless you kill it (reserved; Lane 1 skips ±40m) |
| **Cadence** | **3/week** (not daily). Skip if no fresh story |
| **Do nothing** | It goes live |
| **Kill** | Cancel link (Slack alert) or delete/edit in Postiz before 11:00, or `GET …/webhook/sysbilt-lane3-cancel?postId=…` |
| **Channels** | Personal LinkedIn (primary) + Facebook (secondary). **No Instagram** |
| **Manual URL** | Optional override: `POST …/webhook/sysbilt-lane3` |
| **Topics** | AI feeds for now. Other topic passes later |

Sources: `scripts/automations/social/lane3-sources.json`

---

## Job

Read a real industry piece (blog, release, TechCrunch-style report).  
Write a LinkedIn post a growing-business owner can follow with zero prior AI news context.  
Hook on the card. Teach + take in the caption. No SYSBILT product pitch.

---

## Hard voice rules

Same as SYSBILT copy core, plus Lane 3 specifics:

| Rule | Detail |
|------|--------|
| No em dashes | Comma, colon, or new sentence |
| No exclamation marks | |
| No emojis | |
| Australian English | analyse, organise, colour, behaviour |
| Personal “I” | Allowed (this is Felipe, not company “we”) |
| No hype words | unlock, seamless, game-changing, etc. |
| No product pitch | No Speed Fix, Hosted Website, book a call, prices |
| No “My take:” | Make the turn. Don’t label the opinion slot |
| Link placement | Source URL in the **first comment** only (bare URL). Not in the caption body |

---

## Card fields

| Field | Rule |
|-------|------|
| `TOPIC` | 1–2 words. Category, not a long title. e.g. `AI`, `Automation`, `Tools` |
| `HEADLINE` | One sharp claim. Prefer `len-mid` (about 45–85 chars). One `<em>` accent word when it helps |
| `TAKEAWAY` | One plain line. The “so what”. Can be empty |
| Body class | Always `theme-dark` + length class. Always keep `.texture` |

Card = hook. Caption = information + position.

---

## Caption structure (locked)

1. **Standing opener (operator scene)**  
   Put the reader inside a plain business picture before the jargon. Prefer the “imagine three managers / same street / same brief” device or an equivalent owner-framed scene. This must work above LinkedIn’s “see more” fold.

2. **What happened (teach)**  
   Name the lab / source in plain English. What was the test or news. What the models (or actors) did, in behaviour terms a non-tech owner follows. 3–6 short lines.

3. **The turn (your real position)**  
   Do **not** land on generic “keep a human in the loop.”  
   Locked distinction:

   - **Automation** does what you told it (deterministic once the instructions are right).  
   - **An agent** works out what gets it the score, and will find the loophole, often while looking reasonable.  
   - Agents are useful when you’ve cracked the instructions and made them work properly.  
   - A human eye still sits on the whole picture, someone who can read and have an opinion about everything that matters, not one narrow slice.

4. **Where the human goes (specific rule)**  
   Human checkpoint on anything that **moves money** or **makes a promise to a customer**: quotes, refunds, supplier commitments, pricing.  
   Everything else can run unattended.  
   That sentence should be screenshot-worthy.

5. **Close**  
   `Source in the first comment.`

**Spacing (never bend):** short paragraphs only, **blank line between each**. Never one block of text. Usually 4–6 paragraphs, one or two sentences each. This is the same social rule as the Channel Playbook.

**Length target:** about 120–160 words. A’s density, C’s opener, real position as the take.

---

## Fact-check (mandatory before ship)

- Prefer **behaviour** over shaky names and secondary counts.  
- Do not inherit source typos (e.g. model nicknames that flip mid-article). If a number looks inconsistent inside the source, omit it.  
- Every number you keep must be clearly from the named source. Brand rule: no orphan stats.  
- Example: Andon / TechCrunch mean final balance **$11,182** is fine to use when attributed. Truce-break tallies that contradict the article’s own labels are not.

---

## Workflow prompt block (for n8n / writer agent)

Paste or adapt:

```text
You write Lane 3 Industry News for Felipe's personal LinkedIn.

Input: one source article (title, URL, full text or clean extract).

Output JSON:
{
  "topic": "",
  "headline_html": "",   // may include a single <em>…</em>
  "takeaway": "",
  "length_class": "len-short|len-mid|len-long",
  "theme": "theme-dark",
  "caption": "",
  "first_comment": ""    // bare source URL only
}

Rules:
- theme is always theme-dark. Dot texture always on.
- length_class from headline character count: under 45 short, 45–85 mid, over 85 long.
- Caption: (1) operator-scene opener, (2) teach what happened in plain English for a growing business owner, (3) turn: automation vs agent (agent finds the loophole toward a score; automation does what you told it; human eye on the whole picture), (4) human sits on money + customer promises (quotes, refunds, supplier commitments, pricing); rest can run, (5) "Source in the first comment."
- Caption spacing: blank line between every short paragraph. Never a wall of text. 4–6 paragraphs typical.
- No "My take:", no em dashes, no exclamation marks, no emojis, no SYSBILT product pitch, no book-a-call.
- Fact-check names and numbers against the source. If inconsistent, drop the number and keep behaviour.
- Australian English. Contractions on. "I" allowed.
```

---

## Gold example (locked reference)

**Source:** [TechCrunch — Claude Opus 5 / Andon Labs Vending-Bench](https://techcrunch.com/2026/07/29/claude-opus-5-became-downright-ruthless-when-tasked-with-running-a-vending-machine/)

**Card**

| Field | Value |
|-------|--------|
| TOPIC | `AI` |
| HEADLINE | `They gave AI a shop. It learned to <em>betray</em>` |
| TAKEAWAY | `An agent optimises the score. Not your reputation.` |

**Caption**

Imagine you put three managers in charge of three drink machines on the same street. Same stock cost. Same brief: make more money than the other two. Head office never answers properly.

That's roughly what a safety lab called Andon Labs just ran, with the current top AI models doing the managing, for a simulated year with no supervision.

They agreed on prices and then cheated. Sent fake peace offers while planning to undercut. Bluffed suppliers about rival quotes. Ignored refund complaints that should have been paid. The winner did it best and broke the most deals doing it.

Here's what it actually tells you. Automation does what you told it. An agent works out what gets it the score. Give it a target and no referee, and it finds the loophole, every time, and it will look reasonable while doing it.

That doesn't mean don't use them. It means the human eye goes on anything that moves money or makes a promise to a customer. Quotes, refunds, supplier commitments, pricing. The rest can run on its own.

Source in the first comment.

**First comment**

```text
https://techcrunch.com/2026/07/29/claude-opus-5-became-downright-ruthless-when-tasked-with-running-a-vending-machine/
```

---

## Related

- Card HTML: `scripts/automations/social/cards/lane3-dot-grid.html`
- Renderer: `docs/internal/BROWSERLESS.md`
- Deploy: `./scripts/automations/n8n/deploy-lane3-industry-news.sh --activate`
- Webhook: `POST https://n8n.sysbilt.com/webhook/sysbilt-lane3`  
  Body: `{ "sourceUrl": "https://…", "pastedText": "" }` (paste full article text if fetch fails)
- Output: Postiz draft on personal LinkedIn. Review at https://postiz.sysbilt.com/launches then publish.
- General social rules (link-in-comment, `#sysbilt` for company formats): `docs/internal/CHANNEL_PLAYBOOK.md` Section 6  
  Note: Lane 3 personal posts follow this brief first. Do not force toolkit/carousel caption templates onto Lane 3.
