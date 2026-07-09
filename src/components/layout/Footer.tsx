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
    group: "Constitutional Core",
    links: [
      { label: "Art. 326 Universal Suffrage", href: "/voter-mitra", ariaLabel: "Learn about Article 326" },
      { label: "SHA-256 Audit Trail Spec",    href: "/evm-simulator", ariaLabel: "Understand SHA-256 Ledger" },
      { label: "Representation of People Act", href: "/voter-mitra", ariaLabel: "Read Representation of People Act" },
      { label: "VVPAT 7-Sec Verification",    href: "/evm-simulator", ariaLabel: "Inspect VVPAT slip mechanism" },
      { label: "Accessibility Standards",     href: "/booth-locator", ariaLabel: "Check booth accessibility rules" },
    ],
  },
  {
    group: "System Telemetry",
    links: [
      { label: "Groq Llama 3.3 70B Engine",   href: "/voter-mitra", ariaLabel: "View AI inference engine" },
      { label: "Vector GIS Spatial Radar",    href: "/booth-locator", ariaLabel: "View Spatial Radar engine" },
      { label: "Hardware Digital Twin OS",    href: "/evm-simulator", ariaLabel: "Explore Hardware Twin system" },
      { label: "Zero-Knowledge Badging",      href: "/quiz",          ariaLabel: "Examine verification protocol" },
      { label: "Enterprise Security Audit",   href: "/",              ariaLabel: "Review platform security" },
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
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: "LinkedIn — Abhijeet Kangane",
    href: "https://www.linkedin.com/in/abhijeet-kangane/",
    icon: () => (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Instagram — Abhijeet Kangane (@abhijeet.037)",
    href: "https://www.instagram.com/abhijeet.037/",
    icon: () => (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
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
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  /* Only display Footer on Landing Overview Page ("/") */
  if (pathname !== "/") {
    return null;
  }

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
                        className="flex items-center justify-center w-11 h-11 rounded-xl bg-obsidian-900 border border-white/15 text-white hover:border-cyber-400 hover:bg-white/10 hover:shadow-[0_0_15px_-3px_#06b6d4] focus-ring transition-all duration-200 group"
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
                      target={(link as { isExternal?: boolean }).isExternal ? "_blank" : undefined}
                      rel={(link as { isExternal?: boolean }).isExternal ? "noopener noreferrer" : undefined}
                      aria-label={link.ariaLabel}
                      className="text-xs text-text-secondary hover:text-white transition-colors duration-150 flex items-center gap-1 group"
                    >
                      <span className="font-sans font-medium text-text-secondary group-hover:text-white transition-colors">
                        {link.label}
                      </span>
                      {(link as { isExternal?: boolean }).isExternal ? (
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                      ) : null}
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
