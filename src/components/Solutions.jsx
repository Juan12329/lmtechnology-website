import './Solutions.css';

const CASES = {
  es: [
    {
      industry: 'Finanzas / Crédito',
      title: 'Automatización de originación de crédito',
      outcome: 'Proceso de evaluación y aprobación de crédito completamente automatizado, reduciendo tiempos de respuesta y escalando el volumen de solicitudes sin aumentar el equipo.',
      metrics: [{ val: '70%', label: 'Menos tiempo en originación' }, { val: '3x', label: 'Más solicitudes procesadas' }],
      tags: ['Credit Scoring', 'IA Decision Engine', 'Open Banking'],
      accent: '#2563EB',
    },
    {
      industry: 'Atención al Cliente',
      title: 'Agentes IA para ventas y soporte 24/7',
      outcome: 'Agentes conversacionales que resuelven consultas, califican prospectos y cierran ventas de forma autónoma, disponibles las 24 horas sin incrementar costos operativos.',
      metrics: [{ val: '24/7', label: 'Disponibilidad total' }, { val: '45%', label: 'Menos costos de soporte' }],
      tags: ['AI Agent', 'WhatsApp Automation', 'CRM Integration'],
      accent: '#7c3aed',
    },
    {
      industry: 'Operaciones',
      title: 'Automatización de procesos internos',
      outcome: 'Flujos operativos críticos automatizados de extremo a extremo, eliminando trabajo manual repetitivo y reduciendo errores en procesos clave del negocio.',
      metrics: [{ val: '60%', label: 'Menos trabajo manual' }, { val: '0', label: 'Errores críticos' }],
      tags: ['Workflow Automation', 'ERP', 'Process Optimization'],
      accent: '#0891b2',
    },
    {
      industry: 'Comercial / Growth',
      title: 'Sistema inteligente de leads y ventas',
      outcome: 'Motor de generación y calificación automática de prospectos que alimenta el pipeline de ventas con leads de alta intención, impulsando la tasa de conversión.',
      metrics: [{ val: '35%', label: 'Más conversión' }, { val: '3x', label: 'Más leads generados' }],
      tags: ['Lead Generation', 'Sales AI', 'CRM Automation'],
      accent: '#059669',
    },
  ],
  en: [
    {
      industry: 'Finance / Credit',
      title: 'Credit origination automation',
      outcome: 'Fully automated credit evaluation and approval process, reducing response times and scaling request volume without growing the team.',
      metrics: [{ val: '70%', label: 'Less origination time' }, { val: '3x', label: 'More requests processed' }],
      tags: ['Credit Scoring', 'AI Decision Engine', 'Open Banking'],
      accent: '#2563EB',
    },
    {
      industry: 'Customer Service',
      title: 'AI agents for sales and 24/7 support',
      outcome: 'Conversational agents that resolve inquiries, qualify prospects, and close sales autonomously — available around the clock without increasing operating costs.',
      metrics: [{ val: '24/7', label: 'Full availability' }, { val: '45%', label: 'Lower support costs' }],
      tags: ['AI Agent', 'WhatsApp Automation', 'CRM Integration'],
      accent: '#7c3aed',
    },
    {
      industry: 'Operations',
      title: 'Internal process automation',
      outcome: 'End-to-end automation of critical operational workflows, eliminating repetitive manual work and reducing errors in key business processes.',
      metrics: [{ val: '60%', label: 'Less manual work' }, { val: '0', label: 'Critical errors' }],
      tags: ['Workflow Automation', 'ERP', 'Process Optimization'],
      accent: '#0891b2',
    },
    {
      industry: 'Commercial / Growth',
      title: 'Intelligent lead and sales system',
      outcome: 'Automated lead generation and qualification engine that fills the sales pipeline with high-intent prospects, driving conversion rates up.',
      metrics: [{ val: '35%', label: 'Higher conversion' }, { val: '3x', label: 'More leads generated' }],
      tags: ['Lead Generation', 'Sales AI', 'CRM Automation'],
      accent: '#059669',
    },
  ],
};

export default function Solutions({ tx, lang }) {
  const { label, title, subtitle, ctaText, ctaBtn } = tx;
  const cases = CASES[lang];

  return (
    <section className="solutions" id="solutions">
      <div className="container">
        <div className="solutions__header">
          <span className="label-tag">{label}</span>
          <h2 className="solutions__title">{title.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br/>}</span>)}</h2>
          <p className="solutions__subtitle">{subtitle}</p>
        </div>

        <div className="solutions__grid">
          {cases.map((c, i) => (
            <div className="case-card" key={i} style={{ '--accent': c.accent }}>
              <div className="case-card__top">
                <span className="case-card__industry">{c.industry}</span>
                <h3 className="case-card__title">{c.title}</h3>
                <p className="case-card__outcome">{c.outcome}</p>
              </div>
              <div className="case-card__bottom">
                <div className="case-card__metrics">
                  {c.metrics.map(m => (
                    <div className="case-card__metric" key={m.label}>
                      <span className="case-card__metric-val">{m.val}</span>
                      <span className="case-card__metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
                <div className="case-card__tags">
                  {c.tags.map(tag => (
                    <span className="case-card__tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="solutions__cta">
          <p className="solutions__cta-text">{ctaText}</p>
          <button className="solutions__cta-btn" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
            {ctaBtn}
          </button>
        </div>
      </div>
    </section>
  );
}
