import { cn } from "@/lib/utils";

interface ContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentWrapper(props: ContentWrapperProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[80ch] px-4 py-4", props.className)}
    >
      {props.children}
    </div>
  );
}
