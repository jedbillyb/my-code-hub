import { useEffect, useState } from 'react';

function App() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="wrapper">
      <div id="bg"></div>
      <div id="overlay"></div>

      {/* Top Navigation Bar */}
      <nav id="topnav">
        <div className="nav-left">
          <a href="/" className="nav-brand">Jed Blenkhorn</a>
        </div>
        <div className="nav-center">
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/projects">Projects</a></li>
          </ul>
        </div>
        <div className="nav-right">
          <span id="local-time">{time}</span>
        </div>
      </nav>

      <div id="main">
        {/* Header - Centered Name & Contacts */}
        <header id="header">
          <h1>Jed Blenkhorn</h1>
          <p>Student &nbsp;&bull;&nbsp; Developer &nbsp;&bull;&nbsp; Stockbroker</p>
          <nav>
            <ul className="social-icons">
              <li>
                <a href="https://discord.com/users/1162693800590848030" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                  <img src="/assets/discord.svg" alt="Discord" className="social-icon-img" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/jedbillyb/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="mailto:jedbillyb@outlook.com" aria-label="Email">
                  <i className="fas fa-envelope"></i>
                </a>
              </li>
              <li>
                <a href="https://github.com/jedbillyb" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
              </li>
              <li>
                <a href="https://x.com/jedbillyb09" target="_blank" rel="noopener noreferrer" aria-label="X">
                  <i className="icon-x-custom"></i>
                </a>
              </li>
            </ul>
          </nav>
        </header>

        {/* Featured Cards Section */}
        <section id="featured-cards">
          <div className="card">
            <div className="card-label">Featured Blog:</div>
            <a href="/blog/my-thoughts-on-netflix-stock" className="card-content blog-card">
              <div className="card-image">
                <img src="/assets/94pwblzk4caf1.jpeg" alt="Netflix Blog" />
                <span className="card-badge">NETFLIX</span>
              </div>
              <div className="card-info">
                <h3>My thoughts on netflix stock</h3>
                <p className="card-meta">jedbillyb</p>
              </div>
            </a>
            <a href="/blog" className="card-link">see more blogs</a>
          </div>

          <div className="card">
            <div className="card-label">Featured service:</div>
            <a href="https://discord.gg/faultline" target="_blank" rel="noopener noreferrer" className="card-content service-card">
              <div className="card-service-info">
                <h3>Faultline discord server</h3>
                <p className="card-subtitle">Now</p>
                <p className="card-subtitle">Faultline</p>
                <ul className="service-features">
                  <li>✓ Bots and Services</li>
                </ul>
              </div>
            </a>
            <a href="/services" className="card-link">See more services</a>
          </div>

          <div className="card">
            <div className="card-label">Featured Project:</div>
            <a href="https://github.com/jedbillyb" target="_blank" rel="noopener noreferrer" className="card-content project-card">
              <div className="card-project-info">
                <div className="project-icon">🤖</div>
                <h3>trading bot</h3>
              </div>
            </a>
            <a href="/projects" className="card-link">See more projects</a>
          </div>
        </section>

        {/* Footer */}
        <footer id="footer">
          <div className="footer-content">
            <span className="copyright">&copy; Jed Blenkhorn 2025 | All rights reserved</span>
            <p className="disclaimer">Disclaimer: This blog is for educational purposes only and does not constitute financial advice. All content reflects personal experience.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
