import { denokKnowledge, getKnowledgeEntry } from './knowledge';

export type QuestionMatch = {
  kind: 'answer' | 'clarify' | 'unknown';
  entryId?: string;
  suggestionIds: string[];
};

const stopWords = new Set(('a an the is are was were does do did his he her him it its what who which how can could would will i me my you your yours please tell about give show to of for and has have with in on at some any know want wants need needs looking dennis okaro jones kind kinds type types').split(' '));
const synonyms: Record<string, string> = {
  websites: 'website', sites: 'website', site: 'website', webpages: 'website',
  builds: 'build', building: 'build', develop: 'build', develops: 'build', developing: 'build', create: 'build', creates: 'build', make: 'build',
  services: 'service', offerings: 'service', offers: 'offer', provide: 'offer', provides: 'offer',
  apps: 'app', applications: 'app', application: 'app',
  qualifications: 'qualification', certificates: 'certification', certifications: 'certification', certificate: 'certification',
  technologies: 'technology', tools: 'technology', skills: 'skill',
  ecommerce: 'commerce', shops: 'store', stores: 'store', shop: 'store',
  prices: 'pricing', price: 'pricing', cost: 'pricing', costs: 'pricing', charge: 'pricing', charges: 'pricing', budget: 'pricing',
  jobs: 'job', projects: 'project', portfolios: 'portfolio',
};
const normalize = (value: string) => value.toLowerCase().normalize('NFKD')
  .replace(/[’']/g, '').replace(/\b(?:denis|dennnis)\b/g, 'dennis').replace(/next\.?\s*js/g, 'nextjs')
  .replace(/web\s+sites?/g, 'website').replace(/e[ -]commerce/g, 'ecommerce')
  .replace(/[^a-z0-9]+/g, ' ').trim();
const canonical = (word: string) => synonyms[word] ?? word;
const words = (value: string) => [...new Set(normalize(value).split(' ').filter(word => word && !stopWords.has(word)).map(canonical))];
const vocabulary = [...new Set(denokKnowledge.flatMap(entry => [entry.question, ...entry.aliases].flatMap(words)))];

// A small bounded edit distance supports insertions, deletions and transpositions.
function distance(a: string, b: string) {
  const rows = Array.from({ length: a.length + 1 }, () => Array<number>(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) rows[i][0] = i;
  for (let j = 0; j <= b.length; j++) rows[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
    rows[i][j] = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + Number(a[i - 1] !== b[j - 1]));
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) rows[i][j] = Math.min(rows[i][j], rows[i - 2][j - 2] + 1);
  }
  return rows[a.length][b.length];
}
function correct(word: string) {
  if (vocabulary.includes(word) || word.length < 4 || word.length > 30) return word;
  const limit = word.length >= 8 ? 2 : 1;
  const candidates = vocabulary.filter(candidate => Math.abs(candidate.length - word.length) <= limit)
    .map(candidate => ({ candidate, edits: distance(word, candidate) })).filter(item => item.edits <= limit)
    .sort((a, b) => a.edits - b.edits);
  // Ambiguous spelling corrections are left alone; they must not redirect a question.
  return candidates[0] && (!candidates[1] || candidates[0].edits < candidates[1].edits) ? candidates[0].candidate : word;
}
const generalSuggestions = ['services', 'projects', 'identity'];
function answer(id: string): QuestionMatch {
  const entry = getKnowledgeEntry(id);
  return { kind: 'answer', entryId: id, suggestionIds: entry?.category === 'contact' ? [] : (entry?.followUps ?? []).filter(id => getKnowledgeEntry(id)).slice(0, 3) };
}

export function interpretQuestion(question: string, previousEntryId?: string): QuestionMatch {
  const text = normalize(question.slice(0, 300));
  if (!text) return { kind: 'unknown', suggestionIds: generalSuggestions };
  const exact = denokKnowledge.find(entry => [entry.question, ...entry.aliases].some(alias => normalize(alias) === text));
  if (exact) return answer(exact.id);
  const query = [...new Set(words(text).map(correct).filter(word => !stopWords.has(word)))];
  // Unknown commercial details are directed to Dennis, never invented.
  if (!/\b(stock|stocks|crypto|bitcoin|predict|predicts|forecast)\b/.test(text) && query.some(word => ['pricing', 'salary', 'rates', 'availability', 'available', 'quote'].includes(word))) return answer('contact');
  if (/^(and |also |what about |how about )?(that|this|it|those|them)$/.test(text) && previousEntryId) {
    const previous = getKnowledgeEntry(previousEntryId);
    return { kind: 'clarify', suggestionIds: (previous?.followUps ?? generalSuggestions).filter(id => getKnowledgeEntry(id)).slice(0, 3) };
  }
  if (query.length && query.every(word => ['website', 'app', 'build', 'service', 'offer'].includes(word)) && query.some(word => ['website', 'app', 'service'].includes(word))) return answer('services');
  if (!query.length) return { kind: 'unknown', suggestionIds: generalSuggestions };
  const ranked = denokKnowledge.map(entry => {
    let score = 0, coverage = 0, overlap = 0;
    for (const alias of [entry.question, ...entry.aliases]) {
      const reference = words(alias);
      if (!reference.length) continue;
      const hits = query.filter(word => reference.includes(word)).length;
      const recall = hits / query.length;
      const value = .7 * recall + .3 * hits / reference.length;
      if (value > score) { score = value; coverage = recall; overlap = hits; }
    }
    return { entry, score, coverage, overlap };
  }).filter(item => item.overlap > 0).sort((a, b) => b.score - a.score);
  const best = ranked[0], second = ranked[1];
  const uncertain = query.some(word => ['not', 'never', 'except', 'versus', 'vs', 'or'].includes(word));
  if (!uncertain && best && best.score >= .82 && best.coverage >= .8 && (!second || best.score - second.score >= .12)) return answer(best.entry.id);
  const relevant = ranked.filter(item => item.score >= .35 && item.coverage >= .25).slice(0, 3).map(item => item.entry.id);
  return relevant.length ? { kind: 'clarify', suggestionIds: relevant } : { kind: 'unknown', suggestionIds: generalSuggestions };
}

// Preserve the original entry-returning API for any existing caller.
export function matchQuestion(question: string) {
  const result = interpretQuestion(question);
  return result.entryId ? getKnowledgeEntry(result.entryId) : undefined;
}
