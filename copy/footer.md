# Footer — Copy

`components/GlobalFooter.tsx`

**Shell:** The footer is **not** mounted on `/system` or `/contact` (see `src/App.tsx`). Everywhere else that renders the layout shell, this footer appears.

---

## Brand (left column)

- **Logo:** `SysbiltLogo` with `isDarkBg={true}` · wrapper `w-[7.5rem]` · `mb-3`
- **Headline:** Serif, responsive (`text-xl` → `lg:text-[1.4rem]` → `xl:text-[1.5rem]`).  
  Plain: **We build the** … **without you**  
  Emphasis: *systems that run your business* — `text-gold-on-dark italic`
- **CTA:** **BOOK A CALL** → `contact` · `CTAButton` `theme="dark"` · `className="text-sm py-2.5 px-5"`

---

## Link groups (top band, right)

From `lg`: brand and nav sit in one row (`lg:flex-row lg:justify-between`). Nav grid is **five columns** from `lg` (`lg:grid-cols-5`), right-aligned (`lg:justify-end`). Below `lg`: `grid-cols-2`, then `sm:grid-cols-3`.

| Group title | Icon (Lucide) | Header colour (Tailwind) | Links (label → route key) |
|-------------|---------------|---------------------------|----------------------------|
| **COMPANY** | `Building2` | `text-white/80` | About → `architect` · Process → `process` · Proof → `proof` |
| **GET CLIENTS** | `Target` | `text-red-on-dark` | Websites → `pillar1` · CRM → `pillar2` · Automation → `pillar3` |
| **SCALE FASTER** | `TrendingUp` | `text-gold-on-dark` | AI Assistants → `pillar4` · Content → `pillar5` · Training → `pillar6` |
| **SEE CLEARLY** | `BarChart3` | `text-white` | Dashboards → `pillar7` |
| **INSIGHTS** | `Newspaper` | `text-white/80` | Blog → `blog` · News → `news` |

**Column typography:** Mono title `text-[8px] sm:text-[9px]` · icon `w-3 h-3` · link buttons `text-[11px] sm:text-xs` · `text-white/70` · `space-y-1` · header row `mb-2`

URLs follow the same keys as elsewhere (e.g. `/architect`, `/blog`, pillar routes).

---

## WHAT WE DO (second band)

Separated from the nav grid by `border-t border-white/10` · `pt-8` · `mb-14` before the bottom bar.

- **Eyebrow:** `Layers` icon (`text-gold-on-dark`, `w-3.5 h-3.5`) + **WHAT WE DO** (`font-mono text-[9px]`)
- **Layout:** `flex` row from `md`; capability text in a grid: **2** cols default · **3** at `sm` · **6** at `lg` (one row on large screens)
- **Lines (static, not links):**  
  Business Systems Sydney · CRM Setup and Integration · Custom Website Development · AI Assistants and Voice Agents · Business Automation · Dashboards and Reporting  
- **Style:** `text-[11px] sm:text-xs` · `text-white/65`

---

## Bottom bar

- **©** `{currentYear}` **SYSBILT. Sydney, Australia.** · `font-mono text-[9px]` · `text-white/70` · `uppercase tracking-widest`
- **Privacy Policy** → `privacy`
- **LinkedIn** → external profile URL (see component) · `aria-label`: SYSBILT on LinkedIn · `ArrowUpRight` icon

---

## Related

[header.md](./header.md)
