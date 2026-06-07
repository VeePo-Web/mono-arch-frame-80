import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { UploadedProjectPhoto } from "@/assets/photography";

interface LightboxProps {
  photos: UploadedProjectPhoto[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}

/**
 * Photo lightbox — full-viewport evergreen-deep veil, single photo centered,
 * keyboard + chevron + swipe nav. Used by /work and Home RecentWorkPreview.
 */
const Lightbox = ({ photos, index, onClose, onIndexChange }: LightboxProps) => {
  const isOpen = index !== null;
  const touchStartX = useRef<number | null>(null);

  const goPrev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + photos.length) % photos.length);
  }, [index, photos.length, onIndexChange]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % photos.length);
  }, [index, photos.length, onIndexChange]);

  // keyboard + scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose, goPrev, goNext]);

  // preload neighbours
  useEffect(() => {
    if (index === null) return;
    [(index + 1) % photos.length, (index - 1 + photos.length) % photos.length].forEach((i) => {
      const img = new Image();
      img.src = photos[i].src;
    });
  }, [index, photos]);

  if (index === null) return null;
  const photo = photos[index];

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx > 0 ? goPrev : goNext)();
    touchStartX.current = null;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Project photo viewer"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-evergreen-deep/95"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <img
        key={photo.src}
        src={photo.src}
        alt={photo.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[92vw] object-contain shadow-2xl select-none animate-in fade-in duration-200"
        draggable={false}
      />

      {/* prev */}
      <button
        type="button"
        aria-label="Previous photo"
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 h-11 w-11 md:h-12 md:w-12 rounded-full bg-evergreen-foreground/[0.08] hover:bg-evergreen-foreground/[0.16] text-evergreen-foreground flex items-center justify-center transition-colors duration-300"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* next */}
      <button
        type="button"
        aria-label="Next photo"
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 h-11 w-11 md:h-12 md:w-12 rounded-full bg-evergreen-foreground/[0.08] hover:bg-evergreen-foreground/[0.16] text-evergreen-foreground flex items-center justify-center transition-colors duration-300"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* close */}
      <button
        type="button"
        aria-label="Close"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 md:top-6 md:right-6 inline-flex items-center gap-2 h-10 md:h-11 px-4 md:px-5 rounded-full bg-evergreen-foreground/[0.08] hover:bg-evergreen-foreground/[0.16] text-evergreen-foreground text-[13px] md:text-[14px] font-medium tracking-[-0.01em] transition-colors duration-300"
      >
        <X className="h-4 w-4" />
        Close
      </button>

      {/* counter */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 t-micro text-evergreen-foreground/70 tabular-nums pointer-events-none">
        {index + 1} / {photos.length}
      </div>
    </div>
  );
};

export default Lightbox;
