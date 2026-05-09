<div align="center">

# NexGen Vote | Smart Election Education Platform

> **Democracy, Now in Your Hands.**

[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google-bard&logoColor=white)](https://ai.google.dev/)
[![Google Maps](https://img.shields.io/badge/Google_Maps-4285F4?style=for-the-badge&logo=google-maps&logoColor=white)](https://developers.google.com/maps)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**[🟢 Live Demo: https://nex-gen-vote-q8zz.vercel.app/](https://nex-gen-vote-q8zz.vercel.app/)**

</div>

---

## 🇮🇳 Project Overview

**NexGen Vote** is a premium, open-source civic education platform architected to empower Indian citizens and Gen-Z voters. By combining state-of-the-art web technologies and artificial intelligence, the platform demystifies the Indian democratic process. Whether you are a first-time voter learning how an EVM works or looking for your nearest polling station, NexGen Vote provides an immersive, interactive, and beautifully designed ecosystem to guide you.

---

## 🚀 Core Features

- **🤖 AI Voter Mitra:** A 24/7 intelligent civic assistant powered by Google Gemini AI. Instantly get accurate, context-aware answers regarding voter registration, fundamental rights, and the intricacies of the Indian democratic framework.
- **🗳️ EVM Simulator:** A gamified, high-fidelity digital replica of the Indian Electronic Voting Machine. It features a complete Control Unit, an interactive Ballot Unit, authentic sound feedback (the iconic voting "beep"), and a visual VVPAT confirmation slip to ensure an authentic experience.
- **📍 Booth Locator:** A seamlessly integrated map utility utilizing the Google Maps API. Users can search by pincode to pinpoint their nearest polling booth, review accessibility features, and generate direct navigation routes.
- **🧠 The Ultimate Voter Quiz:** An interactive, multi-level myth-busting quiz. Challenge your civic knowledge, debunk prevalent voting misconceptions, and progressively earn your rank from a "Novice Voter" up to a "Democracy Pro."

---

## 🧱 Tech Stack & Architecture

- **Framework:** Next.js 15 (App Router for optimized, server-rendered React 19 components)
- **Styling & UI:** Tailwind CSS infused with modern Glassmorphism aesthetics, dynamic micro-animations, and a sleek, responsive design system.
- **AI Integration:** Google Gemini API (`@google/generative-ai`) handling the conversational logic for the AI Voter Mitra.
- **Geospatial Data:** Google Maps API powering the interactive Booth Locator.
- **Deployment & Hosting:** Vercel for lightning-fast, edge-optimized global delivery.

---

## ⚙️ Local Setup Instructions

Follow these step-by-step commands to get the platform running securely on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/abhi666-max/NexGen-Vote.git
cd NexGen-Vote
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory of the project. You must obtain your own API keys for both Google Gemini and Google Maps.

```env
# .env.local
GEMINI_API_KEY=your_google_gemini_api_key_here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

> [!WARNING]  
> **Security Warning:** Never commit your `.env.local` file to version control. Always keep your API keys strictly confidential.

### 4. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to experience the application.

---
### 👨💻 Developed By
**Abhijeet Kangane (@Abhi666-max)**
* 💼 [LinkedIn](https://www.linkedin.com/in/abhijeet-kangane-0578b2395/)
* 🐙 [GitHub](https://github.com/abhi666-max)
* 🐦 [X (Twitter)](https://x.com/abhijeet_037)
* 📸 [Instagram](https://www.instagram.com/abhijeet.037/)

🇮🇳 *Built for the people of India.*
---
