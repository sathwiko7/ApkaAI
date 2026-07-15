import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const documentData = [
  { name: "Mon", documents: 18 },
  { name: "Tue", documents: 24 },
  { name: "Wed", documents: 32 },
  { name: "Thu", documents: 27 },
  { name: "Fri", documents: 41 },
  { name: "Sat", documents: 36 },
  { name: "Sun", documents: 45 },
];

const ticketData = [
  { name: "High", value: 18 },
  { name: "Medium", value: 47 },
  { name: "Low", value: 35 },
];
const aiUsageData = [
  { month: "Jan", requests: 220 },
  { month: "Feb", requests: 310 },
  { month: "Mar", requests: 420 },
  { month: "Apr", requests: 510 },
  { month: "May", requests: 640 },
  { month: "Jun", requests: 730 },
];

const COLORS = ["#ef4444", "#facc15", "#22c55e"];

function Charts() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-10">

      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <h2 className="text-xl font-bold mb-6">
          📄 Documents Processed
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={documentData}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="documents" fill="#3b82f6" radius={[8,8,0,0]} />
            <Tooltip
  contentStyle={{
    background: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "10px",
    color: "#fff",
  }}
/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <h2 className="text-xl font-bold mb-6">
          🎫 Ticket Priority
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
            
              data={ticketData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {ticketData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>
            <Tooltip
  contentStyle={{
    background: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "10px",
    color: "#fff",
  }}
/>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-500 text-center mt-8">
  * Analytics shown above represent sample business insights for demonstration purposes.
</p>

    </div>
  );
}

export default Charts;