# Blog index (`/blog`) — Copy

Scroll order as on `pages/BlogPage.tsx`. **Post titles, dates, excerpts, images, and case-study names** come from Sanity and are not listed here. Everything below is fixed UI or template chrome.

**Document title (browser tab):** Insights & Strategy | Sysbilt  

---

## Hero

Insights & Strategy_  

Perspectives, case studies, and architectural blueprints for scaling your revenue engine.  

Find your article  

Search field: placeholder cycles through typed phrases (when empty and not focused):  

- Automate onboarding.  
- Integrate HubSpot.  
- AI sales agents.  
- Frictionless funnels.  
- Scale B2B revenue.  

Adjacent control: search icon button (no text label).  

Right column (md+): `HeroVisualBrutalist` illustration only — no copy.  

`RobotPeek` (fixed decorative SVG): no readable text.  

---

## Pillar filters

Row of toggle buttons (`FILTER_OPTIONS`). First option, then each pillar subtitle from `getAllPillars()` / `constants/systemPillars.ts` in service order:  

ALL  
Websites & E-commerce  
CRM & Lead Tracking  
Automation  
AI Assistants  
Content Systems  
Team Training  
Dashboards & Reporting  

---

## Loading state

DECRYPTING FILE...  

---

## Priority Intelligence (featured grid)

Shown only when there are featured posts. Section heading:  

Priority Intelligence  

**Featured card template labels** (content beside these is from CMS):  

**Lead card (first slot)**  
- Image corner badge: LEAD DOSSIER  
- Meta line: `//` + service pillar name, or `STRATEGY` if missing  
- Date: formatted `en-AU` as `DD.MM.YYYY`, or `DRAFT` if no date  
- Excerpt fallback: Explore this architectural blueprint and case study to understand the systemic implementation.  
- Footer: ACCESS FILE  

**Tall cards**  
- Date (same rules)  
- Excerpt fallback: Access the blueprint.  
- Footer: VIEW →  

**Half-width cards**  
- Date  
- Footer: READ BRIEFING →  

---

## Proof bridge (latest case study)

Shown when a case study exists. Link target: `/proof`.  

VERIFIED DEPLOYMENT  

`{clientName}` · `{clientIndustry}` / `{pillarFocus}` (Sanity)  

View Hard Data  

---

## System Ledger

System Ledger  

`{N}` RECORDS FOUND (count matches filtered list)  

**Column headers**  
Date · Pillar · Title · Action  

**Row template**  
- Date (same rules as featured)  
- Pillar badge text: `servicePillar` from CMS, or **GENERAL** if missing  
- Title from CMS  
- Hover-only control: ACCESS →  

**Empty filter / search**  
No insights match this filter.  

**Pagination**  
Load More Blueprints ↓  

---

## Newsletter (`NewsletterForm` at bottom)

Join the **Private List**  

Identify your operational phase. We route the exact blueprints required to scale your specific bottlenecks. No generic advice.  

Corporate Email  
Placeholder: Enter your address...  

Current Phase  
Select placeholder: Select your phase...  
Options:  
- The Builder (Getting Clients)  
- The Scaler (Scaling Operations)  
- The Controller (Maximising Margin)  

Submit: Request Access  
Loading: Processing...  

Success: Access Granted. Transmission initiated.  

Error: Transmission failed. Please verify your details.  

---

## Site chrome (shared)

Header, footer, and primary nav labels are the same as on other marketing routes (see `components/GlobalHeader.tsx`, `components/GlobalFooter.tsx`). Footer includes **System Logs** linking to this blog index.
