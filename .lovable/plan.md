## Consultation Form on Landing Page — Editorial CTA

Replace the secondary "Talk Through Your Project" link inside the Final CTA's right-hand bezel card with a full inline consultation form. Keep the primary "Request a Consultation" button as a quick-link fallback above the form for users who'd rather land on the dedicated `/contact` page later.

### 1. Backend — `consultations` table (Lovable Cloud)

New table `public.consultations`:

| column | type | notes |
|---|---|---|
| `id` | `uuid` PK, `default gen_random_uuid()` | |
| `created_at` | `timestamptz` default `now()` | |
| `name` | `text` not null, length 1–100 (CHECK) | |
| `email` | `text` not null, length ≤ 255, regex CHECK | |
| `project_type` | `text` not null, enum-like CHECK in (`interior`, `exterior`, `decking`, `multiple`, `not-sure`) | |
| `budget` | `text` not null, enum-like CHECK in (`under-25k`, `25-50k`, `50-100k`, `100k-plus`, `prefer-discuss`) | |
| `notes` | `text` nullable, length ≤ 2000 (reserved for future use) | |
| `source` | `text` default `'home_final_cta'` | |

**RLS** enabled with two policies:
- `INSERT` allowed for `anon` + `authenticated` (public lead capture).
- `SELECT` denied to `anon`; only allowed for users with the `admin` role via the `has_role()` security-definer pattern.

Roles infrastructure: create the standard `app_role` enum, `user_roles` table, and `has_role()` SECURITY DEFINER function per the project standard. (No admin user is seeded — owner can be granted later.)

### 2. Validation — `src/lib/validation/consultation.ts`

Zod schema mirroring the DB constraints:

```ts
export const consultationSchema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  projectType: z.enum(["interior", "exterior", "decking", "multiple", "not-sure"]),
  budget: z.enum(["under-25k", "25-50k", "50-100k", "100k-plus", "prefer-discuss"]),
});
```

Both client- and pre-insert validated.

### 3. New component — `src/components/ConsultationForm.tsx`

Self-contained form using react-hook-form + zod resolver (already in the project per `Form` component). Visual notes:

- **Layout:** Single column, generous spacing inside the existing closing `bezel-shell-evergreen` card; matches Pentagram-grade editorial restraint.
- **Fields:**
  1. `Name` — `Input`, label "Your name".
  2. `Email` — `Input` type=email.
  3. `Project type` — `Select` with the five labeled options:  
     "Interior finishing", "Exterior finishing & repairs", "Decking", "Multiple / phased project", "Not sure yet — let's talk".
  4. `Budget range` — `Select` with five options:  
     "Under $25k", "$25k–$50k", "$50k–$100k", "$100k+", "Prefer to discuss".
- **Submit button:** Re-uses the cedar/evergreen pill pattern (`bg-evergreen text-evergreen-foreground rounded-full`) with the trailing `icon-chip` arrow — matches the existing "Request a Consultation" pill so the visual rhythm holds.
- **Helper text:** Microcopy under submit reads "We respond within two business days. No pressure, no automated funnel." — aligned to the brand voice rules in `2.2-page-by-page-copy-plan.md`.
- **Loading state:** Submit button disabled, replaces label with "Sending…" and a hairline progress underline.
- **Success state:** Form swaps to an editorial confirmation panel — italic Fraunces sign-off ("Thank you. We'll be in touch."), `Fig. iv —` figure-mark caption with timestamp, and a quiet `Send another note` text-link. Reuses the existing `figure-footnote` and `colophon-signoff` classes for tonal continuity.
- **Error state:** Inline field errors via `FormMessage`; a top-level alert if the insert fails (e.g., network), styled as a hairline red-tinted note (uses `text-destructive`).
- **Honeypot field:** Hidden `company` text input — bot submissions discarded client-side before insert.
- **Accessibility:** Native labels, `aria-invalid`, `aria-describedby` wired by `FormControl`. Submit button is a real `<button type="submit">` with min-height 56px to match the existing CTA pill.

### 4. Edits to `src/pages/Index.tsx`

In the Final CTA section (around lines 489–522), restructure the right-hand `bezel-shell-evergreen bezel-shell-closing` card:

- Keep the primary `Request a Consultation` Link button at the top — it remains a one-click escape hatch for users who don't want to fill the form inline.
- Keep the existing "Or" divider.
- Replace the secondary `Talk Through Your Project` link + footnote with `<ConsultationForm source="home_final_cta" />`.
- Slightly increase the card's vertical padding to accommodate the form without breaking the triple-bezel proportions (`p-7 md:p-8` → `p-7 md:p-9`).
- Manifest list on the left stays as-is; the form lives only in the right column.

### 5. Editorial details (Fantasy.co-tier polish)

- **Fieldset hairlines:** Each field group separated by 1px `border-evergreen/12` rule, mirroring the figure-footnote pattern used on project plates.
- **Numeric labels:** Each label prefixed with a tiny tabular numeral (`01 — Your name`, `02 — Email`, …) using the same `numeral-mark` class already used in the colophon. Reinforces the editorial spine without adding new tokens.
- **Drift on the form heading:** The form's "Tell us about the project" sub-heading uses `data-drift` for the same scroll-coupled 4px settle as the section H2 — keeps the kinetic vocabulary consistent.
- **Reduced motion:** All transitions respect `prefers-reduced-motion` (already global).

### 6. Files touched

| Action | Path |
|---|---|
| Migration | `consultations` table + RLS + roles infra (via Lovable migration tool) |
| New | `src/lib/validation/consultation.ts` |
| New | `src/components/ConsultationForm.tsx` |
| Edit | `src/pages/Index.tsx` (Final CTA right column only) |

### 7. Out of scope (explicit)

- No email notifications on submit. (Can add a transactional edge function in a follow-up — the table will already hold every lead.)
- No spam/captcha beyond the honeypot. (Cloudflare Turnstile is a future upgrade.)
- No edits to the dedicated `/contact` route — that page remains a placeholder for now and can be expanded later with the same `ConsultationForm` reused.
- No bundle-size regression: zod and react-hook-form are already in the bundle via shadcn `Form`.

### 8. Verification after implementation

1. `bun run build` succeeds, no TS errors.
2. Submitting a valid form inserts a row visible via `psql` / Lovable Cloud read.
3. Submitting an invalid email shows the inline `FormMessage` and never hits the network.
4. Anonymous SELECT against `consultations` returns zero rows (RLS verified).
5. Lighthouse a11y on `/` stays at 100.