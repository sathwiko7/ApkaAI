function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-white py-12">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-10 items-center">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              🤖 ApkaAI
            </h2>

            <p className="text-gray-400 mt-3 leading-7">
              Your Intelligent Business Copilot
            </p>

            <div className="flex items-center gap-2 mt-4">

              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-green-400 font-medium">
                AI Online
              </span>

            </div>

          </div>

          {/* Navigation */}

          <div className="flex justify-center gap-8 text-gray-300 font-medium">

            <a
              href="#features"
              className="hover:text-cyan-400 transition"
            >
              Features
            </a>

            <a
              href="#upload"
              className="hover:text-cyan-400 transition"
            >
              Analyze
            </a>

            <a
              href="#chat"
              className="hover:text-cyan-400 transition"
            >
              AI Chat
            </a>

            <a
              href="#dashboard"
              className="hover:text-cyan-400 transition"
            >
              Dashboard
            </a>

          </div>

          {/* Tech Stack */}

          <div className="text-center md:text-right">

            <p className="text-gray-400">
              Built with
            </p>

            <p className="mt-2 text-cyan-400 font-semibold">
              React • Node.js • OpenRouter AI
            </p>

            <p className="mt-4 text-sm text-gray-500">
              © 2026 ApkaAI. All Rights Reserved.
            </p>

          </div>

        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-gray-500 text-sm">
          Empowering businesses with intelligent AI-driven document analysis, ticket automation, and smart insights.
        </div>

      </div>

    </footer>
  );
}

export default Footer;