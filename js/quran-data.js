/**
 * Quran Data Service
 * Fetches verses (with word-by-word translations) from the quran.com v4 API,
 * and morphology/root data from local static JSON (Quranic Arabic Corpus).
 */

const QuranData = {
  apiBase: 'https://api.quran.com/api/v4',
  wordAudioBase: 'https://audio.qurancdn.com/',

  // The app is self-contained. Essential legacy data (tajweed rule ranges,
  // i'rab morphology tables) is bundled in-project under data/; large media
  // (mushaf page scans, i'rab dependency-graph images) load cross-origin from
  // the original site as plain <img>, which needs no CORS.
  legacyImgBase: 'https://learn-quran-bd.web.app',   // external images only
  // Bundled data is always present → legacy features are always available.
  async legacyAvailable() { return true; },

  // Default verse-translation resource per UI language (quran.com resource IDs)
  TRANSLATION_IDS: {
    en: 20,   // Saheeh International (id 131 was deprecated by quran.com → returned no text)
    bn: 161,  // Taisirul Quran
    fr: 31,   // Muhammad Hamidullah
    id: 33,   // Indonesian Islamic Affairs Ministry
    ur: 234,  // Fatah Muhammad Jalandhari
    tr: 77,   // Diyanet
    ar: null, // Arabic UI: no translation needed
    es: 83,   // Sheikh Isa Garcia (Spanish)
    ru: 45,   // Elmir Kuliev (Russian)
    fa: 29,   // Hussein Taji Kal Dari (Persian)
    hi: 122,  // Maulana Azizul Haque al-Umari (Hindi)
    de: 27,   // Frank Bubenheim and Nadeem (German)
    ms: 39,   // Abdullah Muhammad Basmeih (Malay)
    zh: 56,   // Ma Jian (Chinese, Simplified)
    ja: 35    // Ryoichi Mita (Japanese)
  },

  // Languages with real word-by-word translations on quran.com.
  // Others (e.g. fr) fall back to English word meanings.
  WBW_LANGS: ['en', 'bn', 'ur', 'id', 'tr', 'fa', 'ru', 'de', 'ta', 'ml', 'hi'],

  _morphCache: {},
  _rootsPromise: null,
  _verseCache: {},
  _pageCache: {},

  wbwLang(lang) {
    // Optional user override from the settings drawer
    const override = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('wbwLang') : null;
    if (override && this.WBW_LANGS.includes(override)) return override;
    return this.WBW_LANGS.includes(lang) ? lang : 'en';
  },

  translationId(lang) {
    const override = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('trId_' + lang) : null;
    if (override) return override;
    // A language present in the map with a null id (e.g. Arabic UI) means "no
    // translation line"; only genuinely-missing languages fall back to English.
    if (lang in this.TRANSLATION_IDS) return this.TRANSLATION_IDS[lang];
    return this.TRANSLATION_IDS.en;
  },

  /**
   * Fetch a contiguous range of ayahs from one surah, with words + translation.
   * @returns {Promise<Array>} normalized verse objects
   */
  async fetchRange(surah, startAyah, endAyah, lang) {
    const variant = `${this.translationId(lang)}:${this.wbwLang(lang)}`;
    const cacheKey = `${surah}:${startAyah}-${endAyah}:${lang}:${variant}`;
    if (this._verseCache[cacheKey]) return this._verseCache[cacheKey];

    const perPage = 50;
    const firstPage = Math.floor((startAyah - 1) / perPage) + 1;
    const lastPage = Math.floor((endAyah - 1) / perPage) + 1;
    const pages = [];
    for (let p = firstPage; p <= lastPage; p++) pages.push(p);

    const trId = this.translationId(lang);
    const params =
      `words=true&language=${this.wbwLang(lang)}` +
      `&word_fields=text_uthmani` +
      (trId ? `&translations=${trId}` : '') +   // Arabic UI: no translation line
      `&fields=text_uthmani&per_page=${perPage}`;

    // Page-level cache: many small ranges in the same surah (topic/dua/story
    // collections) share 50-verse API pages, so fetch each page only once.
    const results = await Promise.all(pages.map(p => {
      const pageKey = `${surah}:${p}:${lang}:${trId}:${this.wbwLang(lang)}`;
      if (!this._pageCache[pageKey]) {
        this._pageCache[pageKey] = fetch(`${this.apiBase}/verses/by_chapter/${surah}?${params}&page=${p}`)
          .then(r => {
            if (!r.ok) throw new Error(`API request failed (${r.status})`);
            return r.json();
          })
          .catch(err => { delete this._pageCache[pageKey]; throw err; });
      }
      return this._pageCache[pageKey];
    }));

    const verses = results
      .flatMap(r => r.verses || [])
      .filter(v => v.verse_number >= startAyah && v.verse_number <= endAyah)
      .map(v => this.normalizeVerse(surah, v));

    this._verseCache[cacheKey] = verses;
    return verses;
  },

  normalizeVerse(surah, v) {
    const surahInfo = getSurahByNumber(surah);
    return {
      surah: surah,
      ayah: v.verse_number,
      key: `${surah}:${v.verse_number}`,
      arabic: v.text_uthmani,
      translation: this.stripFootnotes(v.translations?.[0]?.text || ''),
      juz: v.juz_number || 0,
      page: v.page_number || 0,
      surahName: surahInfo?.names?.en || '',
      surahArabicName: surahInfo?.arabicName || '',
      words: (v.words || [])
        .filter(w => w.char_type_name === 'word')
        .map(w => ({
          position: w.position,
          arabic: w.text_uthmani || w.text,
          translit: w.transliteration?.text || '',
          meaning: w.translation?.text || '',
          audio: w.audio_url ? this.wordAudioBase + w.audio_url : null
        }))
    };
  },

  stripFootnotes(html) {
    return html.replace(/<sup[^>]*>.*?<\/sup>/g, '').replace(/<[^>]+>/g, '');
  },

  /**
   * Morphology for one surah: { "ayahNumber": [ word: [segments...] ] }
   * Segment: { t: text, g: tag, r?: root, l?: lemma, f?: [features] }
   */
  async getMorphology(surah) {
    if (!this._morphCache[surah]) {
      const id = String(surah).padStart(3, '0');
      this._morphCache[surah] = fetch(`data/morphology/${id}.json`)
        .then(r => {
          if (!r.ok) throw new Error('Morphology data not found');
          return r.json();
        })
        .catch(err => { delete this._morphCache[surah]; throw err; });
    }
    return this._morphCache[surah];
  },

  /** Diacritized per-verse words: { "s:a": ["ٱلْحَمْدُ", ...] } (~1.5MB, loaded once).
   * Keeps tashkeel so letter+haraka (fatha/kasra/damma) sequences can be matched. */
  _quranWordsPromise: null,
  async getQuranWords() {
    if (!this._quranWordsPromise) {
      this._quranWordsPromise = fetch('data/quran-words.json')
        .then(r => { if (!r.ok) throw new Error('quran-words not found'); return r.json(); })
        .catch(err => { this._quranWordsPromise = null; throw err; });
    }
    return this._quranWordsPromise;
  },

  /**
   * Find every distinct Quran word CONTAINING the diacritized sequence `seq`
   * (e.g. "تَ" = ta+fatha). Returns { total, verses, forms:[{word, count, first}] }
   * sorted by frequency desc. Used by the kids "words with this sound" finder.
   */
  async findWordsContaining(seq) {
    const data = await this.getQuranWords();
    const forms = new Map(); // word -> { count, first: "s:a" }
    let total = 0;
    const verses = new Set();
    for (const vk in data) {
      for (const w of data[vk]) {
        if (w.includes(seq)) {
          total++; verses.add(vk);
          const rec = forms.get(w);
          if (rec) rec.count++;
          else forms.set(w, { count: 1, first: vk });
        }
      }
    }
    const list = [...forms.entries()]
      .map(([word, r]) => ({ word, count: r.count, first: r.first }))
      .sort((a, b) => b.count - a.count);
    return { total, verses: verses.size, forms: list };
  },

  /** Exact-word index: { normalizedWord: ["surah:ayah:word", ...] } (~1MB, loaded once) */
  _wordIndexPromise: null,
  async getWordIndex() {
    if (!this._wordIndexPromise) {
      this._wordIndexPromise = fetch('data/word-index.json')
        .then(r => {
          if (!r.ok) throw new Error('Word index not found');
          return r.json();
        })
        .catch(err => { this._wordIndexPromise = null; throw err; });
    }
    return this._wordIndexPromise;
  },

  /** Normalization matching the word-index build: strip marks, unify alef forms */
  normalizeWord(text) {
    return text
      .replace(/[ً-ٰٟۖ-ۭ࣓-ࣿـ]/g, '')
      .replace(/[آأإٱ]/g, 'ا');
  },

  /** Root index: { root: ["surah:ayah:word", ...] } (~520KB, loaded once) */
  async getRoots() {
    if (!this._rootsPromise) {
      this._rootsPromise = fetch('data/roots.json')
        .then(r => {
          if (!r.ok) throw new Error('Root index not found');
          return r.json();
        })
        .catch(err => { this._rootsPromise = null; throw err; });
    }
    return this._rootsPromise;
  }
};

/**
 * Human-readable labels for Quranic Arabic Corpus morphology tags.
 */
const GRAMMAR_LABELS = {
  // Core parts of speech (segment tag "g" or feature)
  N: 'Noun', PN: 'Proper noun', ADJ: 'Adjective', V: 'Verb', P: 'Particle',
  PRON: 'Pronoun', DEM: 'Demonstrative', REL: 'Relative pronoun',
  T: 'Time adverb', LOC: 'Location adverb', NUM: 'Number',

  // Particles
  DET: 'Definite article (ال)', PREF: 'Prefix', CONJ: 'Conjunction',
  SUB: 'Subordinating conjunction', NEG: 'Negative particle',
  INTG: 'Interrogative', VOC: 'Vocative', EMPH: 'Emphatic',
  COND: 'Conditional', ACC: 'Accusative', AMD: 'Amendment particle',
  ANS: 'Answer particle', AVR: 'Aversion particle', CAUS: 'Causative',
  CERT: 'Certainty particle', CIRC: 'Circumstantial', COM: 'Comitative',
  EXH: 'Exhortation', EXL: 'Explanation', EXP: 'Exceptive', FUT: 'Future',
  INC: 'Inceptive', INT: 'Interpretation', PREV: 'Preventive',
  PRO: 'Prohibition', PRP: 'Purpose', REM: 'Resumption', RES: 'Restriction',
  RET: 'Retraction', RSLT: 'Result', SUP: 'Supplemental', SUR: 'Surprise',
  INL: 'Quranic initials', EQ: 'Equalization particle', IMPN: 'Imperative verbal noun',

  // Derived nominals
  ACT_PCPL: 'Active participle', PASS_PCPL: 'Passive participle', VN: 'Verbal noun',

  // Verb aspect / voice / mood
  PERF: 'Perfect (past)', IMPF: 'Imperfect (present)', IMPV: 'Imperative',
  PASS: 'Passive voice',
  'MOOD:IND': 'Indicative', 'MOOD:SUBJ': 'Subjunctive', 'MOOD:JUS': 'Jussive',

  // Case
  NOM: 'Nominative (مرفوع)', GEN: 'Genitive (مجرور)',
  // ACC also means accusative case on nominals — handled contextually below

  // Special
  DIST: 'Distal', ATT: 'Attached', OBJ: 'Object'
};

/**
 * Segment display colors, corpus.quran.com-style (by grammatical type).
 */
function segmentColor(seg) {
  const f = seg.f || [];
  if (f.includes('PRON')) return 'text-purple-600 dark:text-purple-400';
  if (f.includes('PN')) return 'text-indigo-600 dark:text-indigo-400';
  if (seg.g === 'V') return 'text-red-600 dark:text-red-400';
  if (seg.g === 'N') return 'text-sky-700 dark:text-sky-400';
  if (seg.g === 'P') return 'text-emerald-600 dark:text-emerald-400';
  return 'text-gray-700 dark:text-gray-200';
}

/**
 * Build a corpus.quran.com-style description sentence for one segment,
 * e.g. "prefixed preposition", "genitive masculine noun",
 *      "3rd person masculine singular perfect verb (form IV)".
 */
function corpusDescribe(seg) {
  const f = seg.f || [];
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  const parts = [];

  const pgn = f.find(x => /^[123]?(M|F)?(S|D|P)?$/.test(x) && x.length > 0);
  const pgnText = pgn ? decodeGrammarFeature(pgn, seg.g) : '';

  if (seg.g === 'V') {
    if (pgnText) parts.push(pgnText);
    if (f.includes('PASS')) parts.push('passive');
    if (f.includes('IMPV')) parts.push('imperative');
    else if (f.includes('IMPF')) parts.push('imperfect');
    else parts.push('perfect');
    parts.push('verb');
    const vf = f.find(x => x.startsWith('VF:'));
    if (vf && parseInt(vf.slice(3)) > 1) parts.push(`(form ${ROMAN[parseInt(vf.slice(3)) - 1]})`);
    const mood = f.find(x => x.startsWith('MOOD:'));
    if (mood) parts.push(`, ${(GRAMMAR_LABELS[mood] || mood.slice(5)).toLowerCase()} mood`);
    return parts.join(' ');
  }

  if (seg.g === 'N' || f.includes('ADJ')) {
    const kase = f.includes('NOM') ? 'nominative' : f.includes('ACC') ? 'accusative' : f.includes('GEN') ? 'genitive' : '';
    if (kase) parts.push(kase);
    if (pgnText) parts.push(pgnText);
    if (f.includes('ACT_PCPL')) parts.push('active participle');
    else if (f.includes('PASS_PCPL')) parts.push('passive participle');
    else if (f.includes('VN')) parts.push('verbal noun');
    else if (f.includes('PN')) parts.push('proper noun');
    else if (f.includes('ADJ')) parts.push('adjective');
    else parts.push('noun');
    return parts.join(' ');
  }

  // Particles, pronouns, prefixes
  const prefixed = f.includes('PREF');
  if (f.includes('DET')) return 'prefixed determiner ال (the)';
  if (f.includes('PRON')) return `attached pronoun${pgnText ? ' — ' + pgnText : ''}`;
  if (f.includes('P')) return (prefixed ? 'prefixed ' : '') + 'preposition';
  const main = f.filter(x => x !== 'PREF').map(x => GRAMMAR_LABELS[x]).find(Boolean)
    || GRAMMAR_LABELS[seg.g] || 'particle';
  return (prefixed ? 'prefixed ' : '') + main.toLowerCase();
}

/**
 * Decode a single morphology feature into a readable label.
 */
function decodeGrammarFeature(feat, segTag) {
  if (GRAMMAR_LABELS[feat]) {
    // On nouns, ACC is the accusative case, not the accusative particle
    if (feat === 'ACC' && segTag !== 'P') return 'Accusative (منصوب)';
    return GRAMMAR_LABELS[feat];
  }
  if (feat.startsWith('VF:')) return `Verb form ${feat.slice(3)}`;
  if (feat.startsWith('MOOD:')) return GRAMMAR_LABELS[feat] || feat.slice(5);

  // Person / gender / number combos like 3MS, 2FP, 1P, MS, FD, M, F
  const pgn = feat.match(/^([123])?(M|F)?(S|D|P)?$/);
  if (pgn && (pgn[1] || pgn[2] || pgn[3])) {
    const parts = [];
    if (pgn[1]) parts.push({ '1': '1st person', '2': '2nd person', '3': '3rd person' }[pgn[1]]);
    if (pgn[2]) parts.push(pgn[2] === 'M' ? 'masculine' : 'feminine');
    if (pgn[3]) parts.push({ S: 'singular', D: 'dual', P: 'plural' }[pgn[3]]);
    return parts.join(' ');
  }
  return feat;
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QuranData, GRAMMAR_LABELS, decodeGrammarFeature };
}
