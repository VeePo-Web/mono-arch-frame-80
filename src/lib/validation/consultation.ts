import { z } from "zod";

/**
 * Consultation form schema.
 * Mirrors the public.consultations table CHECK constraints in the database.
 *
 * The cautious-lead form is designed around two persona fears:
 *   - Quote anxiety  → budget is optional, written context preferred.
 *   - Trust          → message (textarea) replaces a categorical dropdown so
 *                      the homeowner can describe the project in their own
 *                      words; project_type is now optional.
 *
 * One field accepts email-or-phone — see contactValueSchema below.
 */
export const PROJECT_TYPES = [
  { value: "interior", label: "Interior finishing" },
  { value: "exterior", label: "Exterior finishing & repairs" },
  { value: "decking", label: "Decking" },
  { value: "multiple", label: "Multiple / phased project" },
  { value: "not-sure", label: "Not sure yet — let's talk" },
] as const;

export const BUDGET_RANGES = [
  { value: "under-25k", label: "Under $25k" },
  { value: "25-50k", label: "$25k – $50k" },
  { value: "50-100k", label: "$50k – $100k" },
  { value: "100k-plus", label: "$100k +" },
  { value: "prefer-discuss", label: "Prefer to discuss" },
] as const;

export const PREFERRED_TIMES = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "either", label: "Either works" },
] as const;

const projectTypeValues = PROJECT_TYPES.map((p) => p.value) as [string, ...string[]];
const budgetValues = BUDGET_RANGES.map((b) => b.value) as [string, ...string[]];
const preferredTimeValues = PREFERRED_TIMES.map((p) => p.value) as [string, ...string[]];

/**
 * One field, two intents — the visitor types either an email or a phone
 * number. We detect which on submit and route into the right column.
 */
const PHONE_REGEX = /^[+\d][\d\s().\-/]{6,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactKind = "email" | "phone";

export interface DetectedContact {
  kind: ContactKind;
  value: string;
}

export function detectContact(raw: string): DetectedContact | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (EMAIL_REGEX.test(trimmed)) return { kind: "email", value: trimmed.toLowerCase() };
  // Strip everything except digits + leading + so the comparison is lenient.
  const digits = trimmed.replace(/[^\d]/g, "");
  if (PHONE_REGEX.test(trimmed) && digits.length >= 7) {
    return { kind: "phone", value: trimmed };
  }
  return null;
}

export const consultationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Add your name.")
    .max(100, "Keep it under 100 characters."),
  /** Email OR phone — single field, detected at submit time. */
  contact: z
    .string()
    .trim()
    .min(3, "Email or phone.")
    .max(255)
    .refine((v) => detectContact(v) !== null, {
      message: "Check the format.",
    }),
  /** Required — the homeowner's note about the project, in their own words. */
  message: z
    .string()
    .trim()
    .min(1, "A sentence is plenty.")
    .max(2000, "Keep it under 2,000 characters."),
  /** Optional — free-text property location (e.g. "Bragg Creek"). */
  location: z.string().trim().max(200, "Please keep this short").optional(),
  /** Optional — used when the visitor lands from a service page. */
  projectType: z
    .enum(projectTypeValues, {
      errorMap: () => ({ message: "Please choose a project type" }),
    })
    .optional(),
  budget: z
    .enum(budgetValues, {
      errorMap: () => ({ message: "Please choose a budget range" }),
    })
    .optional(),
  preferredTime: z
    .enum(preferredTimeValues, {
      errorMap: () => ({ message: "Please choose a preferred time" }),
    })
    .optional(),
  // Honeypot — must be empty
  company: z.string().max(0).optional(),
});

export type ConsultationFormValues = z.infer<typeof consultationSchema>;

/** Map a `?service=` URL slug to a valid PROJECT_TYPES value (or undefined). */
export function projectTypeFromQuery(value: string | null | undefined): typeof PROJECT_TYPES[number]["value"] | undefined {
  if (!value) return undefined;
  const v = value.toLowerCase();
  const allowed = PROJECT_TYPES.map((p) => p.value) as readonly string[];
  return (allowed.includes(v) ? (v as typeof PROJECT_TYPES[number]["value"]) : undefined);
}
