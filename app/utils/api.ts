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
  // Always use relative URLs for API calls
  // This works correctly in both development and production
  // and avoids issues with server-side HTTP calls in Vercel
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  console.log("[getApiUrl] Using relative URL:", {
    path,
    cleanPath,
    environment: process.env.NODE_ENV,
    isClient: typeof window !== "undefined",
  });

  return cleanPath;
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
