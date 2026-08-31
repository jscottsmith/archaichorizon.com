import { Loader2 } from "lucide-react";
import { ContentWrapper } from "./ContentWrapper";

interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message = "Loading..." }: PageLoadingProps) {
  return (
    <ContentWrapper className="flex items-center justify-center py-16">
      <div className="flex items-center gap-2">
        <Loader2 className="inline-flex h-4 w-4 animate-spin" />
        <p className="ml-2">{message}</p>
      </div>
    </ContentWrapper>
  );
}
