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
        // Primary brand palette
        primary: {
          50:  "hsl(220, 100%, 97%)",
          100: "hsl(220, 95%, 92%)",
          200: "hsl(220, 90%, 82%)",
          300: "hsl(220, 85%, 70%)",
          400: "hsl(220, 80%, 58%)",
          500: "hsl(220, 75%, 48%)",
          600: "hsl(220, 78%, 40%)",
          700: "hsl(220, 82%, 32%)",
          800: "hsl(220, 86%, 24%)",
          900: "hsl(220, 90%, 16%)",
          950: "hsl(220, 95%, 10%)",
        },
        // Accent - saffron/vote orange
        accent: {
          50:  "hsl(28, 100%, 97%)",
          100: "hsl(28, 100%, 90%)",
          200: "hsl(28, 98%, 78%)",
          300: "hsl(28, 95%, 64%)",
          400: "hsl(28, 92%, 52%)",
          500: "hsl(28, 88%, 44%)",
          600: "hsl(28, 90%, 36%)",
        },
        // Semantic colors
        success: "hsl(142, 70%, 40%)",
        warning: "hsl(38, 92%, 50%)",
        danger:  "hsl(0, 72%, 50%)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-mesh": "radial-gradient(at 40% 20%, hsla(220, 80%, 58%, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(28, 88%, 44%, 0.08) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(220, 75%, 48%, 0.1) 0px, transparent 50%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-down": "slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "glow-primary": "0 0 20px -5px hsl(220, 75%, 48%, 0.4)",
        "glow-accent": "0 0 20px -5px hsl(28, 88%, 44%, 0.4)",
        "card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "card-hover": "0 10px 30px -5px rgb(0 0 0 / 0.15), 0 4px 6px -2px rgb(0 0 0 / 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
