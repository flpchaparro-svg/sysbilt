# SYSBILT — Book Series Master

**Version 1.0 | July 2026 | Internal only. The source of truth for the eight-book series: the titles, the shared spine, the voice, the on-site architecture, what's done, what's pending, and the Amazon capstone sequencing.**

Reads on top of `BRAND_FACTS.md` and `BRAND_VOICE_CORE.md`. The audience, persona, and voice rules there bind every book. This file covers what's specific to the series.

---

## What the series is

Eight client-facing books, one per service (plus e-commerce), each a complete, standalone guide a growing business could act on themselves. They work as gated lead magnets and as public SEO content, and they compile into an Amazon capstone later. The information is given away in full: the execution is the product, not the knowledge.

Audience is the same as everywhere else: premium operators and growing Australian businesses, written to the four active personas (Builder, Scaler, Controller, Visionary). Never tradies, plumbers, or "small businesses". A note for anyone reading old chat history: an earlier session recorded "tradie framing is acceptable". That was overridden. The current and final standard is premium operators, no trade framing, per `BRAND_FACTS.md`.

## The eight books

Each has a one-line thesis, the shift it argues for:

1. **Built to Work** — websites. The shift from a brochure to a system that works for you.
2. **Built to Sell** — e-commerce. Selling to humans and machines, not just listing products.
3. **Built to Close** — CRM and lead tracking. The follow-up problem, and the memory a business needs.
4. **Built to Run** — automation. The owner as the human glue, and how to remove yourself from the middle.
5. **Built to Think** — AI. Anti-hype: the right amount of AI in the right places, not everywhere.
6. **Built to Multiply** — content systems. A system beats a flood. Includes one honest section on paid creative as intelligence only, because SYSBILT doesn't run ads.
7. **Built to Teach** — team training. Getting knowledge out of heads and into the business so it doesn't walk out the door.
8. **Built to See** — dashboards and data. The difference between flying blind and seeing clearly.

## The shared spine (twelve chapters, every book)

Every book runs the same twelve-chapter skeleton. The exact chapter titles change per book, but the recurring beats hold, so the series feels like one body of work:

1. **"The ground has shifted" opening.** Why this matters now, what changed, what it's actually for. Pain-first.
2. **The ownership chapter.** Do you own the thing, or are you renting it from a platform. Control and risk.
3. **The build-right chapter.** What good looks like, the thinking most skip before they build.
4. **The structure chapter.** The pieces the thing needs to have.
5. **The features or library catalogue chapter.** The components, options, and what each is for.
6. **The running-it chapter.** Day-to-day operation, with a "fire drill" panel for when things go wrong.
7. **The keep-it-healthy chapter.** Maintenance, health, and the legal side, with verified Australian law held at durable-principle level.
8. **The get-found chapter.** How the thing gets discovered or reaches people.
9. **The hub chapter.** The under-the-hood walkthrough of how it connects to everything else, with a real-picture engineering box that shows the honest complexity. This is the connection-sight chapter.
10. **The growth chapter.** Growing and evolving it over time.
11. **The AI / prompt-pack chapter.** Using AI on this specific domain, with a practical prompt pack.
12. **The glossary, closing on the Systems Review.** Plain-language definitions, closing on a named Systems Review that points back to sysbilt.com.

Two threads run through all twelve chapters of every book, not just their own book:

- **Training and adoption** is threaded through every book as an adoption beat, because a system nobody uses is worthless. It isn't confined to Built to Teach.
- **Connection-sight** recurs: each book points at where its domain touches the others, so the reader feels the whole system even inside one book.

## Voice and legal

Standard SYSBILT rules, no exceptions: Australian English, "we" for SYSBILT and "you" for the reader, never "I", no em dashes, no exclamation marks, no prices or revenue figures, plain pub-test language that stays warm, confident, and premium. Full detail in the Core.

Every legal line (Australian consumer law, privacy, spam, accessibility, tax) was verified by web search and held at durable-principle level, not specific-figure level, so it dates slowly. A standing note sits in each book: a lawyer should review before print. Keep legal claims at the principle level in any future edit.

---

## The on-site architecture (verified live 2026-07-07)

The SEO split has shipped. The current live state on sysbilt.com:

- **Chapters are public, indexable article pages.** Each chapter is a clean page carrying a unique title, a self-referential canonical, and no noindex. Verified on the live raw HTML for Built to Work. They render on the guide document path, the same render family as the blog and guide pages.
- **Slug pattern:** `sysbilt.com/guides/built-to-[name]` for the hub, and `sysbilt.com/guides/built-to-[name]/[keyword-slug]` for each chapter. The chapter slugs are keyword-led, not chapter numbers. For example, Built to Work chapter one is `/what-a-business-website-is-for`, not `/chapter-1`.
- **Each book is thirteen URLs in the sitemap:** the hub plus twelve chapters. Eight books, so the series is 104 URLs inside the 224-URL sitemap.
- **The hub carries an SEO title,** for example Built to Work's hub is titled "Lead-Generation Websites: The Complete Guide". The hub is the head term; the chapters are the long-tail.
- **The gated PDF is the lead-capture asset.** The polished A4 book stays as the gated downloadable, with each public chapter carrying a "download the polished PDF" style CTA to preserve lead capture. This gives both surfaces: public chapters earn the search traffic, the PDF earns the email. (Claude can verify the public chapters from the sandbox but not the gated PDF flow; confirm the download gate is still in place from the browser if it matters.)
- **The original `/guides/built-to-work` slug was preserved** through the split, so there were no 301 redirects to manage.

The interlinking model: the hub links down to all twelve chapters, chapters link across to adjacent chapters and up to the hub, and the connection-sight beat links out to the matching service (pillar) page and to the neighbouring books' hubs by name. The service pages remain the conversion surface; the books feed them.

---

## Status: what's done, what's pending

**Done:**

- **All eight books are written in full** and live as hubs with twelve public chapters each.
- **Each book has its visual-layer file**, specifying every diagram, figure tag, caption, placement, and format treatment for the design build.
- **Built to Work is fully finished to build standard:** its SEO structure and the build-ready annotated assembly pass (inline HTML-comment eyebrow and design annotations for Cursor) are complete. Built to Work is the reference model the other seven should be brought up to.

**Pending:**

- **The annotated assembly pass for books two through eight.** The inline HTML-comment eyebrow and design annotations that make a book build-ready in Cursor, done for Built to Work, are still needed for the other seven.
- **The SEO structure pass for books two through eight** to match what Built to Work has, if any gaps remain after the split (the chapters are live and indexable, so verify each book against the Built to Work standard rather than assuming a gap).
- **Chapter-opener image prompts** for books two through eight. Built to Work has its set; the remaining seven need theirs.

**The order to work in:** bring one book fully up to the Built to Work standard at a time, assembly pass then image prompts, verify it live, then the next. Sequential and verified, not all seven half-done at once.

---

## The Amazon capstone (last, not now)

The end state is a compiled Amazon book that gathers the series into one authority asset. It comes after the eight books are all finished to build standard on the site, not before. Sequencing:

1. Finish all eight books to the Built to Work standard on the site (assembly pass, image prompts, SEO parity).
2. Let the public chapters earn search traffic and the gated PDFs earn leads. Prove the series works as a lead engine first.
3. Only then compile the capstone: a single Amazon book (print and digital) drawn from the eight, with a lawyer's review before print given the legal content.

Don't start the capstone while books two through eight are still short of the build standard. It's the finish line, not a parallel track.

---

## Do-not-repeat notes (working method for the series)

These came out of building the series and save real time:

- **Outline approved once, then write the full book.** No chapter-by-chapter sign-off loops. Deliver full books (or full passes) in batches, not fragments waiting for approval.
- **Don't re-run finished research or re-present an approved outline.** If the spine and outline are approved, execute. Re-litigating settled structure is the single biggest time-waster on this project.
- **Deliver in chapter batches** (for example 1, then 2 to 5, then 6 to 9, then 10 to 12) plus the standalone visual-layer file, rather than one giant block.
- **Bring books up to the Built to Work standard**, don't reinvent the treatment per book. Built to Work is the template for structure, annotation, and SEO.

---

*End of Book Series Master v1.0. Update the status section as each book reaches the Built to Work standard. When the capstone starts, add its own section.*
