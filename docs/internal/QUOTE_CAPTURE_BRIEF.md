# Quote Capture — product brief (locked)

**Status:** Locked 4 Aug 2026 (design conversation). Ready for build.  
**Slug (planned):** `/go/quote-capture`  
**Sandbox (planned):** `/demo/quote-capture` (noindex), landscaping first  
**Master:** see `SYSBILT_Services_and_Pricing_Master.md` (Quote Capture entry)

Internal only. Reader-facing copy lives on `/go` when built. Prices below are for quotes, invoices, and the private `/go` catalogue (approved funnel exception).

---

## One-line

A service business with a dead contact form gets a wizard (and optional AI chat) that turns job questions into a real quotation on screen, PDF, email and SMS, with a payment link, while the owner gets a priced lead they can call and close.

---

## Why it sells

- Quoting is hard when the buyer does not know what they need.
- Blank contact forms lose impatient buyers, especially from paid ads.
- Trades and similar services hate monthly software. One payment, they own it.
- Solves the money problem on the page, not "we'll email you a ballpark later."

---

## Pricing (AUD, once, excl. GST unless stated on invoice)

| Offer | Price | Notes |
|---|---|---|
| **Quote Capture** | **$2,800** locked | Full loop in the box |
| **AI Concierge** add-on | **$600** locked | Same rate card, chat path |
| **Basic quote platform setup** (Zoho or equivalent) | **$100** add-on | Only if they have no quote tool |
| **Care / operate-for-them** | Retainer (Care or Ops rung) | Required if SYSBILT runs quotes ongoing |
| Promo | Optional first 3 installs at a lower number | Decide at launch; then list price |

**SYSBILT sell path (sandbox → `/go`):** buyer pays **100%** for Quote Capture (same prestige flow as other `/go` doors).

**On the client's live site (their customers paying them):** default **100%** pay now. Optional per-client rule: 50% deposit above a dollar threshold they set at the rate-card call.

---

## What is in the box ($2,800)

1. 30-minute rate-card call (their real prices and rules).
2. Question wizard for their services (only what is on the agreed rate card / site).
3. Locked rate card + maths (sqm, metres, hours × rate, etc.). AI never invents a price.
4. On-screen quotation at the end of the flow + PDF download/print.
5. Visitor email + SMS with quote and payment link.
6. Owner email alert with full job detail, quote, visitor contacts, payment link (SMS to owner if they want it wired).
7. Quote created in **their** Zoho (or equivalent) when connected, so they can edit and resend.
8. Stripe payment link on the quote (full pay default).
9. Clear disclaimer: automatic quote may be subject to change for site conditions.
10. Embed on their existing site (one line / standard platforms).
11. Self-serve rate sheet edits for price values; new services / new logic = small fixed fee.
12. 14 days aftercare + handover manual.

**Not in the box:** SYSBILT operating their quotes forever (that is retainer). Endless new services not on the kickoff rate card.

---

## AI Concierge ($600)

- Same locked rate card and fields as the wizard.
- Chat qualifies and explains; maps answers onto the card.
- Never calculates, discounts, or promises inventively.
- Out-of-catalogue asks: soft no (see below).
- Wizard always available; chat is the premium path / help layer.

---

## Out-of-scope behaviour (non-negotiable)

| Situation | Behaviour |
|---|---|
| Job is not their business / not on rate card | Soft no on page. What they do + call/email. **No PDF, no SMS, no owner alert.** |
| Mixed basket | Quote priced lines. Flag unpriced extras for phone / add later. |
| Maths-heavy but on-card | Formula from rates. Accuracy is the product. |

Build scope = what is visible on their site / agreed at kickoff. Extra catalogue work is charged separately. Write that into the client agreement.

---

## Three flows (do not mix)

| Flow | Who | Goes into Zoho Invoice? | Money |
|---|---|---|---|
| **Sandbox** `/demo/quote-capture` | Prospect tasting the product | **No.** On-screen sample quote only | They may buy **Quote Capture** ($2,800) |
| **SYSBILT `/go`** | Same prospect paying us | **No** job quote. Access wizard only | $2,800 (+ optional AI / $100 setup) |
| **Client live site** | Their customers | **Yes.** Editable Quote in **their** Zoho Invoice (AU Quotes) | Pay link for **their** job |

Sandbox finish does **not** create a Zoho quote. Buying from the demo CTA is buying our product, not paying for sample lawn metres.

**Live Zoho Invoice lifecycle (locked):** Quote (API: estimate) → sent → accept → convert to tax Invoice. Owner edits the Quote first when numbers need to change. Owner converts when the quote is accepted as-is.

---

## Zoho / quote platform

Product for the live path: **Zoho Invoice (AU)** Quotes module (`invoice.zoho.com.au`). Reader-facing copy still says “quote or invoice system.”

| Situation | Default |
|---|---|
| They have Zoho Invoice (or similar) | Connect **theirs**. Per-client connect in Phase 5. |
| They have nothing | **$100 add-on:** basic Zoho Invoice (or equivalent) for quotes/invoices, in their name. See `QUOTE_CAPTURE_ZOHO_SETUP_100.md`. |
| They want SYSBILT to run it ongoing | **Retainer only.** Not free ops. |

Do not default to running every client inside SYSBILT's Zoho.

**Phase 4 proof:** one manual script run creates an editable Quote in **SYSBILT’s** Zoho Invoice from sample landscaping lines. Not wired to the sandbox. Proof tooling: `scripts/automations/zoho/`. Setup checklist for the $100 add-on: `QUOTE_CAPTURE_ZOHO_SETUP_100.md`.

**Phase 5 live path (proof install):** **OK 8 Aug 2026.** `/q/proof-landscapes` and embed `/embed/q/proof-landscapes`. Soft no for out-of-catalogue. On **See my quotation**, submit rebuilds the total server-side, creates Zoho Quote (SYSBILT org for proof), Stripe Checkout (full pay), visitor email (Resend) + SMS (Twilio), owner HubSpot note + Slack. Pay only opens the Checkout URL already returned. Local `npm run dev` serves `POST /api/quote-capture/submit` via Vite middleware. SMS may skip on Twilio trial until the recipient is verified. Per-client Zoho OAuth and Stripe Connect stay for the first real client handover. Sandbox `/demo/quote-capture` stays fake.

**Phase 6 AI Concierge (sandbox-first, live port):** **OK 9 Aug 2026.** `/demo/quote-capture` entry choice: **Start the sample** (wizard) or **Talk it through** (Concierge). During the wizard, persistent **Ask about this** dock with wizard selection context. Server: `POST /api/quote-capture/concierge` (Gemini) constrained to the landscaping rate card. Explains concepts and helps choose, never invents prices. Soft no for out-of-catalogue. Clear simulated-business labelling on sandbox. **Live** `/q/proof-landscapes` (and embed) uses the same Concierge with `mode: live` and client business name.

**Phase 7 outbound:** **OK 9 Aug 2026 (machine live; Email A/B copy refreshed 12 Aug 2026).** Tab **Quote Capture** on the live outbound sheet. Manual Lane → Wait → Ready → Gmail draft Email A (demo link `?trade=&name=`). Email B via Status `Ready B` → `/go/quote-capture`. Industry dropdown + Email A/B copy: `QUOTE_CAPTURE_OUTBOUND.md`. Deploy: `deploy-outbound-quote-capture-send.mjs` (+ Manual Lane router). Phase 8 list build needs SerpAPI free searches.

Embed snippet:

```html
<iframe
  src="https://sysbilt.com/embed/q/proof-landscapes"
  title="Get a quote"
  style="width:100%;min-height:900px;border:0;"
></iframe>
```

---

## Sandbox (sales weapon)

- Route: `/demo/quote-capture` (noindex), like `/go` family.
- Industry v1: **landscaping** (sample rates clearly labelled).
- Personalisation: `?trade=landscaping&name=Business` for cold email.
- Full feel: questions → fake quote on screen → PDF feel.
- No real trade-customer payment for the fake job.
- After sample quote: CTA to buy **Quote Capture** from SYSBILT (full payment) + notify Felipe (Slack/SMS).
- Never collect real end-customer data into production pipelines from the demo.
- Never create a Zoho Quote from a sandbox run.

---

## Sell journey (SYSBILT)

1. Cold email with personalised sandbox link.
2. They feel Quote Capture.
3. `/go/quote-capture` landing (same six-beat sales copy standard as strong `/go` pages).
4. Pay → access wizard (platform, rate-card readiness, optional rate pack drop, alerts, quote system, AI add-on).
5. Felipe calls: congratulate, book rate-card call (always).
6. Build → install → live test → handover manual.
7. Optional: basic quote-platform $100 add-on, AI $600, Care retainer if they want us operating.

---

## Outbound

- Reuse existing outbound machine.
- **New sheet tab** for Quote Capture ICP.
- Signal: service business that quotes for a living + blank contact form (ads landing on that form = bonus).
- Dropdown rank of industries most → least likely.
- Week 1 focus: landscaping / outdoor construction cluster; expand after replies.

---

## Build order (phased, do not skip ahead)

We finish each phase and get Felipe's OK before starting the next. Full detail stays in this brief.

| Phase | What | Done when |
|---|---|---|
| **0** | Brief + Pricing Master entry | Committed |
| **1** | Landscaping sandbox `/demo/quote-capture` (weapon) | Felipe happy with the feel |
| **2** | `/go/quote-capture` sales page + Stripe $2,800 | Felipe happy with sell page |
| **3** | Access wizard after pay (platform, rate card, pack, alerts, quote system, AI) | Wizard feels right |
| **4** | Zoho Invoice Quotes API path + $100 setup checklist | Editable Quote appears in SYSBILT Zoho Invoice (manual proof) |
| **5** | Live install engine (embed, Stripe full-pay, email+SMS, soft no, Zoho) | First proof path at `/q/proof-landscapes` works end-to-end |
| **6** | AI Concierge add-on | Chat on same rate card |
| **7** | Outbound Google Sheet tab + Email A/B with demo links | Tab live in the machine |
| **8** | First outbound batch (landscaping cluster) | Sends going |

---

## Guardrails

- Locked rate card is absolute (wizard and AI).
- Soft no for out-of-catalogue: no spam to owner.
- Sandbox sample rates labelled; no production lead pollution.
- Privacy / Spam Act hygiene on SMS and email.
- Named client proof only with permission; anonymised proof until then.
- `/go` prices allowed on funnel pages only; public marketing pages stay price-free per Brand Facts.

---

*End of brief. Change only when Felipe locks a new decision.*
