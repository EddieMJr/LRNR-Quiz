import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Results.css";

export default function Results() {
  const location = useLocation();
  const { questionsCorrect = 0, questionsWrong = 0, total = 0 } = location.state || {};

  return (
    <div className="results-container">
      <div className="results-content">
        <h1 className="results-logo">lrnr</h1>
        <p className="results-score">
          ✅ {questionsCorrect} correct / ❌ {questionsWrong} wrong out of {total}
        </p>
        <Link to="/quiz-generation" className="try-another-button">
          TRY ANOTHER QUIZ
        </Link>
      </div>
    </div>
  );
}
