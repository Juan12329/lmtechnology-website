import './Footer.css';

export default function Footer({ tx }) {
  const year = new Date().getFullYear();
  const { tagline, colServices, colCompany, colContact, serviceLinks, companyLinks, contactItems, rights, privacy, terms } = tx;

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__top-inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <span className="footer__lm">
                  <span className="footer__l">L</span><span className="footer__m">M</span>
                </span>
              </div>
              <span className="footer__logo-text">Technology</span>
            </div>
            <p className="footer__tagline">{tagline}</p>
            <div className="footer__social">
              {[
                { label: 'LinkedIn', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.8"/></svg> },
                { label: 'YouTube', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" stroke="currentColor" strokeWidth="1.8"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
                { label: 'Instagram', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg> },
              ].map(s => (
                <a key={s.label} href="#" className="footer__social-link" aria-label={s.label}>{s.icon}</a>
              ))}
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <span className="footer__col-title">{colServices}</span>
              <ul>{serviceLinks.map(item => <li key={item}><a href="#">{item}</a></li>)}</ul>
            </div>
            <div className="footer__col">
              <span className="footer__col-title">{colCompany}</span>
              <ul>{companyLinks.map(item => <li key={item}><a href="#">{item}</a></li>)}</ul>
            </div>
            <div className="footer__col">
              <span className="footer__col-title">{colContact}</span>
              <ul>{contactItems.map(item => <li key={item}><a href="#">{item}</a></li>)}</ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} LM Technology. {rights}</p>
          <div className="footer__legal">
            <a href="#">{privacy}</a>
            <a href="#">{terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
