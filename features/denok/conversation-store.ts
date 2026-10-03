'use client';

import { getKnowledgeEntry } from './knowledge';
import { matchQuestion } from './match-question';

export type Message = { id: number; role: 'visitor'; text: string } | { id: number; role: 'denok'; entryId?: string };
type Snapshot = { messages: Message[]; typing: boolean; storageAvailable: boolean };
const storageKey = 'dennis.denok.conversation.v1';
const retention = 30 * 24 * 60 * 60 * 1000;
const empty: Snapshot = { messages: [], typing: false, storageAvailable: true };
let snapshot = empty;
let loaded = false;
let nextId = 0;
let replyTimer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();
let watchingStorage = false;

// Only bounded chat messages are stored. Contact-form fields and credentials never enter this store.
export function parseConversation(raw: string | null, now = Date.now()): Message[] {
  if (!raw || raw.length > 20000) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== 'object') return [];
    const value = data as { version?: unknown; updatedAt?: unknown; messages?: unknown };
    if (value.version !== 1 || typeof value.updatedAt !== 'number' || value.updatedAt > now || now - value.updatedAt > retention || !Array.isArray(value.messages) || value.messages.length > 40) return [];
    const messages: Message[] = [];
    let previous = -1;
    for (const item of value.messages) {
      if (!item || typeof item !== 'object') return [];
      const message = item as { id?: unknown; role?: unknown; text?: unknown; entryId?: unknown };
      if (typeof message.id !== 'number' || !Number.isSafeInteger(message.id) || message.id <= previous) return [];
      previous = message.id;
      if (message.role === 'visitor' && typeof message.text === 'string' && message.text.trim() && message.text.length <= 300) messages.push({ id: message.id, role: 'visitor', text: message.text });
      else if (message.role === 'denok' && (message.entryId === undefined || typeof message.entryId === 'string')) messages.push({ id: message.id, role: 'denok', entryId: typeof message.entryId === 'string' && getKnowledgeEntry(message.entryId) ? message.entryId : undefined });
      else return [];
    }
    return messages;
  } catch { return []; }
}

function emit() { listeners.forEach(listener => listener()); }
function persist() {
  try {
    if (snapshot.messages.length) window.localStorage.setItem(storageKey, JSON.stringify({ version: 1, updatedAt: Date.now(), messages: snapshot.messages }));
    else window.localStorage.removeItem(storageKey);
  } catch { snapshot = { ...snapshot, storageAvailable: false }; }
}
function load() {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;
  try {
    const messages = parseConversation(window.localStorage.getItem(storageKey));
    snapshot = { messages, typing: false, storageAvailable: true };
    nextId = messages.length ? messages[messages.length - 1].id + 1 : 0;
  } catch { snapshot = { ...empty, storageAvailable: false }; }
}
function scheduleReply(visitor: Extract<Message, { role: 'visitor' }>, entryId?: string) {
  const entry = entryId ? getKnowledgeEntry(entryId) : matchQuestion(visitor.text);
  snapshot = { ...snapshot, typing: true };
  emit();
  const delay = 1800 + Math.min(2000, (entry?.answer.join(' ').length ?? 300) * 3);
  replyTimer = setTimeout(() => {
    // A reset or a newer restored conversation must not receive a stale reply.
    if (snapshot.messages[snapshot.messages.length - 1]?.id !== visitor.id) return;
    const reply: Message = { id: nextId++, role: 'denok', entryId: entry?.id };
    snapshot = { ...snapshot, messages: [...snapshot.messages, reply].slice(-40), typing: false };
    persist();
    emit();
  }, delay);
}
export function getConversationSnapshot() {
  if (typeof window === 'undefined') return empty;
  load();
  return snapshot;
}
export function getServerConversationSnapshot() { return empty; }
function onStorage(event: StorageEvent) {
  if (event.key !== storageKey && event.key !== null) return;
  clearTimeout(replyTimer);
  const messages = parseConversation(event.newValue);
  snapshot = { messages, typing: false, storageAvailable: true };
  nextId = messages.length ? messages[messages.length - 1].id + 1 : 0;
  const last = messages[messages.length - 1];
  if (last?.role === 'visitor') scheduleReply(last);
  else emit();
}
export function subscribeToConversation(listener: () => void) {
  load();
  listeners.add(listener);
  if (!watchingStorage) { window.addEventListener('storage', onStorage); watchingStorage = true; }
  const last = snapshot.messages[snapshot.messages.length - 1];
  if (!snapshot.typing && last?.role === 'visitor') scheduleReply(last);
  return () => {
    listeners.delete(listener);
    if (!listeners.size && watchingStorage) { window.removeEventListener('storage', onStorage); watchingStorage = false; }
  };
}
export function sendQuestion(text: string, entryId?: string) {
  load();
  const question = text.trim().slice(0, 300);
  if (!question || snapshot.typing) return false;
  const visitor: Message = { id: nextId++, role: 'visitor', text: question };
  snapshot = { ...snapshot, messages: [...snapshot.messages, visitor].slice(-40) };
  persist();
  scheduleReply(visitor, entryId);
  return true;
}
export function resetConversation() {
  clearTimeout(replyTimer);
  nextId = 0;
  snapshot = { ...empty, storageAvailable: snapshot.storageAvailable };
  persist();
  emit();
}
