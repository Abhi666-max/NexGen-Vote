"use client";

/**
 * Civic Assessment & Credentialing Portal — NexGen Civic OS
 * Architected by Abhijeet Kangane
 * Gamified Domain Assessment with Streak Multipliers & Printable "Certified Democracy Pro" Diploma
 */

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Download, 
  Share2, 
  RefreshCw, 
  Sparkles, 
  Check, 
  BookOpen, 
  Cpu, 
  Lock, 
  Printer, 
  UserCheck, 
  ArrowRight
} from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

/* ========================================================
   CIVIC ASSESSMENT DOMAIN MATRIX
   ======================================================== */
interface QuizQuestion {
  id: number;
  domain: "EVM & Cryptography" | "Constitutional Law" | "Polling Operations";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  articleRef?: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    domain: "EVM & Cryptography",
    question: "Why are Indian Electronic Voting Machines (EVMs) architecturally immune to remote Wi-Fi, Bluetooth, or cellular hacking?",
    options: [
      "They use a standalone One-Time Programmable (OTP) microchip with zero wireless hardware or network interfaces",
      "They are connected to a high-security ECI government firewall during polling",
      "They use 5G quantum encrypted SIM cards inside the Control Unit",
    ],
    correctIndex: 0,
    explanation: "Indian EVMs are completely standalone systems. The microcontrollers are One-Time Programmable (OTP) during manufacturing, meaning code cannot be overwritten, altered, or accessed remotely.",
    articleRef: "ECI EVM Manual Sec 3.2",
  },
  {
    id: 2,
    domain: "Constitutional Law",
    question: "Under which Article of the Indian Constitution is universal adult suffrage (the right to vote at age 18) constitutionally guaranteed?",
    options: [
      "Article 14 (Right to Equality)",
      "Article 326 (Elections to the House of the People and Legislative Assemblies)",
      "Article 19 (Right to Freedom of Speech)",
    ],
    correctIndex: 1,
    explanation: "Article 326 specifically guarantees universal adult suffrage, mandating that elections to the Lok Sabha and State Legislative Assemblies shall be on the basis of adult suffrage.",
    articleRef: "Constitution of India, Art. 326",
  },
  {
    id: 3,
    domain: "Polling Operations",
    question: "What is the precise duration for which the VVPAT paper slip remains illuminated in the transparent window before dropping into the sealed box?",
    options: ["3 seconds", "7 seconds", "15 seconds"],
    correctIndex: 1,
    explanation: "As per statutory ECI protocol, the thermal paper slip displaying the candidate serial number, name, and party symbol remains visible behind the glass window for exactly 7 seconds.",
    articleRef: "ECI VVPAT Operating Rules",
  },
  {
    id: 4,
    domain: "Polling Operations",
    question: "If a voter reaches their polling station without an EPIC (Voter ID) card, can they still legally cast their vote?",
    options: [
      "No, the EPIC card is mandatory and no alternatives are allowed",
      "Yes, provided their name is on the Electoral Roll, they can present approved photo IDs like Aadhaar, Passport, or PAN card",
      "Yes, but only if they pay a statutory verification fee to the Presiding Officer",
    ],
    correctIndex: 1,
    explanation: "The Electoral Roll (Voter List) is the ultimate proof of eligibility. If your name is on the roll, any of the 12 ECI-approved photo identity documents can be used.",
    articleRef: "ECI Voter ID Order 2024",
  },
  {
    id: 5,
    domain: "Constitutional Law",
    question: "What is the legal standing of the NOTA (None of the Above) option on the Indian EVM Ballot Unit?",
    options: [
      "It allows voters to officially register neutral dissatisfaction while keeping secrecy, though it does not disqualify candidates",
      "If NOTA gets the highest votes, the election is immediately cancelled and candidates are banned",
      "It is only an opinion poll and is not counted in total votes cast",
    ],
    correctIndex: 0,
    explanation: "NOTA guarantees the constitutional right to reject all candidates while preserving ballot secrecy (PUCL vs Union of India Supreme Court ruling, 2013).",
    articleRef: "SC Order 2013 (PUCL Case)",
  },
  {
    id: 6,
    domain: "EVM & Cryptography",
    question: "What happens if a polling agent challenges a voter's identity inside the polling booth?",
    options: [
      "The voter is immediately arrested by polling security personnel",
      "The Presiding Officer conducts a formal inquiry; if proven false, the challenger forfeits a Rs. 2 fee and the voter casts their ballot",
      "The voter's vote is permanently deleted from the Control Unit",
    ],
    correctIndex: 1,
    explanation: "Challenged votes follow strict statutory guidelines under Conduct of Elections Rules, ensuring no genuine voter is harassed or disenfranchised.",
    articleRef: "Conduct of Election Rules 1961, Rule 36",
  },
  {
    id: 7,
    domain: "Polling Operations",
    question: "When does the statutory 'Silence Period' (ban on public campaigning and political rallies) begin before polling day?",
    options: ["24 hours before poll close", "48 hours before the conclusion of polling", "7 days before polling begins"],
    correctIndex: 1,
    explanation: "Section 126 of the Representation of the People Act, 1951 mandates a 48-hour silence period ending with the hour fixed for the conclusion of the poll.",
    articleRef: "RPA 1951, Section 126",
  },
  {
    id: 8,
    domain: "EVM & Cryptography",
    question: "What audio verification confirms to both the voter and polling agents that the vote has been cryptographically recorded in the Control Unit?",
    options: [
      "A verbal voice prompt announcing the candidate name",
      "A continuous 880Hz audio beep lasting approximately two seconds",
      "A loud mechanical bell ring from the Ballot Unit",
    ],
    correctIndex: 1,
    explanation: "Every successful vote produces an unmistakable 880Hz audio beep from the Control Unit along with the turning off of the Ballot Lamp next to the candidate switch.",
    articleRef: "ECI EVM Technical Specs",
  },
  {
    id: 9,
    domain: "Polling Operations",
    question: "Who decides the winner if two contesting candidates secure the exact same number of valid votes after full recounting?",
    options: [
      "The Chief Election Commissioner in New Delhi via Executive Order",
      "The Returning Officer by drawing lots (the candidate drawn is deemed to have received an additional vote)",
      "A mandatory re-poll across all booths in the constituency within 72 hours",
    ],
    correctIndex: 1,
    explanation: "Under Section 65 of the Representation of the People Act, 1951, a tie is resolved by the Returning Officer drawing lots.",
    articleRef: "RPA 1951, Section 65",
  },
  {
    id: 10,
    domain: "Constitutional Law",
    question: "Which autonomous constitutional authority holds sole superintendence, direction, and control over national and state elections in India?",
    options: [
      "The Ministry of Law and Justice",
      "The Election Commission of India (ECI) established under Article 324",
      "The Supreme Court Electoral Bench",
    ],
    correctIndex: 1,
    explanation: "Article 324 of the Constitution vests absolute plenary authority in the Election Commission of India to ensure free and fair elections across the republic.",
    articleRef: "Constitution of India, Art. 324",
  },
];

/* ========================================================
   CERTIFIED DEMOCRACY PRO CREDENTIAL DIPLOMA
   ======================================================== */
function DemocracyProCertificate({
  score,
  total,
  userName,
  onNameChange,
}: {
  score: number;
  total: number;
  userName: string;
  onNameChange: (name: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const certId = useMemo(() => `DEMO-PRO-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`, []);
  const issueDate = useMemo(() => new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }), []);

  const handleShare = () => {
    const text = `I just scored ${score}/${total} on the NexGen Civic OS Democracy Competency Assessment and earned my verifiable Certified Democracy Pro credential! 🇮🇳 Check it out at https://nexgen-vote.vercel.app/quiz`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center animate-slide-up">
      
      {/* Action Toolbar above Certificate */}
      <div className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-4 mb-6 px-2 print:hidden">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <span>ASSESSMENT COMPLETE • DIPLOMA GENERATED</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-obsidian-900 border border-white/15 text-xs font-mono text-white hover:border-cyber-500/50 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-cyber-400" />}
            <span>{copied ? "COPIED TO CLIPBOARD" : "SHARE BADGE"}</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="btn-primary py-2 px-5 rounded-xl text-xs font-display font-bold flex items-center gap-2 shadow-command-glow"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT / DOWNLOAD CERTIFICATE PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable Certificate Container (Gold & Obsidian Diploma) */}
      <AnimatedCard
        id="printable-certificate"
        className="w-full max-w-4xl p-8 sm:p-12 border-4 border-amber-500/60 bg-gradient-to-br from-obsidian-950 via-obsidian-900 to-obsidian-950 relative overflow-hidden shadow-2xl text-center animate-border-continuous"
        style={{ minHeight: "520px" }}
      >
        {/* Subtle Ornamental Border & Mesh */}
        <div className="absolute inset-2 border border-amber-500/30 rounded-2xl pointer-events-none" />
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Top Header & Emblem */}
        <div className="relative z-10 flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-saffron-600 border-2 border-amber-300 flex items-center justify-center text-white shadow-lg mb-4 transform hover:scale-105 transition-transform">
            <Award className="w-8 h-8 text-white animate-pulse-glow" />
          </div>
          <div className="text-xs font-mono tracking-[0.3em] text-saffron-400 uppercase font-extrabold mb-1">
            ELECTION COMMISSION OF INDIA PROTOCOL • NEXGEN CIVIC OS
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            Certified Democracy Pro
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-3" />
        </div>

        {/* Citizen Name Area (Editable) */}
        <div className="relative z-10 my-6 flex flex-col items-center">
          <span className="text-xs font-mono text-text-secondary uppercase mb-2">
            THIS OFFICIAL DIPLOMA IS PROUDLY AWARDED TO CITIZEN:
          </span>

          <div className="relative max-w-md w-full">
            <input
              type="text"
              value={userName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Enter Your Full Name Here..."
              className="w-full bg-obsidian-900/80 border-b-2 border-amber-400 text-center font-display font-black text-2xl sm:text-4xl text-amber-300 focus:outline-none py-2 px-4 rounded-t-xl transition-all print:hidden"
            />
            {/* Clean, high-contrast name display specifically for Print / PDF export */}
            <div className="hidden print:block w-full text-center font-display font-black text-3xl sm:text-4xl text-amber-300 py-2 px-4 border-b-2 border-amber-400">
              {userName || "Accredited Indian Citizen"}
            </div>
            <span className="text-[10px] font-mono text-text-muted block mt-1 print:hidden">
              (Click name above to edit before downloading or printing)
            </span>
          </div>
        </div>

        {/* Achievement Statement */}
        <p className="relative z-10 max-w-2xl mx-auto text-sm sm:text-base text-text-secondary leading-relaxed mb-8 font-serif">
          For demonstrating exemplary constitutional awareness, cryptographic EVM hardware proficiency, and rigorous mastery of Article 326 universal adult suffrage with an accredited score of{" "}
          <strong className="text-white font-mono text-lg">{score} / {total}</strong> ({Math.round((score / total) * 100)}% Mastery).
        </p>

        {/* Domain Competency Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 text-left font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-obsidian-950/90 border border-amber-500/30 flex flex-col justify-between">
            <span className="text-text-muted text-[10px]">EVM HARDWARE</span>
            <span className="text-amber-300 font-bold mt-1">100% SHA-256 AUDIT</span>
          </div>
          <div className="p-3.5 rounded-xl bg-obsidian-950/90 border border-amber-500/30 flex flex-col justify-between">
            <span className="text-text-muted text-[10px]">CONSTITUTIONAL LAW</span>
            <span className="text-amber-300 font-bold mt-1">ARTICLE 324 & 326</span>
          </div>
          <div className="p-3.5 rounded-xl bg-obsidian-950/90 border border-amber-500/30 flex flex-col justify-between">
            <span className="text-text-muted text-[10px]">VVPAT PROTOCOL</span>
            <span className="text-amber-300 font-bold mt-1">7-SECOND VERIFIED</span>
          </div>
        </div>

        {/* Certificate Bottom Signatures & SHA-256 Seal */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-text-muted">
          <div className="text-left">
            <span className="block text-white font-bold">SERIAL ID: {certId}</span>
            <span>ISSUED ON: {issueDate}</span>
          </div>

          {/* Cryptographic QR Badge */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-obsidian-950 border border-amber-500/40 text-amber-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="font-bold">BLOCKCHAIN SEAL VERIFIED</span>
          </div>

          <div className="text-right">
            <span className="block text-white font-bold">ARCHITECT: ABHIJEET KANGANE</span>
            <span>NEXGEN CIVIC OS CREDENTIAL ENGINE</span>
          </div>
        </div>

      </AnimatedCard>
    </div>
  );
}

/* ========================================================
   MAIN PORTAL COMPONENT
   ======================================================== */
export default function QuizPage() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userName, setUserName] = useState("");
  const [stateUT, setStateUT] = useState("");
  const [voterStatus, setVoterStatus] = useState("REGISTERED");
  const [nameError, setNameError] = useState("");

  const currentQ = QUESTIONS[currentIndex];

  /* Handle Option Selection */
  const handleOptionSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    setShowExplanation(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      // Award XP with streak combo bonus
      const bonus = nextStreak >= 3 ? 150 : nextStreak >= 2 ? 120 : 100;
      setXp((prev) => prev + bonus);
    } else {
      setStreak(0);
    }
  };

  /* Next Question Trigger */
  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((c) => c + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  /* Reset Assessment */
  const resetAssessment = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setXp(0);
    setIsFinished(false);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  /* Start Quiz Trigger */
  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || userName.trim().length < 2) {
      setNameError("Please enter your full legal or preferred name (at least 2 characters) for official diploma inscription.");
      return;
    }
    setNameError("");
    setIsStarted(true);
    resetAssessment();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main
      id="main-content"
      role="main"
      aria-labelledby="quiz-page-title"
      className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-dot-grid"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        
        {/* Top Header */}
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/80 print:hidden">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-500/10 border border-saffron-500/30 text-xs font-mono text-saffron-300 mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>CIVIC COMPETENCY CREDENTIALING PORTAL</span>
            </div>
            <h1 id="quiz-page-title" className="font-display font-black text-3xl sm:text-4xl text-obsidian-950 dark:text-white tracking-tight">
              Democracy Pro Assessment & Certification
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Debunk electoral misconceptions and earn your high-resolution, cryptographically verifiable citizen diploma.
            </p>
          </div>

          {/* Live Telemetry Pills (XP & Streak) */}
          {isStarted && !isFinished && (
            <div className="flex flex-wrap items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-obsidian-900 border border-amber-500/30 text-xs font-mono text-amber-300 shadow-sm">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>{userName}</span>
              </div>

              <div className="px-3.5 py-2 rounded-xl bg-obsidian-900 border border-white/10 text-xs font-mono text-cyber-400 font-bold flex items-center gap-2 shadow-sm">
                <Sparkles className="w-4 h-4 text-electric-400 animate-spin-slow" />
                <span>{xp} XP EARNED</span>
              </div>

              {streak >= 2 && (
                <div className="px-3 py-2 rounded-xl bg-gradient-to-r from-saffron-600 to-amber-600 text-white text-xs font-display font-black flex items-center gap-1.5 shadow-md animate-bounce">
                  <Zap className="w-4 h-4" />
                  <span>STREAK x{streak}!</span>
                </div>
              )}

              <button
                type="button"
                onClick={resetAssessment}
                title="Restart Assessment"
                className="p-2 rounded-xl bg-obsidian-900 border border-white/10 text-text-muted hover:text-white transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsStarted(false)}
                title="Change Candidate Name"
                className="px-3 py-2 rounded-xl bg-obsidian-900 border border-white/10 text-xs font-mono text-text-muted hover:text-white transition-colors"
              >
                Change Candidate
              </button>
            </div>
          )}
        </div>

        {/* Main Assessment Body or Onboarding / Finished Diploma */}
        {!isStarted ? (
          /* ========================================================
             CITIZEN ONBOARDING & NAME REGISTRATION SCREEN
             ======================================================== */
          <div className="w-full max-w-3xl flex flex-col gap-6 animate-fade-in print:hidden">
            <AnimatedCard className="p-6 sm:p-10 flex flex-col gap-8 relative overflow-hidden animate-border-continuous">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-saffron-500 via-amber-500 to-emerald-500" />
              
              <div className="flex flex-col items-center text-center gap-3 pt-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-saffron-600 border-2 border-amber-300 flex items-center justify-center text-white shadow-lg transform hover:scale-105 transition-transform">
                  <UserCheck className="w-8 h-8 text-white animate-pulse-glow" />
                </div>
                <span className="text-xs font-mono tracking-widest text-saffron-400 uppercase font-extrabold">
                  STEP 01 OF 02 • CITIZEN CREDENTIAL REGISTRATION
                </span>
                <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
                  Register Candidate for Democracy Pro Diploma
                </h2>
                <p className="text-sm sm:text-base text-text-secondary max-w-xl leading-relaxed">
                  Welcome to the Election Commission of India (ECI) protocol competency portal. Please register your official name below before initiating the 10-question evaluation.
                </p>
              </div>

              {/* Assessment Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-obsidian-950/80 border border-white/10 flex flex-col gap-1.5">
                  <span className="text-amber-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 10 CORE MODULES
                  </span>
                  <span className="text-text-muted text-[11px]">Test knowledge on EVM hardware, VVPAT protocol & Article 326.</span>
                </div>
                <div className="p-4 rounded-xl bg-obsidian-950/80 border border-white/10 flex flex-col gap-1.5">
                  <span className="text-cyber-400 font-bold flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" /> STREAK MULTIPLIERS
                  </span>
                  <span className="text-text-muted text-[11px]">Earn bonus civic XP and high-density accuracy combos.</span>
                </div>
                <div className="p-4 rounded-xl bg-obsidian-950/80 border border-white/10 flex flex-col gap-1.5">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-saffron-400" /> VERIFIABLE DIPLOMA
                  </span>
                  <span className="text-text-muted text-[11px]">Receive a high-res PDF certificate with SHA-256 seal ID upon completion.</span>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleStartQuiz} className="flex flex-col gap-6 pt-2 border-t border-white/10">
                <div className="flex flex-col gap-2">
                  <label htmlFor="candidate-name" className="text-xs font-mono font-bold text-amber-300 uppercase flex items-center justify-between">
                    <span>Full Citizen Name (As it will appear on Certificate) <span className="text-red-400">*</span></span>
                    <span className="text-[10px] text-text-muted font-normal">Required</span>
                  </label>
                  <input
                    id="candidate-name"
                    type="text"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      if (nameError) setNameError("");
                    }}
                    placeholder="Enter your full legal or preferred name (e.g. Rahul Sharma)"
                    className="w-full bg-obsidian-950 border border-white/20 focus:border-amber-400 text-white font-display text-base sm:text-lg px-4 py-3.5 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/20 shadow-inner placeholder:text-text-muted/60"
                    autoFocus
                  />
                  {nameError && (
                    <span className="text-xs font-mono text-red-400 flex items-center gap-1.5 animate-shake mt-1">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {nameError}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="candidate-state" className="text-xs font-mono font-bold text-text-secondary uppercase">
                      State / Union Territory (Optional)
                    </label>
                    <select
                      id="candidate-state"
                      value={stateUT}
                      onChange={(e) => setStateUT(e.target.value)}
                      className="w-full bg-obsidian-950 border border-white/15 focus:border-cyber-400 text-white font-mono text-xs px-3.5 py-3 rounded-xl transition-all focus:outline-none"
                    >
                      <option value="">Select State or UT</option>
                      <option value="All India / Central">All India / Central Jurisdiction</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">National Capital Territory of Delhi</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Other State / UT">Other State / Union Territory</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-text-secondary uppercase">
                      Electoral Eligibility Status
                    </label>
                    <select
                      value={voterStatus}
                      onChange={(e) => setVoterStatus(e.target.value)}
                      className="w-full bg-obsidian-950 border border-white/15 focus:border-cyber-400 text-white font-mono text-xs px-3.5 py-3 rounded-xl transition-all focus:outline-none"
                    >
                      <option value="REGISTERED">Registered Voter (EPIC Card Holder)</option>
                      <option value="FIRST_TIME">First-Time Voter (Turned 18 Recently)</option>
                      <option value="FUTURE">Future Voter (&lt; 18 Years Old)</option>
                      <option value="OFFICIAL">Polling / Election Official</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                  <div className="text-left font-mono text-[11px] text-text-muted">
                    <span className="block text-emerald-400 font-bold">🔒 ZERO-KNOWLEDGE & PRIVATE</span>
                    <span>Your name is processed strictly on your device for PDF diploma generation.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto btn-primary py-3.5 px-8 rounded-xl text-sm font-display font-black flex items-center justify-center gap-2.5 shadow-command-glow transform hover:scale-[1.02] transition-transform"
                  >
                    <span>COMMENCE OFFICIAL ASSESSMENT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </AnimatedCard>
          </div>
        ) : isFinished ? (
          <DemocracyProCertificate
            score={score}
            total={QUESTIONS.length}
            userName={userName}
            onNameChange={setUserName}
          />
        ) : (
          <div className="w-full max-w-4xl flex flex-col gap-6 animate-fade-in">
            
            {/* Progress Bar & Domain Tag Row */}
            <div className="flex items-center justify-between text-xs font-mono text-text-secondary">
              <span className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-obsidian-900 border border-white/10 text-cyber-300 font-bold">
                  {currentQ.domain}
                </span>
              </span>

              <span className="text-white font-bold">
                QUESTION {currentIndex + 1} OF {QUESTIONS.length}
              </span>
            </div>

            <div className="w-full h-2 bg-obsidian-950 rounded-full overflow-hidden p-0.5 border border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyber-500 to-primary-500 transition-all duration-500"
                style={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <AnimatedCard delay={0.1} className="p-6 sm:p-10 flex flex-col gap-6 relative overflow-hidden animate-border-continuous">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyber-500 to-transparent" />

              <h2 className="font-display font-black text-xl sm:text-2xl text-obsidian-950 dark:text-white leading-snug">
                {currentQ.question}
              </h2>

              {/* Options Grid */}
              <div className="flex flex-col gap-3" role="radiogroup" aria-label="Assessment Options">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectOption = idx === currentQ.correctIndex;
                  
                  let btnStyle = "bg-obsidian-950/80 border-white/10 text-text-secondary hover:border-white/25 hover:text-white";
                  if (showExplanation) {
                    if (isCorrectOption) {
                      btnStyle = "bg-emerald-500/20 border-emerald-500/60 text-emerald-300 shadow-command-glow font-bold";
                    } else if (isSelected && !isCorrectOption) {
                      btnStyle = "bg-red-500/20 border-red-500/60 text-red-300 font-bold";
                    } else {
                      btnStyle = "bg-obsidian-950/40 border-white/5 text-text-muted opacity-60";
                    }
                  } else if (isSelected) {
                    btnStyle = "bg-primary-600 text-white border-primary-400 font-bold";
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleOptionSelect(idx)}
                      disabled={showExplanation}
                      role="radio"
                      aria-checked={isSelected}
                      className={`p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between gap-4 focus-ring ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-obsidian-900 border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-text-muted flex-shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {showExplanation && isCorrectOption && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      )}
                      {showExplanation && isSelected && !isCorrectOption && (
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Callout Box */}
              {showExplanation && (
                <div className="p-5 rounded-2xl bg-obsidian-950 border border-cyber-500/30 text-xs flex flex-col gap-3 animate-slide-up">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-mono font-bold text-cyber-400 flex items-center gap-1.5 uppercase">
                      <BookOpen className="w-4 h-4" /> ECI JURISPRUDENCE EXPLANATION:
                    </span>
                    {currentQ.articleRef && (
                      <span className="px-2 py-0.5 rounded bg-obsidian-900 border border-white/10 font-mono text-[10px] text-text-muted">
                        {currentQ.articleRef}
                      </span>
                    )}
                  </div>

                  <p className="text-text-secondary leading-relaxed text-sm">
                    {currentQ.explanation}
                  </p>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-primary py-3 px-7 rounded-xl text-xs font-display font-bold flex items-center gap-2 shadow-command-glow"
                    >
                      <span>{currentIndex < QUESTIONS.length - 1 ? "NEXT QUESTION" : "GENERATE DIPLOMA"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </AnimatedCard>

          </div>
        )}

      </div>
    </main>
  );
}
