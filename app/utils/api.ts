/**
 * Utility functions for API URL construction
 */

/**
 * Get the base URL for the application
 * Uses VERCEL_URL in production, localhost in development
 * @returns The base URL with appropriate protocol
 */
function getBaseUrl(): string {
  // In production (Vercel), use VERCEL_URL
  if (process.env.VERCEL_URL) {
    const baseUrl = `https://${process.env.VERCEL_URL}`;
    console.log("[getBaseUrl] Using VERCEL_URL:", baseUrl);
    return baseUrl;
  }

  // In development, use localhost
  if (process.env.NODE_ENV === "development") {
    const baseUrl = "http://localhost:3000";
    console.log("[getBaseUrl] Using development localhost:", baseUrl);
    return baseUrl;
  }

  // Fallback for other environments
  const baseUrl = "http://localhost:3000";
  console.log("[getBaseUrl] Using fallback localhost:", baseUrl);
  return baseUrl;
}

/**
 * Construct a full API URL
 * @param path - The API path (e.g., '/api/collection')
 * @returns The full API URL
 */
export function getApiUrl(path: string): string {
  // For client-side usage, use relative URLs which work correctly
  // in both development and production
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // If we're on the server side, we can use the full URL
  if (typeof window === "undefined") {
    const baseUrl = getBaseUrl();
    const fullUrl = `${baseUrl}${cleanPath}`;
    console.log("[getApiUrl] Server-side URL:", {
      path,
      cleanPath,
      baseUrl,
      fullUrl,
      environment: process.env.NODE_ENV,
      hasVercelUrl: !!process.env.VERCEL_URL,
    });
    return fullUrl;
  }

  // On the client side, use relative URLs
  const relativeUrl = cleanPath;
  console.log("[getApiUrl] Client-side URL:", {
    path,
    cleanPath,
    relativeUrl,
    environment: process.env.NODE_ENV,
    isClient: typeof window !== "undefined",
  });
  return relativeUrl;
}

/**
 * Alternative approach using Next.js public environment variables:
 *
 * 1. Add to your .env.local: NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
 * 2. Replace the client-side logic with:
 *    return process.env.NEXT_PUBLIC_API_URL + cleanPath;
 *
 * This would work for both server and client, but requires manual configuration.
 */
