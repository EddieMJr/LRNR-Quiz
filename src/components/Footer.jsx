import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p className="footer-text">
            Embrace the power of our app and unlock the secrets of the universe,
            one quiz at a time. As I always say, 'Yesterday is history, tomorrow
            is a mystery, but today is a gift. That is why it is called the
            present.'
          </p>
          <p className="made-by">
            Made by <span className="materialize">Materialize</span>
          </p>
        </div>
        <div className="footer-right">
          <h3 className="links-title">Links</h3>
          <ul className="links-list">
            <li>
              <Link to="/" className="footer-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/quiz-generation" className="footer-link">
                Quiz Generator
              </Link>
            </li>
            <li>
              <Link to="/account" className="footer-link">
                Account
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
