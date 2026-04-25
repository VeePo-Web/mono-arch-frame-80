import { useEffect } from "react";

const BASE_TITLE = "Haven Creek Renovations";
const BASE_TAGLINE = "Trusted Renovations for Rural Homes";
const SITE_URL = "https://havencreekrenovations.ca";
const DEFAULT_IMAGE = "/apple-touch-icon.png";

export interface SeoOptions {
  /** Page title without brand suffix. Empty string falls back to base tagline. */
  title?: string;
  /** Meta description, ideally 150–160 characters. */
  description: string;
  /** Canonical path, e.g. "/" or "/about". Used for canonical + og:url. */
  path: string;
  /** Absolute or root-relative OG/Twitter image. */
  image?: string;
  /** Open Graph type. Defaults to "website". */
  type?: "website" | "article";
}

/**
 * Upserts a meta tag by attribute selector. Creates if missing, updates content if present.
 */
function upsertMeta(selector: string, attr: "name" | "property", attrValue: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

/**
 * Single SEO primitive — manages title, description, canonical, OG, and Twitter tags.
 * Idempotent: each call upserts the relevant tags and reverts the title on unmount.
 */
export function useSeo({ title, description, path, image, type = "website" }: SeoOptions) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${BASE_TITLE}` : `${BASE_TITLE} — ${BASE_TAGLINE}`;
    const canonicalUrl = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
    const imageUrl = image
      ? image.startsWith("http")
        ? image
        : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`
      : `${SITE_URL}${DEFAULT_IMAGE}`;
    const ogTitle = title || `${BASE_TITLE} — ${BASE_TAGLINE}`;

    document.title = fullTitle;

    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertCanonical(canonicalUrl);

    // Open Graph
    upsertMeta('meta[property="og:title"]', "property", "og:title", ogTitle);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
    upsertMeta('meta[property="og:type"]', "property", "og:type", type);
    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", BASE_TITLE);
    upsertMeta('meta[property="og:locale"]', "property", "og:locale", "en_CA");

    // Twitter
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", ogTitle);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", imageUrl);

    return () => {
      document.title = `${BASE_TITLE} — ${BASE_TAGLINE}`;
    };
  }, [title, description, path, image, type]);
}
