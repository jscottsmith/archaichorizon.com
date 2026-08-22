// Utility function to format date to "Month day year" format.
// Parses YYYY-MM-DD as a calendar date so UTC midnight does not shift the day
// across timezones (which would cause SSR/client hydration mismatches).
export function formatDate(dateString: string): string {
  try {
    const dateOnly = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateString);
    const date = dateOnly
      ? new Date(
          Number(dateOnly[1]),
          Number(dateOnly[2]) - 1,
          Number(dateOnly[3])
        )
      : new Date(dateString);

    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid date
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString; // Return original if parsing fails
  }
}
