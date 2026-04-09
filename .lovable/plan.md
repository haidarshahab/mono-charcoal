
# Mono Charcoal — One-Page Landing Page

## Design System
- **Colors**: Primary green `#1D3F30`, accent orange `#D35623`, light bg `#EDEDED`, dark text `#3C3C3C`
- **Typography**: Space Grotesk (headings), DM Sans (body)
- **Layout**: Full-width stacked sections with generous whitespace
- **Style**: Clean, premium, modern — inspired by Cofactr's bold hero and UnboundX's crisp layout
- **Animations**: Fade-in-on-scroll for each section, smooth scroll navigation

## Sections (single page, top to bottom)

### 1. Sticky Navigation Bar
- Logo "Mono Charcoal" on left
- Nav links: About · Products · Blog · Contact (smooth-scroll anchors)
- "Get in Touch" CTA button (orange) linking to WhatsApp

### 2. Hero Section
- Full-width dark green background with large bold headline: *"The Best Coconut Charcoal from Indonesia"*
- Subheadline about premium quality, sustainability, global export
- Two CTA buttons: "Chat on WhatsApp" + "Send Email"
- Decorative charcoal/coconut imagery or gradient overlay

### 3. About Section
- Company story — Indonesia's finest coconut charcoal factory
- Key stats row: years of experience, tons exported, countries served (animated counters)
- Trust badges / certifications area

### 4. Products Section
- Two product cards side-by-side: **Shisha Charcoal** & **BBQ Charcoal**
- Each card: product image placeholder, key specs (burn time, ash content, heat value), and a WhatsApp CTA
- Clean card design on light background

### 5. Why Choose Us
- 4 feature blocks: Premium Quality, Sustainable Sourcing, Global Export, Custom Packaging
- Icon + title + short description for each

### 6. Blog Section
- 3 blog post cards with placeholder titles, dates, and excerpts
- "Read More" links (can be wired up later)

### 7. Contact / CTA Section
- Bold closing CTA: "Ready to Order?"
- WhatsApp button (+62881024922133) and Email button (haidar@monocoal.com)
- Simple contact form (name, email, message) for lead capture

### 8. Footer
- Logo, quick links, social media placeholders, copyright
- WhatsApp & email repeated

### 9. Floating WhatsApp Button
- Fixed bottom-right green WhatsApp icon, always visible, links to chat

## Technical
- Single `Index.tsx` page with component sections
- Google Fonts: Space Grotesk + DM Sans
- Scroll-triggered fade-in animations via Intersection Observer
- Fully responsive (mobile-first)
- All WhatsApp links use `https://wa.me/62881024922133`
