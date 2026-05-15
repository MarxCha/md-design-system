import "./iphone-15.css";

export default function IPhone15Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="iphone-15-root" className="iphone-15-template bg-black text-white overflow-x-hidden select-none">
      {children}
    </div>
  );
}
