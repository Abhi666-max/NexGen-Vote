"use client";

import { useState } from "react";
import Link from "next/link";

const QUESTIONS = [
  {
    question: "Are EVMs connected to the internet?",
    options: ["Yes", "No"],
    correctIndex: 1, // No
    explanation: "EVMs are standalone machines. They do not have any wireless or wired internet capabilities, making them secure from remote hacking.",
  },
  {
    question: "What age do you need to be to vote in India?",
    options: ["16", "18", "21"],
    correctIndex: 1, // 18
    explanation: "According to the Indian Constitution, any citizen who is 18 years of age or older has the right to vote.",
  },
  {
    question: "Does pressing NOTA mean your vote is wasted?",
    options: ["Yes", "No"],
    correctIndex: 1, // No
    explanation: "NOTA (None of the Above) allows you to register your dissent. It is a valid vote that shows your dissatisfaction with all contesting candidates.",
  },
  {
    question: "Can I vote if I do not have a Voter ID card but my name is on the electoral roll?",
    options: ["Yes", "No"],
    correctIndex: 0, // Yes
    explanation: "Yes! As long as your name is on the electoral roll, you can use alternative photo ID proofs like an Aadhaar card, PAN card, or Passport to cast your vote.",
  },
  {
    question: "What does VVPAT stand for?",
    options: [
      "Voter Verified Paper Audit Trail",
      "Voting Verification Polling Access Terminal",
      "Visual Vote Printing and Tally"
    ],
    correctIndex: 0,
    explanation: "VVPAT stands for Voter Verified Paper Audit Trail. It allows voters to verify that their vote was cast correctly via a paper slip.",
  },
  {
    question: "How many days before the election does the campaign period legally end?",
    options: ["24 hours", "48 hours", "72 hours"],
    correctIndex: 1, // 48 hours
    explanation: "The campaign period legally ends 48 hours before the end of polling. This period is known as the 'Silence Period'.",
  },
  {
    question: "Is voting compulsory by law in India?",
    options: ["Yes", "No"],
    correctIndex: 1, // No
    explanation: "No, voting is a fundamental right and a civic duty, but it is not legally compulsory in India.",
  },
  {
    question: "What happens if there is a tie between two candidates?",
    options: [
      "Re-election is held",
      "The winner is decided by a draw of lots",
      "The candidate with higher age wins"
    ],
    correctIndex: 1, // Draw of lots
    explanation: "In the rare event of a tie, the Returning Officer decides the winner by a draw of lots.",
  },
  {
    question: "Can Non-Resident Indians (NRIs) vote in Indian elections?",
    options: ["Yes", "No"],
    correctIndex: 0, // Yes
    explanation: "Yes, eligible NRIs can register to vote. However, they must be physically present at their respective polling booths in India to cast their vote.",
  },
  {
    question: "Which of the following is responsible for conducting elections in India?",
    options: [
      "The Supreme Court of India",
      "The Election Commission of India",
      "The Parliament of India"
    ],
    correctIndex: 1,
    explanation: "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering election processes in India.",
  }
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleOptionClick = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    setShowExplanation(true);
    
    if (index === QUESTIONS[currentQuestion].correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((c) => c + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setIsFinished(false);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const getLevel = (finalScore: number) => {
    if (finalScore <= 3) return { title: "Novice Voter", color: "text-orange-400" };
    if (finalScore <= 7) return { title: "Aware Citizen", color: "text-blue-400" };
    return { title: "Democracy Pro", color: "text-emerald-400" };
  };

  return (
    <main className="min-h-screen py-20 px-4 flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "var(--color-bg)" }}>
      {/* Background blobs */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.4 }}>
        <div className="animate-blob" style={{ position: "absolute", top: "10%", right: "10%", width: "min(400px, 60vw)", height: "min(400px, 60vw)", background: "radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      <div className="w-full max-w-2xl text-center mb-8 relative z-10">
        <h1 className="font-display font-black mb-3 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
          The Ultimate Voter Quiz
        </h1>
        <p style={{ color: "var(--color-text-secondary)" }}>
          Test your knowledge across 10 levels and prove your democratic awareness.
        </p>
      </div>

      <div className="w-full max-w-xl glass-card rounded-3xl p-8 shadow-2xl relative z-10" style={{ border: "1px solid var(--color-border)" }}>
        {isFinished ? (
          <div className="text-center py-8 animate-fade-in">
            <div className="text-6xl mb-6 animate-float">🎖️</div>
            <h2 className="text-3xl font-black mb-2" style={{ color: "var(--color-text-primary)" }}>
              Level Achieved
            </h2>
            <h3 className={`text-2xl font-bold mb-6 ${getLevel(score).color}`}>
              {getLevel(score).title}
            </h3>
            <p className="text-lg mb-8 p-4 rounded-xl" style={{ background: "var(--color-surface)", color: "var(--color-text-secondary)" }}>
              You scored <span className="font-bold text-3xl mx-2" style={{ color: "var(--color-primary)" }}>{score}</span> out of 10
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={restartQuiz}
                className="px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105"
                style={{ background: "var(--color-primary)", color: "#fff", boxShadow: "0 4px 14px rgba(59, 130, 246, 0.4)" }}
              >
                🔄 Play Again
              </button>
              <Link href="/" className="px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105 border" style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)", background: "var(--color-surface)" }}>
                🏠 Return Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in" key={currentQuestion}>
            <div className="flex justify-between items-center mb-6 text-sm font-bold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
              <span>Question {currentQuestion + 1} / 10</span>
              <span className="px-3 py-1 rounded-full" style={{ background: "var(--color-surface)" }}>Score: {score}</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-1.5 rounded-full mb-8 overflow-hidden" style={{ background: "var(--color-surface)" }}>
              <div className="h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${((currentQuestion) / 10) * 100}%`, background: "var(--color-primary)" }} />
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold mb-6 leading-snug" style={{ color: "var(--color-text-primary)" }}>
              {QUESTIONS[currentQuestion].question}
            </h3>

            <div className="flex flex-col gap-3 mb-8">
              {QUESTIONS[currentQuestion].options.map((option, index) => {
                const isSelected = selectedOption === index;
                const isCorrect = index === QUESTIONS[currentQuestion].correctIndex;
                const showStatus = showExplanation && (isSelected || isCorrect);
                
                let btnStyle = {
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-primary)"
                };

                if (showStatus) {
                  if (isCorrect) {
                    btnStyle = { background: "rgba(16, 185, 129, 0.1)", borderColor: "#10b981", color: "#10b981" };
                  } else if (isSelected && !isCorrect) {
                    btnStyle = { background: "rgba(239, 68, 68, 0.1)", borderColor: "#ef4444", color: "#ef4444" };
                  }
                } else if (isSelected) {
                   btnStyle = { background: "var(--color-primary)", borderColor: "var(--color-primary)", color: "#fff" };
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    disabled={showExplanation}
                    className="p-4 rounded-xl text-left font-medium transition-all duration-200 border hover:bg-opacity-80"
                    style={btnStyle}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span>{option}</span>
                      {showStatus && isCorrect && <span className="text-emerald-500">✅</span>}
                      {showStatus && isSelected && !isCorrect && <span className="text-red-500">❌</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="mb-8 p-5 rounded-xl animate-slide-up" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                <p className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: selectedOption === QUESTIONS[currentQuestion].correctIndex ? "#10b981" : "#ef4444" }}>
                  {selectedOption === QUESTIONS[currentQuestion].correctIndex ? "Correct Answer" : "Incorrect"}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {QUESTIONS[currentQuestion].explanation}
                </p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={!showExplanation}
                className="px-8 py-3 rounded-xl font-bold transition-all duration-200"
                style={{ 
                  background: showExplanation ? "var(--color-primary)" : "var(--color-surface)", 
                  color: showExplanation ? "#fff" : "var(--color-text-muted)",
                  boxShadow: showExplanation ? "0 4px 14px rgba(59, 130, 246, 0.4)" : "none",
                  cursor: showExplanation ? "pointer" : "not-allowed",
                  border: showExplanation ? "none" : "1px solid var(--color-border)"
                }}
              >
                {currentQuestion === QUESTIONS.length - 1 ? "View Results 🏆" : "Next Question →"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 text-center relative z-10" style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>
        Engineered with precision by <span className="font-bold" style={{ color: "var(--color-text-primary)" }}>Abhijeet Kangane</span> 🇮🇳✦
      </div>
    </main>
  );
}
