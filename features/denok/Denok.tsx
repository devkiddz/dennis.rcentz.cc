'use client';

import Link from 'next/link';
import { ArrowUp, ArrowUpRight, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { denokKnowledge, getKnowledgeEntry, openingSuggestions } from './knowledge';
import { matchQuestion } from './match-question';
import styles from './Denok.module.css';

type Message = { id: number; role: 'visitor'; text: string } | { id: number; role: 'denok'; entryId?: string };

export function Denok({ embedded = false, visible = true, onContact }: { embedded?: boolean; visible?: boolean; onContact?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState('');
  const [followUps, setFollowUps] = useState(openingSuggestions.slice(0, 3));
  const [typing, setTyping] = useState(false);
  const pending = useRef(false);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const nextMessageId = useRef(0);
  const transcript = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight;
  }, [messages, typing, visible]);

  useEffect(() => () => { clearTimeout(replyTimer.current); }, []);

  const answer = (text: string, entryId?: string) => {
    if (pending.current) return;
    pending.current = true;
    const entry = entryId ? getKnowledgeEntry(entryId) : matchQuestion(text);
    const visitor: Message = { id: nextMessageId.current++, role: 'visitor', text };
    const reply: Message = { id: nextMessageId.current++, role: 'denok', entryId: entry?.id };
    setMessages(current => [...current, visitor].slice(-40));
    setFollowUps([]);
    setTyping(true);
    setQuestion('');
    const delay = 1800 + Math.min(2000, (entry?.answer.join(' ').length ?? 300) * 3);
    replyTimer.current = setTimeout(() => {
      setMessages(current => [...current, reply].slice(-40));
      setFollowUps(entry ? (entry.category === 'contact' ? [] : entry.followUps.slice(0, 3)) : ['overview', 'projects', 'contact']);
      pending.current = false;
      setTyping(false);
    }, delay);
  };

  return <div className={`${styles.layout} ${embedded ? styles.embedded : ''}`}>
    <aside className={styles.topics} aria-label="Explore Dennis’s background">
      <p className={styles.label}>Start here</p>
      <button type="button" className={styles.overviewButton} onClick={() => answer('Give me a recruiter overview', 'overview')}>Recruiter overview <ArrowUpRight size={17} aria-hidden="true" /></button>
      <p className={styles.label}>Explore a topic</p>
      <div className={styles.topicList}>{denokKnowledge.filter(entry => entry.id !== 'overview').map(entry => <button key={entry.id} type="button" onClick={() => answer(entry.question, entry.id)}>{entry.question}</button>)}</div>
      <p className={styles.asideNote}>Prefer a conversation with Dennis?<br /><a href="mailto:dennis@rcentz.cc">dennis@rcentz.cc</a></p>
    </aside>
    <section className={styles.chat} aria-labelledby="denok-chat-heading">
      <div className={styles.chatHeader}><div className={styles.identity}><span className={styles.avatar} aria-hidden="true">D<span>·</span></span><div><h2 id="denok-chat-heading">Denok</h2><p>Dennis’s portfolio guide</p></div></div><button className={styles.reset} type="button" aria-label="Start a new conversation" disabled={!messages.length} onClick={() => { clearTimeout(replyTimer.current); pending.current = false; setTyping(false); setMessages([]); setQuestion(''); setFollowUps(openingSuggestions.slice(0, 3)); }}><RotateCcw size={17} aria-hidden="true" /><span>Start again</span></button></div>
      <div className={styles.transcript} ref={transcript} role="log" aria-label="Conversation with Denok" aria-live="polite" aria-relevant="additions" tabIndex={0}>
        <div className={styles.assistantMessage}><p>Hi, I’m Denok. Ask me about Dennis, his experience or his projects. If you’re recruiting, I can give you a quick overview.</p></div>
        {messages.map(message => {
          if (message.role === 'visitor') return <div key={message.id} className={styles.visitorMessage}><p>{message.text}</p></div>;
          const entry = message.entryId ? getKnowledgeEntry(message.entryId) : undefined;
          return <div key={message.id} className={styles.assistantMessage}>{entry ? <>{entry.answer.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{entry.id === 'contact' && onContact ? <button type="button" className={styles.inlineContact} onClick={onContact}>Send Dennis a message <ArrowUpRight size={15} aria-hidden="true" /></button> : null}{entry.links?.length ? <div className={styles.answerLinks}>{entry.links.map(link => {
            const external = link.href.startsWith('https://');
            return <Link key={link.href} href={link.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{link.label}<ArrowUpRight size={15} aria-hidden="true" /></Link>;
          })}</div> : null}</> : <><p>I don’t have a confident match for that question in Dennis’s portfolio information. Choose a topic below, try a specific project name, or contact Dennis directly.</p>{onContact ? <button type="button" className={styles.inlineContact} onClick={onContact}>Contact Dennis <ArrowUpRight size={15} aria-hidden="true" /></button> : <a className={styles.inlineContact} href="mailto:dennis@rcentz.cc">Email Dennis</a>}</>}</div>;
        })}
        {typing ? <div className={`${styles.assistantMessage} ${styles.typing}`} role="status" aria-label="Denok is typing"><span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" /></div> : null}
        <div className={styles.suggestions} aria-label="Suggested questions">{followUps.map(id => { const entry = getKnowledgeEntry(id); return entry ? <button type="button" key={id} onClick={() => answer(entry.question, id)}>{entry.question}</button> : null; })}</div>
      </div>
      <div className={styles.composer}>

        <form onSubmit={event => { event.preventDefault(); if (question.trim()) answer(question.trim()); }} className={styles.form}>
          <label htmlFor="denok-question" className={styles.inputLabel}>Your question</label>
          <input id="denok-question" value={question} onChange={event => setQuestion(event.target.value)} maxLength={300} placeholder="Message Denok…" autoComplete="off" aria-describedby="denok-note" />
          <button type="submit" disabled={typing || !question.trim()} aria-label="Send question"><ArrowUp size={19} aria-hidden="true" /></button>
        </form>
        <p className={styles.note} id="denok-note">Automatic replies · Portfolio information</p>
      </div>
    </section>
  </div>;
}
