import Hero from "@/components/Hero";
import RecentWorkPreview from "@/components/RecentWorkPreview";
import BigCloseCTA from "@/components/BigCloseCTA";
import { LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";

const Index = () => {
  useSeo({
    title: "Trusted Renovations for Rural Homes",
    description:
      "Hands-on interior finishing, exterior repairs, and decking for rural and acreage homeowners across Bragg Creek, Rocky View County, Bearspaw, and Water Valley.",
    path: "/",
  });

  return (
    <main id="main">
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />

      <Hero />
      <RecentWorkPreview />
      <BigCloseCTA />
    </main>
  );
};

export default Index;
