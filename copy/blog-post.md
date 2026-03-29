# Blog article (`/blog/:slug`) — Copy

`pages/BlogPostPage.tsx`. Post title, body, SEO fields, tags, author, images, and some CTAs come from Sanity. Fixed UI strings below.

**Browser tab & social title pattern:** `{seoTitle or post title} | SYSBILT`  

**Default meta description** (if no `seoDescription`): We build the systems that help Australian businesses stop doing everything manually  

---

## Loading & errors

Loading: Loading...  

Missing post: Article not found  

---

## Three UI themes (same page, different accent)

Accent is chosen from `servicePillar`:

| Theme key | When it applies |
|-----------|-----------------|
| **red** | Default (e.g. Websites, CRM, Automation) |
| **gold** | Pillar text contains `ai`, `content`, or `training` |
| **bw** | Pillar text contains `dashboard` |

## Copy that differs in the **dashboard (`bw`)** theme only

| Location | Red / gold | Dashboard (`bw`) |
|----------|------------|------------------|
| Table of contents heading | In this article | White badge **IN THIS ARTICLE** |
| Internal-link CTA headline | See how we fix this | **SEE HOW WE FIX THIS** |
| Email capture headline | Systems advice, not spam | **SYSTEMS ADVICE, NOT SPAM** |
| Related section eyebrow | RELATED ARTICLES | White badge **RELATED ARTICLES** |

Red and gold use the same words; only accent colours differ.

---

## Shared chrome (all themes)

**Back link** → `/blog`  
All articles →  

**Hero**  
- H1: `{post.title}` (CMS)  
- Tag chips: `#{servicePillar}` (spaces stripped) or `#SYSTEM`; plus `#{tag}` per post tag  

**Meta grid**  
- AUTHOR — `{author.name}` or **SYSBILT TEAM**  
- DATE — `en-AU` short, uppercased, or **DRAFT**  
- READ TIME — `{n}` MIN  
- Share: **SHARE** → **COPIED**  

**Table of contents** (desktop aside + mobile block)  
- Heading: **In this article** (see theme table)  
- Empty: **No sections found**  
- Entries: derived from H2s in body  

**Lead paragraph**  
`seoDescription` when set, large intro above body.  

**PortableText chrome**  
- Image caption: `{caption}` only (no prefix)  
- Code block copy button `title`: Copy code  
- YouTube iframe `title`: YouTube video  
- Image default `alt`: Article image  
- Callout defaults if Sanity title empty: Warning / Important note  
- Inline CTA blocks: link text from CMS  

**Conversion block A** (`internalLinkDestination` set)  
- Headline: See how we fix this (see theme table)  
- Body: See the exact system we build to fix this  
- Button: `{customCTA}` or **SEE THE SYSTEM**  

**Conversion block B** (email capture, no internal link)  
- Headline: Systems advice, not spam (see theme table)  
- Body: Tell us where you're stuck and we'll send you the articles and case studies that actually apply to your situation  
- Email placeholder: Enter your email address  
- Submit: **Send me the good stuff** / **Processing...**  
- Success: You're on the list, check your inbox  

**Author** (if author exists)  
- Eyebrow: **WRITTEN BY**  
- Name: CMS  
- Bio fallback: The team behind SYSBILT builds business systems for growing Australian companies  

**Related articles** (if any)  
- Eyebrow: **RELATED ARTICLES** (see theme table)  
- Link: View all → → `/blog`  
- Card meta: `// {servicePillar}` or `// GENERAL`  
- Date: `DD.MM.YYYY` or **DRAFT**  

**Bottom CTA** (always below related grid area)  
- H3: Want to talk about this  
- Sub: Book a free call and we'll walk you through how this applies to your business  
- Button: BOOK A CALL → contact  

---

## Related

Blog index: [blog.md](./blog.md)  
