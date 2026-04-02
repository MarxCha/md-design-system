import "./page-ui.css";

export const metadata = {
  title: "Page UI — MD Design System",
  description: "Page UI template",
};

export default function PageUiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="page-ui-root"
      className="page-ui-template relative min-h-screen w-screen overflow-x-hidden bg-#0c0a1a"
    >
      {children}
    </div>
  );
}
