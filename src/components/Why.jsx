import './Why.css';
import { useInView } from '../hooks/useInView';

const ICONS = [
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.8"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
];

export default function Why({ tx }) {
  const { label, title, text, m1Val, m1Desc, m2Val, m2Desc, m3Val, m3Desc, pillars } = tx;
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
            <div className="why__metrics">
              {[{val: m1Val, desc: m1Desc}, {val: m2Val, desc: m2Desc}, {val: m3Val, desc: m3Desc}].map(m => (
                <div className="why__metric" key={m.val}>
                  <span className="why__metric-val">{m.val}</span>
                  <span className="why__metric-desc">{m.desc}</span>
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
