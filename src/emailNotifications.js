import emailjs from '@emailjs/browser';

const EMAIL_FROM = 'hello.lmtechnology@gmail.com';

const EJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_9xwu8hl';
const EJS_CONTACT_TEMPLATE = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || 'template_tkrb6us';
const EJS_CONFIRMATION_TEMPLATE = import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID || EJS_CONTACT_TEMPLATE;
const EJS_NOTIFY_TEMPLATE = import.meta.env.VITE_EMAILJS_NOTIFY_TEMPLATE_ID || EJS_CONFIRMATION_TEMPLATE;
const EJS_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'k18wxP9UHyGrOQd3r';

const COPY = {
  es: {
    contactSubject: 'Recibimos tu solicitud para agendar una llamada',
    contactMessage: 'Gracias por contactarnos. Nuestro equipo revisara tu solicitud y te respondera pronto para coordinar la llamada.',
    notifySubject: 'Te avisaremos cuando el contenido gratuito este disponible',
    notifyMessage: 'Gracias por tu interes. Te enviaremos una notificacion a este correo cuando lancemos el contenido gratuito de LM Technology.',
  },
  en: {
    contactSubject: 'We received your request to book a call',
    contactMessage: 'Thanks for contacting us. Our team will review your request and reply soon to coordinate the call.',
    notifySubject: 'We will notify you when the free content is available',
    notifyMessage: 'Thanks for your interest. We will send a notification to this email when LM Technology launches the free content.',
  },
};

const getCopy = lang => COPY[lang] || COPY.es;

const sendEmail = (templateId, params) => emailjs.send(EJS_SERVICE, templateId, {
  from_name: 'LM Technology',
  from_email: EMAIL_FROM,
  reply_to: EMAIL_FROM,
  ...params,
}, EJS_KEY);

export const sendContactNotification = (form, lang) => {
  const copy = getCopy(lang);

  return sendEmail(EJS_CONTACT_TEMPLATE, {
    to_email: form.email,
    user_email: form.email,
    email: form.email,
    name: form.name,
    company: form.company,
    phone: form.phone,
    service: form.service,
    company_size: form.size,
    message: form.message,
    subject: copy.contactSubject,
    confirmation_message: copy.contactMessage,
    form_type: 'contact',
  });
};

export const sendAvailabilityNotification = ({ email, lang, source }) => {
  const copy = getCopy(lang);

  return sendEmail(EJS_NOTIFY_TEMPLATE, {
    to_email: email,
    user_email: email,
    email,
    name: email,
    subject: copy.notifySubject,
    message: copy.notifyMessage,
    confirmation_message: copy.notifyMessage,
    source,
    form_type: 'free_content_notification',
  });
};
