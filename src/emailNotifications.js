const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const apiUrl = (path) => `${API_BASE_URL}${path}`;

const postJson = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Email request failed');
  }

  return response.json();
};

export const sendContactNotification = (form, lang) => postJson(apiUrl('/api/contact'), {
  form,
  lang,
});

export const sendAvailabilityNotification = ({ email, lang, source }) => postJson(apiUrl('/api/notify'), {
  email,
  lang,
  source,
});
