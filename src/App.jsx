import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import QuizGeneration from "./pages/QuizGeneration";
import QuizQuestion from "./pages/QuizQuestions";
import Results from "./pages/Results";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/quiz-generation" element={<QuizGeneration />} />
        <Route path="/quiz-question" element={<QuizQuestion />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
