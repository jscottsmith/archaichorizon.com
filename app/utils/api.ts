/**
 * Utility functions for API URL construction
 */

/**
 * Get the base URL for the application
 * Uses VERCEL_URL in production, localhost in development
 * @returns The base URL with appropriate protocol
 */
function getBaseUrl(): string {
  // Use relative URLs for client-side usage
  if (typeof window !== "undefined") {
    return "";
  }

  // In production (Vercel), use VERCEL_URL
  if (process.env.VERCEL_URL) {
    const baseUrl = `https://${process.env.VERCEL_URL}`;
    return baseUrl;
  }

  // In development, use localhost
  if (process.env.NODE_ENV === "development") {
    const baseUrl = "http://localhost:3000";
    return baseUrl;
  }

  // Fallback for other environments
  const baseUrl = "http://localhost:3000";
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

  return `${getBaseUrl()}${cleanPath}`;
}
