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

export const sendContactNotification = (form, lang) => postJson('/api/contact', {
  form,
  lang,
});

export const sendAvailabilityNotification = ({ email, lang, source }) => postJson('/api/notify', {
  email,
  lang,
  source,
});
