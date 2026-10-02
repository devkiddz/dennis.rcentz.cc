export type ContactInput = { name: string; email: string; company: string; subject: string; message: string; token: string; requestId: string; consent: true };
export function validateContact(value: unknown): ContactInput | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;
  const field = (key: string, min: number, max: number, multiline = false) => {
    const raw = body[key];
    if (typeof raw !== 'string') return null;
    const text = raw.trim();
    if (text.length < min || text.length > max || (multiline ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/ : /[\u0000-\u001f\u007f]/).test(text)) return null;
    return text;
  };
  const name = field('name', 2, 80);
  const email = field('email', 3, 254);
  const company = field('company', 0, 120);
  const subject = field('subject', 3, 160);
  const message = field('message', 20, 4000, true);
  const token = field('token', 1, 2048);
  const requestId = field('requestId', 36, 36);
  if (name === null || !email || !/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,}$/.test(email) || company === null || !subject || !message || !token || !requestId || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(requestId) || body.consent !== true) return null;
  return { name, email, company, subject, message, token, requestId, consent: true };
}
