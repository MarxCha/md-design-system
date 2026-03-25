import "./zentry.css";

export const metadata = {
  title: "Zentry — MD Design System",
  description: "Awwwards-style immersive gaming universe template",
};

export default function ZentryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="zentry-root"
      className="zentry-template relative min-h-screen w-screen overflow-x-hidden bg-zn-blue-50"
    >
      {children}
    </div>
  );
}
