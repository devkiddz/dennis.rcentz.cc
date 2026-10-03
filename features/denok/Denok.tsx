'use client';

import Link from 'next/link';
import { ArrowUp, ArrowUpRight, RotateCcw } from 'lucide-react';
import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { denokKnowledge, getKnowledgeEntry, openingSuggestions } from './knowledge';
import { getConversationSnapshot, getServerConversationSnapshot, resetConversation, sendQuestion, subscribeToConversation } from './conversation-store';
import styles from './Denok.module.css';

export function Denok({ embedded = false, visible = true, onContact }: { embedded?: boolean; visible?: boolean; onContact?: () => void }) {
  const { messages, typing, storageAvailable } = useSyncExternalStore(subscribeToConversation, getConversationSnapshot, getServerConversationSnapshot);
  const [question, setQuestion] = useState('');
  const questionId = useId();
  const noteId = useId();
  const headingId = useId();
  const last = messages[messages.length - 1];
  const lastEntry = last?.role === 'denok' && last.entryId ? getKnowledgeEntry(last.entryId) : undefined;
  const followUps = typing ? [] : !messages.length ? openingSuggestions.slice(0, 3) : lastEntry ? (lastEntry.category === 'contact' ? [] : lastEntry.followUps.slice(0, 3)) : ['overview', 'projects', 'contact'];
  const transcript = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight;
  }, [messages, typing, visible]);

  const answer = (text: string, entryId?: string) => {
    if (sendQuestion(text, entryId)) setQuestion('');
  };

  return <div className={`${styles.layout} ${embedded ? styles.embedded : ''}`}>
    <aside className={styles.topics} aria-label="Explore Dennis’s background">
      <p className={styles.label}>Start here</p>
      <button type="button" className={styles.overviewButton} onClick={() => answer('Give me a recruiter overview', 'overview')}>Recruiter overview <ArrowUpRight size={17} aria-hidden="true" /></button>
      <p className={styles.label}>Explore a topic</p>
      <div className={styles.topicList}>{denokKnowledge.filter(entry => entry.id !== 'overview').map(entry => <button key={entry.id} type="button" onClick={() => answer(entry.question, entry.id)}>{entry.question}</button>)}</div>
      <p className={styles.asideNote}>Prefer a conversation with Dennis?<br /><a href="mailto:denngodfirst@gmail.com" target="_blank" rel="noopener noreferrer">denngodfirst@gmail.com</a></p>
    </aside>
    <section className={styles.chat} aria-labelledby={headingId}>
      <div className={styles.chatHeader}><div className={styles.identity}><span className={styles.avatar} aria-hidden="true">D<span>·</span></span><div><h2 id={headingId}>Denok</h2><p>Dennis’s portfolio guide</p></div></div><button className={styles.reset} type="button" aria-label="Clear saved conversation and start again" disabled={!messages.length} onClick={() => { resetConversation(); setQuestion(''); }}><RotateCcw size={17} aria-hidden="true" /><span>Start again</span></button></div>
      <div className={styles.transcript} ref={transcript} role="log" aria-label="Conversation with Denok" aria-live="polite" aria-relevant="additions" tabIndex={0}>
        <div className={styles.assistantMessage}><p>Hi, I’m Denok. Ask me about Dennis, his experience or his projects. If you’re recruiting, I can give you a quick overview.</p></div>
        {messages.map(message => {
          if (message.role === 'visitor') return <div key={message.id} className={styles.visitorMessage}><p>{message.text}</p></div>;
          const entry = message.entryId ? getKnowledgeEntry(message.entryId) : undefined;
          return <div key={message.id} className={styles.assistantMessage}>{entry ? <>{entry.answer.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{entry.id === 'contact' && onContact ? <button type="button" className={styles.inlineContact} onClick={onContact}>Send Dennis a message <ArrowUpRight size={15} aria-hidden="true" /></button> : null}{entry.links?.length ? <div className={styles.answerLinks}>{entry.links.map(link => {
            return <Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={15} aria-hidden="true" /></Link>;
          })}</div> : null}</> : <><p>I don’t have a confident match for that question in Dennis’s portfolio information. Choose a topic below, try a specific project name, or contact Dennis directly.</p>{onContact ? <button type="button" className={styles.inlineContact} onClick={onContact}>Contact Dennis <ArrowUpRight size={15} aria-hidden="true" /></button> : <a className={styles.inlineContact} href="mailto:denngodfirst@gmail.com" target="_blank" rel="noopener noreferrer">Email Dennis</a>}</>}</div>;
        })}
        {typing ? <div className={`${styles.assistantMessage} ${styles.typing}`} role="status" aria-label="Denok is typing"><span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" /></div> : null}
        <div className={styles.suggestions} aria-label="Suggested questions">{followUps.map(id => { const entry = getKnowledgeEntry(id); return entry ? <button type="button" key={id} onClick={() => answer(entry.question, id)}>{entry.question}</button> : null; })}</div>
      </div>
      <div className={styles.composer}>

        <form onSubmit={event => { event.preventDefault(); if (question.trim()) answer(question.trim()); }} className={styles.form}>
          <label htmlFor={questionId} className={styles.inputLabel}>Your question</label>
          <input id={questionId} value={question} onChange={event => setQuestion(event.target.value)} maxLength={300} placeholder="Message Denok…" autoComplete="off" aria-describedby={noteId} />
          <button type="submit" disabled={typing || !question.trim()} aria-label="Send question"><ArrowUp size={19} aria-hidden="true" /></button>
        </form>
        <p className={styles.note} id={noteId}>Automatic replies · {storageAvailable ? 'Chat saved in this browser for up to 30 days · Start again clears it' : 'Browser storage unavailable; chat stays in this session'}</p>
      </div>
    </section>
  </div>;
}
