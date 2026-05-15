import { StackingCards } from "@/components/templates/pk-stacking-cards";

export default function PkStackingCardsPage() {
  return (
    <main>
      {/* Top spacer — gives the section visible scroll runway from page top.
       * Pin uses default pinSpacing:true (block 32) so each pinned slide
       * auto-creates trailing whitespace; we only need a small intro buffer. */}
      <div aria-hidden style={{ height: "10vh" }} />
      <StackingCards />
      {/* Bottom spacer — extra runway after the last fade-out resolves. */}
      <div aria-hidden style={{ height: "60vh" }} />
    </main>
  );
}
