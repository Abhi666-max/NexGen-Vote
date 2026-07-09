"use client";

/**
 * AI Voter Mitra Copilot — NexGen Civic OS
 * Architected by Abhijeet Kangane
 * Enterprise Dual-Pane Conversational Civic Intelligence Command Center
 */

import { useState, useRef, useEffect, useCallback, type FormEvent, type KeyboardEvent } from "react";
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

const uid = () => Math.random().toString(36).slice(2, 9);
function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

/* ========================================================
   MESSAGE BUBBLE COMPONENT (Enterprise Formatted Card)
   ======================================================== */
function MessageBubble({ msg, onCopy }: { msg: Message; onCopy: (text: string) => void }) {
  const [copied, setCopied] = useState(false);
  const isUser = msg.role === "user";

  const handleCopy = () => {
    onCopy(msg.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex items-start gap-3.5 ${isUser ? "flex-row-reverse" : "flex-row"} animate-slide-up w-full`}
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
      <div className={`flex flex-col gap-1.5 max-w-[85%] sm:max-w-[78%] ${isUser ? "items-end" : "items-start"}`}>
        
        {/* Header Tag */}
        <div className="flex items-center gap-2 px-1">
          <span className="text-xs font-mono font-bold text-text-secondary">
            {isUser ? "CITIZEN QUERY" : "VOTER MITRA AI v2.0"}
          </span>
          <span className="text-[10px] font-mono text-text-muted">{formatTime(msg.timestamp)}</span>
        </div>

        {/* Bubble Surface */}
        <div
          className={`p-4 sm:p-5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words relative group ${
            isUser
              ? "bg-primary-600 text-white rounded-tr-sm shadow-md border border-primary-400/30"
              : "glass-card bg-surface dark:bg-obsidian-900 text-obsidian-950 dark:text-white rounded-tl-sm border border-border/80 shadow-sm"
          }`}
        >
          {msg.text}

          {/* Model Footer Actions */}
          {!isUser && (
            <div className="mt-4 pt-3 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-text-muted">
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
}

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
      id: uid(),
      role: "model",
      text: "Namaste! 🙏 Welcome to the **Voter Mitra AI Civic Intelligence Copilot**.\n\nI am autonomously powered by high-speed **Groq Llama 3.3 70B** and **Gemini 2.0**, trained on Election Commission of India (ECI) guidelines, constitutional voting law (Article 326), and EVM/VVPAT hardware specifications.\n\n**Select a query from the left workspace, or type your exact question below:**\n1. How do I register to vote online using Form 6?\n2. Why is the EVM standalone chip immune to hacking?\n3. How can I check my polling booth credentials?",
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
            {messages.map((m) => (
              <MessageBubble key={m.id} msg={m} onCopy={handleCopy} />
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
