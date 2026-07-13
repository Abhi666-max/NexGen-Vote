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

    /* ── 3. High-Reliability Local Verified ECI Intelligence (Dynamic Knowledge Base) ── */
    const lowerText = userText.toLowerCase();
    let fallbackReply = "";

    if (lowerText.includes("pm") || lowerText.includes("prime minister") || lowerText.includes("modi")) {
      fallbackReply = "### Prime Minister of India & Election Constitutional Framework\n\n• **Current Prime Minister:** Shri Narendra Modi (assuming office following the general elections conducted by the Election Commission of India).\n• **Constitutional Appointment:** Under **Article 75** of the Constitution of India, the Prime Minister is appointed by the President after the political party or coalition secures a majority of seats in the Lok Sabha (House of the People).\n• **Lok Sabha Election Process:** Citizens vote directly for Member of Parliament (MP) candidates across **543 parliamentary constituencies** using Electronic Voting Machines (EVMs) and VVPAT verification.";
    } else if (lowerText.includes("president") || lowerText.includes("murmu")) {
      fallbackReply = "### President of India & Electoral College Process\n\n• **Current President:** Smt. Droupadi Murmu.\n• **Constitutional Election:** Under **Article 54**, the President is elected indirectly by an Electoral College consisting of elected members of both Houses of Parliament (Lok Sabha & Rajya Sabha) and elected MLAs of all State Legislative Assemblies.\n• **Secret Ballot Mechanism:** The presidential election is conducted using a proportional representation system by means of a single transferable vote via secret paper ballot.";
    } else if (lowerText.includes("cec") || lowerText.includes("commissioner") || lowerText.includes("rajiv kumar")) {
      fallbackReply = "### Election Commission of India (ECI) Leadership\n\n• **Chief Election Commissioner (CEC):** Shri Rajiv Kumar heads the Election Commission of India.\n• **Constitutional Authority:** Established under **Article 324** of the Constitution of India, the ECI is an autonomous constitutional authority responsible for administering union and state election processes across all states and union territories.\n• **Mandate:** Conduct free, fair, and impartial general elections for the Lok Sabha, Rajya Sabha, State Assemblies, and the offices of President and Vice-President.";
    } else if (lowerText.includes("register") || lowerText.includes("enroll") || lowerText.includes("form 6") || lowerText.includes("how to vote")) {
      fallbackReply = "### Step-by-Step Voter Registration Guide (Form 6)\n\n1. **Visit ECI Portal:** Go to [voters.eci.gov.in](https://voters.eci.gov.in) or download the official **Voter Helpline App**.\n2. **Select Form 6:** Choose **Form 6** for registration of new voters.\n3. **Provide Personal Details:** Enter your full legal name, date of birth, and permanent residential address.\n4. **Attach Statutory Proofs:** Upload a recent passport-size photo, valid age verification (Aadhaar, Birth Certificate, 10th Marksheet), and address proof.\n5. **BLO Verification:** Once submitted, your application is assigned a unique reference number to track online until your Electoral Photo Identity Card (EPIC) is dispatched.";
    } else if (lowerText.includes("evm") || lowerText.includes("hack") || lowerText.includes("security") || lowerText.includes("tamper")) {
      fallbackReply = "### Why Indian EVMs Are Immune to Hacking\n\n1. **Air-Gapped Standalone Units:** Indian EVMs have zero wireless connectivity (no Wi-Fi, Bluetooth, cellular radio, or internet ports). They cannot be accessed remotely.\n2. **One-Time Programmable (OTP) Silicon:** The firmware inside the Control Unit is permanently burned into OTP microcontrollers by government-owned defense contractors (BEL & ECIL) during chip fabrication.\n3. **Physical VVPAT Verification:** Every vote cast generates an illuminated paper slip inside the VVPAT window for exactly 7 seconds before dropping into a sealed drop-box.\n4. **Mandatory Mock Polls:** On election morning, presiding officers conduct a mandatory 50-vote mock poll in front of polling agents from all political parties before clearing and sealing the units.";
    } else if (lowerText.includes("id") || lowerText.includes("epic") || lowerText.includes("document") || lowerText.includes("without voter id")) {
      fallbackReply = "### 12 Statutory Alternative Photo IDs at Polling Booths\n\nIf your name is registered on the active **Electoral Roll** but you do not have your physical EPIC card with you, you can show any of the following 12 government-approved photo IDs to cast your vote:\n\n• **Aadhaar Card**\n• **Indian Passport**\n• **PAN Card**\n• **Driving License**\n• **MGNREGA Job Card**\n• **Passbooks with Photo** (issued by Bank/Post Office)\n• **Health Insurance Smart Card** (Ministry of Labour)\n• **Pension Document with Photo**\n• **Service Identity Card** (Central/State Govt or PSUs)\n• **Official Identity Card** (MPs/MLAs/MLCs)\n• **Smart Card** (issued by RGI under NPR)\n• **Unique Disability ID (UDID) Card**";
    } else if (lowerText.includes("nota") || lowerText.includes("none of the above")) {
      fallbackReply = "### NOTA (None of the Above) Statutory Framework\n\n• **Citizen Right to Rejection:** Introduced following the landmark Supreme Court PUCL verdict (2013), NOTA empowers electors to reject all contesting candidates while preserving absolute ballot secrecy.\n• **EVM Placement:** The NOTA button is prominently positioned as the final pink button on the Ballot Unit.\n• **Official Tabulation:** NOTA votes are counted and recorded separately in Form 20, ensuring transparent public disclosure of voter dissatisfaction.";
    } else if (lowerText.includes("age") || lowerText.includes("18") || lowerText.includes("eligibility")) {
      fallbackReply = "### Article 326 & Voting Eligibility Criteria\n\n• **Universal Adult Suffrage:** Under **Article 326** of the Constitution of India, every Indian citizen who is not less than **18 years of age** on the qualifying date (January 1st, April 1st, July 1st, or October 1st) is entitled to register as a voter.\n• **61st Constitutional Amendment:** The voting age in India was officially reduced from 21 years to 18 years by the 61st Constitutional Amendment Act in 1988.\n• **Zero Discrimination:** Suffrage is universal without discrimination based on religion, race, caste, sex, or place of birth.";
    } else if (lowerText.includes("seat") || lowerText.includes("constituency") || lowerText.includes("lok sabha") || lowerText.includes("mp") || lowerText.includes("parliament")) {
      fallbackReply = "### Indian Parliamentary & Constituency Structure\n\n• **Lok Sabha (House of the People):** Consists of **543 parliamentary constituencies** directly elected by the citizens of India across states and union territories for a 5-year term.\n• **Rajya Sabha (Council of States):** Consists of up to 250 members elected indirectly by the elected members of State Legislative Assemblies (`MLAs`).\n• **Delimitation Commission:** Parliamentary and Assembly constituencies are demarcated by an independent Delimitation Commission based on census population metrics.";
    } else {
      fallbackReply = `### Verified ECI Guidance & Response\n\nYou asked regarding: **"${userText}"**\n\nTo ensure complete accuracy under statutory ECI guidelines, here is essential constitutional & electoral information:\n\n• **Voter Enrollment:** Citizen registration is available 24/7 via **Form 6** on the official [voters.eci.gov.in](https://voters.eci.gov.in) portal.\n• **Polling Booth Verification:** Ensure your name appears on the active **Electoral Roll** prior to election day. Carry your EPIC card or any of the 12 statutory photo identity cards.\n• **EVM & VVPAT Transparency:** Indian voting infrastructure relies exclusively on air-gapped, standalone One-Time Programmable (` + "`OTP`" + `) silicon chips with 100% verifiable physical paper trails.\n\nFor real-time notifications or specific status checks, please visit the official Election Commission of India portal at **eci.gov.in**!`;
    }

    return NextResponse.json({ reply: fallbackReply, engine: "local-eci-kb" }, { status: 200 });

  } catch (err: unknown) {
    console.error("[Voter Mitra Fatal Error]", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
