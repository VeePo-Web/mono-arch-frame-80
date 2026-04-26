import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import PremiumCard from "@/components/PremiumCard";
import { useReveal } from "@/hooks/useReveal";
import ProjectPlaceholder from "./ProjectPlaceholder";
import { galleryPlates } from "@/data/galleryPlates";

const SECTION_PADDING = "py-20 md:py-40";

/**
 * SelectedWorks — § IV.b on the home page.
 * Editorial featured-plate layout: large plate on the left, clickable
 * sidebar list of supporting plates on the right. Click any sidebar
 * row to promote it. Click "Read the case note" to expand the full
 * scope/challenge/result/why-it-mattered in place.
 *
 * Visual language matches the existing ProjectVignette system —
 * single-ink architectural line drawings on warm plaster. No new deps.
 */
const SelectedWorks = () => {
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const headingId = useId();
  const expansionId = useId();
  const liveId = useId();

  const active = galleryPlates[activeIndex];

  const handlePromote = useCallback((index: number) => {
    setActiveIndex(index);
    setExpanded(false);
  }, []);

  // Auto-dismiss the "Swipe to explore" hint after 4 s, or when the user
  // first interacts with the rail.
  useEffect(() => {
    const t = setTimeout(() => setHintVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);

  // Scroll the active rail chip into view whenever the active plate changes
  // (so keyboard ←/→ navigation drags the rail along).
  useEffect(() => {
    const node = railRef.current?.querySelector<HTMLButtonElement>(
      `[data-rail-chip="${activeIndex}"]`,
    );
    node?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIndex]);

  // Arrow-key navigation across the sidebar list (desktop) and rail (mobile).
  // Both ArrowUp/Down and ArrowLeft/Right are supported so keyboards on
  // either layout work without context.
  const handleSidebarKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const isVertical = e.key === "ArrowDown" || e.key === "ArrowUp";
    const isHorizontal = e.key === "ArrowRight" || e.key === "ArrowLeft";
    if (!isVertical && !isHorizontal) return;
    e.preventDefault();
    const direction = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next =
      (activeIndex + direction + galleryPlates.length) % galleryPlates.length;
    handlePromote(next);
    // Move focus to the newly active row's button (desktop sidebar) or chip (mobile rail).
    requestAnimationFrame(() => {
      const sidebarBtn = sidebarRef.current?.querySelectorAll<HTMLButtonElement>(
        "button[data-plate-row]",
      )?.[next];
      const railBtn = railRef.current?.querySelector<HTMLButtonElement>(
        `[data-rail-chip="${next}"]`,
      );
      // Prefer whichever surface initiated the keypress.
      (sidebarBtn ?? railBtn)?.focus();
    });
  };

  return (
    <section
      ref={ref}
      data-revealed={revealed}
      id="selected-works"
      aria-labelledby={headingId}
      className={cn(SECTION_PADDING, "section-wash")}
      style={{ contentVisibility: "auto", containIntrinsicSize: "1200px 1600px" }}
    >
      <Container size="wide">
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-14 md:mb-20">
          <div
            className="lg:col-span-7"
            data-reveal
            style={{ ["--reveal-delay" as string]: "0ms" }}
          >
            <div className="flex items-start justify-between gap-6">
              <Eyebrow numeral="IV.b" label="SELECTED WORKS" />
              <span className="coord-mark hidden md:inline-flex">
                Plates IV–IX
              </span>
            </div>
            <h2
              id={headingId}
              data-drift
              className="text-headline text-foreground mt-6 max-w-[20ch]"
            >
              A closer look at six recent properties.
            </h2>
          </div>
          <div
            className="lg:col-span-5 lg:pt-8"
            data-reveal
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            <p className="text-body text-muted-foreground">
              Each plate is a record of the work — selected so the detail
              speaks. Choose a plate from the list to bring it forward;
              photographs are added as projects close.
            </p>
          </div>
        </div>

        {/* Featured plate + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-9">
          {/* ── Mobile rail — horizontal snap-scroller above the featured plate.
              Hidden on lg+, where the right-column sidebar takes over. */}
          <div
            className="lg:hidden"
            data-reveal
            style={{ ["--reveal-delay" as string]: "180ms" }}
          >
            <div
              ref={railRef}
              role="tablist"
              aria-label="Project plates"
              onKeyDown={handleSidebarKey}
              className="gallery-rail"
            >
              {galleryPlates.map((plate, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={plate.slug}
                    type="button"
                    role="tab"
                    data-rail-chip={i}
                    aria-selected={isActive}
                    aria-controls={`plate-row-${plate.slug}`}
                    onClick={() => {
                      handlePromote(i);
                      setHintVisible(false);
                    }}
                    onTouchStart={() => setHintVisible(false)}
                    className={cn(
                      "gallery-rail__chip text-left",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    )}
                  >
                    <span
                      className={cn(
                        "font-serif italic text-[0.95rem] tabular-nums leading-none transition-colors",
                        isActive ? "text-evergreen" : "text-evergreen/60",
                      )}
                    >
                      {plate.romanNumeral}
                    </span>
                    <span
                      className={cn(
                        "font-serif text-[0.95rem] leading-tight truncate transition-colors",
                        isActive ? "text-evergreen" : "text-foreground",
                      )}
                    >
                      {plate.title}
                    </span>
                    <span className="text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground truncate">
                      {plate.area}
                    </span>
                  </button>
                );
              })}
            </div>
            <p
              aria-hidden="true"
              className={cn(
                "mt-2 text-center text-[0.65rem] tracking-[0.22em] uppercase text-evergreen/60 transition-opacity duration-700",
                hintVisible ? "opacity-100" : "opacity-0",
              )}
            >
              ← Swipe to explore →
            </p>
            {/* aria-live announcement for SR users when active plate changes */}
            <p id={liveId} aria-live="polite" className="sr-only">
              {`Now showing Plate ${active.romanNumeral}: ${active.title}, ${active.area}.`}
            </p>
          </div>

          {/* ── Featured plate (left, 7/12 on lg; full-width below the rail on mobile) ─ */}
          <div
            className="lg:col-span-7"
            data-reveal
            style={{ ["--reveal-delay" as string]: "220ms" }}
          >
            <PremiumCard className="h-full">
              <div className="flex flex-col h-full">
                {/* Plate */}
                <div className="relative overflow-hidden border-b border-evergreen/10 plate-fade" key={active.slug}>
                  <ProjectPlaceholder
                    project={{
                      slug: active.slug,
                      title: active.title,
                      area: active.area,
                      category: active.category,
                      romanNumeral: active.romanNumeral,
                    }}
                    index={activeIndex}
                    className="border-b-0"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-4 right-5 text-[0.7rem] tracking-[0.18em] text-evergreen/70 font-serif italic"
                  >
                    Plate {active.romanNumeral}
                  </span>
                </div>

                {/* Caption */}
                <div className="px-8 lg:px-9 pt-6">
                  <div className="figure-footnote">
                    <span className="footnote-figmark">Fig. {active.figmark}.</span>
                    <span className="flex-1">{active.category.toUpperCase()}</span>
                    <span className="text-evergreen/80 tabular-nums normal-case tracking-[0.18em]">
                      {active.area}
                    </span>
                  </div>
                </div>

                {/* Title + scope summary */}
                <div className="p-8 lg:p-9 pt-5 flex flex-col flex-1">
                  <h3 className="text-title text-foreground">{active.title}</h3>
                  <p className="mt-5 text-body text-foreground/80 text-[0.95rem] leading-relaxed">
                    {active.scope}
                  </p>

                  {/* Read-the-case-note toggle */}
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={expansionId}
                    onClick={() => setExpanded((v) => !v)}
                    className="group/btn mt-6 inline-flex items-center gap-3 self-start text-minimal text-foreground/80 hover:text-evergreen transition-colors duration-500 focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4 focus-visible:decoration-evergreen/70"
                  >
                    <span>{expanded ? "Hide the case note" : "Read the case note"}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-500 ease-swift",
                        expanded && "rotate-180",
                      )}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Expansion panel — case note */}
                  <div
                    id={expansionId}
                    role="region"
                    aria-labelledby={headingId}
                    hidden={!expanded}
                    className={cn(
                      "mt-7 pt-7 border-t border-evergreen/15 grid grid-cols-1 sm:grid-cols-2 gap-6",
                      "case-note",
                      expanded && "case-note-open",
                    )}
                  >
                    {[
                      { n: "01", label: "Scope", body: active.scope },
                      { n: "02", label: "Challenge", body: active.challenge },
                      { n: "03", label: "Result", body: active.result },
                      { n: "04", label: "Why it mattered", body: active.whyItMattered },
                    ].map((item) => (
                      <div key={item.n}>
                        <p className="flex items-baseline gap-2 text-minimal text-evergreen mb-2">
                          <span className="numeral-mark tabular-nums">{item.n}</span>
                          <span>{item.label}</span>
                        </p>
                        <p
                          className={cn(
                            "text-body text-foreground/80 text-[0.95rem] leading-relaxed",
                            item.label === "Why it mattered" && "italic text-muted-foreground",
                          )}
                        >
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PremiumCard>
          </div>

          {/* ── Sidebar list (right, 5/12) — desktop only.
              Mobile uses the snap-rail above. */}
          <div
            className="hidden lg:block lg:col-span-5"
            data-reveal
            style={{ ["--reveal-delay" as string]: "320ms" }}
          >
            <div
              ref={sidebarRef}
              role="listbox"
              aria-label="Project plates"
              aria-activedescendant={`plate-row-${active.slug}`}
              tabIndex={-1}
              onKeyDown={handleSidebarKey}
              className="bezel-shell h-full"
            >
              <div className="bezel-core h-full p-3 md:p-4">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1">
                  {galleryPlates.map((plate, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <li key={plate.slug}>
                        <button
                          type="button"
                          data-plate-row
                          id={`plate-row-${plate.slug}`}
                          role="option"
                          aria-selected={isActive}
                          aria-pressed={isActive}
                          onClick={() => handlePromote(i)}
                          className={cn(
                            "group/row w-full text-left",
                            "flex items-start gap-4 px-3 md:px-4 py-3.5",
                            "rounded-md transition-all duration-500 ease-swift",
                            "border-l-2",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                            isActive
                              ? "bg-evergreen/[0.05] border-l-evergreen"
                              : "border-l-transparent hover:bg-foreground/[0.03]",
                          )}
                        >
                          {/* Thumb — typographic chip (no synthetic illustration) */}
                          <span
                            aria-hidden="true"
                            className={cn(
                              "shrink-0 h-14 w-14 md:h-16 md:w-16 rounded-sm overflow-hidden",
                              "ring-1 ring-evergreen/15 transition-all duration-500 ease-swift",
                              "flex items-center justify-center",
                              "bg-gradient-to-br from-card to-evergreen/[0.05]",
                              isActive && "ring-evergreen/40 from-evergreen/[0.04] to-evergreen/[0.10]",
                            )}
                          >
                            <span
                              className={cn(
                                "font-serif italic text-[1.05rem] tabular-nums transition-colors duration-500",
                                isActive ? "text-evergreen" : "text-evergreen/65",
                              )}
                            >
                              {plate.romanNumeral}
                            </span>
                          </span>

                          {/* Body */}
                          <span className="flex-1 min-w-0">
                            <span className="flex items-baseline gap-2">
                              <span
                                className={cn(
                                  "numeral-mark tabular-nums transition-colors duration-500",
                                  isActive ? "text-evergreen" : "text-evergreen/60",
                                )}
                              >
                                {plate.romanNumeral}
                              </span>
                              <span
                                className={cn(
                                  "font-serif text-[1.02rem] leading-tight truncate transition-colors duration-500",
                                  isActive
                                    ? "text-evergreen"
                                    : "text-foreground group-hover/row:text-evergreen",
                                )}
                              >
                                {plate.title}
                              </span>
                            </span>
                            <span className="mt-1 flex items-baseline gap-2 text-minimal text-muted-foreground">
                              <span className="truncate">{plate.category}</span>
                              <span aria-hidden="true" className="text-evergreen/30">·</span>
                              <span className="truncate">{plate.area}</span>
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* Sidebar footnote */}
                <p className="mt-4 px-3 md:px-4 pb-1 text-minimal text-muted-foreground/80 leading-relaxed">
                  Use ↑ / ↓ to walk the plates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SelectedWorks;
