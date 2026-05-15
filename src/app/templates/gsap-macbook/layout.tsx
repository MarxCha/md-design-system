import "./gsap-macbook.css";

export const metadata = {
  title: "GSAP MacBook — MD Design System",
  description: "GSAP MacBook template",
};

export default function GsapMacbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="gsap-macbook-root"
      className="gsap-macbook-template relative min-h-screen w-screen overflow-x-hidden bg-black"
    >
      {children}
    </div>
  );
}
