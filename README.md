# FlowMind AI

Chatbot-style internal tool for **ticket classification** and **document summarization**, built on the architecture:

```
React Chatbot UI  →  Node.js/Express API  →  Gemini AI API
```

## Project structure

```
flowmind-ai/
├── backend/
│   ├── server.js                 # Express app entrypoint
│   ├── routes/
│   │   ├── classify.js           # POST /api/classify-ticket
│   │   └── summarize.js          # POST /api/summarize-document
│   ├── services/
│   │   └── geminiService.js      # All Gemini API calls
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ChatBot.jsx       # Main chat UI, mode switching
    │   │   ├── MessageBubble.jsx # Renders user/AI messages
    │   │   └── chatbot.css
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── .env.example
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and add your Gemini API key (get one at https://aistudio.google.com/apikey):

```
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.5-flash
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

Run it:

```bash
npm run dev     # with nodemon, auto-restarts on changes
# or
npm start
```

The server starts on `http://localhost:5000`. Check `http://localhost:5000/api/health` to confirm it's running.

### API reference

**POST `/api/classify-ticket`**
```json
// request
{ "text": "I was charged twice for my subscription this month." }

// response
{
  "success": true,
  "category": "Billing",
  "priority": "High",
  "reasoning": "Customer reports a duplicate charge, a financial issue needing prompt attention."
}
```

**POST `/api/summarize-document`**
```json
// request
{ "text": "...long document text...", "length": "medium" }

// response
{
  "success": true,
  "summary": "A concise plain-language summary of the document.",
  "keyPoints": ["Point one", "Point two", "Point three"]
}
```

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
```

`.env` should point at your backend:

```
VITE_API_URL=http://localhost:5000/api
```

Run it:

```bash
npm run dev
```

Open `http://localhost:5173`. Use the tab switcher to toggle between **Classify Ticket** and **Summarize Document**, type or paste text, and press Enter (or click Send).

## Notes

- The Gemini model name is configurable via `GEMINI_MODEL` in the backend `.env`. Known-good options as of mid-2026: `gemini-2.5-flash` (default, balanced), `gemini-3.1-flash-lite` (cheapest/fastest), `gemini-3.5-flash` (newest/most capable). Avoid older `-lite` variants from the 2.5 generation — Google has been retiring those for new API keys, which shows up as a 404 "no longer available" error. Full current list: [ai.google.dev/gemini-api/docs/models](https://ai.google.dev/gemini-api/docs/models).
- `geminiService.js` asks Gemini to return strict JSON and falls back gracefully if parsing fails, so the API never hard-crashes on a malformed model response.
- CORS is restricted to `CORS_ORIGIN` in the backend `.env` — update this if you deploy the frontend elsewhere.
