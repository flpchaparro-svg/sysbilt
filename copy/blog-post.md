# Blog article (`/blog/:slug`) — Copy

`pages/BlogPostPage.tsx`. Post title, body, SEO fields, tags, author, images, and most CTAs come from Sanity. Fixed UI strings below.

**Browser tab & social title pattern:** `{seoTitle or post title} | SYSBILT`  

**Default meta description** (if no `seoDescription`): Business systems architecture for growing Australian companies.  

---

## Loading & errors

Loading: Loading...  

Missing post: DOSSIER NOT FOUND  

---

## Three UI themes (same page, different accent)

Accent is chosen from `servicePillar` (not three separate routes):

| Theme key | When it applies | Accent |
|-----------|-----------------|--------|
| **red** | Default (e.g. Websites, CRM, Automation) | Red |
| **gold** | Pillar text contains `ai`, `content`, or `training` | Gold |
| **bw** | Pillar text contains `dashboard` | White / high-contrast “stamp” labels |

**Copy is almost identical across themes.** Only the **dashboard (`bw`)** theme swaps a few headings to all-caps stamped labels (see next section). Red and gold use the same words; only colours differ.

---

## Copy that differs in the **dashboard (`bw`)** theme only

| Location | Red / gold | Dashboard (`bw`) |
|----------|------------|-------------------|
| Table of contents label | `INDEX // CONTENTS` | White badge **INDEX** then `// CONTENTS` |
| Internal-link CTA headline | Solve This **Problem** | **SOLVE THIS PROBLEM.** |
| Email capture headline | Deploy The **System** | **DEPLOY THE SYSTEM.** |
| Related section eyebrow | `RELATED ARTICLES` | White badge **RELATED ARTICLES** |

Mobile TOC uses the same **INDEX // CONTENTS** pattern as desktop (with the same `bw` badge rule).

---

## Shared chrome (all themes)

**Back link** → `/blog`  
All articles  

**Hero**  
- H1: `{post.title}` (CMS)  
- Tag chips: `#{servicePillar}` (spaces stripped) or `#SYSTEM`; plus `#{tag}` per post tag  

**Meta grid**  
- AUTHOR — `{author.name}` or **SYSBILT TEAM**  
- DATE — `en-AU` short, uppercased, or **DRAFT**  
- READ TIME — `{n}` MIN  
- Share control: **SHARE** → after copy: **COPIED**  

**Table of contents** (desktop aside + mobile block)  
- Heading: **INDEX // CONTENTS** (see theme table above)  
- Empty TOC: **NO INDEX DETECTED**  
- Entries: derived from H2s in body (numbered or `//` prefix stripped in display)  

**Lead paragraph**  
If `seoDescription` exists, shown as large intro above the body (CMS).  

**PortableText chrome** (non-CMS labels)  
- Image caption prefix: `FIG. // {caption}`  
- Code block: `title` on copy button **Copy Code**  
- YouTube embed `title`: YouTube Video  
- Image default `alt`: System Visual  
- Callout defaults if Sanity title empty: **Warning** / **Important Note**  
- Inline CTA blocks: link text from CMS (`value.text`)  

**Conversion block A** — when `internalLinkDestination` is set  
- Headline: **Solve This** + accent **Problem** (or bw stamp line above)  
- Body: Stop losing time to broken processes. See the exact system we build to fix this for businesses in your phase.  
- Button: `{customCTA}` from CMS or **SEE THE SOLUTION**  

**Conversion block B** — when no internal link (email capture)  
- Headline: **Deploy The** + accent **System** (or bw stamp line above)  
- Body: Tell us where you're stuck. We'll send you the articles and case studies that actually apply to your situation  
- Email field `placeholder`: Enter your email address  
- Submit: **Processing...** / `{customCTA}` or **Send me the good stuff**  
- Success: You're on the list, check your inbox  

**Author** (if author exists)  
- Eyebrow: **WRITTEN BY**  
- Name: CMS  
- Bio fallback: Systems Architect & Operations Specialist.  

**Related articles** (if any)  
- Section label: **RELATED ARTICLES** (see theme table)  
- Link: View all → → `/blog`  
- Card meta: `// {servicePillar}` or `// GENERAL`  
- Date: `DD.MM.YYYY` or **DRAFT**  

---

## Related

Blog index UI: [blog.md](./blog.md)  
