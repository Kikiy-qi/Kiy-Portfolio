# DESIGN.md — Photography Portfolio

## Identity
A personal portfolio for a photography UKM member. The work is the star: portraits, events, street, behind-the-scenes video edits. The site frames the work, never competes with it.

## Audience
Potential clients, fellow photographers, UKM members, creative community.

## Personality
Quiet confidence. The site speaks through images, not through words. Editorial restraint, not flashy tech. Think printed zine meets web.

## Palette
- **Background**: #0a0a0a (near-black)
- **Surface**: #141414 (card/elevated surface)
- **Text primary**: #f0ede8 (warm off-white, not harsh #fff)
- **Text secondary**: #8a8a8a (muted, passes 3:1 on #0a0a0a = ratio 4.38)
- **Accent**: #d4d0c8 (warm gray, used sparingly for borders and highlights)
- **Hover accent**: #ffffff (pure white on hover only)

Neutrals only. No color accent. The photographs provide all the color the page needs.

## Typography
- **Headings**: "Instrument Serif", serif — editorial weight, specific to print/photography aesthetic
- **Body**: "Instrument Sans", sans-serif — clean legibility, same family cohesion
- **Fallback**: Georgia, serif / system-ui, sans-serif

## Bokeh Motif
Soft circular blurs (CSS radial gradients) placed behind select sections as a faint background motif. Opacity kept under 0.08. This is the identity motif: a camera's depth-of-field rendered as atmosphere. Used on hero and gallery sections only, not everywhere.

## Dial
- **ENERGY 2** (Balanced): Confident but not loud. Clean white space, deliberate hierarchy.
- **RHYTHM 3** (Bold): Sections vary. Hero is full-bleed asymmetric, skills are horizontal, gallery is masonry, about is split-panel. No two sections share the same internal composition.
- **MOTION 2** (Scroll-reveal, transitions): Elements reveal on scroll with subtle stagger. Image hovers scale gently. No parallax, no endless loops.

## Sections (content-driven order)
1. **Hero** — Large portrait photo, name, one-line tagline. No paragraph. The photo dominates.
2. **About** — Split: photo left, short bio right. Education, brief personal statement.
3. **Skills** — Horizontal layout with skill items. Photography, Videography, Editing. Visual bars or percentage not needed; the work section is the proof.
4. **Gallery (Photography)** — Masonry grid of photo work. Each image opens in a lightbox.
5. **Video Work** — Featured video edits with thumbnail cards. Link to full video or embed placeholder.
6. **Design Work** — Selected graphic design pieces.
7. **Contact** — Email, Instagram, phone. Simple. No form without a backend.

## What this site does NOT have
- No testimonials (none exist)
- No statistics (none real)
- No FAQ
- No pricing
- No blog
- No dark/light toggle (dark is the deliberate brand choice for a photography portfolio; images pop against black)
