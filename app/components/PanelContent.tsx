import { cn } from "@/lib/utils";

interface PanelContentProps {
  children: React.ReactNode;
  className?: string;
}

export function PanelContent(props: PanelContentProps) {
  return (
    <div className={cn("px-4 py-4", props.className)}>{props.children}</div>
  );
}
