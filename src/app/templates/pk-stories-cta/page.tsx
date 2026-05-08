import { StoriesCta } from "@/components/templates/pk-stories-cta";

export default function PkStoriesCtaPage() {
  return (
    <main>
      {/* Top spacer so the SplitText scroll-trigger has runway before reaching
       * "top 90%" — block 16 fires at the standard ScrollTrigger start. */}
      <div aria-hidden style={{ height: "30vh" }} />
      <StoriesCta />
      {/* Bottom spacer so IntersectionObserver pause-on-leave (block 25) can
       * be observed during QA. */}
      <div aria-hidden style={{ height: "60vh" }} />
    </main>
  );
}
