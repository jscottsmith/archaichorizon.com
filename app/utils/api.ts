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
  const baseUrl = getBaseUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${cleanPath}`;
}
