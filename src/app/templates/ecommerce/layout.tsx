import "./ecommerce.css";

export const metadata = {
  title: "E-Commerce — MD Design System",
  description: "E-Commerce template",
};

export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="ecommerce-root"
      className="ecommerce-template relative min-h-screen w-screen overflow-x-hidden bg-white"
    >
      {children}
    </div>
  );
}
