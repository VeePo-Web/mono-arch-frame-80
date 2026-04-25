# Plan — Embed Haven Creek Backend Knowledge System

## Goal
Embed the 8 uploaded `.docx` documents (1.1–1.5, 2.1–2.3) as a backend intelligence layer that filters all future design, copy, UX, and motion decisions. **Zero changes to `/src/` or any front-end file.**

## What I'll create

### 1. `/knowledge/README.md`
System overview, folder map, hard rules (never edit source, questionnaire wins conflicts, embedding ≠ front-end work).

### 2. `/knowledge/source-documents/` — verbatim, never edited
All 8 documents stored exactly as parsed, with frontmatter (`embedded_verbatim: true`, `do_not_edit: true`):

- `strategy/1.1-market-dominance-blueprint.md`
- `brand-identity/1.2-strategic-narrative-and-brand.md`
- `ui-ux/1.3-client-design-preferences.md` ← **HIGHEST PRIORITY** (questionnaire-derived)
- `personas/1.4-steady-steward-sam-persona.md`
- `brand-identity/1.5-brand-identity-north-star.md`
- `wireframes/2.1-conversion-wireframe-spec.md`
- `copy/2.2-page-by-page-copy-plan.md`
- `visual-design/2.3-full-visual-design-plan.md`

### 3. `/knowledge/partner-documents/` — interpretation layer (mirrors source structure)
One partner doc per source, each containing:
- Document title + category
- Main purpose
- What it should influence
- Trigger prompts (what kinds of future requests should consult it)
- Which website areas it applies to
- How it guides output quality
- Brand/persona/UX/conversion relationships
- Global vs. specific scope
- Dependencies + related documents
- Practical "when to use" examples

### 4. `/knowledge/indexes/`
- `master-index.md` — every document, location, what it governs, status
- `topic-index.md` — keyword → document map (button, hero, footer, form, color, motion, voice, CTA, gallery, nav, etc.)
- `decision-map.md` — "if user asks X, consult Y in this order"
- `priority-hierarchy.md` — **1.3 questionnaire wins all conflicts**, then 1.5 North Star, then 1.2 brand, then strategy/wireframes/copy/visual

### 5. `/knowledge/reserved/` — empty scaffolding for future embeds
Placeholder `.gitkeep`-style README files in: `components/`, `animations/`, `navigation/`, `footer/`, `forms/`, `messaging/`, `conversion/`, `experience-prompts/`

## Critical rules I'll follow
1. **Verbatim source preservation** — no edits, no cleanup, no summarization inside source files
2. **No front-end changes** — `/src/`, `index.html`, `tailwind.config.ts`, etc. all untouched
3. **No changes to `mem://`** — backend knowledge lives in `/knowledge/`, not in project memory (memory is for active design rules already in production)
4. **Questionnaire (1.3) is the supreme filter** — codified in `priority-hierarchy.md`
5. **Note about "VeePo" reference**: The original prompt template mentions VeePo, but all 8 documents are clearly for **Haven Creek Renovations**. I will embed them as Haven Creek docs (since that is what the source material says) and will not invent VeePo references. No wedding references existed in the source docs to remove.

## File count
- 1 README
- 8 verbatim source docs
- 8 partner docs
- 4 index files
- 8 reserved-folder placeholder READMEs
- **Total: 29 files**

## After approval
I'll switch to default mode and create all 29 files in parallel batches. No `/src/` files will be touched.
