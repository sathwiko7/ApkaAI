const express = require("express");
const router = express.Router();
let uploadedDocument = "";

const multer = require("multer");
const pdf = require("pdf-parse");

const { summarizeDocument } = require("../services/geminiService");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    let extractedText = "";

    if (req.file.mimetype === "application/pdf") {
      const data = await pdf(req.file.buffer);
      extractedText = data.text;
      uploadedDocument = extractedText;
    } else {
      return res.status(400).json({
        error: "Only PDF files are supported.",
      });
    }

    const result = await summarizeDocument(extractedText, "medium");

   res.json({
    success: true,
    filename: req.file.originalname,
    summary: result.summary,
    keyPoints: result.keyPoints,
    businessInsights: result.businessInsights,
    risks: result.risks,
    recommendations: result.recommendations,
    confidence: result.confidence,
});

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to summarize document.",
      details: err.message,
    });
  }
});
module.exports = {
  router,
  getUploadedDocument: () => uploadedDocument,
};
