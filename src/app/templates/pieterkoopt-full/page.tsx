import { Hero } from "@/components/templates/pk-hero";
import { CtaCards } from "@/components/templates/pk-cta-cards";
import { StackingCards } from "@/components/templates/pk-stacking-cards";
import { StoriesCta } from "@/components/templates/pk-stories-cta";

import "@/app/templates/pk-hero/pk-hero.css";
import "@/app/templates/pk-cta-cards/pk-cta-cards.css";
import "@/app/templates/pk-stacking-cards/pk-stacking-cards.css";
import "@/app/templates/pk-stories-cta/pk-stories-cta.css";

export default function PieterkooptFullPage() {
  return (
    <main>
      <div className="pk-hero-template">
        <Hero />
      </div>
      <div className="pkc-cta-cards-template">
        <CtaCards />
      </div>
      <div className="pks-stacking-cards-template">
        <StackingCards />
      </div>
      <div className="psc-stories-cta-template">
        <StoriesCta />
      </div>
    </main>
  );
}
