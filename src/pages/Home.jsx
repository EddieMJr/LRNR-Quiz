import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import "../styles/Home.css";

const Home = () => {
  return (
    <MainLayout>
      <div className="home-container">
        <h1>Welcome to LRNR</h1>
        <p>Your personalized quiz generation platform</p>
        <Link to="/quiz-generation" className="cta-button">
          Generate Quiz
        </Link>
      </div>
    </MainLayout>
  );
};

export default Home;
