import './Hero.css';

export default function Hero({ tx }) {
  const { badge, title1, title2, titleAccent, subtitle, ctaPrimary, ctaSecondary,
    stat1Val, stat1Label, stat2Val, stat2Label, stat3Val, stat3Label } = tx;

  const scrollTo = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" id="hero">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          {badge}
        </div>

        <h1 className="hero__title">
          {title1}<br />
          {title2}<span className="hero__title-accent">{titleAccent}</span>
        </h1>

        <p className="hero__subtitle">{subtitle}</p>

        <div className="hero__actions">
          <button className="hero__btn hero__btn--primary" onClick={() => scrollTo('#contact')}>
            {ctaPrimary}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="hero__btn hero__btn--secondary" onClick={() => scrollTo('#services')}>
            {ctaSecondary}
          </button>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-value">{stat1Val}</span>
            <span className="hero__stat-label">{stat1Label}</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value">{stat2Val}</span>
            <span className="hero__stat-label">{stat2Label}</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value">{stat3Val}</span>
            <span className="hero__stat-label">{stat3Label}</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
