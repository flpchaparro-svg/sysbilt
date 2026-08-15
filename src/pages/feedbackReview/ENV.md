# Feedback Review

## Sell door (`/go/feedback-review`)

Private funnel page, **$1,500**, distinct from Review Engine (`/go/reviews`).

Sample of the customer questions (nothing saved): `/r/sysbilt?sample=1`

After pay → `/go/thanks?p=feedback-review` → access wizard (same Google listing questions as Review Engine, tagged as Feedback Review in HubSpot).

**Outbound worksheet** (same sheet as Speed Fix / Quote Capture):

https://docs.google.com/spreadsheets/d/1aGz6kruGwSpt55rwlcknxVDXp9dgL_M-OnVJrDIbTlE

Tab: **Feedback Review**. Status `Wait` → `Ready` → Gmail **draft** with `/go/feedback-review?b=` → `Emailed`. Drafts only.

```bash
node scripts/automations/n8n/deploy-outbound-feedback-review-send.mjs --setup-tab --activate
node scripts/automations/n8n/deploy-outbound-manual-lane-router.mjs --activate
```

Master Leads **Manual Lane** = `Feedback Review` routes a lead onto that tab.

Stripe live Payment Link is wired (`src/constants/feedbackReviewStripe.ts`). Recreate only if the price changes:

```bash
node scripts/automations/stripe/create-feedback-review-live.mjs
```

---

# Dogfood wizard (`/r/sysbilt`) · env checklist


Add to repo-root `.env.local` (never commit):

```
# Sheet logger (n8n webhook → Google Sheet append)
FEEDBACK_REVIEW_SHEET_WEBHOOK_URL=https://n8n.sysbilt.com/webhook/sysbilt-feedback-review
FEEDBACK_REVIEW_SHEET_ID=

# Optional override for personalised Send links (default https://sysbilt.com)
FEEDBACK_REVIEW_PUBLIC_BASE=https://sysbilt.com

# Already used elsewhere
HUBSPOT_PRIVATE_APP_TOKEN=
SYSBILT_deepseek_api_key=
```

**Vercel Production and Preview must have:**

- `FEEDBACK_REVIEW_SHEET_WEBHOOK_URL` (same n8n webhook as above)
- `SYSBILT_deepseek_api_key`

Without those, live submits return the raw skeleton and skip the sheet. Local `.env.local` is not enough.
```

**One-time sheet + logger:**

```bash
node scripts/automations/n8n/deploy-feedback-review-logger.mjs --setup-sheet --activate
```

**Repair polluted Responses headers (one-time):**

```bash
node scripts/automations/n8n/deploy-feedback-review-logger.mjs --fix-sheet --activate
```

**Send tab + link builder + dropdowns:**

```bash
node scripts/automations/n8n/deploy-feedback-review-send.mjs --setup-tab --activate
node scripts/automations/n8n/deploy-feedback-review-send.mjs --setup-dropdowns
```

Sheet tabs: **Responses** (wizard finishes) · **Send** (personalised links).

## Three send modes

| Mode | How | Personalisation |
|---|---|---|
| **Generic** | `/r/sysbilt` or QR | None |
| **Personalised** | **Send** tab → Status `Ready` → Link + Gmail draft (`Drafted`) | Name / email / company / job on the link. They never type it. |
| **End of job** | Token from another workflow | Later |

### Send tab (personalised)

Columns: Contact Name, Email, Company, Job, Catalog, Status, Link, Notes, Updated, SMS

1. Add a row (Email required for matching)
2. Optional: Job (`websites`, `speed-fix`, …), Catalog (`products` when using product list)
3. Set **Status** = `Ready`
4. Wait ~5 min, or run **SYSBILT - Feedback Review Send Links** Manual / webhook
5. **Link** fills, a Gmail **draft** is created, **SMS** fills with a short text plus the live link, Status becomes `Drafted`
6. Open Gmail Drafts, review, then send yourself. Copy the SMS cell if you want to text them. Or copy the Link for later

Never auto-sends. End-of-job tokens stay later.

Example link shape:

`https://sysbilt.com/r/sysbilt?name=Sara&email=sara%40co.com.au&company=Acme&job=websites`

The wizard never asks for email. Link email matches HubSpot only if that contact already exists.

## Finish behaviour

1. Append a row to the responses sheet (via webhook)
2. If link email is present and HubSpot has that contact, attach a note (no new contacts)
3. Happy path (4–5 stars): DeepSeek polishes the skeleton and weaves in free-text from “Anything else”
4. Unhappy path: save only, no Google draft. Improve notes stay private.
