# News / Business Intelligence (`/news`) — Copy

`pages/NewsPage.tsx`. Article titles, bodies, dates, images, and `sourceUrl` come from Sanity (`newsItem`). Fixed UI strings below.

The bottom **NewsletterForm** block uses the same copy as on the blog index — see [blog.md](./blog.md) (Newsletter section).

---

## Loading

Syncing Intelligence Feed...  

---

## Header

H1: Business Intelligence.  

Sub: Market updates and technology forecasts translated into plain English, built for Australian business owners.  

---

## Horizon feature (one item with `revenuePhase === 'horizon'`)

Section label: The Monthly Horizon  

Eyebrow on card: Future Forecast  

Card title / preview: from CMS  

Footer hint: Read Forecast →  

---

## Filter bar (sticky)

Buttons use `sectionContent[filter].label`:

| Filter id | Button label |
|-----------|----------------|
| all | View All |
| phase1 | Getting More Clients |
| phase2 | Building Your Business |
| phase3 | Managing Your Business |

**Note:** The `all` entry in code also stores title `All Business Intelligence` and description `Complete feed of intelligence briefings.` — those two are **not** shown in the UI (only the **View All** button label is used).

---

## Phase sections (grids of cards)

When **View All** or a matching phase is selected, each phase block shows:

**Phase 1**  
- Section title: Growing Your Business  
- Description: News and updates to help you get more leads and customers.  
- Card link line: Read Report →  

**Phase 2**  
- Section title: Growing Your Operations  
- Description: Updates on how to handle more work, more efficiently.  
- Card link line: Read Report →  

**Phase 3**  
- Section title: Monitoring Your Business  
- Description: Insights for a clearer view of your numbers and progress.  
- Card link line: Read Report →  

*(Section titles above are the `title` field in `sectionContent` for `phase1`–`phase3`; the filter button labels differ slightly from these titles — that matches the code.)*

---

## Article drawer (expanded item)

**Close (top left):** icon only (`X`), no text label.  

**Hotspot tags** (under image):  
- `#INTEL_FEED`  
- `#PILLAR_{SERVICEPILLAR}` (derived from `servicePillar`, uppercased, spaces → `_`, `&` removed) — only if pillar set  
- `#INTEGRATION`  
- `#SYSTEMS`  

**Footer row**  
- If `sourceUrl`: **View Original Source** ↗  
- **Close Article** ↑  

---

## In-drawer CTA block (`CTA` component)

Lead line (from `pillarCTAMap` by `servicePillar`, else default):

| `servicePillar` | Headline (`actionText`) |
|-----------------|-------------------------|
| Websites & E-commerce | Fix your online visibility. |
| CRM & Lead Tracking | Ready to fix your lead flow? |
| Automation | Fix your operational bottlenecks. |
| AI Assistants | Ready to fix your admin burden? |
| Dashboards & Reporting | Fix your data fog. |
| *(missing or other)* | Ready to get unstuck? |

Body (same for all): What does this change mean for your bottom line? No guess work required. Discuss your current tools with a systems architect.  

Primary button: Explore `{servicePillar}` or **Explore Capabilities** if no pillar  

Secondary link: Let's Talk ↓ → `/contact`  

---

## Related

Blog index: [blog.md](./blog.md)  
