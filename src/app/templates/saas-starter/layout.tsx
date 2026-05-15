import "./saas-starter.css";

export const metadata = {
  title: "SaaS Starter — MD Design System",
  description: "SaaS Starter template",
};

export default function SaasStarterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="saas-starter-root"
      className="saas-starter-template relative min-h-screen w-screen overflow-x-hidden bg-white"
    >
      {children}
    </div>
  );
}
