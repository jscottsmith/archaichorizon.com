import { cn } from "@/lib/utils";

interface ContentWrapperProps {
  children: React.ReactNode;
  className?: string;
  variant?: "page" | "panel";
}

export function ContentWrapper(props: ContentWrapperProps) {
  const variant = props.variant ?? "panel";

  return (
    <div
      className={cn(
        variant === "panel"
          ? "px-4 py-4"
          : "mx-auto w-full max-w-4xl px-4 pt-32 pb-48 sm:px-6 lg:px-8",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
