"use client";

/**
 * Enterprise High-Density Footer — NexGen Civic OS
 * Minimalist, high-contrast style footer with exact founder credit and social links.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShieldCheck, 
  Terminal, 
  CheckCircle2, 
  ExternalLink, 
  Cpu
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
      { label: "AI Model Persona Specs", href: "/voter-mitra#specs", ariaLabel: "View Gemini AI specifications" },
      { label: "Geospatial Vector Engine", href: "/booth-locator#engine", ariaLabel: "View Google Maps API specs" },
      { label: "MIT License & Open Source", href: "https://github.com/abhi666-max/NexGen-Vote", ariaLabel: "View source code repository", isExternal: true },
    ],
  },
] as const;

/* ========================================================
   SOCIAL CONNECTIONS (Exact Founder Links + Vector SVGs)
   ======================================================== */
const SOCIAL_LINKS = [
  {
    label: "GitHub — Abhijeet Kangane",
    href: "https://github.com/abhi666-max",
    icon: () => (
      <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn — Abhijeet Kangane",
    href: "https://www.linkedin.com/in/abhijeet-kangane/",
    icon: () => (
      <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram — Abhijeet Kangane (@abhijeet.037)",
    href: "https://www.instagram.com/abhijeet.037/",
    icon: () => (
      <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter — Abhijeet Kangane (@abhijeet_037)",
    href: "https://x.com/abhijeet_037",
    icon: () => (
      <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
      className="mt-auto border-t border-white/[0.08] bg-obsidian-950/90 backdrop-blur-xl relative overflow-hidden transition-colors duration-300 print:hidden z-10"
    >
      {/* Subtle Top Accent Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" aria-hidden="true" />

      {/* ---- Main Footer Content ---- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand & Founder Card (Span 2) */}
          <div className="lg:col-span-2 flex flex-col justify-between gap-6">
            <div>
              <Link
                href="/"
                aria-label="NexGen Civic OS — Return to overview"
                className="inline-flex items-center gap-2.5 mb-4 focus-ring rounded-xl group"
                style={{ textDecoration: "none" }}
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 via-cyber-500 to-electric-600 border border-white/20 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <ShieldCheck className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-1.5 font-display font-extrabold text-lg tracking-tight">
                  <span className="bg-gradient-to-r from-white via-cyber-200 to-cyber-400 bg-clip-text text-transparent">
                    NexGen
                  </span>
                  <span className="text-text-primary font-semibold">Civic OS</span>
                </div>
              </Link>

              <p className="text-xs leading-relaxed max-w-sm text-text-secondary mb-6">
                Enterprise Civic Intelligence & Digital Twin Infrastructure. Designed with high-availability SHA-256 cryptographic logging and ultra-fast AI inference.
              </p>

              {/* Exact Founder Spotlight Banner */}
              <div className="p-4 rounded-2xl bg-obsidian-900 border border-white/10 shadow-lg flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-cyber-400 uppercase tracking-wider">
                  <span>FOUNDER & ARCHITECT</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                    PRINCIPAL SYSTEM ARCHITECT
                  </span>
                </div>
                <div className="font-display font-black text-base text-white flex items-center gap-2">
                  <span>Abhijeet Kangane</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Exact 4 Social Media Connect Icons */}
            <div>
              <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider block mb-2.5">
                Connect with Founder:
              </span>
              <ul className="flex items-center gap-2.5 list-none p-0 m-0" role="list">
                {SOCIAL_LINKS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex items-center justify-center w-11 h-11 rounded-xl bg-obsidian-900 border border-white/15 text-white hover:border-cyber-400 hover:bg-white/10 hover:shadow-[0_0_15px_-3px_#06b6d4] focus-ring transition-all duration-200"
                      >
                        <Icon />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Categorized SaaS Links (Span 3) */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.group} className="flex flex-col gap-3">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white">
                {group.group}
              </h3>
              <ul className="flex flex-col gap-2 list-none p-0 m-0" role="list">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={"isExternal" in link && link.isExternal ? "_blank" : undefined}
                      rel={"isExternal" in link && link.isExternal ? "noopener noreferrer" : undefined}
                      aria-label={link.ariaLabel}
                      className="text-xs text-text-secondary hover:text-white transition-colors duration-150 flex items-center gap-1 group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform duration-150">
                        {link.label}
                      </span>
                      {"isExternal" in link && link.isExternal && (
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 text-cyber-400" />
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
      <div className="border-t border-white/[0.06] bg-obsidian-950/95 py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div>
            <span>© {currentYear} NexGen Civic OS. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-text-secondary">
              <Cpu className="w-3.5 h-3.5 text-cyber-400" />
              Next.js 15 App Router
            </span>
            <span className="text-white/10">|</span>
            <span className="flex items-center gap-1.5 text-text-secondary">
              <Terminal className="w-3.5 h-3.5 text-electric-400" />
              Architected by <strong className="text-white">Abhijeet Kangane</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
