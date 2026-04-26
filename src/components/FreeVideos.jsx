import { useState } from 'react';
import './FreeVideos.css';

const COMING = {
  es: {
    badge: 'Próximamente',
    title: 'Videos gratuitos de IA',
    subtitle: 'Contenido práctico y directo sobre inteligencia artificial, automatización y tecnología para empresas. Sin relleno, sin teoría innecesaria.',
    desc: 'Tutoriales, casos de éxito y análisis de herramientas que puedes aplicar en tu negocio desde el primer día.',
    notifyLabel: 'Avísame cuando el canal esté activo',
    notifyPh: 'tu@email.com',
    notifyBtn: 'Notificarme',
    notifyOk: '¡Perfecto! Te notificamos cuando lancemos el canal.',
    topics: [
      'Automatización con n8n y Make',
      'ChatGPT para empresas',
      'Agentes de ventas con IA',
      'Análisis de datos sin código',
      'Casos de éxito empresariales',
      'Comparativas de herramientas IA',
    ],
    topicsLabel: 'Temas que cubriremos:',
  },
  en: {
    badge: 'Coming soon',
    title: 'Free AI Videos',
    subtitle: 'Practical, straight-to-the-point content on AI, automation and technology for business. No filler, no unnecessary theory.',
    desc: 'Tutorials, success stories and tool breakdowns you can apply to your business from day one.',
    notifyLabel: 'Notify me when the channel launches',
    notifyPh: 'your@email.com',
    notifyBtn: 'Notify me',
    notifyOk: 'Perfect! We\'ll notify you when we launch the channel.',
    topics: [
      'Automation with n8n and Make',
      'ChatGPT for business',
      'AI sales agents',
      'No-code data analysis',
      'Business success stories',
      'AI tool comparisons',
    ],
    topicsLabel: 'Topics we\'ll cover:',
  },
};

export default function FreeVideos({ tx, lang }) {
  const c = COMING[lang] || COMING.es;
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <section className="free-videos" id="free-videos">
      <div className="container">
        <div className="fv-wrap">
          <div className="fv-right">
            <div className="fv-preview">
              {[
                { emoji: '🤖', w: '75%' },
                { emoji: '💬', w: '60%' },
                { emoji: '📈', w: '85%' },
                { emoji: '📱', w: '70%' },
              ].map((v, i) => (
                <div key={i} className="fv-preview-card">
                  <div className="fv-preview-thumb">
                    <span>{v.emoji}</span>
                    <div className="fv-preview-play">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="rgba(37,99,235,0.85)"/>
                        <path d="M10 8l6 4-6 4V8z" fill="#fff"/>
                      </svg>
                    </div>
                  </div>
                  <div className="fv-preview-info">
                    <div className="fv-preview-bar" style={{ width: v.w }} />
                    <div className="fv-preview-bar fv-preview-bar--short" style={{ width: '45%' }} />
                  </div>
                </div>
              ))}
              <div className="fv-preview-blur" aria-hidden="true" />
              <div className="fv-preview-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" stroke="currentColor" strokeWidth="1.8"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                </svg>
                {c.badge}
              </div>
            </div>
          </div>

          <div className="fv-left">
            <span className="cs-badge">
              <span className="cs-badge-dot" />
              {c.badge}
            </span>
            <h2 className="cs-title">{c.title}</h2>
            <p className="cs-subtitle">{c.subtitle}</p>
            <p className="cs-desc">{c.desc}</p>

            <div className="fv-topics">
              <span className="fv-topics-label">{c.topicsLabel}</span>
              <div className="fv-topics-list">
                {c.topics.map((topic, i) => (
                  <span key={i} className="fv-topic">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {topic}
                  </span>
                ))}
              </div>
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
        </div>
      </div>
    </section>
  );
}
