import { useState, useEffect } from 'react';
import './styles.css';

const TypeWriter = ({ text, delay = 50, className = '' }: { text: string; delay?: number; className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span className={className}>{displayText}<span className="cursor">_</span></span>;
};

const GlitchText = ({ children, className = '' }: { children: string; className?: string }) => {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, 4000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`glitch-text ${glitching ? 'glitching' : ''} ${className}`} data-text={children}>
      {children}
    </span>
  );
};

const PriceTicker = () => {
  const [prices, setPrices] = useState([
    { symbol: 'BTC', price: 67234.12, change: 2.34 },
    { symbol: 'ETH', price: 3521.87, change: -1.23 },
    { symbol: 'SOL', price: 178.45, change: 5.67 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(p => ({
        ...p,
        price: p.price * (1 + (Math.random() - 0.5) * 0.002),
        change: p.change + (Math.random() - 0.5) * 0.1
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ticker-container">
      <div className="ticker-track">
        {[...prices, ...prices, ...prices].map((p, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-symbol">{p.symbol}</span>
            <span className="ticker-price">${p.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className={`ticker-change ${p.change >= 0 ? 'positive' : 'negative'}`}>
              {p.change >= 0 ? '+' : ''}{p.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, delay }: { label: string; value: string; delay: number }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div className={`stat-card ${visible ? 'visible' : ''}`}>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const SocialLink = ({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="social-link"
  >
    {icon}
    <span>{label}</span>
  </a>
);

function App() {
  const [loaded, setLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const timeout = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="app">
      {/* Scanlines overlay */}
      <div className="scanlines" />

      {/* Grid background */}
      <div className="grid-bg" />

      {/* Noise overlay */}
      <div className="noise" />

      {/* Price ticker */}
      <PriceTicker />

      <main className="main-content">
        {/* Hero Section */}
        <section className={`hero ${loaded ? 'loaded' : ''}`}>
          <div className="terminal-header">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
            <span className="terminal-title">dontbuytops.terminal</span>
          </div>

          <div className="hero-content">
            <div className="status-line">
              <span className="status-indicator" />
              <span className="status-text">SYSTEM ONLINE</span>
            </div>

            <h1 className="hero-title">
              <GlitchText>DON'T BUY TOPS</GlitchText>
            </h1>

            <div className="hero-subtitle">
              {showContent && (
                <TypeWriter
                  text="Crypto trader. Degen analyst. Contrarian by nature."
                  delay={40}
                />
              )}
            </div>

            <div className="hero-quote">
              <span className="quote-mark">"</span>
              The best trades are the ones you don't make.
              <span className="quote-mark">"</span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={`stats-section ${showContent ? 'visible' : ''}`}>
          <h2 className="section-title">
            <span className="section-marker">//</span> STATS
          </h2>
          <div className="stats-grid">
            <StatCard label="Trading since" value="2017" delay={1200} />
            <StatCard label="Market cycles" value="3+" delay={1400} />
            <StatCard label="Tops avoided" value="∞" delay={1600} />
            <StatCard label="Alpha shared" value="24/7" delay={1800} />
          </div>
        </section>

        {/* Philosophy Section */}
        <section className={`philosophy-section ${showContent ? 'visible' : ''}`}>
          <h2 className="section-title">
            <span className="section-marker">//</span> PHILOSOPHY
          </h2>
          <div className="philosophy-grid">
            <div className="philosophy-card">
              <div className="philosophy-icon">📉</div>
              <h3>Sell the Rips</h3>
              <p>When everyone's greedy, I'm selling. When everyone's fearful, I'm accumulating.</p>
            </div>
            <div className="philosophy-card">
              <div className="philosophy-icon">🎯</div>
              <h3>Risk Management</h3>
              <p>Position sizing over predictions. Survive long enough to be right.</p>
            </div>
            <div className="philosophy-card">
              <div className="philosophy-icon">🧠</div>
              <h3>Contrarian Edge</h3>
              <p>The crowd is right until they're catastrophically wrong.</p>
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section className={`connect-section ${showContent ? 'visible' : ''}`}>
          <h2 className="section-title">
            <span className="section-marker">//</span> CONNECT
          </h2>
          <div className="social-links">
            <SocialLink
              href="https://x.com/dontbuytops"
              label="@dontbuytops"
              icon={
                <svg viewBox="0 0 24 24" className="social-icon" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              }
            />
          </div>
          <div className="connect-cta">
            <p>Follow for alpha leaks, market takes, and the occasional shitpost.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <span>Requested by @dontbuytops · Built by @clonkbot</span>
      </footer>
    </div>
  );
}

export default App;
