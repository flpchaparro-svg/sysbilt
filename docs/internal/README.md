# Internal reference docs (content & operations)

**Purpose:** Shared ground truth for humans and AI agents writing, scoping, or operating SYSBILT. Copied from the external Claude project knowledge so Cursor and the repo stay aligned with the same rules as the outside AI.

**Last synced into repo:** 9 July 2026 (from `~/Downloads/` exports)

**Suggested cadence:** Re-import or diff against the external knowledge base **monthly**, or whenever you change brand rules, pricing, SEO direction, or channel playbooks in Claude. After sync, skim `ACCURACY_NOTES.md` against the live site and `src/`.

---

## Files in this folder

| File | Role |
|------|------|
| `BRAND_FACTS.md` | Wins all contradictions. Read first. |
| `CHANNEL_PLAYBOOK.md` | Per-channel structure (guides, blog, email, web, news, social, Sybil, pricing tone). |
| `SEO_MASTER.md` | SEO state, guards, keyword direction, do-not-resurface list. |
| `BOOK_SERIES_MASTER.md` | Eight-book series status and spine. |
| `SYSBILT_Persona_Reference_Guide.md` | Four personas and funnel usage. |
| `SYSBILT_Services_and_Pricing_Master.md` | Internal pricing and service catalogue (never publish on site). |
| `TOOLKIT_POST_AGENT_INSTRUCTION.md` | How to write toolkit pages for Sanity. |

**Also in repo root (infra, not content):**

- `SERVER_ARCHITECTURE.md`
- `N8N_MASTER.md`

---

## Referenced but not in this folder

Add these on the next sync if you use them in Claude:

| Missing file | Referenced from |
|--------------|-----------------|
| `BRAND_VOICE_CORE.md` | Almost every doc above |
| Toolkit Item Authoring Spec | `TOOLKIT_POST_AGENT_INSTRUCTION.md` |
| Toolkit / blog carousel visual agent files | `CHANNEL_PLAYBOOK.md` §6 |

---

## Sync workflow (monthly)

1. Export updated markdown from the external AI project (or paste edits there first).
2. Replace files in `docs/internal/` (keep filenames stable).
3. Update **Last synced** date in this README.
4. Run a quick repo check: `npm run build` (exercises `stamp-meta` + `verify-seo`).
5. Review `ACCURACY_NOTES.md` and close or add items.

Do **not** commit secrets (pricing is internal but not secret; still no API keys in these files).

---

## Hierarchy when docs disagree

1. `BRAND_FACTS.md`
2. `BRAND_VOICE_CORE.md` (when present)
3. Channel / SEO / series / persona / pricing masters
4. Live site + `src/` + Sanity (for counts and deployed meta)
5. `SERVER_ARCHITECTURE.md` / `N8N_MASTER.md` for infrastructure

If the site contradicts the brand docs, treat it as a **site bug or stale CMS field** until you deliberately change the rule in `BRAND_FACTS.md`.
