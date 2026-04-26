import './Solutions.css';

const CASES = {
  es: [
    { industry: 'Logística & Distribución', title: 'Automatización de despacho y trazabilidad en tiempo real', outcome: 'Reducción del 60% en tiempos de despacho y eliminación de errores manuales en la cadena de distribución.', metrics: [{ val: '60%', label: 'Menos tiempo de despacho' }, { val: '0', label: 'Errores manuales críticos' }], tags: ['Automatización', 'IA predictiva', 'Integración ERP'], accent: '#2563EB' },
    { industry: 'Servicios Financieros', title: 'Agente IA para atención al cliente y análisis crediticio', outcome: 'Cobertura 24/7 con respuesta inmediata, reducción del 45% en costos de soporte y pre-calificación automática de créditos.', metrics: [{ val: '24/7', label: 'Disponibilidad del agente' }, { val: '45%', label: 'Reducción en costos de soporte' }], tags: ['Chatbot IA', 'Análisis crediticio', 'Integración bancaria'], accent: '#7c3aed' },
    { industry: 'Ventas B2B', title: 'Sistema de generación y calificación de leads con IA', outcome: 'Pipeline de ventas predecible con calificación automática de prospectos, aumentando la tasa de cierre en un 35%.', metrics: [{ val: '35%', label: 'Mayor tasa de cierre' }, { val: '3x', label: 'Más leads calificados/mes' }], tags: ['Lead generation', 'CRM IA', 'Automatización de ventas'], accent: '#0891b2' },
    { industry: 'Retail & E-commerce', title: 'Motor de recomendación y gestión inteligente de inventario', outcome: 'Incremento del 28% en ticket promedio mediante recomendaciones personalizadas y reducción del 40% en stock obsoleto.', metrics: [{ val: '+28%', label: 'Ticket promedio' }, { val: '40%', label: 'Menos stock obsoleto' }], tags: ['Recomendación IA', 'Gestión de inventario', 'Personalización'], accent: '#059669' },
  ],
  en: [
    { industry: 'Logistics & Distribution', title: 'Dispatch automation and real-time traceability', outcome: '60% reduction in dispatch times and elimination of manual errors in the distribution chain.', metrics: [{ val: '60%', label: 'Less dispatch time' }, { val: '0', label: 'Critical manual errors' }], tags: ['Automation', 'Predictive AI', 'ERP integration'], accent: '#2563EB' },
    { industry: 'Financial Services', title: 'AI agent for customer service and credit analysis', outcome: '24/7 coverage with instant response, 45% reduction in support costs and automatic pre-qualification of loans.', metrics: [{ val: '24/7', label: 'Agent availability' }, { val: '45%', label: 'Support cost reduction' }], tags: ['AI Chatbot', 'Credit analysis', 'Banking integration'], accent: '#7c3aed' },
    { industry: 'B2B Sales', title: 'AI-powered lead generation and qualification system', outcome: 'Predictable sales pipeline with automatic prospect qualification, increasing close rate by 35%.', metrics: [{ val: '35%', label: 'Higher close rate' }, { val: '3x', label: 'More qualified leads/month' }], tags: ['Lead generation', 'AI CRM', 'Sales automation'], accent: '#0891b2' },
    { industry: 'Retail & E-commerce', title: 'Recommendation engine and intelligent inventory management', outcome: '28% increase in average order value through personalized recommendations and 40% reduction in obsolete stock.', metrics: [{ val: '+28%', label: 'Average order value' }, { val: '40%', label: 'Less obsolete stock' }], tags: ['AI Recommendations', 'Inventory management', 'Personalization'], accent: '#059669' },
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
