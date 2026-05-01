import {
  BUSINESS_EMAIL,
  assertSmtpConfig,
  escapeHtml,
  getCopy,
  isEmail,
  sendMail,
} from './mail.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  try {
    assertSmtpConfig();
  } catch (error) {
    return res.status(500).json({ message: error.message });
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

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Notification email failed:', error);
    return res.status(500).json({ message: 'Could not send notification email.' });
  }
}
