"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";

/* ===================================
   NAV ITEMS
   =================================== */
const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    icon: "🏠",
    ariaLabel: "Go to Home page",
  },
  {
    label: "Voter Mitra",
    href: "/voter-mitra",
    icon: "🤖",
    ariaLabel: "Open Voter Mitra AI assistant",
  },
  {
    label: "EVM Simulator",
    href: "/evm-simulator",
    icon: "🗳️",
    ariaLabel: "Open EVM Simulator",
  },
  {
    label: "Booth Locator",
    href: "/booth-locator",
    icon: "📍",
    ariaLabel: "Find your nearest polling booth",
  },
  {
    label: "Quiz",
    href: "/quiz",
    icon: "🧠",
    ariaLabel: "Take the Myth-Buster election quiz",
  },
] as const;

/* ===================================
   LOGO COMPONENT
   =================================== */
function Logo() {
  return (
    <Link
      href="/"
      aria-label="NexGen Vote — return to home page"
      className="flex items-center gap-2.5 group focus-ring rounded-lg"
      style={{ textDecoration: "none" }}
    >
      {/* Icon badge */}
      <span
        className="flex items-center justify-center w-9 h-9 rounded-xl text-lg font-bold text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
        style={{
          background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
          boxShadow: "0 4px 12px -2px hsl(220, 75%, 48%, 0.4)",
        }}
        aria-hidden="true"
      >
        🗳
      </span>

      {/* Wordmark */}
      <span className="font-display font-bold text-xl leading-none" aria-hidden="true">
        <span className="gradient-text">NexGen</span>
        <span style={{ color: "var(--color-text-primary)" }}> Vote</span>
      </span>
    </Link>
  );
}

/* ===================================
   THEME TOGGLE BUTTON
   =================================== */
function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      role="switch"
      className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 focus-ring"
      style={{
        background: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border)",
        color: "var(--color-text-secondary)",
      }}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="text-base transition-transform duration-300" style={{ transform: isDark ? "rotate(0deg)" : "rotate(180deg)" }}>
        {isDark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}

/* ===================================
   MOBILE MENU BUTTON
   =================================== */
function HamburgerButton({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-nav"
      role="button"
      className="relative flex flex-col items-center justify-center w-9 h-9 rounded-xl gap-[5px] transition-all duration-200 focus-ring lg:hidden"
      style={{
        background: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border)",
      }}
    >
      <span
        className="block w-5 h-[2px] rounded-full transition-all duration-300 origin-center"
        style={{
          background: "var(--color-text-secondary)",
          transform: isOpen ? "translateY(7px) rotate(45deg)" : "none",
        }}
        aria-hidden="true"
      />
      <span
        className="block w-5 h-[2px] rounded-full transition-all duration-300"
        style={{
          background: "var(--color-text-secondary)",
          opacity: isOpen ? "0" : "1",
          transform: isOpen ? "scaleX(0)" : "scaleX(1)",
        }}
        aria-hidden="true"
      />
      <span
        className="block w-5 h-[2px] rounded-full transition-all duration-300 origin-center"
        style={{
          background: "var(--color-text-secondary)",
          transform: isOpen ? "translateY(-7px) rotate(-45deg)" : "none",
        }}
        aria-hidden="true"
      />
    </button>
  );
}

/* ===================================
   MAIN HEADER COMPONENT
   =================================== */
export function Header() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  /* --- Detect system dark preference on mount --- */
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const stored = localStorage.getItem("nexgenvote-theme");
    const dark = stored ? stored === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  /* --- Scroll shadow --- */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* --- Close mobile menu on route change --- */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* --- Close mobile menu on outside click --- */
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  /* --- Keyboard Escape closes menu --- */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("nexgenvote-theme", next ? "dark" : "light");
      return next;
    });
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      role="banner"
      aria-label="Site header"
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: scrolled ? "var(--glass-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border-subtle)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 24px -4px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="container-app flex items-center justify-between h-16 gap-4">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-1"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.ariaLabel}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`nav-link ${isActive(item.href) ? "active" : ""}`}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          <Link
            href="/voter-mitra"
            aria-label="Get started with NexGen Vote"
            className="btn-primary hidden sm:inline-flex"
          >
            Get Started
          </Link>
          <HamburgerButton isOpen={mobileOpen} onToggle={() => setMobileOpen((p) => !p)} />
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-nav"
        ref={mobileNavRef}
        role="navigation"
        aria-label="Mobile navigation menu"
        aria-hidden={!mobileOpen}
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? "400px" : "0px",
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        <nav
          className="container-app py-4 flex flex-col gap-1 border-t"
          style={{ borderColor: "var(--color-border-subtle)" }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.ariaLabel}
              aria-current={isActive(item.href) ? "page" : undefined}
              tabIndex={mobileOpen ? 0 : -1}
              className={`nav-link justify-start text-base py-3 ${isActive(item.href) ? "active" : ""}`}
            >
              <span aria-hidden="true" className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div className="pt-3 mt-2 border-t" style={{ borderColor: "var(--color-border-subtle)" }}>
            <Link
              href="/voter-mitra"
              aria-label="Get started with NexGen Vote"
              tabIndex={mobileOpen ? 0 : -1}
              className="btn-primary w-full justify-center"
            >
              🚀 Get Started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
