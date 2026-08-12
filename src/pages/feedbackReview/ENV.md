# Feedback Review (`/r/sysbilt`) · env checklist

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

**One-time sheet + logger:**

```bash
node scripts/automations/n8n/deploy-feedback-review-logger.mjs --setup-sheet --activate
```

**Send tab + link builder:**

```bash
node scripts/automations/n8n/deploy-feedback-review-send.mjs --setup-tab --activate
```

Sheet: use `FEEDBACK_REVIEW_SHEET_ID` from deploy-state / `.env.local`.

## Three send modes

| Mode | How | Personalisation |
|---|---|---|
| **Generic** | `/r/sysbilt` or QR | None |
| **Personalised** | **Send** tab → Status `Ready` → Link fills | Name / email / company / job on the link. They never type it. |
| **End of job** | Token from another workflow | Later |

### Send tab (personalised)

Columns: Contact Name, Email, Company, Job, Catalog, Status, Link, Notes, Updated

1. Add a row (Email required for matching)
2. Optional: Job (`websites`, `speed-fix`, …), Catalog (`products` when using product list)
3. Set **Status** = `Ready`
4. Wait ~5 min, or run **SYSBILT - Feedback Review Send Links** Manual / webhook
5. **Link** fills, Status becomes `Linked`
6. Copy the link into your email / SMS

Example link shape:

`https://sysbilt.com/r/sysbilt?name=Sara&email=sara%40co.com.au&company=Acme&job=websites`

The wizard never asks for email. Link email matches HubSpot only if that contact already exists.

## Finish behaviour

1. Append a row to the responses sheet (via webhook)
2. If link email is present and HubSpot has that contact, attach a note (no new contacts)
3. Happy path (4–5 stars): DeepSeek polishes the skeleton and weaves in free-text from “Anything else”
4. Unhappy path: save only, no Google draft. Improve notes stay private.
