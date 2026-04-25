/**
 * PageSlug — fixed top-right page coordinate.
 * Tiny editorial flag like a magazine's running folio.
 * Purely decorative; aria-hidden.
 */
interface PageSlugProps {
  number?: string;
  name?: string;
}

const PageSlug = ({ number = "01", name = "Home" }: PageSlugProps) => (
  <div
    aria-hidden="true"
    className="hidden lg:flex fixed top-7 right-8 z-10 pointer-events-none items-center gap-3"
  >
    <span className="text-[9px] tracking-[0.32em] text-evergreen/55 font-sans uppercase tabular-nums">
      Page {number}
    </span>
    <span className="block h-px w-5 bg-evergreen/30" />
    <span className="text-[9px] tracking-[0.32em] text-evergreen/55 font-sans uppercase">
      {name}
    </span>
  </div>
);

export default PageSlug;
