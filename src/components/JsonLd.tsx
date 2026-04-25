// Lightweight JSON-LD components — no helmet dependency, just script tags.
// Each schema object is memoised so JSON.stringify only runs when inputs change.
import { useMemo } from "react";

interface BreadcrumbItem { name: string; url: string; }

const SITE_URL = "https://havencreekrenovations.ca";

/** Render a JSON-LD <script> tag from a memoised payload. */
function JsonLdScript({ data }: { data: unknown }) {
  const json = useMemo(() => JSON.stringify(data), [data]);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

// Static payloads — defined once at module scope, never re-allocated.
const LOCAL_BUSINESS_DATA = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "Haven Creek Renovations",
  description:
    "Hands-on renovation work for rural homeowners — interior finishing, exterior finishing and repairs, and decking — across Bragg Creek, Rocky View County, Bearspaw, and Water Valley.",
  url: SITE_URL,
  image: `${SITE_URL}/apple-touch-icon.png`,
  address: {
    "@type": "PostalAddress",
    addressRegion: "AB",
    addressCountry: "CA",
  },
  areaServed: [
    { "@type": "City", name: "Bragg Creek" },
    { "@type": "AdministrativeArea", name: "Rocky View County" },
    { "@type": "City", name: "Bearspaw" },
    { "@type": "City", name: "Water Valley" },
  ],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior Finishing" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Exterior Finishing & Repairs" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Decking" } },
  ],
  slogan: "One trusted contractor for the property you value.",
} as const;

const WEBSITE_DATA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Haven Creek Renovations",
  url: SITE_URL,
  inLanguage: "en-CA",
  publisher: {
    "@type": "GeneralContractor",
    name: "Haven Creek Renovations",
  },
} as const;

export function LocalBusinessJsonLd() {
  return <JsonLdScript data={LOCAL_BUSINESS_DATA} />;
}

export function WebSiteJsonLd() {
  return <JsonLdScript data={WEBSITE_DATA} />;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    }),
    [items],
  );
  return <JsonLdScript data={data} />;
}

export function ServiceJsonLd({ name, description }: { name: string; description: string }) {
  const data = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: name,
      description,
      provider: { "@type": "GeneralContractor", name: "Haven Creek Renovations" },
      areaServed: ["Bragg Creek", "Rocky View County", "Bearspaw", "Water Valley"],
    }),
    [name, description],
  );
  return <JsonLdScript data={data} />;
}

interface FaqItem {
  question: string;
  answer: string;
}

export function FAQJsonLd({ items }: { items: FaqItem[] }) {
  const data = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    }),
    [items],
  );
  return <JsonLdScript data={data} />;
}
