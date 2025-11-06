import React from "react";
import { useState } from "react";
import "./Account.css";

function Account() {
  return (
    <main>
      <h1 className="accountPageHead">Account</h1>
      <section className="boxes__section">
        <div className="icon-block">
          <h2 className="sectionHeader__h2">
            <i className="material-icons">local_fire_department</i>
          </h2>
          <h5 className="sectionHeader__h5">Streak</h5>
          <p className="light">You have a streak of 5 days!</p>
        </div>

        <div className="icon-block">
          <h2 className="sectionHeader__h2">
            <i className="material-icons">list</i>
          </h2>
          <h5 className="sectionHeader__h5">Platinum Quizzes</h5>
          <ul className="quizExpert__ul">
            <li>golang - Intermediate</li>
            <li>Javascript - Beginner</li>
            <li>AWS - Beginner</li>
          </ul>
        </div>

        <div className="icon-block">
          <h2 className="sectionHeader__h2">
            <i className="material-icons"> person</i>
          </h2>
          <h5 className="sectionHeader__h5">lrnr Level: 2</h5>
          <p className="light">150/200 xp</p>
        </div>
      </section>
    </main>
  );
}

export default Account;
