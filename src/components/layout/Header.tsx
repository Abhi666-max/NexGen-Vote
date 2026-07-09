"use client";

/**
 * Enterprise Floating Glass Command Navbar — NexGen Civic OS
 * Sleek, high-density, centered floating dock with zero visual clutter.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Home, 
  Bot, 
  Vote, 
  MapPin, 
  Award, 
  Menu, 
  X, 
  ShieldCheck
} from "lucide-react";

/* ========================================================
   NAVIGATION ITEMS (Pure Minimalist Vector Navigation)
   ======================================================== */
const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/",
    icon: Home,
    ariaLabel: "Go to Civic OS Command Overview",
  },
  {
    label: "AI Voter Mitra",
    href: "/voter-mitra",
    icon: Bot,
    ariaLabel: "Open AI Voter Assistant Copilot",
  },
  {
    label: "EVM Digital Twin",
    href: "/evm-simulator",
    icon: Vote,
    ariaLabel: "Open EVM Hardware Digital Twin Simulator",
  },
  {
    label: "Booth Radar",
    href: "/booth-locator",
    icon: MapPin,
    ariaLabel: "Find nearest polling station on live GIS radar",
  },
  {
    label: "Certification",
    href: "/quiz",
    icon: Award,
    ariaLabel: "Earn your Certified Democracy Pro credential diploma",
  },
] as const;

/* ========================================================
   LOGO COMPONENT
   ======================================================== */
function Logo() {
  return (
    <Link
      href="/"
      aria-label="NexGen Civic OS — Return to Command Overview"
      className="flex items-center gap-2.5 group rounded-xl px-2 py-1 transition-all duration-300 focus-ring"
      style={{ textDecoration: "none" }}
    >
      {/* Sleek Cyber Shield Emblem */}
      <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 via-cyber-500 to-electric-600 border border-white/20 shadow-md transition-transform duration-300 group-hover:scale-105">
        <ShieldCheck className="w-4 h-4 text-white" aria-hidden="true" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-obsidian-950 shadow-[0_0_8px_#10b981]" />
      </div>

      {/* Clean Razor-Sharp Brandmark */}
      <div className="flex items-center gap-1.5 font-display font-extrabold text-base sm:text-lg tracking-tight">
        <span className="bg-gradient-to-r from-white via-cyber-200 to-cyber-400 bg-clip-text text-transparent">
          NexGen
        </span>
        <span className="text-text-primary font-semibold">Civic OS</span>
      </div>
    </Link>
  );
}

/* ========================================================
   MAIN HEADER (Floating Vercel/Linear Style Dock)
   ======================================================== */
export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    /* Enforce Dark Theme Always */
    document.documentElement.classList.add("dark");

    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8 transition-all duration-300 print:hidden"
      role="banner"
    >
      <div
        className={`max-w-5xl mx-auto rounded-2xl transition-all duration-300 border ${
          scrolled
            ? "glass-card border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.8)] py-2.5 px-5"
            : "bg-obsidian-950/85 backdrop-blur-2xl border-white/10 py-3 px-5 shadow-2xl"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Logo />

          {/* Clean SaaS Desktop Navigation Capsule */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1.5 bg-obsidian-900/70 p-1.5 rounded-2xl border border-white/10 shadow-inner backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 focus-ring ${
                    isActive
                      ? "bg-gradient-to-r from-primary-600 via-cyber-600 to-electric-600 text-white shadow-[0_2px_12px_rgba(6,182,212,0.4)] scale-[1.02]"
                      : "text-text-secondary hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-text-muted"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Mobile Menu Button */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-obsidian-900 border border-white/10 text-text-secondary hover:text-white focus-ring transition-all"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-2 animate-slide-down"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-primary-600 to-cyber-600 text-white font-bold shadow-md"
                      : "text-text-secondary hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <span className="w-2 h-2 rounded-full bg-cyber-300 animate-pulse" />}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
