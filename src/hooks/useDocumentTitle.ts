import { useSeo } from "./useSeo";

/**
 * Back-compat wrapper around useSeo. New code should call useSeo directly to
 * benefit from canonical / OG / Twitter management.
 */
export function useDocumentTitle(title: string, description?: string) {
  useSeo({
    title,
    description: description ?? "",
    path: typeof window !== "undefined" ? window.location.pathname : "/",
  });
}
