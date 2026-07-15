function Hero() {

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-8 py-24">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-500 px-5 py-2 rounded-full text-cyan-300 mb-8">
              🤖 Powered by Advanced AI
            </div>

            <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight">

              AI That

              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">

                Understands

              </span>

              Your Business

            </h1>

            <p className="mt-8 text-xl text-gray-300 leading-9">

              Upload documents, classify customer tickets,
              chat with AI, generate business insights,
              identify risks and make smarter decisions —
              all in one intelligent platform.

            </p>

            <div className="mt-12 flex flex-wrap gap-5">

              <button
                onClick={() => scrollToSection("upload")}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition px-8 py-4 rounded-xl font-semibold shadow-2xl"
              >
                🚀 Get Started
              </button>

              <button
                onClick={() => scrollToSection("chat")}
                className="border border-slate-600 hover:border-cyan-400 hover:text-cyan-400 transition px-8 py-4 rounded-xl"
              >
                ▶ Watch Demo
              </button>

            </div>

            <div className="grid grid-cols-3 gap-8 mt-16">

              <div>
                <h2 className="text-4xl font-bold text-cyan-400">
                  98%
                </h2>

                <p className="text-gray-400 mt-2">
                  AI Accuracy
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-green-400">
                  24/7
                </h2>

                <p className="text-gray-400 mt-2">
                  AI Available
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-yellow-400">
                  5x
                </h2>

                <p className="text-gray-400 mt-2">
                  Faster Analysis
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            <div className="absolute -top-8 -right-8 w-44 h-44 bg-cyan-500/20 blur-3xl rounded-full"></div>

            <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-blue-600/20 blur-3xl rounded-full"></div>

            <div className="relative bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-8">

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">
                  🤖 ApkaAI Assistant
                </h2>

                <div className="flex items-center gap-2">

                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

                  <span className="text-green-400 text-sm">
                    Online
                  </span>

                </div>

              </div>

              <div className="mt-8 space-y-5">

                <div className="bg-slate-800 rounded-2xl p-5">

                  👋 Welcome to ApkaAI.

                  <br />

                  How can I help your business today?

                </div>

                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-5 text-right">

                  Analyze my quarterly sales report.

                </div>

                <div className="bg-slate-800 rounded-2xl p-5">

                  ✅ Analysis Complete

                  <br /><br />

                  📄 Executive Summary Ready

                  <br />

                  📈 5 Business Insights Generated

                  <br />

                  ⚠ Risk Analysis Completed

                  <br />

                  🎯 Confidence: 98%

                </div>

              </div>

              {/* Preview Chat */}

              <div className="mt-8 flex">

                <input
                  type="text"
                  placeholder="Preview Only..."
                  disabled
                  className="flex-1 bg-slate-800 rounded-l-xl px-5 py-4 outline-none opacity-70 cursor-not-allowed"
                />

                <button
                  disabled
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 rounded-r-xl opacity-70 cursor-not-allowed"
                >
                  ➜
                </button>

              </div>

              <p className="text-center text-xs text-gray-500 mt-3">
                Preview only • Scroll down to use the live AI Chat.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;