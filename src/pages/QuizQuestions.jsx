import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import "../styles/QuizQuestions.css";

const QuizQuestion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const quizConfig = location.state || {};

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [userAnswer, setUserAnswer] = useState("");
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [questionsCorrect, setQuestionsCorrect] = useState(0);
  const [questionsWrong, setQuestionsWrong] = useState(0);

  // Sample questions - in a real app, these would come from an API
  const questions = [
    {
      id: 1,
      text: "Can you explain what JavaScript is and how it is used to add interactivity to websites?",
      correctAnswer:
        "JavaScript is a programming language that allows developers to add interactivity to websites. It can handle events, manipulate HTML and CSS, access the DOM, and perform various other functions to create dynamic web experiences.",
    },
    {
      id: 2,
      text: "What is the difference between let, const, and var in JavaScript?",
      correctAnswer:
        "var has function scope, let and const have block scope. const cannot be reassigned after declaration, while let and var can be reassigned.",
    },
    // Add more questions as needed
  ];

  const totalQuestions = parseInt(quizConfig.numQuestions) || 5;
  const currentQuestionData = questions[currentQuestion - 1];

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) {
      alert("Please enter an answer");
      return;
    }
    setShowEvaluation(true);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer("");
      setShowEvaluation(false);
    } else {
      // Quiz finished, navigate to results
      navigate("/results", {
        state: {
          questionsCorrect,
          questionsWrong,
          total: totalQuestions,
        },
      });
    }
  };

  if (!quizConfig.topic) {
    return (
      <MainLayout>
        <div className="quiz-question-container">
          <h2>Quiz Questions</h2>
          <p>No quiz configuration found.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="quiz-question-container">
        <div className="question-counter">
          {currentQuestion} of {totalQuestions}
        </div>

        <div className="question-section">
          <h2 className="question-title">Question</h2>
          <p className="question-text">{currentQuestionData?.text}</p>
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
            <span className="voice-icon">🎤</span>
          </div>

          {!showEvaluation && (
            <button
              onClick={handleSubmitAnswer}
              className="submit-answer-button"
            >
              SUBMIT ANSWER
            </button>
          )}
        </div>

        {showEvaluation && (
          <div className="evaluation-section">
            <h2 className="evaluation-title">Verner's Evaluation</h2>
            <div className="evaluation-content">
              <div className="evaluation-result">Incorrect</div>
              <div className="evaluation-feedback">
                No The answer is incorrect because it only mentions one aspect
                of JavaScript - accessing the DOM. While that is a way
                JavaScript is used to add interactivity to websites, it does not
                provide a complete explanation of what JavaScript is and how it
                is used. The answer should include information about JavaScript
                being a programming language, its ability to handle events,
                manipulate HTML and CSS, and perform various other functions to
                add interactivity to websites.
              </div>
            </div>
            <button onClick={handleNext} className="next-button">
              NEXT
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default QuizQuestion;
