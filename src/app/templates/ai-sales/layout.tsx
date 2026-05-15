import "./ai-sales.css";

export const metadata = {
  title: "AI Sales — MD Design System",
  description: "AI Sales template",
};

export default function AiSalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="ai-sales-root"
      className="ai-sales-template relative min-h-screen w-screen overflow-x-hidden bg-white"
    >
      {children}
    </div>
  );
}
