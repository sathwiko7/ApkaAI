const express = require("express");
const router = express.Router();
const { summarizeDocument } = require("../services/geminiService");

/**
 * POST /api/summarize-document
 * body: { text: string, length?: "short" | "medium" | "long" }
 */
router.post("/summarize-document", async (req, res) => {
  try {
    const { text, length } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "Field 'text' is required and must be a non-empty string." });
    }

    const result = await summarizeDocument(text.trim(), length);
    res.json({ success: true, ...result });
  } catch (err) {

    console.log("========== GROQ ERROR ==========");
    console.log(err.response?.status);
    console.log(JSON.stringify(err.response?.data, null, 2));
    console.log(err.message);
    console.log("================================");

    throw err;

}
});

module.exports = router;
