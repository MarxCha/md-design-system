import { CtaCards } from "@/components/templates/pk-cta-cards";

export default function PkCtaCardsPage() {
  return (
    <main>
      {/* Top spacer — gives the section visible scroll runway from page top.
       * The .panel pins via pinSpacing:false (block 30), so the scrollable
       * container is .usp-cards-section itself; we only need the page to be
       * tall enough to allow scrolling through it. */}
      <div aria-hidden style={{ height: "10vh" }} />
      <CtaCards />
      {/* Bottom spacer — ensures pinSpacing:false content has somewhere to flow
       * after the pin releases. */}
      <div aria-hidden style={{ height: "60vh" }} />
    </main>
  );
}
