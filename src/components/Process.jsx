import './Process.css';
import { useInView } from '../hooks/useInView';

export default function Process({ tx }) {
  const { label, title, subtitle, steps } = tx;
  const [headerRef, headerVisible] = useInView();
  const [stepsRef, stepsVisible] = useInView();

  return (
    <section className="process" id="process">
      <div className="process__bg" aria-hidden="true" />
      <div className="container">
        <div ref={headerRef} className={`process__header reveal${headerVisible ? ' is-visible' : ''}`}>
          <span className="label-tag">{label}</span>
          <h2 className="process__title">{title}</h2>
          <p className="process__subtitle">{subtitle}</p>
        </div>

        <div ref={stepsRef} className={`process__steps stagger${stepsVisible ? ' is-visible' : ''}`}>
          {steps.map((s, i) => (
            <div className="process__step" key={i}>
              <div className="process__step-left">
                <div className="process__step-num">{s.num}</div>
                {i < steps.length - 1 && <div className="process__connector" />}
              </div>
              <div className="process__step-content">
                <span className="process__phase">{s.phase}</span>
                <h3 className="process__step-title">{s.title}</h3>
                <p className="process__step-desc">{s.desc}</p>
                <div className="process__tags">
                  {s.tags.map(tag => (
                    <span className="process__tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
