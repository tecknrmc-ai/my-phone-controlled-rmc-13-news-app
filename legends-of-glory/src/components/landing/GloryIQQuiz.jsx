import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Brain, ChevronRight, Crown, Zap, Trophy, CheckCircle2, XCircle, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    q: "Who are the executive producers for Glory Season 1?",
    options: [
      "Bizzybaggz, Hottunez, Nef, Kingd.o.p.e., Gotti",
      "Tabs, Mikeshotit, Kevinshootit, and Teckn",
      "Steven Spielberg, Samuel Jackson, Hannah Lux Davis",
      "Teckn, Cash Champ, Iamnicoleknox, Nee'Cole",
    ],
    correct: 3,
  },
  {
    q: "Who created the Legends of Glory?",
    options: [
      "LaFilm Students",
      "Tecknicalkyamonstaent",
      "Bizzybaggz",
      "NEECOLE",
    ],
    correct: 3,
  },
  {
    q: "Who composed the Legends of Glory Season 1?",
    options: [
      "Teckn and NEECOLE",
      "Netflix",
      "LegendsOfGlory.online",
      "CranesMusicApp",
    ],
    correct: 0,
  },
  {
    q: "What artist goes number 3 in the cypher line up?",
    options: ["Gotti", "Nef", "Hottunez", "Bizzybaggz"],
    correct: 1,
  },
  {
    q: "Who mastered the Legends of Glory Season 1 track?",
    options: [
      "Gotti from the Inland Empire",
      "Teckn from the Inland Empire",
      "Manny from Houston",
      "Joel and One Music Studios in Rancho",
    ],
    correct: 2,
  },
  {
    q: "Who engineered Legends of Glory Season 1?",
    options: [
      "Teckn and NEECOLE",
      "Gotti and Nef",
      "Bizzy and Hottunez",
      "LaFilm Students",
      "Option A and D",
    ],
    correct: 4,
  },
  {
    q: "In what city was all 5 artists' verses recorded in?",
    options: ["Los Angeles", "Hollywood", "Rancho Cucamonga", "San Bernardino"],
    correct: 3,
  },
  {
    q: "What city was Season 1 filmed in?",
    options: ["San Bernardino", "Los Angeles", "Hollywood", "Atlanta"],
    correct: 1,
  },
  {
    q: "Which camera man filmed on Legends of Glory after filming for artists like Harmanfrom India, Young Thug and Gunna?",
    options: ["Tabs", "Kevin", "Mike", "J-Hyde"],
    correct: 0,
  },
  {
    q: "Which platforms did Legends of Glory Season 1 release to?",
    options: [
      "Spotify only",
      "iTunes Music only",
      "Spotify and iTunes",
      "Cranez App, Spotify, iTunes, Deezer, Tidal, and more",
    ],
    correct: 3,
  },
];

const LETTERS = ["A", "B", "C", "D", "E"];

export default function GloryIQQuiz({ open, onClose }) {
  const [page, setPage] = useState(0); // 0 = welcome, 1..10 = questions, 11 = results
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);

  const totalQuestions = QUESTIONS.length;
  const correctCount = answers.reduce(
    (acc, ans, i) => acc + (ans === QUESTIONS[i].correct ? 1 : 0),
    0
  );
  const iqScore = 80 + correctCount * 12;

  const reset = () => {
    setPage(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setSelected(null);
    setLocked(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const chooseOption = (idx) => {
    if (locked) return;
    setSelected(idx);
  };

  const confirmAnswer = () => {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[page - 1] = selected;
    setAnswers(newAnswers);
    setLocked(true);
    setTimeout(() => {
      setLocked(false);
      setSelected(null);
      setPage(page + 1);
    }, 900);
  };

  const startQuiz = () => {
    reset();
    setPage(1);
  };

  if (!open) return null;

  const isResults = page === totalQuestions + 1;
  const isWelcome = page === 0;
  const currentQ = !isWelcome && !isResults ? QUESTIONS[page - 1] : null;
  const isCorrect = locked && selected === currentQ?.correct;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 md:p-6"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.92, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 260 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto"
          style={{
            background: "linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 40%, #111 70%, #080808 100%)",
            border: "1px solid rgba(212,160,23,0.5)",
            boxShadow: "0 0 60px rgba(212,160,23,0.3), 0 0 120px rgba(212,160,23,0.12)",
            borderRadius: "14px",
          }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: "rgba(212,160,23,0.12)",
              border: "1px solid rgba(212,160,23,0.3)",
              color: "#D4A017",
            }}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Progress bar (not on welcome/results) */}
          {!isWelcome && !isResults && (
            <div className="sticky top-0 z-10 px-5 pt-5 pb-3" style={{ background: "linear-gradient(160deg, #1a1a1a 0%, #1a1a1a 100%)" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-primary font-heading text-[10px] uppercase tracking-[0.25em] flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5" /> Glory IQ
                </span>
                <span className="text-muted-foreground font-heading text-[10px] uppercase tracking-wider">
                  {page} / {totalQuestions}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #F5D060, #D4A017, #A07800)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(page / totalQuestions) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          )}

          <div className="p-5 pt-4">
            {/* WELCOME PAGE */}
            {isWelcome && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6"
              >
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0], y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
                  style={{
                    background: "linear-gradient(135deg, #D4A017, #A07800)",
                    boxShadow: "0 0 30px rgba(212,160,23,0.6)",
                  }}
                >
                  <Brain className="w-8 h-8 text-black" />
                </motion.div>
                <h2
                  className="font-display text-3xl md:text-4xl uppercase tracking-tight font-bold mb-3"
                  style={{
                    background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 30px rgba(212,160,23,0.4)",
                  }}
                >
                  Glory IQ Test
                </h2>
                <p className="text-white/80 text-sm leading-relaxed mb-2 max-w-sm mx-auto">
                  Show your IQ on one of our biggest projects.
                </p>
                <p className="text-muted-foreground text-xs mb-8">
                  {totalQuestions} questions · Test your Legends of Glory knowledge
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startQuiz}
                  className="inline-flex items-center gap-2 px-10 py-4 font-heading text-sm uppercase tracking-[0.3em] text-black rounded-sm"
                  style={{
                    background: "linear-gradient(135deg, #D4A017 0%, #A07800 100%)",
                    boxShadow: "0 0 30px rgba(212,160,23,0.5), 0 4px 20px rgba(0,0,0,0.5)",
                  }}
                >
                  <Zap className="w-4 h-4" />
                  Start Now
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}

            {/* QUESTION PAGES */}
            {currentQ && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={page}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-primary font-heading text-[10px] uppercase tracking-[0.3em] mb-3">
                    Question {page}
                  </p>
                  <h3 className="font-display text-lg md:text-xl uppercase tracking-wide font-bold text-white/95 mb-5 leading-snug">
                    {currentQ.q}
                  </h3>

                  <div className="space-y-2.5">
                    {currentQ.options.map((opt, idx) => {
                      const isSelected = selected === idx;
                      const isRight = idx === currentQ.correct;
                      const showCorrect = locked && isRight;
                      const showWrong = locked && isSelected && !isRight;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={!locked ? { scale: 1.02, x: 4 } : {}}
                          whileTap={!locked ? { scale: 0.98 } : {}}
                          onClick={() => chooseOption(idx)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-left transition-all border ${
                            showCorrect
                              ? "border-green-500/70 bg-green-500/15"
                              : showWrong
                              ? "border-red-500/70 bg-red-500/15"
                              : isSelected
                              ? "border-primary/70 bg-primary/10"
                              : "border-white/10 bg-white/5 hover:border-primary/40 hover:bg-primary/5"
                          }`}
                        >
                          <span
                            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-heading text-xs font-bold"
                            style={{
                              background:
                                showCorrect
                                  ? "rgba(34,197,94,0.25)"
                                  : showWrong
                                  ? "rgba(239,68,68,0.25)"
                                  : isSelected
                                  ? "linear-gradient(135deg, #D4A017, #A07800)"
                                  : "rgba(255,255,255,0.08)",
                              color: isSelected || showCorrect || showWrong ? "#fff" : "#D4A017",
                              border: "1px solid rgba(212,160,23,0.3)",
                            }}
                          >
                            {showCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                            ) : showWrong ? (
                              <XCircle className="w-4 h-4 text-red-400" />
                            ) : (
                              LETTERS[idx]
                            )}
                          </span>
                          <span className="text-sm text-white/90 leading-snug">{opt}</span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Feedback + next */}
                  <div className="mt-6">
                    <AnimatePresence>
                      {locked && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex items-center gap-2 mb-3 text-sm font-heading uppercase tracking-wider ${
                            isCorrect ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" /> Correct!
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4" /> Not quite — correct answer highlighted
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <motion.button
                      whileHover={selected !== null && !locked ? { scale: 1.03 } : {}}
                      whileTap={selected !== null && !locked ? { scale: 0.97 } : {}}
                      disabled={selected === null || locked}
                      onClick={confirmAnswer}
                      className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 font-heading text-xs uppercase tracking-[0.3em] rounded-sm transition-all ${
                        selected === null || locked
                          ? "opacity-40 cursor-not-allowed bg-white/5 text-muted-foreground border border-white/10"
                          : "text-black"
                      }`}
                      style={
                        selected !== null && !locked
                          ? {
                              background: "linear-gradient(135deg, #D4A017 0%, #A07800 100%)",
                              boxShadow: "0 0 24px rgba(212,160,23,0.5)",
                            }
                          : {}
                      }
                    >
                      {page < totalQuestions ? "Next Question" : "See Results"}
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {/* RESULTS PAGE */}
            {isResults && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{
                    background: "linear-gradient(135deg, #D4A017, #A07800)",
                    boxShadow: "0 0 40px rgba(212,160,23,0.7)",
                  }}
                >
                  {correctCount >= 7 ? (
                    <Crown className="w-8 h-8 text-black" />
                  ) : (
                    <Trophy className="w-8 h-8 text-black" />
                  )}
                </motion.div>

                <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em] mb-2">
                  Your Glory IQ Score
                </p>
                <motion.h2
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="font-display text-5xl md:text-6xl font-bold mb-1"
                  style={{
                    background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 40px rgba(212,160,23,0.5)",
                  }}
                >
                  {iqScore}
                </motion.h2>
                <p className="text-white/70 text-sm mb-5">
                  {correctCount} / {totalQuestions} correct
                </p>

                <div className="inline-block px-4 py-2 rounded-sm border border-primary/30 bg-primary/5 mb-6">
                  <p className="text-primary font-heading text-xs uppercase tracking-wider">
                    {correctCount === 10
                      ? "Glory Genius 👑"
                      : correctCount >= 8
                      ? "Cypher Scholar"
                      : correctCount >= 6
                      ? "Battle Ready"
                      : correctCount >= 4
                      ? "Rising Fan"
                      : "Newcomer — Keep Learning"}
                  </p>
                </div>

                {/* Answer review */}
                <div className="text-left space-y-2 mb-6 max-h-48 overflow-y-auto pr-1">
                  {QUESTIONS.map((q, i) => {
                    const ok = answers[i] === q.correct;
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs px-3 py-2 rounded-sm bg-white/5 border border-white/10"
                      >
                        {ok ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        )}
                        <span className="text-white/80">
                          <span className="text-primary font-heading">Q{i + 1}.</span> {q.q}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={reset}
                    className="inline-flex items-center gap-2 px-6 py-3 font-heading text-xs uppercase tracking-[0.25em] text-primary rounded-sm border border-primary/40 bg-primary/5 hover:bg-primary/10 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Retake
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                    className="inline-flex items-center gap-2 px-6 py-3 font-heading text-xs uppercase tracking-[0.25em] text-black rounded-sm"
                    style={{
                      background: "linear-gradient(135deg, #D4A017 0%, #A07800 100%)",
                      boxShadow: "0 0 24px rgba(212,160,23,0.5)",
                    }}
                  >
                    <X className="w-4 h-4" />
                    Close
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
