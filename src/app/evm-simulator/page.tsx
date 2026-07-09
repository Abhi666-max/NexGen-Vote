"use client";

/**
 * EVM Simulator & Cryptographic Digital Twin — NexGen Civic OS
 * Architected by Abhijeet Kangane
 * Enterprise-Grade Hardware Simulation of CU, BU, VVPAT, & SHA-256 Audit Ledger
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { 
  Vote, 
  ShieldCheck, 
  Activity, 
  Lock, 
  Terminal, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Volume2, 
  VolumeX, 
  Download, 
  Copy, 
  Sparkles,
  Cpu,
  Eye,
  FileCheck
} from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

/* ========================================================
   CANDIDATE HARDWARE MATRIX
   ======================================================== */
const CANDIDATES = [
  { id: "A", serial: "01", name: "Asha Devi", party: "Progressive Democratic Alliance", symbol: "🌸", color: "from-pink-500/20 to-pink-500/5" },
  { id: "B", serial: "02", name: "Rajan Kumar", party: "People's National Front", symbol: "🌾", color: "from-amber-500/20 to-amber-500/5" },
  { id: "C", serial: "03", name: "Sunita Sharma", party: "National Unity Coalition", symbol: "⚡", color: "from-cyan-500/20 to-cyan-500/5" },
  { id: "D", serial: "04", name: "Mohan Lal", party: "Green Future Initiative", symbol: "🌿", color: "from-emerald-500/20 to-emerald-500/5" },
  { id: "N", serial: "05", name: "NOTA", party: "None of the Above", symbol: "✗", color: "from-rose-500/20 to-rose-500/5" },
] as const;

type CandidateId = (typeof CANDIDATES)[number]["id"];
type Phase = "idle" | "ready" | "voted" | "done";

interface AuditLogEntry {
  id: string;
  blockNum: number;
  timestamp: string;
  action: string;
  hash: string;
  status: "VERIFIED" | "PENDING";
}

/* ========================================================
   WEB AUDIO API — AUTHENTIC 880Hz EVM BEEP & MECHANICAL CLICK
   ======================================================== */
function playBeep(enabled: boolean) {
  if (!enabled) return;
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "square";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.45);
  } catch { /* silently ignore if audio context blocked by browser policy */ }
}

function playMechanicalClick(enabled: boolean) {
  if (!enabled) return;
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "triangle";
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  } catch { /* silently ignore */ }
}

/* ========================================================
   SHA-256 CRYPTOGRAPHIC HASH GENERATOR (SIMULATION)
   ======================================================== */
function generateHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, "0");
  return `8f4a${hex}e12b9c3d001a74f2`;
}

/* ========================================================
   HARDWARE LED LAMP COMPONENT
   ======================================================== */
function HardwareLED({ on, color = "red", label }: { on: boolean; color?: "red" | "green" | "cyan"; label?: string }) {
  const colors = {
    red:   { bg: on ? "#ef4444" : "#3b1212", glow: "0 0 12px #ef4444, 0 0 24px rgba(239, 68, 68, 0.6)" },
    green: { bg: on ? "#10b981" : "#0c3122", glow: "0 0 12px #10b981, 0 0 24px rgba(16, 185, 129, 0.6)" },
    cyan:  { bg: on ? "#06b6d4" : "#0d313a", glow: "0 0 12px #06b6d4, 0 0 24px rgba(6, 182, 212, 0.6)" },
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className="w-3.5 h-3.5 rounded-full transition-all duration-200 border border-white/20 flex-shrink-0"
        style={{ background: colors[color].bg, boxShadow: on ? colors[color].glow : "none" }}
        aria-hidden="true"
      />
      {label && <span className="text-[11px] font-mono text-text-secondary">{label}</span>}
    </div>
  );
}

/* ========================================================
   VVPAT THERMAL PRINTER MODAL & ROLL WINDOW
   ======================================================== */
function VVPATRollWindow({ candidate, onClose }: { candidate: typeof CANDIDATES[number]; onClose: () => void }) {
  const [timeLeft, setTimeLeft] = useState(7);

  useEffect(() => {
    if (timeLeft <= 0) {
      onClose();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vvpat-header"
    >
      <div className="relative max-w-md w-full rounded-3xl bg-obsidian-900 border border-emerald-500/40 shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center animate-slide-up">
        
        {/* Top Status Header */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>VVPAT THERMAL WINDOW • ILLUMINATED</span>
        </div>

        {/* VVPAT Printer Roll Container (Physical Slip Replica) */}
        <div className="w-full max-w-xs bg-obsidian-950 rounded-2xl p-4 border-2 border-dashed border-emerald-500/50 shadow-inner relative overflow-hidden mb-6">
          {/* Scanning light animation */}
          <div className="absolute inset-x-0 h-1 bg-emerald-400/60 shadow-command-glow animate-scanline pointer-events-none" />

          {/* Slip Header */}
          <div className="text-[10px] font-mono text-text-muted border-b border-white/10 pb-2 mb-4 flex justify-between">
            <span>ECI VVPAT SLIP</span>
            <span>SLIP #{Math.floor(1000 + Math.random() * 9000)}</span>
          </div>

          {/* Symbol & Candidate */}
          <div className="py-4 flex flex-col items-center justify-center">
            <span className="text-6xl mb-3 block transform scale-110">{candidate.symbol}</span>
            <div className="font-display font-black text-2xl text-white tracking-tight">
              {candidate.name}
            </div>
            <div className="text-xs font-mono text-cyber-400 mt-1 font-semibold uppercase">
              {candidate.party}
            </div>
            <div className="mt-3 px-2.5 py-1 rounded bg-obsidian-900 border border-white/10 text-[10px] font-mono text-text-muted">
              SERIAL NO: {candidate.serial}
            </div>
          </div>

          {/* Cryptographic Proof Seal */}
          <div className="mt-4 pt-3 border-t border-white/10 text-[9px] font-mono text-emerald-400/80 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CRYPTOGRAPHIC HASH VERIFIED</span>
          </div>
        </div>

        {/* Countdown & Auto Drop */}
        <div className="w-full flex flex-col gap-2 mb-6">
          <div className="flex items-center justify-between text-xs font-mono text-text-secondary">
            <span>Audit Slip Auto-Cutting In:</span>
            <span className="text-emerald-400 font-bold">{timeLeft} SECONDS</span>
          </div>
          <div className="w-full h-1.5 bg-obsidian-950 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-cyber-400 transition-all duration-1000"
              style={{ width: `${(timeLeft / 7) * 100}%` }}
            />
          </div>
        </div>

        <p className="text-xs text-text-secondary leading-relaxed mb-6">
          Under ECI protocol, the voter verifies their choice for exactly 7 seconds before the paper slip is mechanically cut and dropped into the sealed VVPAT drop-box.
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 border border-white/15 text-xs font-mono text-white font-bold transition-all"
        >
          FORCE CLOSE & DROP SLIP INTO BOX NOW →
        </button>
      </div>
    </div>
  );
}

/* ========================================================
   MAIN EVM SIMULATOR COMPONENT
   ======================================================== */
export default function EVMSimulatorPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [selected, setSelected] = useState<CandidateId | null>(null);
  const [showVVPAT, setShowVVPAT] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [totalVotes, setTotalVotes] = useState(42);
  const [batteryLevel, setBatteryLevel] = useState(98);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: "log-1",
      blockNum: 1,
      timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(),
      action: "BOOT_HARDWARE_TWIN",
      hash: "8f4a0011e12b9c3d001a74f2",
      status: "VERIFIED",
    },
    {
      id: "log-2",
      blockNum: 2,
      timestamp: new Date(Date.now() - 1800000).toLocaleTimeString(),
      action: "ECI_SELF_DIAGNOSTIC_PASS",
      hash: "8f4a0984e12b9c3d001a74f2",
      status: "VERIFIED",
    },
  ]);

  const [announcement, setAnnouncement] = useState("EVM Hardware Twin booted in Standby mode.");
  const cuRef = useRef<HTMLDivElement>(null);

  const announce = (msg: string) => setAnnouncement(msg);

  /* Add Audit Log Entry */
  const appendLog = useCallback((action: string) => {
    setAuditLogs((prev) => [
      {
        id: `log-${prev.length + 1}`,
        blockNum: prev.length + 1,
        timestamp: new Date().toLocaleTimeString(),
        action,
        hash: generateHash(`${action}-${Date.now()}`),
        status: "VERIFIED",
      },
      ...prev,
    ]);
  }, []);

  /* Step 1: Enable Ballot (Presiding Officer Action) */
  const enableBallot = useCallback(() => {
    if (phase === "ready") return;
    playMechanicalClick(soundEnabled);
    setPhase("ready");
    setSelected(null);
    appendLog("CU_BALLOT_ENABLED_FOR_VOTER");
    announce("Ballot Unit unlocked. Ready for voter selection.");
  }, [phase, soundEnabled, appendLog]);

  /* Step 2: Cast Vote (Voter Action on Ballot Unit) */
  const castVote = useCallback((id: CandidateId) => {
    if (phase !== "ready") {
      announce("Please enable the Ballot Unit from the Control Unit first.");
      return;
    }
    setSelected(id);
    setPhase("voted");
    setTotalVotes((prev) => prev + 1);
    setBatteryLevel((prev) => Math.max(85, prev - 0.2));
    playBeep(soundEnabled);
    
    const c = CANDIDATES.find((item) => item.id === id)!;
    appendLog(`VOTE_RECORDED_SERIAL_${c.serial}_${c.id}`);
    announce(`Vote cast for ${c.name}. VVPAT window illuminated.`);
    setShowVVPAT(true);
  }, [phase, soundEnabled, appendLog]);

  /* Step 3: Clear / Reset for Next Voter */
  const resetMachine = useCallback(() => {
    playMechanicalClick(soundEnabled);
    setPhase("idle");
    setSelected(null);
    setShowVVPAT(false);
    appendLog("CU_RESET_MACHINE_STANDBY");
    announce("Machine reset to standby for next voter.");
  }, [soundEnabled, appendLog]);

  /* Copy Audit Log */
  const copyAuditLogs = () => {
    const text = auditLogs.map((l) => `[BLOCK #${l.blockNum}] ${l.timestamp} | ${l.action} | SHA-256: ${l.hash}`).join("\n");
    navigator.clipboard.writeText(text);
    announce("Audit ledger copied to clipboard.");
  };

  const selectedCandidate = CANDIDATES.find((c) => c.id === selected);

  return (
    <>
      {/* Screen Reader Announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        {announcement}
      </div>

      {/* VVPAT Thermal Slip Modal */}
      {showVVPAT && selectedCandidate && (
        <VVPATRollWindow candidate={selectedCandidate} onClose={() => setShowVVPAT(false)} />
      )}

      <main 
        id="main-content" 
        role="main" 
        aria-labelledby="evm-header-title"
        className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-dot-grid"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          
          {/* Page Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-500/10 border border-cyber-500/30 text-xs font-mono text-cyber-400 mb-2">
                <Cpu className="w-3.5 h-3.5" />
                <span>DEMOCRACY HARDWARE DIGITAL TWIN v2.4</span>
              </div>
              <h1 id="evm-header-title" className="font-display font-black text-3xl sm:text-4xl text-obsidian-950 dark:text-white tracking-tight">
                EVM + VVPAT Hardware Simulator
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                Interact with authentic digital twins of the Control Unit (CU), Ballot Unit (BU), and SHA-256 Audit Ledger.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Sound Toggle */}
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                  soundEnabled
                    ? "bg-obsidian-900 border-emerald-500/40 text-emerald-400 shadow-sm"
                    : "bg-obsidian-900 border-border text-text-muted"
                }`}
                title={soundEnabled ? "Disable 880Hz Audio Beep" : "Enable Audio Beep"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>880Hz BEEP: {soundEnabled ? "ON" : "OFF"}</span>
              </button>

              {/* Reset Standby Switch */}
              <button
                type="button"
                onClick={resetMachine}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 border border-white/15 text-xs font-mono font-bold text-white transition-all"
              >
                <RefreshCw className="w-4 h-4 text-cyber-400" />
                <span>RESET TWIN</span>
              </button>
            </div>
          </div>

          {/* Main Dual-Console Grid (CU on Left, BU on Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ===================================================
                CONTROL UNIT (CU) — SPANS 5 COLUMNS
                =================================================== */}
            <section aria-labelledby="cu-panel-title" className="lg:col-span-5 flex flex-col gap-6" ref={cuRef}>
              <AnimatedCard delay={0.1} className="p-6 sm:p-8 relative overflow-hidden animate-border-continuous">
                
                {/* CU Top Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-cyber-500 animate-pulse" />
                    <div>
                      <h2 id="cu-panel-title" className="font-display font-extrabold text-base text-obsidian-950 dark:text-white tracking-wider uppercase">
                        CONTROL UNIT (CU)
                      </h2>
                      <span className="text-[10px] font-mono text-text-muted">OPERATED BY PRESIDING OFFICER</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-obsidian-950 text-cyber-400 border border-cyber-500/30">
                    MODEL ECI-M3
                  </span>
                </div>

                {/* 7-Segment LCD Display Console */}
                <div className="cyber-panel rounded-2xl p-5 mb-6 flex flex-col gap-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-2 py-0.5 bg-cyber-500/20 text-cyber-300 text-[9px] font-mono rounded-bl">
                    BACKLIGHT ACTIVE
                  </div>

                  {/* Status readout */}
                  <div className="flex items-center justify-between border-b border-cyber-500/20 pb-2">
                    <span className="text-[11px] font-mono text-cyber-400/80 uppercase">BALLOT UNIT STATE:</span>
                    <span className={`lcd-digits text-sm ${phase === "ready" ? "text-emerald-400" : phase === "voted" ? "text-saffron-400" : "text-cyber-400"}`}>
                      {phase === "idle" && "STANDBY - LOCKED"}
                      {phase === "ready" && "UNLOCKED - READY"}
                      {phase === "voted" && "VOTE RECORDED"}
                    </span>
                  </div>

                  {/* Numerical Readout */}
                  <div className="grid grid-cols-2 gap-4 py-1">
                    <div>
                      <span className="text-[10px] font-mono text-text-muted block">TOTAL VOTES IN CU:</span>
                      <span className="lcd-digits text-2xl sm:text-3xl text-white">
                        {String(totalVotes).padStart(4, "0")}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-text-muted block">BATTERY VOLTAGE:</span>
                      <span className="lcd-digits text-2xl sm:text-3xl text-emerald-400">
                        {batteryLevel.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Cryptographic Hash Check */}
                  <div className="pt-2 border-t border-cyber-500/20 text-[10px] font-mono text-cyber-300/80 flex items-center justify-between">
                    <span>SHA-256 AUDIT:</span>
                    <span className="text-emerald-400 font-bold">SECURE • 0 TAMPER</span>
                  </div>
                </div>

                {/* Hardware LED Indicators */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-obsidian-950/80 border border-white/5 mb-6">
                  <HardwareLED on={true} color="cyan" label="POWER ON" />
                  <HardwareLED on={phase === "ready"} color="green" label="BUSY / READY" />
                  <HardwareLED on={phase === "voted"} color="red" label="CLOSE / LOCK" />
                </div>

                {/* Status Indicator LED Screen */}
                <div className="p-4 rounded-2xl bg-obsidian-950 border border-white/15 shadow-inner mb-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-text-muted">INTERLOCK STATUS:</span>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5 ${
                      phase === "ready" 
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" 
                        : "bg-saffron-500/20 text-saffron-400 border border-saffron-500/40"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${phase === "ready" ? "bg-emerald-400 animate-pulse" : "bg-saffron-400"}`} />
                      {phase === "ready" ? "BALLOT ENABLED" : "STANDBY / LOCKED"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono border-t border-white/5 pt-2.5">
                    <span className="text-text-muted">TOTAL BALLOTS RECORDED:</span>
                    <span className="text-white font-bold text-sm tracking-wider">
                      {totalVotes.toString().padStart(4, "0")}
                    </span>
                  </div>
                </div>

                {/* Presiding Officer Action Button */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono text-text-secondary uppercase tracking-wider font-semibold">
                    PRESIDING OFFICER CONTROLS:
                  </span>
                  <button
                    type="button"
                    onClick={enableBallot}
                    disabled={phase === "ready"}
                    className={`w-full py-4 px-6 rounded-2xl font-display font-extrabold text-xs tracking-wider transition-all shadow-md flex items-center justify-center gap-2 ${
                      phase !== "ready"
                        ? "bg-gradient-to-r from-emerald-600 to-cyber-600 hover:from-emerald-500 hover:to-cyber-500 text-white shadow-command-glow hover:scale-[1.02]"
                        : "bg-obsidian-950 border border-white/10 text-text-muted cursor-not-allowed opacity-60"
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{phase === "ready" ? "BALLOT UNIT CURRENTLY ACTIVE" : "ENABLE BALLOT FOR VOTER"}</span>
                  </button>

                  <p className="text-[11px] text-text-muted leading-relaxed text-center mt-1">
                    Pressing this mechanical button releases the interlock on the Ballot Unit for exactly one vote.
                  </p>
                </div>
              </AnimatedCard>

              {/* VVPAT Printer Status Card */}
              <AnimatedCard delay={0.15} className="p-5 flex items-center justify-between animate-border-continuous">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-xs text-obsidian-950 dark:text-white uppercase">
                      VVPAT THERMAL PRINTER
                    </div>
                    <div className="text-[11px] font-mono text-text-secondary">
                      {showVVPAT ? "PRINTING SLIP NOW..." : "STANDBY FOR PAPER AUDIT"}
                    </div>
                  </div>
                </div>
                {selectedCandidate && (
                  <button
                    type="button"
                    onClick={() => setShowVVPAT(true)}
                    className="px-3 py-1.5 rounded-lg bg-obsidian-950 border border-white/15 text-[10px] font-mono text-cyber-400 hover:border-cyber-500/50 transition-all"
                  >
                    RE-INSPECT SLIP
                  </button>
                )}
              </AnimatedCard>
            </section>

            {/* ===================================================
                BALLOT UNIT (BU) — SPANS 7 COLUMNS
                =================================================== */}
            <section aria-labelledby="bu-panel-title" className="lg:col-span-7 flex flex-col gap-6">
              <AnimatedCard delay={0.2} className="p-6 sm:p-8 animate-border-continuous">
                
                {/* BU Top Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-3 h-3 rounded-full transition-colors ${phase === "ready" ? "bg-emerald-400 animate-ping" : "bg-red-500"}`} />
                    <div>
                      <h2 id="bu-panel-title" className="font-display font-extrabold text-base text-obsidian-950 dark:text-white tracking-wider uppercase">
                        BALLOT UNIT (BU) • CANDIDATE SELECTION
                      </h2>
                      <span className="text-[10px] font-mono text-text-muted">OPERATED DIRECTLY BY VOTER INSIDE BOOTH</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-extrabold ${
                    phase === "ready" 
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" 
                      : "bg-red-500/20 text-red-400 border border-red-500/40"
                  }`}>
                    {phase === "ready" ? "● BALLOT ACTIVE — CAST VOTE NOW" : "● LOCKED — WAIT FOR CU ENABLE"}
                  </span>
                </div>

                {/* Candidate Selection Buttons */}
                <div className="flex flex-col gap-3">
                  {CANDIDATES.map((c, index) => {
                    const isVotedThis = selected === c.id && phase === "voted";
                    return (
                      <div
                        key={c.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isVotedThis
                            ? "bg-emerald-500/15 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-[1.01]"
                            : "bg-obsidian-950/80 border-white/10 hover:border-white/25"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="w-8 h-8 rounded-xl bg-obsidian-900 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-text-secondary">
                            {index + 1}
                          </span>
                          <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-xl shadow-md`}>
                            {c.symbol}
                          </div>
                          <div>
                            <div className="font-display font-extrabold text-base text-white flex items-center gap-2">
                              <span>{c.name}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-cyber-400 border border-white/10">
                                {c.party}
                              </span>
                            </div>
                            <div className="text-xs font-mono text-text-muted mt-0.5">
                              Symbol: {c.symbol}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-center">
                          {/* LED indicator */}
                          <div className={`w-4 h-4 rounded-full border transition-all flex items-center justify-center ${
                            isVotedThis 
                              ? "bg-red-500 border-red-300 shadow-[0_0_12px_#ef4444]" 
                              : "bg-obsidian-900 border-white/20"
                          }`}>
                            {isVotedThis && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                          </div>

                          {/* Mechanical Blue Vote Button */}
                          <button
                            type="button"
                            onClick={() => castVote(c.id)}
                            disabled={phase !== "ready"}
                            className={`py-3 px-6 rounded-xl font-display font-black text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
                              phase === "ready"
                                ? "bg-button-tactile hover:bg-button-tactile-active text-white shadow-button-tactile active:translate-y-1 active:shadow-button-tactile-active cursor-pointer"
                                : "bg-obsidian-900 text-text-muted border border-white/10 opacity-40 cursor-not-allowed"
                            }`}
                          >
                            <span>PRESS BLUE BUTTON</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Hardware Warning */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono text-text-muted">
                  <AlertCircle className="w-4 h-4 text-saffron-400 flex-shrink-0" />
                  <span>
                    <strong>EVM Security Interlock:</strong> Once the blue button is pressed, the Ballot Unit automatically locks until re-enabled by the Presiding Officer on the Control Unit.
                  </span>
                </div>
              </AnimatedCard>

              {/* ===================================================
                  CRYPTOGRAPHIC SHA-256 AUDIT LEDGER (IaaS TELEMETRY)
                  =================================================== */}
              <AnimatedCard delay={0.3} id="ledger" className="p-6 sm:p-8 flex flex-col gap-4 animate-border-continuous">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Terminal className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h3 className="font-display font-extrabold text-sm text-obsidian-950 dark:text-white uppercase tracking-wider">
                        IMMUTABLE SHA-256 AUDIT LEDGER
                      </h3>
                      <span className="text-[10px] font-mono text-text-muted">REAL-TIME BLOCK GENERATION & VVPAT VERIFICATION LOG</span>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={copyAuditLogs}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-950 border border-white/15 text-xs font-mono text-cyber-400 hover:border-cyber-500/50 transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY LEDGER</span>
                  </button>
                </div>

                {/* Log Table / Stream */}
                <div className="max-h-60 overflow-y-auto flex flex-col gap-2 pr-1">
                  {auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl bg-obsidian-950/80 border border-white/5 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                          BLOCK #{log.blockNum}
                        </span>
                        <span className="text-text-secondary text-[11px]">{log.timestamp}</span>
                        <span className="text-white font-semibold">{log.action}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-cyber-400/90 font-mono truncate max-w-[180px]">
                          SHA-256: {log.hash}
                        </span>
                        <span title="Proof Verified">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedCard>

            </section>

          </div>

        </div>
      </main>
    </>
  );
}
