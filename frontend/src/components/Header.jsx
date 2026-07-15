function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-lg">

      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

        {/* Logo */}

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg text-3xl">
            🤖
          </div>

          <div>
            <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ApkaAI
            </h1>

            <p className="text-sm text-gray-400">
              Your Intelligent Business Copilot
            </p>
          </div>

        </div>

        {/* Navigation */}

        <nav className="hidden md:flex items-center gap-10 text-gray-300 font-medium">

          <a
            href="#features"
            className="hover:text-cyan-400 transition duration-300"
          >
            Features
          </a>

          <a
            href="#upload"
            className="hover:text-cyan-400 transition duration-300"
          >
            Analyze
          </a>

          <a
            href="#chat"
            className="hover:text-cyan-400 transition duration-300"
          >
            AI Chat
          </a>

          <a
            href="#dashboard"
            className="hover:text-cyan-400 transition duration-300"
          >
            Dashboard
          </a>

        </nav>

        {/* AI Status */}

        <div className="hidden lg:flex items-center gap-2 bg-green-500/20 border border-green-500 px-4 py-2 rounded-full">

          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>

          <span className="text-green-400 text-sm font-semibold">
            AI Online
          </span>

        </div>

      </div>

    </header>
  );
}

export default Header;