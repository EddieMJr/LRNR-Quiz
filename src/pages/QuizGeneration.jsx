import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import "../styles/QuizGeneration.css";

const QuizGeneration = () => {
  const navigate = useNavigate();

  // State variables to hold form inputs
  const [topic, setTopic] = useState("");
  const [expertise, setExpertise] = useState("");
  const [numQuestions, setNumQuestions] = useState("5");
  const [style, setStyle] = useState("normal");
  const [loading, setLoading] = useState(false); // Optional: show loading state

  // Function to handle form submission
  const handleSubmit = async () => {
    // Validation: check if required fields are selected
    if (!topic || !expertise) {
      alert("Please select both topic and expertise level");
      return;
    }

    try {
      setLoading(true); // Start loading

      // Send POST request to backend
      const response = await fetch("http://localhost:4000/api/generate-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          expertise,
          number: numQuestions,
          style,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate quiz");
      }

      const data = await response.json(); // Get JSON response

      console.log("Generated Questions:", data.questions);

      // Navigate to quiz page and pass the questions and config
      navigate("/quiz-question", {
        state: {
          topic,
          expertise,
          numQuestions,
          style,
          questions: data.questions,
        },
      });
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Error generating quiz. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
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
          {/* Topic Selection */}
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

          {/* Expertise Selection */}
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

          {/* Number of Questions */}
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

          {/* Style of Questions */}
          <div className="form-group">
            <label className="label">Style of questions</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="select"
            >
              <option value="normal">Normal</option>
              <option value="master">Master</option>
              <option value="8years">Like I am an 8 years old</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="submit-button"
            disabled={loading} // disable while loading
          >
            {loading ? "Generating..." : "SUBMIT"}
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuizGeneration;
