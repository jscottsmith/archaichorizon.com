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
    return `https://${process.env.VERCEL_URL}`;
  }

  // In development, use localhost
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  // Fallback for other environments
  return "http://localhost:3000";
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
    return `${baseUrl}${cleanPath}`;
  }

  // On the client side, use relative URLs
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
