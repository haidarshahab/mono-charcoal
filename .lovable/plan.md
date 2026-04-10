

# Refine "Why Mono Charcoal" Section

## Narrative Direction

The current section is generic "feature blocks." The new angle: **Indonesia has hundreds of charcoal manufacturers, but most lack professional management** — leading to production delays, missing documents, shipping chaos, and inconsistent quality. Mono Charcoal is the exception.

### Proposed structure (two-part layout):

**Part 1 — The Problem (left column or top)**
A bold, editorial-style statement addressing the pain:
> *"Indonesia produces the world's best coconut charcoal. But finding a manufacturer you can actually rely on? That's the hard part."*

Brief paragraph listing real frustrations importers face: extreme delays, incomplete export documents, shipping problems, inconsistent product quality.

**Part 2 — The Solution (right column or bottom)**
Four feature blocks reframed as direct answers to those pain points:

| Pain Point | Mono's Answer |
|---|---|
| Production delays | **On-Time Production** — Structured workflow, real deadlines, no excuses |
| Incomplete documents | **Full Documentation** — Packing lists, COA, fumigation certs — always ready |
| Shipping problems | **Managed Logistics** — We handle freight, customs, and tracking end-to-end |
| Inconsistent quality | **Consistent Quality** — Lab-tested every batch, same specs every shipment |

### Modern design approach (not old-style icon grids):

- **Split layout**: Left side = large editorial text with the problem statement on a dark green (`#1D3F30`) background. Right side = the 4 solution cards stacked vertically with staggered fade-in.
- **Cards**: No borders, no rounded boxes. Instead — bold numbers or thin accent lines as dividers. Minimal, editorial feel like Cofactr.
- **Typography**: Large display heading (48px+), problem text in a lighter weight, solution titles in bold with orange accent marks.
- **Subtle detail**: A thin orange vertical line or dot separating problem → solution visually.

### Technical changes:
- Rewrite `src/components/WhyChooseUsSection.tsx` entirely
- Update icons: `Clock`, `FileCheck`, `Ship`, `FlaskConical` (from lucide-react)
- Use asymmetric grid: `lg:grid-cols-[1fr_1fr]` with left dark panel, right light panel
- Each solution card uses staggered scroll animation delays

This creates a storytelling section rather than a generic feature list — modern, human, and directly addressing buyer anxiety.

