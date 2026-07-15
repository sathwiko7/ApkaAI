const axios = require("axios");

const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.OPENROUTER_MODEL;

const client = axios.create({
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

function stripCodeFences(text) {
  return text.replace(/```json/gi, "").replace(/```/g, "").trim();
}

// ---------------- Ticket Classification ----------------
async function classifyTicket(ticketText) {
  const prompt = `
You are a support ticket triage assistant.

Classify the ticket.

Return ONLY valid JSON:

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
    response = await client.post("/chat/completions", {
      model: MODEL,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log("OpenRouter Classification Response:");
    console.log(JSON.stringify(response.data, null, 2));

  } catch (err) {
    console.log("OpenRouter Error:");
    console.log(err.response?.data || err.message);
    throw err;
  }

  const raw = response.data?.choices?.[0]?.message?.content || "";

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
// ---------------- Document Summarization ----------------
async function summarizeDocument(documentText, length = "medium") {

  const prompt = `
You are FlowMind AI, an AI Business Operations Assistant.

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

- Summary should be 4-6 professional sentences.
- Generate exactly 5 key points.
- Business insights should explain the overall business value.
- Risks should identify possible issues or missing information.
- Recommendations should suggest practical next steps.
- Confidence must be returned as a string like "95%".
- Return ONLY valid JSON.

Document:

${documentText}
`;

  let response;

  try {
    response = await client.post("/chat/completions", {
      model: MODEL,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log("OpenRouter Summary Response:");
    console.log(JSON.stringify(response.data, null, 2));

  } catch (err) {
    console.log("OpenRouter Summary Error:");
    console.error("OpenRouter Error:");
console.error(JSON.stringify(err.response?.data, null, 2));
    throw err;
  }

  const raw = response.data?.choices?.[0]?.message?.content || "";

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


// ---------------- AI Chat ----------------
// ---------------- AI Chat ----------------
async function chatWithAI(message, documentText = "") {

  let response;

  const systemPrompt = `
You are FlowMind AI.

You are a professional AI assistant for business operations.

Rules:

- Reply in plain text.
- Do NOT use markdown.
- Do NOT use **, #, tables or code blocks.
- Keep answers short, professional and conversational.
- If an uploaded document exists, answer using that document first.
- If the answer is not present in the uploaded document, answer normally using your own knowledge.
`;

  const userPrompt = documentText
    ? `
Uploaded Document:

${documentText}

----------------------------------------

User Question:

${message}
`
    : message;

  try {

    response = await client.post("/chat/completions", {
      model: MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    console.log("OpenRouter Chat Response:");
    console.log(JSON.stringify(response.data, null, 2));

  } catch (err) {

    console.log("OpenRouter Chat Error:");
    console.log(err.response?.data || err.message);

    throw err;
  }

  return (
    response.data?.choices?.[0]?.message?.content ||
    "Sorry, I couldn't generate a response."
  );
}

// ---------------- Exports ----------------
module.exports = {
  classifyTicket,
  summarizeDocument,
  chatWithAI,
};