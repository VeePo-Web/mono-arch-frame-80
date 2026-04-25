import { z } from "zod";

/**
 * Consultation form schema.
 * Mirrors the public.consultations table CHECK constraints in the database.
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

export const consultationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please share your name")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(255, "Email must be under 255 characters"),
  projectType: z.enum(projectTypeValues, {
    errorMap: () => ({ message: "Please choose a project type" }),
  }),
  budget: z.enum(budgetValues, {
    errorMap: () => ({ message: "Please choose a budget range" }),
  }),
  // Optional — when we should ideally walk the property
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
