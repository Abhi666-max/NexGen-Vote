"use client";

/**
 * NexGen Vote — Premium Homepage
 * Developed and Architected by Abhijeet Kangane
 */

import Link from "next/link";

const FEATURES = [
  { icon: "🤖", badge: "Gemini AI", badgeColor: "hsl(220,75%,48%)", title: "AI Voter Mitra", desc: "Chat with your personal AI guide — ask anything about registration, EVMs, voter rights, and more. Available 24/7.", href: "/voter-mitra", cta: "Start Chatting", gradient: "linear-gradient(135deg, hsl(220,75%,48%), hsl(240,70%,58%))" },
  { icon: "🗳️", badge: "Interactive", badgeColor: "hsl(142,65%,40%)", title: "EVM Simulator", desc: "Experience the real voting process with our gamified EVM. Control Unit, Ballot Unit, live LED & VVPAT confirmation.", href: "/evm-simulator", cta: "Try Simulator", gradient: "linear-gradient(135deg, hsl(142,65%,40%), hsl(160,60%,48%))" },
  { icon: "📍", badge: "Maps API", badgeColor: "hsl(28,88%,44%)", title: "Booth Locator", desc: "Find your nearest polling booth instantly. Search by pincode and get directions with accessibility information.", href: "/booth-locator", cta: "Find My Booth", gradient: "linear-gradient(135deg, hsl(28,88%,44%), hsl(38,90%,54%))" },
  { icon: "🧠", badge: "Quiz", badgeColor: "hsl(280,70%,56%)", title: "Myth-Buster Quiz", desc: "Think EVMs can be hacked? Test your knowledge with our election fact-check quiz and earn your voter badge.", href: "/quiz", cta: "Take the Quiz", gradient: "linear-gradient(135deg, hsl(280,70%,56%), hsl(300,65%,60%))" },
] as const;

const STATS = [
  { value: "970M+", label: "Registered Voters" },
  { value: "~1M", label: "Polling Stations" },
  { value: "4", label: "Core Features" },
  { value: "100%", label: "Secure & Private" },
] as const;

const STEPS = [
  { num: "01", icon: "📚", title: "Learn the Facts", desc: "Use AI Voter Mitra and bust myths with the quiz. Understand your rights before you vote.", color: "hsl(220,75%,48%)" },
  { num: "02", icon: "🗳️", title: "Simulate Voting", desc: "Try our realistic EVM Simulator — Control Unit, Ballot Unit, beep, VVPAT — the full experience.", color: "hsl(142,65%,40%)" },
  { num: "03", icon: "✅", title: "Vote with Confidence", desc: "Find your polling booth, know what to carry, and exercise your democratic right.", color: "hsl(28,88%,44%)" },
] as const;

export default function HomePage() {
  return (
    <main id="main-content" role="main" aria-labelledby="hero-heading">

      {/* ── HERO ── */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden" style={{ paddingTop: "clamp(5rem,12vw,9rem)", paddingBottom: "clamp(4rem,10vw,7rem)", background: "var(--color-bg)" }}>
        {/* Subtle moving background blobs */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.6 }}>
          <div className="animate-blob" style={{ position: "absolute", top: "-10%", left: "40%", width: "min(600px, 80vw)", height: "min(600px, 80vw)", background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)", filter: "blur(40px)", animation: "blob-bounce 10s infinite alternate ease-in-out" }} />
          <div className="animate-blob animation-delay-2000" style={{ position: "absolute", bottom: "-10%", right: "20%", width: "min(500px, 60vw)", height: "min(500px, 60vw)", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)", filter: "blur(40px)", animation: "blob-bounce 12s infinite alternate-reverse ease-in-out" }} />
        </div>

        <div className="container-app relative text-center" style={{ zIndex: 1 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8" style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: "var(--color-primary)" }} aria-label="India's Premier Election Education Platform">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-soft" style={{ background: "var(--color-primary)" }} aria-hidden="true" />
            India&apos;s Premier Election Education Platform
          </div>

          <h1 id="hero-heading" className="font-display font-black mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text" style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)", lineHeight: 1.08, letterSpacing: "-0.03em", dropShadow: "0 2px 10px rgba(59,130,246,0.2)" }}>
            Democracy, Now in Your<br />Hands.
          </h1>

          <p className="mx-auto mb-10" style={{ fontSize: "clamp(1rem,2vw,1.2rem)", lineHeight: 1.65, maxWidth: "560px", color: "var(--color-text-secondary)" }}>
            Understand elections. Simulate voting. Find your booth. Bust myths. Everything a first-time voter needs — powered by AI.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link href="/evm-simulator" aria-label="Try the EVM Simulator" className="focus-ring" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.875rem 2rem", borderRadius: "14px", background: "var(--color-primary)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", textDecoration: "none", boxShadow: "0 4px 12px -2px rgba(0,0,0,0.15)" }}>🗳️ Try EVM Simulator</Link>
            <Link href="/voter-mitra" aria-label="Ask Voter Mitra AI" className="btn-ghost focus-ring" style={{ padding: "0.875rem 2rem", fontSize: "1rem", borderRadius: "14px", fontFamily: "var(--font-display)", fontWeight: 600 }}>🤖 Ask Voter Mitra</Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px max-w-2xl mx-auto rounded-2xl overflow-hidden" style={{ background: "var(--color-border-subtle)" }} role="list" aria-label="Platform statistics">
            {STATS.map((s) => (
              <div key={s.label} role="listitem" className="flex flex-col items-center py-5 px-4" style={{ background: "var(--color-surface)" }}>
                <span className="font-display font-black" style={{ fontSize: "clamp(1.5rem,3vw,2rem)", lineHeight: 1, color: "var(--color-text-primary)" }}>{s.value}</span>
                <span className="text-xs mt-1.5 font-medium" style={{ color: "var(--color-text-muted)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section aria-labelledby="features-heading" style={{ background: "var(--color-bg-secondary)", borderTop: "1px solid var(--color-border-subtle)", borderBottom: "1px solid var(--color-border-subtle)", padding: "clamp(4rem,8vw,7rem) 0" }}>
        <div className="container-app">
          <div className="text-center mb-14">
            <h2 id="features-heading" className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", letterSpacing: "-0.02em", color: "var(--color-text-primary)" }}>Everything You Need to Vote Smart</h2>
            <p style={{ color: "var(--color-text-secondary)", maxWidth: "460px", margin: "0 auto" }}>Four powerful tools. One mission — making every Indian voter informed.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" role="list" aria-label="Platform features">
            {FEATURES.map((f) => (
              <article key={f.href} role="listitem" aria-label={`Feature: ${f.title}`} className="glass-card rounded-3xl overflow-hidden flex flex-col transition-all duration-300" style={{ border: "1px solid var(--color-border)" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 20px 40px -12px rgba(0,0,0,0.2)"; el.style.borderColor = f.badgeColor; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = "var(--glass-shadow)"; el.style.borderColor = "var(--color-border)"; }}
              >
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: f.gradient }} aria-hidden="true">{f.icon}</div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${f.badgeColor}18`, color: f.badgeColor, border: `1px solid ${f.badgeColor}30` }}>{f.badge}</span>
                </div>
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <h3 className="font-display font-bold text-lg" style={{ color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}>{f.title}</h3>
                  <p className="text-sm flex-1 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{f.desc}</p>
                  <Link href={f.href} aria-label={`${f.cta} — ${f.title}`} className="focus-ring inline-flex items-center justify-center gap-1 py-2.5 px-4 rounded-xl text-sm font-semibold mt-1" style={{ background: f.gradient, color: "#fff", textDecoration: "none", fontFamily: "var(--font-display)" }}>{f.cta} →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section aria-labelledby="how-heading" style={{ padding: "clamp(4rem,8vw,7rem) 0", background: "var(--color-bg)" }}>
        <div className="container-app">
          <div className="text-center mb-14">
            <h2 id="how-heading" className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", letterSpacing: "-0.02em", color: "var(--color-text-primary)" }}>Your Voting Journey</h2>
            <p style={{ color: "var(--color-text-secondary)", maxWidth: "380px", margin: "0 auto" }}>Three steps from first-time voter to informed citizen.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto" role="list" aria-label="Three-step voting journey">
            {STEPS.map((step, i) => (
              <div key={step.num} role="listitem" aria-label={`Step ${step.num}: ${step.title}`} className="glass-card rounded-3xl p-7 text-center relative" style={{ border: "1px solid var(--color-border)" }}>
                <div className="inline-flex w-12 h-12 rounded-2xl items-center justify-center text-2xl mb-5" style={{ background: `${step.color}18`, border: `1px solid ${step.color}30` }} aria-hidden="true">{step.icon}</div>
                <div className="font-display font-black text-xs tracking-widest mb-3 uppercase" style={{ color: step.color }}>Step {step.num}</div>
                <h3 className="font-display font-bold text-xl mb-3" style={{ color: "var(--color-text-primary)" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{step.desc}</p>
                {i < 2 && <div className="hidden md:block absolute top-1/2 -right-3 text-lg z-10" aria-hidden="true" style={{ transform: "translateY(-50%)" }}>→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA + ATTRIBUTION ── */}
      <section aria-labelledby="cta-heading" style={{ background: "var(--color-bg-secondary)", borderTop: "1px solid var(--color-border-subtle)", padding: "clamp(4rem,8vw,6rem) 0" }}>
        <div className="container-app text-center">
          <h2 id="cta-heading" className="font-display font-black mb-5" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--color-text-primary)" }}>
            Your Vote Is Sacred.<br />Make It Count.
          </h2>
          <p className="mb-10 mx-auto" style={{ color: "var(--color-text-secondary)", maxWidth: "460px", fontSize: "1.1rem" }}>
            Over 970 million Indians have the right to vote. Exercise yours with confidence.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <Link href="/quiz" aria-label="Take the Myth-Buster quiz" className="focus-ring" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.875rem 2rem", borderRadius: "14px", background: "var(--color-primary)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", textDecoration: "none", boxShadow: "0 4px 12px -2px rgba(0,0,0,0.15)" }}>🧠 Take the Quiz</Link>
            <Link href="/booth-locator" aria-label="Find your nearest polling booth" className="btn-ghost focus-ring" style={{ padding: "0.875rem 2rem", fontSize: "1rem", borderRadius: "14px", fontFamily: "var(--font-display)", fontWeight: 600 }}>📍 Find My Booth</Link>
          </div>

          <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl" style={{ background: "linear-gradient(135deg, hsl(220,75%,48%,0.07), hsl(28,88%,44%,0.07))", border: "1px solid hsl(220,75%,48%,0.18)", boxShadow: "0 0 32px -8px hsl(220,75%,48%,0.2)" }} role="contentinfo" aria-label="Project attribution">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse-soft" style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))", boxShadow: "0 0 10px var(--color-primary)" }} aria-hidden="true" />
            <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
              Engineered with precision by <span className="gradient-text font-bold">Abhijeet Kangane</span> <span aria-hidden="true">🇮🇳✦</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
