# News (`/news`) — Copy

`pages/NewsPage.tsx`. Article titles, bodies, dates, images, and `sourceUrl` come from Sanity (`newsItem`). Fixed UI strings below.

**Browser tab:** News | SYSBILT  

The **NewsletterForm** block matches the blog index — see [blog.md](./blog.md) (Newsletter section).

---

## Loading

Loading articles...  

---

## Hero

H1: Industry news and updates  

Sub: What's changing in tech and business, and what it means for you  

---

## Forecast (single item, `revenuePhase === 'horizon'`)

Section label: This month's forecast  

Card eyebrow: FORECAST  

Title / preview: CMS  

Card footer: Read more →  

---

## Filter bar (sticky)

| Filter id | Button label |
|-----------|----------------|
| all | View All |
| phase1 | Getting More Clients |
| phase2 | Building Your Business |
| phase3 | Managing Your Business |

The `all` key also holds unused `title` / `description` in code (not rendered).

---

## Phase sections

Shown when **View All** or that phase is selected. If there are no items, the section still shows its header and: **No articles in this section yet**

**Phase 1**  
- Title: Getting more clients  
- Description: News and updates about websites, CRM, and lead generation  
- Card footer: Read more →  

**Phase 2**  
- Title: Scaling your operations  
- Description: News and updates about AI, content, and team training  
- Card footer: Read more →  

**Phase 3**  
- Title: Seeing your numbers clearly  
- Description: News and updates about dashboards, reporting, and data  
- Card footer: Read more →  

---

## Article drawer

**Close:** X icon only (no text).  

**Tags:** One chip only: `#{servicePillar}` with spaces removed from the pillar name (no `#INTEL_FEED`, `#INTEGRATION`, `#SYSTEMS`). If there is no pillar, no tag row (or omit chip).  

**Footer**  
- If `sourceUrl`: View original source ↗  
- Close article ↑  

---

## In-drawer CTA

**Headline** by `servicePillar`:

| Pillar | Headline |
|--------|----------|
| Websites & E-commerce | Want to fix your website |
| CRM & Lead Tracking | Want to fix your lead tracking |
| Automation | Want to automate this |
| AI Assistants | Want AI to handle this |
| Content Systems | Want to fix your content |
| Team Training | Want your team to actually use this |
| Dashboards & Reporting | Want to see your real numbers |
| Missing / other | Want to talk about this |

**Body (all):** Book a call and we'll walk you through what this means for your business  

**Primary button:** See `{servicePillar}` — or **See how we help** if no pillar (links to pillar page or `/system` for default).  

**Secondary:** Let's talk ↓ → `/contact`  

---

## Related

Blog index: [blog.md](./blog.md)  
