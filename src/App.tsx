import { useEffect, useState } from 'react';

function App() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold tracking-wide">Jed Blenkhorn</a>
          <nav className="hidden md:flex gap-8">
            <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#blog" className="hover:text-blue-400 transition-colors">Blog</a>
            <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
          </nav>
          <span className="text-sm text-slate-400">{currentTime}</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-24 pb-16">
        <section id="home" className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Jed Blenkhorn
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8">
            Software Engineer • Trader • Developer
          </p>
          
          {/* Social Links */}
          <div className="flex gap-6 mb-16">
            <a href="https://github.com/jedbillyb09" target="_blank" rel="noopener noreferrer" 
               className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-700/50 hover:bg-slate-600 transition-colors">
              <img src="/assets/github.svg" alt="GitHub" className="w-6 h-6 invert" />
            </a>
            <a href="https://discord.gg/faultline" target="_blank" rel="noopener noreferrer"
               className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-700/50 hover:bg-slate-600 transition-colors">
              <img src="/assets/discord.svg" alt="Discord" className="w-6 h-6 invert" />
            </a>
            <a href="https://instagram.com/jed_blenkhorn" target="_blank" rel="noopener noreferrer"
               className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-700/50 hover:bg-slate-600 transition-colors">
              <img src="/assets/instagram.svg" alt="Instagram" className="w-6 h-6 invert" />
            </a>
            <a href="https://x.com/jedblenkhorn" target="_blank" rel="noopener noreferrer"
               className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-700/50 hover:bg-slate-600 transition-colors">
              <img src="/assets/x.svg" alt="X" className="w-6 h-6 invert" />
            </a>
            <a href="mailto:jedblenkhorn@gmail.com"
               className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-700/50 hover:bg-slate-600 transition-colors">
              <img src="/assets/gmail.svg" alt="Email" className="w-6 h-6 invert" />
            </a>
          </div>

          {/* Featured Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-colors">
              <span className="text-xs uppercase tracking-wider text-blue-400">Blog</span>
              <h3 className="text-xl font-semibold mt-2 mb-3">Netflix Investment Analysis</h3>
              <p className="text-slate-400 text-sm">Deep dive into streaming market dynamics and growth potential.</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-colors">
              <span className="text-xs uppercase tracking-wider text-purple-400">Service</span>
              <h3 className="text-xl font-semibold mt-2 mb-3">Faultline Discord</h3>
              <p className="text-slate-400 text-sm">Premium trading community with real-time alerts and analysis.</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-green-500/50 transition-colors">
              <span className="text-xs uppercase tracking-wider text-green-400">Project</span>
              <h3 className="text-xl font-semibold mt-2 mb-3">Algorithmic Trading Bot</h3>
              <p className="text-slate-400 text-sm">Automated trading system with machine learning predictions.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-slate-400 text-sm">
          <p className="mb-2">© 2024 Jed Blenkhorn. All rights reserved.</p>
          <p className="text-xs">
            Disclaimer: Content on this site reflects personal experience and is not financial advice. 
            Always do your own research before making investment decisions.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
