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
    console.error("[summarize-document] error:", err);
    res.status(500).json({ error: "Failed to summarize document.", details: err.message });
  }
});

module.exports = router;
