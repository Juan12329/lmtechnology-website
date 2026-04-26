import { useState } from 'react';
import './FreeClasses.css';

const IconLive = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M6.34 6.34a8 8 0 1 0 11.32 11.32M6.34 6.34A8 8 0 0 1 17.66 17.66" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
  </svg>
);

const IconVideo = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M16 10l5-3v10l-5-3V10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
  </svg>
);

const IconFree = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
  </svg>
);

const IconBusiness = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M9 3v18M3 9h18M3 15h18" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
);

const COMING = {
  es: {
    badge: 'Próximamente',
    title: 'Clases gratuitas de IA',
    subtitle: 'Formación práctica y estratégica para que tu equipo y tu empresa dominen las herramientas de IA que están transformando la industria.',
    desc: 'Clases en vivo, grabaciones y programas diseñados para profesionales que necesitan resultados reales, no solo teoría.',
    notifyLabel: 'Avísame cuando estén disponibles',
    notifyPh: 'tu@email.com',
    notifyBtn: 'Notificarme',
    notifyOk: '¡Listo! Te avisamos en cuanto lancemos.',
    features: [
      { icon: <IconLive />, text: 'Clases en vivo con Q&A' },
      { icon: <IconVideo />, text: 'Grabaciones disponibles 24/7' },
      { icon: <IconFree />, text: '100% gratuitas' },
      { icon: <IconBusiness />, text: 'Enfocadas en casos empresariales' },
    ],
  },
  en: {
    badge: 'Coming soon',
    title: 'Free AI Classes',
    subtitle: 'Practical and strategic training so your team and your company master the AI tools that are transforming the industry.',
    desc: 'Live classes, recordings and programs designed for professionals who need real results, not just theory.',
    notifyLabel: 'Notify me when available',
    notifyPh: 'your@email.com',
    notifyBtn: 'Notify me',
    notifyOk: "Done! We'll let you know when we launch.",
    features: [
      { icon: <IconLive />, text: 'Live classes with Q&A' },
      { icon: <IconVideo />, text: 'Recordings available 24/7' },
      { icon: <IconFree />, text: '100% free' },
      { icon: <IconBusiness />, text: 'Focused on business cases' },
    ],
  },
};

export default function FreeClasses({ tx, lang }) {
  const c = COMING[lang] || COMING.es;
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <section className="free-classes" id="free-classes">
      <div className="free-classes__bg" aria-hidden="true" />
      <div className="container">
        <div className="cs-wrap">
          <div className="cs-left">
            <span className="cs-badge">
              <span className="cs-badge-dot" />
              {c.badge}
            </span>
            <h2 className="cs-title">{c.title}</h2>
            <p className="cs-subtitle">{c.subtitle}</p>
            <p className="cs-desc">{c.desc}</p>

            <div className="cs-features">
              {c.features.map((f, i) => (
                <div className="cs-feature" key={i}>
                  <span className="cs-feature-icon">{f.icon}</span>
                  <span className="cs-feature-text">{f.text}</span>
                </div>
              ))}
            </div>

            {!sent ? (
              <form className="cs-notify" onSubmit={handleSubmit}>
                <label className="cs-notify-label">{c.notifyLabel}</label>
                <div className="cs-notify-row">
                  <input
                    type="email"
                    required
                    placeholder={c.notifyPh}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="cs-notify-input"
                  />
                  <button type="submit" className="cs-notify-btn">{c.notifyBtn}</button>
                </div>
              </form>
            ) : (
              <div className="cs-notify-ok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="#34d399" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {c.notifyOk}
              </div>
            )}
          </div>

          <div className="cs-right">
            <div className="cs-preview-grid">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="cs-preview-card">
                  <div className="cs-preview-shimmer" />
                  <div className="cs-preview-line cs-preview-line--title" />
                  <div className="cs-preview-line cs-preview-line--text" />
                  <div className="cs-preview-line cs-preview-line--short" />
                </div>
              ))}
              <div className="cs-preview-blur" aria-hidden="true" />
              <div className="cs-preview-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                {c.badge}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
