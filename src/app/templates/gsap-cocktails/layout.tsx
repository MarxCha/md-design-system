import "./gsap-cocktails.css";

export const metadata = {
  title: "GSAP Cocktails — MD Design System",
  description: "GSAP Cocktails template",
};

export default function GsapCocktailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="gsap-cocktails-root"
      className="gsap-cocktails-template relative min-h-screen w-screen overflow-x-hidden bg-black"
    >
      {children}
    </div>
  );
}
