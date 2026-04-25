// Lightweight JSON-LD components — no helmet dependency, just script tags.
// useDocumentTitle handles the dynamic <title>/<meta description>.

interface BreadcrumbItem { name: string; url: string; }

const SITE_URL = "https://havencreekrenovations.ca";

export function LocalBusinessJsonLd() {
  const data = {
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
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceJsonLd({ name, description }: { name: string; description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    description,
    provider: { "@type": "GeneralContractor", name: "Haven Creek Renovations" },
    areaServed: ["Bragg Creek", "Rocky View County", "Bearspaw", "Water Valley"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

