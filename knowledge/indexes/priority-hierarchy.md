# Priority Hierarchy — How to Resolve Conflicts

When two or more documents in this knowledge system give conflicting guidance, **resolve in this exact order**. Higher tiers always override lower tiers.

## Tier 0 — SUPREME FILTER

### `source-documents/ui-ux/1.3-client-design-preferences.md`
The **Client Design Preferences Extraction Report**, derived directly from the completed Haven Creek visioning questionnaire and logo.

**Why supreme:** This is the only document that captures what the client themselves selected and stated. Every other document is interpretation, strategy, or recommendation built on top of it. If anything else contradicts what the client chose in the questionnaire, the client wins.

**Things that come from 1.3 and are non-negotiable:**
- Style: warm and trustworthy, rural and grounded
- Mood: warm, trustworthy, rural, grounded, simple, elegant, durable, calm, clear
- Avoid: corporate, cold, modern-cold, busy, generic, hard-sell, cheap, urban-focused, over-designed, confusing
- First impression goal: **confidence**
- Pages requested: Home, About, Project Gallery, Services, Contact, Service Areas
- Pages NOT selected: Testimonials, FAQ, Quote Request, Process page, Rural/Acreage page (note: 1.5 overrides this last one as a content section, not a nav page)
- Service hierarchy: Interior Finishing → Exterior Finishing & Repairs → Decking
- Highest-priority service: **Interior Finishing**
- Primary CTA: **Request a Consultation**
- No pricing on the website
- Trust elements: project gallery, real work photos, simple navigation, calm layout
- Service areas: Bragg Creek, Rocky View County, Bearspaw, Water Valley

## Tier 1 — Brand Constitution

### `source-documents/brand-identity/1.5-brand-identity-north-star.md`
The North Star synthesizes everything into operating rules: brand truth table, non-negotiables, dealbreakers, voice, lexicon, decision filter, and hard guardrails.

**When 1.5 conflicts with 1.3:** 1.3 wins on stated client preferences. 1.5 wins when 1.3 is silent or when strategic survival requires it (e.g. 1.5 explicitly resolves the "no Process page" conflict by making it a *section* instead of a nav item — that's an allowed override because it doesn't add a nav page the client rejected).

**Things 1.5 controls:**
- Words Haven Creek owns vs. words to avoid
- Banned fluff patterns
- Voice traits and tone modulation
- Visual anti-patterns
- The decision filter every change must pass

## Tier 2 — Strategic Narrative & Brand

### `source-documents/brand-identity/1.2-strategic-narrative-and-brand.md`
Brand positioning, voice, messaging pillars, hero copy framework, services, taglines, mission, vision.

## Tier 3 — Persona

### `source-documents/personas/1.4-steady-steward-sam-persona.md`
The customer. Use to validate any decision: "Would Steady Steward Sam feel safer reaching out after seeing this?"

## Tier 4 — Strategy & Demand Capture

### `source-documents/strategy/1.1-market-dominance-blueprint.md`
Market analysis, competitor vulnerabilities, SEO architecture, URL structure, content pillars, conversion blueprint.

## Tier 5 — Execution Specs (equal weight)

### `source-documents/wireframes/2.1-conversion-wireframe-spec.md`
Page architecture, conversion goals, hero/CTA specs, responsive rules, micro-interactions, testing roadmap.

### `source-documents/copy/2.2-page-by-page-copy-plan.md`
Page-by-page copy structure and tone rules.

### `source-documents/visual-design/2.3-full-visual-design-plan.md`
Emotional world, visual positioning, signature moments, photography, motion, layout philosophy.

When 2.1, 2.2, and 2.3 conflict with each other, the most specific document for the topic wins (e.g. visual question → 2.3, copy question → 2.2, structure question → 2.1).

## Quick conflict examples

| Conflict | Winner | Why |
|---|---|---|
| 1.3 says no FAQ page; 2.2 suggests FAQ accordion on Contact | 1.3 wins. No FAQ page. A short "Why custom quotes?" microcopy is allowed as a single line, not an accordion section. |
| 1.5 says use "Bearspaw"; 1.2 lists "bears paw" | 1.5 wins. Use Bearspaw publicly. |
| 2.3 suggests editorial whitespace; 1.3 says simple | They agree. Spacious + simple = same direction. |
| Strategy doc suggests pricing tiers; 1.3 says no pricing | 1.3 wins. No pricing. Ever. |
| Wireframe shows urgency banner; 1.5 bans urgency | 1.5 wins. Strip it. |
| Copy doc uses "luxury"; 1.5 forbids "luxury" without proof | 1.5 wins. Replace with "refined." |

## Final test

Before shipping any change, ask:
1. Does the **client questionnaire (1.3)** support this?
2. Does the **North Star (1.5) decision filter** approve this?
3. Would **Steady Steward Sam (1.4)** feel safer reaching out after seeing this?

If any answer is no, do not ship.
