"use client";

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
  Activity, 
  ShieldCheck,
  Command
} from "lucide-react";

/* ========================================================
   NAV ITEMS (Enterprise Vector Iconography)
   ======================================================== */
const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/",
    icon: Home,
    ariaLabel: "Go to Civic OS Command Overview",
  },
  {
    label: "Voter Mitra AI",
    href: "/voter-mitra",
    icon: Bot,
    badge: "AI 2.0",
    ariaLabel: "Open Voter Mitra AI Assistant",
  },
  {
    label: "EVM Digital Twin",
    href: "/evm-simulator",
    icon: Vote,
    badge: "Hardware",
    ariaLabel: "Open EVM Hardware Simulator",
  },
  {
    label: "Geospatial Console",
    href: "/booth-locator",
    icon: MapPin,
    ariaLabel: "Find your nearest polling station",
  },
  {
    label: "Civic Certification",
    href: "/quiz",
    icon: Award,
    ariaLabel: "Earn your Certified Democracy Pro credential",
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
      className="flex items-center gap-3 group focus-ring rounded-xl px-2 py-1.5 transition-all duration-300"
      style={{ textDecoration: "none" }}
    >
      {/* Cybernetic Badge */}
      <div
        className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-command-glow"
        style={{
          background: "linear-gradient(135deg, var(--color-primary) 0%, #0891b2 100%)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <ShieldCheck className="w-5 h-5 text-white animate-pulse-glow" aria-hidden="true" />
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-obsidian-900" title="System Online" />
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <div className="font-display font-extrabold text-lg leading-tight tracking-tight flex items-center gap-1.5">
          <span className="gradient-text">NexGen</span>
          <span className="text-obsidian-950 dark:text-white font-semibold">Civic OS</span>
        </div>
        <span className="text-[10px] font-mono tracking-widest text-cyber-500 font-bold uppercase">
          IaaS • Democracy Twin
        </span>
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
      className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 focus-ring bg-obsidian-800/60 dark:bg-obsidian-800/80 border border-border hover:border-cyber-500/50 text-text-secondary hover:text-cyber-400 shadow-sm"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-saffron-400 transition-transform duration-300 rotate-0 scale-100" />
      ) : (
        <Moon className="w-4 h-4 text-primary-600 transition-transform duration-300 rotate-0 scale-100" />
      )}
    </button>
  );
}

/* ========================================================
   MAIN HEADER (Floating Dock Command Console)
   ======================================================== */
export function Header() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Initialize Theme from localStorage or document
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
      setScrolled(window.scrollY > 20);
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
      className={`sticky top-3 z-50 w-full transition-all duration-300 px-4 sm:px-6 lg:px-8`}
      role="banner"
    >
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 border ${
          scrolled
            ? "glass-card border-white/15 dark:border-white/10 shadow-glass-elevated py-2.5 px-4 sm:px-6"
            : "bg-surface/80 dark:bg-obsidian-900/80 backdrop-blur-xl border-border py-3 px-4 sm:px-6 shadow-md"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Logo />

          {/* System Telemetry Pill (Desktop Only) */}
          <div className="hidden xl:flex items-center gap-2.5 px-3 py-1 rounded-full bg-obsidian-950/60 dark:bg-obsidian-950 border border-cyber-500/30 text-xs font-mono text-cyber-400">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>NODE: ECI-DELHI-01</span>
            <span className="text-white/20">|</span>
            <span className="text-emerald-400 font-bold">99.99% SECURE</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 focus-ring ${
                    isActive
                      ? "text-white bg-primary-600/90 shadow-sm border border-primary-400/40"
                      : "text-text-secondary hover:text-text-primary hover:bg-obsidian-800/40 dark:hover:bg-obsidian-800/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-cyber-300" : "text-text-muted group-hover:text-cyber-400"}`} />
                  <span>{item.label}</span>
                  
                  {/* Optional Badge */}
                  {"badge" in item && item.badge && (
                    <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyber-500/20 text-cyber-300 border border-cyber-500/30">
                      {item.badge}
                    </span>
                  )}

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-cyber-400 rounded-full shadow-command-glow animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            {/* Command Shortcut Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-obsidian-800/40 dark:bg-obsidian-800/60 border border-border text-xs font-mono text-text-muted" title="Command Palette Shortcut">
              <Command className="w-3.5 h-3.5 text-cyber-400" />
              <span>⌘K</span>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-obsidian-800/60 dark:bg-obsidian-800/80 border border-border text-text-secondary hover:text-text-primary focus-ring transition-all"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="lg:hidden mt-4 pt-4 border-t border-border/60 flex flex-col gap-1.5 animate-slide-down"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary-600/20 border border-primary-500/40 text-cyber-300 font-bold"
                      : "text-text-secondary hover:text-text-primary hover:bg-obsidian-800/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? "text-cyber-400" : "text-text-muted"}`} />
                    <span>{item.label}</span>
                  </div>
                  {"badge" in item && item.badge && (
                    <span className="px-2 py-0.5 rounded text-xs font-mono bg-cyber-500/20 text-cyber-300 border border-cyber-500/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Mobile Telemetry Footer */}
            <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-mono text-text-muted px-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                ECI NODE ACTIVE
              </span>
              <span>SHA-256 SECURE</span>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
