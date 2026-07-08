import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Enterprise Obsidian & Dark Command Surface Palette
        obsidian: {
          950: "#04060b",
          900: "#070a13",
          850: "#0a0e1b",
          800: "#0e1526",
          700: "#15203b",
          600: "#203057",
          500: "#324982",
        },
        // Primary Cybernetic / Command Blue
        primary: {
          50:  "hsl(215, 100%, 97%)",
          100: "hsl(215, 95%, 92%)",
          200: "hsl(215, 90%, 82%)",
          300: "hsl(215, 85%, 70%)",
          400: "hsl(215, 90%, 58%)",
          500: "hsl(215, 88%, 50%)",
          600: "hsl(215, 90%, 42%)",
          700: "hsl(215, 88%, 32%)",
          800: "hsl(215, 85%, 24%)",
          900: "hsl(215, 82%, 16%)",
          950: "hsl(215, 90%, 10%)",
        },
        // Cyber Cyan (Telemetry & Active States)
        cyber: {
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
        },
        // Electric Violet (AI & Intelligence)
        electric: {
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
        },
        // Saffron / Vote Orange Accent
        accent: {
          50:  "hsl(28, 100%, 97%)",
          100: "hsl(28, 100%, 90%)",
          200: "hsl(28, 98%, 78%)",
          300: "hsl(28, 95%, 64%)",
          400: "hsl(28, 92%, 52%)",
          500: "hsl(28, 88%, 46%)",
          600: "hsl(28, 90%, 38%)",
          700: "hsl(28, 92%, 30%)",
        },
        // Semantic Enterprise Telemetry
        success: "#10b981",
        warning: "#f59e0b",
        danger:  "#ef4444",
        info:    "#3b82f6",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "Consolas", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "command-mesh": "radial-gradient(at 15% 15%, rgba(6, 182, 212, 0.12) 0px, transparent 50%), radial-gradient(at 85% 15%, rgba(139, 92, 246, 0.12) 0px, transparent 50%), radial-gradient(at 50% 85%, rgba(249, 115, 22, 0.08) 0px, transparent 60%)",
        "dot-grid": "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
        "dot-grid-light": "radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-size": "24px 24px",
      },
      animation: {
        "fade-in": "fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down": "slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse-glow": "pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "float": "float 5s ease-in-out infinite",
        "scanline": "scanline 3s linear infinite",
        "blob": "blob 10s infinite alternate ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(0.98)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(30px, -20px) scale(1.08)" },
          "100%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
      },
      boxShadow: {
        "command-glow": "0 0 30px -5px rgba(6, 182, 212, 0.3), 0 0 15px -5px rgba(139, 92, 246, 0.3)",
        "evm-lcd": "inset 0 2px 6px rgba(0, 0, 0, 0.8), 0 1px 0 rgba(255, 255, 255, 0.1)",
        "button-tactile": "0 4px 0 #1e3a8a, 0 6px 12px rgba(0, 0, 0, 0.5)",
        "button-tactile-active": "0 1px 0 #1e3a8a, 0 2px 4px rgba(0, 0, 0, 0.5)",
        "glass-elevated": "0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
