"use client";

import { useState, useEffect, useCallback } from "react";
import { useIsOfficer } from "@/lib/role-context";

/* ═══════════════════════ QUIZ DATA ═══════════════════════ */

type Quiz = {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  questions: number;
  duration: number; // minutes
  difficulty: "Easy" | "Medium" | "Hard";
  badge: string;
  enrolled: boolean; // whether this cadet is enrolled
};

type Question = {
  q: string;
  opts: string[];
  ans: number;
};

const ALL_QUIZZES: Quiz[] = [
  { id: "drill-basics", title: "Drill & Commands — Basics", subject: "Drill", subjectCode: "NCC-DR", questions: 10, duration: 10, difficulty: "Easy", badge: "db-badge-green", enrolled: true },
  { id: "drill-adv", title: "Drill & Commands — Advanced", subject: "Drill", subjectCode: "NCC-DR", questions: 15, duration: 15, difficulty: "Hard", badge: "db-badge-red", enrolled: true },
  { id: "weapons-safety", title: "Weapon Training — Safety", subject: "Weapons", subjectCode: "NCC-WT", questions: 10, duration: 12, difficulty: "Medium", badge: "db-badge-amber", enrolled: true },
  { id: "map-reading", title: "Map Reading — Fundamentals", subject: "Map Reading", subjectCode: "NCC-MR", questions: 10, duration: 10, difficulty: "Medium", badge: "db-badge-amber", enrolled: true },
  { id: "firstaid-basic", title: "First Aid — Emergency Response", subject: "First Aid", subjectCode: "NCC-FA", questions: 10, duration: 10, difficulty: "Easy", badge: "db-badge-green", enrolled: true },
  { id: "bcert-mock", title: "B Certificate — Full Mock Test", subject: "General", subjectCode: "NCC-GEN", questions: 10, duration: 15, difficulty: "Hard", badge: "db-badge-red", enrolled: true },
  { id: "naval-studies", title: "Naval Studies — Basics", subject: "Naval", subjectCode: "NCC-NS", questions: 10, duration: 10, difficulty: "Easy", badge: "db-badge-green", enrolled: false },
  { id: "airforce-studies", title: "Air Force Studies — Aircraft ID", subject: "Air Force", subjectCode: "NCC-AF", questions: 10, duration: 12, difficulty: "Medium", badge: "db-badge-amber", enrolled: false },
];

const QUIZ_QUESTIONS: Record<string, Question[]> = {
  "drill-basics": [
    { q: "What is the correct position of attention?", opts: ["Heels together, toes 30° apart", "Feet shoulder width apart", "Heels apart, toes together", "Left foot forward"], ans: 0 },
    { q: "Which foot moves first in a right turn?", opts: ["Right foot", "Left foot", "Both simultaneously", "Either foot"], ans: 0 },
    { q: "The command 'Savdhan' means:", opts: ["Attention", "Stand at ease", "Quick march", "Halt"], ans: 0 },
    { q: "In 'Quick March', the pace rate is:", opts: ["120 paces/min", "100 paces/min", "140 paces/min", "80 paces/min"], ans: 0 },
    { q: "The command for dismissal is:", opts: ["Visarjan", "Savdhan", "Vishram", "Dahine Mud"], ans: 0 },
    { q: "How long is a standard marching pace?", opts: ["30 inches", "24 inches", "36 inches", "18 inches"], ans: 0 },
    { q: "'Vishram' means:", opts: ["Stand at ease", "Attention", "About turn", "Mark time"], ans: 0 },
    { q: "Right dress is done by raising which arm?", opts: ["Right arm", "Left arm", "Both arms", "Neither"], ans: 0 },
    { q: "During saluting, the hand is raised to:", opts: ["Right eyebrow", "Forehead center", "Temple", "Chin"], ans: 0 },
    { q: "In 'Tez Chal', the pace rate is:", opts: ["140 paces/min", "120 paces/min", "160 paces/min", "100 paces/min"], ans: 0 },
  ],
  "bcert-mock": [
    { q: "What does NCC stand for?", opts: ["National Cadet Corps", "National Combat Corps", "Naval Cadet Command", "National Combat Corps"], ans: 0 },
    { q: "The motto of NCC is:", opts: ["Unity and Discipline", "Duty Honor Country", "Service Before Self", "Jai Hind"], ans: 0 },
    { q: "NCC was established in the year:", opts: ["1948", "1950", "1947", "1952"], ans: 0 },
    { q: "Which certificate requires minimum 75% attendance?", opts: ["C Certificate", "B Certificate", "Both B & C", "Neither"], ans: 2 },
    { q: "What does ATC stand for in NCC?", opts: ["Annual Training Camp", "Army Training Corps", "Advanced Tactical Command", "Annual Tactical Camp"], ans: 0 },
    { q: "The B Certificate examination is for:", opts: ["Junior Division/Wing cadets", "Senior Division/Wing cadets", "Officers only", "ANO only"], ans: 0 },
    { q: "RDC is held in which city?", opts: ["New Delhi", "Mumbai", "Bengaluru", "Chennai"], ans: 0 },
    { q: "What wing is NOT part of NCC?", opts: ["Armored Corps", "Army", "Navy", "Air Force"], ans: 0 },
    { q: "SUO stands for:", opts: ["Senior Under Officer", "Senior Unit Officer", "Supreme Under Officer", "Superior Unit Officer"], ans: 0 },
    { q: "Which act governs NCC in India?", opts: ["NCC Act 1948", "NCC Act 1950", "Defense Act 1947", "Cadet Act 1952"], ans: 0 },
  ],
};

// Fallback: generate generic questions for quizzes without specific questions
function getQuestions(quizId: string): Question[] {
  if (QUIZ_QUESTIONS[quizId]) return QUIZ_QUESTIONS[quizId];
  // Generic fallback
  return Array.from({ length: 10 }, (_, i) => ({
    q: `Sample Question ${i + 1} — This is a placeholder question for the ${quizId} quiz.`,
    opts: ["Option A", "Option B", "Option C", "Option D"],
    ans: 0,
  }));
}

const LETTERS = ["A", "B", "C", "D"];

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */

export default function QuizPage() {
  const isOfficer = useIsOfficer();
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

  // Officers see all quizzes, cadets only see enrolled ones
  const availableQuizzes = isOfficer ? ALL_QUIZZES : ALL_QUIZZES.filter((q) => q.enrolled);

  if (activeQuiz) {
    return <QuizAttempt quiz={activeQuiz} onFinish={() => setActiveQuiz(null)} />;
  }

  return <QuizPanel quizzes={availableQuizzes} onAttempt={setActiveQuiz} isOfficer={isOfficer} />;
}

/* ═══════════════════════ QUIZ PANEL (tile grid) ═══════════════════════ */

function QuizPanel({ quizzes, onAttempt, isOfficer }: { quizzes: Quiz[]; onAttempt: (q: Quiz) => void; isOfficer: boolean }) {
  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">Quiz <em>Hub</em></div>
          <div className="db-section-sub">
            {isOfficer ? `${quizzes.length} quizzes · All subjects` : `${quizzes.length} quizzes · Your enrolled subjects`}
          </div>
        </div>
        {isOfficer && <button className="db-btn db-btn-white">+ Create Quiz</button>}
      </div>

      {!isOfficer && (
        <div className="db-card" style={{ marginBottom: 16, borderColor: "rgba(59,130,246,.15)", background: "rgba(59,130,246,.04)" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: 2, flexShrink: 0 }}><path d="M8 2a6 6 0 100 12A6 6 0 008 2zM8 5v4M8 10.5v.5" stroke="var(--db-blue)" strokeWidth="1.3" /></svg>
            <div style={{ fontSize: 12, color: "var(--db-gray3)", lineHeight: 1.6 }}>
              Showing quizzes for your enrolled subjects only. Complete all quizzes to prepare for <strong style={{ color: "var(--db-gray1)" }}>B &amp; C Certificate</strong> examinations.
            </div>
          </div>
        </div>
      )}

      <div className="db-grid-3">
        {quizzes.map((quiz) => (
          <div className="db-card" key={quiz.id} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className={`db-badge ${quiz.badge}`}>{quiz.difficulty}</span>
              <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 9, color: "var(--db-gray5)", letterSpacing: ".1em" }}>{quiz.subjectCode}</span>
            </div>
            <div>
              <div className="db-card-title">{quiz.title}</div>
              <div className="db-card-desc">{quiz.subject}</div>
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1a5 5 0 100 10A5 5 0 006 1zM6 3v3l2 1" stroke="var(--db-gray4)" strokeWidth="1" /></svg>
                <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray4)" }}>{quiz.duration} min</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 3h8M2 6h8M2 9h5" stroke="var(--db-gray4)" strokeWidth="1" /></svg>
                <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray4)" }}>{quiz.questions} Qs</span>
              </div>
            </div>
            <button
              className="db-btn db-btn-white"
              style={{ width: "100%", justifyContent: "center", padding: "10px 16px", marginTop: 4 }}
              onClick={() => onAttempt(quiz)}
            >
              Attempt This Quiz →
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════ QUIZ ATTEMPT (timer + questions) ═══════════════════════ */

function QuizAttempt({ quiz, onFinish }: { quiz: Quiz; onFinish: () => void }) {
  const questions = getQuestions(quiz.id);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.duration * 60); // seconds

  // Timer
  useEffect(() => {
    if (submitted) return;
    if (timeLeft <= 0) { setSubmitted(true); return; }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, submitted]);

  const formatTime = useCallback((s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  }, []);

  const select = (optIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => prev.map((a, i) => (i === current ? optIdx : a)));
  };

  const submit = () => setSubmitted(true);

  const score = submitted ? answers.reduce<number>((s, a, i) => s + (a === questions[i].ans ? 1 : 0), 0) : null;
  const answered = answers.filter((a) => a !== null).length;
  const q = questions[current];

  const timerColor = timeLeft <= 60 ? "var(--db-red)" : timeLeft <= 180 ? "var(--db-amber)" : "var(--db-gray1)";

  return (
    <>
      {/* Header */}
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">{quiz.title}</div>
          <div className="db-section-sub">{quiz.subject} · {quiz.questions} questions · {quiz.difficulty}</div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {/* Timer */}
          <div style={{
            fontFamily: "var(--font-ibm-mono), monospace", fontSize: 18, fontWeight: 600,
            color: timerColor, padding: "6px 14px", border: `1px solid ${timerColor}`,
            minWidth: 80, textAlign: "center",
          }}>
            {submitted ? "Done" : formatTime(timeLeft)}
          </div>
          {!submitted && (
            <button className="db-btn db-btn-ghost" onClick={onFinish}>Exit</button>
          )}
        </div>
      </div>

      <div className="db-grid-3-1" style={{ alignItems: "start" }}>
        {/* Question Area */}
        <div className="db-card">
          <div className="db-card-label">Question {current + 1} of {questions.length}</div>
          <div style={{ fontSize: 15, fontWeight: 400, margin: "16px 0 24px", lineHeight: 1.6 }}>{q.q}</div>
          {q.opts.map((opt, oi) => {
            let cls = "db-quiz-option";
            if (submitted) {
              if (oi === q.ans) cls += " correct";
              else if (answers[current] === oi && oi !== q.ans) cls += " wrong";
            } else if (answers[current] === oi) {
              cls += " selected";
            }
            return (
              <div key={oi} className={cls} onClick={() => select(oi)}>
                <span className="db-quiz-opt-letter">{LETTERS[oi]}</span>
                <span>{opt}</span>
              </div>
            );
          })}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, gap: 8 }}>
            <button className="db-btn db-btn-ghost" disabled={current === 0} onClick={() => setCurrent((p) => p - 1)}>← Prev</button>
            <div style={{ display: "flex", gap: 8 }}>
              {current < questions.length - 1 ? (
                <button className="db-btn db-btn-white" onClick={() => setCurrent((p) => p + 1)}>Next →</button>
              ) : !submitted ? (
                <button className="db-btn db-btn-white" onClick={submit}>Submit Quiz</button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Sidebar: Progress + Score */}
        <div>
          <div className="db-card" style={{ marginBottom: 12 }}>
            <div className="db-card-label" style={{ marginBottom: 12 }}>Progress</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {answers.map((a, i) => (
                <div
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontFamily: "var(--font-ibm-mono), monospace", cursor: "pointer",
                    border: `1px solid ${i === current ? "var(--db-gray1)" : a !== null ? "var(--db-border2)" : "var(--db-border)"}`,
                    background: submitted
                      ? (a === questions[i].ans ? "rgba(34,197,94,.12)" : a !== null ? "rgba(239,68,68,.12)" : "transparent")
                      : (a !== null ? "rgba(255,255,255,0.06)" : "transparent"),
                    color: i === current ? "var(--db-gray1)" : "var(--db-gray4)",
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)", marginTop: 12 }}>
              {answered} / {questions.length} answered
            </div>
          </div>

          {/* Score card — shown after submit */}
          {submitted && (
            <div className="db-card">
              <div className="db-card-label">Score</div>
              <div className="db-card-value" style={{ marginTop: 8, color: score! >= 7 ? "var(--db-green)" : score! >= 4 ? "var(--db-amber)" : "var(--db-red)" }}>
                {score}/{questions.length}
              </div>
              <div className="db-card-sub" style={{ marginBottom: 16 }}>
                {score! >= 7 ? "Excellent! You passed." : score! >= 4 ? "Fair. Review your answers." : "Needs improvement. Try again."}
              </div>
              <div className="db-progress-track" style={{ marginBottom: 16 }}>
                <div
                  className={`db-progress-fill ${score! >= 7 ? "db-bar-green" : score! >= 4 ? "db-bar-amber" : "db-bar-red"}`}
                  style={{ width: `${(score! / questions.length) * 100}%` }}
                />
              </div>
              <button
                className="db-btn db-btn-white"
                style={{ width: "100%", justifyContent: "center", padding: "10px 16px" }}
                onClick={onFinish}
              >
                ← Back to Quiz Hub
              </button>
            </div>
          )}

          {/* Submit button in sidebar when not yet submitted */}
          {!submitted && (
            <div className="db-card">
              <div className="db-card-label" style={{ marginBottom: 8 }}>Ready?</div>
              <div className="db-card-desc" style={{ marginBottom: 12 }}>
                {answered === questions.length
                  ? "All questions answered. Submit when ready."
                  : `${questions.length - answered} question${questions.length - answered > 1 ? "s" : ""} remaining.`}
              </div>
              <button
                className="db-btn db-btn-white"
                style={{ width: "100%", justifyContent: "center", padding: "10px 16px" }}
                onClick={submit}
                disabled={answered === 0}
              >
                Submit Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
