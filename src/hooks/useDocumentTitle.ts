import { useEffect } from "react";

const BASE_TITLE = "Haven Creek Renovations";
const BASE_TAGLINE = "Trusted Renovations for Rural Homes";

export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE_TITLE}` : `${BASE_TITLE} — ${BASE_TAGLINE}`;

    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
    }

    return () => {
      document.title = `${BASE_TITLE} — ${BASE_TAGLINE}`;
    };
  }, [title, description]);
}
