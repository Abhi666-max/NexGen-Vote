/**
 * src/services/gemini.ts
 * Dual-Engine Inference Wrapper (Groq + Gemini AI) for Voter Mitra Assistant.
 */

const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY || "";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

export interface GeminiMessage {
  role: "user" | "model" | "assistant" | "system";
  parts?: { text: string }[];
  content?: string;
}

export interface GeminiResponse {
  answer: string;
  error?: string;
  engine?: string;
}

const SYSTEM_PROMPT = `You are "Voter Mitra", an expert AI civic assistant for the NexGen Vote platform.
Your purpose is to educate Indian citizens about:
- Voter registration and EPIC cards
- The election process and schedule
- How Electronic Voting Machines (EVMs) and VVPAT work
- Voter rights and responsibilities
- Polling booth procedures

Always be accurate, friendly, and concise. Respond in the user's language if possible.
Do NOT discuss political parties or candidates. Stay neutral and factual at all times.`;

export async function askVoterMitra(messages: GeminiMessage[]): Promise<GeminiResponse> {
  /* 1. Try Groq API first */
  if (GROQ_API_KEY) {
    try {
      const groqMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({
          role: m.role === "model" ? "assistant" : m.role === "system" ? "system" : "user",
          content: m.parts?.[0]?.text ?? m.content ?? "",
        })),
      ];

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: groqMessages,
          temperature: 0.6,
          max_tokens: 1024,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const answer = data?.choices?.[0]?.message?.content;
        if (answer) return { answer, engine: "groq" };
      }
    } catch {
      /* fallback to gemini */
    }
  }

  /* 2. Try Gemini API */
  if (GEMINI_API_KEY) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: messages.map((m) => ({
            role: m.role === "model" ? "model" : "user",
            parts: [{ text: m.parts?.[0]?.text ?? m.content ?? "" }],
          })),
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (answer) return { answer, engine: "gemini" };
      }
    } catch {
      /* fallback to local error */
    }
  }

  return { answer: "I am ready to assist you! Please query via the Voter Mitra Copilot interface.", error: undefined };
}
