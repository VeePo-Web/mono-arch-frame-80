import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BUDGET_RANGES,
  PROJECT_TYPES,
  consultationSchema,
  type ConsultationFormValues,
} from "@/lib/validation/consultation";

interface ConsultationFormProps {
  /** Lead source — recorded server-side so the team can attribute later */
  source?: string;
  className?: string;
}

/**
 * ConsultationForm — inline lead-capture for the Final CTA.
 * Editorial styling: numeral-prefixed labels, hairline-separated rows,
 * cedar pill submit, success state mirrors the figure-footnote pattern.
 *
 * Validation: zod (client) + DB CHECK constraints + RLS shape policy.
 * Honeypot field "company" must be empty — bot submissions are dropped silently.
 */
const ConsultationForm = ({ source = "home_final_cta", className }: ConsultationFormProps) => {
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null);

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: undefined as unknown as ConsultationFormValues["projectType"],
      budget: undefined as unknown as ConsultationFormValues["budget"],
      company: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: ConsultationFormValues) => {
    // Honeypot — silently succeed for bots, never hit the network
    if (values.company && values.company.length > 0) {
      setSubmittedAt(new Date());
      return;
    }

    const { error } = await supabase.from("consultations").insert({
      name: values.name,
      email: values.email,
      project_type: values.projectType,
      budget: values.budget,
      source,
    });

    if (error) {
      console.error("Consultation insert failed", error);
      toast.error("We couldn't send your note. Please try again in a moment.");
      return;
    }

    setSubmittedAt(new Date());
    toast.success("Thank you. We'll be in touch.");
  };

  // ── Success state ──────────────────────────────────────────────────────
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
        <div className="figure-footnote mt-7">
          <span className="footnote-figmark">Fig. iv.</span>
          <span className="flex-1">RECEIVED</span>
          <span className="text-evergreen/55 tabular-nums normal-case tracking-[0.18em]">
            {time}
          </span>
        </div>
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
        className={cn("space-y-5", className)}
        noValidate
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
              <FormLabel className="flex items-baseline gap-2 text-minimal text-foreground/70">
                <span className="numeral-mark tabular-nums">01</span>
                <span>Your name</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Jane Doe"
                  autoComplete="name"
                  className="h-11 bg-background/60 border-foreground/10 focus-visible:ring-evergreen/50"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1.5 pb-4 border-b border-evergreen/10">
              <FormLabel className="flex items-baseline gap-2 text-minimal text-foreground/70">
                <span className="numeral-mark tabular-nums">02</span>
                <span>Email</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="h-11 bg-background/60 border-foreground/10 focus-visible:ring-evergreen/50"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem className="space-y-1.5 pb-4 border-b border-evergreen/10">
              <FormLabel className="flex items-baseline gap-2 text-minimal text-foreground/70">
                <span className="numeral-mark tabular-nums">03</span>
                <span>Project type</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <FormControl>
                  <SelectTrigger className="h-11 bg-background/60 border-foreground/10 focus:ring-evergreen/50">
                    <SelectValue placeholder="Select a service" />
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
              <FormLabel className="flex items-baseline gap-2 text-minimal text-foreground/70">
                <span className="numeral-mark tabular-nums">04</span>
                <span>Budget range</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <FormControl>
                  <SelectTrigger className="h-11 bg-background/60 border-foreground/10 focus:ring-evergreen/50">
                    <SelectValue placeholder="Select a range" />
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

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "group/btn mt-2 flex items-center justify-between gap-4 w-full",
            "bg-evergreen text-evergreen-foreground rounded-full pl-7 pr-1.5 py-1.5 min-h-[56px] text-minimal",
            "transition-all duration-500 ease-swift",
            "hover:bg-evergreen-hover active:scale-[0.98]",
            "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-evergreen",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-evergreen-deep",
          )}
        >
          <span>{isSubmitting ? "Sending…" : "Send Consultation Request"}</span>
          <span className="icon-chip icon-chip-light bg-background/15">
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </span>
        </button>

        <p className="text-minimal text-muted-foreground leading-relaxed pt-1">
          We respond within two business days. No pressure, no automated funnel.
        </p>
      </form>
    </Form>
  );
};

export default ConsultationForm;
