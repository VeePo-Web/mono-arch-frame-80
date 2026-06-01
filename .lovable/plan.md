# Owner-Ready First Draft: Navigation & Menu Brief

Create a single send-ready document at `.lovable/owner-brief.md` that the Fantasy.co team can paste into an email to the Haven Creek owner. It frames the nav + menu rebuild as a deliberate craft decision, written in plain language (no jargon), with a tight reference to the Fly4Me.ca feel translated into Haven Creek's evergreen-on-cream palette.

No code changes. One new markdown file. Everything else is already shipped.

## File to create

### `.lovable/owner-brief.md`

Sections, in order:

1. **From Fantasy.co — header block**
   - One-line positioning ("We build calm, premium websites for trade businesses that want to look like the best in their market.")
   - Project name + date + draft number.

2. **What this is**
   - Two sentences. We rebuilt the top navigation and the menu page to feel like a studio site, not a contractor template. Same five pages, faster, calmer, more confident.

3. **What changed (in plain English)**
   - Top bar is now the same shape on phone and desktop: logo · call us · "Get a Free Quote" · menu icon. No page links scattered across the bar.
   - Menu icon opens a full-screen evergreen page with five oversized serif route names that cascade in. One way in, one way out.
   - The bar quietly fades in a cream wash once you scroll. It tucks out of the way when scrolling down, returns the moment you scroll up.
   - Logo crossfades from cream (over the hero photo) to dark (after scroll) so it always stays legible.
   - Hamburger is a refined two-line glyph that morphs into an X. Lines slide on hover.

4. **Why it feels like Fly4Me — but more Haven Creek**
   - Reference link + 3-bullet translation: same restraint, same single-trigger discipline, same cinematic menu — but in Haven Creek's evergreen-on-cream editorial palette instead of cold tech-blue. Type is serif (not sans), motion is slower and warmer (520ms vs 280ms), photography drives the home page (not screenshots).

5. **Performance (what "instant" means here)**
   - Target numbers in homeowner terms: page paints in under 1.2s, menu opens in 80–140ms (one frame), no layout jumps, no spinners.
   - One sentence on the techniques (lazy menu chunk warmed during idle time, route prefetching on hover, transform-only animations) — plain language, no acronyms.

6. **What we deliberately kept out**
   - No dropdowns, no mega-menu, no social icons in the header, no "Menu" word next to the icon, no second CTA, no testimonials in nav.
   - One sentence each on why — "every removal is a decision."

7. **Five questions for your first review**
   - Does the simpler top bar feel premium and trustworthy for your customers?
   - Should the phone number stay visible at every breakpoint, or icon-only on mobile?
   - Is "Get a Free Quote" the exact phrase you want, or do you prefer "Request a Quote" / "Book a Visit"?
   - Does the full-screen menu feel right, or would you prefer a smaller side panel?
   - Is the overall calmness right for Haven Creek, or do you want more energy?

8. **What success looks like to us**
   - Three lines, owner's voice: "Feels like us." "Easier to use." "Faster than what we had."

9. **Next steps**
   - You review on desktop + phone using the preview link.
   - Send written feedback (or voice memo — we'll transcribe).
   - Round-two polish: hex tuning, wordmark decision, footer rebuild.

10. **Sign-off** — "— The team at Fantasy.co"

## Style rules for the doc

- No code, no class names, no file paths, no framework names.
- Short paragraphs, declarative sentences.
- Numbers when they help ("520ms", "five routes"), never when they don't.
- One link only: the preview URL.

## Out of scope

- No code changes.
- No screenshots or asset generation.
- No edits to plan.md, memory, or any component file.

## Verification

Open `.lovable/owner-brief.md` after creation and confirm it reads end-to-end as something the owner could receive without a follow-up call to decode it.
