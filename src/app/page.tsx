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
    <div className="rounded-2xl bg-obsidian-950/90 border border-white/15 p-4 text-xs font-mono flex flex-col gap-2.5 my-4 shadow-xl transition-all group-hover:border-electric-500/50">
      <div className="flex items-center justify-between text-[11px] text-text-muted border-b border-white/10 pb-2">
        <span className="flex items-center gap-1.5 text-electric-400 font-bold"><Bot className="w-3.5 h-3.5 animate-bounce" /> VOTER MITRA AI v2.4</span>
        <span className="text-emerald-400 flex items-center gap-1.5 font-bold"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE STREAM</span>
      </div>
      <div className="text-text-secondary leading-relaxed">
        <span className="text-cyber-400 font-bold">Query:</span> How does VVPAT guarantee zero hacking?
      </div>
      <div className="p-2.5 rounded-xl bg-obsidian-900/90 border border-electric-500/30 text-white/95 leading-relaxed shadow-inner">
        <span className="text-emerald-400 font-bold">Response:</span> VVPAT creates a physically verified paper audit trail visible behind glass for 7 seconds before dropping into a sealed drop-box...
      </div>
    </div>
  );
}

function MiniEVMPreview() {
  return (
    <div className="rounded-2xl bg-obsidian-950/90 border border-white/15 p-4 text-xs font-mono flex flex-col gap-2.5 my-4 shadow-xl transition-all group-hover:border-cyber-500/50">
      <div className="flex items-center justify-between text-[11px] text-text-muted border-b border-white/10 pb-2">
        <span className="flex items-center gap-1.5 text-cyber-400 font-bold"><Vote className="w-3.5 h-3.5 animate-pulse" /> EVM HARDWARE TWIN</span>
        <span className="text-emerald-400 flex items-center gap-1.5 font-bold"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> BALLOT READY</span>
      </div>
      <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-obsidian-900/90 border border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-sm" />
          <span className="text-white font-bold tracking-wider">CANDIDATE 01</span>
        </div>
        <div className="px-3 py-1 rounded-lg bg-primary-600 text-white text-[10px] font-extrabold shadow-md animate-pulse">
          BLUE BUTTON
        </div>
      </div>
      <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-semibold">
        <Lock className="w-3.5 h-3.5" /> SHA-256: 8f4a...e12b AUDIT VERIFIED
      </div>
    </div>
  );
}

function MiniMapPreview() {
  return (
    <div className="rounded-2xl bg-obsidian-950/90 border border-white/15 p-4 text-xs font-mono flex flex-col gap-2.5 my-4 shadow-xl transition-all group-hover:border-emerald-500/50 relative overflow-hidden">
      <div className="flex items-center justify-between text-[11px] text-text-muted border-b border-white/10 pb-2">
        <span className="flex items-center gap-1.5 text-emerald-400 font-bold"><MapPin className="w-3.5 h-3.5 animate-pulse" /> GIS RADAR CONSOLE</span>
        <span className="text-cyber-400 flex items-center gap-1.5 font-bold"><span className="w-2 h-2 rounded-full bg-cyber-400 animate-pulse" /> WARD 04 ACTIVE</span>
      </div>
      <div className="h-16 rounded-xl bg-obsidian-900/90 border border-emerald-500/30 relative flex items-center justify-center overflow-hidden">
        <div className="absolute w-28 h-28 rounded-full border border-emerald-500/30 animate-ping opacity-40" />
        <div className="flex items-center gap-2 z-10 bg-obsidian-950/95 px-3 py-1 rounded-full border border-emerald-500/50 text-[11px] shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white font-bold">BOOTHS: 5 FOUND</span>
        </div>
      </div>
      <div className="text-[11px] text-text-secondary flex items-center justify-between font-semibold">
        <span>Queue Est: ~12 mins</span>
        <span className="text-emerald-400">♿ 100% Accessible</span>
      </div>
    </div>
  );
}

function MiniBadgePreview() {
  return (
    <div className="rounded-2xl bg-obsidian-950/90 border border-white/15 p-4 text-xs font-mono flex flex-col gap-2.5 my-4 shadow-xl transition-all group-hover:border-saffron-500/50">
      <div className="flex items-center justify-between text-[11px] text-text-muted border-b border-white/10 pb-2">
        <span className="flex items-center gap-1.5 text-saffron-400 font-bold"><Award className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} /> CREDENTIAL ENGINE</span>
        <span className="text-saffron-400 flex items-center gap-1.5 font-bold"><span className="w-2 h-2 rounded-full bg-saffron-400 animate-pulse" /> VERIFIABLE ID</span>
      </div>
      <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gradient-to-r from-saffron-500/15 to-transparent border border-saffron-500/30">
        <div className="w-9 h-9 rounded-xl bg-saffron-500/20 border border-saffron-500/50 flex items-center justify-center text-saffron-300 text-lg shadow-inner">
          🇮🇳
        </div>
        <div className="flex flex-col text-xs">
          <span className="text-white font-bold">Democracy Pro Certified</span>
          <span className="text-saffron-400/90 text-[10px]">Score: 10/10 • Cryptographic Seal</span>
        </div>
      </div>
    </div>
  );
}

/* ========================================================
   MAIN HOMEPAGE COMPONENT
   ======================================================== */
export default function HomePage() {
  return (
    <main id="main-content" role="main" aria-labelledby="hero-heading" className="relative bg-transparent">
      
      {/* =====================================================
          HERO SECTION (Enterprise Command Console)
          ===================================================== */}
      <section 
        aria-labelledby="hero-heading" 
        className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32 border-b border-white/10 bg-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          
          {/* Top Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-obsidian-950/80 border border-cyber-500/40 text-xs font-mono text-cyber-300 mb-8 shadow-[0_0_20px_rgba(6,182,212,0.25)] animate-fade-in backdrop-blur-md">
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
              className="btn-primary py-4 px-8 rounded-2xl text-base shadow-command-glow flex items-center gap-2.5 font-display font-bold hover:scale-105 transition-all"
            >
              <Vote className="w-5 h-5" />
              <span>Boot EVM Hardware Twin</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/voter-mitra"
              className="btn-ghost py-4 px-8 rounded-2xl text-base bg-obsidian-950/80 border border-white/20 text-white hover:border-cyber-400/80 hover:bg-obsidian-900 flex items-center gap-2.5 font-display font-bold hover:scale-105 transition-all backdrop-blur-md"
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
                  className="rounded-2xl p-5 bg-obsidian-950/60 backdrop-blur-xl border border-white/15 flex flex-col items-center justify-center relative overflow-hidden group hover:border-cyber-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <Icon className={`w-5 h-5 ${s.color}`} />
                    <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                      {s.value}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-text-secondary tracking-wide uppercase font-semibold">
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
        className="py-24 bg-transparent border-b border-white/10 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-500/10 border border-primary-500/40 text-xs font-mono text-primary-300 mb-4 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-primary-400 animate-spin-slow" />
              <span>CORE CIVIC OS MODULES</span>
            </div>
            <h2 id="features-heading" className="font-display font-black text-3xl sm:text-5xl text-white mb-4 tracking-tight">
              Enterprise-Grade Civic Infrastructure.
            </h2>
            <p className="text-base sm:text-lg text-text-secondary">
              Architected to replace guesswork with cryptographically verifiable simulation, high-speed AI retrieval, and precise GIS telemetry.
            </p>
          </div>

          {/* Feature Grid converted to Ultra-Premium Floating Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <article
                  key={f.id}
                  className="rounded-3xl p-6 bg-obsidian-950/60 backdrop-blur-2xl border border-white/15 flex flex-col justify-between relative overflow-hidden group hover:border-cyber-400 hover:bg-obsidian-900/80 hover:shadow-[0_12px_45px_rgba(6,182,212,0.3)] hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br from-cyber-500/20 via-electric-500/15 to-transparent rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                  <div>
                    {/* Top Header */}
                    <div className="flex items-center justify-between gap-2 mb-5 relative z-10">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-extrabold border ${f.badgeColor} shadow-sm`}>
                        {f.badge}
                      </span>
                    </div>

                    {/* Titles */}
                    <h3 className="font-display font-black text-xl text-white mb-1.5 group-hover:text-cyber-300 transition-colors relative z-10">
                      {f.title}
                    </h3>
                    <div className="text-xs font-mono text-cyber-400 font-bold mb-3 relative z-10">
                      {f.subtitle}
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed mb-4 relative z-10 font-normal">
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
                  <div className="pt-4 border-t border-white/10 mt-auto relative z-10">
                    <Link
                      href={f.href}
                      className="inline-flex items-center justify-between w-full text-xs font-bold font-display text-white group-hover:text-cyber-300 transition-colors py-1"
                    >
                      <span className="tracking-wide uppercase">{f.cta}</span>
                      <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyber-500 group-hover:text-obsidian-950 transition-all">
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* =====================================================
          ARCHITECTURE & PIPELINE (3-Step Civic Protocol Cards)
          ===================================================== */}
      <section 
        aria-labelledby="architecture-heading" 
        className="py-24 bg-transparent border-b border-white/10 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-xs font-mono text-emerald-300 mb-4 shadow-sm backdrop-blur-md">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>SYSTEM ARCHITECTURE PROTOCOL</span>
            </div>
            <h2 id="architecture-heading" className="font-display font-black text-3xl sm:text-5xl text-white mb-4 tracking-tight">
              3-Step Civic Empowerment Pipeline.
            </h2>
            <p className="text-base sm:text-lg text-text-secondary">
              Streamlined, highly organized protocol to verify facts, simulate hardware, and vote with complete confidence.
            </p>
          </div>

          {/* 3-Step Converted to Premium Glowing Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {ARCHITECTURE_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="rounded-3xl p-8 bg-obsidian-950/60 backdrop-blur-2xl border border-white/15 relative overflow-hidden group hover:border-emerald-400 hover:bg-obsidian-900/80 hover:shadow-[0_12px_45px_rgba(16,185,129,0.25)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <span className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-black border ${step.color} shadow-sm`}>
                        STEP {step.step}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-obsidian-900 border border-white/15 flex items-center justify-center text-emerald-400 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 className="font-display font-black text-2xl text-white mb-3.5 group-hover:text-emerald-300 transition-colors relative z-10">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-6 relative z-10 font-normal">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-text-muted relative z-10">
                    <span>PROTOCOL STATUS</span>
                    <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4" /> VERIFIED & ACTIVE
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
      <section aria-labelledby="cta-heading" className="py-24 bg-transparent relative overflow-hidden z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl p-8 sm:p-14 bg-obsidian-950/70 backdrop-blur-2xl border border-white/20 shadow-2xl text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/25 rounded-full blur-3xl pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-saffron-500/15 border border-saffron-500/40 text-xs font-mono text-saffron-300 mb-6 shadow-sm">
              <span>🇮🇳 DEMOCRACY IN YOUR HANDS</span>
            </div>

            <h2 id="cta-heading" className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-tight leading-tight">
              Your Vote Is Sacred. <br />
              <span className="gradient-text">Make It Cryptographically Count.</span>
            </h2>

            <p className="max-w-xl mx-auto text-base sm:text-lg text-text-secondary mb-10 leading-relaxed font-normal">
              Whether you are a first-time voter learning how an EVM beep sounds or checking your nearest booth coordinates, NexGen Civic OS equips you instantly.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/evm-simulator"
                className="btn-primary py-4 px-8 rounded-2xl text-base shadow-command-glow flex items-center gap-2.5 font-display font-bold hover:scale-105 transition-all"
              >
                <Vote className="w-5 h-5" />
                <span>Experience EVM Simulator</span>
              </Link>

              <Link
                href="/booth-locator"
                className="btn-ghost py-4 px-8 rounded-2xl text-base bg-obsidian-900 border border-white/20 text-white hover:border-cyber-400/80 flex items-center gap-2.5 font-display font-bold hover:scale-105 transition-all"
              >
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>Locate Polling Booth</span>
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-text-muted">
              <span className="flex items-center gap-1.5 text-white/90">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% ECI Compliant Guidelines
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-white/90">
                <Lock className="w-4 h-4 text-cyber-400" />
                SHA-256 Client-Side Simulation
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-white/90">
                <Bot className="w-4 h-4 text-electric-400" />
                Groq Llama 3.3 70B AI Engine
              </span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
