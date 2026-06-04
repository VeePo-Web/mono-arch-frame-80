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
        src={photography.closingPhotoMoment}
        alt="A wood-clad acreage home at dusk, interior windows warm against the prairie sky"
        position="50% 65%"
      />

      <section id="contact">
        <BigCloseCTA />
      </section>
    </main>
  );
};

export default Index;

