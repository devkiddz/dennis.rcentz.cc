import { denokKnowledge } from './knowledge';

const stopWords = new Set(['a', 'an', 'the', 'is', 'are', 'was', 'does', 'do', 'his', 'he', 'her', 'it', 'what', 'who', 'which', 'how', 'can', 'i', 'me', 'my', 'you', 'your', 'please', 'tell', 'about', 'give', 'show', 'to', 'of', 'for', 'and', 'has', 'have']);
const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const tokens = (value: string) => normalize(value).split(' ').filter(word => word && !stopWords.has(word));

export function matchQuestion(question: string) {
  const normalized = normalize(question);
  if (!normalized) return undefined;
  const exact = denokKnowledge.find(entry => [entry.question, ...entry.aliases].some(alias => normalize(alias) === normalized));
  if (exact) return exact;
  const query = [...new Set(tokens(question))];
  if (!query.length) return undefined;
  const scores = denokKnowledge.map(entry => {
    const score = Math.max(...[entry.question, ...entry.aliases].map(alias => {
      const words = new Set(tokens(alias));
      if (!words.size) return 0;
      const overlap = query.filter(word => words.has(word)).length;
      return overlap === query.length ? overlap / Math.max(words.size, query.length) : 0;
    }));
    return { entry, score };
  }).sort((a, b) => b.score - a.score);
  return scores[0].score >= .75 && scores[0].score > scores[1].score ? scores[0].entry : undefined;
}
