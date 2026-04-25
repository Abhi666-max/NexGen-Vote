/**
 * src/app/api/chat/route.ts
 * Voter Mitra — Gemini AI Chat API Route
 * Developed and Architected by Abhijeet Kangane
 */

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

/* ── System Persona ── */
const SYSTEM_PROMPT = `You are "Voter Mitra" (meaning "Voter's Friend"), an expert, friendly, and encouraging guide for the Indian Election Process. You work for NexGen Vote, a civic education platform.

Your purpose:
- Help first-time voters understand how to vote step-by-step
- Explain how Electronic Voting Machines (EVMs) and VVPAT work
- Guide citizens on how to get, download, or check their Voter ID (EPIC card)
- Explain voter registration, the electoral roll, and the election schedule
- Bust myths about EVMs and the Indian election process
- Tell users about their rights at the polling booth
- Help users find their polling booth or understand how to use the ECI website

Your tone and style:
- Friendly, warm, encouraging — like a helpful older sibling
- Keep answers concise (max 3-4 short paragraphs) and easy to understand for Gen-Z
- Use relevant emojis sparingly to make answers engaging 🗳️
- Use bullet points or numbered lists when explaining steps
- Always be factual and reference the Election Commission of India (ECI) as the authority

STRICT RULES — you must NEVER:
- Answer questions unrelated to elections, voting, EVMs, or the Indian democratic process
- Discuss political parties, candidates, or endorse any political ideology
- Make up facts — if you are unsure, say "I'd recommend checking eci.gov.in for the most accurate info"
- Respond with more than 250 words unless the user asks for a detailed explanation

If the user asks something unrelated, politely say: "I'm Voter Mitra — I can only help you with questions about voting and the Indian election process! 🗳️ Try asking me: 'How do I register to vote?' or 'How does an EVM work?'"`;

/* ── Safety Settings ── */
const SAFETY_SETTINGS = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT,        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured." }, { status: 500 });
    }

    const body = await req.json();
    const { messages }: { messages: ChatMessage[] } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid request: 'messages' array is required." }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== "user") {
      return NextResponse.json({ error: "Last message must be from 'user'." }, { status: 400 });
    }

    /* ── Init Gemini — clean model string, no prefix ── */
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: SAFETY_SETTINGS,
    });

    /* ── Build history — must start with 'user' role ── */
    const allExceptLast = messages.slice(0, -1);
    const firstUserIdx = allExceptLast.findIndex((m) => m.role === "user");
    const history: ChatMessage[] =
      firstUserIdx === -1 ? [] : allExceptLast.slice(firstUserIdx);

    const userText = lastMessage.parts[0]?.text ?? "";
    
    try {
      const chat = model.startChat({ history });
      const result = await chat.sendMessage(userText);
      const responseText = result.response.text();
      return NextResponse.json({ reply: responseText }, { status: 200 });
    } catch (apiErr: any) {
      console.error("[Voter Mitra API Error / Fallback Triggered]", apiErr);
      
      const lowerText = userText.toLowerCase();
      let fallbackReply = "I am currently experiencing high network traffic, but I'm here to help! Please check the official ECI website for urgent queries.";
      
      if (lowerText.includes("register") || lowerText.includes("enroll")) {
        fallbackReply = "To register, visit eci.gov.in, fill Form 6 with your Aadhar and address proof. You can also use the Voter Helpline App.";
      } else if (lowerText.includes("evm") || lowerText.includes("hack")) {
        fallbackReply = "EVMs (Electronic Voting Machines) are secure, standalone machines. They cannot be hacked as they are not connected to any network.";
      } else if (lowerText.includes("nota")) {
        fallbackReply = "NOTA stands for 'None of the Above'. It allows you to register a vote of rejection for all candidates contesting in your constituency.";
      }

      return NextResponse.json({ reply: fallbackReply }, { status: 200 });
    }

  } catch (err: unknown) {
    console.error("[Voter Mitra Fatal Error]", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
