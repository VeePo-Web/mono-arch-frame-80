import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
import {
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
  /** DOM id for the form element — lets a sticky external button submit it. */
  formId?: string;
  /** Surface tone — "cream" (default) for the standard cream page, "dark" for the
   *  evergreen-deep right panel on /contact desktop. Only swaps colour classes. */
  tone?: "cream" | "dark";
  className?: string;
}

const RESPONSE_NOTE_ID = "consultation-response-window-note";

/**
 * ConsultationForm — single-scroll, three-field lead capture.
 *
 * Bare on the page background. No card, no progress rail, no wizard.
 * Underline inputs, big touch targets, calm motion. Submit is wired
 * through `formId` so the page can render a sticky mobile CTA that
 * submits the same logical form (and SRs hear one logical submit).
 */
const ConsultationForm = ({
  source = "home_final_cta",
  initialProjectType,
  successMode,
  formId,
  tone = "cream",
  className,
}: ConsultationFormProps) => {
  const isDark = tone === "dark";
  const labelClass = isDark ? "t-eyebrow text-evergreen-foreground/70" : "t-eyebrow text-foreground/55";
  const inputClass = isDark ? "form-field-input form-field-input--dark" : "form-field-input";
  const helperClass = isDark ? "t-micro text-evergreen-foreground/50 pt-1" : "t-micro text-muted-foreground/80 pt-1";
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

  const projectTypeWatch = form.watch("projectType");
  const projectLabel = useMemo(
    () => PROJECT_TYPES.find((p) => p.value === projectTypeWatch)?.label ?? null,
    [projectTypeWatch],
  );

  // Expose submitting state to a sticky external CTA, if present.
  const stickyRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!formId) return;
    const btn = document.querySelector<HTMLButtonElement>(
      `button[data-sticky-submit-for="${formId}"]`,
    );
    stickyRef.current = btn;
    if (!btn) return;
    btn.disabled = isSubmitting;
    btn.textContent = isSubmitting ? "Sending…" : "Send";
  }, [isSubmitting, formId]);

  const onSubmit = async (values: ConsultationFormValues) => {
    // Honeypot — silently succeed for bots, never hit the network
    if (values.company && values.company.length > 0) {
      setSubmittedAt(new Date());
      return;
    }

    const detected = detectContact(values.contact);
    if (!detected) {
      form.setError("contact", { message: "Please enter a valid email or phone number" });
      return;
    }

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
      budget: null,
      preferred_time: null,
      message: messageWithContact,
      location: null,
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

  // ── Inline success state ──────────────────────────────────────────────
  if (submittedAt) {
    const time = submittedAt.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    return (
      <div className={cn("py-2", className)} role="status" aria-live="polite">
        <p className="t-lede text-foreground/85">Thank you. We&apos;ll be in touch.</p>
        <p className="mt-3 t-body text-muted-foreground">We reply within two business days.</p>
        <p className="mt-7 t-micro text-evergreen/70 tabular-nums">Received · {time}</p>
        <button
          type="button"
          onClick={() => {
            form.reset();
            setSubmittedAt(null);
          }}
          className="mt-6 inline-flex items-center text-sm font-medium text-foreground/70 hover:text-evergreen transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        >
          Send another
        </button>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────
  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(isDark ? "space-y-7" : "space-y-10 md:space-y-12", className)}
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

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="form-field space-y-2">
              <FormLabel className={labelClass}>Name</FormLabel>
              <FormControl>
                <input
                  {...field}
                  placeholder="Jane Doe"
                  autoComplete="name"
                  enterKeyHint="next"
                  className={inputClass}
                />
              </FormControl>
              <FormMessage className="t-micro text-destructive" />
            </FormItem>
          )}
        />

        {/* Contact */}
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem className="form-field space-y-2">
              <FormLabel className={labelClass}>Email or phone</FormLabel>
              <FormControl>
                <input
                  {...field}
                  inputMode="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="you@example.com  ·  403 970-7691"
                  autoComplete="email"
                  enterKeyHint="next"
                  className={inputClass}
                />
              </FormControl>
              {!isDark && <p className={helperClass}>Only used to reply.</p>}
              <FormMessage className="t-micro text-destructive" />
            </FormItem>
          )}
        />

        {/* Project */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="form-field space-y-2">
              <div className="flex items-baseline justify-between gap-3">
                <FormLabel className={labelClass}>About your project</FormLabel>
                {projectLabel && (
                  <span className={cn("t-micro", isDark ? "text-evergreen-foreground/70" : "text-evergreen/80")}>
                    Re: {projectLabel}
                  </span>
                )}
              </div>
              <FormControl>
                <textarea
                  {...field}
                  rows={4}
                  placeholder="New deck, hoping for spring."
                  enterKeyHint="send"
                  className={cn(inputClass, "resize-y min-h-[120px]")}
                />
              </FormControl>
              <FormMessage className="t-micro text-destructive" />
            </FormItem>
          )}
        />

        {/* In-flow submit (hidden on mobile when a sticky CTA owns the action) */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-describedby={RESPONSE_NOTE_ID}
            className={cn(
              "cta-spring inline-flex items-center justify-center",
              "bg-evergreen text-evergreen-foreground rounded-lg",
              "h-12 px-6 text-[15px] font-semibold whitespace-nowrap",
              "disabled:opacity-60 disabled:cursor-not-allowed",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              formId ? "hidden md:inline-flex" : "inline-flex",
            )}
          >
            {isSubmitting ? "Sending…" : "Send"}
          </button>
          <p id={RESPONSE_NOTE_ID} className={cn("mt-4 t-micro", isDark ? "text-evergreen-foreground/55" : "text-muted-foreground")}>
            Reply within two business days.
          </p>
        </div>
      </form>
    </Form>
  );
};

export default ConsultationForm;
