# Global header — Copy

`components/GlobalHeader.tsx`. **Route keys** (`architect`, `system`, `process`, `proof`) stay the same in code so URLs and navigation don’t break; only **labels** change.

---

## Top bar (desktop, `lg+`)

**Logo**  
- `SysbiltLogo` · `aria-label`: Go to Homepage  

**Primary nav**

| Route key | Compact (side dock) | Full label (top bar + mobile) |
|-----------|---------------------|------------------------------|
| `architect` | ABOUT | ABOUT |
| `system` | SERVICES | SERVICES |
| `process` | PROCESS | PROCESS |
| `proof` | PROOF | PROOF |

**SERVICES** opens the mega menu (chevron). Three columns (unchanged):

**GET CLIENTS** — 01–03 pillars  
**SCALE FASTER** — 04–06 pillars  
**SEE CLEARLY** — 07 pillar  

**Right CTA:** **LET'S TALK** → contact  

**Blog:** Top bar stays on scroll for `blog*` views; `solidBackground` on blog posts.

---

## Side dock (desktop scroll, `lg+`)

Not on blog routes.

- Top: **[SYS]** → homepage (`aria-label`: Go to Homepage)  
- Stack: **ABOUT** · **SERVICES** · **PROCESS** · **PROOF**  
- Bottom (rotated): **TALK** → contact  

---

## Mobile (`< lg`)

**Strip (menu closed)**  
- **LET'S TALK** → contact  
- Menu: **Open main menu** (`aria-label`)  

**Fullscreen**  
- **[SYS]** → homepage  
- Close: **Close menu** (`aria-label`)  
- Nav: **ABOUT** · **SERVICES** · **PROCESS** · **PROOF**  
- **SERVICES**: chevron toggles pillar lists (same groups as mega menu)  
- Bottom: **LET'S TALK** → contact (full width)  
- Strip: **Response time** · dot · **< 24 HRS**  

---

## Related

[footer.md](./footer.md) · Routes still use `/architect`, `/system`, etc.; labels are display-only.  
