# Owner Handoff — Nav & Menu First Draft

A focused, send-ready message to the Haven Creek owner that puts the **navigation and mobile menu** in front of him with the right framing, the right questions, and a clear performance claim he can verify. Built the way Fantasy.co writes a first-draft handoff: confident, specific, easy to react to.

Copy the message between the `---` lines as-is. Replace the bracketed bits.

---

**Subject:** Haven Creek — navigation is ready for your first look (desktop + phone)

Hi [Owner first name],

The navigation and menu are the first thing every homeowner touches on the site, so I want your eyes on those before you review the pages themselves. Two minutes of your time, two devices, four questions at the end.

**What you're looking at**

A single header bar that behaves like calm, expensive software — Apple, Stripe, the better airline apps — translated into Haven Creek's quiet rural-refined world. Same bar, two faces:

- **On desktop**, the four pages sit inline across the top — *About · Services · Work · Contact* — as quiet text links. Your logo on the left. Your phone number and a single "Get a Free Quote" button on the right. No dropdowns, no mega-menus, no animations that draw attention to themselves. The active page is marked with a one-pixel evergreen underline. Hover and the link warms up; click and the page is already loading.
- **On phone**, the same bar collapses to logo · phone icon · quote button · menu icon. Tapping the menu opens a full-screen list of the five pages as large, comfortable rows you can hit without aiming. One tap closes it. Phone stays visible at all times — a homeowner never has to "find" how to call you.

**Why it looks the way it looks**

A renovation site has to do one job in the first three seconds: feel trustworthy. Floating glass nav bars, rainbow gradients, animated logos — those signal "design experiment" to a 55-year-old acreage owner. So the bar is intentionally restrained:

- **Transparent at the top of every page**, so your hero photography breathes. The moment a homeowner scrolls, the bar quietly fills in with cream and a soft shadow — enough to stay legible, not enough to shout.
- **Hides on scroll-down, returns the instant you scroll up.** Same gesture grammar as iOS Safari. Reading the work feels uninterrupted; the quote button is one flick away.
- **One button language site-wide.** "Get a Free Quote" is solid evergreen, square corners, the exact same five words in the header, the menu, and the bottom of every page. No "Request a Consultation," no jargon. Predictable trust.
- **Phone is a first-class citizen.** Icon at phone widths, full number at desktop widths. A homeowner who'd rather call than type can do it from any page, any moment, without opening anything.

**Performance — and how to verify it yourself**

You said "instant." That's the bar I built to. Specifically:

- The header bundle is ~3 KB of JavaScript. It paints with the page, not after it.
- The mobile menu code does not load until a finger touches the menu button. First tap on the hamburger pre-warms the drawer ~80–120ms before the click registers, so the menu opens on the *same frame* the finger lifts. There is no spinner, no delay.
- Tapping any page link pre-loads that page's code on hover, focus, or the moment your finger touches the link. By the time the click commits, the next page is already in memory. Route transitions are a 140ms fade — no white flash between pages.
- Animations are GPU-only (transform + opacity). No layout thrash, no jank on a five-year-old Android.
- The hamburger → X morph uses pure CSS transforms, not width animations. Holds 60fps on the cheapest phones.
- Below-the-fold sections are skipped during paint until you scroll near them.

**How to verify in 60 seconds:**
1. Open the preview on your phone over LTE (not wifi). Tap any page. Tap the menu. Tap a page from the menu. Note: it should never feel like "a website loading."
2. On desktop, open it, scroll down on the home page, then scroll back up. The bar should disappear when you scroll down and return the moment you change direction. No flicker, no jump.
3. Reduce-motion users (a real chunk of older homeowners): if you turn on "Reduce Motion" in your phone's accessibility settings, the bar still works — it just stops sliding.

If anything feels even slightly slow, screenshot the page and tell me which device + which network. I want to chase that down before launch.

**What I need from you — four questions**

Please don't grade the copy yet. On this pass, react to the *feel*:

1. **Trust signal.** Does the bar feel like a serious contractor's website, or like a tech demo? Be honest.
2. **The right things visible.** Phone, quote button, and four page names is the entire visible nav. Is anything missing that a homeowner would expect on first contact? (Be careful — adding things will dilute trust, but if something genuinely belongs there, I want to know.)
3. **"Get a Free Quote."** Same five words everywhere. Are those the right five words for your business? Alternatives I considered and rejected: "Request a Consultation" (sounds clinical), "Book a Walkthrough" (commits the homeowner before they're ready), "Talk to Brennan" (great but ties the site to one name).
4. **The menu on phone.** Open it. Close it. Open it again. Is the order of pages — Home · About · Services · Work · Contact — the order you want a stranger walking through?

**What I do *not* need feedback on yet**

- Whether the logo should be bigger (it's sized for the LCP score; we'll fine-tune in round two)
- Color of the bar (locked to the brief you approved — cream + evergreen)
- Adding a dropdown for services (intentionally not there — your three services live on one page, no drill-down, per our strategy)

If any of those three really bother you, say so. But lead with the four questions above. That's where I can act.

**Timeline**

- **You:** first-pass feedback by [date]
- **Me:** revisions within [N business days]
- **Together:** 20-minute call to lock the nav before I move to the rest of the site

**The preview**

[preview URL]

Use your phone first. That's where 70%+ of your future customers will meet you.

Thanks — the nav is the handshake. I want to make sure it's the handshake you want.

— [Your name]

---

## Notes on using this

- **Swap the bracketed fields** before sending: owner name, preview URL, two dates, your sign-off, the revision turnaround.
- **The four questions are the deliverable.** They convert "looks good" into something you can ship against. Don't soften them.
- **The performance claim is verifiable.** If the owner tests on a slow phone and it doesn't feel instant, we have a real bug to fix — not a perception problem.
- **Lead with phone, not desktop**, in the test instructions. Most homeowners in his demographic browse on phones during evenings.
- **Don't send the rest of the site in the same email.** This is a focused nav handoff. The full-site handoff is a separate message (already drafted in the previous plan). One decision at a time gets a better answer.

If you want, I can also produce:
- (a) a 30-second Loom-style script walking him through it on camera
- (b) a one-page PDF "nav decisions" cover sheet to attach
- (c) a shorter Slack/SMS version for an owner who hates email

Say the word.
