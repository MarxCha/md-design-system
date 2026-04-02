import "./form-builder.css";

export const metadata = {
  title: "Form Builder — MD Design System",
  description: "Form Builder template",
};

export default function FormBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="form-builder-root"
      className="form-builder-template relative min-h-screen w-screen overflow-x-hidden bg-white"
    >
      {children}
    </div>
  );
}
