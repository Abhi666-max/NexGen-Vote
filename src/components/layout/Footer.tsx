"use client";

import Link from "next/link";

/* ===================================
   FOOTER LINK GROUPS
   =================================== */
const FOOTER_LINKS = [
  {
    group: "Platform",
    links: [
      { label: "Home",           href: "/",               ariaLabel: "Go to Home" },
      { label: "Voter Mitra AI", href: "/voter-mitra",    ariaLabel: "Open Voter Mitra AI assistant" },
      { label: "EVM Simulator",  href: "/evm-simulator",  ariaLabel: "Open EVM Simulator" },
      { label: "Booth Locator",  href: "/booth-locator",  ariaLabel: "Find your nearest polling booth" },
    ],
  },
  {
    group: "Resources",
    links: [
      { label: "About EVM",         href: "/about-evm",    ariaLabel: "Learn about Electronic Voting Machines" },
      { label: "Voter Rights",      href: "/voter-rights", ariaLabel: "Learn about your voter rights" },
      { label: "Election Calendar", href: "/calendar",     ariaLabel: "View election calendar" },
      { label: "FAQs",              href: "/faq",          ariaLabel: "Frequently asked questions" },
    ],
  },
  {
    group: "Legal",
    links: [
      { label: "Privacy Policy",   href: "/privacy",    ariaLabel: "Read our privacy policy" },
      { label: "Terms of Service", href: "/terms",      ariaLabel: "Read our terms of service" },
      { label: "Disclaimer",       href: "/disclaimer", ariaLabel: "Read our disclaimer" },
    ],
  },
] as const;

/* ===================================
   SOCIAL LINKS
   =================================== */
const SOCIAL_LINKS = [
  {
    label: "GitHub repository for NexGen Vote",
    href: "https://github.com/abhi666-max",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "NexGen Vote on Twitter / X",
    href: "https://x.com/abhijeet_037",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Connect with Abhijeet Kangane on LinkedIn",
    href: "https://www.linkedin.com/in/abhijeet-kangane-0578b2395/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
] as const;

/* ===================================
   FOOTER COMPONENT
   =================================== */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="mt-auto border-t"
      style={{
        borderColor: "var(--color-border-subtle)",
        background: "var(--color-bg-secondary)",
      }}
    >
      {/* ---- Top Section ---- */}
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              aria-label="NexGen Vote — return to home page"
              className="inline-flex items-center gap-2.5 mb-4 focus-ring rounded-lg group"
              style={{ textDecoration: "none" }}
            >
              <span
                className="flex items-center justify-center w-9 h-9 rounded-xl text-lg font-bold text-white transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
                }}
                aria-hidden="true"
              >
                🗳
              </span>
              <span className="font-display font-bold text-xl leading-none" aria-hidden="true">
                <span className="gradient-text">NexGen</span>
                <span style={{ color: "var(--color-text-primary)" }}> Vote</span>
              </span>
            </Link>

            <p
              className="text-sm leading-relaxed max-w-xs mb-6"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Empowering citizens with AI-driven election education, interactive EVM
              simulation, and transparent democratic tools.
            </p>

            {/* Social links — CSS hover only, no JS handlers */}
            <nav aria-label="Social media links" role="navigation">
              <ul className="flex items-center gap-3 list-none p-0 m-0" role="list">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      role="link"
                      className="footer-social-link flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 focus-ring"
                    >
                      {s.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.group}>
              <h2
                className="font-display font-semibold text-sm mb-4 tracking-wide uppercase"
                style={{ color: "var(--color-text-primary)" }}
              >
                {group.group}
              </h2>
              <nav aria-label={`${group.group} links`} role="navigation">
                <ul className="flex flex-col gap-2.5 list-none p-0 m-0" role="list">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-label={link.ariaLabel}
                        className="footer-link text-sm focus-ring rounded inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Bottom Bar ---- */}
      <div
        className="border-t"
        style={{ borderColor: "var(--color-border-subtle)" }}
      >
        <div className="container-app py-5 flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Copyright */}
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            © {currentYear}{" "}
            <span style={{ color: "var(--color-text-secondary)" }}>NexGen Vote</span>.
            All rights reserved. Built for the people of India. 🇮🇳
          </p>

          {/* Developer attribution — mandatory requirement */}
          <p
            className="text-xs font-medium flex items-center gap-1.5"
            style={{ color: "var(--color-text-muted)" }}
            aria-label="Developer credit: Developed with precision by Abhijeet Kangane"
          >
            <span aria-hidden="true">⚡</span>
            Developed with precision by{" "}
            <span
              className="font-semibold gradient-text"
              aria-hidden="true"
            >
              Abhijeet Kangane
            </span>
            <span aria-hidden="true">✦</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
