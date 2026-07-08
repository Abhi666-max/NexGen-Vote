"use client";

import Link from "next/link";
import { 
  ShieldCheck, 
  Terminal, 
  Activity, 
  CheckCircle2, 
  ExternalLink, 
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
   SOCIAL CONNECTIONS (Inline SVG Vectors)
   ======================================================== */
const SOCIAL_LINKS = [
  {
    label: "GitHub Repository — NexGen Vote",
    href: "https://github.com/abhi666-max",
    icon: ({ className }: { className?: string }) => (
      <svg className={className || "w-4 h-4 fill-current"} viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "Abhijeet Kangane on X / Twitter",
    href: "https://x.com/abhijeet_037",
    icon: ({ className }: { className?: string }) => (
      <svg className={className || "w-3.5 h-3.5 fill-current"} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Connect with Abhijeet Kangane on LinkedIn",
    href: "https://www.linkedin.com/in/abhijeet-kangane-0578b2395/",
    icon: ({ className }: { className?: string }) => (
      <svg className={className || "w-4 h-4 fill-current"} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
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
