# NexGen Vote | Smart Election Education Platform

> Democracy, Now in Your Hands.

**Live Demo:** `[Deploy link will be added here]`

**NexGen Vote** is a premium, open-source civic education platform architected to empower Indian citizens. Built with cutting-edge web technologies and AI, the platform provides a complete ecosystem for first-time voters to understand the election process, simulate electronic voting, and verify their knowledge.

Engineered with precision by **Abhijeet Kangane**.

---

## 🚀 Core Features

- **🤖 AI Voter Mitra:** A 24/7 intelligent chatbot powered by Google Gemini AI. Instantly get answers about voter registration, rights, EVMs, and the Indian democratic process.
- **🗳️ EVM Simulator:** A gamified, highly realistic simulation of the Indian Electronic Voting Machine. Features a Control Unit, Ballot Unit, sound feedback (the iconic "beep"), and a VVPAT confirmation slip.
- **📍 Booth Locator:** An integrated map tool using the Google Maps API. Search by pincode to find your nearest polling booth, check accessibility status, and get direct navigation links.
- **🧠 The Ultimate Voter Quiz:** A 10-level interactive myth-busting quiz. Test your knowledge, debunk common voting myths, and earn your rank from "Novice Voter" to "Democracy Pro."

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & Custom CSS Modules (Glassmorphism & Neon Design System)
- **AI Engine:** [Google Gemini API](https://ai.google.dev/) (gemini-pro)
- **Mapping:** Google Maps API Integration
- **Deployment:** Vercel (Ready)

---

## ⚙️ Local Setup

Follow these steps to run the platform on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/abhi666-max/NexGen-Vote.git
cd NexGen-Vote
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a `.env.local` file in the root directory. You must acquire your own API keys for the AI and Map features to work.

```env
# .env.local
GEMINI_API_KEY=your_google_gemini_api_key_here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🛡️ Security Note
The `.gitignore` file is strictly configured to ensure sensitive files like `.env.local` are never committed. Always keep your API keys private.

---

## 👨‍💻 Author

**Abhijeet Kangane**
- GitHub: [@abhi666-max](https://github.com/abhi666-max)
- LinkedIn: [Abhijeet Kangane](https://www.linkedin.com/in/abhijeet-kangane-0578b2395/)
- X (Twitter): [@abhijeet_037](https://x.com/abhijeet_037)

---
*Built for the people of India. 🇮🇳✦*
