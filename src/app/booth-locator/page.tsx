"use client";

/**
 * Booth Locator — Find Your Polling Station
 * Developed and Architected by Abhijeet Kangane
 * NexGen Vote — Election Education Platform
 */

import { useState, useCallback } from "react";

type Booth = {
  id: number;
  name: string;
  address: string;
  ward: string;
  distance: string;
  accessible: boolean;
  hours: string;
  voters: number;
};

/* ── Dummy booth data keyed by pincode prefix ── */
const BOOTH_DB: Record<string, Booth[]> = {
  default: [
    { id: 1, name: "Zila Parishad Primary School", address: "Sector 12, Near Main Market", ward: "Ward 04", distance: "0.4 km", accessible: true, hours: "7:00 AM – 6:00 PM", voters: 1240 },
    { id: 2, name: "Government Higher Secondary School", address: "Gandhi Nagar, Block B", ward: "Ward 04", distance: "0.9 km", accessible: true, hours: "7:00 AM – 6:00 PM", voters: 980 },
    { id: 3, name: "Municipal Corporation Building", address: "Civil Lines, Opp. Bus Stand", ward: "Ward 05", distance: "1.2 km", accessible: false, hours: "7:00 AM – 6:00 PM", voters: 1560 },
    { id: 4, name: "Community Centre Hall", address: "Rajiv Colony, Near Park", ward: "Ward 05", distance: "1.8 km", accessible: true, hours: "7:00 AM – 6:00 PM", voters: 870 },
    { id: 5, name: "Panchayat Bhawan", address: "Village Road, Old Town", ward: "Ward 06", distance: "2.3 km", accessible: false, hours: "7:00 AM – 6:00 PM", voters: 1100 },
  ],
};
const BOOTHS_DELHI = BOOTH_DB.default;

/* ── Static map placeholder with booth pins ── */
function MapPlaceholder({ booths, selected, onSelect }: { booths: Booth[]; selected: number | null; onSelect: (id: number) => void }) {
  // Deterministic positions for each booth on the placeholder map
  const POSITIONS = [
    { x: 30, y: 35 }, { x: 55, y: 55 }, { x: 70, y: 28 },
    { x: 42, y: 70 }, { x: 78, y: 60 },
  ];

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden"
      style={{
        height: "min(420px, 55vw)",
        background: "linear-gradient(145deg, hsl(220,18%,13%) 0%, hsl(220,22%,10%) 100%)",
        border: "1px solid var(--color-border)",
      }}
      role="img"
      aria-label="Interactive polling booth map — click pins to select a booth"
    >
      {/* Grid lines — fake map roads */}
      <svg className="absolute inset-0 w-full h-full opacity-10" aria-hidden="true">
        {[15,30,45,60,75,90].map(p => (
          <g key={p}>
            <line x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" stroke="hsl(220,40%,60%)" strokeWidth="1" />
            <line x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke="hsl(220,40%,60%)" strokeWidth="1" />
          </g>
        ))}
      </svg>

      {/* Road highlights */}
      <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true">
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="hsl(220,60%,70%)" strokeWidth="3" />
        <line x1="40%" y1="0" x2="40%" y2="100%" stroke="hsl(220,60%,70%)" strokeWidth="2" />
        <line x1="75%" y1="0" x2="75%" y2="100%" stroke="hsl(220,60%,70%)" strokeWidth="2" />
      </svg>

      {/* Map label */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold" style={{ background: "hsl(220,75%,48%,0.18)", border: "1px solid hsl(220,75%,48%,0.3)", color: "var(--color-primary)" }} aria-live="polite">
        🗺️ {booths.length} Booths Found
      </div>

      {/* Attribution */}
      <div className="absolute bottom-4 right-4 text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(0,0,0,0.5)", color: "hsl(220,15%,60%)" }} aria-hidden="true">
        Google Maps API Ready
      </div>

      {/* Booth pins */}
      {booths.map((booth, i) => {
        const pos = POSITIONS[i] || { x: 50, y: 50 };
        const isSelected = selected === booth.id;
        return (
          <button
            key={booth.id}
            onClick={() => onSelect(booth.id)}
            aria-label={`Select ${booth.name} — ${booth.distance} away${booth.accessible ? ", wheelchair accessible" : ""}`}
            aria-pressed={isSelected}
            className="absolute focus-ring transition-all duration-200"
            style={{
              left: `${pos.x}%`, top: `${pos.y}%`,
              transform: `translate(-50%, -100%) scale(${isSelected ? 1.25 : 1})`,
              zIndex: isSelected ? 10 : 5,
            }}
          >
            <div
              className="flex flex-col items-center"
              style={{ filter: isSelected ? "drop-shadow(0 0 10px hsl(220,75%,48%))" : "none" }}
            >
              <div
                className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-base font-bold text-white transition-all"
                style={{
                  background: isSelected
                    ? "linear-gradient(135deg, var(--color-primary), hsl(240,70%,58%))"
                    : booth.accessible
                    ? "hsl(142,65%,36%)"
                    : "hsl(28,80%,42%)",
                  borderColor: isSelected ? "white" : "transparent",
                }}
              >
                {i + 1}
              </div>
              <div
                className="w-0 h-0"
                style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: isSelected ? "8px solid hsl(220,75%,48%)" : booth.accessible ? "8px solid hsl(142,65%,36%)" : "8px solid hsl(28,80%,42%)" }}
                aria-hidden="true"
              />
            </div>
          </button>
        );
      })}

      {/* User location pin */}
      <div
        className="absolute animate-pulse-soft"
        style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
        aria-label="Your approximate location"
        role="img"
      >
        <div className="w-4 h-4 rounded-full border-3 border-white" style={{ background: "hsl(220,75%,65%)", boxShadow: "0 0 0 8px hsl(220,75%,48%,0.2)", border: "3px solid white" }} />
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 text-xs" aria-label="Map legend" role="note">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ background: "rgba(0,0,0,0.6)", color: "white" }}>
          <div className="w-3 h-3 rounded-full" style={{ background: "hsl(142,65%,36%)" }} aria-hidden="true" />
          Accessible
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ background: "rgba(0,0,0,0.6)", color: "white" }}>
          <div className="w-3 h-3 rounded-full" style={{ background: "hsl(28,80%,42%)" }} aria-hidden="true" />
          Standard
        </div>
      </div>
    </div>
  );
}

/* ── Booth card ── */
function BoothCard({ booth, isSelected, onSelect }: { booth: Booth; isSelected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      aria-label={`${booth.name}, ${booth.distance} away, Ward ${booth.ward}${booth.accessible ? ", wheelchair accessible" : ""}`}
      aria-pressed={isSelected}
      className="w-full text-left rounded-2xl p-4 transition-all duration-200 focus-ring"
      style={{
        background: isSelected ? "hsl(220,75%,48%,0.08)" : "var(--color-bg-secondary)",
        border: isSelected ? "1.5px solid hsl(220,75%,48%,0.4)" : "1px solid var(--color-border-subtle)",
        boxShadow: isSelected ? "0 0 20px -6px hsl(220,75%,48%,0.25)" : "none",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white"
          style={{ background: isSelected ? "linear-gradient(135deg, var(--color-primary), hsl(240,70%,58%))" : "var(--color-bg-tertiary)", color: isSelected ? "#fff" : "var(--color-text-muted)" }}
          aria-hidden="true"
        >
          {booth.id}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <p className="font-semibold text-sm truncate" style={{ color: "var(--color-text-primary)" }}>{booth.name}</p>
            {booth.accessible && (
              <span className="flex-shrink-0 text-xs px-1.5 py-0.5 rounded-md font-medium" style={{ background: "hsl(142,65%,40%,0.12)", color: "var(--color-success)", border: "1px solid hsl(142,65%,40%,0.2)" }} aria-label="Wheelchair accessible">
                ♿ Accessible
              </span>
            )}
          </div>
          <p className="text-xs truncate" style={{ color: "var(--color-text-muted)" }}>{booth.address}</p>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="text-xs flex items-center gap-1" style={{ color: "var(--color-primary)" }}>
              📍 {booth.distance}
            </span>
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Ward {booth.ward}</span>
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{booth.voters} voters</span>
          </div>
        </div>
      </div>
      {isSelected && (
        <div className="mt-3 pt-3 grid grid-cols-2 gap-2" style={{ borderTop: "1px solid hsl(220,75%,48%,0.15)" }}>
          <a
            href={`https://www.google.com/maps/search/${encodeURIComponent(booth.name + " " + booth.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold focus-ring"
            style={{ background: "var(--color-primary)", color: "#fff", textDecoration: "none" }}
            aria-label={`Get directions to ${booth.name} (opens Google Maps)`}
          >
            🗺️ Get Directions
          </a>
          <div className="flex items-center justify-center gap-1 py-2 rounded-xl text-xs" style={{ background: "var(--color-bg-tertiary)", color: "var(--color-text-secondary)" }}>
            🕖 {booth.hours}
          </div>
        </div>
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function BoothLocatorPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [booths, setBooths] = useState<Booth[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSelected(null);
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 900));
    setBooths(BOOTH_DB.default);
    setSearched(true);
    setLoading(false);
  }, [query]);

  return (
    <main id="main-content" role="main" aria-labelledby="booth-heading" style={{ background: "var(--color-bg)", minHeight: "calc(100dvh - 64px)" }}>

      {/* ── Page Header ── */}
      <div className="text-center py-12" style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border-subtle)" }}>
        <div className="container-app">
          <span className="text-5xl mb-3 block animate-float" aria-hidden="true">📍</span>
          <h1 id="booth-heading" className="font-display font-bold text-3xl sm:text-4xl gradient-text mb-2">Booth Locator</h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: "var(--color-text-secondary)" }}>
            Find your nearest polling station. Search by pincode or area name.
          </p>
        </div>
      </div>

      <div className="container-app py-8">

        {/* ── Search bar ── */}
        <form onSubmit={handleSearch} aria-label="Search for polling booths" className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none" aria-hidden="true">🔍</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter pincode or area (e.g. 110001, Connaught Place)"
                aria-label="Enter your pincode or area name to find polling booths"
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-sm transition-all focus-ring"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-primary)",
                  outline: "none",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
              />
            </div>
            <button
              type="submit"
              disabled={!query.trim() || loading}
              aria-label={loading ? "Searching for booths..." : "Search for polling booths"}
              className="px-6 py-4 rounded-2xl font-display font-bold text-sm text-white transition-all duration-200 focus-ring flex-shrink-0"
              style={{
                background: query.trim() && !loading ? "linear-gradient(135deg, var(--color-primary), hsl(240,70%,58%))" : "var(--color-bg-tertiary)",
                color: query.trim() && !loading ? "#fff" : "var(--color-text-muted)",
                cursor: !query.trim() || loading ? "not-allowed" : "pointer",
                boxShadow: query.trim() && !loading ? "0 4px 14px -3px hsl(220,75%,48%,0.4)" : "none",
              }}
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
              ) : "Search"}
            </button>
          </div>

          {/* Quick searches */}
          <div className="flex flex-wrap gap-2 mt-3" role="group" aria-label="Quick search suggestions">
            {["110001 — New Delhi", "400001 — Mumbai", "600001 — Chennai", "700001 — Kolkata"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => { setQuery(s.split(" — ")[0]); }}
                className="px-3 py-1.5 rounded-xl text-xs transition-all focus-ring"
                aria-label={`Search for ${s}`}
                style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)"; (e.currentTarget as HTMLElement).style.color = "var(--color-primary)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)"; (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)"; }}
              >
                {s}
              </button>
            ))}
          </div>
        </form>

        {/* ── Results ── */}
        {searched && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" role="region" aria-label="Polling booth search results">

            {/* Map — 3 cols */}
            <div className="lg:col-span-3" aria-label="Map showing polling booth locations">
              <MapPlaceholder booths={booths} selected={selected} onSelect={(id) => setSelected(id === selected ? null : id)} />
              <p className="text-xs mt-3 text-center" style={{ color: "var(--color-text-muted)" }}>
                ℹ️ Click a booth pin to see details. Production version uses live Google Maps Places API.
              </p>
            </div>

            {/* List — 2 cols */}
            <div className="lg:col-span-2 flex flex-col gap-3" role="list" aria-label={`${booths.length} polling booths found near ${query}`} aria-live="polite">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-display font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>
                  {booths.length} Booths Near &ldquo;{query}&rdquo;
                </h2>
                <span className="text-xs px-2 py-1 rounded-lg" style={{ background: "hsl(220,75%,48%,0.1)", color: "var(--color-primary)" }}>
                  Sorted by distance
                </span>
              </div>
              {booths.map((b) => (
                <div key={b.id} role="listitem">
                  <BoothCard booth={b} isSelected={selected === b.id} onSelect={() => setSelected(selected === b.id ? null : b.id)} />
                </div>
              ))}

              {/* Helpline */}
              <div
                className="mt-2 p-4 rounded-2xl text-center"
                style={{ background: "hsl(220,75%,48%,0.07)", border: "1px solid hsl(220,75%,48%,0.15)" }}
                role="note"
                aria-label="Voter helpline information"
              >
                <p className="text-xs font-semibold mb-1" style={{ color: "var(--color-primary)" }}>Need Help?</p>
                <p className="font-display font-black text-2xl gradient-text">1950</p>
                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>National Voter Helpline (Free)</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Empty state ── */}
        {!searched && !loading && (
          <div className="text-center py-16" aria-label="Search prompt">
            <p className="text-5xl mb-4" aria-hidden="true">🗳️</p>
            <p className="font-display font-semibold text-lg mb-2" style={{ color: "var(--color-text-primary)" }}>
              Find Your Polling Booth
            </p>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Enter your pincode or area name above to locate nearby booths.
            </p>
          </div>
        )}

        {/* ── Tips ── */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" role="list" aria-label="Polling booth tips">
          {[
            { icon: "🕖", title: "Polling Hours", tip: "7:00 AM to 6:00 PM on election day. Arrive early to avoid queues." },
            { icon: "🪪", title: "What to Carry", tip: "Voter ID (EPIC), Aadhaar, passport, or any ECI-approved photo ID." },
            { icon: "♿", title: "Accessibility", tip: "All booths must have ramps and assistance for differently-abled voters." },
            { icon: "📋", title: "Voter Slip", tip: "Get your voter slip from your local BLO before election day." },
          ].map((t) => (
            <div key={t.title} role="listitem" className="glass-card rounded-2xl p-5" style={{ border: "1px solid var(--color-border)" }}>
              <span className="text-2xl mb-3 block" aria-hidden="true">{t.icon}</span>
              <h3 className="font-display font-semibold text-sm mb-1.5" style={{ color: "var(--color-text-primary)" }}>{t.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{t.tip}</p>
            </div>
          ))}
        </div>

        {/* ── Attribution ── */}
        <div
          className="mt-10 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl"
          style={{ background: "linear-gradient(135deg, hsl(220,75%,48%,0.06), hsl(28,88%,44%,0.06))", border: "1px solid hsl(220,75%,48%,0.15)" }}
          role="contentinfo"
          aria-label="Booth Locator attribution"
        >
          <span className="w-2.5 h-2.5 rounded-full animate-pulse-soft flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))", boxShadow: "0 0 10px var(--color-primary)" }} aria-hidden="true" />
          <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
            <span aria-hidden="true">⚡ </span>
            Booth Locator engineered by <span className="gradient-text font-bold">Abhijeet Kangane</span> <span aria-hidden="true">🇮🇳✦</span>
          </p>
        </div>
      </div>
    </main>
  );
}
