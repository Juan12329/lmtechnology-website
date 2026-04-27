import './Why.css';
import { useInView } from '../hooks/useInView';

const ICONS = [
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.8"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
];

const FLOW = [
  {
    cls: 'blue',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="1.8"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="currentColor" strokeWidth="1.8"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" stroke="currentColor" strokeWidth="1.8"/></svg>,
    label: 'CRM · Lead entrante',
    status: 'Detectado',
    statusCls: 'blue',
  },
  {
    cls: 'violet',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 7.76a6 6 0 0 0 0 8.49" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    label: 'Motor de IA',
    status: 'Procesando...',
    statusCls: 'processing',
  },
  {
    cls: 'teal',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
    label: 'Respuesta automática',
    status: 'Email + WhatsApp',
    statusCls: 'teal',
  },
  {
    cls: 'green',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    label: 'Lead calificado',
    status: '+35% conversión',
    statusCls: 'green',
  },
];

export default function Why({ tx }) {
  const { label, title, text, pillars } = tx;
  const [leftRef, leftVisible] = useInView();
  const [rightRef, rightVisible] = useInView();

  return (
    <section className="why" id="why">
      <div className="container">
        <div className="why__layout">
          <div ref={leftRef} className={`why__left reveal-left${leftVisible ? ' is-visible' : ''}`}>
            <span className="label-tag">{label}</span>
            <h2 className="why__title">{title.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br/>}</span>)}</h2>
            <p className="why__text">{text}</p>

            <div className="why__flow">
              <div className="why__flow-header">
                <span className="why__flow-live">
                  <span className="why__flow-dot" />
                  Live
                </span>
                <span className="why__flow-caption">Automatización activa</span>
              </div>
              {FLOW.map((node, i) => (
                <div key={i} className="flow-item">
                  <div className={`flow-node flow-node--${node.cls}`}>
                    <div className="flow-node__icon">{node.icon}</div>
                    <span className="flow-node__label">{node.label}</span>
                    <span className={`flow-node__badge flow-badge--${node.statusCls}`}>
                      {node.statusCls === 'processing' && <span className="flow-spinner" />}
                      {node.status}
                    </span>
                  </div>
                  {i < FLOW.length - 1 && (
                    <div className="flow-conn">
                      <div className="flow-conn__dot" style={{ animationDelay: `${i * 0.55}s` }} />
                      <div className="flow-conn__dot" style={{ animationDelay: `${i * 0.55 + 0.85}s` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div ref={rightRef} className={`why__right stagger${rightVisible ? ' is-visible' : ''}`}>
            {pillars.map((p, i) => (
              <div className="why__pillar" key={i}>
                <div className="why__pillar-header">
                  <div className="why__pillar-icon">{ICONS[i]}</div>
                  <div>
                    <span className="why__pillar-num">{p.num}</span>
                    <h3 className="why__pillar-title">{p.title}</h3>
                  </div>
                </div>
                <p className="why__pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
