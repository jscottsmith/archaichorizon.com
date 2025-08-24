"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AudioProvider } from "./contexts/AudioProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity, // Data never goes stale - stays fresh for entire session
            gcTime: 24 * 60 * 60 * 1000, // 24 hours - keep data in memory for a full day
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} position="top" /> */}
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AudioProvider />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
