/**
 * services/maps.ts
 * Google Maps / Places API helper for Booth Locator.
 * Requires: GOOGLE_MAPS_API_KEY in environment variables.
 */

const MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY ?? "";

export interface LatLng {
  lat: number;
  lng: number;
}

export interface PollingBooth {
  name: string;
  address: string;
  location: LatLng;
  distance?: string;
  placeId?: string;
}

/**
 * Find polling booths near a given coordinate using Places API (Nearby Search).
 */
export async function findNearbyBooths(
  coords: LatLng,
  radiusMeters = 5000
): Promise<PollingBooth[]> {
  if (!MAPS_API_KEY) {
    throw new Error("GOOGLE_MAPS_API_KEY is not configured.");
  }

  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
  );
  url.searchParams.set("location", `${coords.lat},${coords.lng}`);
  url.searchParams.set("radius", String(radiusMeters));
  url.searchParams.set("keyword", "polling booth election booth");
  url.searchParams.set("key", MAPS_API_KEY);

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Google Maps API request failed.");

  const data = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.results ?? []).slice(0, 10).map((place: any) => ({
    name: place.name,
    address: place.vicinity,
    location: {
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
    },
    placeId: place.place_id,
  }));
}
