require("dotenv").config();
const express = require("express");
const cors = require("cors");
const uploadModule = require("./routes/upload");
const uploadRoute = uploadModule.router;

const classifyRoute = require("./routes/classify");
const summarizeRoute = require("./routes/summarize");
const chatRoute = require("./routes/chat");

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json({ limit: "2mb" }));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use("/api", classifyRoute);
app.use("/api", summarizeRoute);
app.use("/api/chat", chatRoute);
app.use("/api/upload", uploadRoute);


// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "FlowMind AI backend" });
});


// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 FlowMind AI backend running on http://localhost:${PORT}`);
});
