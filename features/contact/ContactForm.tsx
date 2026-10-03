'use client';

import Script from 'next/script';
import { useEffect, useId, useRef, useState } from 'react';
import styles from './Contact.module.css';

type Turnstile = { render: (container: HTMLElement, options: { sitekey: string; action: string; theme: string; size: string; callback: (token: string) => void; 'expired-callback': () => void; 'error-callback': () => void }) => string; remove: (id: string) => void; reset: (id: string) => void };
declare global { interface Window { turnstile?: Turnstile } }
type Config = { enabled: boolean; siteKey: string };

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const prefix = useId();
  const [config, setConfig] = useState<Config | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [token, setToken] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const challenge = useRef<HTMLDivElement>(null);
  const widget = useRef<string | undefined>(undefined);
  const sendingRef = useRef(false);
  const requestId = useRef<string | undefined>(undefined);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/contact', { cache: 'no-store', signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error('configuration');
      const value = await response.json() as Config;
      setConfig({ enabled: value.enabled === true, siteKey: typeof value.siteKey === 'string' ? value.siteKey : '' });
    }).catch(() => { if (!controller.signal.aborted) setConfig({ enabled: false, siteKey: '' }); });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!scriptReady || !config?.enabled || !challenge.current || !window.turnstile) return;
    const api = window.turnstile;
    widget.current = api.render(challenge.current, { sitekey: config.siteKey, action: 'contact', theme: 'auto', size: 'flexible', callback: setToken, 'expired-callback': () => setToken(''), 'error-callback': () => { setToken(''); setResult({ success: false, message: 'Verification could not load. Please retry or email Dennis.' }); } });
    return () => { if (widget.current) api.remove(widget.current); widget.current = undefined; };
  }, [scriptReady, config]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sendingRef.current || !token || !config?.enabled) return;
    sendingRef.current = true;
    setSending(true);
    setResult(null);
    const data = new FormData(event.currentTarget);
    requestId.current ??= crypto.randomUUID();
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: data.get('name'), email: data.get('email'), company: data.get('company'), subject: data.get('subject'), message: data.get('message'), website: data.get('website'), consent: data.get('consent') === 'on', token, requestId: requestId.current }), signal: AbortSignal.timeout(40000) });
      const body = await response.json() as { message?: string };
      setResult({ success: response.ok, message: body.message ?? 'Your message could not be sent. Please email Dennis.' });
      if (response.ok) { form.current?.reset(); requestId.current = undefined; }
    } catch { setResult({ success: false, message: 'The connection failed. Please retry or email denngodfirst@gmail.com.' }); }
    finally {
      sendingRef.current = false;
      setSending(false);
      setToken('');
      if (widget.current) window.turnstile?.reset(widget.current);
    }
  };

  return <div className={compact ? styles.compact : styles.formSurface}>
    {config?.enabled ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => setScriptReady(true)} onError={() => setResult({ success: false, message: 'Verification is unavailable. Please email Dennis directly.' })} /> : null}
    <form ref={form} onSubmit={submit} className={styles.form}>
      <div className={styles.fields}>
        <div><label htmlFor={`${prefix}-name`}>Your name</label><input id={`${prefix}-name`} name="name" required minLength={2} maxLength={80} autoComplete="name" /></div>
        <div><label htmlFor={`${prefix}-email`}>Email address</label><input id={`${prefix}-email`} name="email" type="email" required maxLength={254} autoComplete="email" /></div>
        <div className={styles.full}><label htmlFor={`${prefix}-company`}>Company name <span>(optional)</span></label><input id={`${prefix}-company`} name="company" maxLength={120} autoComplete="organization" /></div>
        <div className={styles.full}><label htmlFor={`${prefix}-subject`}>Subject</label><input id={`${prefix}-subject`} name="subject" required minLength={3} maxLength={160} /></div>
        <div className={styles.full}><label htmlFor={`${prefix}-message`}>Message</label><textarea id={`${prefix}-message`} name="message" required minLength={20} maxLength={4000} rows={compact ? 4 : 6} placeholder="Tell me about the role, project or conversation you have in mind." /></div>
      </div>
      <div className={styles.honeypot} aria-hidden="true"><label htmlFor={`${prefix}-website`}>Leave this field empty</label><input id={`${prefix}-website`} name="website" tabIndex={-1} autoComplete="off" /></div>
      <label className={styles.consent}><input type="checkbox" name="consent" required /> <span>I agree to Dennis using these details to respond to my enquiry.</span></label>
      {config?.enabled ? <div ref={challenge} className={styles.challenge} /> : <p className={styles.notice}>{config ? <>The form is being set up. You can email <a href="mailto:denngodfirst@gmail.com">denngodfirst@gmail.com</a> directly.</> : 'Loading contact form…'}</p>}
      <button type="submit" disabled={sending || !token || !config?.enabled} className={styles.submit}>{sending ? 'Sending…' : 'Send message'}</button>
      {result ? <p role="status" className={styles.notice} data-success={result.success}>{result.message}</p> : null}
      <p className={styles.privacy}>Used to respond to your enquiry. Verification by Cloudflare; delivery by Resend.</p>
    </form>
  </div>;
}
