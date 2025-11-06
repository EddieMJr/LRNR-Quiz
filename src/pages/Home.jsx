import React from "react";
import { useState } from "react";
import LRNRLogo from "/lrnrLogo.png";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <main>
      <section className="hero__section">
        <img src={LRNRLogo} alt="LRNR Logo" />
        <p className="heroText__p">
          Your Guided path to programming enlightenment
        </p>
        <Link to="/quiz-generation">
          <button className="journeyButton__button">Begin Journey</button>
        </Link>
      </section>
      <section className="boxes__section">
        <div className="icon-block">
          <h2 className="sectionIcons__h2">
            <i className="material-icons" style={{ color: "#64D8A4" }}>
              flash_on
            </i>
          </h2>
          <h5 className="sectionHead__h5">Personalized Quizzes</h5>
          <p className="light">
            Greetings, young padawan. Are you ready to embark on a journey of
            personalized eligntenment through the art of coding? Our app, can
            create custom quizzes that align with your coding skills and
            interests. Whether you are a novice or a master, our system can
            generate questions that will test your proficiency in programming
            languages, tools, and concepts
          </p>
        </div>

        <div className="icon-block">
          <h2 className="sectionIcons__h2">
            <i className="material-icons" style={{ color: "#64D8A4" }}>
              payments
            </i>
          </h2>
          <h5 className="sectionHead__h5">Rewarding</h5>

          <p className="light">
            Our app is designed to be both challenging and rewarding, so you can
            learn new concepts while enjoying the process. With our personalized
            quiz app, you can track your process, complete with your peers, and
            discovers new areas of expertise. The journey of a thousand lines of
            code begins with a single keystroke
          </p>
        </div>

        <div className="icon-block">
          <h2 className="sectionIcons__h2">
            <i className="material-icons" style={{ color: "#64D8A4" }}>
              person
            </i>
          </h2>
          <h5 className="sectionHead__h5">Personal SME</h5>

          <p className="light">
            Welcome to the path of knowledge. Our app is like having a personal
            subject matter expert at your side, guiding you on your journey
            towards wisdom
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;
