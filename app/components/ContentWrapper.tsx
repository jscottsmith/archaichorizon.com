import { cn } from "@/lib/utils";

interface ContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentWrapper({ children, className }: ContentWrapperProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-4xl px-4 pb-48 pt-32 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}
