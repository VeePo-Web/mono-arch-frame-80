import { useEffect, useId, useRef, useState } from "react";
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import Phone from "lucide-react/dist/esm/icons/phone";
import Mail from "lucide-react/dist/esm/icons/mail";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import X from "lucide-react/dist/esm/icons/x";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { detectContact } from "@/lib/validation/consultation";
import { subscribeQuickContact } from "@/lib/quickContact";

const STUDIO_PHONE_TEL = "+14035550100";
const STUDIO_PHONE_DISPLAY = "(403) 555-0100";
const STUDIO_EMAIL = "hello@havencreekrenovations.ca";

type Step = "invite" | "name" | "contact" | "message" | "done";

/**
 * QuickContactSheet — Fantasy.co-grade frictionless mobile contact.
 *
 * Mobile-only (lg:hidden). Mounted once at App layer; listens for the
 * global `quickcontact:open` event. Three escape hatches in one tap:
 *
 *   1. "Begin" → progressive 1-question-at-a-time form (name, contact,
 *       message). One field per screen, large type, generous breathing.
 *   2. Tap-to-call (tel:) — instant.
 *   3. Tap-to-email (mailto:) — instant.
 *
 * Form posts to `consultations` with source="quick_contact_sheet" (or the
 * payload-supplied source). The sheet handles its own back/forward state
 * with subtle slide+fade transitions that honor prefers-reduced-motion.
 */
const QuickContactSheet = () => {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<string>("quick_contact_sheet");
  const [step, setStep] = useState<Step>("invite");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; contact?: string; message?: string }>({});
  const [dragY, setDragY] = useState(0);
  const titleId = useId();
  const liveId = useId();
  const beginRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const dragStateRef = useRef<{ y: number; t: number; active: boolean } | null>(null);

  // Subscribe to global open events
  useEffect(() => {
    return subscribeQuickContact((payload) => {
      if (payload.source) setSource(payload.source);
      setStep("invite");
      setErrors({});
      setOpen(true);
    });
  }, []);

  // Smart keyboard hint — phone vs email
  const looksLikePhone = /^[+\d(]/.test(contact.trim());

  // Focus management — move focus to the new question's primary input
  // after each step transition, deferred so the slide animation completes
  // *before* the keyboard rises. (260ms > 220ms qc-step-in.)
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      if (step === "invite") beginRef.current?.focus();
      else if (step === "name" || step === "contact") inputRef.current?.focus();
      else if (step === "message") textRef.current?.focus();
    }, 260);
    return () => clearTimeout(t);
  }, [step, open]);

  // Swipe-to-dismiss — pointer drag from the top ~90px of the sheet
  // (handle + top bar zone). >120px or velocity >0.5 px/ms closes.
  // Scoped to that strip so textarea scroll on the message step is unaffected.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const localY = e.clientY - rect.top;
    if (localY > 90) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragStateRef.current = { y: e.clientY, t: performance.now(), active: true };
    target.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragStateRef.current;
    if (!s?.active) return;
    const dy = Math.max(0, e.clientY - s.y);
    setDragY(dy);
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragStateRef.current;
    if (!s?.active) {
      setDragY(0);
      return;
    }
    const dy = Math.max(0, e.clientY - s.y);
    const dt = Math.max(1, performance.now() - s.t);
    const v = dy / dt; // px per ms
    dragStateRef.current = null;
    setDragY(0);
    if (dy > 120 || v > 0.5) setOpen(false);
  };

  const reset = () => {
    setStep("invite");
    setName("");
    setContact("");
    setMessage("");
    setErrors({});
  };

  const goNext = () => {
    if (step === "invite") return setStep("name");
    if (step === "name") {
      const trimmed = name.trim();
      if (!trimmed) return setErrors({ name: "Your name, please." });
      if (trimmed.length > 100) return setErrors({ name: "Just first + last is plenty." });
      setErrors({});
      return setStep("contact");
    }
    if (step === "contact") {
      const detected = detectContact(contact);
      if (!detected) return setErrors({ contact: "Email or phone, please." });
      setErrors({});
      return setStep("message");
    }
  };

  const goBack = () => {
    if (step === "name") return setStep("invite");
    if (step === "contact") return setStep("name");
    if (step === "message") return setStep("contact");
  };

  const submit = async () => {
    const detected = detectContact(contact);
    if (!detected) return setErrors({ contact: "Email or phone, please." });
    const msg = message.trim();
    if (!msg) return setErrors({ message: "A sentence is plenty." });
    if (msg.length > 2000) return setErrors({ message: "Shorter, please — we'll ask follow-ups." });

    const emailForDb =
      detected.kind === "email"
        ? detected.value
        : `phone+${detected.value.replace(/[^\d]/g, "")}@haven-creek.lead`;

    const messageWithContact =
      detected.kind === "phone"
        ? `[Preferred contact: phone — ${detected.value}]\n\n${msg}`
        : msg;

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

    setStep("done");
    toast.success("Thank you. We'll be in touch shortly.");
    setTimeout(() => {
      setOpen(false);
      setTimeout(reset, 280);
    }, 3800);
  };

  // Live-region announcements for step transitions
  const liveText = (() => {
    switch (step) {
      case "invite":
        return "Quick contact sheet opened.";
      case "name":
        return "Step 1 of 3: what is your name?";
      case "contact":
        return "Step 2 of 3: how can we reach you?";
      case "message":
        return "Step 3 of 3: tell us a sentence about the project.";
      case "done":
        return "Thank you. We will be in touch.";
    }
  })();

  // Progress dot index (0-based, only on form steps)
  const stepIndex = step === "name" ? 0 : step === "contact" ? 1 : step === "message" ? 2 : -1;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setTimeout(reset, 280);
      }}
    >
      <DialogPortal>
        <DialogOverlay
          className={cn(
            "lg:hidden bg-foreground/45 backdrop-blur-[3px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "data-[state=open]:duration-400 data-[state=closed]:duration-300",
          )}
        />
        <DialogPrimitive.Content
          aria-labelledby={titleId}
          aria-describedby={liveId}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            // Manual focus so the close button isn't the initial target
            beginRef.current?.focus();
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={cn(
            "lg:hidden",
            "fixed inset-x-0 bottom-0 z-50 max-h-[88svh] overflow-y-auto",
            "bg-background border-t border-border/70",
            "rounded-t-[1.5rem]",
            "shadow-[0_-1px_0_hsl(36_25%_99%/0.6)_inset,0_-12px_44px_-18px_hsl(20_8%_14%/0.22)]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            "data-[state=closed]:duration-300 data-[state=open]:duration-[420ms]",
            "qc-sheet touch-pan-y",
          )}
          style={{
            paddingBottom: "max(1.75rem, calc(env(safe-area-inset-bottom, 0px) + 1.25rem))",
            transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
            transition: dragY > 0 ? "none" : undefined,
          }}
        >
          {/* Drag handle pill — also a tap-to-dismiss target. */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className={cn(
              "block w-full pt-3 pb-1.5 flex items-center justify-center",
              "focus-visible:outline-none focus-visible:bg-foreground/[0.02]",
            )}
          >
            <span aria-hidden="true" className="block h-1.5 w-12 rounded-full bg-evergreen/40" />
          </button>

          {/* Top bar — back arrow (when past invite) + close. Progress moved
              under the question, so this row is clean on form steps. */}
          <div className="relative h-12 px-2">
            {step !== "invite" && step !== "done" && (
              <button
                type="button"
                onClick={goBack}
                aria-label="Go back"
                className={cn(
                  "absolute left-2 top-1/2 -translate-y-1/2",
                  "inline-flex items-center justify-center h-11 w-11 rounded-full",
                  "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.05]",
                  "transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </button>
            )}

            <DialogPrimitive.Close
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2",
                "inline-flex items-center justify-center h-11 w-11 rounded-full",
                "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.05]",
                "transition-colors duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
              aria-label="Close"
            >
              <X className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </DialogPrimitive.Close>
          </div>

          {/* Live region for screen readers */}
          <p id={liveId} role="status" aria-live="polite" className="sr-only">
            {liveText}
          </p>

          <div className="px-6 pt-4 pb-2">
            {/* ── STEP: invite ─────────────────────────────────────────── */}
            {step === "invite" && (
              <div key="invite" className="qc-step">
                <DialogPrimitive.Title
                  id={titleId}
                  className="font-serif text-foreground leading-[1.12] max-w-[18ch]"
                  style={{ fontSize: "clamp(1.55rem, 6.5vw, 1.85rem)" }}
                >
                  Let&rsquo;s start a conversation.
                </DialogPrimitive.Title>
                <p className="mt-3 text-[0.95rem] text-muted-foreground leading-relaxed max-w-[36ch]">
                  Tell us about the project. We reply within two business days.
                </p>

                <button
                  ref={beginRef}
                  type="button"
                  onClick={goNext}
                  className={cn(
                    "group/btn mt-7 flex items-center justify-between gap-4 w-full",
                    "bg-evergreen text-evergreen-foreground rounded-full pl-6 pr-1.5 py-1.5 min-h-[60px]",
                    "text-[1rem] font-medium",
                    "transition-all duration-300 ease-out",
                    "active:scale-[0.98] hover:bg-evergreen-hover",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                >
                  <span>Begin</span>
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-background/15">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </button>

                {/* Hairline seam — softer copy than before. */}
                <div className="mt-7 flex items-center gap-3" aria-hidden="true">
                  <span className="flex-1 h-px bg-border" />
                  <span className="font-serif italic text-foreground/55 text-[0.85rem]">
                    or reach us directly
                  </span>
                  <span className="flex-1 h-px bg-border" />
                </div>

                {/* Ghost rows — single line each, no duplicate eyebrows. */}
                <ul className="mt-3 -mx-1">
                  <li>
                    <a
                      href={`tel:${STUDIO_PHONE_TEL}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group/row flex items-center gap-4 min-h-[60px] px-3 rounded-xl",
                        "text-foreground hover:bg-foreground/[0.03] active:bg-foreground/[0.05]",
                        "transition-colors duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      )}
                      aria-label={`Call studio at ${STUDIO_PHONE_DISPLAY}`}
                    >
                      <Phone className="h-4 w-4 text-evergreen/80 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                      <span className="flex-1 font-serif text-[1.05rem] tabular-nums text-foreground/90">
                        {STUDIO_PHONE_DISPLAY}
                      </span>
                      <ChevronRight
                        className="h-4 w-4 text-foreground/40 transition-transform duration-300 group-hover/row:translate-x-0.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                  <li className="border-t border-border/50">
                    <a
                      href={`mailto:${STUDIO_EMAIL}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group/row flex items-center gap-4 min-h-[60px] px-3 rounded-xl",
                        "text-foreground hover:bg-foreground/[0.03] active:bg-foreground/[0.05]",
                        "transition-colors duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      )}
                      aria-label={`Email ${STUDIO_EMAIL}`}
                    >
                      <Mail className="h-4 w-4 text-evergreen/80 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                      <span className="flex-1 font-serif text-[1.05rem] text-foreground/90 truncate">
                        hello@havencreek…
                      </span>
                      <ChevronRight
                        className="h-4 w-4 text-foreground/40 transition-transform duration-300 group-hover/row:translate-x-0.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            )}

            {/* ── STEP: name ─────────────────────────────────────────── */}
            {step === "name" && (
              <div key="name" className="qc-step">
                <div className="qc-progress" aria-hidden="true">
                  <span data-state="active" />
                  <span />
                  <span />
                </div>
                <h2
                  id={titleId}
                  className="mt-3 font-serif text-foreground text-[1.65rem] leading-[1.15] max-w-[18ch]"
                >
                  What&rsquo;s your name?
                </h2>
                <DialogPrimitive.Title className="sr-only">Your name</DialogPrimitive.Title>

                <div className="mt-7">
                  <label htmlFor="qc-name" className="sr-only">Your name</label>
                  <input
                    id="qc-name"
                    ref={inputRef}
                    type="text"
                    autoComplete="name"
                    enterKeyHint="next"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        goNext();
                      }
                    }}
                    placeholder="Jane Doe"
                    className={cn(
                      "flex h-14 w-full rounded-lg border bg-background/60 px-4 py-2",
                      "font-serif text-[1.2rem] text-foreground",
                      "border-foreground/10 ring-offset-background",
                      "placeholder:text-muted-foreground/60 placeholder:font-sans placeholder:text-base",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2",
                      errors.name && "border-destructive/60",
                    )}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "qc-name-err" : undefined}
                  />
                  {errors.name && (
                    <p id="qc-name-err" className="mt-2 text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  className={cn(
                    "group/btn mt-7 flex items-center justify-between gap-4 w-full",
                    "bg-evergreen text-evergreen-foreground rounded-full pl-6 pr-1.5 py-1.5 min-h-[60px]",
                    "text-[1rem] font-medium",
                    "transition-all duration-300 ease-out",
                    "active:scale-[0.98] hover:bg-evergreen-hover",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                >
                  <span>Continue</span>
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-background/15">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </button>
              </div>
            )}

            {/* ── STEP: contact ──────────────────────────────────────── */}
            {step === "contact" && (
              <div key="contact" className="qc-step">
                <div className="qc-progress" aria-hidden="true">
                  <span data-state="done" />
                  <span data-state="active" />
                  <span />
                </div>
                <h2 className="mt-3 font-serif text-foreground text-[1.65rem] leading-[1.15] max-w-[18ch]">
                  How can we reach you?
                </h2>

                <div className="mt-7">
                  <label htmlFor="qc-contact" className="sr-only">Email or phone</label>
                  <input
                    id="qc-contact"
                    ref={inputRef}
                    type={looksLikePhone ? "tel" : "email"}
                    inputMode={looksLikePhone ? "tel" : "email"}
                    autoComplete={looksLikePhone ? "tel" : "email"}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    enterKeyHint="next"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        goNext();
                      }
                    }}
                    placeholder="you@example.com  or  (403) 555-0100"
                    className={cn(
                      "flex h-14 w-full rounded-lg border bg-background/60 px-4 py-2",
                      "font-serif text-[1.2rem] text-foreground",
                      "border-foreground/10 ring-offset-background",
                      "placeholder:text-muted-foreground/60 placeholder:font-sans placeholder:text-base",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2",
                      errors.contact && "border-destructive/60",
                    )}
                    aria-invalid={Boolean(errors.contact)}
                    aria-describedby={errors.contact ? "qc-contact-err" : "qc-contact-help"}
                  />
                  <p id="qc-contact-help" className="mt-2 text-[0.8rem] text-muted-foreground/85">
                    Email or phone — whichever you prefer.
                  </p>
                  {errors.contact && (
                    <p id="qc-contact-err" className="mt-1 text-sm text-destructive">{errors.contact}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  className={cn(
                    "group/btn mt-7 flex items-center justify-between gap-4 w-full",
                    "bg-evergreen text-evergreen-foreground rounded-full pl-6 pr-1.5 py-1.5 min-h-[60px]",
                    "text-[1rem] font-medium",
                    "transition-all duration-300 ease-out",
                    "active:scale-[0.98] hover:bg-evergreen-hover",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                >
                  <span>Continue</span>
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-background/15">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </button>
              </div>
            )}

            {/* ── STEP: message ──────────────────────────────────────── */}
            {step === "message" && (
              <div key="message" className="qc-step">
                <p className="text-[0.68rem] tracking-[0.22em] uppercase text-evergreen/75 font-medium">
                  Step 3 of 3
                </p>
                <h2 className="mt-3 font-serif text-foreground text-[1.65rem] leading-[1.15] max-w-[20ch]">
                  Tell us a sentence about the project.
                </h2>

                <div className="mt-7">
                  <label htmlFor="qc-message" className="sr-only">One sentence about the project</label>
                  <textarea
                    id="qc-message"
                    ref={textRef}
                    rows={4}
                    enterKeyHint="send"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="A sentence is plenty."
                    className={cn(
                      "flex min-h-[120px] w-full rounded-lg border bg-background/60 px-4 py-3",
                      "text-[1.05rem] text-foreground resize-y",
                      "border-foreground/10 ring-offset-background",
                      "placeholder:text-muted-foreground/60",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2",
                      errors.message && "border-destructive/60",
                    )}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "qc-message-err" : undefined}
                  />
                  {errors.message && (
                    <p id="qc-message-err" className="mt-2 text-sm text-destructive">{errors.message}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className={cn(
                    "group/btn mt-7 flex items-center justify-between gap-4 w-full",
                    "bg-evergreen text-evergreen-foreground rounded-full pl-6 pr-1.5 py-1.5 min-h-[60px]",
                    "text-[1rem] font-medium",
                    "transition-all duration-300 ease-out",
                    "active:scale-[0.98] hover:bg-evergreen-hover",
                    "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-evergreen",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                >
                  <span>{submitting ? "Sending…" : "Send"}</span>
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-background/15">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </button>

                <p className="mt-3 text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground/85 leading-relaxed">
                  Reply within 2 business days · No obligation
                </p>
              </div>
            )}

            {/* ── STEP: done ─────────────────────────────────────────── */}
            {step === "done" && (
              <div key="done" className="qc-step py-2" role="status" aria-live="polite">
                <p className="font-serif italic font-light text-foreground text-[1.55rem] leading-snug qc-shimmer">
                  Thank you. We&rsquo;ll be in touch.
                </p>
                <p className="mt-3 text-[0.95rem] text-muted-foreground leading-relaxed">
                  We respond within two business days. This sheet will close on its own.
                </p>
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default QuickContactSheet;
