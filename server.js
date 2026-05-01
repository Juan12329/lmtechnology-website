import express from 'express';
import nodemailer from 'nodemailer';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const loadEnv = fileName => {
  const filePath = path.join(__dirname, fileName);
  if (!existsSync(filePath)) return;

  const lines = readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const [key, ...valueParts] = trimmed.split('=');
    if (process.env[key]) continue;
    process.env[key] = valueParts.join('=').replace(/^["']|["']$/g, '');
  }
};

loadEnv('.env');
loadEnv('.env.local');

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '127.0.0.1';
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || 'hello.lmtechnology@gmail.com';
const SMTP_USER = process.env.SMTP_USER || BUSINESS_EMAIL;
const SMTP_PASS = process.env.SMTP_PASS;

app.use(express.json({ limit: '50kb' }));

const copy = {
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

const getCopy = lang => copy[lang] || copy.es;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const isEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());

const sendMail = ({ to, subject, text, html, replyTo }) => transporter.sendMail({
  from: `"LM Technology" <${SMTP_USER}>`,
  to,
  subject,
  text,
  html,
  replyTo: replyTo || BUSINESS_EMAIL,
});

const escapeHtml = value => String(value || '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const detailRow = (label, value) => value
  ? `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`
  : '';

app.post('/api/contact', async (req, res) => {
  if (!SMTP_PASS) {
    return res.status(500).json({ message: 'SMTP_PASS is not configured.' });
  }

  const { form = {}, lang = 'es' } = req.body || {};
  const t = getCopy(lang);

  if (!form.name || !form.company || !isEmail(form.email) || !form.message) {
    return res.status(400).json({ message: 'Missing required contact fields.' });
  }

  const leadHtml = `
    <h2>Nuevo lead desde LM Technology</h2>
    ${detailRow('Nombre', form.name)}
    ${detailRow('Empresa', form.company)}
    ${detailRow('Email', form.email)}
    ${detailRow('Telefono', form.phone)}
    ${detailRow('Servicio', form.service)}
    ${detailRow('Tamano de empresa', form.size)}
    ${detailRow('Mensaje', form.message)}
  `;

  const userHtml = `
    <h2>${escapeHtml(t.contactSubject)}</h2>
    <p>${escapeHtml(t.contactMessage)}</p>
    <p>LM Technology</p>
  `;

  try {
    await Promise.all([
      sendMail({
        to: BUSINESS_EMAIL,
        subject: t.contactLeadSubject,
        html: leadHtml,
        text: `Nuevo lead: ${form.name} - ${form.email} - ${form.company}\n${form.message}`,
        replyTo: form.email,
      }),
      sendMail({
        to: form.email,
        subject: t.contactSubject,
        html: userHtml,
        text: `${t.contactSubject}\n\n${t.contactMessage}\n\nLM Technology`,
      }),
    ]);

    return res.json({ ok: true });
  } catch (error) {
    console.error('Contact email failed:', error);
    return res.status(500).json({ message: 'Could not send contact email.' });
  }
});

app.post('/api/notify', async (req, res) => {
  if (!SMTP_PASS) {
    return res.status(500).json({ message: 'SMTP_PASS is not configured.' });
  }

  const { email, lang = 'es', source = 'free-content' } = req.body || {};
  const t = getCopy(lang);

  if (!isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email.' });
  }

  const sourceLabel = source === 'free-videos' ? 'videos gratuitos' : 'clases gratuitas';

  try {
    await Promise.all([
      sendMail({
        to: BUSINESS_EMAIL,
        subject: t.notifyLeadSubject,
        html: `<h2>Nuevo interesado</h2><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Origen:</strong> ${escapeHtml(sourceLabel)}</p>`,
        text: `Nuevo interesado: ${email}\nOrigen: ${sourceLabel}`,
        replyTo: email,
      }),
      sendMail({
        to: email,
        subject: t.notifySubject,
        html: `<h2>${escapeHtml(t.notifySubject)}</h2><p>${escapeHtml(t.notifyMessage)}</p><p>LM Technology</p>`,
        text: `${t.notifySubject}\n\n${t.notifyMessage}\n\nLM Technology`,
      }),
    ]);

    return res.json({ ok: true });
  } catch (error) {
    console.error('Notification email failed:', error);
    return res.status(500).json({ message: 'Could not send notification email.' });
  }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`LM Technology server running on http://${HOST}:${PORT}`);
});
