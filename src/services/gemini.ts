/**
 * services/gemini.ts
 * Wrapper for the Google Gemini AI API (Voter Mitra assistant).
 * Requires: GEMINI_API_KEY in environment variables.
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
const GEMINI_MODEL   = "gemini-2.0-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export interface GeminiMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export interface GeminiResponse {
  answer: string;
  error?: string;
}

const SYSTEM_PROMPT = `You are "Voter Mitra", an expert AI assistant for the NexGen Vote platform.
Your purpose is to educate Indian citizens about:
- Voter registration and EPIC cards
- The election process and schedule
- How Electronic Voting Machines (EVMs) work
- Voter rights and responsibilities
- Polling booth procedures

Always be accurate, friendly, and concise. Respond in the user's language if possible.
Do NOT discuss political parties or candidates. Stay neutral and factual at all times.`;

export async function askVoterMitra(
  messages: GeminiMessage[]
): Promise<GeminiResponse> {
  if (!GEMINI_API_KEY) {
    return { answer: "", error: "GEMINI_API_KEY is not configured." };
  }

  try {
    const res = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT",        threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_HATE_SPEECH",       threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return { answer: "", error: err.error?.message ?? "Gemini API error." };
    }

    const data = await res.json();
    const answer: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response received.";

    return { answer };
  } catch (err) {
    return { answer: "", error: String(err) };
  }
}
