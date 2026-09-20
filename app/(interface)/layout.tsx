import { Background } from "../components/Background";
import { AppShell } from "../components/layout/AppShell";

export default function Interface(props: { children: React.ReactNode }) {
  return (
    <>
      <Background />
      <AppShell>{props.children}</AppShell>
    </>
  );
}
