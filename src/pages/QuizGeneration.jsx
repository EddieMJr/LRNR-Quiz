import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/QuizGeneration.css";

export default function QuizGeneration() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [expertise, setExpertise] = useState("");
  const [numQuestions, setNumQuestions] = useState("5");
  const [style, setStyle] = useState("normal");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!topic || !expertise) {
      alert("Please select both topic and expertise level");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("https://lrnr-8aau.onrender.com/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, expertise, number: numQuestions, style }),
      });

      if (!res.ok) throw new Error("Failed to generate quiz");
      const data = await res.json();

      navigate("/quiz-question", {
        state: {
          topic,
          expertise,
          numQuestions,
          style,
          questions: data.questions,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Error generating quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-generation-container">
      <h2 className="title">Quiz Generation Options</h2>
      <p className="subtitle">
        Choose your preferences below to generate your personalized quiz
      </p>

      <form className="form-container" onSubmit={handleSubmit}>
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
            <option value="golang">goolan</option>
            <option value="aws">aws</option>
            <option value="CI/CD">CI/CD</option>
            <option value="home gardens">home gardens</option>
            <option value="coffee">coffee</option>
            <option value="finger foods">finger foods</option>
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
            <option value="normal">Normal</option>
            <option value="master">Master</option>
            <option value="8years">Like I’m 8 years old</option>
            <option value="1940's ganster">1940's ganster</option>
            <option value="jedi">jedi</option>
            <option value="captain jack sparrow">captain jack sparrow</option>
            <option value="matthew mcconaughey">matthew mcconaughey</option>
          </select>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Generating..." : "SUBMIT"}
        </button>
      </form>
    </div>
  );
}
