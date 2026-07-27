import { useSettings } from "@/hooks/useSettings";
import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { WillaDifference } from "@/components/sections/willa-difference";
import { Products } from "@/components/sections/products";
import { WhoWeServe } from "@/components/sections/who-we-serve";
import { Process } from "@/components/sections/process";
import { MeetWilla } from "@/components/sections/meet-willa";
import { Testimonials } from "@/components/sections/testimonials";
import { ServiceArea } from "@/components/sections/service-area";
import { FinalCta } from "@/components/sections/final-cta";
import { SiteFooter } from "@/components/sections/site-footer";

export default function HomePage() {
  const { settings } = useSettings();

  return (
    <>
      <SiteHeader />
      <main>
        <Hero
          headline={settings.heroHeadline}
          subhead={settings.heroSubhead}
          heroStyle={settings.heroStyle as "image" | "video"}
          heroVideoUrl={settings.heroVideoUrl}
        />
        <WillaDifference />
        <Products />
        <WhoWeServe />
        <Process />
        <MeetWilla />
        <Testimonials testimonials={settings.testimonials} />
        <ServiceArea />
        <FinalCta settings={settings} />
      </main>
      <SiteFooter settings={settings} />
    </>
  );
}
