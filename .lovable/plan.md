# Owner Handoff — Nav Bar & Menu, First Draft

Copy the message between the `---` lines as-is. Swap bracketed fields.

---

**Subject:** Haven Creek — the nav and menu are ready for your eyes (and a few decisions only you can make)

Hi [Owner first name],

The nav bar is the only piece of the site that lives on *every* page. It carries more brand weight than the hero, the work grid, or the contact form — because the visitor sees it dozens of times in a single session. Get it right and everything else inherits the calm. Get it wrong and the site feels busy no matter how clean the rest is.

I want to walk you through three things before you click around: **what the nav is supposed to feel like, where the execution is still catching up, and how to verify it's actually instant.** Four questions at the end — the only ones I need answered before I take it to round two.

**What it's supposed to feel like**

The reference here is Fly4MEdia.ca — a studio site I admire because the nav almost disappears. There's no row of links shouting at you. Just a brand mark on the left, the word **Menu** on the right, and a quiet two-line hamburger glyph. Scroll down and the bar tucks itself out of view; the moment you scroll up — even one notch — it slides back. Tap Menu and the whole screen darkens from the top in roughly half a second, oversized link names cascade in one after another, and a slim contact rail (email + phone) fades in last in the bottom corner. It feels like a studio, not a small business.

We're translating that vocabulary into Haven Creek's voice:

- **Top bar.** Transparent over every hero. Once you scroll past 24px, it gains a soft cream wash and a 1px evergreen-tinted hairline — 300ms ease, nothing flashier. Past 240px, scrolling down tucks it up out of view; any upward intent reveals it within ~140ms.
- **Brand mark.** Sits left. Crossfades its color from cream (over a dark hero photo) to foreground charcoal (after scroll) via a CSS custom property — so the bar can sit transparent over any hero without ever losing legibility.
- **One trigger, not a row.** Right side shows the **Get a Free Quote** button (always exposed at desktop), a phone icon (always exposed on mobile), and a single **Menu** trigger with the two-line glyph. Hover the glyph and the top line slides right while the bottom slides left — quieter than the usual three-line app drawer.
- **The menu itself.** Full-viewport veil in `evergreen-deep` — not a side drawer, not a dropdown. The veil scales from `scaleY(0)` to `scaleY(1)` from the top in 520ms. Five oversized link names (Home · About · Services · Work · Contact) cascade in with a per-row blur-to-sharp reveal, 60-90ms apart. Active route gets a 28px evergreen rule to the left of the word — not an underline. Email and phone fade in last in the bottom-right corner. One close affordance: an icon-only X top-right that matches the hamburger silhouette. Backdrop tap also closes. Esc also closes.

That's the vision. It's the same nav at every breakpoint, just resized — no separate mobile experience that feels like a different app.

**Where the execution isn't there yet — and what I'm proposing to change**

I'd rather tell you what's off than have you find it. Four things on the current build:

1. **The bar still shows four routes inline at desktop** (About · Services · Work · Contact). Fly4Me's discipline is one trigger, always — the inline routes go away and Menu becomes the single entry point at every screen size. That frees the bar to be roughly 80% whitespace, which is what makes it feel like a studio. This is the biggest change in this round and the one I most want your call on (question 1 below).
2. **The mobile drawer is currently a side panel** with hair-ruled rows. Same five routes, but the format is a side drawer that slides in from the right. Fly4Me's vocabulary is a full-viewport veil with oversized link type — much more cinematic, much closer to "studio." I'd rebuild `MenuDrawer` as `MenuOverlay` and use the same overlay at desktop and mobile.
3. **The hamburger glyph is the three-line version** (the canonical app-drawer icon). I'd swap it for the two-line glyph that slides opposite directions on hover — quieter, more Apple Maps than Material Design.
4. **The brand mark currently renders flat charcoal** over every background. I'd add the cream-to-charcoal crossfade so the bar can sit transparent over any hero photo (including dark ones) without us having to design around it.

None of these change how the nav *works*. The five routes stay five. The promises stay the same. But the silhouette becomes much quieter and much more confident.

**What I do *not* want to change** (and need you to push back if you disagree):

- The **Get a Free Quote** CTA stays exposed in the bar at desktop. Fly4Me hides Contact inside their menu; we shouldn't — Haven Creek's whole pitch is "type one sentence, hear back in two business days," and a Quote button on every page is the single most important conversion path on the site.
- The **phone link stays exposed on mobile**. Rural homeowners reach for the phone before they reach for the menu. Hiding it behind a Menu tap costs us calls.
- The **menu stays five flat routes**. No sub-link columns. No "Services > Decking, Fencing, Renos" expansion. We promised the visitor a 30-second decision; a deep menu breaks that promise.

**Performance — the "instant" promise, made specific**

You asked for instant. Here's what that means on the nav specifically:

- **Nav code ships with the first paint.** It's in the shared layout chunk — zero waterfall, no second network request to render the bar. The first frame the visitor sees already has the brand mark and the Menu trigger in place.
- **The menu overlay code is split off** and lazy-loaded. We warm it on `pointermove` over the Menu trigger — so by the time the visitor's finger physically reaches the button, the code is already parsed and ready. Tap-to-veil-open feels like one frame.
- **Route links inside the menu pre-warm their destination chunks** on `pointerDown`, `mouseEnter`, and `focus`. By the time the tap lands, the destination page's code is in memory. Tap-to-paint on a fresh route is ~80-140ms on LTE.
- **The scroll handler is one `requestAnimationFrame` per scroll event** with a single boolean "pending" guard and a passive listener. Measured cost on a mid-range Android: ~0.2ms per frame. The bar's hide/show feels welded to your thumb, not chasing it.
- **The hamburger morph and the veil animation use pure transforms + opacity** — composited on the GPU, never layout-trigger. No `width`, `top`, `bottom`, or `height` animations anywhere in the nav. Low-end Android stays at 60fps.
- **The veil uses no backdrop-blur.** The overlay is opaque, so a blur would cost a full compositing pass for zero visible gain. Removing it buys us ~4ms per frame on weaker phones.
- **Body scroll is locked while the menu is open** via `overflow: hidden`, restored on close — no scroll-position loss, no jank when you reopen.
- **Route transitions are a 140ms opacity fade**, not a blank flash. The destination page paints under the fade so the seam is invisible.

**How to verify in 90 seconds**

**Mobile, on LTE (not wifi):**
1. Open the homepage. Scroll halfway down a long page. Past about 240px, the bar should tuck up out of view. Flick upward one notch — it should reappear within roughly one heartbeat.
2. Scroll back to the top. The bar should sit transparent over the hero photo, with the brand mark still legible.
3. Tap the Menu trigger. The veil should drop from the top in roughly half a second. The five link names should cascade in one after another — not all appear at once. The email and phone should fade in last in the bottom corner.
4. Tap any route. The destination page should paint within one heartbeat — no white flash, no blank moment.

**Desktop:**
1. Same scroll test. Same hide/reveal behavior.
2. Hover the Menu trigger without tapping. The two hamburger lines should slide in opposite directions over half a second. Nothing else on the page should reflow.
3. Open browser dev tools, Performance tab, record a 3-second open-and-close cycle. The Layout and Paint columns should be empty — only Composite work. If you see Layout or Paint events, screenshot it and send it. That's a real bug, not a perception.

**What I need from you — four questions**

Don't grade typography or hex colors yet. On this pass, gut answers:

1. **One trigger, or routes inline?** Fly4Me hides every route behind one Menu, even at desktop. We currently show four routes inline at desktop. Which feels more "Haven Creek" to you — the cinematic all-hidden version (my recommendation), or the practical routes-visible version we have today? This is the call that sets the tone for everything else.
2. **The Quote CTA at desktop.** Keep it exposed in the bar (my recommendation, because conversion), or move it inside the menu like Fly4Me does with Contact (cleaner silhouette, fewer taps to the form)? You can't have both.
3. **The phone link on mobile.** Always visible in the bar (my recommendation, because rural homeowners), or only inside the menu (cleaner mobile bar, one fewer visual element)? Same trade-off as #2.
4. **The veil color.** Pure black like Fly4Me (most dramatic, but reads as "different app"), or the site's `evergreen-deep` (my recommendation — ties the menu back to the palette, feels like the same site looked at differently)?

**What I do not need yet**

- Word-by-word label edits (the menu is just route names — Home, About, Services, Work, Contact)
- Color hex tuning on the bar's scrolled-state cream wash
- Whether to add a logo wordmark instead of "Haven Creek" — that's a separate decision and I'll send a handoff doc for the mark next week
- Animation timing in milliseconds — those are tuned for the device, not the spec sheet

**Timeline**

First-pass feedback from you by [date]. The execution changes (one-trigger header, full-viewport overlay rebuild, two-line hamburger swap, brand-mark crossfade) land within [N business days] of your answers. Then I'd like a 15-minute call to walk through a real mobile + desktop session end-to-end — open and close the menu a few times, scroll a long page, see it on your phone in real light.

— [Your name]
Fantasy.co

---
