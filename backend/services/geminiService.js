const axios = require("axios");

const API_KEY = process.env.GROQ_API_KEY;

const MODEL = "llama-3.3-70b-versatile";

const client = axios.create({
  baseURL: "https://api.groq.com/openai/v1",
  timeout: 30000,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

function stripCodeFences(text) {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

// ======================================================
// Ticket Classification
// ======================================================

// ======================================================
// Ticket Classification
// ======================================================

async function classifyTicket(ticketText) {

  const prompt = `
You are a professional customer support ticket classifier.

Analyze the support ticket.

Return ONLY valid JSON.

{
  "category":"",
  "priority":"",
  "reasoning":""
}

Ticket:

${ticketText}
`;

  let response;

  try {

    console.log("🚀 Sending request to Groq...");

    response = await client.post("/chat/completions", {
      model: MODEL,
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log("✅ Groq responded!");

  } catch (err) {

    console.error("❌ Groq Error:");
    console.error(err.response?.data || err.message);

    throw err;
  }

  const raw =
    response.data?.choices?.[0]?.message?.content || "";

  console.log("Groq Raw Response:");
  console.log(raw);

  try {

    return JSON.parse(stripCodeFences(raw));

  } catch {

    return {
      category: "Other",
      priority: "Medium",
      reasoning: raw,
    };

  }

} 

// Document Summarization
// ======================================================

async function summarizeDocument(documentText) {

  const prompt = `
You are ApkaAI, an AI Business Operations Assistant.

Analyze the uploaded business document.

Return ONLY valid JSON.

{
  "summary":"",
  "keyPoints":[
    "",
    "",
    "",
    "",
    ""
  ],
  "businessInsights":"",
  "risks":"",
  "recommendations":"",
  "confidence":""
}

Rules:

- Summary should contain 4-6 professional sentences.
- Generate exactly 5 key points.
- Explain the business insights.
- Mention possible risks.
- Suggest practical recommendations.
- Confidence should be like "95%".

Document:

${documentText}
`;

  let response;

  try {

    response = await client.post("/chat/completions", {

      model: MODEL,

      temperature: 0.3,

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

    });

  } catch (err) {

    console.error(err.response?.data || err.message);

    throw err;

  }

  const raw =
    response.data?.choices?.[0]?.message?.content || "";

  try {

    return JSON.parse(stripCodeFences(raw));

  } catch {

    return {
      summary: raw,
      keyPoints: [],
      businessInsights: "",
      risks: "",
      recommendations: "",
      confidence: "",
    };

  }

}
// ======================================================
// AI Chat
// ======================================================

async function chatWithAI(message, documentText = "") {

  const prompt = documentText
    ? `
You are ApkaAI.

You are a professional AI Business Assistant.

Answer using the uploaded document first.

If the answer is not present in the uploaded document,
use your own knowledge.

Keep answers short, professional and conversational.

Uploaded Document:

${documentText}

--------------------------------------------

User Question:

${message}
`
    : `
You are ApkaAI.

You are a professional AI Business Assistant.

Reply professionally and briefly.

User Question:

${message}
`;

  let response;

  try {

    response = await client.post("/chat/completions", {

      model: MODEL,

      temperature: 0.5,

      messages: [
        {
          role: "system",
          content:
            "You are ApkaAI, a professional AI assistant for business operations.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

    });

  } catch (err) {

    console.error(err.response?.data || err.message);

    throw err;

  }

  return (
    response.data?.choices?.[0]?.message?.content ||
    "Sorry, I couldn't generate a response."
  );

}
// ======================================================
// Exports
// ======================================================

module.exports = {
  classifyTicket,
  summarizeDocument,
  chatWithAI,
};