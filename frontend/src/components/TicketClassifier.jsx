import { useState } from "react";
import toast from "react-hot-toast";

import { useStats } from "../context/StatsContext";
import { useActivity } from "../context/ActivityContext";


function TicketClassifier() {
  const [ticket, setTicket] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
const API_URL = import.meta.env.VITE_API_URL;
  const { stats, setStats } = useStats();
  const { addActivity } = useActivity();

  const classifyTicket = async () => {
    if (!ticket.trim()) {
      toast.error("Please enter a support ticket.");
      return;
    }

    setLoading(true);

    try {
      fetch(`${API_URL}/api/classify-ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: ticket,
        }),
      });

      const data = await res.json();

      console.log(data);

      if (data.success) {
        toast.success("Ticket classified successfully!");

        setResult({
          category: data.category,
          priority: data.priority,
          reasoning: data.reasoning,
        });

        // Update Dashboard Stats
        setStats({
          ...stats,
          tickets: stats.tickets + 1,
        });

        // Add Recent Activity
        addActivity(`🎫 Ticket classified as ${data.category}`);
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Backend not responding.");
    }

    setLoading(false);
  };

  return (
    <section className="bg-slate-900 text-white py-24">
      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center">
          <h2 className="text-5xl font-bold">
            AI Ticket Classification
          </h2>

          <p className="text-gray-400 mt-4">
            Automatically categorize customer support tickets using AI.
          </p>
        </div>

        <textarea
          rows="6"
          value={ticket}
          onChange={(e) => setTicket(e.target.value)}
          placeholder="Example: Customer has not received the refund after 10 days."
          className="w-full mt-10 bg-slate-800 rounded-xl p-5 outline-none border border-slate-700"
        />

        <button
          onClick={classifyTicket}
          disabled={loading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-8 py-3 rounded-xl font-semibold flex items-center gap-3"
        >
          {loading && (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}

          {loading ? "Analyzing Ticket..." : "Analyze Ticket"}
        </button>

        {result && (
          <div className="mt-10 bg-slate-800 rounded-2xl border border-slate-700 p-8">

            <div className="grid md:grid-cols-3 gap-6">

              <div>
                <h3 className="text-green-400 font-bold text-lg">
                  Category
                </h3>

                <p className="mt-3 text-xl">
                  {result.category}
                </p>
              </div>

              <div>
                <h3 className="text-yellow-400 font-bold text-lg">
                  Priority
                </h3>

                <p className="mt-3 text-xl">
                  {result.priority}
                </p>
              </div>

              <div>
                <h3 className="text-blue-400 font-bold text-lg">
                  Reason
                </h3>

                <p className="mt-3 text-gray-300 leading-7">
                  {result.reasoning}
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default TicketClassifier;