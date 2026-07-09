"use client";

/**
 * Geospatial Booth Operations Console — NexGen Civic OS
 * Architected by Abhijeet Kangane
 * Enterprise GIS Vector Simulation with Queue Estimation & Accessibility Telemetry
 */

import { useState, useCallback, useMemo } from "react";
import { 
  MapPin, 
  Search, 
  Navigation, 
  Clock, 
  Users, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink, 
  Filter, 
  Compass, 
  Cpu, 
  Layers, 
  Printer, 
  Copy,
  ChevronRight,
  Info,
  Globe
} from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

/* ========================================================
   POLLING BOOTH DATA MATRIX
   ======================================================== */
export interface Booth {
  id: number;
  name: string;
  address: string;
  ward: string;
  distance: string;
  coordinates: { lat: string; lng: string };
  accessible: boolean;
  brailleBallot: boolean;
  seniorQueue: boolean;
  hours: string;
  votersRegistered: number;
  currentQueueMins: number;
  status: "OPTIMAL" | "MODERATE" | "HIGH_DENSITY";
  mapPos: { x: number; y: number };
}

const BOOTH_DB: Booth[] = [
  {
    id: 1,
    name: "Zila Parishad Primary School (North Wing)",
    address: "Sector 12, Near Main Market Road, Civil Lines, New Delhi",
    ward: "Ward 04 • Sector B",
    distance: "0.4 km",
    coordinates: { lat: "28.6139° N", lng: "77.2090° E" },
    accessible: true,
    brailleBallot: true,
    seniorQueue: true,
    hours: "07:00 AM – 06:00 PM IST",
    votersRegistered: 1240,
    currentQueueMins: 12,
    status: "OPTIMAL",
    mapPos: { x: 32, y: 38 },
  },
  {
    id: 2,
    name: "Government Higher Secondary School",
    address: "Gandhi Nagar, Block B, Opposite Metro Pillar 142, New Delhi",
    ward: "Ward 04 • Sector C",
    distance: "0.9 km",
    coordinates: { lat: "28.6185° N", lng: "77.2145° E" },
    accessible: true,
    brailleBallot: true,
    seniorQueue: true,
    hours: "07:00 AM – 06:00 PM IST",
    votersRegistered: 980,
    currentQueueMins: 18,
    status: "MODERATE",
    mapPos: { x: 58, y: 48 },
  },
  {
    id: 3,
    name: "Municipal Corporation Civic Center Hall",
    address: "Rajpath Crossroad, Opposite State Bus Terminal, New Delhi",
    ward: "Ward 05 • Sector A",
    distance: "1.2 km",
    coordinates: { lat: "28.6210° N", lng: "77.2012° E" },
    accessible: false,
    brailleBallot: false,
    seniorQueue: true,
    hours: "07:00 AM – 06:00 PM IST",
    votersRegistered: 1560,
    currentQueueMins: 34,
    status: "HIGH_DENSITY",
    mapPos: { x: 74, y: 26 },
  },
  {
    id: 4,
    name: "Community Cultural & Sports Complex",
    address: "Rajiv Colony, Phase 2, Near Memorial Park, New Delhi",
    ward: "Ward 05 • Sector D",
    distance: "1.8 km",
    coordinates: { lat: "28.6080° N", lng: "77.2210° E" },
    accessible: true,
    brailleBallot: true,
    seniorQueue: true,
    hours: "07:00 AM – 06:00 PM IST",
    votersRegistered: 870,
    currentQueueMins: 8,
    status: "OPTIMAL",
    mapPos: { x: 44, y: 72 },
  },
  {
    id: 5,
    name: "Panchayat Bhawan Administrative Center",
    address: "Old Town Heritage Road, Gate 3, New Delhi",
    ward: "Ward 06 • Sector A",
    distance: "2.3 km",
    coordinates: { lat: "28.6020° N", lng: "77.1980° E" },
    accessible: true,
    brailleBallot: false,
    seniorQueue: false,
    hours: "07:00 AM – 06:00 PM IST",
    votersRegistered: 1100,
    currentQueueMins: 22,
    status: "MODERATE",
    mapPos: { x: 80, y: 64 },
  },
];

/* ========================================================
   INTERACTIVE GIS RADAR MAP SIMULATOR & GOOGLE MAPS EMBED
   ======================================================== */
function GISVectorRadarMap({
  booths,
  selectedId,
  onSelect,
  mapMode,
  setMapMode,
}: {
  booths: Booth[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  mapMode: "VECTOR" | "GOOGLE";
  setMapMode: (mode: "VECTOR" | "GOOGLE") => void;
}) {
  const selectedBooth = booths.find((b) => b.id === selectedId) || booths[0];

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden bg-obsidian-950 border border-white/15 shadow-glass-elevated flex flex-col justify-between print:hidden"
      style={{ minHeight: "440px", height: "100%" }}
      role="region"
      aria-label="Interactive Vector GIS Polling Booth Radar Map"
    >
      {/* Map Top Telemetry & Mode Selector Bar */}
      <div className="relative z-30 p-4 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-b from-obsidian-950 via-obsidian-950/90 to-transparent">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMapMode("VECTOR")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
              mapMode === "VECTOR"
                ? "bg-primary-600 text-white border-primary-400 shadow-command-glow"
                : "bg-obsidian-900 text-text-secondary border-white/10 hover:text-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>RADAR VECTOR GIS</span>
          </button>

          <button
            type="button"
            onClick={() => setMapMode("GOOGLE")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
              mapMode === "GOOGLE"
                ? "bg-emerald-600 text-white border-emerald-400 shadow-command-glow"
                : "bg-obsidian-900 text-text-secondary border-white/10 hover:text-white"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>LIVE GOOGLE MAPS</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-text-muted px-2.5 py-1 rounded bg-obsidian-900/80 border border-white/5">
          <Layers className="w-3.5 h-3.5 text-cyber-400" />
          <span>{mapMode === "VECTOR" ? "VECTOR 3D LAYER" : "GOOGLE SATELLITE API"} ONLINE</span>
        </div>
      </div>

      {/* MAP CONTENT CANVAS */}
      {mapMode === "VECTOR" ? (
        <>
          {/* Background Vector Grid Lines */}
          <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />
          
          {/* Simulated Road Cross Grid */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" aria-hidden="true">
            <line x1="0" y1="45%" x2="100%" y2="45%" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 6" />
            <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#06b6d4" strokeWidth="1.5" />
            <line x1="38%" y1="0" x2="38%" y2="100%" stroke="#06b6d4" strokeWidth="2.5" />
            <line x1="68%" y1="0" x2="68%" y2="100%" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" />
            
            {/* Animated Radar Pulse Ring */}
            <circle cx="38%" cy="45%" r="140" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.3">
              <animate attributeName="r" values="30;200" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0" dur="4s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* Interactive Booth Pins on Map Canvas */}
          <div className="absolute inset-0 z-20 pointer-events-auto">
            {booths.map((booth) => {
              const isSelected = selectedId === booth.id;
              return (
                <button
                  key={booth.id}
                  type="button"
                  onClick={() => onSelect(booth.id)}
                  aria-label={`Select Polling Booth: ${booth.name}`}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group focus-ring transition-transform duration-200"
                  style={{ left: `${booth.mapPos.x}%`, top: `${booth.mapPos.y}%` }}
                >
                  {/* Pulse Glow when selected */}
                  {isSelected && (
                    <div className="absolute -inset-3 rounded-full bg-cyber-500/40 animate-ping" />
                  )}

                  {/* Pin Icon Component */}
                  <div
                    className={`relative flex flex-col items-center transition-all ${
                      isSelected ? "scale-125 z-30" : "group-hover:scale-110 z-10"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-display font-extrabold text-xs shadow-lg border transition-all ${
                        isSelected
                          ? "bg-gradient-to-br from-cyber-500 to-primary-600 text-white border-white shadow-command-glow"
                          : booth.accessible
                          ? "bg-obsidian-900 text-emerald-400 border-emerald-500/50 group-hover:border-emerald-400"
                          : "bg-obsidian-900 text-saffron-400 border-saffron-500/50 group-hover:border-saffron-400"
                      }`}
                    >
                      {booth.id.toString().padStart(2, "0")}
                    </div>

                    {/* Down pointer arrow */}
                    <div
                      className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px]"
                      style={{
                        borderTopColor: isSelected ? "#06b6d4" : booth.accessible ? "#10b981" : "#f97316",
                      }}
                    />

                    {/* Hover Label */}
                    <div className="absolute top-10 whitespace-nowrap px-2 py-1 rounded bg-obsidian-950 border border-white/20 text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                      {booth.name.split(" ")[0]}... ({booth.currentQueueMins}m queue)
                    </div>
                  </div>
                </button>
              );
            })}

            {/* User Simulated Location Marker */}
            <div
              className="absolute left-[38%] top-[45%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              title="Your Current Ward Coordinates"
            >
              <div className="w-4 h-4 rounded-full bg-primary-500 border-2 border-white shadow-command-glow animate-pulse" />
            </div>
          </div>
        </>
      ) : (
        /* GOOGLE MAPS LIVE EMBED FRAME */
        <div className="absolute inset-0 z-10 w-full h-full pt-14 pb-12">
          <iframe
            title={`Google Maps Polling Booth View - ${selectedBooth.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(`${selectedBooth.name}, ${selectedBooth.address}`)}&output=embed`}
            className="w-full h-full border-none filter contrast-105"
            loading="lazy"
            allowFullScreen
          />
        </div>
      )}

      {/* Map Bottom Legend & GPS Coordinates */}
      <div className="relative z-30 p-4 bg-gradient-to-t from-obsidian-950 via-obsidian-950/90 to-transparent flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-text-muted border-t border-white/5">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> ♿ Wheelchair Accessible
          </span>
          <span className="flex items-center gap-1.5 text-saffron-400 font-bold">
            <span className="w-2.5 h-2.5 rounded bg-saffron-500" /> Standard Entry
          </span>
        </div>

        <div className="text-cyber-400/90 flex items-center gap-1.5 font-bold">
          <Cpu className="w-3.5 h-3.5" />
          <span>GPS: N 28°36&apos;42&quot; E 77°13&apos;18&quot; ({mapMode === "VECTOR" ? "Vector Mode" : "Google Mode"})</span>
        </div>
      </div>

    </div>
  );
}

/* ========================================================
   MAIN BOOTH LOCATOR PAGE COMPONENT
   ======================================================== */
export default function BoothLocatorPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "ACCESSIBLE" | "LOW_QUEUE">("ALL");
  const [selectedBoothId, setSelectedBoothId] = useState<number | null>(1);
  const [mapMode, setMapMode] = useState<"VECTOR" | "GOOGLE">("VECTOR");

  /* Filtered Booths */
  const filteredBooths = useMemo(() => {
    return BOOTH_DB.filter((booth) => {
      const matchesSearch =
        booth.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booth.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booth.ward.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (filterType === "ACCESSIBLE") return booth.accessible;
      if (filterType === "LOW_QUEUE") return booth.currentQueueMins <= 15;
      return true;
    });
  }, [searchQuery, filterType]);

  const selectedBooth = useMemo(() => {
    return BOOTH_DB.find((b) => b.id === selectedBoothId) || null;
  }, [selectedBoothId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const copyCoordinates = (booth: Booth) => {
    navigator.clipboard.writeText(`${booth.coordinates.lat}, ${booth.coordinates.lng}`);
  };

  return (
    <main
      id="main-content"
      role="main"
      aria-labelledby="booth-page-title"
      className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-dot-grid relative"
    >
      {/* Printable Direction Slip (Strictly Isolated for print) */}
      {selectedBooth && (
        <div id="printable-direction-slip" className="hidden print:block text-black bg-white p-8 border-2 border-black">
          <div className="text-center border-b-2 border-black pb-4 mb-6">
            <h1 className="text-2xl font-bold uppercase tracking-wider">ELECTION COMMISSION OF INDIA (ECI)</h1>
            <p className="text-sm font-semibold mt-1">OFFICIAL POLLING STATION DIRECTION & TELEMETRY SLIP</p>
          </div>
          <div className="space-y-4 text-base">
            <p><strong>WARD & SECTOR:</strong> {selectedBooth.ward}</p>
            <p><strong>POLLING BOOTH ID:</strong> #{selectedBooth.id.toString().padStart(2, "0")}</p>
            <p><strong>BOOTH NAME:</strong> {selectedBooth.name}</p>
            <p><strong>FULL ADDRESS:</strong> {selectedBooth.address}</p>
            <p><strong>GPS COORDINATES:</strong> {selectedBooth.coordinates.lat}, {selectedBooth.coordinates.lng}</p>
            <p><strong>POLLING HOURS:</strong> {selectedBooth.hours}</p>
            <p><strong>ACCESSIBILITY STATUS:</strong> {selectedBooth.accessible ? "Wheelchair Accessible • Braille Ballot Ready" : "Standard Entry"}</p>
          </div>
          <div className="mt-12 pt-6 border-t border-black flex justify-between text-xs">
            <span>Generated by NexGen Civic OS</span>
            <span>Cryptographic Verification ID: ECI-RADAR-{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col gap-8 print:hidden">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>GEOSPATIAL BOOTH INTELLIGENCE CONSOLE</span>
            </div>
            <h1 id="booth-page-title" className="font-display font-black text-3xl sm:text-4xl text-obsidian-950 dark:text-white tracking-tight">
              Polling Booth Radar & GIS Explorer
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Verify your exact polling coordinates, check real-time queue density, and confirm ECI accessibility standards.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-2 rounded-xl bg-obsidian-900 border border-white/10 text-xs font-mono text-cyber-400 font-bold flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyber-400 animate-pulse" />
              <span>{filteredBooths.length} STATIONS FOUND IN WARD</span>
            </span>
          </div>
        </div>

        {/* Search Bar & Filter Pills Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl relative">
            <div className="relative flex items-center bg-obsidian-900 border border-white/15 focus-within:border-cyber-500 rounded-2xl shadow-inner transition-all">
              <Search className="w-5 h-5 text-text-muted ml-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Ward number, School name, or Civil Lines Pincode..."
                className="w-full bg-transparent border-none text-obsidian-950 dark:text-white text-sm px-3 py-3.5 focus:outline-none placeholder:text-text-muted"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mr-3 text-xs font-mono text-text-muted hover:text-white px-2 py-1 rounded"
                >
                  CLEAR
                </button>
              )}
            </div>
          </form>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            <span className="text-xs font-mono text-text-muted flex items-center gap-1.5 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {[
              { id: "ALL", label: "All Stations", count: BOOTH_DB.length },
              { id: "ACCESSIBLE", label: "♿ Accessible Only", count: BOOTH_DB.filter((b) => b.accessible).length },
              { id: "LOW_QUEUE", label: "⚡ Fast Queue (<15m)", count: BOOTH_DB.filter((b) => b.currentQueueMins <= 15).length },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterType(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-display font-bold whitespace-nowrap transition-all border ${
                  filterType === tab.id
                    ? "bg-primary-600 text-white border-primary-400/40 shadow-sm"
                    : "bg-obsidian-900/80 text-text-secondary hover:text-white border-white/10"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

        </div>

        {/* Main Workspace Split (Map & List left/right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: GIS Vector Radar Map / Google Maps Embed (Spans 7 columns) */}
          <section aria-labelledby="radar-map-heading" className="lg:col-span-7 flex flex-col gap-6">
            <h2 id="radar-map-heading" className="sr-only">Interactive Polling Booth Map</h2>
            
            <GISVectorRadarMap
              booths={filteredBooths}
              selectedId={selectedBoothId}
              onSelect={(id) => setSelectedBoothId(id)}
              mapMode={mapMode}
              setMapMode={setMapMode}
            />

            {/* Booth Cards Stream */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono font-bold text-text-secondary uppercase tracking-wider">
                POLLING STATION DIRECTORY LIST:
              </span>

              <div className="grid grid-cols-1 gap-3 max-h-[380px] overflow-y-auto pr-1" role="list">
                {filteredBooths.map((booth) => {
                  const isSelected = selectedBoothId === booth.id;
                  return (
                    <button
                      key={booth.id}
                      type="button"
                      onClick={() => {
                        setSelectedBoothId(booth.id);
                      }}
                      role="listitem"
                      aria-pressed={isSelected}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-4 relative overflow-hidden group focus-ring ${
                        isSelected
                          ? "bg-gradient-to-r from-obsidian-900 via-obsidian-900 to-primary-950/40 border-cyber-500 shadow-command-glow"
                          : "bg-obsidian-950/80 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-sm flex-shrink-0 transition-all ${
                            isSelected
                              ? "bg-gradient-to-br from-cyber-500 to-primary-600 text-white shadow-md"
                              : "bg-obsidian-900 text-text-secondary border border-white/5"
                          }`}
                        >
                          {booth.id.toString().padStart(2, "0")}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-display font-bold text-base text-white group-hover:text-cyber-400 transition-colors">
                              {booth.name}
                            </h3>
                            {booth.accessible && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                ♿ ACCESSIBLE
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-text-secondary line-clamp-1">{booth.address}</p>
                          <div className="flex items-center gap-3 mt-2 text-[11px] font-mono text-text-muted">
                            <span className="text-cyber-400 font-bold">📍 {booth.distance} away</span>
                            <span>•</span>
                            <span>{booth.ward}</span>
                            <span>•</span>
                            <span>{booth.votersRegistered} voters</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between self-stretch flex-shrink-0">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          booth.status === "OPTIMAL" ? "bg-emerald-500/20 text-emerald-400" :
                          booth.status === "MODERATE" ? "bg-amber-500/20 text-amber-400" :
                          "bg-red-500/20 text-red-400"
                        }`}>
                          ⏳ ~{booth.currentQueueMins}m wait
                        </span>
                        <ChevronRight className={`w-4 h-4 ${isSelected ? "text-cyber-400" : "text-text-muted group-hover:text-white"}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Right Column: Detailed Polling Operations Drawer (Spans 5 columns) */}
          <section aria-labelledby="booth-drawer-heading" className="lg:col-span-5 flex flex-col gap-6">
            {selectedBooth ? (
              <AnimatedCard delay={0.2} className="p-6 sm:p-8 flex flex-col gap-6 sticky top-24 animate-border-continuous">
                
                {/* Drawer Header */}
                <div className="flex items-start justify-between pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-cyber-500/20 text-cyber-300 text-[10px] font-mono font-bold border border-cyber-500/40">
                        STATION #{selectedBooth.id.toString().padStart(2, "0")}
                      </span>
                      <span className="text-xs font-mono text-text-muted">{selectedBooth.ward}</span>
                    </div>
                    <h2 id="booth-drawer-heading" className="font-display font-extrabold text-xl text-obsidian-950 dark:text-white leading-tight">
                      {selectedBooth.name}
                    </h2>
                  </div>
                </div>

                {/* Address & Coordinates */}
                <div className="flex flex-col gap-2 p-4 rounded-2xl bg-obsidian-950/80 border border-white/5 font-mono text-xs">
                  <div className="flex items-center justify-between text-text-secondary">
                    <span>ADDRESS:</span>
                    <span className="text-white text-right max-w-[220px] truncate font-sans">{selectedBooth.address}</span>
                  </div>
                  <div className="flex items-center justify-between text-text-secondary pt-2 border-t border-white/5">
                    <span>GPS TELEMETRY:</span>
                    <span className="text-cyber-400 font-bold">{selectedBooth.coordinates.lat}, {selectedBooth.coordinates.lng}</span>
                  </div>
                  <div className="flex items-center justify-between text-text-secondary pt-2 border-t border-white/5">
                    <span>POLLING HOURS:</span>
                    <span className="text-white">{selectedBooth.hours}</span>
                  </div>
                </div>

                {/* Queue Density Meter */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-text-secondary flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyber-400" /> LIVE QUEUE ESTIMATION:
                    </span>
                    <span className="font-bold text-white">~{selectedBooth.currentQueueMins} MINUTES</span>
                  </div>
                  <div className="w-full h-2 bg-obsidian-950 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        selectedBooth.currentQueueMins <= 15 ? "bg-emerald-500" :
                        selectedBooth.currentQueueMins <= 30 ? "bg-amber-500" :
                        "bg-red-500"
                      }`}
                      style={{ width: `${Math.min(100, (selectedBooth.currentQueueMins / 45) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* ECI Accessibility Checklist */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-mono font-bold text-text-secondary uppercase tracking-wider border-l-2 border-cyber-500 pl-2">
                    ECI ACCESSIBILITY INFRASTRUCTURE:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className={`p-3 rounded-xl border flex items-center gap-2.5 font-medium ${
                      selectedBooth.accessible
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : "bg-obsidian-950 border-white/5 text-text-muted"
                    }`}>
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${selectedBooth.accessible ? "text-emerald-400" : "text-text-muted"}`} />
                      <span>Wheelchair Ramp & Lift</span>
                    </div>

                    <div className={`p-3 rounded-xl border flex items-center gap-2.5 font-medium ${
                      selectedBooth.brailleBallot
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : "bg-obsidian-950 border-white/5 text-text-muted"
                    }`}>
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${selectedBooth.brailleBallot ? "text-emerald-400" : "text-text-muted"}`} />
                      <span>Braille EVM Ballot Unit</span>
                    </div>

                    <div className={`p-3 rounded-xl border flex items-center gap-2.5 font-medium ${
                      selectedBooth.seniorQueue
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : "bg-obsidian-950 border-white/5 text-text-muted"
                    }`}>
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${selectedBooth.seniorQueue ? "text-emerald-400" : "text-text-muted"}`} />
                      <span>Priority Senior Queue</span>
                    </div>

                    <div className="p-3 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-emerald-300 flex items-center gap-2.5 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>First-Aid Medical Booth</span>
                    </div>
                  </div>
                </div>

                {/* Action Route Buttons */}
                <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedBooth.name} ${selectedBooth.address}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary py-3.5 px-6 rounded-xl text-xs font-display font-bold w-full flex items-center justify-center gap-2 shadow-command-glow"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>OPEN TURN-BY-TURN ROUTE IN GOOGLE MAPS</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="py-3 px-6 rounded-xl bg-obsidian-950 hover:bg-obsidian-900 border border-white/15 text-xs font-mono text-text-secondary hover:text-white transition-all flex items-center justify-center gap-2 font-bold"
                  >
                    <Printer className="w-4 h-4 text-cyber-400" />
                    <span>PRINT ECI POLLING BOOTH DIRECTION SLIP</span>
                  </button>
                </div>

              </AnimatedCard>
            ) : (
              <AnimatedCard delay={0.2} className="p-10 text-center flex flex-col items-center justify-center gap-3 animate-border-continuous">
                <MapPin className="w-10 h-10 text-cyber-400 opacity-50" />
                <p className="text-sm text-text-secondary">Click any polling station pin on the vector map or directory list to view full ECI operational telemetry and directions.</p>
              </AnimatedCard>
            )}
          </section>

        </div>

      </div>
    </main>
  );
}
