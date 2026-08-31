import { cn } from "@/lib/utils";

interface ContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentWrapper(props: ContentWrapperProps) {
  return (
    <div className={cn("px-4 py-4", props.className)}>{props.children}</div>
  );
}
