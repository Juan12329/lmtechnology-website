import './TrustedBy.css';
import { useInView } from '../hooks/useInView';
import tuCreditoLogo from '../../gemini-svg.svg';

const LOGOS = {
  tucredito: tuCreditoLogo,
};

export default function TrustedBy({ tx }) {
  const [ref, visible] = useInView();
  const { label, title, subtitle, companies } = tx;

  return (
    <section className="trusted" id="trusted">
      <div className="container">
        <div ref={ref} className={`trusted__inner reveal${visible ? ' is-visible' : ''}`}>
          <div className="trusted__header">
            <span className="label-tag">{label}</span>
            <h2 className="trusted__title">{title}</h2>
            <p className="trusted__subtitle">{subtitle}</p>
          </div>

          <div className="trusted__logos" aria-label={title}>
            {companies.map(company => (
              <div className="trusted__logo-card" key={company.name}>
                {company.logo && LOGOS[company.logo] ? (
                  <img className="trusted__logo-img" src={LOGOS[company.logo]} alt={`${company.name} logo`} />
                ) : (
                  <span className="trusted__logo-mark">{company.name.slice(0, 2)}</span>
                )}
                <div>
                  <span className="trusted__company-name">{company.name}</span>
                  <span className="trusted__company-type">{company.type}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
