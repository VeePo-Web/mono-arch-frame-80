# Haven Creek Renovations — Backend Knowledge System

> **Purpose.** This directory is the *intelligence layer* behind the Haven Creek Renovations website. It does not render to the front end. It exists to filter, guide, and discipline every future design, copy, UX, motion, and conversion decision so the site remains bespoke, premium, brand-aligned, and customer-true.

## How this system works

Future requests should be filtered through this knowledge system **before** any front-end change is proposed:

1. Read the prompt → identify the topic (e.g. button, hero, footer, form, voice, color, motion).
2. Open `indexes/topic-index.md` and `indexes/decision-map.md` to find the relevant source + partner documents.
3. Read the partner document first (it tells you *how* the source applies).
4. Read the source document for verbatim guidance.
5. Cross-check `indexes/priority-hierarchy.md` — the **1.3 Client Design Preferences (questionnaire)** outranks all other documents when conflicts arise.
6. Apply the filtered judgment to the front-end work.

## Folder map

```
knowledge/
├── README.md
├── source-documents/          ← VERBATIM client/strategy docs — never edit
│   ├── strategy/              ← 1.1 market dominance blueprint
│   ├── brand-identity/        ← 1.2 strategic narrative, 1.5 north star
│   ├── ui-ux/                 ← 1.3 client design preferences (HIGHEST PRIORITY)
│   ├── personas/              ← 1.4 Steady Steward Sam
│   ├── wireframes/            ← 2.1 conversion wireframe spec
│   ├── copy/                  ← 2.2 page-by-page copy plan
│   └── visual-design/         ← 2.3 full visual design plan
├── partner-documents/         ← interpretation layer (mirrors source structure)
├── indexes/
│   ├── master-index.md        ← every doc, location, governs-what
│   ├── topic-index.md         ← keyword → document map
│   ├── decision-map.md        ← if user asks X, consult Y
│   └── priority-hierarchy.md  ← which doc wins when docs conflict
└── reserved/                  ← scaffolding for future embeds
    ├── components/
    ├── animations/
    ├── navigation/
    ├── footer/
    ├── forms/
    ├── messaging/
    ├── conversion/
    └── experience-prompts/
```

## Hard rules

1. **Never edit a file in `source-documents/`.** It is verbatim client material. Adaptations belong in the partner document.
2. **Never delete a memory or partner doc to "clean up."** Mark it deprecated in the master index instead.
3. **Always consult `priority-hierarchy.md` before resolving a conflict.** The questionnaire (1.3) wins.
4. **Embedding ≠ front-end work.** Adding a doc here must not change `/src/` unless the user explicitly asks.
5. **Scale cleanly.** When a new source doc arrives, place it in the correct subfolder, write a partner doc that mirrors the path, and update all four indexes.
