# Quote Capture · outbound Phase 7

Internal. Same sheet as other product lanes. Drafts only until a human sends.

**Sheet:** `OUTBOUND_LEADS_SHEET_ID` (live `1aGz6kruGwSpt55rwlcknxVDXp9dgL_M-OnVJrDIbTlE`)  
**Tab:** `Quote Capture`  
**Status:** `Wait` → `Ready` → `Emailed` (Email A). For Email B: set Status to `Ready B` after A, then back to `Emailed`. Sheet data validation dropdowns: Industry (F), Contact Form (G), Status (H). Re-apply with `deploy-outbound-quote-capture-send.mjs --setup-tab`.  
**Route in:** Master Leads **Manual Lane** = `Quote Capture`  
**Demo link:** `https://sysbilt.com/demo/quote-capture?trade={slug}&name={Business}`

## Industry dropdown (most → least likely)

Use these exact labels in the **Industry** column (sheet data validation).

1. Landscaping  
2. Fencing  
3. Retaining walls  
4. Paving  
5. Concreting  
6. Tree services  
7. Pool builders  
8. Roofing  
9. Painting  
10. Electrical  
11. Plumbing  
12. HVAC  
13. Cleaning  
14. Pest control  
15. Removals  
16. Other trade  

Week 1 focus: Landscaping, Fencing, Retaining walls, Paving, Concreting, Tree services.

**Trade URL slugs:** landscaping, fencing, retaining-walls, paving, concreting, tree-services, pools, roofing, painting, electrical, plumbing, hvac, cleaning, pest-control, removals

## Week 1 suburbs (dropdown)

Same list on **Quote Capture** Suburb and **Run Queue** Suburb. Flip Run Queue Status to `Done` after a scrape so you can see which suburbs are finished.

Start with: Marrickville, Newtown, Stanmore, Dulwich Hill, Leichhardt, Balmain, Rozelle, Annandale, Petersham, Summer Hill.

## How to test one suburb (Serp)

1. **Run Queue:** Niche = `Landscapers`, Suburb = one from the dropdown, Status = `Queued`. Leave Queue Key blank.  
2. List Builder picks it up (schedule ~10 min, or run the workflow once).  
3. When Status = `Done`, check **Master Leads**.  
4. Route into **Quote Capture** (Manual Lane = `Quote Capture`, or paste the row).  
5. Quote Capture Status = `Ready` → Gmail Draft Email A.

## Contact Form column

Manual mark (same spirit as CRM Form):

| Value | Meaning |
|---|---|
| `silent` / `yes` | Form tested or known dead / no reply |
| `none` / `skip` | Not a form-silence lead |
| empty | Not checked |

Phase 7 routes mainly via **Manual Lane**. Contact Form is a signal column for your eye and Notes.

## Tab headers

`Business Name, Suburb, Website, Email, Phone, Industry, Contact Form, Status, Maps ID, Notes`

## Email A (first draft)

**Subject:** `{Business}: stop wasting time on quotations`

**Body shape (HTML in n8n):**

Hi {FirstName},  
*(or `Hi,` if no name)*

I'm Felipe from SYSBILT. I was looking at the contact page on your site, and how quote requests land.

On a lot of landscaping sites, the form just takes a message. The buyer waits. You chase later, put a quotation together, spend time on it, and they never come back.

Quote Capture is a short question flow on your site. It turns that ask into a clear quotation on screen, with email, SMS, and a pay link, on your rates. The visitor does most of the admin work in the flow. You get notified so you can follow up if you want. Even if you don't chase hard, the pay link is already in their hands.

You can try a sample landscaping version here (sample prices, not yours):  
[Try a sample quote](https://sysbilt.com/demo/quote-capture?trade=&name=)

This is built for your brand, with options like photos of your work if you want them.

Worth a look for {Business}?

Felipe  
SYSBILT

If you'd rather not hear from us again, reply "no thanks" and that's the end of it.

## Email B (follow-up · Status = Ready B)

**Subject:** `{Business}: one more on the quote form`

Hi {FirstName},  
*(or `Hi,` if no name)*

Did you get a chance to try the sample quote flow for your potential clients?

If you want the full picture, benefits, pricing, and another go at the flow, it's here:  
[See Quote Capture](https://sysbilt.com/go/quote-capture)

If the timing is wrong, reply "no thanks" and we'll stop.

Felipe  
SYSBILT

## Deploy

```bash
node scripts/automations/n8n/deploy-outbound-quote-capture-send.mjs --setup-tab
node scripts/automations/n8n/deploy-outbound-quote-capture-send.mjs
# after Felipe OKs copy:
node scripts/automations/n8n/deploy-outbound-quote-capture-send.mjs --activate

# Manual Lane must include Quote Capture (redeploy router):
node scripts/automations/n8n/deploy-outbound-manual-lane-router.mjs --activate
```
