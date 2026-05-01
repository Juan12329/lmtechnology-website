import nodemailer from 'nodemailer';

export const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || 'hello.lmtechnology@gmail.com';
export const SMTP_USER = process.env.SMTP_USER || BUSINESS_EMAIL;
export const SMTP_PASS = process.env.SMTP_PASS;

export const copy = {
  es: {
    contactLeadSubject: 'Nuevo lead para agendar llamada',
    contactSubject: 'Recibimos tu solicitud para agendar una llamada',
    contactMessage: 'Gracias por contactarnos. Nuestro equipo revisara tu solicitud y te respondera pronto para coordinar la llamada.',
    notifyLeadSubject: 'Nuevo interesado en contenido gratuito',
    notifySubject: 'Te avisaremos cuando el contenido gratuito este disponible',
    notifyMessage: 'Gracias por tu interes. Te enviaremos una notificacion a este correo cuando lancemos el contenido gratuito de LM Technology.',
  },
  en: {
    contactLeadSubject: 'New lead to book a call',
    contactSubject: 'We received your request to book a call',
    contactMessage: 'Thanks for contacting us. Our team will review your request and reply soon to coordinate the call.',
    notifyLeadSubject: 'New free content notification signup',
    notifySubject: 'We will notify you when the free content is available',
    notifyMessage: 'Thanks for your interest. We will send a notification to this email when LM Technology launches the free content.',
  },
};

export const getCopy = lang => copy[lang] || copy.es;

export const isEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());

export const escapeHtml = value => String(value || '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

export const detailRow = (label, value) => value
  ? `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`
  : '';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export const assertSmtpConfig = () => {
  if (!SMTP_PASS) {
    throw new Error('SMTP_PASS is not configured.');
  }
};

export const sendMail = ({ to, subject, text, html, replyTo }) => transporter.sendMail({
  from: `"LM Technology" <${SMTP_USER}>`,
  to,
  subject,
  text,
  html,
  replyTo: replyTo || BUSINESS_EMAIL,
});
