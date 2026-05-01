import {
  BUSINESS_EMAIL,
  assertSmtpConfig,
  detailRow,
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

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact email failed:', error);
    return res.status(500).json({ message: 'Could not send contact email.' });
  }
}
