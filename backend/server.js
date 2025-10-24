import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/*

  Generate Quiz Route
*/
app.post("/api/generate-quiz", async (req, res) => {
  const { topic, expertise, number, style } = req.body; // the information we are requestinf to complete the promt 

  try { // this is is how the promt is being sent to the AI 
    const prompt = `
    Generate a quiz about "${topic}" for a ${expertise} learner.
    Include exactly ${number} questions.
    Use the "${style}" style (funny, pirate, normal, etc.).
    Provide only the questions in numbered list format:
    1. Question one?
    2. Question two?
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", //model we are using 
      contents: [{ role: "user", parts: [{ text: prompt }] }], // role: user is the human and parts the is the promt being sent
    });

    console.log(JSON.stringify(response, null, 2));
 
    const text =
      response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    if (!text) {
      throw new Error("No valid text returned from Gemini");
    }

    // Split questions by numbering (1., 2., 3., etc.)
    const questions = text
      .split(/\n\d+\.\s*/)
      .filter((q) => q.trim() !== "")
      .map((q) => q.trim());

    res.json({ questions }); // send the json to frontend
  } catch (error) {
    console.error("❌ Quiz generation error:", error);
    res.status(500).json({ error: "Failed to generate quiz." });
  }
});

/*

  Evaluate Answer Route

*/
app.post("/api/evaluate-answer", async (req, res) => {
  const { question, userAnswer } = req.body;

  try {
    const evaluationPrompt = `
    You are a professional quiz evaluator.
    Question: "${question}"
    User's Answer: "${userAnswer}"

    Evaluate if the user's answer is correct or incorrect.
    Respond **only** in valid JSON:
    {
      "evaluation": "Correct" or "Incorrect",
      "explanation": "Short reason why"
    }
    `;


    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: evaluationPrompt }],
        },
      ],
    });

    const text =
      response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    const cleaned = text.replace(/```json|```/g, "").trim();

    let feedback;
    try {
      feedback = JSON.parse(cleaned);
    } catch {
      feedback = {
        evaluation: "Error",
        explanation:
          "Could not parse AI response properly. Response text:\n" + text,
      };
    }

    res.json(feedback);
  } catch (error) {
    console.error("❌ Evaluation error:", error);
    res.status(500).json({ error: "Failed to evaluate answer." });
  }
});

/*
 Start Server
*/
app.listen(PORT, () => {
  console.log(`✅ Gemini Quiz Server running at http://localhost:${PORT}`);
});
