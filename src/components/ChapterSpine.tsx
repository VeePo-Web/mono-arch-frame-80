/**
 * ChapterSpine — fixed left-margin editorial device.
 * A 1px hairline that runs the full viewport height with a vertical running header.
 * Purely decorative; aria-hidden; only visible on lg: and up.
 * The "tick" elements rendered per-section are placed by Index.tsx, not here.
 */
const ChapterSpine = () => (
  <div
    aria-hidden="true"
    className="hidden lg:block fixed top-0 bottom-0 left-8 z-10 pointer-events-none"
    style={{ width: "1px" }}
  >
    {/* The hairline itself — translucent so it reads as printed rule, not UI */}
    <div className="absolute inset-y-0 left-0 w-px bg-evergreen/20" />

    {/* Running header — vertical, mid-viewport */}
    <div
      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
      style={{
        writingMode: "vertical-rl",
        transform: "translate(-50%, -50%) rotate(180deg)",
      }}
    >
      <span className="block text-[9px] tracking-[0.32em] text-evergreen/45 font-sans uppercase">
        Haven Creek · Edition I · Home
      </span>
    </div>

    {/* Top + bottom serifs — like the heads of a printed column rule */}
    <div className="absolute -top-px left-0 -translate-x-1/2 h-px w-2 bg-evergreen/35" />
    <div className="absolute -bottom-px left-0 -translate-x-1/2 h-px w-2 bg-evergreen/35" />
  </div>
);

export default ChapterSpine;
