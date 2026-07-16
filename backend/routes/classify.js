const express = require("express");
const router = express.Router();
const { classifyTicket } = require("../services/geminiService");

/**
 * POST /api/classify-ticket
 * body: { text: string }
 */
router.post("/classify-ticket", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "Field 'text' is required and must be a non-empty string." });
    }

    const result = await classifyTicket(text.trim());
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
