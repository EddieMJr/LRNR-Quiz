import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import "../styles/QuizGeneration.css";

const QuizGeneration = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [expertise, setExpertise] = useState("");
  const [numQuestions, setNumQuestions] = useState("5");
  const [style, setStyle] = useState("normal");

  const handleSubmit = () => {
    if (!topic || !expertise) {
      alert("Please select both topic and expertise level");
      return;
    }

    const quizConfig = { topic, expertise, numQuestions, style };
    console.log("Quiz Configuration:", quizConfig);

    navigate("/quiz-question", { state: quizConfig });
  };

  return (
    <MainLayout>
      <div className="quiz-generation-container">
        <h2 className="title">Quiz Generation Options</h2>
        <p className="subtitle">
          Please choose your preferences below to generate your personalized
          quiz
        </p>

        <div className="form-container">
          <div className="form-group">
            <label className="label">Topic</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="select"
            >
              <option value="">Select a topic</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="css">CSS</option>
              <option value="html">HTML</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Expertise</label>
            <select
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              className="select"
            >
              <option value="">Select expertise level</option>
              <option value="novice">Novice</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Number of questions</label>
            <select
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              className="select"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Style of questions</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="select"
            >
              <option value="normal">normal</option>
              <option value="master">master</option>
              <option value="8years">like I am an 8 years old</option>
            </select>
          </div>

          <button onClick={handleSubmit} className="submit-button">
            SUBMIT
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuizGeneration;
