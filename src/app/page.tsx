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
import { AnimatedCard } from "@/components/ui/AnimatedCard";

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
            {STATS.map((s, idx) => {
              const Icon = s.icon;
              return (
                <AnimatedCard
                  key={s.label}
                  delay={idx * 0.1}
                  className="p-5 flex flex-col items-center justify-center animate-border-continuous group"
                >
                  <div className="flex items-center gap-2.5 mb-2 relative z-10">
                    <Icon className={`w-5 h-5 ${s.color}`} />
                    <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                      {s.value}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-text-secondary tracking-wide uppercase font-semibold relative z-10">
                    {s.label}
                  </span>
                </AnimatedCard>
              );
            })}
          </div>

        </div>
      </section>

      {/* =====================================================
          COMMAND MODULES (Enterprise 2x2 Bento Glass Grid)
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

          {/* Clean 2x2 Spacious Bento Glass Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {FEATURES.map((f, idx) => {
              const Icon = f.icon;
              return (
                <AnimatedCard
                  key={f.id}
                  delay={idx * 0.15}
                  className="p-8 flex flex-col justify-between animate-border-continuous group"
                >
                  <div className="absolute -top-16 -right-16 w-36 h-36 bg-gradient-to-br from-cyber-500/20 via-electric-500/15 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                  <div>
                    {/* Top Header Row */}
                    <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-extrabold border ${f.badgeColor} shadow-sm`}>
                        {f.badge}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="font-display font-black text-2xl text-white mb-2 group-hover:text-cyber-300 transition-colors relative z-10">
                      {f.title}
                    </h3>
                    <div className="text-sm font-mono text-cyber-400 font-bold mb-4 relative z-10">
                      {f.subtitle}
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed mb-6 relative z-10 font-normal">
                      {f.desc}
                    </p>

                    {/* Sleek Horizontal Telemetry Indicator Bar */}
                    <div className="p-3.5 rounded-2xl bg-obsidian-900/90 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono mb-6 relative z-10 shadow-inner group-hover:border-cyber-500/40 transition-colors">
                      {f.id === "mitra" && (
                        <>
                          <span className="flex items-center gap-2 text-electric-300 font-semibold">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Llama 3.3 70B • Constitutional Art. 326
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                            🟢 LIVE STREAM
                          </span>
                        </>
                      )}
                      {f.id === "evm" && (
                        <>
                          <span className="flex items-center gap-2 text-cyber-300 font-semibold">
                            <span className="w-2 h-2 rounded-full bg-cyber-400 animate-pulse" />
                            Tactile CU / BU • VVPAT 7-Sec Trail
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-cyber-500/10 border border-cyber-500/30 text-cyber-300 font-bold">
                            🔒 SHA-256 SEALED
                          </span>
                        </>
                      )}
                      {f.id === "booth" && (
                        <>
                          <span className="flex items-center gap-2 text-emerald-300 font-semibold">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Sub-Meter Vector GIS • Queue Est.
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                            ♿ ACCESSIBLE
                          </span>
                        </>
                      )}
                      {f.id === "quiz" && (
                        <>
                          <span className="flex items-center gap-2 text-saffron-300 font-semibold">
                            <span className="w-2 h-2 rounded-full bg-saffron-400 animate-pulse" />
                            Myth-Buster Competency Engine
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-saffron-500/10 border border-saffron-500/30 text-saffron-300 font-bold">
                            🇮🇳 VERIFIABLE ID
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Footer CTA Button */}
                  <div className="pt-5 border-t border-white/10 mt-auto relative z-10">
                    <Link
                      href={f.href}
                      className="inline-flex items-center justify-between w-full py-3.5 px-6 rounded-2xl bg-white/[0.05] hover:bg-cyber-500 hover:text-obsidian-950 text-sm font-bold font-display text-white transition-all shadow-sm group-hover:shadow-md"
                    >
                      <span className="tracking-wide uppercase">{f.cta}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>
                </AnimatedCard>
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
            {ARCHITECTURE_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <AnimatedCard
                  key={step.step}
                  delay={idx * 0.2}
                  className="p-8 flex flex-col justify-between animate-border-continuous group"
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
                </AnimatedCard>
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
          <AnimatedCard className="p-8 sm:p-14 text-center animate-border-continuous">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/25 rounded-full blur-3xl pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-saffron-500/15 border border-saffron-500/40 text-xs font-mono text-saffron-300 mb-6 shadow-sm relative z-10">
              <span>🇮🇳 DEMOCRACY IN YOUR HANDS</span>
            </div>

            <h2 id="cta-heading" className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-tight leading-tight relative z-10">
              Your Vote Is Sacred. <br />
              <span className="gradient-text">Make It Cryptographically Count.</span>
            </h2>

            <p className="max-w-xl mx-auto text-base sm:text-lg text-text-secondary mb-10 leading-relaxed font-normal relative z-10">
              Whether you are a first-time voter learning how an EVM beep sounds or checking your nearest booth coordinates, NexGen Civic OS equips you instantly.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
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

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-text-muted relative z-10">
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
          </AnimatedCard>
        </div>
      </section>

    </main>
  );
}
