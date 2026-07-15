function Features() {
  const features = [
    {
      icon: "📄",
      title: "AI Document Analysis",
      description:
        "Upload PDF documents and instantly generate summaries, business insights, risks, recommendations, and confidence scores.",
    },
    {
      icon: "🤖",
      title: "Smart AI Assistant",
      description:
        "Ask questions about uploaded documents or get instant business guidance using conversational AI.",
    },
    {
      icon: "🎫",
      title: "Ticket Classification",
      description:
        "Automatically classify customer support tickets with AI-powered category and priority detection.",
    },
    {
      icon: "📊",
      title: "Business Dashboard",
      description:
        "Track AI performance, monitor analytics, and visualize business insights through interactive dashboards.",
    },
  ];

  return (
    <section
      id="features"
      className="bg-slate-950 text-white py-24"
    >
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold">
            Powerful AI Features
          </h2>

          <p className="text-gray-400 mt-5 text-xl">
            Everything you need to automate business operations with AI.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 hover:border-cyan-500 hover:-translate-y-3 transition duration-300 shadow-xl"
            >

              <div className="text-6xl mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="text-gray-400 mt-5 leading-8">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;