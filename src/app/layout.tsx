import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/* ===================================
   BESPOKE SAAS / IAAS FONT SYSTEM
   =================================== */
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

/* ===================================
   METADATA (SEO + A11y)
   =================================== */
export const metadata: Metadata = {
  title: {
    default: "NexGen Vote | Smart Election Education",
    template: "%s | NexGen Vote",
  },
  description:
    "Interactive EVM simulator and AI Voter Assistant — empowering citizens with transparent, gamified knowledge of the democratic process.",
  keywords: [
    "election education",
    "EVM simulator",
    "voter awareness",
    "AI voter assistant",
    "India elections",
    "booth locator",
    "voter mitra",
    "NexGen Vote",
  ],
  authors: [{ name: "Abhijeet Kangane" }],
  creator: "Abhijeet Kangane",
  metadataBase: new URL("https://nexgen-vote.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "NexGen Vote | Smart Election Education",
    description:
      "Interactive EVM simulator and AI Voter Assistant — empowering citizens with transparent election knowledge.",
    siteName: "NexGen Vote",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexGen Vote | Smart Election Education",
    description:
      "Interactive EVM simulator and AI Voter Assistant — empowering citizens with transparent election knowledge.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(220, 20%, 98%)" },
    { media: "(prefers-color-scheme: dark)",  color: "hsl(224, 28%, 8%)"  },
  ],
  width: "device-width",
  initialScale: 1,
};

/* ===================================
   ROOT LAYOUT
   =================================== */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${jetbrains.variable} dark`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col antialiased bg-obsidian-950 text-text-primary selection:bg-cyber-500 selection:text-obsidian-950">
        {/* Continuous Full-Viewport Animated Cybernetic Background (Start to Footer) */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden print:hidden bg-obsidian-950">
          {/* Continuous floating ambient aurora & plasma blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-primary-600/25 via-cyber-500/20 to-transparent blur-[140px] animate-blob" />
          <div className="absolute top-[35%] right-[-10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-bl from-electric-600/25 via-primary-500/20 to-transparent blur-[160px] animate-blob animation-delay-4000" />
          <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-t from-cyber-500/20 via-teal-500/15 to-transparent blur-[140px] animate-blob animation-delay-2000" />
          
          {/* Continuous animated cyber mesh grid covering entire screen */}
          <div className="absolute inset-0 bg-dot-grid opacity-35 animate-pulse-glow" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee10_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee10_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-70" />
        </div>

        {/* A11y: Skip navigation link */}
        <a href="#main-content" className="skip-to-main" aria-label="Skip to main content">
          Skip to main content
        </a>

        {/* Site Header */}
        <Header />

        {/* Page Content */}
        <main
          id="main-content"
          role="main"
          className="flex-1 animate-fade-in relative z-10"
        >
          {children}
        </main>

        {/* Site Footer (only renders on landing page "/") */}
        <Footer />
      </body>
    </html>
  );
}
