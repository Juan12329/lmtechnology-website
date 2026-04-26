import { useState } from 'react';
import './FAQ.css';

export default function FAQ({ tx }) {
  const { label, title, subtitle, items } = tx;
  const [open, setOpen] = useState(null);

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="faq__header">
          <span className="label-tag">{label}</span>
          <h2 className="faq__title">{title}</h2>
          <p className="faq__subtitle">{subtitle}</p>
        </div>

        <div className="faq__list">
          {items.map((f, i) => (
            <div
              key={i}
              className={`faq__item${open === i ? ' faq__item--open' : ''}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="faq__question">
                <span>{f.q}</span>
                <div className="faq__icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="faq__answer">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
