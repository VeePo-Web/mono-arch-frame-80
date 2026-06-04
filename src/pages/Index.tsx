import Hero from "@/components/Hero";
import RecentWorkPreview from "@/components/RecentWorkPreview";
import PhotoBleed from "@/components/PhotoBleed";
import BigCloseCTA from "@/components/BigCloseCTA";
import { LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { photography } from "@/assets/photography";

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
      <section id="work">
        <RecentWorkPreview />
      </section>
      <PhotoBleed
        src={photography.closingPrairie}
        alt="Foothills light across an Alberta acreage at dusk"
        position="50% 60%"
      />
      <section id="contact">
        <BigCloseCTA />
      </section>
    </main>
  );
};

export default Index;

