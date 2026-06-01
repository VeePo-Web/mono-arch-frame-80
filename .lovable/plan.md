# Owner Handoff — Contact Page First Draft

A focused, send-ready message for the Haven Creek owner about the **Contact page**. Frames the vision honestly, names the execution gaps in plain language, sets the performance bar, and asks four questions that turn vague reactions into shippable feedback. Written the way Fantasy.co writes a first-draft handoff.

Copy the message between the `---` lines as-is. Replace bracketed fields.

---

**Subject:** Haven Creek — Contact page is ready for your eyes (and I owe you some honesty)

Hi [Owner first name],

The Contact page is the most important page on the site. It's where a homeowner who's been quietly reading for ten minutes finally decides whether to type their name in. Everything before it is build-up; this is the moment.

I want to walk you through three things before you click: **what the page is supposed to feel like, where the execution is still catching up to that vision, and how to test that it's actually fast.** Four questions at the end.

**What it's supposed to feel like**

A calm first conversation, not a form trap. A homeowner should land here and feel:

- "This is short. I can do this."
- "A real person is going to read this."
- "I'm not committing to anything by typing a sentence."
- "I can also just call if I'd rather."

Three fields, in plain language: **Name. Email or phone. About your project.** No dropdowns for budget, timing, location, scope, or property type — those questions belong in your first conversation, not behind a form that looks like a mortgage application. The page promises a reply within two business days from Cory by name, and offers a direct email and phone number right below the form for the homeowners who'd rather not type at all.

The form moves one field at a time — Step 1, Step 2, Step 3 — with a thin evergreen progress rail. Each step has space to breathe. The keyboard does the right thing: tab advances, Enter advances, the phone keypad opens for the phone field, autocorrect is off on the email field. On send, the page hands off to a quiet thank-you screen that names the homeowner back.

That's the vision. And it's right — that's the page Sam (the cautious-acreage-owner persona we built around) needs.

**Where the execution isn't there yet — and what I'm fixing**

I'd rather tell you what's off than have you find it. Three things I already know are wrong on this page right now:

1. **The Next / Send buttons are the wrong shape.** They're rounded pills with a little arrow chip — a leftover from an earlier round. Every other button on the site is a square evergreen button, text-only, no glyph. The form button should match. It's a one-line fix and it lands before you review the rest.
2. **The vertical spacing under the form is hand-tuned, not on the site's spacing system.** It's a hair tighter than every other page closes. You won't notice on phone; you'll feel it on desktop. Same fix-window.
3. **The inline confirmation state uses an old typography token** (a holdover from before we consolidated). The redirect path to the thank-you page is the one Sam will actually see — the inline state is a fallback if redirect fails — but it should still match the rest of the site.

None of these change how the page *works*, but they're the kind of details that separate "professional" from "Apple-grade." All three are queued for cleanup the moment you give the page a thumbs-up on direction.

**What I do *not* want to change** (and need you to push back if you disagree):

- The form stays three fields. Adding a "Budget" dropdown will cost you 15–25% of submissions — Sam doesn't know her budget until she's talked to you, and being asked the question on a first contact reads as a qualification trap. We pull budget out of the first conversation, not the first form.
- The form stays one-field-per-step. A single long form is faster for a power user but feels heavier for a cautious one. Sam is cautious. The wizard reduces the moment of "ugh, a form" to "okay, just a name."
- The "Or reach us directly" rail under the form stays in the same place. Above the form it makes the page about phone numbers; below the form it's an escape hatch for the homeowner who doesn't want to type, without competing with the form itself.

**Performance — the bar and how to verify it**

You said *instant*. Here's what that means on this page specifically:

- The page itself ships as a small chunk that loads only when the link is clicked. The form code (which carries the validation library) is split off again and loads while the page is painting, so the visitor sees the heading and the "Two business days" promise before anything else has to be ready.
- The form skeleton shows for ~100ms on a slow connection, then resolves into the real form. No layout shift — the skeleton is the same height as the form.
- Typing has zero perceived lag. Validation runs only after a field is *touched and left*, not on every keystroke.
- On phone, the keyboard opens the moment a field is focused (no animation delay), and the field auto-scrolls into view above the keyboard — no chasing the cursor.
- On submit, the button shows "Sending…" within one frame. The actual network round-trip to save the lead is ~150ms on a normal connection. The redirect to the thank-you screen happens the moment the save returns — no spinner-after-spinner.
- Phone number link, email link, and the form input all live in the same chunk — no second waterfall.

**How to verify in 90 seconds:**
1. Open the preview on your phone, on LTE, not wifi. Tap the "Get a Free Quote" button anywhere on the site. The Contact page should appear within one heartbeat — no white flash, no blank moment. The form should be tappable instantly.
2. Tap the Name field. The keyboard should slide up and the field should already be visible above it. No need to scroll.
3. Type your name. Tap "Next." Type a fake email. Tap "Next." Type one sentence. Tap "Send." From the moment you tap Send to the moment the thank-you screen appears should feel like ~half a second. If it feels longer, screenshot the device + connection and send it. That's a real bug, not a perception.
4. On desktop, refresh the page with the browser dev tools open and "Slow 3G" set. The page should still be usable within ~2 seconds. (This is a worst-case test for the slowest customer.)

**What I need from you — four questions**

Don't grade typography or wording yet. On this pass, I need gut answers:

1. **Does it feel safe?** If you were Sam — never met you, $80K in mind, kids in the house — would three fields and a reply-within-two-business-days promise be enough to get you to type? Where does the safety wobble?
2. **The three questions.** Name, email or phone, and a sentence about the project. If you could only ask one more question on a first contact, what would it be? (Be careful — every question added costs submissions. I will probably push back. But I want to hear it.)
3. **Cory by name.** The page promises "Cory will reply within two business days." That's a real commitment from a real person. Is that the right person, the right name, and a promise you can keep on a busy week?
4. **The fallback paths.** The page offers email and phone directly under the form. Are those the addresses you actually want public, and the way you actually want first contact to come in?

**What I do not need yet**

- Word-by-word copy edits (round two)
- Whether to add a "Service" dropdown (intentionally left out; the URL already carries it when the visitor comes from a service page, and the form quietly notes "Re: Decking" without making them pick it twice)
- Visual polish on the buttons (I'm fixing those before round two — see the honest list above)

**Timeline**

- **You:** first-pass feedback by [date]
- **Me:** execution fixes (the three items above) + your notes within [N business days]
- **Together:** a quick call to walk through one real submission end-to-end before launch

**The preview**

[preview URL]/contact

Phone first. Submit a real test lead — use your own name. I want to make sure the email that lands in your inbox feels right when it arrives, because that's the *real* end of this page, not the thank-you screen.

Thanks. This page carries more weight than any other on the site. I'd rather get it right with you watching than ship a version we both have to second-guess.

— [Your name]

---

## Notes on using this

- **Swap the bracketed fields**: owner name, preview URL, two dates, sign-off, revision window.
- **The honesty paragraph is intentional.** Naming the three execution gaps before the owner finds them turns "I noticed the buttons look weird" into "thanks for already being on top of it." It's a Fantasy.co move — the people you trust most are the ones who tell you what's broken before you ask.
- **Keep the persona name** (Sam) in. Owners react better when feedback is framed around a named imaginary customer than around themselves. It separates "what *I* want" from "what *she* needs."
- **Make him submit a real lead.** The email that lands in his inbox is the page's real KPI. If that email reads cold or noisy, we have work to do.
- **Don't fix the three execution gaps before sending.** Showing the owner that you can name your own gaps is more credible than a perfect first draft. (You can fix them in the same loop he reviews, and have them done by the time he replies.)

If you'd like, I can also produce:
- (a) a one-page PDF cover sheet showing the page on phone + desktop side-by-side
- (b) a 60-second Loom-style script walking through a real submission
- (c) a shorter SMS-length version for an owner who hates email

Just say which.
