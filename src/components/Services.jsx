import './Services.css';
import { useInView } from '../hooks/useInView';

const ICONS = [
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
];

export default function Services({ tx }) {
  const { label, title, subtitle, badge, items } = tx;
  const [headerRef, headerVisible] = useInView();
  const [gridRef, gridVisible] = useInView();

  return (
    <section className="services" id="services">
      <div className="container">
        <div ref={headerRef} className={`services__header reveal${headerVisible ? ' is-visible' : ''}`}>
          <span className="label-tag">{label}</span>
          <h2 className="services__title">{title.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br/>}</span>)}</h2>
          <p className="services__subtitle">{subtitle}</p>
        </div>

        <div ref={gridRef} className={`services__grid stagger${gridVisible ? ' is-visible' : ''}`}>
          {items.map((s, i) => (
            <div key={i} className={`service-card${i === 1 ? ' service-card--featured' : ''}`}>
              {i === 1 && <div className="service-card__badge">{badge}</div>}
              <div className="service-card__icon">{ICONS[i]}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
              <div className="service-card__arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
