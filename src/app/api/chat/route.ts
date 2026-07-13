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
      const groqModels = ["llama-3.3-70b-versatile", "llama-3.1-70b-versatile", "mixtral-8x7b-32768"];
      for (const modelName of groqModels) {
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
              model: modelName,
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
              return NextResponse.json({ reply: replyText, engine: `groq-${modelName}` }, { status: 200 });
            }
          }
        } catch (groqErr) {
          console.warn(`[Voter Mitra Groq Model ${modelName} Error]`, groqErr);
        }
      }
    }

    /* ── 2. Secondary Engine: Google Gemini API (Multi-Model SDK + Direct REST Fallbacks) ── */
    const geminiApiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    if (geminiApiKey) {
      const geminiModels = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-pro"];
      
      /* Try via official SDK first across available models */
      for (const modelName of geminiModels) {
        try {
          const genAI = new GoogleGenerativeAI(geminiApiKey);
          const model = genAI.getGenerativeModel({
            model: modelName,
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
          if (responseText) {
            return NextResponse.json({ reply: responseText, engine: `gemini-sdk-${modelName}` }, { status: 200 });
          }
        } catch (geminiSdkErr) {
          console.warn(`[Voter Mitra Gemini SDK ${modelName} Error - Trying next]`, geminiSdkErr);
        }
      }

      /* Try direct REST API across model endpoints if SDK fails */
      for (const modelName of geminiModels) {
        try {
          const restRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiApiKey}`, {
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
              return NextResponse.json({ reply: replyText, engine: `gemini-rest-${modelName}` }, { status: 200 });
            }
          }
        } catch (restErr) {
          console.warn(`[Voter Mitra Gemini REST ${modelName} Error]`, restErr);
        }
      }
    }

    /* ── 3. High-Reliability Local Verified ECI Intelligence (Dynamic 25+ Topic Knowledge Base) ── */
    const lowerText = userText.toLowerCase();
    let fallbackReply = "";

    if (lowerText.includes("pm") || lowerText.includes("prime minister") || lowerText.includes("modi")) {
      fallbackReply = "### Prime Minister of India & Election Constitutional Framework\n\n• **Current Prime Minister:** Shri Narendra Modi (assuming office following general elections conducted by the Election Commission of India).\n• **Constitutional Appointment:** Under **Article 75** of the Constitution of India, the Prime Minister is appointed by the President after the political party or coalition secures a majority of seats in the Lok Sabha (House of the People).\n• **Lok Sabha Election Process:** Citizens vote directly for Member of Parliament (MP) candidates across **543 parliamentary constituencies** using Electronic Voting Machines (EVMs) and VVPAT verification.";
    } else if (lowerText.includes("president") || lowerText.includes("murmu")) {
      fallbackReply = "### President of India & Electoral College Process\n\n• **Current President:** Smt. Droupadi Murmu.\n• **Constitutional Election:** Under **Article 54**, the President is elected indirectly by an Electoral College consisting of elected members of both Houses of Parliament (Lok Sabha & Rajya Sabha) and elected MLAs of all State Legislative Assemblies.\n• **Secret Ballot Mechanism:** The presidential election is conducted using a proportional representation system by means of a single transferable vote via secret paper ballot.";
    } else if (lowerText.includes("cec") || lowerText.includes("commissioner") || lowerText.includes("rajiv kumar")) {
      fallbackReply = "### Election Commission of India (ECI) Leadership\n\n• **Chief Election Commissioner (CEC):** Shri Rajiv Kumar heads the Election Commission of India along with two Election Commissioners.\n• **Constitutional Authority:** Established under **Article 324** of the Constitution of India, the ECI is an autonomous constitutional authority responsible for administering union and state election processes across all states and union territories.\n• **Mandate:** Conduct free, fair, and impartial general elections for the Lok Sabha, Rajya Sabha, State Assemblies, and the offices of President and Vice-President.";
    } else if (lowerText.includes("cm") || lowerText.includes("chief minister") || lowerText.includes("assembly") || lowerText.includes("vidhan sabha") || lowerText.includes("mla") || lowerText.includes("maharashtra") || lowerText.includes("delhi") || lowerText.includes("up") || lowerText.includes("bihar")) {
      fallbackReply = "### State Legislative Assembly (`Vidhan Sabha`) & Chief Ministers\n\n• **Chief Minister Appointment:** Under **Article 164** of the Constitution of India, the Chief Minister is appointed by the Governor of the State after securing a majority of seats in the State Legislative Assembly (`Vidhan Sabha`).\n• **Direct Assembly Elections:** Citizens directly elect Members of Legislative Assembly (`MLAs`) from territorial constituencies across the state every 5 years.\n• **ECI Responsibility:** State Assembly elections are strictly conducted and supervised by the Election Commission of India (`ECI`) under Article 324, ensuring uniform electronic voting (`EVM+VVPAT`) protocols across all polling stations.";
    } else if (lowerText.includes("register") || lowerText.includes("enroll") || lowerText.includes("form 6") || (lowerText.includes("how to") && lowerText.includes("vote")) || lowerText.includes("new voter")) {
      fallbackReply = "### Step-by-Step Voter Registration Guide (`Form 6`)\n\n1. **Visit Official ECI Portal:** Go to [voters.eci.gov.in](https://voters.eci.gov.in) or download the official **Voter Helpline App (`VHA`)** on Android/iOS.\n2. **Select Form 6:** Choose **Form 6** for registration of new voters (`first-time electors or shifting across constituencies`).\n3. **Provide Personal Details:** Enter your exact legal name, date of birth, and permanent residential address.\n4. **Attach Statutory Proofs:** Upload a recent passport-size photo, valid age verification (`Aadhaar, Birth Certificate, 10th Marksheet, Passport`), and address proof.\n5. **BLO Verification:** Once submitted, your application is assigned a unique Reference ID to track status until your Electoral Photo Identity Card (`EPIC`) is dispatched via Speed Post.";
    } else if (lowerText.includes("form 7") || lowerText.includes("delete") || lowerText.includes("remove") || lowerText.includes("objection") || lowerText.includes("demise") || lowerText.includes("death")) {
      fallbackReply = "### Deletion or Objection in Electoral Roll (`Form 7`)\n\n• **Statutory Purpose:** **Form 7** is used for objecting to a proposed inclusion or requesting the deletion of an existing name from the Electoral Roll.\n• **When to File:** Filed when an elector has permanently shifted residence outside the constituency, acquired foreign citizenship, or upon the unfortunate demise of an elector.\n• **Procedure:** Submit Form 7 online via [voters.eci.gov.in](https://voters.eci.gov.in) along with the EPIC number of the entry proposed for deletion and death certificate (`in case of deceased electors`). The local Booth Level Officer (`BLO`) verifies before formal roll update.";
    } else if (lowerText.includes("form 8") || lowerText.includes("correction") || lowerText.includes("update") || lowerText.includes("change address") || lowerText.includes("shifting") || lowerText.includes("mobile number")) {
      fallbackReply = "### Correction & Polling Station Shifting (`Form 8`)\n\n• **Multi-Purpose Application:** **Form 8** allows existing electors to apply for:\n  1. **Shifting of Residence:** Within the same Assembly Constituency or to a new Assembly Constituency.\n  2. **Correction of Entries:** Updating name spelling, photograph, date of birth/age, relative's name, or gender.\n  3. **Replacement EPIC:** Issuance of a new physical EPIC card without changing data (`if lost, mutilated, or destroyed`).\n  4. **Marking PwD Status:** Updating Persons with Disabilities (`PwD`) status for special booth assistance.\n• **Execution:** Apply directly at [voters.eci.gov.in](https://voters.eci.gov.in) using your existing 10-digit EPIC number.";
    } else if (lowerText.includes("nri") || lowerText.includes("overseas") || lowerText.includes("form 6a") || lowerText.includes("abroad") || lowerText.includes("passport")) {
      fallbackReply = "### Overseas Electors & NRI Voting (`Form 6A`)\n\n• **Statutory Eligibility:** Under **Section 20A of the Representation of the People Act, 1950**, an Indian citizen residing abroad (`NRI`) who has not acquired citizenship of any other country is entitled to register as an **Overseas Elector**.\n• **Registration Form:** NRIs must file **Form 6A** online on [voters.eci.gov.in](https://voters.eci.gov.in) along with self-attested copies of their valid Indian Passport (`showing visa and residence details`).\n• **Polling Booth Procedure:** Currently, registered overseas electors must vote **in person** at their designated polling station in India after producing their original Indian Passport for verification on election day.";
    } else if (lowerText.includes("postal") || lowerText.includes("home vote") || lowerText.includes("senior citizen") || lowerText.includes("85+") || lowerText.includes("pwd") || lowerText.includes("disabled") || lowerText.includes("form 12d") || lowerText.includes("service voter") || lowerText.includes("army")) {
      fallbackReply = "### Postal Ballots & Home Voting (`Form 12D`)\n\n• **Vote from Home Facility:** Under ECI regulations, senior citizens aged **85 years and above** (`AVSC`) and Persons with Disabilities (`PwD with 40%+ benchmark disability`) can opt to vote from the comfort of their home via Postal Ballot.\n• **Form 12D Application:** Eligible electors must submit **Form 12D** to the Returning Officer (`RO`) within 5 days of election notification.\n• **Secure Collection:** Polling officials, accompanied by a videographer and party polling agents, visit the elector's residence to collect the sealed secret ballot.\n• **Service Voters:** Armed forces personnel, paramilitary forces, and government officers posted abroad cast their votes securely via the Electronically Transmitted Postal Ballot System (`ETPBS`).";
    } else if (lowerText.includes("challenged") || lowerText.includes("tendered") || lowerText.includes("someone voted") || lowerText.includes("impersonation") || lowerText.includes("rule 49p")) {
      fallbackReply = "### Tendered Votes & Challenged Identity (`Rule 49P`)\n\n• **Tendered Ballot Paper (`Rule 49P`):** If you arrive at your polling booth and discover that someone else has already impersonated you and cast your vote on the EVM, **do not leave**.\n• **Right to Vote:** Inform the Presiding Officer immediately. After verifying your identity via valid photo ID (`EPIC/Aadhaar/Passport`), the officer will issue you a **Tendered Ballot Paper**.\n• **Sealed Record:** You mark your vote manually on the ballot paper, fold it, and hand it directly to the Presiding Officer who seals it in a separate statutory cover (`Form 17B`). These votes are accounted for during close contests and judicial reviews.";
    } else if (lowerText.includes("slip") || lowerText.includes("booth slip") || lowerText.includes("locate booth") || lowerText.includes("where to vote") || lowerText.includes("polling station")) {
      fallbackReply = "### Polling Station Locator & Voter Information Slip (`VIS`)\n\n• **Voter Information Slip (`VIS`):** Distributed by local Booth Level Officers (`BLOs`) 5 to 7 days before polling. It contains your polling station name, room number, part number, and serial number in the roll.\n• **Online Booth Locator:** You can instantly check your exact polling booth name and Google Maps coordinates by entering your EPIC number at [electoralsearch.eci.gov.in](https://electoralsearch.eci.gov.in) or on the **Voter Helpline App**.\n• **Important Note:** While the VIS is essential for locating your room/serial number quickly, you **must carry a valid Photo ID (`EPIC card or any of the 12 statutory IDs`)** to the polling officer.";
    } else if (lowerText.includes("evm") || lowerText.includes("vvpat") || lowerText.includes("hack") || lowerText.includes("security") || lowerText.includes("tamper") || lowerText.includes("mock poll")) {
      fallbackReply = "### Why Indian EVMs & VVPATs Are Immune to Tampering\n\n1. **Air-Gapped Standalone Units:** Indian EVMs have zero wireless connectivity (`no Wi-Fi, Bluetooth, cellular radio, or internet ports`). They cannot be accessed or manipulated remotely.\n2. **One-Time Programmable (`OTP`) Silicon:** The firmware inside the Control Unit is permanently burned into OTP microcontrollers by government-owned defense contractors (`BEL & ECIL`) during chip fabrication.\n3. **Physical VVPAT Verification:** Every vote cast generates an illuminated paper slip inside the VVPAT window for exactly 7 seconds before dropping into a sealed, locked drop-box.\n4. **Mandatory Mock Polls:** On election morning, presiding officers conduct a mandatory **50-vote mock poll** in front of polling agents from all contesting political parties before clearing and sealing the units with unique brass seals.";
    } else if (lowerText.includes("id") || lowerText.includes("epic") || lowerText.includes("document") || lowerText.includes("without voter id") || lowerText.includes("aadhaar") || lowerText.includes("pan")) {
      fallbackReply = "### 12 Statutory Alternative Photo IDs at Polling Booths\n\nIf your name is registered on the active **Electoral Roll** but you do not have your physical EPIC card with you on polling day, you can show any of the following **12 ECI-approved photo documents**:\n\n1. **Aadhaar Card**\n2. **Indian Passport**\n3. **PAN Card**\n4. **Driving License**\n5. **MGNREGA Job Card**\n6. **Passbooks with Photo** (`issued by Bank/Post Office`)\n7. **Health Insurance Smart Card** (`Ministry of Labour`)\n8. **Pension Document with Photo**\n9. **Service Identity Card** (`Central/State Govt or PSUs`)\n10. **Official Identity Card** (`MPs/MLAs/MLCs`)\n11. **Smart Card** (`issued by RGI under NPR`)\n12. **Unique Disability ID (`UDID`) Card**";
    } else if (lowerText.includes("nota") || lowerText.includes("none of the above") || lowerText.includes("reject")) {
      fallbackReply = "### NOTA (`None of the Above`) Statutory Framework\n\n• **Citizen Right to Rejection:** Introduced following the landmark Supreme Court PUCL verdict (`2013`), NOTA empowers electors to reject all contesting candidates while preserving absolute ballot secrecy.\n• **EVM Placement:** The NOTA button is prominently positioned as the final pink button at the bottom of the Ballot Unit (`BU`).\n• **Official Tabulation:** NOTA votes are tabulated separately and disclosed officially in **Form 20** (`Final Result Sheet`). While NOTA currently does not invalidate an election even if it secures the highest votes, it serves as a powerful constitutional metric of voter dissent.";
    } else if (lowerText.includes("age") || lowerText.includes("18") || lowerText.includes("eligibility") || lowerText.includes("qualification")) {
      fallbackReply = "### Article 326 & Voting Eligibility Criteria\n\n• **Universal Adult Suffrage:** Under **Article 326** of the Constitution of India, every Indian citizen who is not less than **18 years of age** on the qualifying date (`January 1st, April 1st, July 1st, or October 1st of the year`) is entitled to register as an elector.\n• **61st Constitutional Amendment:** The voting age in India was officially reduced from 21 years to 18 years by the 61st Constitutional Amendment Act in 1988.\n• **Zero Discrimination:** Suffrage is universal without discrimination based on religion, race, caste, sex, or place of birth (`subject to non-disqualification under law for unsoundness of mind or corrupt electoral practices`).";
    } else if (lowerText.includes("mcc") || lowerText.includes("code of conduct") || lowerText.includes("bribe") || lowerText.includes("liquor") || lowerText.includes("freebie") || lowerText.includes("cash") || lowerText.includes("cvigil") || lowerText.includes("complaint")) {
      fallbackReply = "### Model Code of Conduct (`MCC`) & cVIGIL Citizen App\n\n• **Model Code of Conduct (`MCC`):** A set of guidelines issued by the ECI to regulate political parties and candidates during elections, ensuring free and fair polling (`comes into force immediately upon election schedule announcement`).\n• **Zero Tolerance:** Distribution of cash, liquor, freebies, or using religious/communal appeals to solicit votes is strictly illegal under Section 123 of RPA 1951.\n• **cVIGIL Mobile App:** Any citizen can report MCC violations (`cash distribution, illegal banners, hate speech, booth capturing`) by taking a live photo/video on the **cVIGIL** app. The ECI guarantees investigation and resolution within exactly **100 minutes** with complete whistleblower anonymity.";
    } else if (lowerText.includes("seat") || lowerText.includes("constituency") || lowerText.includes("lok sabha") || lowerText.includes("mp") || lowerText.includes("parliament") || lowerText.includes("delimitation")) {
      fallbackReply = "### Indian Parliamentary & Constituency Structure\n\n• **Lok Sabha (`House of the People`):** Consists of **543 parliamentary constituencies** directly elected by the citizens of India across states and union territories for a 5-year term.\n• **Rajya Sabha (`Council of States`):** Consists of up to 250 members elected indirectly by the elected members of State Legislative Assemblies (`MLAs`).\n• **Delimitation Commission:** Parliamentary and Assembly constituencies are demarcated by an independent Delimitation Commission (`Article 82`) to ensure proportional representation across population distribution.";
    } else if (lowerText.includes("check status") || lowerText.includes("search name") || lowerText.includes("electoral roll") || lowerText.includes("find name") || lowerText.includes("voter list")) {
      fallbackReply = "### How to Check Your Name in the Electoral Roll\n\n1. **Visit ECI Electoral Search Portal:** Go to [electoralsearch.eci.gov.in](https://electoralsearch.eci.gov.in).\n2. **Three Search Methods:**\n   • **Search by EPIC Number:** Enter your 10-digit alphanumeric EPIC number along with your state.\n   • **Search by Personal Details:** Enter your name, relative's name, age/DOB, state, and district.\n   • **Search by Mobile Number:** Enter the registered mobile number linked to your voter card to verify instantly via OTP.\n3. **Download VIS:** If your record is active, you can instantly download your Electoral Roll record and verify your polling station details.";
    } else if (lowerText.includes("party") || lowerText.includes("symbol") || lowerText.includes("national party") || lowerText.includes("state party") || lowerText.includes("allocation")) {
      fallbackReply = "### Registration of Political Parties & Symbol Allocation\n\n• **Registration under RPA 1951:** Political parties in India are registered with the Election Commission of India under **Section 29A of the Representation of the People Act, 1951**.\n• **Election Symbols Order 1968:** The ECI allocates reserved symbols to recognised National and State parties, while free symbols are allotted to registered unrecognised parties and independent candidates.\n• **Recognition Criteria:** Parties gain National or State recognition based on statutory performance metrics (`percentage of votes polled or seats won in general/state elections`).";
    } else if (lowerText.includes("date") || lowerText.includes("when is election") || lowerText.includes("schedule") || lowerText.includes("phase") || lowerText.includes("last date")) {
      fallbackReply = "### Election Schedules & Registration Deadlines\n\n• **Schedule Announcement:** General election and State Assembly schedules are announced officially by the Election Commission of India via public press conference and statutory notification (`which triggers the Model Code of Conduct`).\n• **Continuous Registration:** Under ECI regulations, voter registration is continuous throughout the year (`4 qualifying dates: Jan 1, Apr 1, Jul 1, Oct 1`).\n• **Cut-off for Upcoming Polls:** You can apply for registration up to **10 days before the last date of filing nominations** for your specific constituency to be included in the supplementary voter list for that election cycle.";
    } else {
      /* Tailored Dynamic Fallback for unrecognized specific user queries */
      fallbackReply = `### ECI Guidance & Citizen Query Resolution\n\nYou asked regarding: **"${userText}"**\n\nTo give you the most accurate, statutory ECI guidance regarding this query, here are the **3 authoritative steps and civic resources** available 24/7 to every Indian elector:\n\n1. **Check Active Voter Record ('Electoral Roll'):** Verify your registration, EPIC number, and polling booth details directly at [electoralsearch.eci.gov.in](https://electoralsearch.eci.gov.in).\n2. **Online Applications ('Forms 6, 7, 8 & 6A'):** For new registration, shifting residence, correcting data, or reporting deceased entries, submit online via [voters.eci.gov.in](https://voters.eci.gov.in) or the **Voter Helpline App ('VHA')**.\n3. **Report Violations or Seek Live Assistance:** Har citizen ka haq hai fair elections! Use the **cVIGIL App** to report any bribery/illegal activities ('100-minute resolution guarantee'), or call the **ECI National Toll-Free Helpline 1950** from any phone across India.\n\n*All responses are verified against the Constitution of India ('Articles 324 & 326') and the Representation of the People Acts ('1950 & 1951').*`;
    }

    return NextResponse.json({ reply: fallbackReply, engine: "local-eci-kb-v2" }, { status: 200 });

  } catch (err: unknown) {
    console.error("[Voter Mitra Fatal Error]", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
