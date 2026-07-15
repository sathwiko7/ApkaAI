const express = require("express");
const router = express.Router();

const { chatWithAI } = require("../services/geminiService");
const { getUploadedDocument } = require("./upload");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const documentText = getUploadedDocument();

    const reply = await chatWithAI(
      message,
      documentText
    );

    res.json({
      success: true,
      reply,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Chat failed",
      details: err.message,
    });
  }
});

module.exports = router;