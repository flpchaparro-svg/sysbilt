# Global header — Copy

`components/GlobalHeader.tsx`

**Shell:** The header is **not** rendered on `/contact` (`src/App.tsx`).

**Route keys** (`architect`, `system`, `process`, `proof`, `blog`, `news`, pillars, `homepage`, `contact`) stay the same in code so URLs and navigation stay stable; **labels** below are display-only.

---

## Top bar (desktop, `lg+`)

**Logo**

- `SysbiltLogo` (light background variant) · control: **Go to Homepage** → `homepage`

**Primary nav** (`hidden lg:flex` · item spacing `gap-4 lg:gap-8`)

| Nav `id` | Side dock label | Top bar / mobile label | Behaviour |
|----------|-----------------|-------------------------|-----------|
| `architect` | ABOUT | **ABOUT** | Direct → `architect` (`/architect`) |
| `system` | SERVICES | **SERVICES** | Mega menu (chevron) · `dropdown: 'pillars'` |
| `process` | PROCESS | **PROCESS** | Direct → `process` |
| `proof` | PROOF | **PROOF** | Direct → `proof` |
| `insights` | INSIGHTS | **INSIGHTS** | Small dropdown (chevron) · `dropdown: 'insights'` · primary click → `blog` |

**Active dot:** Gold when `currentView` matches the item; for **INSIGHTS**, active when `blog`, paths starting with `blog`, or `news`.

**Hover:** `layoutId="nav-bg"` highlight on hover/focus; dropdown open state is `openDesktopDropdown` keyed by item **`id`** (`system` | `insights`).

---

## SERVICES mega menu

Opens when the **SERVICES** (`system`) row is hovered/focused. Panel: `w-[700px]` · `p-8` · three columns.

| Column title | Icon | Accent (header) | Pillar links (→ route key) |
|--------------|------|-----------------|----------------------------|
| **GET CLIENTS** | `Target` | red | 01 / Websites & E-commerce → `pillar1` · 02 / CRM & Lead Tracking → `pillar2` · 03 / Automation → `pillar3` |
| **SCALE FASTER** | `TrendingUp` | gold | 04 / AI Assistants → `pillar4` · 05 / Content Systems → `pillar5` · 06 / Team Training → `pillar6` |
| **SEE CLEARLY** | `BarChart3` | dark | 07 / Dashboards & Reporting → `pillar7` |

Pillar rows: `font-serif text-lg` · `text-dark/80` · `hover:pl-2` · column-specific hover text colour (`hover:text-red-text`, `hover:text-gold-on-cream`, `hover:text-black`).

---

## INSIGHTS dropdown

Opens when **INSIGHTS** row is hovered/focused. Panel: `min-w-[220px]` · `p-8` · `cursor-default`.

- **Blog** → `blog` (`/blog`)
- **News** → `news` (`/news`)

Link styling matches the mega menu pillar rows (no extra horizontal padding): `font-serif text-lg` · `text-dark/80` · `hover:pl-2` · `hover:text-red-text` (same motion and accent as **GET CLIENTS** column).

Primary **INSIGHTS** button also calls **`blog`**.

---

## Right CTA

- **LET'S TALK** → `contact` (`/contact`) · `CTAButton` `theme="light"`

---

## Blog behaviour

- For `currentView` starting with `blog`, the top nav stays visible when scrolled (`isBlogView`), with cream bar / height tweak when scrolled.
- **`solidBackground`:** passed `true` when pathname matches a single blog post (`/blog/:slug`) for a solid cream bar on dark post chrome.

---

## Side dock (desktop scroll, `lg+`)

Shown when `scrolled && !isBlogView` · fixed right · `w-[54px]` · dark panel.

- Top: **[SYS]** → homepage · **Go to Homepage**
- Stack (rotated labels): **ABOUT** · **SERVICES** · **PROCESS** · **PROOF** · **INSIGHTS** — same `handleNavPrimaryClick` as top bar (**INSIGHTS** → `blog`)
- Bottom: **TALK** → `contact`

---

## Mobile (`< lg`)

**Strip (menu closed)** · `fixed` top right

- **LET'S TALK** → `contact`
- Menu control · **Open main menu** (`aria-label`)

**Fullscreen menu**

- **[SYS]** → homepage (closes menu)
- **Close menu** (`aria-label`)
- Nav list: **ABOUT** · **SERVICES** · **PROCESS** · **PROOF** · **INSIGHTS** (large serif row; primary tap closes menu and navigates)
- **SERVICES:** chevron · **Toggle services menu** · expands pillar groups (same three blocks as mega menu) · `mobileSubmenu === 'system'`
- **INSIGHTS:** chevron · **Toggle insights menu** · **Blog** / **News** · `mobileSubmenu === 'insights'`
- Bottom: **LET'S TALK** full width
- Footer strip: **Response time** · pulse dot · **< 24 HRS**

---

## Related

[footer.md](./footer.md) · URLs remain `/architect`, `/system`, `/blog`, etc.; display labels differ where noted above.
