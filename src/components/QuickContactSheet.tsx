import { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import Phone from "lucide-react/dist/esm/icons/phone";
import Mail from "lucide-react/dist/esm/icons/mail";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import X from "lucide-react/dist/esm/icons/x";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { detectContact } from "@/lib/validation/consultation";
import { subscribeQuickContact } from "@/lib/quickContact";

const STUDIO_PHONE_TEL = "+14039707691";
const STUDIO_PHONE_DISPLAY = "403 970-7691";
const STUDIO_EMAIL = "cory@havencreekrenovations.com";

/**
 * QuickContactSheet — mobile-only bottom-sheet contact escape hatch.
 *
 * Mounted once at the App layer; listens for a window CustomEvent
 * (`quickcontact:open`) raised by any trigger (the drawer or mobile triggers on
 * mobile, mobile-nav consultation pill, page-level FAB).
 *
 * Three escape hatches in one tap:
 *   1. Call studio (tel:)  — instant.
 *   2. Email studio (mailto:) — instant.
 *   3. Send a 3-field micro-note (name, contact, one sentence) — POSTs to
 *      Supabase consultations with source="quick_contact_sheet".
 *
 * Hidden on lg+ via the rendering surfaces' own gating; the sheet itself
 * is also forced hidden by an `lg:hidden` wrapper around the content so
 * a runaway event can't surface it on desktop.
 */
const QuickContactSheet = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<string>("quick_contact_sheet");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; contact?: string; message?: string }>({});
  const titleId = useId();
  const descId = useId();
  const initialFocusRef = useRef<HTMLAnchorElement | null>(null);

  // Subscribe to global open events
  useEffect(() => {
    return subscribeQuickContact((payload) => {
      if (payload.source) setSource(payload.source);
      // Reset previous submission state when the sheet is reopened.
      setSubmitted(false);
      setErrors({});
      setOpen(true);
    });
  }, []);

  // Detect digit-leading input so we can switch the keyboard hint.
  const looksLikePhone = /^[+\d(]/.test(contact.trim());

  const reset = () => {
    setName("");
    setContact("");
    setMessage("");
    setErrors({});
    setSubmitted(false);
  };

  const validate = () => {
    const next: typeof errors = {};
    if (!name.trim() || name.trim().length < 1) next.name = "Your name, please.";
    if (name.trim().length > 100) next.name = "Just first + last is plenty.";
    const detected = detectContact(contact);
    if (!detected) next.contact = "Email or phone, please.";
    const msg = message.trim();
    if (msg.length === 0) next.message = "A sentence is plenty.";
    if (msg.length > 2000) next.message = "Shorter, please — we'll ask follow-ups.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;

    const detected = detectContact(contact);
    if (!detected) return; // already caught above

    const emailForDb =
      detected.kind === "email"
        ? detected.value
        : `phone+${detected.value.replace(/[^\d]/g, "")}@haven-creek.lead`;

    const messageWithContact =
      detected.kind === "phone"
        ? `[Preferred contact: phone — ${detected.value}]\n\n${message.trim()}`
        : message.trim();

    setSubmitting(true);
    const { error } = await supabase.from("consultations").insert({
      name: name.trim(),
      email: emailForDb,
      message: messageWithContact,
      source,
    });
    setSubmitting(false);

    if (error) {
      console.error("Quick-contact insert failed", error);
      toast.error("We couldn't send your note. Please try again in a moment.");
      return;
    }

    setSubmitted(true);
    // Auto-close after 4.5s and toast a confirmation.
    toast.success("Thank you. We'll be in touch.");
    setTimeout(() => {
      setOpen(false);
      reset();
    }, 4500);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          // Reset after the close animation so users see a fresh sheet next time.
          setTimeout(reset, 250);
        }
      }}
    >
      <DialogPortal>
        <DialogOverlay className="lg:hidden bg-foreground/40 backdrop-blur-[2px]" />
        <DialogPrimitive.Content
          aria-labelledby={titleId}
          aria-describedby={descId}
          onOpenAutoFocus={(e) => {
            // Focus the first interactive element rather than the close button.
            e.preventDefault();
            initialFocusRef.current?.focus();
          }}
          className={cn(
            "lg:hidden",
            "fixed inset-x-0 bottom-0 z-50 max-h-[88svh] overflow-y-auto",
            "bg-background border-t border-border",
            "rounded-t-[1.25rem] shadow-[0_-12px_40px_-16px_hsl(20_8%_14%/0.25)]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            "data-[state=closed]:duration-300 data-[state=open]:duration-400",
          )}
          style={{
            paddingBottom: "max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 1rem))",
          }}
        >
          {/* Drag-handle pill — visual affordance only */}
          <div className="pt-3 pb-1 flex items-center justify-center" aria-hidden="true">
            <span className="block h-1 w-9 rounded-full bg-evergreen/30" />
          </div>

          {/* Close button — 48×48 in the top-right safe corner */}
          <DialogPrimitive.Close
            className={cn(
              "absolute top-2 right-2 inline-flex items-center justify-center h-11 w-11 rounded-full",
              "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.05]",
              "transition-colors duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
            aria-label="Close"
          >
            <X className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </DialogPrimitive.Close>

          <div className="px-5 pt-2 pb-6">
            {/* Header */}
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-evergreen/80 font-medium">
              Quick Contact
            </p>
            <DialogPrimitive.Title
              id={titleId}
              className="mt-2 font-serif text-foreground text-[1.55rem] leading-tight"
            >
              How would you like to reach us?
            </DialogPrimitive.Title>
            <DialogPrimitive.Description
              id={descId}
              className="mt-2 text-[0.92rem] text-muted-foreground leading-relaxed"
            >
              Tap to call or email — or send a short note.
            </DialogPrimitive.Description>

            {/* Tier 1 — instant action tiles */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                ref={initialFocusRef}
                href={`tel:${STUDIO_PHONE_TEL}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "group/btn flex flex-col gap-1 min-h-[68px] px-4 py-3 rounded-2xl",
                  "bg-evergreen/[0.06] border border-evergreen/15 text-foreground",
                  "active:scale-[0.98] hover:bg-evergreen/[0.10] transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
                aria-label={`Call studio at ${STUDIO_PHONE_DISPLAY}`}
              >
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-evergreen shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  <span className="text-[0.7rem] tracking-[0.22em] uppercase font-medium text-evergreen/90">Call</span>
                </span>
                <span className="font-serif text-[0.98rem] tabular-nums text-foreground/90">
                  {STUDIO_PHONE_DISPLAY}
                </span>
                <span className="text-[0.65rem] tracking-[0.16em] uppercase text-muted-foreground">
                  Mon–Fri
                </span>
              </a>
              <a
                href={`mailto:${STUDIO_EMAIL}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "group/btn flex flex-col gap-1 min-h-[68px] px-4 py-3 rounded-2xl",
                  "bg-evergreen/[0.06] border border-evergreen/15 text-foreground",
                  "active:scale-[0.98] hover:bg-evergreen/[0.10] transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
                aria-label={`Email ${STUDIO_EMAIL}`}
              >
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-evergreen shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  <span className="text-[0.7rem] tracking-[0.22em] uppercase font-medium text-evergreen/90">Email</span>
                </span>
                <span className="font-serif text-[0.95rem] text-foreground/90 truncate">
                  cory@haven…
                </span>
                <span className="text-[0.65rem] tracking-[0.16em] uppercase text-muted-foreground">
                  Reply ≤ 2 days
                </span>
              </a>
            </div>

            {/* Hairline + italic "or" */}
            <div className="mt-6 flex items-center gap-3" aria-hidden="true">
              <span className="flex-1 h-px bg-border" />
              <span className="font-serif italic text-foreground/60 text-[0.95rem]">or send a short note</span>
              <span className="flex-1 h-px bg-border" />
            </div>

            {/* Tier 2 — micro-form */}
            {submitted ? (
              <div className="mt-6 py-4" role="status" aria-live="polite">
                <p className="font-serif italic font-light text-foreground text-[1.3rem] leading-snug">
                  Thank you. We'll be in touch.
                </p>
                <p className="mt-2 text-[0.92rem] text-muted-foreground leading-relaxed">
                  We respond within two business days. This sheet will close automatically.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
                <div>
                  <label htmlFor="qc-name" className="block text-[0.7rem] tracking-[0.22em] uppercase text-foreground/70 mb-1.5">
                    Name
                  </label>
                  <input
                    id="qc-name"
                    type="text"
                    autoComplete="name"
                    enterKeyHint="next"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className={cn(
                      "flex h-12 w-full rounded-md border bg-background/60 px-3 py-2 text-base",
                      "border-foreground/10 ring-offset-background",
                      "placeholder:text-muted-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2",
                      errors.name && "border-destructive/60",
                    )}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "qc-name-err" : undefined}
                  />
                  {errors.name && (
                    <p id="qc-name-err" className="mt-1.5 text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="qc-contact" className="block text-[0.7rem] tracking-[0.22em] uppercase text-foreground/70 mb-1.5">
                    Email or phone
                  </label>
                  <input
                    id="qc-contact"
                    type={looksLikePhone ? "tel" : "email"}
                    inputMode={looksLikePhone ? "tel" : "email"}
                    autoComplete={looksLikePhone ? "tel" : "email"}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    enterKeyHint="next"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="you@example.com  ·  403 970-7691"
                    className={cn(
                      "flex h-12 w-full rounded-md border bg-background/60 px-3 py-2 text-base",
                      "border-foreground/10 ring-offset-background",
                      "placeholder:text-muted-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2",
                      errors.contact && "border-destructive/60",
                    )}
                    aria-invalid={Boolean(errors.contact)}
                    aria-describedby={errors.contact ? "qc-contact-err" : undefined}
                  />
                  {errors.contact && (
                    <p id="qc-contact-err" className="mt-1.5 text-sm text-destructive">{errors.contact}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="qc-message" className="block text-[0.7rem] tracking-[0.22em] uppercase text-foreground/70 mb-1.5">
                    About your project
                  </label>
                  <textarea
                    id="qc-message"
                    rows={3}
                    enterKeyHint="send"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="A sentence is plenty."
                    className={cn(
                      "flex min-h-[92px] w-full rounded-md border bg-background/60 px-3 py-2 text-base resize-y",
                      "border-foreground/10 ring-offset-background",
                      "placeholder:text-muted-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2",
                      errors.message && "border-destructive/60",
                    )}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "qc-message-err" : undefined}
                  />
                  {errors.message && (
                    <p id="qc-message-err" className="mt-1.5 text-sm text-destructive">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={cn(
                    "group/btn mt-2 flex items-center justify-between gap-4 w-full",
                    "bg-evergreen text-evergreen-foreground rounded-full pl-6 pr-1.5 py-1.5 min-h-[56px]",
                    "text-[1rem] font-medium",
                    "transition-all duration-300 ease-swift",
                    "active:scale-[0.98] hover:bg-evergreen-hover",
                    "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-evergreen",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                >
                  <span>{submitting ? "Sending…" : "Send a short note"}</span>
                  <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-background/15">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </button>

                <p className="text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground leading-relaxed pt-1">
                  Reply within 2 business days · No obligation
                </p>
              </form>
            )}

            {/* Foot rule — escape to the full form */}
            <div className="mt-6 pt-5 border-t border-border/60">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  // Defer navigation a tick so the close animation isn't cancelled.
                  setTimeout(() => navigate("/contact"), 240);
                }}
                className={cn(
                  "group/ghost inline-flex items-center gap-2 min-h-[44px] text-[0.7rem] tracking-[0.18em] uppercase font-medium text-foreground/75",
                  "hover:text-evergreen transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4 focus-visible:decoration-evergreen",
                )}
              >
                <span>Open the full form</span>
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              </button>
              <p className="text-[0.75rem] text-muted-foreground mt-1">
                Add timing, budget, or property location.
              </p>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default QuickContactSheet;
