## Fix `/work` grid on tablet portrait + iPad landscape

Between `md` (768px) and `lg` (1024px), the Work page falls back to a single full-width column of giant tiles because the grid jumps straight from `grid-cols-1` to `lg:grid-cols-12`. iPad landscape lands here too (the scrollbar drops effective width below 1024).

The other four routes (`/`, `/about`, `/services`, `/contact`) and the nav/footer hold up at both 820×1180 and 1024×768 — no changes needed.

### Change

**`src/pages/Work.tsx`** — add a `md` tier to the project grid only.

Replace the container className:

```
grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-16 lg:gap-y-28
```

with:

```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-16 md:gap-y-12 lg:gap-y-28
```

The existing `LAYOUTS` strings (`lg:col-span-7`, `lg:col-span-5 lg:col-start-2`, `lg:mt-24`, …) are all `lg:`-scoped, so at `md` each tile naturally falls into one of the two columns — the asymmetric magazine register only re-activates at `lg+`, exactly as today.

### Out of scope
- Mobile (`<md`) layout — unchanged.
- Desktop (`lg+`) asymmetric layout — unchanged.
- Hero, SubPageHero, About, Services, Contact, nav, footer — no changes.
- No data, no new components, no token changes.