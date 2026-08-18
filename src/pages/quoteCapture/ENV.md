# Quote Capture live · env checklist (Phase 5)

Add to repo-root `.env.local` (never commit):

```
# Already used for Phase 4 Zoho proof
ZOHO_INVOICE_CLIENT_ID=
ZOHO_INVOICE_CLIENT_SECRET=
ZOHO_INVOICE_REFRESH_TOKEN=
ZOHO_INVOICE_ORG_ID=

# Stripe Test mode (job Checkout Sessions)
Stripe_Secret_key=sk_test_…

# Visitor email
RESEND_API_KEY=
QUOTE_CAPTURE_FROM_EMAIL=Quote Capture <onboarding@resend.dev>
# Proof installs also email this inbox (Resend test mode only delivers here until a domain is verified)
QUOTE_CAPTURE_PROOF_INBOX=felipe@sysbilt.com

# AI Concierge (sandbox Phase 6 + live /q)
GEMINI_API_KEY=

# Visitor + owner SMS (ClickSend shared pool, leave From blank)
CLICKSEND_USERNAME=
CLICKSEND_API_KEY=

# Owner alerts (optional extras; HubSpot/Slack already used elsewhere)
HUBSPOT_PRIVATE_APP_TOKEN=
SLACK_ACCESS_WEBHOOK_URL=
PUBLIC_BASE_URL=http://localhost:3333
```

**ClickSend SMS test:**  
1. Dashboard send to your mobile first, From blank (shared pool).  
2. On `/q/proof-landscapes`, use that mobile in Your details.  
3. Complete a quote to **See my quotation**. SMS should land (or the page shows a clear skip reason).  
AU mobiles like `04xx xxx xxx` are normalised to `+61…`.  
New ClickSend accounts may hold messages that contain a URL until they approve link sending. If the quote SMS is skipped for that reason, the email still has the pay link.

**One-suburb Serp → Quote Capture test:**  
1. **Run Queue** tab: new row → Niche `Landscapers` → Suburb e.g. `Marrickville` → Status `Queued` (leave Queue Key blank).  
2. Wait for List Builder (about 10 min schedule, or run the List Builder workflow once in n8n). Status goes `Running` → `Done`; **Rows Added** shows count.  
3. Check **Master Leads** for new landscapers in that suburb.  
4. Set **Manual Lane** = `Quote Capture` on a lead (or paste the row onto **Quote Capture**).  
5. On **Quote Capture**: Industry `Landscaping`, Status `Ready` → Gmail **Drafts** get Email A within ~5 min.  
6. Track done suburbs via Run Queue Status=`Done` (and Suburb dropdown on both tabs).

Proof URL: `/q/proof-landscapes`  
Embed: `/embed/q/proof-landscapes`

**Resend test mode:** only delivers to the Resend account email (`felipe@sysbilt.com`). Gmail visitors will skip until you verify a domain. Proof installs also send a copy to `QUOTE_CAPTURE_PROOF_INBOX`.
