/**
 * lib/utils.ts
 * Shared utility functions for NexGen Vote.
 */

/** Merge class names (lightweight clsx alternative) */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Format a date for display */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

/** Truncate text to maxLength */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

/** Delay helper (for animations / debounce) */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
