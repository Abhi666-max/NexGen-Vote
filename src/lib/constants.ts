/**
 * lib/constants.ts
 * App-wide constants for NexGen Vote.
 */

export const APP_NAME = "NexGen Vote" as const;
export const APP_DESCRIPTION =
  "Interactive EVM simulator and AI Voter Assistant" as const;
export const APP_URL = "https://nexgen-vote.vercel.app" as const;
export const DEVELOPER = "Abhijeet Kangane" as const;

/** API route prefixes */
export const API_BASE = "/api" as const;
export const GEMINI_API_ROUTE = `${API_BASE}/voter-mitra` as const;
export const MAPS_API_ROUTE   = `${API_BASE}/booth-locator` as const;

/** External links */
export const ECI_URL = "https://eci.gov.in" as const;
export const VOTER_HELPLINE = "1950" as const;
