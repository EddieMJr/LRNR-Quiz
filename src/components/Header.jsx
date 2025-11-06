import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <h1 className="logo">lrnr</h1>
        </Link>
        <nav className="nav">
          <Link to="/account" className="nav-link">
            Account
          </Link>

          <Link to="/quiz-generation" className="nav-link">
            Quiz Generation
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
