import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({ model: "gemma-3-12b-it" });

const generationConfig = { temperature: 1, topP: 0.95, topK: 40, maxOutputTokens: 8192 };

// kept for backward compat — routes should use model.generateContent() directly
export const courseOutline = { generationConfig };
export const generateNotesAiModel = { generationConfig };
export const GenerateStudyTypeContentAimodel = { generationConfig };
export const GenerateQuizAiModel = { generationConfig };

export function extractJson(text) {
  const stripped = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  // Try as-is first
  try { return JSON.parse(stripped); } catch {}
  // Detect outermost structure: array takes priority if it starts before object
  const arrStart = stripped.indexOf("[");
  const objStart = stripped.indexOf("{");
  if (arrStart !== -1 && (objStart === -1 || arrStart < objStart)) {
    const arrEnd = stripped.lastIndexOf("]");
    if (arrEnd > arrStart) try { return JSON.parse(stripped.slice(arrStart, arrEnd + 1)); } catch {}
  }
  const start = stripped.indexOf("{");
  const end = stripped.lastIndexOf("}");
  if (start !== -1 && end > start) return JSON.parse(stripped.slice(start, end + 1));
  return JSON.parse(stripped);
}
