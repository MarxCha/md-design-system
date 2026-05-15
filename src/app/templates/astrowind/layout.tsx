import "./astrowind.css";

export const metadata = {
  title: "AstroWind — MD Design System",
  description: "AstroWind template",
};

export default function AstrowindLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="astrowind-root"
      className="astrowind-template relative min-h-screen w-screen overflow-x-hidden bg-white"
    >
      {children}
    </div>
  );
}
