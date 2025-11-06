import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import QuizGeneration from "./pages/QuizGeneration.jsx";
import Account from "./pages/Account.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/quiz-generation" element={<QuizGeneration />} />
        <Route path="/*" element={<h1>404! Page Currently Unavailable!</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
