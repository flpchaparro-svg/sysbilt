# SYSBILT repository map

**Purpose:** Architectural reference for `src/components`, `src/pages`, and `api/` — surface classification, integrations, payloads, and environment variables.

**Surface legend (strict modes used in this doc):**

| Mode | Meaning |
|------|--------|
| **Cream** | Primary marketing / editorial surface: `bg-cream`, dark ink, gold-on-cream readable accents. Aligns with `DESIGN_GUIDELINES.md` default page background and document shells (`bg-cream`, `text-dark`). |
| **Dark / Brutalist** | High-contrast dark UI: `bg-dark`, cream/white text, brutalist borders (`border-dark`, heavy shadows), blog-style dark reading surfaces, audit report shell, modals over dim backdrop. |
| **Mixed** | Page-level composition with explicit split (e.g. cream column + dark column). |
| **Chromatic-agnostic** | Primitive adapts via props / parent context (`theme`, `isDarkBg`); default usage on the marketing site is noted. |
| **N/A** | Non-visual (SEO JSON-LD, hooks-only, token strings, or headless `PageMeta`). |

---

## 1. `src/components` (catalog + surface)

| Path | Surface |
|------|---------|
| `Architect/VideoHUD.tsx` | Dark / Brutalist (overlay / scanline HUD on media) |
| `agreement/AgreementConfirmation.tsx` | Cream (document success shell) |
| `agreement/AgreementCover.tsx` | Cream (document cover pattern) |
| `agreement/AgreementRenderer.tsx` | Cream (body typography on cream) |
| `agreement/AgreementSignBlock.tsx` | Cream |
| `agreement/ClauseRail.tsx` | Cream |
| `audit/ActionPlan.tsx` | Dark / Brutalist |
| `audit/AppendixSection.tsx` | Dark / Brutalist |
| `audit/AuditHeroHeader.tsx` | Dark / Brutalist |
| `audit/AuditScrollReveal.tsx` | Chromatic-agnostic (wrapper; used on dark report) |
| `audit/auditCardStyles.ts` | N/A (Tailwind token strings) |
| `audit/CompareCard.tsx` | Dark / Brutalist |
| `audit/CompetitorStrip.tsx` | Dark / Brutalist |
| `audit/CTABlock.tsx` | Dark / Brutalist |
| `audit/DeepAuditReportDashboard.tsx` | Dark / Brutalist |
| `audit/DiagnosisCard.tsx` | Dark / Brutalist |
| `audit/FooterBlock.tsx` | Dark / Brutalist |
| `audit/IntroParagraph.tsx` | Dark / Brutalist |
| `audit/KeywordGrid.tsx` | Dark / Brutalist |
| `audit/metricHelpers.ts` | N/A (pure functions) |
| `audit/MetricTile.tsx` | Dark / Brutalist |
| `audit/PageHealthGrid.tsx` | Dark / Brutalist |
| `audit/RatingDot.tsx` | Chromatic-agnostic (dot colours by rating) |
| `audit/ReviewSourceList.tsx` | Dark / Brutalist |
| `audit/SectionContext.tsx` | Dark / Brutalist |
| `audit/SectionHeader.tsx` | Dark / Brutalist |
| `audit/SentimentBar.tsx` | Dark / Brutalist |
| `audit/SwotPanel.tsx` | Dark / Brutalist |
| `audit/ToolDetectionList.tsx` | Dark / Brutalist |
| `audit/TransparencyNote.tsx` | Dark / Brutalist |
| `audit/WhereToFocusSection.tsx` | Dark / Brutalist |
| `BackButton.tsx` | Chromatic-agnostic (used on cream and dark pages) |
| `Blog/HeroVisualBrutalist.tsx` | Dark / Brutalist |
| `CookieBanner.tsx` | Dark / Brutalist (floating `bg-dark` panels) |
| `CTAButton.tsx` | Chromatic-agnostic (`theme` prop; `light` = cream-context, `dark` = dark-context) |
| `EvidenceVisual_Compare.tsx` | Cream (vault / compare cards on cream) |
| `FAQSection.tsx` | Cream |
| `GlobalFooter.tsx` | Dark / Brutalist (`bg-dark` footer) |
| `GlobalHeader.tsx` | Cream (primary nav on cream; scroll rail is dark strip) |
| `GuideGateForm.tsx` | Cream (inline on guide flows) |
| `HomePage/BookingCTA.tsx` | Cream |
| `HomePage/Feature_Group7.tsx` | Cream + dark inlays (hero blocks); **Mixed** at section level |
| `HomePage/FrictionAuditSection.tsx` | Cream |
| `HomePage/HeroVisual.tsx` | Cream (hero on cream) |
| `HomePage/ProblemSection.tsx` | Cream |
| `HomePage/ScrambleTitle.tsx` | Cream |
| `HomePage/SystemPhases.tsx` | Cream |
| `HomePage/TheArchitect.tsx` | Cream |
| `Modal.tsx` | Dark / Brutalist (dim overlay + dark content framing) |
| `NewsletterForm.tsx` | Cream (footer / light contexts) |
| `PageMeta.tsx` | N/A (Helmet only) |
| `Pillar1/PillarVisual_Catchment.tsx` | Cream + illustration (pillar canvas; sits on cream pillar pages) |
| `Pillar2/PillarVisual_Magnet.tsx` | Cream + illustration |
| `Pillar3/PillarVisual_Turbine.tsx` | Cream + illustration |
| `Pillar4/PillarVisual_Brain.tsx` | Cream + illustration |
| `Pillar5/PillarVisual_MediaGrid.tsx` | Cream + illustration |
| `Pillar6/PillarVisual_Helix.tsx` | Cream + illustration |
| `Pillar7/PillarVisual_Dashboard.tsx` | Cream + illustration |
| `PillarFAQJsonLd.tsx` | N/A (JSON-LD script) |
| `PillarServiceJsonLd.tsx` | N/A (JSON-LD script) |
| `Process/ProtocolVisual_Geodesic.tsx` | Cream (process page visual) |
| `Proof/CountUp.tsx` | Cream |
| `Proof/TerminalLog.tsx` | Dark / Brutalist (terminal aesthetic) |
| `proposal/AcceptanceBlock.tsx` | Cream |
| `proposal/ConfirmationScreen.tsx` | Cream |
| `proposal/CoverPage.tsx` | Cream (document cover reference) |
| `proposal/ProgressRail.tsx` | Cream |
| `proposal/ProposalRenderer.tsx` | Cream |
| `RobotPeek.tsx` | Dark / Brutalist (gold/black robot on viewport edge) |
| `ShareButton.tsx` | Chromatic-agnostic (`variant` includes `brutalist`; dock on blog = dark) |
| `SybilChat.tsx` | Mixed (zinc/white chat shell; launcher `bg-zinc-900`; not cream tokens) |
| `SybilContactForm.tsx` | Dark / Brutalist (`bg-dark` overlay form) |
| `System/HeroVisual_Suspension.tsx` | Cream |
| `System/SolutionCardPillar.tsx` | Cream (white cards on cream system page) |
| `System/SystemArchitecture.tsx` | Cream |
| `System/SystemGrid.tsx` | Cream |
| `System/SystemGridItem.tsx` | Cream |
| `System/Visual_GetClients_Engine.tsx` | Cream + SVG |
| `System/Visual_ScaleFaster_Engine.tsx` | Cream + SVG |
| `System/Visual_SeeClearly_Engine.tsx` | Cream + SVG |
| `SysbiltLogo.tsx` | Chromatic-agnostic (`isDarkBg` for cream vs dark placements) |
| `ViewportViz.tsx` | Cream (dev/visualization; used in light layouts) |

---

## 2. `src/pages` (catalog + surface)

| Path | Surface |
|------|---------|
| `ArchitectPage.tsx` | Cream |
| `agreement/AgreementPage.tsx` | Cream (document shell per proposal/agreement rules) |
| `BlogPage.tsx` | Mixed (cream index + brutalist `border-dark` / `bg-dark` cards and hovers) |
| `BlogPostPage.tsx` | Dark / Brutalist (default article `bg-dark`) |
| `ContactPage.tsx` | Mixed (cream left column, dark right form column) |
| `DeepAuditReportPage.tsx` | Dark / Brutalist (hosts audit dashboard) |
| `EvidenceVaultPage.tsx` | Mixed (cream page + dark strips / modals) |
| `GuideDocumentPage.tsx` | Cream (`#FFF2EC` guide root) |
| `GuidesHubPage.tsx` | Cream |
| `HomePage.tsx` | Cream (sections `bg-cream`; hero has dark overlay layers inside) |
| `NewsPage.tsx` | Cream |
| `NotFoundPage.tsx` | Cream |
| `PrivacyPolicyPage.tsx` | Cream |
| `ProcessPage.tsx` | Cream + dark CTA band |
| `ProofPage.tsx` | Cream + dark bands |
| `proposal/ProposalPage.tsx` | Cream (document shell) |
| `System/Pillar1.tsx` | Cream (pillar article shell; dark CTA/footer blocks) |
| `System/Pillar2.tsx` | Cream |
| `System/Pillar3.tsx` | Cream |
| `System/Pillar4.tsx` | Cream |
| `System/Pillar5.tsx` | Cream |
| `System/Pillar6.tsx` | Cream |
| `System/Pillar7.tsx` | Cream |
| `System/SystemPage.tsx` | Cream |

---

## 3. `api/` — routes, integrations, payloads, environment variables

### 3.1 Integration matrix

| Route / file | HubSpot | Notion | n8n | Other |
|--------------|---------|--------|-----|--------|
| `api/chat.ts` | Cookie read (`hubspotutk`) in transcript webhook payload | — | — | **Google Gemini** (`GEMINI_API_KEY`), **Sanity** (catalogue), **Upstash** (`SYBIL_KV_*` rate limit), optional **POST** to `SYBIL_TRANSCRIPT_WEBHOOK_URL` |
| `api/proposal/get.ts` | Deal bundle | Proposal page + blocks | — | `PROPOSAL_SIGNING_SECRET` |
| `api/proposal/accept.ts` | Stage + note | Mark accepted | — | `HUBSPOT_NEGOTIATING_DEAL_STAGE`, `PROPOSAL_SIGNING_SECRET` |
| `api/proposal/sign.ts` | — | — | — | `PROPOSAL_SIGNING_SECRET`, `PUBLIC_BASE_URL`, `ADMIN_PASSCODE` |
| `api/agreement/get.ts` | Deal bundle | Agreement page | — | `PROPOSAL_SIGNING_SECRET` (verifies URL token; shared with proposal signing in `auth.ts`) |
| `api/agreement/accept.ts` | Won stage + note | Mark signed | — | `HUBSPOT_ACCEPTED_DEAL_STAGE`, `PROPOSAL_SIGNING_SECRET` |
| `api/agreement/sign.ts` | — | (admin) parses Notion URL only | — | `PROPOSAL_SIGNING_SECRET`, `PUBLIC_BASE_URL`, `ADMIN_PASSCODE` |
| `api/reports/ingest.ts` | — | — | **Auth for n8n** (`requireN8nWebhook`) | **Vercel KV** via `reportsStore`, `AUDIT_REPORT_SIGNING_SECRET`, `PUBLIC_BASE_URL` |
| `api/reports/get.ts` | — | — | — | KV read, `AUDIT_REPORT_SIGNING_SECRET` |
| `api/sitemap.ts` | — | — | — | **Sanity** (posts + guides; hardcoded `projectId`) |
| `api/_lib/hubspot.ts` | CRM REST | — | — | `HUBSPOT_PRIVATE_APP_TOKEN` |
| `api/_lib/notion.ts` | — | Pages API | — | `NOTION_TOKEN` |
| `api/_lib/auth.ts` | — | — | `N8N_WEBHOOK_SECRET` | `PROPOSAL_SIGNING_SECRET` (proposal + agreement URL tokens), `AUDIT_REPORT_SIGNING_SECRET`, `ADMIN_PASSCODE` |
| `api/_lib/reportsStore.ts` | — | — | — | `KV_REST_API_URL`, `KV_REST_API_TOKEN` (@vercel/kv) |

---

### 3.2 `api/chat.ts`

| Concern | Detail |
|---------|--------|
| **POST body** | `{ messages: { role: 'user' \| 'model', text: string }[], sessionId?: string }` |
| **External** | Gemini `generateContent`; Sanity fetch for catalogue; optional Upstash rate limit; optional transcript webhook POST |
| **Env** | `GEMINI_API_KEY` (required), `SYBIL_KV_REST_API_URL`, `SYBIL_KV_REST_API_TOKEN` (rate limit), `SYBIL_TRANSCRIPT_WEBHOOK_URL` (optional webhook), `NODE_ENV` (CORS) |

---

### 3.3 `api/proposal/get.ts` · `accept.ts` · `sign.ts`

| File | Method | Request | Response / side effects |
|------|--------|---------|---------------------------|
| `get.ts` | GET | `?token=` signed proposal token | JSON: HubSpot `deal`/`contact`/`company` + Notion `proposal` (properties + blocks) |
| `accept.ts` | POST | `{ token, name, position, accepted: true }` | HubSpot deal stage + note; Notion `markProposalAccepted` |
| `sign.ts` | POST | Header `x-admin-passcode: <ADMIN_PASSCODE>`; body `{ dealId: string }` (numeric HubSpot deal id) | `{ token, url, dealId }` |

**Env:** `HUBSPOT_PRIVATE_APP_TOKEN`, `NOTION_TOKEN`, `PROPOSAL_SIGNING_SECRET`, `HUBSPOT_NEGOTIATING_DEAL_STAGE` (accept), `PUBLIC_BASE_URL` (sign), `ADMIN_PASSCODE` (sign).

**Accept POST body:** `{ token, name, position, accepted: true }`.

**Notion shapes:** See `api/_lib/notion.ts` — `ProposalPage`, `ProposalPageProperties`, `NotionBlock` union.

**HubSpot shapes:** See `api/_lib/hubspot.ts` — `HubspotDealBundle`, `HubspotDeal`, etc.

---

### 3.4 `api/agreement/get.ts` · `accept.ts` · `sign.ts`

| File | Method | Request | Response / side effects |
|------|--------|---------|---------------------------|
| `get.ts` | GET | `?token=` (agreement URL token) | JSON: `agreement` (Notion) + HubSpot `deal` / `contact` / `company` |
| `accept.ts` | POST | `{ token, name, position, accepted: true }` | Notion `markAgreementSigned`; HubSpot won stage + note |
| `sign.ts` | POST | Header `x-admin-passcode`; body `{ notionUrl: string }` | `{ token, url, agreementPageId }` |

**Env:** `PROPOSAL_SIGNING_SECRET` (agreement tokens use the same HMAC helper as proposals), `HUBSPOT_PRIVATE_APP_TOKEN`, `NOTION_TOKEN`, `HUBSPOT_ACCEPTED_DEAL_STAGE`, `PUBLIC_BASE_URL`, `ADMIN_PASSCODE` (sign).

**Notion:** `AgreementPage` types in `notion.ts`.

---

### 3.5 `api/reports/ingest.ts` (n8n → app)

| Item | Detail |
|------|--------|
| **Auth** | `requireN8nWebhook`: header `x-n8n-webhook-secret` or `Authorization: Bearer <N8N_WEBHOOK_SECRET>` |
| **POST body** | `{ contact_email: string, company_name: string, audit_data: object }` |
| **Response** | `{ url }` — signed viewer URL under `/reports/:token` |
| **Persist** | `DeepAuditReportRecord` in KV: `{ contact_email, company_name, audit_data }` |

**Env:** `N8N_WEBHOOK_SECRET`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `AUDIT_REPORT_SIGNING_SECRET`, `PUBLIC_BASE_URL`.

---

### 3.6 `api/reports/get.ts`

| Item | Detail |
|------|--------|
| **GET** | `?token=` signed report token |
| **Response** | `{ contact_email, company_name, audit_data }` |

**Env:** `AUDIT_REPORT_SIGNING_SECRET`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`.

---

### 3.7 `api/sitemap.ts`

| Item | Detail |
|------|--------|
| **External** | Sanity (same project as site): posts + guides slugs |
| **Output** | XML sitemap |

**Env:** None required (embedded `projectId` / dataset); uses public CDN read.

---

### 3.8 `api/_lib/auth.ts` (shared)

| Export / use | Env |
|--------------|-----|
| Proposal + agreement URL tokens (shared HMAC) | `PROPOSAL_SIGNING_SECRET` |
| Audit report viewer tokens | `AUDIT_REPORT_SIGNING_SECRET` |
| Admin | `ADMIN_PASSCODE` |
| n8n ingest | `N8N_WEBHOOK_SECRET` |

---

## 4. Frontend → HubSpot (outside `api/`)

Browser POSTs to HubSpot Forms API (portal `442914926`):

| Client | File |
|--------|------|
| Contact page form | `src/hooks/useContactForm.ts` (form `b73fe2b1-95e1-4d06-b275-349f3ac37386`) |
| Sybil inline form | `src/components/SybilContactForm.tsx` (same form id) |
| Guide gate | `src/components/GuideGateForm.tsx` (form `6702ab07-e01e-42c7-97b5-3cc68822b566`) |
| Newsletter | `src/components/NewsletterForm.tsx` (form `3903904e-f536-47e7-bdde-02d05e8b38dd`) |

No `api/` route; field names must match the HubSpot form configuration.

---

## 5. Notes

1. **Strict Cream vs Dark** is a simplification: some components (e.g. `HomePage/HeroVisual`, `Feature_Group7`) blend both within one viewport. The table records the **dominant brand mode** or **Mixed** where split is intentional.
2. **`DESIGN_GUIDELINES.md`** does not use the literal labels “Cream” and “Dark/Brutalist” as enums; they map to documented tokens (`bg-cream`, `bg-dark`, readable gold variants).
3. **Sanity** appears in `api/chat.ts` and `api/sitemap.ts` (and the Vite app elsewhere) but was outside your three named integrations; it is listed under “Other.”
4. **Agreement signing:** `signAgreementToken` / `verifyAgreementToken` in `api/_lib/auth.ts` use the same `hmac()` as proposals, which reads **`PROPOSAL_SIGNING_SECRET`** only — there is no separate `AGREEMENT_SIGNING_SECRET` in code today.

---

*Generated for SYSBILT.COM codebase snapshot. Update this file when adding routes, env vars, or major surface refactors.*
