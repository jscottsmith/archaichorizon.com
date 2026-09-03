import { cn } from "@/lib/utils";
import { panelSurface } from "./shell-classes";

type FloatingPanelProps = React.ComponentProps<"div"> & {
  as?: "div" | "aside";
};

export function FloatingPanel(props: FloatingPanelProps) {
  const { as: Comp = "div", className, ...rest } = props;

  return (
    <Comp
      className={cn(
        "rounded-2xl border shadow-[var(--shadow-panel-inset)] backdrop-saturate-150",
        panelSurface,
        className
      )}
      {...rest}
    />
  );
}
