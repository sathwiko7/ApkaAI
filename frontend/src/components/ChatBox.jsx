import { useState } from "react";
import toast from "react-hot-toast";

import { useStats } from "../context/StatsContext";
import { useActivity } from "../context/ActivityContext";

const API_URL = import.meta.env.VITE_API_URL;

function ChatBox() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Welcome to ApkaAI! How can I help your business today?",
    },
  ]);

  const { stats, setStats } = useStats();
  const { addActivity } = useActivity();

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply || "No response",
        },
      ]);

      setStats({
        ...stats,
        chats: stats.chats + 1,
      });

      addActivity(`🤖 AI answered: "${userMessage.substring(0, 30)}..."`);
    } catch (err) {
      console.error(err);

      toast.error("Backend not responding.");

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Backend not responding.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="chat"
      className="bg-slate-950 text-white py-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold">
            🤖 ApkaAI Assistant
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Chat with your uploaded documents or ask ApkaAI anything about your
            business.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden">
          {/* Header */}

          <div className="flex justify-between items-center p-6 border-b border-slate-700">
            <div>
              <h3 className="text-2xl font-bold">
                🤖 ApkaAI
              </h3>

              <p className="text-gray-400 text-sm">
                Business Intelligence Assistant
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-green-400 font-semibold">
                AI Online
              </span>
            </div>
          </div>

          {/* Messages */}

          <div className="h-[450px] overflow-y-auto p-8 space-y-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-3 ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-lg">
                    🤖
                  </div>
                )}

                <div
                  className={`max-w-md p-4 rounded-2xl shadow-lg ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                      : "bg-slate-700"
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === "user" && (
                  <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-lg">
                    👤
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center">
                  🤖
                </div>

                <div className="bg-slate-700 px-5 py-3 rounded-2xl animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input */}

          <div className="border-t border-slate-700 p-6 flex gap-4">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  sendMessage();
                }
              }}
              type="text"
              placeholder="Ask ApkaAI anything..."
              className="flex-1 bg-slate-950 rounded-xl px-5 py-4 outline-none border border-slate-700 focus:border-cyan-500 transition"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition disabled:bg-gray-600 disabled:cursor-not-allowed px-8 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              {loading && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}

              {loading ? "Thinking..." : "🚀 Send"}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          Powered by ApkaAI • AI Business Assistant
        </div>
      </div>
    </section>
  );
}

export default ChatBox;