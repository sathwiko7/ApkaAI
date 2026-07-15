const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ---------------- Ticket Classification ----------------

async function classifyTicket(ticketText) {
  const prompt = `
You are a support ticket triage assistant.

Return ONLY valid JSON.

{
  "category":"",
  "priority":"",
  "reasoning":""
}

Ticket:
${ticketText}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let text = response.text.trim();

  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  try {
    return JSON.parse(text);
  } catch {
    return {
      category: "Other",
      priority: "Medium",
      reasoning: text,
    };
  }
}

// ---------------- Document Summary ----------------

async function summarizeDocument(documentText) {
  const prompt = `
Analyze this document.

Return ONLY valid JSON.

{
  "summary":"",
  "keyPoints":["","","","",""],
  "businessInsights":"",
  "risks":"",
  "recommendations":"",
  "confidence":""
}

Document:

${documentText}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let text = response.text.trim();

  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  try {
    return JSON.parse(text);
  } catch {
    return {
      summary: text,
      keyPoints: [],
      businessInsights: "",
      risks: "",
      recommendations: "",
      confidence: "",
    };
  }
}

// ---------------- Chat ----------------

async function chatWithAI(message, documentText = "") {

  const prompt = documentText
    ? `
You are ApkaAI.

Answer using the uploaded document first.

Document:

${documentText}

Question:

${message}
`
    : `
You are ApkaAI.

Answer professionally and briefly.

Question:

${message}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

module.exports = {
  classifyTicket,
  summarizeDocument,
  chatWithAI,
};