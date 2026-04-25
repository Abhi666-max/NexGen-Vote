"use client";

/**
 * Voter Mitra AI — Gemini-powered Chat Interface
 * Developed and Architected by Abhijeet Kangane
 * NexGen Vote — Election Education Platform
 */

import { useState, useRef, useEffect, useCallback, type FormEvent, type KeyboardEvent } from "react";

/* ── Types ── */
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

/* ── Suggested starter questions ── */
const SUGGESTIONS = [
  "How do I register to vote? 📋",
  "How does an EVM work? 🗳️",
  "What documents do I need at the polling booth?",
  "Can EVMs be hacked? 🔒",
  "How do I find my polling booth? 📍",
  "What is NOTA and when do I use it?",
];

/* ── Unique ID generator ── */
const uid = () => Math.random().toString(36).slice(2, 9);

/* ── Format timestamp ── */
function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

/* ═══════════════════════════════════════════════════
   MESSAGE BUBBLE
═══════════════════════════════════════════════════ */
function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div
      className={`flex items-end gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} animate-slide-up`}
      role="listitem"
      aria-label={`${isUser ? "Your message" : "Voter Mitra response"} at ${formatTime(msg.timestamp)}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, var(--color-primary), hsl(240,70%,58%))" }}
          aria-hidden="true"
        >
          🤖
        </div>
      )}

      {/* Bubble */}
      <div className={`flex flex-col gap-1 max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className="px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words"
          style={
            isUser
              ? {
                  background: "linear-gradient(135deg, var(--color-primary), hsl(240,70%,58%))",
                  color: "#fff",
                  borderBottomRightRadius: "4px",
                }
              : {
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                  borderBottomLeftRadius: "4px",
                }
          }
        >
          {msg.text}
        </div>
        <span className="text-xs px-1" style={{ color: "var(--color-text-muted)" }}>
          {formatTime(msg.timestamp)}
        </span>
      </div>

      {/* User avatar */}
      {isUser && (
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, var(--color-accent), hsl(38,90%,54%))" }}
          aria-hidden="true"
        >
          👤
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TYPING INDICATOR
═══════════════════════════════════════════════════ */
function TypingIndicator() {
  return (
    <div className="flex items-end gap-3" role="status" aria-live="polite" aria-label="Voter Mitra is typing">
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
        style={{ background: "linear-gradient(135deg, var(--color-primary), hsl(240,70%,58%))" }}
        aria-hidden="true"
      >
        🤖
      </div>
      <div
        className="px-4 py-3 rounded-2xl flex items-center gap-1.5"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-subtle)",
          borderBottomLeftRadius: "4px",
        }}
        aria-hidden="true"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              background: "var(--color-primary)",
              animationDelay: `${i * 0.15}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE COMPONENT
═══════════════════════════════════════════════════ */
export default function VoterMitraPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uid(),
      role: "model",
      text: "Namaste! 🙏 I'm Voter Mitra — your friendly guide to the Indian election process!\n\nAsk me anything about:\n• How to register to vote 📋\n• How EVMs and VVPAT work 🗳️\n• Finding your polling booth 📍\n• Your rights as a voter ⚖️\n\nI'm here to make democracy easy to understand! 🇮🇳",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /* Auto-scroll to bottom */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /* Send message handler */
  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    setInput("");

    /* Add user message to local state */
    const userMsg: Message = { id: uid(), role: "user", text: trimmed, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      /* Build API history — ONLY actual user/model exchanges (skip the initial welcome) */
      const allMsgs = [...messages, userMsg];

      // Find first real user message index — Gemini requires history starts with 'user'
      const firstUserIdx = allMsgs.findIndex((m) => m.role === "user");
      const apiMessages: ApiMessage[] = allMsgs
        .slice(firstUserIdx) // drop any leading model messages (the welcome greeting)
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
          text: "⚠️ I'm having trouble connecting right now. Please try again in a moment.",
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

  return (
    <main
      id="main-content"
      role="main"
      aria-labelledby="voter-mitra-heading"
      className="flex flex-col"
      style={{ height: "calc(100dvh - 64px)" }}
    >
      {/* ── Two-column layout (sidebar + chat) ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT SIDEBAR ── */}
        <aside
          className="hidden lg:flex flex-col w-72 xl:w-80 border-r p-6 gap-6 overflow-y-auto flex-shrink-0"
          style={{
            borderColor: "var(--color-border-subtle)",
            background: "var(--color-bg-secondary)",
          }}
          aria-label="Voter Mitra sidebar — about and suggested questions"
        >
          {/* Branding */}
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg"
              style={{ background: "linear-gradient(135deg, var(--color-primary), hsl(240,70%,58%))" }}
              aria-hidden="true"
            >
              🤖
            </div>
            <h1
              id="voter-mitra-heading"
              className="font-display font-bold text-xl gradient-text mb-1"
            >
              Voter Mitra AI
            </h1>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              Powered by Google Gemini 1.5 Flash
            </p>
          </div>

          {/* Status badge */}
          <div
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium"
            style={{
              background: "hsl(142,70%,40%,0.1)",
              border: "1px solid hsl(142,70%,40%,0.2)",
              color: "var(--color-success)",
            }}
            role="status"
            aria-label="Voter Mitra AI is online"
          >
            <span className="w-2 h-2 rounded-full animate-pulse-soft" style={{ background: "var(--color-success)" }} aria-hidden="true" />
            AI Online — Ready to Help
          </div>

          {/* Suggested questions */}
          <div>
            <h2
              className="font-display font-semibold text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--color-text-muted)" }}
            >
              Try asking
            </h2>
            <nav aria-label="Suggested questions for Voter Mitra">
              <ul className="flex flex-col gap-2" role="list">
                {SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => sendMessage(s)}
                      disabled={isLoading}
                      aria-label={`Ask: ${s}`}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs leading-snug transition-all duration-200 focus-ring"
                      style={{
                        background: "var(--color-bg-tertiary)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text-secondary)",
                        cursor: isLoading ? "not-allowed" : "pointer",
                        opacity: isLoading ? 0.5 : 1,
                      }}
                      onMouseEnter={(e) => { if (!isLoading) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-primary)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)"; }}
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Info note */}
          <div
            className="mt-auto p-3 rounded-xl text-xs leading-relaxed"
            style={{
              background: "hsl(220,75%,48%,0.06)",
              border: "1px solid hsl(220,75%,48%,0.12)",
              color: "var(--color-text-muted)",
            }}
            role="note"
            aria-label="Information note about Voter Mitra"
          >
            ℹ️ Voter Mitra only answers questions about Indian elections and voting. For official info, visit{" "}
            <a
              href="https://eci.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Election Commission of India website (opens in new tab)"
              style={{ color: "var(--color-primary)" }}
            >
              eci.gov.in
            </a>
          </div>
        </aside>

        {/* ── MAIN CHAT AREA ── */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* Chat header (mobile only) */}
          <div
            className="lg:hidden flex items-center gap-3 px-4 py-3 border-b flex-shrink-0"
            style={{
              borderColor: "var(--color-border-subtle)",
              background: "var(--color-bg-secondary)",
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
              style={{ background: "linear-gradient(135deg, var(--color-primary), hsl(240,70%,58%))" }}
              aria-hidden="true"
            >
              🤖
            </div>
            <div>
              <p className="font-display font-bold text-sm" style={{ color: "var(--color-text-primary)" }}>Voter Mitra AI</p>
              <p className="text-xs flex items-center gap-1" style={{ color: "var(--color-success)" }}>
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--color-success)" }} aria-hidden="true" />
                Online
              </p>
            </div>
          </div>

          {/* Messages list */}
          <div
            className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4"
            role="list"
            aria-label="Chat messages with Voter Mitra"
            aria-live="polite"
            aria-atomic="false"
            style={{ background: "var(--color-bg)" }}
          >
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} aria-hidden="true" />
          </div>

          {/* Error banner */}
          {error && (
            <div
              className="mx-4 mb-2 px-4 py-2 rounded-xl text-xs flex items-center gap-2"
              style={{
                background: "hsl(0,72%,50%,0.1)",
                border: "1px solid hsl(0,72%,50%,0.25)",
                color: "var(--color-danger)",
              }}
              role="alert"
              aria-live="assertive"
            >
              ⚠️ {error}
            </div>
          )}

          {/* ── INPUT AREA ── */}
          <div
            className="flex-shrink-0 border-t px-4 py-4"
            style={{
              borderColor: "var(--color-border-subtle)",
              background: "var(--color-bg-secondary)",
            }}
          >
            <form
              onSubmit={handleSubmit}
              aria-label="Send a message to Voter Mitra"
              className="flex items-end gap-3"
            >
              {/* Text input */}
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  id="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Ask Voter Mitra anything about voting..."
                  aria-label="Type your message to Voter Mitra"
                  aria-describedby="chat-hint"
                  aria-multiline="true"
                  disabled={isLoading}
                  className="w-full resize-none rounded-2xl px-4 py-3 text-sm transition-all duration-200 focus-ring"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-primary)",
                    outline: "none",
                    maxHeight: "120px",
                    lineHeight: "1.5",
                    opacity: isLoading ? 0.6 : 1,
                  }}
                  onInput={(e) => {
                    const el = e.currentTarget;
                    el.style.height = "auto";
                    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-primary)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; }}
                />
              </div>

              {/* Send button */}
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label={isLoading ? "Voter Mitra is responding, please wait" : "Send message to Voter Mitra"}
                className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 focus-ring"
                style={{
                  background:
                    isLoading || !input.trim()
                      ? "var(--color-bg-tertiary)"
                      : "linear-gradient(135deg, var(--color-primary), hsl(240,70%,58%))",
                  color: isLoading || !input.trim() ? "var(--color-text-muted)" : "#fff",
                  cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
                  boxShadow: isLoading || !input.trim() ? "none" : "0 4px 12px -2px hsl(220,75%,48%,0.4)",
                }}
              >
                {isLoading ? (
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                )}
              </button>
            </form>

            {/* Keyboard hint + Attribution */}
            <div className="flex items-center justify-between mt-2 px-1">
              <p
                id="chat-hint"
                className="text-xs"
                style={{ color: "var(--color-text-muted)" }}
                aria-live="off"
              >
                Press <kbd className="px-1 py-0.5 rounded text-xs" style={{ background: "var(--color-bg-tertiary)", border: "1px solid var(--color-border)" }}>Enter</kbd> to send · <kbd className="px-1 py-0.5 rounded text-xs" style={{ background: "var(--color-bg-tertiary)", border: "1px solid var(--color-border)" }}>Shift+Enter</kbd> for new line
              </p>

              {/* Mandatory attribution */}
              <p
                className="text-xs font-medium flex items-center gap-1"
                style={{ color: "var(--color-text-muted)" }}
                aria-label="AI Engine crafted by Abhijeet Kangane"
              >
                <span aria-hidden="true">⚡</span>
                AI Engine crafted by{" "}
                <span
                  className="gradient-text font-semibold"
                  aria-hidden="true"
                >
                  Abhijeet Kangane
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
