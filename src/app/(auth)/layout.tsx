export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`w-full h-screen flex items-center justify-center bg-color-3/20`}
    >
      {children}
    </div>
  );
}
