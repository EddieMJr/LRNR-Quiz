import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home";
import Account from "./pages/Account";
import QuizGeneration from "./pages/QuizGeneration";
import QuizQuestions from "./pages/QuizQuestions";
import Results from "./pages/Results";

function App() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "80vh", padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/quiz-generation" element={<QuizGeneration />} />
          <Route path="/quiz-question" element={<QuizQuestions />} />
          <Route path="/results" element={<Results />} />
          <Route path="/*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
