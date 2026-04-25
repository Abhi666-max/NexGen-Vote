import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/* ===================================
   FONT LOADING (next/font/google)
   =================================== */
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
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
      className={`${inter.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col antialiased">
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
          className="flex-1 animate-fade-in"
        >
          {children}
        </main>

        {/* Site Footer */}
        <Footer />
      </body>
    </html>
  );
}
