"use client";

/**
 * EVM Simulator — Interactive Electronic Voting Machine
 * Developed and Architected by Abhijeet Kangane
 * NexGen Vote — Election Education Platform
 */

import { useState, useCallback, useRef, useEffect } from "react";

/* ── Candidates ── */
const CANDIDATES = [
  { id: "A", name: "Asha Devi", party: "Progressive Alliance", symbol: "🌸" },
  { id: "B", name: "Rajan Kumar", party: "People's Front", symbol: "🌾" },
  { id: "C", name: "Sunita Sharma", party: "National Unity", symbol: "⚡" },
  { id: "D", name: "Mohan Lal", party: "Green Future", symbol: "🌿" },
  { id: "N", name: "NOTA", party: "None of the Above", symbol: "✗" },
] as const;

type CandidateId = (typeof CANDIDATES)[number]["id"];
type Phase = "idle" | "ready" | "voted" | "done";

/* ── Beep via Web Audio API ── */
function playBeep() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "square";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch { /* silently ignore if audio unavailable */ }
}

/* ═══════════════════════════════════════
   LED INDICATOR
═══════════════════════════════════════ */
function LED({ on, color = "red" }: { on: boolean; color?: "red" | "green" }) {
  const colors = {
    red: { bg: on ? "#ef4444" : "#4b1313", glow: "0 0 10px #ef4444, 0 0 20px #ef444470" },
    green: { bg: on ? "#22c55e" : "#14381f", glow: "0 0 10px #22c55e, 0 0 20px #22c55e70" },
  };
  return (
    <span
      className="inline-block w-4 h-4 rounded-full flex-shrink-0 transition-all duration-200"
      style={{ background: colors[color].bg, boxShadow: on ? colors[color].glow : "none" }}
      aria-hidden="true"
    />
  );
}

/* ═══════════════════════════════════════
   VVPAT MODAL
═══════════════════════════════════════ */
function VVPATModal({ candidate, onClose }: { candidate: typeof CANDIDATES[number]; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 7000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="vvpat-title"
      aria-describedby="vvpat-desc"
    >
      <div
        className="relative max-w-sm w-full rounded-3xl p-8 text-center animate-slide-up"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        {/* VVPAT slip header */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6"
          style={{ background: "hsl(142,70%,40%,0.15)", color: "var(--color-success)", border: "1px solid hsl(142,70%,40%,0.3)" }}
          role="status"
        >
          <LED on color="green" />
          VVPAT Slip — Vote Recorded
        </div>

        {/* Slip body */}
        <div
          className="rounded-2xl p-6 mb-6 border-2 border-dashed"
          style={{ borderColor: "var(--color-border)", background: "var(--color-bg-secondary)" }}
          aria-label={`Your vote has been cast for ${candidate.name} of ${candidate.party}`}
        >
          <p className="text-5xl mb-3" aria-hidden="true">{candidate.symbol}</p>
          <p className="font-display font-bold text-xl" style={{ color: "var(--color-text-primary)" }}>
            {candidate.name}
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
            {candidate.party}
          </p>
          <div
            className="mt-4 text-xs py-2 px-3 rounded-lg"
            style={{ background: "var(--color-bg)", color: "var(--color-text-muted)" }}
          >
            Displayed for 7 seconds, then destroyed
          </div>
        </div>

        <h2 id="vvpat-title" className="font-display font-bold text-lg mb-2" style={{ color: "var(--color-success)" }}>
          ✅ Vote Recorded Successfully!
        </h2>
        <p id="vvpat-desc" className="text-sm mb-6" style={{ color: "var(--color-text-secondary)" }}>
          This is exactly how a <strong>VVPAT</strong> works — you see your candidate's symbol for 7 seconds to verify your vote before it&apos;s sealed.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs" style={{ color: "var(--color-text-muted)" }}>
          <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "var(--color-bg-tertiary)" }}>
            <div className="h-full rounded-full animate-[shrink_7s_linear_forwards]" style={{ background: "var(--color-success)", width: "100%" }} />
          </div>
          <span>Auto-closes in 7s</span>
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-xs underline focus-ring rounded"
          style={{ color: "var(--color-text-muted)" }}
          aria-label="Close VVPAT confirmation dialog"
        >
          Close
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════ */
export default function EVMSimulatorPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [selected, setSelected] = useState<CandidateId | null>(null);
  const [showVVPAT, setShowVVPAT] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const resetCount = useRef(0);

  const announce = (msg: string) => setAnnouncement(msg);

  /* Enable ballot */
  const enableBallot = useCallback(() => {
    setPhase("ready");
    setSelected(null);
    announce("Ballot unit is now active. Please select your candidate.");
  }, []);

  /* Cast vote */
  const castVote = useCallback((id: CandidateId) => {
    if (phase !== "ready") return;
    setSelected(id);
    setPhase("voted");
    playBeep();
    const c = CANDIDATES.find((c) => c.id === id)!;
    announce(`Vote cast for ${c.name}. VVPAT confirmation displayed.`);
    setShowVVPAT(true);
  }, [phase]);

  /* Reset */
  const resetMachine = useCallback(() => {
    resetCount.current += 1;
    setPhase("idle");
    setSelected(null);
    setShowVVPAT(false);
    announce("Machine reset. Ready for next voter.");
  }, []);

  const selectedCandidate = CANDIDATES.find((c) => c.id === selected);

  return (
    <>
      {/* A11y live region */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {showVVPAT && selectedCandidate && (
        <VVPATModal candidate={selectedCandidate} onClose={() => setShowVVPAT(false)} />
      )}

      <main
        id="main-content"
        role="main"
        aria-labelledby="evm-page-heading"
        className="min-h-[calc(100dvh-64px)] flex flex-col"
        style={{ background: "var(--color-bg)" }}
      >
        {/* ── Page Header ── */}
        <div
          className="text-center py-10"
          style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border-subtle)" }}
        >
          <div className="container-app">
            <span className="text-5xl mb-3 block animate-float" aria-hidden="true">🗳️</span>
            <h1 id="evm-page-heading" className="font-display font-bold text-3xl sm:text-4xl gradient-text mb-2">
              EVM Simulator
            </h1>
            <p className="text-sm max-w-xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
              Experience a realistic Electronic Voting Machine. Use the{" "}
              <strong style={{ color: "var(--color-primary)" }}>Control Unit</strong> to enable the ballot, then cast your vote on the{" "}
              <strong style={{ color: "var(--color-accent)" }}>Ballot Unit</strong>.
            </p>
          </div>
        </div>

        {/* ── Simulator Body ── */}
        <div className="container-app flex-1 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* ════════════════════════
                CONTROL UNIT
            ════════════════════════ */}
            <section aria-labelledby="cu-heading">
              <div
                className="rounded-3xl overflow-hidden h-full"
                style={{
                  background: "var(--color-surface)",
                  border: "2px solid var(--color-border)",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                {/* CU Header */}
                <div
                  className="px-6 py-4 flex items-center justify-between"
                  style={{ background: "hsl(220,25%,16%)", borderBottom: "2px solid hsl(220,25%,20%)" }}
                >
                  <div>
                    <h2 id="cu-heading" className="font-display font-bold text-white text-sm tracking-widest uppercase">
                      Control Unit
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: "hsl(220,15%,55%)" }}>For Presiding Officer</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <LED on={phase !== "idle"} color="green" />
                    <span className="text-xs" style={{ color: "hsl(220,15%,55%)" }}>
                      {phase === "idle" ? "STANDBY" : phase === "ready" ? "ACTIVE" : phase === "voted" ? "VOTED" : "DONE"}
                    </span>
                  </div>
                </div>

                {/* CU Body */}
                <div className="p-6 flex flex-col gap-6">
                  {/* Status panel */}
                  <div
                    className="rounded-2xl p-4 font-mono text-xs space-y-2"
                    style={{ background: "hsl(220,25%,12%)", color: "hsl(142,60%,60%)" }}
                    role="status"
                    aria-label="Control unit status panel"
                  >
                    <div className="flex justify-between">
                      <span style={{ color: "hsl(220,15%,50%)" }}>SESSION</span>
                      <span>#{String(resetCount.current + 1).padStart(4, "0")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "hsl(220,15%,50%)" }}>STATUS</span>
                      <span>{phase === "idle" ? "STANDBY" : phase === "ready" ? "BALLOT ENABLED" : phase === "voted" ? "VOTE CAST" : "COMPLETE"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "hsl(220,15%,50%)" }}>BALLOT UNIT</span>
                      <span>{phase === "ready" ? "UNLOCKED" : "LOCKED"}</span>
                    </div>
                  </div>

                  {/* Enable Ballot Button */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>
                      Step 1 — Enable Ballot
                    </p>
                    <button
                      onClick={enableBallot}
                      disabled={phase === "ready" || phase === "voted"}
                      aria-label="Enable ballot unit for voter"
                      aria-pressed={phase !== "idle"}
                      className="w-full py-4 rounded-2xl font-display font-bold text-base transition-all duration-200 focus-ring"
                      style={{
                        background: phase === "idle"
                          ? "linear-gradient(135deg, hsl(142,70%,36%), hsl(142,65%,44%))"
                          : "var(--color-bg-tertiary)",
                        color: phase === "idle" ? "#fff" : "var(--color-text-muted)",
                        boxShadow: phase === "idle" ? "0 6px 20px -4px hsl(142,70%,36%,0.5)" : "none",
                        cursor: phase !== "idle" ? "not-allowed" : "pointer",
                      }}
                    >
                      {phase === "idle" ? "🟢 Enable Ballot Unit" : phase === "ready" ? "✅ Ballot Active" : "🔒 Ballot Locked"}
                    </button>
                  </div>

                  {/* Reset Button */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>
                      Step 3 — Reset for Next Voter
                    </p>
                    <button
                      onClick={resetMachine}
                      disabled={phase === "idle" || phase === "ready"}
                      aria-label="Reset EVM for the next voter"
                      className="w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-200 focus-ring"
                      style={{
                        background: phase === "voted"
                          ? "linear-gradient(135deg, hsl(220,75%,48%), hsl(240,70%,58%))"
                          : "var(--color-bg-tertiary)",
                        color: phase === "voted" ? "#fff" : "var(--color-text-muted)",
                        boxShadow: phase === "voted" ? "0 4px 16px -4px hsl(220,75%,48%,0.4)" : "none",
                        cursor: (phase === "idle" || phase === "ready") ? "not-allowed" : "pointer",
                      }}
                    >
                      🔄 Reset Machine
                    </button>
                  </div>

                  {/* Instructions */}
                  <ol className="text-xs space-y-2 list-none" style={{ color: "var(--color-text-muted)" }}>
                    {[
                      "Verify voter identity on electoral roll",
                      "Mark finger with indelible ink",
                      "Press Enable Ballot Unit",
                      "Direct voter to Ballot Unit",
                      "After vote: reset for next voter",
                    ].map((s, i) => (
                      <li key={i} className="flex gap-2">
                        <span
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: "hsl(220,25%,24%)" }}
                          aria-hidden="true"
                        >
                          {i + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>

            {/* ════════════════════════
                BALLOT UNIT
            ════════════════════════ */}
            <section aria-labelledby="bu-heading">
              <div
                className="rounded-3xl overflow-hidden h-full"
                style={{
                  background: "var(--color-surface)",
                  border: `2px solid ${phase === "ready" ? "hsl(220,75%,48%)" : "var(--color-border)"}`,
                  boxShadow: phase === "ready" ? "0 0 32px -8px hsl(220,75%,48%,0.35)" : "var(--shadow-lg)",
                  transition: "all 0.3s ease",
                }}
              >
                {/* BU Header */}
                <div
                  className="px-6 py-4 flex items-center justify-between"
                  style={{
                    background: phase === "ready" ? "hsl(220,50%,20%)" : "hsl(220,25%,16%)",
                    borderBottom: `2px solid ${phase === "ready" ? "hsl(220,60%,28%)" : "hsl(220,25%,20%)"}`,
                    transition: "all 0.3s ease",
                  }}
                >
                  <div>
                    <h2 id="bu-heading" className="font-display font-bold text-white text-sm tracking-widest uppercase">
                      Ballot Unit
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: "hsl(220,15%,55%)" }}>For Voter</p>
                  </div>
                  <div className="flex items-center gap-2" role="status" aria-label={`Ballot unit is ${phase === "ready" ? "active and ready" : "locked"}`}>
                    <LED on={phase === "ready"} color="green" />
                    <span className="text-xs" style={{ color: "hsl(220,15%,55%)" }}>
                      {phase === "ready" ? "READY" : "LOCKED"}
                    </span>
                  </div>
                </div>

                {/* Step 2 label */}
                <div className="px-6 pt-4 pb-2">
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                    Step 2 — Press Blue Button to Vote
                  </p>
                </div>

                {/* Locked overlay hint */}
                {phase === "idle" && (
                  <div
                    className="mx-6 mb-4 px-4 py-3 rounded-xl text-xs text-center"
                    style={{ background: "hsl(38,92%,50%,0.08)", border: "1px solid hsl(38,92%,50%,0.25)", color: "hsl(38,70%,45%)" }}
                    role="status"
                    aria-live="polite"
                  >
                    ⚠️ Ballot unit is locked. Presiding officer must press &quot;Enable Ballot Unit&quot; first.
                  </div>
                )}

                {/* Candidate Rows */}
                <div
                  className="px-4 pb-4 flex flex-col gap-2"
                  role="group"
                  aria-label="Candidate list — press blue button to vote"
                  aria-disabled={phase !== "ready"}
                >
                  {CANDIDATES.map((c, idx) => {
                    const isVoted = selected === c.id && phase === "voted";
                    const isDisabled = phase !== "ready";
                    const isNota = c.id === "N";

                    return (
                      <div
                        key={c.id}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200"
                        style={{
                          background: isVoted
                            ? "hsl(142,70%,40%,0.1)"
                            : "var(--color-bg-secondary)",
                          border: isVoted
                            ? "1px solid hsl(142,70%,40%,0.35)"
                            : isNota
                            ? "1px dashed var(--color-border)"
                            : "1px solid var(--color-border-subtle)",
                        }}
                      >
                        {/* Candidate number */}
                        <span
                          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: isNota ? "hsl(220,15%,35%)" : "hsl(220,75%,40%)" }}
                          aria-hidden="true"
                        >
                          {idx + 1}
                        </span>

                        {/* Symbol */}
                        <span className="text-xl flex-shrink-0" aria-hidden="true">{c.symbol}</span>

                        {/* Name & Party */}
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-semibold text-sm truncate"
                            style={{ color: "var(--color-text-primary)" }}
                          >
                            {c.name}
                          </p>
                          <p className="text-xs truncate" style={{ color: "var(--color-text-muted)" }}>
                            {c.party}
                          </p>
                        </div>

                        {/* LED */}
                        <LED on={isVoted} color="red" />

                        {/* Vote Button */}
                        <button
                          onClick={() => castVote(c.id)}
                          disabled={isDisabled}
                          aria-label={`Vote for ${c.name} — ${c.party}`}
                          aria-pressed={isVoted}
                          className="flex-shrink-0 w-10 h-10 rounded-xl font-bold text-sm transition-all duration-200 focus-ring"
                          style={{
                            background: isVoted
                              ? "hsl(142,70%,40%)"
                              : isDisabled
                              ? "hsl(220,25%,28%)"
                              : "hsl(220,75%,48%)",
                            color: "#fff",
                            cursor: isDisabled ? "not-allowed" : "pointer",
                            boxShadow: !isDisabled && phase === "ready"
                              ? "0 4px 12px -2px hsl(220,75%,48%,0.5)"
                              : "none",
                            opacity: isDisabled && phase !== "voted" ? 0.5 : 1,
                          }}
                        >
                          {isVoted ? "✓" : "●"}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Vote success state */}
                {phase === "voted" && selectedCandidate && (
                  <div
                    className="mx-4 mb-4 p-4 rounded-2xl text-center animate-slide-up"
                    style={{
                      background: "hsl(142,70%,40%,0.1)",
                      border: "1px solid hsl(142,70%,40%,0.3)",
                    }}
                    role="status"
                    aria-live="assertive"
                    aria-label={`Vote successfully recorded for ${selectedCandidate.name}`}
                  >
                    <p className="font-display font-bold text-sm" style={{ color: "var(--color-success)" }}>
                      ✅ Vote Recorded!
                    </p>
                    <p className="text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>
                      {selectedCandidate.symbol} {selectedCandidate.name}
                    </p>
                    <button
                      onClick={() => setShowVVPAT(true)}
                      className="mt-2 text-xs underline focus-ring rounded"
                      style={{ color: "var(--color-primary)" }}
                      aria-label="View VVPAT confirmation slip again"
                    >
                      View VVPAT slip again
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* ── How to use strip ── */}
          <div
            className="mt-8 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4"
            role="list"
            aria-label="EVM simulator steps"
          >
            {[
              { icon: "🟢", step: "1", title: "Enable Ballot", desc: "Presiding officer clicks Enable Ballot Unit on the Control Unit." },
              { icon: "🔵", step: "2", title: "Cast Vote", desc: "Voter presses blue button next to their candidate. A beep confirms the vote." },
              { icon: "🧾", step: "3", title: "VVPAT Check", desc: "A paper slip displays the candidate for 7 seconds to verify the vote." },
            ].map((s) => (
              <div
                key={s.step}
                role="listitem"
                className="glass-card rounded-2xl p-5 flex gap-4 items-start"
                aria-label={`Step ${s.step}: ${s.title}`}
              >
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{s.icon}</span>
                <div>
                  <p className="font-display font-bold text-sm mb-1" style={{ color: "var(--color-text-primary)" }}>{s.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Attribution ── */}
          <div
            className="mt-10 max-w-5xl mx-auto flex items-center justify-center gap-3 px-6 py-4 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, hsl(220,75%,48%,0.06), hsl(28,88%,44%,0.06))",
              border: "1px solid hsl(220,75%,48%,0.15)",
              boxShadow: "0 0 28px -8px hsl(220,75%,48%,0.18)",
            }}
            role="contentinfo"
            aria-label="EVM Simulator attribution"
          >
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse-soft flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                boxShadow: "0 0 10px var(--color-primary)",
              }}
              aria-hidden="true"
            />
            <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
              <span aria-hidden="true">⚡ </span>
              Interactive EVM Engine engineered by{" "}
              <span className="gradient-text font-bold">Abhijeet Kangane</span>
              
              <span aria-hidden="true"> 🇮🇳✦</span>
            </p>
          </div>
        </div>
      </main>

      {/* Progress bar keyframe for VVPAT */}
      <style>{`
        @keyframes shrink { from { width: 100%; } to { width: 0%; } }
      `}</style>
    </>
  );
}
