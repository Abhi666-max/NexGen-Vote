/**
 * src/app/api/chat/route.ts
 * Voter Mitra — AI Civic Intelligence Chat API Route
 * Primary Engine: Groq (Llama 3.3 70B Versatile) | Secondary Engine: Google Gemini
 */

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

/* ── System Persona ── */
const SYSTEM_PROMPT = `You are "Voter Mitra" (meaning "Voter's Friend"), an expert, friendly, and encouraging AI civic copilot for the Indian Election Process, trained on Election Commission of India (ECI) regulations and constitutional voting law (Article 326).

Your purpose:
- Help first-time voters understand how to register and vote step-by-step
- Explain clearly how Electronic Voting Machines (EVMs) and VVPAT work technically and cryptographically
- Guide citizens on how to get, download, or verify their Voter ID (EPIC card) and Electoral Roll status
- Bust myths about EVMs and the Indian election process with exact ECI statutory facts
- Clearly explain voter rights at the polling booth, challenged votes, tendered votes, and NOTA provisions

Your tone and style:
- Friendly, warm, encouraging, and authoritative — concise and crystal clear
- Keep answers structured with short paragraphs and bullet points for easy readability
- Use relevant emojis sparingly to make answers engaging (🗳️, 🇮🇳, ✅, 🛡️)
- Always reference the Election Commission of India (ECI) guidelines or constitutional articles where applicable

STRICT RULES:
- Never discuss political parties, individual political candidates, or endorse any political ideology
- Stay 100% neutral, objective, and factual at all times
- Keep responses focused, practical, and highly informative (` + "`" + `max 300 words` + "`" + ` unless detailed explanation requested)`;

interface ChatMessage {
  role: "user" | "model" | "assistant" | "system";
  parts?: { text: string }[];
  content?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages }: { messages: ChatMessage[] } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid request: 'messages' array is required." }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const userText = lastMessage?.parts?.[0]?.text ?? lastMessage?.content ?? "";

    if (!userText.trim()) {
      return NextResponse.json({ error: "Message text cannot be empty." }, { status: 400 });
    }

    /* ── 1. Primary Engine: Groq API (Llama 3.3 70B Versatile) ── */
    const groqApiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;
    if (groqApiKey) {
      try {
        const groqMessages = [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m) => ({
            role: m.role === "model" ? "assistant" : m.role === "system" ? "system" : "user",
            content: m.parts?.[0]?.text ?? m.content ?? "",
          })),
        ];

        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: groqMessages,
            temperature: 0.6,
            max_tokens: 1024,
            top_p: 0.95,
          }),
        });

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          const replyText = groqData?.choices?.[0]?.message?.content;
          if (replyText) {
            return NextResponse.json({ reply: replyText, engine: "groq-llama-3.3-70b" }, { status: 200 });
          }
        } else {
          const errBody = await groqRes.text();
          console.warn("[Voter Mitra Groq API Fallback]", groqRes.status, errBody);
        }
      } catch (groqErr) {
        console.warn("[Voter Mitra Groq API Error - Falling back to Gemini]", groqErr);
      }
    }

    /* ── 2. Secondary Engine: Google Gemini API (Dual SDK + Direct REST Fallback) ── */
    const geminiApiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    if (geminiApiKey) {
      try {
        /* Try via official SDK first */
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: SYSTEM_PROMPT,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        });

        const allExceptLast = messages.slice(0, -1);
        const firstUserIdx = allExceptLast.findIndex((m) => m.role === "user");
        const history = firstUserIdx === -1 ? [] : allExceptLast.slice(firstUserIdx).map((m) => ({
          role: m.role === "model" ? "model" : "user",
          parts: [{ text: m.parts?.[0]?.text ?? m.content ?? "" }],
        }));

        const chat = model.startChat({ history: history as any });
        const result = await chat.sendMessage(userText);
        const responseText = result.response.text();
        return NextResponse.json({ reply: responseText, engine: "gemini-1.5-flash" }, { status: 200 });
      } catch (geminiSdkErr) {
        console.warn("[Voter Mitra Gemini SDK Error - Trying direct REST API]", geminiSdkErr);
        /* Try direct REST API fallback across Gemini 1.5 & 2.0 */
        try {
          const restRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
              contents: messages.map((m) => ({
                role: m.role === "model" ? "model" : "user",
                parts: [{ text: m.parts?.[0]?.text ?? m.content ?? "" }],
              })),
              generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
            }),
          });
          if (restRes.ok) {
            const restData = await restRes.json();
            const replyText = restData?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (replyText) {
              return NextResponse.json({ reply: replyText, engine: "gemini-1.5-flash-rest" }, { status: 200 });
            }
          }
        } catch (restErr) {
          console.warn("[Voter Mitra Gemini REST Error]", restErr);
        }
      }
    }

    /* ── 3. High-Reliability Local Verified ECI Intelligence (If both APIs offline) ── */
    const lowerText = userText.toLowerCase();
    let fallbackReply = "Namaste! 🙏 I am your **Voter Mitra AI Copilot**.\n\nTo ensure complete accuracy during network adjustments, here is verified ECI guidance on common voter topics:\n\n• **Voter Registration:** Register online at [eci.gov.in](https://eci.gov.in) by submitting **Form 6** along with your address and age proof.\n• **EVM Security:** Indian EVMs use standalone One-Time Programmable (OTP) microchips. They have zero Wi-Fi, Bluetooth, or internet connections and are 100% immune to remote hacking.\n• **VVPAT Protocol:** Every vote produces an illuminated physical slip inside the VVPAT window for exactly 7 seconds before dropping into a sealed drop-box.\n• **Booth Rights:** If you don't have your EPIC card, you can still vote by showing any of the 12 approved photo IDs (Aadhaar, Passport, PAN, Driving License) provided your name is on the Electoral Roll.\n\nFor urgent live updates, please check the official ECI portal or Voter Helpline app!";

    if (lowerText.includes("register") || lowerText.includes("enroll") || lowerText.includes("form 6")) {
      fallbackReply = "### 🇮🇳 Step-by-Step Voter Registration Guide (Form 6)\n\n1. **Visit ECI Portal:** Go to [voters.eci.gov.in](https://voters.eci.gov.in) or download the **Voter Helpline App**.\n2. **Select Form 6:** Choose **Form 6** for registration of new voters.\n3. **Provide Personal Details:** Fill in your name, date of birth, and residential address.\n4. **Upload Verification Docs:** Attach a passport-size photo, proof of age (Birth Certificate, Aadhaar, 10th Marksheet), and proof of address.\n5. **Submit & Track:** Once submitted, you will receive a reference ID to track your BLO verification and EPIC card delivery.";
    } else if (lowerText.includes("evm") || lowerText.includes("hack") || lowerText.includes("security")) {
      fallbackReply = "### 🛡️ Why Indian EVMs Cannot Be Hacked\n\n1. **Zero Wireless Connectivity:** EVMs have NO Wi-Fi, Bluetooth, cellular modem, or USB network interfaces. They are physically isolated standalone hardware units.\n2. **OTP Microchip Architecture:** The software in the Control Unit is burnt into One-Time Programmable (OTP) silicon chips during manufacturing by BEL/ECIL. It cannot be altered, overwritten, or updated.\n3. **Cryptographic VVPAT Trail:** Every single vote cast on the Ballot Unit is physically printed and displayed to the voter for 7 seconds through the VVPAT window before dropping into a sealed vault.\n4. **Multi-Party Mock Polls:** Before voting starts on election morning, presiding officers conduct a mandatory mock poll with at least 50 votes in front of all political party polling agents.";
    } else if (lowerText.includes("nota") || lowerText.includes("none of the above")) {
      fallbackReply = "### 🗳️ NOTA (None of the Above) Legal Framework\n\n• **Constitutional Secrecy:** NOTA allows electors who do not wish to vote for any contesting candidate to exercise their democratic right of rejection while maintaining absolute ballot secrecy (Supreme Court PUCL verdict, 2013).\n• **Ballot Placement:** NOTA is always positioned as the final pink button on the EVM Ballot Unit.\n• **Counting Rules:** NOTA votes are tabulated cleanly in the official results and ECI Form 20, ensuring transparent accounting of citizen sentiment.";
    }

    return NextResponse.json({ reply: fallbackReply, engine: "local-eci-kb" }, { status: 200 });

  } catch (err: unknown) {
    console.error("[Voter Mitra Fatal Error]", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
