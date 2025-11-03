import React from "react";
import { Link, useLocation } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import "../styles/Results.css";

const Results = () => {
  const location = useLocation();
  const resultsData = location.state || {};

  // Default values if no data is passed
  const questionsCorrect = resultsData.questionsCorrect || 0;
  const questionsWrong = resultsData.questionsWrong || 1;
  const total = resultsData.total || 1;

  // Format as binary-style display
  const correctBinary = questionsCorrect.toString().padStart(4, "0");
  const wrongBinary = questionsWrong.toString().padStart(4, "0");

  return (
    <MainLayout>
      <div className="results-container">
        <div className="results-content">
          <h1 className="results-logo">lrnr</h1>
          <p className="results-score">
            Questions Right: {correctBinary}
            {wrongBinary}
          </p>
          <Link to="/quiz-generation" className="try-another-button">
            TRY ANOTHER QUIZ
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default Results;
