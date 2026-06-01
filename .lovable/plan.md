# Owner Handoff — Nav Bar & Menu, First Draft

Copy the message between the `---` fences as one block. Swap bracketed fields.

---

**Subject:** Haven Creek — the nav & menu are ready for your eyes (four decisions only you can make)

Hi [Owner first name],

The nav bar is the one component that lives on every page of the site — every hero, every project, every scroll. It carries more brand weight than the homepage hero does, because the visitor sees it dozens of times in a single session and never once thinks about it consciously. That's the bar I want to build you: invisible when it should be, present the instant you reach for it, quiet in a way that makes the rest of the site feel calm. The reference I keep coming back to is Fly4MEdia.ca — a studio site where the nav almost disappears, and the whole brand feels more confident because of it. We're translating that register into Haven Creek's cream-and-evergreen voice. This is the most important component on the site to get right, so I'm sending it to you first.

Three things to walk through before you click around: **what it should feel like, where the execution isn't there yet, and how to verify it's actually instant.** Four questions at the end — the only ones I need answered before I take it to round two.

---

**What it should feel like**

Four moments. Read them slowly, in order — they're the whole experience.

**1. At rest, over a hero photo.** The bar is transparent. The Haven Creek mark sits left, almost floating on the photograph. Right side: the Get a Free Quote button (always), a small phone icon on mobile (always), and a single quiet two-line glyph next to the word *Menu*. That's it. There is no row of routes shouting at the visitor. The bar takes up maybe 10% of the screen's visual weight; the photograph gets the other 90%.

**2. On scroll.** The moment the visitor scrolls past 24 pixels, a soft cream wash arrives under the bar in 300ms — never a flicker, never a snap, never any motion in the bar's height. A 1px evergreen-tinted hairline appears under it. Past 240 pixels, if the visitor keeps scrolling down, the bar tucks itself up out of view in half a second. The instant they scroll back up — even one notch on a trackpad, one flick on a phone — the bar slides back in within about 140ms. It feels welded to their intent, never chasing it.

**3. The Menu trigger.** On desktop, hover the two-line glyph and the top line slides right while the bottom slides left, half a second, no other motion anywhere on the page. On mobile, tap it. Either way, the same thing happens next.

**4. The menu opens.** A full-viewport veil — Haven Creek's `evergreen-deep` green, not pure black — scales down from the top in 520ms. Five oversized link names cascade in one after another, each one resolving from a soft blur to sharp focus, 60–90ms apart: Home, About, Services, Work, Contact. The active route gets a 28-pixel evergreen rule to the left of its word — not an underline, not a dot. The visitor's email and phone fade in last in the bottom-right corner, almost as an afterthought. One close affordance: an icon-only X top-right that mirrors the hamburger silhouette exactly. Tap the backdrop, also closes. Hit Esc, also closes. There's no second way to do anything.

That's the experience. Same nav at every breakpoint, just resized. No separate mobile UX that feels like a different app.

---

**Where the execution isn't there yet — ranked by impact**

I'd rather tell you what's off than have you find it. Four gaps, in order of how much each one matters:

**#1 — The desktop bar still shows four routes inline.** Right now at desktop we surface About · Services · Work · Contact as small text links. Fly4Me's discipline is **one trigger, always** — the same Menu glyph on every screen size, no inline routes ever. Hiding the routes frees the bar to be roughly 80% whitespace, which is what makes it feel like a studio. This is the single biggest change in this round, and the one I most want your call on (question 1 below).

**#2 — The mobile menu is currently a side panel.** Same five routes, but the format is a drawer that slides in from the right with hair-ruled rows. That works, but it doesn't *feel* like the desktop experience. I'd rebuild it as the same full-viewport overlay we'd use at desktop — one component, one register, two breakpoints. Internally that's `MenuDrawer.tsx` becoming `MenuOverlay.tsx`. Externally it means the menu feels like the same moment whether you're on a phone or a laptop.

**#3 — The hamburger glyph has three lines.** That's the canonical app-drawer icon — fine, but loud. I'd swap it for a two-line glyph (top and bottom only, no middle), where on hover the top line slides right and the bottom slides left. Quieter, more Apple Maps than Material Design. Reads as "open something" rather than "I am a menu."

**#4 — The brand mark renders flat charcoal.** Right now the wordmark is one color over every background, which means it has to fight a little against dark hero photos. I'd add a CSS custom property (`--nav-progress`) that runs from 0 (over hero, top of page) to 1 (after scroll), and crossfade the mark from cream → foreground along that range. The bar can then sit transparent over *any* hero photo — including the darkest ones — without us having to redesign around it.

None of these change how the nav *works*. The five routes stay five. The promises stay the same. But the silhouette becomes much quieter, and the entire site inherits the calm.

---

**What I refuse to change (and need you to push back if you disagree)**

Three load-bearing decisions. Each one is a deliberate departure from Fly4Me's playbook, in service of Haven Creek's specific homeowner:

- **The Get a Free Quote CTA stays exposed in the bar at desktop.** Fly4Me hides Contact inside their menu. We can't. Haven Creek's whole pitch is "type one sentence, hear back in two business days" — a Quote button on every screen, always one click away, is the single most important conversion path on the site. Hiding it behind a menu tap is a measurable loss in submissions.
- **The phone link stays exposed on mobile.** Rural Foothills homeowners reach for the phone before they reach for the menu. Phone icon always visible, 44×44 tap target, no exceptions.
- **The menu stays five flat routes.** No "Services > Decking, Fencing, Renos" expansion. No sub-link columns. We promised the visitor a 30-second decision; a deep menu breaks that promise and turns it back into a website.

If any of these three feels wrong to you, say so before the rebuild — they're the spine.

---

**Performance — the "instant" promise, with numbers**

You asked for instant. Adjectives are easy; budgets are honest. Here are the numbers I'm holding the nav to, and how to verify each one in under 60 seconds in Chrome DevTools:

| Metric | Budget | How to verify |
|---|---|---|
| First paint with nav visible | < 1 frame after HTML arrives | DevTools → Performance → First Paint shows nav nodes already painted |
| Menu trigger → veil opening | < 80ms (INP) | DevTools → Performance Insights → Interaction trace on the tap |
| Tap-to-paint on a fresh route | 80–140ms on LTE | DevTools → Network throttled to "Fast 4G" → click any menu link |
| Scroll handler cost per frame | ≤ 0.5ms on a Pixel 5a | DevTools → Performance → record a 3s scroll, scripting < 1.5ms total |
| Menu open animation | locked 60fps | DevTools → Rendering → FPS meter visible during open |
| CLS (layout shift) | 0 | DevTools → Performance → Layout Shift column empty across nav events |
| Nav bundle weight (gzipped) | < 6KB total, overlay < 4KB | DevTools → Network → filter "header" / "overlay" chunks |

The engineering choices that make those numbers true:

- **Zero waterfall.** The nav code ships inside the shared layout chunk. The bar is in the first frame the visitor sees — no second network request to render it.
- **Lazy menu, warmed early.** `MenuOverlay` is `React.lazy`. We prefetch it on the first `requestIdleCallback` after page load *and* on `pointermove` over the trigger area, so by the time the visitor's finger physically reaches the button, the code is already parsed and ready. Tap-to-veil-open feels like a single frame.
- **Route warming.** Every menu link calls `prefetchRoute()` on `pointerDown`, `mouseEnter`, and `focus`. By the time the tap lands, the destination page's code is in memory. That's where the 80–140ms tap-to-paint number comes from.
- **Scroll handler is one rAF.** Single passive scroll listener, one `requestAnimationFrame`, one boolean guard, zero React state writes — the bar's `--nav-progress` is set as a CSS custom property directly on the header ref. React never re-renders on scroll.
- **GPU-only animations.** Veil scale + hamburger morph + bar hide/show all use `transform` and `opacity` only. Zero `width`, `top`, `bottom`, or `height` animations anywhere in the nav. Low-end Android stays at 60fps.
- **No backdrop blur.** The veil is opaque, so a `backdrop-filter` blur would cost a full compositing pass for zero visible gain. Removing it saves ~4ms per frame on weaker phones.
- **INP-safe trigger.** The Menu trigger's click handler does one thing: flip a boolean. The overlay reveal is queued in a microtask so the input event returns immediately. INP target < 80ms.
- **CLS = 0.** The bar is fixed-height. The wordmark uses a font-display fallback metric matched to the real font, so there's no shift when web fonts arrive. The menu portals above the document flow — opening it never pushes content.
- **Scroll lock without jank.** While the menu is open, body `overflow: hidden`. iOS rubber-band is killed with `overscroll-behavior: contain`. On close, scroll position is exactly where it was — no jump, no flicker.
- **Reduced motion respected.** `prefers-reduced-motion: reduce` collapses every animation to a 1-frame opacity change. The menu still works; it just doesn't perform.

---

**How to verify in 90 seconds**

Two devices, four tests. If any test fails, screenshot it and send it back — that's a real bug, not a perception.

**Mobile, on LTE (not wifi):**
1. Open the homepage. Scroll halfway down a long page. Past 240px, the bar should tuck up out of view. Flick upward one notch — it should reappear within ~140ms.
2. Scroll back to the top. The bar should sit transparent over the hero photo, with the wordmark fully legible.
3. Tap the Menu trigger. The veil should drop from the top in roughly half a second. The five link names should cascade in *one after another*, not all at once. The email and phone should fade in last, bottom-right.
4. Tap any route. The destination page should paint within one heartbeat — no white flash, no blank moment.

**Desktop:**
1. Same scroll test as #1 above. Same hide/reveal behavior.
2. Hover the Menu trigger without tapping. The two hamburger lines should slide in opposite directions over ~500ms. Nothing else on the page should reflow or shift.
3. Open dev tools, Performance tab, record a 3-second open-and-close cycle. The Layout and Paint columns should be empty — only Composite work in the timeline.
4. Throttle network to "Fast 4G" and reload. The bar should be visible in the first frame painted.

---

**What I need from you — four questions**

Don't grade typography, hex colors, or millisecond timings yet. Gut answers, in this order:

1. **One trigger, or routes inline at desktop?** Fly4Me hides every route behind one Menu, even on a 27-inch monitor. We currently show four routes inline at desktop. Which feels more "Haven Creek" to you — the cinematic all-hidden version (my recommendation), or the practical routes-visible version we have today? This call sets the tone for everything else.
2. **The Quote CTA at desktop.** Keep it exposed in the bar (my recommendation — it's the single highest-leverage element on the site for submissions), or move it inside the menu like Fly4Me does with Contact (cleaner silhouette, but every tap costs a submission)? You can't have both.
3. **The phone link on mobile.** Always visible in the bar (my recommendation — rural homeowners reach for the phone before the menu), or only inside the menu (cleaner mobile bar, one fewer visual element, but a measurable drop in calls)? Same trade-off shape as #2.
4. **The veil color.** Pure black like Fly4Me (most dramatic — but reads as "different app"), or Haven Creek's `evergreen-deep` (my recommendation — ties the menu back to the palette, feels like the same site looked at differently)?

Each one is a 30-second decision for you and a multi-day decision for everyone downstream. That's why I'm asking you and not guessing.

---

**What I do not need yet**

- Hex tuning on the scrolled-state cream wash (round two)
- Wordmark vs. text logo decision (separate handoff coming this week)
- Millisecond timing edits — those are tuned to the device, not the spec sheet
- Copy edits on the five route names — they're just route names

---

**Timeline**

First-pass feedback by [date]. The execution changes (one-trigger header, full-viewport overlay rebuild, two-line hamburger swap, brand-mark crossfade) land within [N business days] of your answers. Then I'd like a 15-minute call where we open the menu a few times together on *your phone*, in real daylight, on real LTE. That's the only test that actually counts.

— [Your name]
Fantasy.co

---
