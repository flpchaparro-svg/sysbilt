# Quote Capture · $100 basic quote-platform setup

Internal checklist. Use only when a paid Quote Capture client has **no** quote or invoice tool.

Price: **$100** locked add-on (see Pricing Master). Org stands in **their** name. Do not park clients inside SYSBILT Zoho by default.

Reader-facing copy: “quote or invoice system.” Say Zoho only in handover when that is what we installed.

---

## When to use

| Situation | Action |
|---|---|
| They already have Zoho Invoice (or similar) | Connect **theirs** at handover (Phase 5). No $100. |
| They have nothing | Run this checklist. Charge $100. |
| They want SYSBILT to operate quotes ongoing | Retainer (Care / Ops). Not free ops. |

---

## Checklist

### Before kickoff

- [ ] Confirm access wizard answer was `need-setup` (or equivalent) and $100 is on the deal.
- [ ] Confirm ABN / legal name for the Zoho org (must be **their** business).
- [ ] Confirm who will own the Zoho login (owner email, not SYSBILT).

### Open the account (their name)

- [ ] Sign up Zoho Invoice AU (`invoice.zoho.com.au`) with **their** business email.
- [ ] Organisation name = their trading / legal name.
- [ ] Set currency AUD, timezone Australia, tax (GST) per their accountant advice.
- [ ] Add Felipe (or SYSBILT tech) as a temporary admin only if needed for connect; remove after handover if they prefer.

### Minimum product setup

- [ ] Enable **Quotes** (Estimates) module.
- [ ] Confirm lifecycle is understood: Quote → Sent → Accept → Invoice (tax invoice). Reject if they decline.
- [ ] Add a sample customer (can delete later).
- [ ] Do **not** load the full rate card into Items yet unless the rate-card call is done. Items / rates come from the locked card after that call.

### Connect to Quote Capture (after Phase 5 engine exists)

- [ ] Create API Self Client / OAuth for **their** org (AU).
- [ ] Store refresh token + org id in the client install secrets (never in git).
- [ ] Smoke-test: one sample quote from their live wizard lands editable under Quotes.
- [ ] Owner can edit a line and save.
- [ ] Owner can convert an accepted quote to a tax invoice.

### Handover

- [ ] Walk the owner through: open Quote, edit, resend, accept → Invoice.
- [ ] Confirm they own the Zoho login and billing for Zoho (if any).
- [ ] Note in HubSpot: “$100 quote platform setup done · Zoho Invoice AU · org [name].”
- [ ] Remove SYSBILT admin access if agreed.

---

## Out of scope for $100

- Full catalogue / rate-card build (that is the main Quote Capture job).
- Ongoing quote editing for them (retainer).
- Migrating years of old invoices.
- Custom Zoho Books accounting setup beyond quotes/invoices basics.

---

## Related

- Product rules: `docs/internal/QUOTE_CAPTURE_BRIEF.md`
- Phase 4 API proof (SYSBILT org only): `scripts/automations/zoho/`
