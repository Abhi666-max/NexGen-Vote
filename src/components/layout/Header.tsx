"use client";

/**
 * Enterprise Floating Glass Command Navbar — NexGen Civic OS
 * Architected by Abhijeet Kangane (35-Year Veteran Level SaaS / IaaS Precision)
 * Minimalist, high-density, breathable layout modeled after Vercel, Linear, and Stripe.
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
  Sun, 
  Moon, 
  Menu, 
  X, 
  ShieldCheck,
  ArrowRight
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
   THEME TOGGLE
   ======================================================== */
function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark cyber theme"}
      aria-pressed={isDark}
      className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 focus-ring bg-surface/60 dark:bg-obsidian-900/60 border border-border/80 hover:border-cyber-400/50 text-text-secondary hover:text-white shadow-sm"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-saffron-400 transition-transform duration-300 rotate-0 scale-100" />
      ) : (
        <Moon className="w-4 h-4 text-primary-500 transition-transform duration-300 rotate-0 scale-100" />
      )}
    </button>
  );
}

/* ========================================================
   MAIN HEADER (Floating Vercel/Linear Style Dock)
   ======================================================== */
export function Header() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const initialDark = root.classList.contains("dark") || window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(initialDark);
    if (initialDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    const root = document.documentElement;
    if (nextDark) {
      root.classList.add("dark");
      localStorage.setItem("nexgen_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("nexgen_theme", "light");
    }
  };

  return (
    <header
      className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8 transition-all duration-300"
      role="banner"
    >
      <div
        className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 border ${
          scrolled
            ? "glass-card border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.65)] py-2.5 px-4 sm:px-6"
            : "bg-surface/75 dark:bg-obsidian-950/75 backdrop-blur-2xl border-white/[0.08] py-3 px-4 sm:px-6 shadow-xl"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Logo />

          {/* Clean SaaS Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 bg-obsidian-900/40 dark:bg-obsidian-900/60 p-1 rounded-xl border border-white/[0.06]">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 focus-ring ${
                    isActive
                      ? "bg-gradient-to-r from-primary-600 to-cyber-600 text-white shadow-[0_2px_12px_rgba(6,182,212,0.35)]"
                      : "text-text-secondary hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-text-muted"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar (Theme Toggle + Quick Assessment Shortcut) */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

            {/* Direct Launch Pill for Desktop */}
            <Link
              href="/quiz"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-cyber-500 hover:from-primary-600 hover:to-cyber-600 text-white text-xs font-display font-bold shadow-[0_0_20px_-5px_#06b6d4] hover:shadow-[0_0_25px_-3px_#06b6d4] transition-all duration-300"
            >
              <span>Get Certified</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-surface/60 dark:bg-obsidian-900/60 border border-border text-text-secondary hover:text-white focus-ring transition-all"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="md:hidden mt-4 pt-4 border-t border-white/[0.08] flex flex-col gap-1.5 animate-slide-down"
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
                      : "text-text-secondary hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyber-300 animate-pulse" />}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
