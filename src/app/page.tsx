"use client";

/**
 * NexGen Civic OS — Enterprise Command Console & Homepage
 * Architected by Abhijeet Kangane
 */

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  Bot, 
  Vote, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Terminal, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Database,
  Radio,
  Share2
} from "lucide-react";

/* ========================================================
   TELEMETRY STATS MATRIX
   ======================================================== */
const STATS = [
  { value: "970M+", label: "Eligible Indian Voters", icon: Activity, color: "text-primary-400" },
  { value: "~1.05M", label: "Active Polling Booths", icon: MapPin, color: "text-cyber-400" },
  { value: "SHA-256", label: "Cryptographic Audit Ledger", icon: Lock, color: "text-emerald-400" },
  { value: "< 14ms", label: "AI Voter Mitra Latency", icon: Cpu, color: "text-electric-400" },
] as const;

/* ========================================================
   FEATURE COMMAND MODULES
   ======================================================== */
const FEATURES = [
  {
    id: "mitra",
    title: "Voter Mitra AI Copilot",
    subtitle: "Real-Time Civic Intelligence",
    desc: "24/7 autonomous conversational engine trained on official ECI regulations, constitutional law (Art. 326), and voter rights. Instant multilingual civic answers.",
    href: "/voter-mitra",
    cta: "Launch Copilot",
    icon: Bot,
    badge: "Llama 3.3 70B AI",
    badgeColor: "border-electric-500/40 text-electric-300 bg-electric-500/10",
    gradient: "from-electric-600 to-indigo-600",
    previewType: "chat",
  },
  {
    id: "evm",
    title: "EVM Hardware Digital Twin",
    subtitle: "High-Fidelity Voting Simulation",
    desc: "Industrial-grade simulation of the Control Unit (CU), Ballot Unit (BU) tactile blue buttons, authentic audio feedback, and physical VVPAT thermal slip confirmation.",
    href: "/evm-simulator",
    cta: "Boot Hardware Twin",
    icon: Vote,
    badge: "Hardware Twin",
    badgeColor: "border-cyber-500/40 text-cyber-300 bg-cyber-500/10",
    gradient: "from-cyber-600 to-primary-600",
    previewType: "evm",
  },
  {
    id: "booth",
    title: "Geospatial Operations Center",
    subtitle: "Polling Station Intelligence",
    desc: "Interactive vector radar mapping your exact polling station. Real-time queue estimation, ward filtering, turn-by-turn routing, and senior/disability accessibility verification.",
    href: "/booth-locator",
    cta: "Open Radar Map",
    icon: MapPin,
    badge: "Vector GIS",
    badgeColor: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
    gradient: "from-emerald-600 to-teal-600",
    previewType: "map",
  },
  {
    id: "quiz",
    title: "Civic Assessment & Certification",
    subtitle: "Myth-Buster & Credentialing",
    desc: "Debunk prevalent election misconceptions through a gamified competency engine. Earn your verifiable, high-resolution Certified Democracy Pro digital badge.",
    href: "/quiz",
    cta: "Start Assessment",
    icon: Award,
    badge: "Verifiable Credential",
    badgeColor: "border-saffron-500/40 text-saffron-300 bg-saffron-500/10",
    gradient: "from-saffron-600 to-amber-600",
    previewType: "badge",
  },
] as const;

/* ========================================================
   SYSTEM ARCHITECTURE STEPS
   ======================================================== */
const ARCHITECTURE_STEPS = [
  {
    step: "01",
    title: "Verify Civic Rights & Facts",
    desc: "Query the autonomous Voter Mitra AI or run constitutional assessments to understand electoral roll verification, EPIC card laws, and NOTA provisions.",
    icon: Terminal,
    color: "border-electric-500/40 text-electric-400 bg-electric-500/10",
  },
  {
    step: "02",
    title: "Simulate Cryptographic Voting",
    desc: "Interact with the EVM Hardware Digital Twin. Press the tactile candidate switch, hear the exact 880Hz audio beep, and inspect the VVPAT paper trail.",
    icon: ShieldCheck,
    color: "border-cyber-500/40 text-cyber-400 bg-cyber-500/10",
  },
  {
    step: "03",
    title: "Deploy to Polling Station",
    desc: "Use the GIS operations center to locate your ward polling booth, check wheelchair accessibility, and cast your physical ballot with complete confidence.",
    icon: CheckCircle2,
    color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
  },
] as const;

/* ========================================================
   MINI-PREVIEW COMPONENTS (Interactive SaaS Cards)
   ======================================================== */
function MiniChatPreview() {
  return (
    <div className="rounded-xl bg-obsidian-950/80 border border-white/10 p-3 text-xs font-mono flex flex-col gap-2 my-3 shadow-inner">
      <div className="flex items-center justify-between text-[10px] text-text-muted border-b border-white/5 pb-1.5">
        <span className="flex items-center gap-1.5 text-electric-400"><Bot className="w-3 h-3 animate-bounce" /> VOTER MITRA AI v2.0</span>
        <span className="text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> STREAMING</span>
      </div>
      <div className="text-text-secondary leading-snug">
        <span className="text-cyber-400 font-bold">Query:</span> How does VVPAT guarantee zero hacking?
      </div>
      <div className="p-2 rounded bg-obsidian-900 border border-electric-500/20 text-white/90 leading-snug">
        <span className="text-emerald-400">Response:</span> VVPAT creates a physically verified paper audit trail visible for 7 seconds before dropping into a sealed drop-box...
      </div>
    </div>
  );
}

function MiniEVMPreview() {
  return (
    <div className="rounded-xl bg-obsidian-950/80 border border-white/10 p-3 text-xs font-mono flex flex-col gap-2 my-3 shadow-inner">
      <div className="flex items-center justify-between text-[10px] text-text-muted border-b border-white/5 pb-1.5">
        <span className="flex items-center gap-1.5 text-cyber-400"><Vote className="w-3 h-3 animate-pulse" /> EVM HARDWARE TWIN</span>
        <span className="text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> BALLOT READY</span>
      </div>
      <div className="flex items-center justify-between gap-2 p-2 rounded bg-obsidian-900 border border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-sm" />
          <span className="text-white font-bold tracking-wider">CANDIDATE 01</span>
        </div>
        <div className="px-2 py-0.5 rounded bg-primary-600 text-white text-[10px] font-extrabold shadow-sm">
          BLUE BUTTON
        </div>
      </div>
      <div className="text-[10px] text-emerald-400/90 flex items-center gap-1">
        <Lock className="w-3 h-3" /> SHA-256: 8f4a...e12b AUDIT VERIFIED
      </div>
    </div>
  );
}

function MiniMapPreview() {
  return (
    <div className="rounded-xl bg-obsidian-950/80 border border-white/10 p-3 text-xs font-mono flex flex-col gap-2 my-3 shadow-inner relative overflow-hidden">
      <div className="flex items-center justify-between text-[10px] text-text-muted border-b border-white/5 pb-1.5">
        <span className="flex items-center gap-1.5 text-emerald-400"><MapPin className="w-3 h-3 animate-pulse" /> GIS RADAR CONSOLE</span>
        <span className="text-cyber-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyber-400 animate-pulse" /> WARD 04 ACTIVE</span>
      </div>
      <div className="h-16 rounded bg-obsidian-900 border border-emerald-500/20 relative flex items-center justify-center overflow-hidden">
        {/* Radar scan ring */}
        <div className="absolute w-24 h-24 rounded-full border border-emerald-500/20 animate-ping opacity-30" />
        <div className="flex items-center gap-2 z-10 bg-obsidian-950/90 px-2.5 py-1 rounded-full border border-emerald-500/40 text-[10px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white font-bold">BOOTHS: 5 FOUND</span>
        </div>
      </div>
      <div className="text-[10px] text-text-secondary flex items-center justify-between">
        <span>Queue Est: ~12 mins</span>
        <span className="text-emerald-400">♿ 100% Accessible</span>
      </div>
    </div>
  );
}

function MiniBadgePreview() {
  return (
    <div className="rounded-xl bg-obsidian-950/80 border border-white/10 p-3 text-xs font-mono flex flex-col gap-2 my-3 shadow-inner">
      <div className="flex items-center justify-between text-[10px] text-text-muted border-b border-white/5 pb-1.5">
        <span className="flex items-center gap-1.5 text-saffron-400"><Award className="w-3 h-3 animate-spin" style={{ animationDuration: "6s" }} /> CREDENTIAL ENGINE</span>
        <span className="text-saffron-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-saffron-400 animate-pulse" /> VERIFIABLE ID</span>
      </div>
      <div className="flex items-center gap-3 p-2 rounded bg-gradient-to-r from-saffron-500/10 to-transparent border border-saffron-500/20">
        <div className="w-8 h-8 rounded-lg bg-saffron-500/20 border border-saffron-500/40 flex items-center justify-center text-saffron-400 font-bold">
          🇮🇳
        </div>
        <div className="flex flex-col text-[11px]">
          <span className="text-white font-bold">Democracy Pro Certified</span>
          <span className="text-saffron-400/80 text-[10px]">Score: 10/10 • Cryptographic Seal</span>
        </div>
      </div>
    </div>
  );
}

/* ========================================================
   MAIN HOMEPAGE COMPONENT
   ======================================================== */
export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <main id="main-content" role="main" aria-labelledby="hero-heading" className="relative">
      
      {/* =====================================================
          HERO SECTION (Enterprise Command Console)
          ===================================================== */}
      <section 
        aria-labelledby="hero-heading" 
        className="relative overflow-hidden pt-20 pb-28 sm:pt-28 sm:pb-36 border-b border-border bg-dot-grid"
      >
        {/* Subtle Cyber Glow Mesh */}
        <div className="absolute inset-0 bg-command-mesh opacity-80 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-radial from-cyber-500/15 via-primary-600/5 to-transparent blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          
          {/* Top Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-obsidian-900/90 border border-cyber-500/30 text-xs font-mono text-cyber-300 mb-8 shadow-command-glow animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-500" />
            </span>
            <span>INDIA&apos;S PREMIER DEMOCRACY DIGITAL TWIN & CIVIC OS</span>
            <span className="text-white/20">|</span>
            <span className="text-emerald-400 font-bold">v2.4 ONLINE</span>
          </div>

          {/* High-Impact Hero Headline */}
          <h1 
            id="hero-heading" 
            className="font-display font-black tracking-tight max-w-5xl mx-auto mb-6 text-4xl sm:text-6xl lg:text-7xl leading-[1.08] text-white"
          >
            Democracy, Engineered For <br className="hidden sm:inline" />
            <span className="gradient-text">Absolute Transparency.</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-text-secondary mb-10 leading-relaxed font-normal">
            Interact with authentic EVM hardware digital twins, query official ECI regulations via autonomous AI, and locate polling stations with sub-meter vector radar.
          </p>

          {/* Action Command Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-16 w-full">
            <Link
              href="/evm-simulator"
              className="btn-primary py-3.5 px-7 rounded-xl text-base shadow-command-glow flex items-center gap-2.5"
            >
              <Vote className="w-5 h-5" />
              <span>Boot EVM Hardware Twin</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/voter-mitra"
              className="btn-ghost py-3.5 px-7 rounded-xl text-base bg-obsidian-900/60 dark:bg-obsidian-900 border border-white/15 text-white hover:border-cyber-500/50 flex items-center gap-2.5"
            >
              <Bot className="w-5 h-5 text-cyber-400" />
              <span>Ask Voter Mitra AI</span>
            </Link>
          </div>

          {/* Telemetry Matrix Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl mx-auto">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="glass-card rounded-2xl p-5 border border-border/80 flex flex-col items-center justify-center relative overflow-hidden group hover:border-cyber-500/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${s.color}`} />
                    <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                      {s.value}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-text-secondary tracking-wide uppercase">
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =====================================================
          COMMAND MODULES (Enterprise SaaS Features Grid)
          ===================================================== */}
      <section 
        aria-labelledby="features-heading" 
        className="py-24 bg-surface dark:bg-obsidian-950 border-b border-border relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/30 text-xs font-mono text-primary-400 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CORE CIVIC OS MODULES</span>
            </div>
            <h2 id="features-heading" className="font-display font-black text-3xl sm:text-5xl text-white mb-4 tracking-tight">
              Enterprise-Grade Civic Infrastructure.
            </h2>
            <p className="text-base sm:text-lg text-text-secondary">
              Architected to replace guesswork with cryptographically verifiable simulation, high-speed AI retrieval, and precise GIS telemetry.
            </p>
          </div>

          {/* Feature Grid with Continuous Ambient Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <article
                  key={f.id}
                  className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:border-cyber-500/60 hover:shadow-glass-elevated hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Continuous ambient edge glow inside card */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-cyber-500/15 via-electric-500/10 to-transparent rounded-full blur-xl pointer-events-none animate-pulse" />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-400/30 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Top Header */}
                    <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${f.badgeColor}`}>
                        {f.badge}
                      </span>
                    </div>

                    {/* Titles */}
                    <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:text-cyber-400 transition-colors relative z-10">
                      {f.title}
                    </h3>
                    <div className="text-xs font-mono text-cyber-400/90 font-semibold mb-3 relative z-10">
                      {f.subtitle}
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed mb-3 relative z-10">
                      {f.desc}
                    </p>

                    {/* Interactive Mini Preview */}
                    <div className="relative z-10">
                      {f.previewType === "chat" && <MiniChatPreview />}
                      {f.previewType === "evm" && <MiniEVMPreview />}
                      {f.previewType === "map" && <MiniMapPreview />}
                      {f.previewType === "badge" && <MiniBadgePreview />}
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="pt-4 border-t border-white/5 mt-auto relative z-10">
                    <Link
                      href={f.href}
                      className="inline-flex items-center justify-between w-full text-xs font-bold font-display text-white group-hover:text-cyber-400 transition-colors"
                    >
                      <span>{f.cta}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* =====================================================
          ARCHITECTURE & PIPELINE (How It Works)
          ===================================================== */}
      <section 
        aria-labelledby="architecture-heading" 
        className="py-24 bg-bg dark:bg-obsidian-900 border-b border-border relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-4">
              <Database className="w-3.5 h-3.5" />
              <span>SYSTEM ARCHITECTURE PROTOCOL</span>
            </div>
            <h2 id="architecture-heading" className="font-display font-black text-3xl sm:text-5xl text-white mb-4 tracking-tight">
              3-Step Civic Empowerment Pipeline.
            </h2>
            <p className="text-base sm:text-lg text-text-secondary">
              From first-time registration queries to casting a verified VVPAT paper trail ballot.
            </p>
          </div>

          {/* 3-Step Grid with Continuous Floating / Pulse */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {ARCHITECTURE_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="glass-card rounded-2xl p-7 border border-white/10 relative overflow-hidden group hover:border-cyber-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-500/5 rounded-full blur-2xl pointer-events-none animate-pulse" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <span className={`px-3 py-1 rounded-lg text-xs font-mono font-extrabold border ${step.color}`}>
                        STEP {step.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-obsidian-900 border border-white/10 flex items-center justify-center text-cyber-400 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-xl text-white mb-3 relative z-10">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-6 relative z-10">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-text-muted relative z-10">
                    <span>PROTOCOL STATUS</span>
                    <span className="text-emerald-400 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =====================================================
          FINAL COMMAND BANNER (CTA)
          ===================================================== */}
      <section aria-labelledby="cta-heading" className="py-24 bg-surface dark:bg-obsidian-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-command-mesh opacity-50 pointer-events-none" aria-hidden="true" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-card rounded-3xl p-8 sm:p-14 border border-white/15 shadow-glass-elevated text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-500/15 border border-saffron-500/30 text-xs font-mono text-saffron-300 mb-6">
              <span>🇮🇳 DEMOCRACY IN YOUR HANDS</span>
            </div>

            <h2 id="cta-heading" className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-obsidian-950 dark:text-white mb-6 tracking-tight leading-tight">
              Your Vote Is Sacred. <br />
              <span className="gradient-text">Make It Cryptographically Count.</span>
            </h2>

            <p className="max-w-xl mx-auto text-base sm:text-lg text-text-secondary mb-10 leading-relaxed">
              Whether you are a first-time voter learning how an EVM beep sounds or checking your nearest booth coordinates, NexGen Civic OS equips you instantly.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/evm-simulator"
                className="btn-primary py-4 px-8 rounded-xl text-base shadow-command-glow flex items-center gap-2.5 font-display font-bold"
              >
                <Vote className="w-5 h-5" />
                <span>Experience EVM Simulator</span>
              </Link>

              <Link
                href="/booth-locator"
                className="btn-ghost py-4 px-8 rounded-xl text-base bg-obsidian-900 border border-white/15 text-white hover:border-cyber-500/50 flex items-center gap-2.5 font-display font-bold"
              >
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>Locate Polling Booth</span>
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-text-muted">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% ECI Compliant Guidelines
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-cyber-400" />
                SHA-256 Client-Side Simulation
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-electric-400" />
                Gemini 2.0 Civic AI
              </span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
