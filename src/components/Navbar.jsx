import { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = {
  es: [
    { label: 'Servicios', href: '#services' },
    { label: 'Confianza', href: '#trusted' },
    { label: 'Clases gratis', href: '#free-classes' },
    { label: 'Videos', href: '#free-videos' },
    { label: 'Proceso', href: '#process' },
    { label: 'Contacto', href: '#contact' },
  ],
  en: [
    { label: 'Services', href: '#services' },
    { label: 'Trusted by', href: '#trusted' },
    { label: 'Free Classes', href: '#free-classes' },
    { label: 'Videos', href: '#free-videos' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
};

const CTA = { es: 'Agendar llamada', en: 'Book a call' };

export default function Navbar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const links = NAV_LINKS[lang];

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a className="navbar__logo" href="#hero" onClick={e => handleLink(e, '#hero')}>
          <div className="navbar__logo-icon">
            <span className="logo-lm">
              <span className="logo-l">L</span><span className="logo-m">M</span>
            </span>
          </div>
          <span className="navbar__logo-text">Technology</span>
        </a>

        <nav className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
          {links.map(l => (
            <a key={l.href} href={l.href} className="navbar__link" onClick={e => handleLink(e, l.href)}>
              {l.label}
            </a>
          ))}
          <button
            className="navbar__lang"
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            aria-label="Toggle language"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <a href="#contact" className="navbar__cta" onClick={e => handleLink(e, '#contact')}>
            {CTA[lang]}
          </a>
        </nav>

        <div className="navbar__right-mobile">
          <button
            className="navbar__lang"
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            aria-label="Toggle language"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
