"use client";

import Link from "next/link";
import { 
  ShieldCheck, 
  Terminal, 
  Activity, 
  CheckCircle2, 
  ExternalLink, 
  Github, 
  Twitter, 
  Linkedin,
  Cpu,
  Lock
} from "lucide-react";

/* ========================================================
   FOOTER LINK GROUPS
   ======================================================== */
const FOOTER_LINKS = [
  {
    group: "Civic OS Modules",
    links: [
      { label: "Command Overview",     href: "/",               ariaLabel: "Go to Home Overview" },
      { label: "AI Voter Mitra Copilot", href: "/voter-mitra",    ariaLabel: "Open Voter Mitra AI Assistant" },
      { label: "EVM Digital Twin Console", href: "/evm-simulator", ariaLabel: "Open EVM Simulator Console" },
      { label: "Geospatial Booth Explorer", href: "/booth-locator", ariaLabel: "Find polling booths on live map" },
      { label: "Democracy Certification", href: "/quiz",          ariaLabel: "Take Civic Competency Quiz" },
    ],
  },
  {
    group: "System & Governance",
    links: [
      { label: "EVM Cryptographic Audit", href: "/evm-simulator#ledger", ariaLabel: "View EVM SHA-256 Ledger" },
      { label: "Constitutional Rights (Art 326)", href: "/voter-mitra?topic=rights", ariaLabel: "Learn constitutional voting rights" },
      { label: "VVPAT Verification Protocol", href: "/evm-simulator#vvpat", ariaLabel: "Understand VVPAT verification slip" },
      { label: "ECI Official Portal", href: "https://eci.gov.in", ariaLabel: "Visit Election Commission of India official site", isExternal: true },
    ],
  },
  {
    group: "Platform Architecture",
    links: [
      { label: "System Telemetry & Status", href: "#status", ariaLabel: "View system status" },
      { label: "AI Model Persona Specs", href: "/voter-mitra#specs", ariaLabel: "View Gemini AI specifications" },
      { label: "Geospatial Vector Engine", href: "/booth-locator#engine", ariaLabel: "View Google Maps API specs" },
      { label: "MIT License & Open Source", href: "https://github.com/abhi666-max/NexGen-Vote", ariaLabel: "View source code repository", isExternal: true },
    ],
  },
] as const;

/* ========================================================
   SOCIAL CONNECTIONS
   ======================================================== */
const SOCIAL_LINKS = [
  {
    label: "GitHub Repository — NexGen Vote",
    href: "https://github.com/abhi666-max",
    icon: Github,
  },
  {
    label: "Abhijeet Kangane on X / Twitter",
    href: "https://x.com/abhijeet_037",
    icon: Twitter,
  },
  {
    label: "Connect with Abhijeet Kangane on LinkedIn",
    href: "https://www.linkedin.com/in/abhijeet-kangane-0578b2395/",
    icon: Linkedin,
  },
] as const;

/* ========================================================
   FOOTER COMPONENT
   ======================================================== */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="NexGen Civic OS Site Footer"
      className="mt-auto border-t transition-colors duration-300 border-border bg-surface dark:bg-obsidian-950 relative overflow-hidden"
    >
      {/* Subtle Background Mesh Glow */}
      <div className="absolute inset-0 bg-command-mesh opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-500/40 to-transparent" aria-hidden="true" />

      {/* ---- Top Section ---- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand & Mission Column (Span 2) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                aria-label="NexGen Civic OS — Return to overview"
                className="inline-flex items-center gap-3 mb-5 focus-ring rounded-xl group"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-cyber-600 border border-white/20 shadow-md group-hover:scale-105 transition-transform duration-300"
                >
                  <ShieldCheck className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <div className="font-display font-extrabold text-xl leading-tight tracking-tight">
                    <span className="gradient-text">NexGen</span>
                    <span className="text-obsidian-950 dark:text-white font-semibold"> Civic OS</span>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-cyber-500 font-bold uppercase">
                    Democracy Intelligence Twin
                  </span>
                </div>
              </Link>

              <p className="text-sm leading-relaxed max-w-sm text-text-secondary mb-6">
                Next-generation civic infrastructure designed to demystify India’s electoral ecosystem. 
                Featuring interactive EVM hardware digital twins, AI-assisted voter intelligence, and verifiable election education.
              </p>

              {/* Live Telemetry Status Box */}
              <div id="status" className="inline-flex items-center gap-3 px-3.5 py-2 rounded-xl bg-obsidian-900 border border-emerald-500/30 text-xs font-mono text-text-secondary mb-6 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-emerald-400 font-bold">ALL CIVIC NODES OPERATIONAL</span>
                <span className="text-white/20">|</span>
                <span className="flex items-center gap-1 text-cyber-400">
                  <Lock className="w-3 h-3" /> SHA-256
                </span>
              </div>
            </div>

            {/* Social Links */}
            <nav aria-label="Social media profiles" className="mt-2">
              <ul className="flex items-center gap-3 list-none p-0 m-0" role="list">
                {SOCIAL_LINKS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-obsidian-900 border border-border/80 text-text-secondary hover:text-cyber-400 hover:border-cyber-500/50 hover:shadow-command-glow focus-ring transition-all duration-200"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Categorized Links (Span 3) */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.group} className="flex flex-col gap-3">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-obsidian-950 dark:text-white border-l-2 border-cyber-500 pl-2.5">
                {group.group}
              </h3>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0" role="list">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={"isExternal" in link && link.isExternal ? "_blank" : undefined}
                      rel={"isExternal" in link && link.isExternal ? "noopener noreferrer" : undefined}
                      aria-label={link.ariaLabel}
                      className="text-xs font-medium text-text-secondary hover:text-cyber-400 transition-colors duration-150 flex items-center gap-1 group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform duration-150">
                        {link.label}
                      </span>
                      {"isExternal" in link && link.isExternal && (
                        <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 text-cyber-400" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ---- Bottom Bar ---- */}
      <div className="border-t border-border/60 bg-obsidian-950/90 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div className="flex items-center gap-2">
            <span>© {currentYear} NexGen Civic OS. Built for Indian Democracy.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-text-secondary">
              <Cpu className="w-3.5 h-3.5 text-cyber-400" />
              Next.js 15 App Router
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1.5 text-text-secondary">
              <Terminal className="w-3.5 h-3.5 text-electric-400" />
              Architected by <span className="text-cyber-400 font-bold">Abhijeet Kangane</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
