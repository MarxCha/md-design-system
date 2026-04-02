import "./cruip-open.css";

export const metadata = {
  title: "Cruip Open — MD Design System",
  description: "Cruip Open template",
};

export default function CruipOpenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="cruip-open-root"
      className="cruip-open-template relative min-h-screen w-screen overflow-x-hidden bg-#111827"
    >
      {children}
    </div>
  );
}
