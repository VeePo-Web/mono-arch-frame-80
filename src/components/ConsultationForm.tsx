import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BUDGET_RANGES,
  PREFERRED_TIMES,
  PROJECT_TYPES,
  consultationSchema,
  detectContact,
  projectTypeFromQuery,
  type ConsultationFormValues,
} from "@/lib/validation/consultation";

interface ConsultationFormProps {
  /** Lead source — recorded server-side so the team can attribute later */
  source?: string;
  /** Pre-fill the project type, e.g. when the form is opened from a service page */
  initialProjectType?: string | null;
  /** Override the post-submit behavior. Defaults: "redirect" on /contact, "inline" elsewhere */
  successMode?: "redirect" | "inline";
  className?: string;
}

const RESPONSE_NOTE_ID = "consultation-response-window-note";

/**
 * ConsultationForm — cautious-lead lead capture.
 *
 * Field order is built around Sam's persona: minimum required friction
 * (name, contact, a written sentence about the project), then a single
 * collapsible "more context" group for type/budget/timing/location.
 *
 * The contact field accepts email OR phone — detected at submit and
 * stored in the right column. We persist a single email value into the
 * existing `email` column when the input parses as an email; when it's a
 * phone number we still store it as the `email` column value (the column
 * is the lead's primary reach-back), and the message text carries the
 * preference signal.
 *
 * Validation: zod (client) + DB CHECK constraints + RLS shape policy.
 * Honeypot field "company" must be empty — bot submissions are dropped silently.
 */
const ConsultationForm = ({
  source = "home_final_cta",
  initialProjectType,
  successMode,
  className,
}: ConsultationFormProps) => {
  const navigate = useNavigate();
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null);

  const resolvedSuccessMode: "redirect" | "inline" =
    successMode ?? (typeof window !== "undefined" && window.location.pathname === "/contact" ? "redirect" : "inline");

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      contact: "",
      message: "",
      location: "",
      projectType: projectTypeFromQuery(initialProjectType),
      budget: undefined,
      preferredTime: undefined,
      company: "",
    },
  });

  // If parent later resolves a query param after mount, honour it once.
  useEffect(() => {
    const next = projectTypeFromQuery(initialProjectType);
    if (next && form.getValues("projectType") !== next) {
      form.setValue("projectType", next, { shouldValidate: false, shouldDirty: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialProjectType]);

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: ConsultationFormValues) => {
    // Honeypot — silently succeed for bots, never hit the network
    if (values.company && values.company.length > 0) {
      setSubmittedAt(new Date());
      return;
    }

    const detected = detectContact(values.contact);
    if (!detected) {
      // Defensive — schema should already block this.
      form.setError("contact", { message: "Please enter a valid email or phone number" });
      return;
    }

    // The DB column is `email` and is required + length-checked. When the
    // visitor gives us a phone, we still need a value in `email` for the
    // RLS check; we use a deterministic placeholder + record the real
    // phone inside the message text. (A future migration can split this
    // into proper `email NULL` + `phone` columns.)
    const emailForDb =
      detected.kind === "email"
        ? detected.value
        : `phone+${detected.value.replace(/[^\d]/g, "")}@haven-creek.lead`;

    const messageWithContact =
      detected.kind === "phone"
        ? `[Preferred contact: phone — ${detected.value}]\n\n${values.message}`
        : values.message;

    const { error } = await supabase.from("consultations").insert({
      name: values.name,
      email: emailForDb,
      project_type: values.projectType ?? null,
      budget: values.budget ?? null,
      preferred_time: values.preferredTime ?? null,
      message: messageWithContact,
      location: values.location?.trim() ? values.location.trim() : null,
      source,
    });

    if (error) {
      console.error("Consultation insert failed", error);
      toast.error("We couldn't send your note. Please try again in a moment.");
      return;
    }

    const stamp = new Date();

    if (resolvedSuccessMode === "redirect") {
      try {
        navigate("/thank-you", {
          replace: true,
          state: {
            name: values.name,
            projectType: values.projectType ?? null,
            preferredTime: values.preferredTime ?? null,
            submittedAt: stamp.toISOString(),
            source,
          },
        });
        return;
      } catch (e) {
        console.warn("Redirect to /thank-you failed; falling back to inline confirmation.", e);
      }
    }

    setSubmittedAt(stamp);
    toast.success("Thank you. We'll be in touch.");
  };

  // ── Inline success state (used when successMode === "inline") ─────────
  if (submittedAt) {
    const time = submittedAt.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    return (
      <div className={cn("py-2", className)} role="status" aria-live="polite">
        <p className="font-serif italic font-light text-foreground/85 text-[1.45rem] leading-snug">
          Thank you. We&apos;ll be in touch.
        </p>
        <p className="mt-3 text-body text-muted-foreground text-[0.95rem] leading-relaxed">
          We respond within two business days. If your project is time-sensitive,
          mention it when we reach out.
        </p>
        <p className="mt-7 text-minimal text-evergreen/65 tabular-nums">
          Received · {time}
        </p>
        <button
          type="button"
          onClick={() => {
            form.reset();
            setSubmittedAt(null);
          }}
          className="group/ghost mt-6 inline-flex items-center gap-3 text-minimal text-foreground/80 hover:text-evergreen transition-colors duration-500"
        >
          <span>Send another note</span>
          <span className="block w-6 h-px bg-evergreen/50 group-hover/ghost:w-12 transition-all duration-500 ease-swift" />
        </button>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("consult-form space-y-5", className)}
        noValidate
        aria-busy={isSubmitting}
      >
        {/* Honeypot — visually hidden, off the a11y tree */}
        <div className="absolute -left-[10000px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="company-hp">Company</label>
          <input
            id="company-hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...form.register("company")}
          />
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1.5 pb-4 border-b border-evergreen/10">
              <FormLabel className="text-minimal text-foreground/70">
                Your name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Jane Doe"
                  autoComplete="name"
                  className="h-11 bg-background/60 border-foreground/10 focus-visible:ring-evergreen"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem className="space-y-1.5 pb-4 border-b border-evergreen/10">
              <FormLabel className="text-minimal text-foreground/70">
                Best way to reach you
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  inputMode="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="you@example.com  ·  or  ·  (403) 555-0100"
                  autoComplete="email"
                  className="h-11 bg-background/60 border-foreground/10 focus-visible:ring-evergreen"
                />
              </FormControl>
              <p className="text-[0.7rem] text-muted-foreground/80 leading-relaxed">
                Email or phone — whichever you prefer.
              </p>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-minimal text-foreground/70">
                What you&apos;re considering
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={4}
                  placeholder="A sentence is plenty. e.g. &ldquo;Replacing a deck on a 1990s walkout, looking to start in spring.&rdquo;"
                  className="min-h-[120px] bg-background/60 border-foreground/10 focus-visible:ring-evergreen resize-y"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Optional context — collapsed by default to reduce form anxiety */}
        <details className="group/details pt-1">
          <summary
            className={cn(
              "list-none cursor-pointer select-none",
              "inline-flex items-center gap-2 text-minimal text-foreground/65 hover:text-evergreen transition-colors duration-300",
              "focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4 focus-visible:decoration-evergreen/70",
            )}
          >
            <ChevronDown
              className="h-3.5 w-3.5 transition-transform duration-300 group-open/details:rotate-180"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span>Add timing, budget, or location context</span>
            <span className="text-[0.7rem] tracking-[0.18em] text-muted-foreground/70">OPTIONAL</span>
          </summary>

          <div className="mt-5 pt-5 border-t border-evergreen/10 space-y-5">
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-minimal text-foreground/70">Project type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <FormControl>
                      <SelectTrigger className="h-11 bg-background/60 border-foreground/10 focus:ring-evergreen">
                        <SelectValue placeholder="If you'd like to flag one" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROJECT_TYPES.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-minimal text-foreground/70">Budget range</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <FormControl>
                      <SelectTrigger className="h-11 bg-background/60 border-foreground/10 focus:ring-evergreen">
                        <SelectValue placeholder="Not sure yet — we'll discuss" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BUDGET_RANGES.map((b) => (
                        <SelectItem key={b.value} value={b.value}>
                          {b.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredTime"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-minimal text-foreground/70">Best time to walk the property</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <FormControl>
                      <SelectTrigger className="h-11 bg-background/60 border-foreground/10 focus:ring-evergreen">
                        <SelectValue placeholder="Anytime" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PREFERRED_TIMES.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-minimal text-foreground/70">Property location</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Bragg Creek · acreage near Water Valley"
                      autoComplete="address-level2"
                      className="h-11 bg-background/60 border-foreground/10 focus-visible:ring-evergreen"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </details>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-describedby={RESPONSE_NOTE_ID}
          className={cn(
            "group/btn mt-2 flex items-center justify-between gap-4 w-full",
            "bg-evergreen text-evergreen-foreground rounded-full pl-7 pr-1.5 py-1.5 min-h-[56px] text-minimal",
            "transition-all duration-500 ease-swift",
            "hover:bg-evergreen-hover active:scale-[0.98]",
            "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-evergreen",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-evergreen-deep",
          )}
        >
          <span>{isSubmitting ? "Sending…" : "Request the Conversation"}</span>
          <span className="icon-chip icon-chip-light bg-background/15">
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </span>
        </button>

        <p id={RESPONSE_NOTE_ID} className="text-minimal text-muted-foreground leading-relaxed pt-1">
          We reply within two business days. No obligation. No automated funnel.
        </p>
      </form>
    </Form>
  );
};

export default ConsultationForm;
