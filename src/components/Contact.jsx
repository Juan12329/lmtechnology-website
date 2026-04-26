import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const EJS_SERVICE  = 'service_9xwu8hl';
const EJS_TEMPLATE = 'template_tkrb6us';
const EJS_KEY      = 'k18wxP9UHyGrOQd3r';

const SERVICES_ES = ['Consultoría de IA', 'Automatización de procesos', 'Desarrollo de software', 'Agente IA / Chatbot', 'Generación de leads', 'Capacitación corporativa'];
const SERVICES_EN = ['AI Consulting', 'Process automation', 'Software development', 'AI Agent / Chatbot', 'Lead generation', 'Corporate AI training'];

export default function Contact({ tx, lang }) {
  const services = lang === 'es' ? SERVICES_ES : SERVICES_EN;
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', message: '', size: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        service: form.service,
        company_size: form.size,
        message: form.message,
      }, EJS_KEY);
      setSent(true);
    } catch {
      setError(lang === 'es' ? 'Error al enviar. Por favor intenta de nuevo.' : 'Send failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__bg" aria-hidden="true" />
      <div className="container contact__inner">
        <div className="contact__left">
          <span className="label-tag">{tx.label}</span>
          <h2 className="contact__title">{tx.title.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br/>}</span>)}</h2>
          <p className="contact__text">{tx.text}</p>

          <div className="contact__info">
            {[
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: 'Email', value: 'hello.lmtechnology@gmail.com' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 15.27z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: 'WhatsApp', value: '+1 825 333 2217' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.8"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="1.8"/></svg>, label: 'Web', value: 'www.lmtechnology.io' },
            ].map(item => (
              <div className="contact__info-item" key={item.label}>
                <div className="contact__info-icon">{item.icon}</div>
                <div>
                  <span className="contact__info-label">{item.label}</span>
                  <span className="contact__info-value">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact__right">
          {sent ? (
            <div className="contact__success">
              <div className="contact__success-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>{tx.successTitle}</h3>
              <p>{tx.successMsg}</p>
              <button className="contact__success-back" onClick={() => setSent(false)}>{tx.successBack}</button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="form__row">
                <div className="form__field">
                  <label>{tx.nameLabel}</label>
                  <input type="text" name="name" required placeholder={tx.namePh} value={form.name} onChange={handleChange} />
                </div>
                <div className="form__field">
                  <label>{tx.companyLabel}</label>
                  <input type="text" name="company" required placeholder={tx.companyPh} value={form.company} onChange={handleChange} />
                </div>
              </div>
              <div className="form__row">
                <div className="form__field">
                  <label>{tx.emailLabel}</label>
                  <input type="email" name="email" required placeholder={tx.emailPh} value={form.email} onChange={handleChange} />
                </div>
                <div className="form__field">
                  <label>{tx.phoneLabel}</label>
                  <input type="tel" name="phone" placeholder={tx.phonePh} value={form.phone} onChange={handleChange} />
                </div>
              </div>
              <div className="form__row">
                <div className="form__field">
                  <label>{tx.serviceLabel}</label>
                  <select name="service" value={form.service} onChange={handleChange}>
                    <option value="">{tx.servicePh}</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form__field">
                  <label>{tx.sizeLabel}</label>
                  <select name="size" value={form.size} onChange={handleChange}>
                    <option value="">{tx.sizePh}</option>
                    {tx.sizeOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="form__field">
                <label>{tx.messageLabel}</label>
                <textarea name="message" required rows={4} placeholder={tx.messagePh} value={form.message} onChange={handleChange} />
              </div>
              <button type="submit" className="contact__submit" disabled={loading}>
                {loading ? (lang === 'es' ? 'Enviando...' : 'Sending...') : tx.submitBtn}
                {!loading && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
              {error && <p className="form__error">{error}</p>}
              <p className="form__note">{tx.note}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
