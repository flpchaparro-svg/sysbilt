# Zoho Invoice AU · Quote Capture Phase 4

Internal. Reader-facing copy still says “quote or invoice system.”

## What this folder is

Prove we can create an **editable Quote** in **SYSBILT’s** Zoho Invoice (AU).  
API name: **estimate**. UI name: **Quote**.

**Not** wired to `/demo/quote-capture`. Sandbox never writes to Zoho.

## One-time credential setup

1. Open [Zoho API Console (AU)](https://api-console.zoho.com.au/).
2. Add a **Self Client** (or Server-based app) for SYSBILT.
3. Generate a grant code with scopes:

```
ZohoInvoice.contacts.CREATE,ZohoInvoice.contacts.READ,ZohoInvoice.estimates.CREATE,ZohoInvoice.estimates.READ
```

4. Put client id/secret in `.env.local`:

```
ZOHO_INVOICE_CLIENT_ID=...
ZOHO_INVOICE_CLIENT_SECRET=...
ZOHO_INVOICE_ORG_ID=...
```

Org ID: Zoho Invoice → Settings → Organisation (or Organisation Profile).

5. Exchange the grant code:

```bash
node scripts/automations/zoho/exchange-grant-code.mjs <GRANT_CODE>
```

6. Paste `ZOHO_INVOICE_REFRESH_TOKEN=...` into `.env.local`. Never commit.

## Proof run

```bash
# Payload only
node scripts/automations/zoho/create-sample-quote.mjs --dry-run

# Create real Quote in SYSBILT Zoho Invoice
node scripts/automations/zoho/create-sample-quote.mjs
```

Open the printed link (or Quotes in `invoice.zoho.com.au`), edit a line, save.

## Phase 5 (later)

Per-client OAuth into **their** Zoho Invoice org, called from the live install engine. Do not run every client inside SYSBILT Zoho.

$100 add-on when they have no tool: see `docs/internal/QUOTE_CAPTURE_ZOHO_SETUP_100.md`.
