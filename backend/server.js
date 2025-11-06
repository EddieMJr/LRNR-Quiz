import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

//Allow frontend to connect
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

// Initialize Gemini AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/*
    GENERATE QUIZ ROUTE
*/
app.post("/api/generate-quiz", async (req, res) => {
  const { topic, expertise, number, style } = req.body;

  try {
    const prompt = `
You are a professional quiz generator.
Create exactly ${number} distinct quiz questions about "${topic}" for a ${expertise} learner.
Use the "${style}" tone.

 VERY IMPORTANT RULES:
- Only return numbered questions in this exact format:
1. Question one?
2. Question two?
3. ...
- Do NOT include any introductions, titles, explanations, or text before question 1.
- Do NOT include answers or hints.
Only output the numbered questions, nothing else.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // Extract AI text safely
    const text =
      response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    if (!text) throw new Error("No valid text returned from Gemini");

    // 🧹 Clean up: remove everything before "1."
    const cleanedText = text.replace(/^.*?(?=\n?1\.)/, "").trim();

    // Split by question numbers and clean
    const questions = cleanedText
      .split(/\n\d+\.\s*/)
      .filter((q) => q.trim() !== "")
      .map((q) => q.trim());

    // Return only valid questions
    res.json({ questions });
  } catch (error) {
    console.error("Quiz generation error:", error);
    res.status(500).json({ error: "Failed to generate quiz." });
  }
});

/*
   EVALUATE ANSWER ROUTE 
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
  START SERVER
*/
app.listen(PORT, () => {
  console.log(` Gemini Quiz Server running at http://localhost:${PORT}`);
});
