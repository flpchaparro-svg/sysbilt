# Global header — Copy

`components/GlobalHeader.tsx` — fixed **top bar**, **side dock** (desktop, after scroll), and **mobile** menu. Same component on all routes that mount it from `App.tsx`.

**Logo:** `SysbiltLogo` (SVG). No separate wordmark string in code.

---

## Top bar (desktop, `lg+`)

**Logo control**  
- `aria-label`: Go to Homepage  
- Action: navigates to homepage  

**Primary nav** (visible labels use `fullLabel`; gold dot when that view is active)

| `id` (route key) | Compact label (side dock only) | Hover / desktop label |
|------------------|-------------------------------|------------------------|
| architect | ABOUT | THE ARCHITECT |
| system | SYSTEM | THE SYSTEM |
| process | PROCESS | THE PROCESS |
| proof | PROOF | THE PROOF |

**SYSTEM** opens a mega menu (chevron rotates when open). Three columns:

**GET CLIENTS**  
- 01 / Websites & E-commerce → `pillar1`  
- 02 / CRM & Lead Tracking → `pillar2`  
- 03 / Automation → `pillar3`  

**SCALE FASTER**  
- 04 / AI Assistants → `pillar4`  
- 05 / Content Systems → `pillar5`  
- 06 / Team Training → `pillar6`  

**SEE CLEARLY**  
- 07 / Dashboards & Reporting → `pillar7`  

**Right CTA**  
- **TALK** → contact (`CTAButton` light theme)  

**Blog / editorial:** When `currentView` starts with `blog`, the top bar stays visible while scrolling and can switch to cream/blur styling. **`solidBackground`** (e.g. blog post pages) forces cream behind the bar.

---

## Side dock (desktop scroll, `lg+`)

Shown when **`scrolled`** is true and **not** a blog view (hidden on blog so it doesn’t cover reading).

**Top cell**  
- Label: **[SYS]**  
- `aria-label`: Go to Homepage  

**Nav stack** (vertical; uses **compact** `label`: ABOUT, SYSTEM, PROCESS, PROOF)  
- Active state: gold accent  

**Bottom cell**  
- **TALK** (rotated) → contact  

---

## Mobile (`< lg`)

**Fixed strip (menu closed)**  
- **TALK** → contact (dark button)  
- Menu: hamburger icon, `aria-label`: **Open main menu**  

**Fullscreen menu (open)**  
- Top-left: **[SYS]** → homepage (closes menu)  
- Close: X, `aria-label`: **Close menu**  
- Same four items as desktop **`fullLabel`** (THE ARCHITECT, THE SYSTEM, …) with optional gold dot when active  
- **THE SYSTEM**: chevron toggles nested pillar lists (same group titles and line items as mega menu)  
- Bottom primary: **LET'S TALK** → contact (`CTAButton` light, full width)  
- Footer strip: **Response Time** · pulsing dot · **< 24 HRS**  

**Accessibility:** System submenu toggle uses `aria-label`: **Toggle system menu** and `aria-expanded` on the chevron button.

---

## Related

Site chrome: [footer.md](./footer.md)  
