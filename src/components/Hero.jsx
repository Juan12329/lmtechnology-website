import './Hero.css';

export default function Hero({ tx }) {
  const { badge, title1, title2, titleAccent, subtitle, ctaPrimary, ctaSecondary,
    stat1Val, stat1Label, stat2Val, stat2Label, stat3Val, stat3Label } = tx;

  const scrollTo = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" id="hero">
      {/* Animated background */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__inner">

        {/* ── Left: content ─────────────────── */}
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            {badge}
          </div>

          <h1 className="hero__title">
            {title1}<br />
            {title2}
            <span className="hero__accent"> {titleAccent}</span>
          </h1>

          <p className="hero__subtitle">{subtitle}</p>

          <div className="hero__actions">
            <button className="hero__btn hero__btn--primary" onClick={() => scrollTo('#contact')}>
              {ctaPrimary}
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="hero__btn hero__btn--ghost" onClick={() => scrollTo('#services')}>
              {ctaSecondary}
            </button>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-val">{stat1Val}</span>
              <span className="hero__stat-label">{stat1Label}</span>
            </div>
            <div className="hero__stat-sep" />
            <div className="hero__stat">
              <span className="hero__stat-val">{stat2Val}</span>
              <span className="hero__stat-label">{stat2Label}</span>
            </div>
            <div className="hero__stat-sep" />
            <div className="hero__stat">
              <span className="hero__stat-val">{stat3Val}</span>
              <span className="hero__stat-label">{stat3Label}</span>
            </div>
          </div>
        </div>

        {/* ── Right: animated visual ─────────── */}
        <div className="hero__visual" aria-hidden="true">
          {/* Pulse rings */}
          <div className="hero__ring hero__ring--1" />
          <div className="hero__ring hero__ring--2" />
          <div className="hero__ring hero__ring--3" />

          {/* Central orb */}
          <div className="hero__orb-center">
            <div className="hero__orb-inner">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17l10 5 10-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12l10 5 10-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Floating metric cards */}
          <div className="hero__card hero__card--1">
            <div className="hero__card-icon" style={{background:'#ecfdf5',color:'#059669'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="hero__card-val">{stat1Val}</div>
              <div className="hero__card-lbl">{stat1Label}</div>
            </div>
          </div>

          <div className="hero__card hero__card--2">
            <div className="hero__card-live">
              <span className="hero__card-dot" />
              Live
            </div>
            <div className="hero__card-val">{stat2Val}</div>
            <div className="hero__card-lbl">{stat2Label}</div>
          </div>

          <div className="hero__card hero__card--3">
            <div className="hero__card-icon" style={{background:'#eff6ff',color:'#2563eb'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="hero__card-val">{stat3Val}</div>
              <div className="hero__card-lbl">{stat3Label}</div>
            </div>
          </div>

          {/* Decorative orbiting dots */}
          <div className="hero__orbit">
            <div className="hero__orbit-dot hero__orbit-dot--1" />
            <div className="hero__orbit-dot hero__orbit-dot--2" />
            <div className="hero__orbit-dot hero__orbit-dot--3" />
          </div>
        </div>

      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
