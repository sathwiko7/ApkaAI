import { useStats } from "../context/StatsContext";
import { useActivity } from "../context/ActivityContext";
import Charts from "./Charts";

function Dashboard() {
  const { stats } = useStats();
  const { activities } = useActivity();

  const cards = [
    {
      icon: "📄",
      title: "Documents",
      value: stats.documents,
      color: "text-green-400",
      border: "hover:border-green-500",
    },
    {
      icon: "🤖",
      title: "AI Chats",
      value: stats.chats,
      color: "text-blue-400",
      border: "hover:border-blue-500",
    },
    {
      icon: "🎫",
      title: "Tickets",
      value: stats.tickets,
      color: "text-yellow-400",
      border: "hover:border-yellow-500",
    },
    {
      icon: "🎯",
      title: "Confidence",
      value: `${stats.confidence}%`,
      color: "text-cyan-400",
      border: "hover:border-cyan-500",
    },
  ];

  return (
    <section
  id="dashboard"
  className="bg-slate-950 text-white py-24"
>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">
            Analytics Dashboard
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Monitor your AI activity and business insights in real time.
          </p>
        </div>

        {/* Stats Cards */}

        <div className="grid md:grid-cols-4 gap-8">

          {cards.map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700 p-8 transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${card.border}`}
            >
              <div className="text-5xl">
                {card.icon}
              </div>

              <h3 className={`text-4xl font-bold mt-6 ${card.color}`}>
                {card.value}
              </h3>

              <p className="text-gray-400 mt-2">
                {card.title}
              </p>
            </div>
          ))}

        </div>

        {/* AI Confidence */}

        <div className="mt-12 bg-slate-900 rounded-3xl border border-slate-800 p-8">

          <div className="flex justify-between mb-4">
            <h3 className="text-2xl font-bold">
              🎯 AI Confidence
            </h3>

            <span className="text-cyan-400 font-bold">
              {stats.confidence}%
            </span>
          </div>

          <div className="w-full bg-slate-700 rounded-full h-5 overflow-hidden">

            <div
              className="bg-cyan-500 h-5 transition-all duration-700"
              style={{
                width: `${stats.confidence}%`,
              }}
            ></div>

          </div>

        </div>

        {/* Charts */}

        <Charts />

        {/* Recent Activity */}

        <div className="mt-16 bg-slate-900 rounded-3xl border border-slate-800 p-8">

          <h3 className="text-3xl font-bold mb-8">
            🕒 Recent Activity
          </h3>

          <div className="space-y-4">

            {activities.length === 0 ? (

              <div className="bg-slate-800 rounded-xl p-5 text-gray-400">
                No recent activity yet.
              </div>

            ) : (

              activities.map((activity) => (

                <div
                  key={activity.id}
                  className="bg-slate-800 rounded-xl p-5 flex justify-between items-center hover:bg-slate-700 transition"
                >
                  <span>{activity.text}</span>

                  <span className="text-sm text-gray-400">
                    {activity.time}
                  </span>
                </div>

              ))

            )}

          </div>

        </div>

        {/* Footer */}

        <div className="mt-16 text-center text-gray-500">

          <p className="text-lg">
            🚀 ApkaAI Analytics Dashboard
          </p>

          <p className="mt-2">
            Intelligent Business Assistant • All Systems Operational
          </p>

        </div>

      </div>
    </section>
  );
}

export default Dashboard;