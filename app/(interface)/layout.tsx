import { Interface } from "../components/Interface";

export const dynamic = "force-dynamic";

export default function InterfaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Interface />
      {children}
    </>
  );
}
