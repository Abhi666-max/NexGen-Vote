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
        <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2v-8.37H6.46M7.83 6.13a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63s1.63-.73 1.63-1.63a1.63 1.63 0 0 0-1.63-1.63Z" />
      </svg>
    ),
  },
  {
    label: "Instagram — Abhijeet Kangane (@abhijeet.037)",
    href: "https://www.instagram.com/abhijeet.037/",
    icon: () => (
      <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter — Abhijeet Kangane (@abhijeet_037)",
    href: "https://x.com/abhijeet_037",
    icon: () => (
      <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
