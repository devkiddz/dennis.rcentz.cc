'use client';

import { ArrowLeft, Bot, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ContactForm } from '@/features/contact/ContactForm';
import { Denok } from './Denok';
import styles from './DenokWidget.module.css';

type Point = { x: number; y: number };
type Anchor = { left: number; right: number; top: number; bottom: number };
type Drag = { pointer: number; x: number; y: number; start: Point; kind: 'launcher' | 'panel'; width: number; height: number };
const clamp = (value: number, maximum: number) => Math.max(8, Math.min(value, Math.max(8, maximum)));

export function DenokWidget() {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [contact, setContact] = useState(false);
  const [launcherPosition, setLauncherPosition] = useState<Point | null>(null);
  const [panelPosition, setPanelPosition] = useState<Point | null>(null);
  const panel = useRef<HTMLElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const drag = useRef<Drag | null>(null);
  const suppressClick = useRef(false);

  const positionPanel = (anchor: Anchor): Point => {
    const width = Math.min(400, window.innerWidth - 24);
    const height = Math.min(624, window.innerHeight - 96);
    const above = anchor.top - height - 12;
    const below = anchor.bottom + 12;
    return { x: clamp(anchor.right - width, window.innerWidth - width - 8), y: clamp(above >= 8 ? above : below + height <= window.innerHeight - 8 ? below : 8, window.innerHeight - height - 8) };
  };

  useEffect(() => {
    const show = (event: Event) => {
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const source = (event as CustomEvent<{ anchor?: Anchor }>).detail?.anchor;
      const anchor = source ?? launcher.current?.getBoundingClientRect();
      if (source) setLauncherPosition({ x: clamp(source.right - 52, window.innerWidth - 60), y: clamp(source.bottom - 52, window.innerHeight - 60) });
      if (anchor) setPanelPosition(positionPanel(anchor));
      setStarted(true);
      setOpen(true);
    };
    window.addEventListener('denok:open', show);
    return () => window.removeEventListener('denok:open', show);
  }, []);

  useEffect(() => { if (open) closeButton.current?.focus(); }, [open]);
  useEffect(() => {
    const resize = () => {
      drag.current = null;
      setLauncherPosition(point => point ? { x: clamp(point.x, window.innerWidth - 60), y: clamp(point.y, window.innerHeight - 60) } : null);
      setPanelPosition(point => point ? { x: clamp(point.x, window.innerWidth - Math.min(400, window.innerWidth - 24) - 8), y: clamp(point.y, window.innerHeight - Math.min(624, window.innerHeight - 96) - 8) } : null);
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const close = () => {
    setOpen(false);
    if (opener.current?.isConnected) opener.current.focus();
    else launcher.current?.focus();
  };
  const move = (event: React.PointerEvent<HTMLElement>) => {
    const active = drag.current;
    if (!active || active.pointer !== event.pointerId) return;
    const dx = event.clientX - active.x;
    const dy = event.clientY - active.y;
    if (active.kind === 'launcher' && Math.hypot(dx, dy) > 6) suppressClick.current = true;
    const point = { x: clamp(active.start.x + dx, window.innerWidth - active.width - 8), y: clamp(active.start.y + dy, window.innerHeight - active.height - 8) };
    if (active.kind === 'panel') setPanelPosition(point);
    else {
      setLauncherPosition(point);
      if (open) setPanelPosition(positionPanel({ left: point.x, right: point.x + 52, top: point.y, bottom: point.y + 52 }));
    }
  };
  const end = () => { drag.current = null; };

  return <div className={styles.widget} style={launcherPosition ? { left: launcherPosition.x, top: launcherPosition.y, right: 'auto', bottom: 'auto' } : undefined}>
    {started ? <section id="denok-livechat" ref={panel} style={panelPosition ? { left: panelPosition.x, top: panelPosition.y } : undefined} className={styles.panel} hidden={!open} role="dialog" aria-labelledby="denok-widget-title" onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); close(); } }}>
      <div className={styles.topBar} title="Drag to move chat" onPointerDown={event => {
        if (event.button !== 0 || (event.target as Element).closest('button') || !panel.current) return;
        const rect = panel.current.getBoundingClientRect();
        drag.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY, start: { x: rect.left, y: rect.top }, kind: 'panel', width: rect.width, height: rect.height };
        event.currentTarget.setPointerCapture(event.pointerId);
        event.preventDefault();
      }} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={end}>
        <div><h2 id="denok-widget-title">{contact ? 'Contact Dennis' : 'Ask Denok'}</h2><p>{contact ? 'Send a private enquiry' : 'Portfolio assistant · Automatic replies'}</p></div>
        <button type="button" ref={closeButton} onClick={close} aria-label="Close Denok chat"><X size={19} aria-hidden="true" /></button>
      </div>
      <div className={styles.chatBody} hidden={contact}><Denok embedded visible={open && !contact} onContact={() => setContact(true)} /></div>
      {contact ? <div className={styles.contactBody}><button className={styles.back} type="button" onClick={() => setContact(false)}><ArrowLeft size={15} aria-hidden="true" /> Back to chat</button><ContactForm compact /></div> : null}
    </section> : null}
    <button type="button" ref={launcher} className={styles.launcher} title="Drag to move · Click to chat" aria-label={open ? 'Close Denok chat' : 'Chat with Denok; drag to move'} aria-expanded={open} aria-controls={started ? 'denok-livechat' : undefined} aria-haspopup="dialog"
      onPointerDown={event => {
        if (event.button !== 0) return;
        suppressClick.current = false;
        const rect = event.currentTarget.getBoundingClientRect();
        drag.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY, start: { x: rect.left, y: rect.top }, kind: 'launcher', width: rect.width, height: rect.height };
        event.currentTarget.setPointerCapture(event.pointerId);
      }} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={end}
      onClick={event => {
        if (suppressClick.current) { suppressClick.current = false; return; }
        if (open) close();
        else { opener.current = event.currentTarget; setPanelPosition(positionPanel(event.currentTarget.getBoundingClientRect())); setStarted(true); setOpen(true); }
      }}>
      {open ? <X size={21} aria-hidden="true" /> : <Bot size={26} aria-hidden="true" />}
    </button>
  </div>;
}
