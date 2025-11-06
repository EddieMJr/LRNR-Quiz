import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/QuizQuestions.css";

export default function QuizQuestions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions = [] } = location.state || {};

  const [current, setCurrent] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const handleSubmit = async () => {
    if (!userAnswer.trim()) {
      alert("Please type an answer first!");
      return;
    }

    try {
      const res = await fetch("https://lrnr-8aau.onrender.com/api/evaluate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: questions[current],
          userAnswer,
        }),
      });

      const data = await res.json();

      if (data.evaluation === "Correct") {
        setCorrectCount((prev) => prev + 1);
      } else if (data.evaluation === "Incorrect") {
        setWrongCount((prev) => prev + 1);
      }

      const formattedFeedback = data.explanation
        ?.replace(/(\.)([A-Z])/g, ".\n$2") // add line breaks after sentences
        .replace(/\n+/g, "\n") // clean extra breaks
        .trim();

      setFeedback(formattedFeedback || "Answer checked!");
      setEvaluation(data.evaluation || "Unknown");
      setShowEvaluation(true);
    } catch (err) {
      console.error(err);
      setFeedback("Error checking answer.");
      setEvaluation("Error");
      setShowEvaluation(true);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setUserAnswer("");
      setFeedback("");
      setEvaluation("");
      setShowEvaluation(false);
    } else {
      navigate("/results", {
        state: {
          questionsCorrect: correctCount,
          questionsWrong: wrongCount,
          total: questions.length,
        },
      });
    }
  };

  if (!questions.length)
    return (
      <h2 className="loading-text">
        ⚠️ No questions found. Go back and generate a quiz!
      </h2>
    );

  return (
    <div className="quiz-question-container">
      <div className="question-counter">
        {current + 1} of {questions.length}
      </div>

      <div className="question-section">
        <h2 className="question-title">Question</h2>
        <p className="question-text">{questions[current]}</p>
      </div>

      <div className="answer-section">
        <h2 className="answer-title">Your Answer</h2>
        <div className="answer-input-wrapper">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Answer"
            className="answer-input"
            disabled={showEvaluation}
          />
        </div>

        {!showEvaluation && (
          <button className="submit-answer-button" onClick={handleSubmit}>
            SUBMIT ANSWER
          </button>
        )}
      </div>

      {showEvaluation && (
        <div className="evaluation-section">
          <h2 className="evaluation-title">Verner&apos;s Evaluation</h2>
          <div className="evaluation-content">
            <div
              className="evaluation-result"
              style={{
                color: evaluation === "Correct" ? "green" : "red",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              {evaluation}
            </div>
            <div
              className="evaluation-feedback"
              style={{
                whiteSpace: "pre-line",
                marginTop: "1rem",
              }}
            >
              {feedback}
            </div>
          </div>
          <button className="next-button" onClick={handleNext}>
            {current === questions.length - 1 ? "FINISH QUIZ" : "NEXT"}
          </button>
        </div>
      )}
    </div>
  );
}
