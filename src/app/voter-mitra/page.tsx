"use client";

/**
 * AI Voter Mitra Copilot — NexGen Civic OS
 * Architected by Abhijeet Kangane
 * Enterprise Dual-Pane Conversational Civic Intelligence Command Center
 */

import { useState, useRef, useEffect, useCallback, memo, type FormEvent, type KeyboardEvent } from "react";
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  ShieldCheck, 
  BookOpen, 
  FileText, 
  Terminal, 
  AlertCircle, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

/* ========================================================
   TYPES & CATEGORIZED PROMPT WORKSPACE
   ======================================================== */
interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

interface ApiMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

interface PromptCategory {
  id: string;
  label: string;
  icon: any;
  prompts: { title: string; query: string }[];
}

const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    id: "basics",
    label: "First-Time Voter Guide",
    icon: BookOpen,
    prompts: [
      { title: "Step-by-step Registration", query: "Can you give me a step-by-step guide on how to register as a first-time voter online via Form 6?" },
      { title: "Required ID Documents", query: "What exact documents do I need to carry to the polling booth on election day if I don't have my EPIC card?" },
      { title: "Checking Electoral Roll", query: "How do I check if my name is active on the official ECI voter list/electoral roll?" },
    ],
  },
  {
    id: "evm",
    label: "EVM & VVPAT Cryptography",
    icon: ShieldCheck,
    prompts: [
      { title: "Can EVMs Be Hacked?", query: "Explain technically why Indian EVMs cannot be hacked remotely via Wi-Fi, Bluetooth, or internet connections." },
      { title: "How VVPAT Verification Works", query: "What happens during the 7-second VVPAT verification window and how does it prevent ballot discrepancies?" },
      { title: "Standalone Microcontroller Specs", query: "What is the One-Time Programmable (OTP) chip mechanism used in Indian EVM Control Units?" },
    ],
  },
  {
    id: "rights",
    label: "Constitutional Law & Rights",
    icon: FileText,
    prompts: [
      { title: "Article 326 Overview", query: "Explain Article 326 of the Indian Constitution and what universal adult suffrage means for citizens." },
      { title: "NOTA Legal Framework", query: "What is the legal impact of NOTA (None of the Above) in Indian parliamentary elections?" },
      { title: "Challenging Identity at Booth", query: "What are my legal rights if a polling agent challenges my identity or if I find my vote already cast (Tendered Vote)?" },
    ],
  },
  {
    id: "nri",
    label: "NRI & Postal Ballots",
    icon: ExternalLink,
    prompts: [
      { title: "NRI Overseas Registration", query: "How can Non-Resident Indians (NRIs) register to vote using Form 6A?" },
      { title: "Electronically Transmitted Postal Ballot", query: "Who is eligible for the Electronically Transmitted Postal Ballot System (ETPBS) in India?" },
    ],
  },
];

/* ========================================================
   HELPER FORMATTING & TIME FUNCTIONS
   ======================================================== */
function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/* ========================================================
   RICH MARKDOWN & CIVIC FORMATTER COMPONENT
   ======================================================== */
function parseBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function renderInlineStyle(text: string): React.ReactNode[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(...parseBold(text.slice(lastIdx, match.index)));
    }
    parts.push(
      <a
        key={`link-${match.index}`}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyber-400 underline underline-offset-2 hover:text-amber-300 transition-colors font-medium inline-flex items-center gap-1"
      >
        <span>{match[1]}</span>
        <ExternalLink className="w-3 h-3 inline" />
      </a>
    );
    lastIdx = linkRegex.lastIndex;
  }

  if (lastIdx < text.length) {
    parts.push(...parseBold(text.slice(lastIdx)));
  }

  return parts;
}

const FormattedCivicText = memo(function FormattedCivicText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-2" />;

        /* Heading ### or ## */
        if (trimmed.startsWith("###") || trimmed.startsWith("##")) {
          const cleanHeading = trimmed.replace(/^#+\s*/, "").replace(/\*\*/g, "");
          return (
            <h3 key={idx} className="font-display font-black text-base sm:text-lg text-amber-300 border-b border-white/10 pb-1.5 pt-2 my-2.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyber-400 flex-shrink-0" />
              <span>{cleanHeading}</span>
            </h3>
          );
        }

        /* Bullet items •, *, - */
        if (trimmed.startsWith("•") || trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
          const cleanItem = trimmed.replace(/^[•*-]\s*/, "");
          return (
            <div key={idx} className="flex items-start gap-2.5 my-1.5 pl-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-400 mt-2 flex-shrink-0" />
              <div className="text-text-secondary">{renderInlineStyle(cleanItem)}</div>
            </div>
          );
        }

        /* Numbered list items 1., 2. */
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-3 my-2 pl-1">
              <span className="w-5 h-5 rounded-md bg-obsidian-950 border border-amber-500/30 flex items-center justify-center font-mono text-[11px] text-amber-300 font-bold flex-shrink-0">
                {numMatch[1]}
              </span>
              <div className="text-text-secondary pt-0.5">{renderInlineStyle(numMatch[2])}</div>
            </div>
          );
        }

        /* Standard paragraph */
        return (
          <p key={idx} className="text-text-secondary leading-relaxed my-1">
            {renderInlineStyle(trimmed)}
          </p>
        );
      })}
    </div>
  );
});

/* ========================================================
   MESSAGE BUBBLE COMPONENT (Enterprise Formatted & Memoized)
   ======================================================== */
const MessageBubble = memo(function MessageBubble({ 
  msg, 
  index,
  onCopy, 
  onQuickQuery 
}: { 
  msg: Message; 
  index: number;
  onCopy: (text: string) => void; 
  onQuickQuery?: (query: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const isUser = msg.role === "user";
  const isWelcome = !isUser && (index === 0 || msg.id === "welcome" || msg.text.includes("Welcome to Voter Mitra AI") || msg.text.includes("Welcome to the **Voter Mitra"));

  const handleCopy = () => {
    onCopy(msg.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex items-start gap-3.5 ${isUser ? "flex-row-reverse" : "flex-row"} animate-fade-in w-full`}
      role="listitem"
    >
      {/* Avatar Icon */}
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md ${
          isUser
            ? "bg-gradient-to-br from-primary-600 to-indigo-600 border border-primary-400/40"
            : "bg-gradient-to-br from-cyber-600 to-primary-700 border border-cyber-400/40"
        }`}
        aria-hidden="true"
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-cyber-200" />}
      </div>

      {/* Message Content Bubble */}
      <div className={`flex flex-col gap-1.5 max-w-[92%] sm:max-w-[85%] ${isUser ? "items-end" : "items-start"} w-full`}>
        
        {/* Header Tag */}
        <div className="flex items-center gap-2 px-1">
          <span className="text-xs font-mono font-bold text-text-secondary">
            {isUser ? "CITIZEN QUERY" : "VOTER MITRA AI v2.0"}
          </span>
          <span className="text-[10px] font-mono text-text-muted">{formatTime(msg.timestamp)}</span>
        </div>

        {/* Bubble Surface */}
        <div
          className={`p-5 sm:p-6 rounded-2xl text-sm leading-relaxed relative group w-full ${
            isUser
              ? "bg-primary-600 text-white rounded-tr-sm shadow-md border border-primary-400/30 whitespace-pre-wrap break-words max-w-[85%]"
              : "glass-card bg-surface dark:bg-obsidian-900 text-obsidian-950 dark:text-white rounded-tl-sm border border-border/80 shadow-md"
          }`}
        >
          {isUser ? (
            msg.text
          ) : isWelcome ? (
            /* ========================================================
               EXECUTIVE ECI CIVIC INTELLIGENCE COMMAND CENTER
               ======================================================== */
            <div className="flex flex-col gap-6 animate-fade-in w-full">
              {/* Top Executive Header & System Telemetry Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-600 to-primary-700 border border-cyber-400/40 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                    <Terminal className="w-5 h-5 text-cyber-200" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight leading-tight flex items-center gap-2">
                      <span>Voter Mitra AI Copilot</span>
                      <span className="px-2 py-0.5 rounded-md bg-obsidian-950 border border-cyber-500/40 font-mono text-[10px] text-cyber-300">v2.0 PRO</span>
                    </h3>
                    <span className="text-xs font-mono text-text-muted flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Statutory Intelligence & Voting Rights Copilot
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-obsidian-950 border border-emerald-500/30 font-mono text-[11px] text-emerald-400 font-bold flex items-center gap-1.5 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> ECI ART. 324 & 326 COMPLIANT
                  </span>
                </div>
              </div>

              {/* Authoritative Architectural Overview */}
              <div className="p-4 rounded-xl bg-obsidian-950/80 border border-white/10 text-xs sm:text-sm text-text-secondary leading-relaxed shadow-inner">
                Welcome to the official Election Commission of India (ECI) civic intelligence portal. Powered by dual-engine neural inference (<strong className="text-white font-semibold">Groq Llama 3.3 70B</strong> & <strong className="text-cyber-300 font-semibold">Gemini 2.0</strong>) to provide verified, zero-latency guidance on voter registration protocols, cryptographic EVM/VVPAT hardware verification, and polling station constitutional law.
              </div>

              {/* Executive Inquiry Modules (Select or Click to Launch) */}
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-mono font-bold text-cyber-400 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>SELECT STATUTORY INQUIRY MODULE TO LAUNCH INSTANT QUERY:</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => onQuickQuery && onQuickQuery("Can you give me a step-by-step guide on how to register as a first-time voter online via Form 6?")}
                    className="p-4 rounded-xl bg-obsidian-950 hover:bg-obsidian-900 border border-white/10 hover:border-cyber-500/60 text-left transition-all group/btn flex flex-col justify-between gap-2.5 shadow-md"
                  >
                    <span className="font-display font-bold text-xs text-white group-hover/btn:text-cyber-300 transition-colors flex items-center justify-between">
                      <span>Form 6 Online Enrollment</span>
                      <ChevronRight className="w-4 h-4 text-text-muted group-hover/btn:text-cyber-300 transform group-hover/btn:translate-x-0.5 transition-all" />
                    </span>
                    <span className="text-[11px] font-mono text-text-muted leading-relaxed">Step-by-step registration procedure, required identity docs, and age verification.</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onQuickQuery && onQuickQuery("Explain technically why Indian EVMs cannot be hacked remotely via Wi-Fi, Bluetooth, or internet connections.")}
                    className="p-4 rounded-xl bg-obsidian-950 hover:bg-obsidian-900 border border-white/10 hover:border-amber-400/60 text-left transition-all group/btn flex flex-col justify-between gap-2.5 shadow-md"
                  >
                    <span className="font-display font-bold text-xs text-white group-hover/btn:text-amber-300 transition-colors flex items-center justify-between">
                      <span>EVM Hardware Cryptography</span>
                      <ChevronRight className="w-4 h-4 text-text-muted group-hover/btn:text-amber-300 transform group-hover/btn:translate-x-0.5 transition-all" />
                    </span>
                    <span className="text-[11px] font-mono text-text-muted leading-relaxed">Standalone OTP silicon chip architecture and physical isolation verification.</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onQuickQuery && onQuickQuery("What exact documents do I need to carry to the polling booth on election day if I don't have my EPIC card?")}
                    className="p-4 rounded-xl bg-obsidian-950 hover:bg-obsidian-900 border border-white/10 hover:border-emerald-400/60 text-left transition-all group/btn flex flex-col justify-between gap-2.5 shadow-md"
                  >
                    <span className="font-display font-bold text-xs text-white group-hover/btn:text-emerald-300 transition-colors flex items-center justify-between">
                      <span>Polling Booth Statutory IDs</span>
                      <ChevronRight className="w-4 h-4 text-text-muted group-hover/btn:text-emerald-300 transform group-hover/btn:translate-x-0.5 transition-all" />
                    </span>
                    <span className="text-[11px] font-mono text-text-muted leading-relaxed">Alternative government-issued photo identity documents valid on election day.</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <FormattedCivicText text={msg.text} />
          )}

          {/* Model Footer Actions */}
          {!isUser && (
            <div className="mt-5 pt-3 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-text-muted">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified against ECI Guidelines</span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-obsidian-950/80 border border-white/10 text-text-secondary hover:text-cyber-400 hover:border-cyber-500/50 transition-all"
                title="Copy response"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "COPIED" : "COPY"}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

/* ========================================================
   TYPING INDICATOR
   ======================================================== */
function TypingIndicator() {
  return (
    <div className="flex items-start gap-3.5 animate-fade-in" role="status" aria-label="Voter Mitra is generating verified civic intelligence">
      <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-cyber-600 to-primary-700 border border-cyber-400/40 text-white shadow-md">
        <Bot className="w-4 h-4 text-cyber-200" />
      </div>
      <div className="glass-card rounded-2xl rounded-tl-sm px-5 py-4 bg-surface dark:bg-obsidian-900 border border-border/80 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-cyber-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <span className="text-xs font-mono text-text-secondary">Consulting official ECI regulatory database via Groq Llama 3.3...</span>
      </div>
    </div>
  );
}

/* ========================================================
   MAIN VOTER MITRA COMMAND CENTER COMPONENT
   ======================================================== */
export default function VoterMitraPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      text: "Namaste! 🙏 Welcome to the **Voter Mitra AI Civic Intelligence Copilot**.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("basics");

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /* Clean Auto-scroll only within chat container without window jumping */
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  /* Send message logic */
  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    setInput("");

    const userMsg: Message = { id: uid(), role: "user", text: trimmed, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const allMsgs = [...messages, userMsg];
      const firstUserIdx = allMsgs.findIndex((m) => m.role === "user");
      const apiMessages: ApiMessage[] = allMsgs
        .slice(firstUserIdx)
        .map((m) => ({
          role: m.role,
          parts: [{ text: m.text }],
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error ?? "API request failed");
      }

      const botMsg: Message = {
        id: uid(),
        role: "model",
        text: data.reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Something went wrong";
      setError(errMsg);
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "model",
          text: "⚠️ System Alert: Unable to reach ECI inference endpoint. Please verify your network connection or API configuration.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const resetSession = () => {
    setMessages([
      {
        id: uid(),
        role: "model",
        text: "Session cleared. Voter Mitra Copilot ready for your next query.",
        timestamp: new Date(),
      },
    ]);
  };

  const currentCategoryObj = PROMPT_CATEGORIES.find((c) => c.id === activeCategory) || PROMPT_CATEGORIES[0];

  return (
    <main
      id="main-content"
      role="main"
      aria-labelledby="voter-mitra-heading"
      className="min-h-[calc(100dvh-70px)] bg-dot-grid flex flex-col"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col lg:flex-row gap-6 p-4 sm:p-6 lg:p-8">
        
        {/* =======================================================
            LEFT WORKSPACE PANE (Prompt Library & References)
            ======================================================= */}
        <aside
          className="w-full lg:w-80 xl:w-96 flex flex-col gap-5 flex-shrink-0"
          aria-label="Civic Intelligence Prompt Workspace"
        >
          <AnimatedCard delay={0.1} className="p-6 flex flex-col gap-5 animate-border-continuous">
            
            {/* Copilot Header */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyber-600 to-primary-700 flex items-center justify-center text-white shadow-md">
                <Bot className="w-6 h-6 text-cyber-200 animate-pulse-glow" />
              </div>
              <div>
                <h1 id="voter-mitra-heading" className="font-display font-extrabold text-lg text-obsidian-950 dark:text-white leading-tight">
                  Voter Mitra AI <span className="text-cyber-400 font-mono text-xs">v2.0</span>
                </h1>
                <span className="text-xs font-mono text-text-muted flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Autonomous ECI Copilot
                </span>
              </div>
            </div>

            {/* Prompt Category Tabs */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-text-secondary uppercase tracking-wider">
                KNOWLEDGE WORKSPACE CATEGORIES:
              </span>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5">
                {PROMPT_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-display font-bold transition-all text-left ${
                        isActive
                          ? "bg-primary-600 text-white shadow-sm border border-primary-400/40"
                          : "bg-obsidian-950/80 hover:bg-obsidian-900 text-text-secondary hover:text-white border border-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? "text-cyber-300" : "text-text-muted"}`} />
                        <span>{cat.label}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-text-muted"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Prompt Quick-Click List */}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-white/10">
              <span className="text-[11px] font-mono text-cyber-400 uppercase font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Quick Queries ({currentCategoryObj.label}):
              </span>

              <div className="flex flex-col gap-2">
                {currentCategoryObj.prompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => sendMessage(p.query)}
                    disabled={isLoading}
                    className="p-3 rounded-xl bg-obsidian-950 border border-white/10 hover:border-cyber-500/50 text-left transition-all group flex flex-col gap-1 focus-ring disabled:opacity-50"
                  >
                    <span className="text-xs font-bold text-white group-hover:text-cyber-400 transition-colors flex items-center justify-between">
                      <span>{p.title}</span>
                      <Send className="w-3 h-3 text-text-muted group-hover:text-cyber-400 transform group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <span className="text-[11px] text-text-muted line-clamp-2 font-mono">
                      &quot;{p.query}&quot;
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Controls */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={resetSession}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-obsidian-950 hover:bg-obsidian-900 border border-white/10 text-xs font-mono text-text-secondary hover:text-white transition-all w-full justify-center font-bold"
                title="Reset Chat Session"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyber-400" />
                <span>CLEAR & RESET SESSION</span>
              </button>
            </div>

          </AnimatedCard>
        </aside>

        {/* =======================================================
            RIGHT WORKSPACE PANE (Enterprise Streaming Console)
            ======================================================= */}
        <AnimatedCard
          delay={0.2}
          className="flex-1 flex flex-col overflow-hidden relative min-h-[520px] animate-border-continuous"
          aria-label="Streaming Conversational Console"
        >
          {/* Top Console Status Bar */}
          <div className="px-6 py-4 border-b border-border/80 bg-obsidian-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-obsidian-900 border border-cyber-500/30 text-xs font-mono text-cyber-400 font-bold">
                <Terminal className="w-3.5 h-3.5" />
                <span>STREAM CONSOLE</span>
              </div>
              <span className="text-xs font-mono text-text-muted hidden md:inline font-bold">
                ENCRYPTED SSL • GROQ LLAMA 3.3 & GEMINI AI ENGINE
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-text-muted font-bold">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> ECI ART. 326 COMPLIANT
              </span>
            </div>
          </div>

          {/* Message Stream Area */}
          <div 
            ref={chatScrollRef}
            className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-6 scroll-smooth" 
            role="list"
          >
            {messages.map((m, idx) => (
              <MessageBubble key={m.id} msg={m} index={idx} onCopy={handleCopy} onQuickQuery={sendMessage} />
            ))}

            {isLoading && <TypingIndicator />}

            {error && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400 flex items-center gap-3 animate-fade-in">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                <span>Error connecting to AI service: {error}</span>
              </div>
            )}
          </div>

          {/* Input Command Dock */}
          <div className="p-4 sm:p-6 border-t border-border/80 bg-obsidian-950/90">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="relative flex items-end gap-2 bg-obsidian-900 border border-white/15 focus-within:border-cyber-500 rounded-2xl p-2 sm:p-3 shadow-inner transition-all">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask any question about voter registration, EVMs, rights, or booth procedures..."
                  disabled={isLoading}
                  rows={2}
                  className="w-full bg-transparent border-none text-obsidian-950 dark:text-white text-sm focus:outline-none resize-none px-2 py-1 leading-relaxed placeholder:text-text-muted"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send Query to Voter Mitra"
                  className="flex-shrink-0 py-2.5 px-5 rounded-xl bg-gradient-to-r from-primary-600 to-cyber-600 hover:from-primary-500 hover:to-cyber-500 disabled:opacity-40 text-white font-display font-bold text-xs flex items-center gap-2 shadow-command-glow transition-all"
                >
                  <span>SEND</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-text-muted px-2">
                <span>Press <kbd className="px-1.5 py-0.5 rounded bg-obsidian-900 border border-white/10 text-white font-bold">Enter ↵</kbd> to submit • <kbd className="px-1.5 py-0.5 rounded bg-obsidian-900 border border-white/10 text-white font-bold">Shift + Enter</kbd> for newline</span>
                <span className="text-cyber-400 font-bold hidden sm:inline">24/7 Autonomous ECI Guidance</span>
              </div>
            </form>
          </div>

        </AnimatedCard>

      </div>
    </main>
  );
}
