/**
 * Arabic Handwriting / Tracing Practice
 * Trace a faint target letter / letter-form / word on a canvas with finger
 * or mouse, then "Reveal" the perfect calligraphic form to compare. Clear /
 * undo per stroke; step through targets; hear the target. Guided practice —
 * not handwriting-recognition (that needs a server model), but what teaches
 * Arabic writing.
 *
 * Enrichments:
 * - Letter Forms section: practice each letter's isolated / initial / medial /
 *   final form (shaped via tatweel joining — the standard textbook display).
 * - Guide overlay: numbered dots along the glyph, right-to-left — where to
 *   start and which way to write.
 * - Check: pixel-coverage score (how much of the template your ink covers),
 *   friendly pass threshold with retry.
 * - Progress: best scores persist in localStorage; passed targets get a green
 *   ring in the picker and a per-section practiced counter.
 */

/** Letters that do not connect to the following letter — no initial/medial form. */
const HW_NON_CONNECTORS = ['ا', 'د', 'ذ', 'ر', 'ز', 'و'];
const HW_FORMS = ['isolated', 'initial', 'medial', 'final'];
const HW_PASS_PCT = 60;
/** Ink palette + nib sizes offered under the canvas (persisted per user). */
const HW_COLORS = ['#111827', '#6366f1', '#dc2626', '#059669', '#d97706', '#7c3aed'];
const HW_SIZES = [3, 6, 10, 16];

/**
 * Per-letter bilingual writing tips: stroke direction, baseline placement,
 * dot count/position, and the most common student mistakes.
 * Keys are the Unicode letter characters used in QAIDA_LETTERS.
 */
const HW_LETTER_TIPS = {
  'ا': {
    en: 'One stroke: start at the top and pull straight down to the baseline. Keep it perfectly vertical — the most common mistake is adding a hook at the base or letting the stroke slant.',
    bn: 'একটি স্ট্রোক: উপর থেকে শুরু করে বেসলাইনে সরলরেখায় নামুন। পুরোপুরি খাড়া রাখুন — সাধারণ ভুল হলো নিচে হুক যোগ করা বা কাত হয়ে যাওয়া।'
  },
  'ب': {
    en: 'Start at the right of the shallow bowl, sweep left, then slightly up to close. Add 1 dot below the centre of the bowl. Common mistake: making the bowl too deep, or placing the dot above instead of below.',
    bn: 'অগভীর বাটির ডান দিক থেকে শুরু করে বাম দিকে বাঁকুন, শেষে সামান্য উপরে তুলে বন্ধ করুন। বাটির কেন্দ্রের নিচে ১টি বিন্দু দিন। ভুল: বাটি খুব গভীর করা, বা বিন্দু উপরে দেওয়া।'
  },
  'ت': {
    en: 'Identical bowl to Bā — the body is the same shape. Add 2 dots above. The dots alone distinguish Bā (1 below), Tā (2 above), and Thā (3 above); students must learn to place them precisely.',
    bn: 'বার মতো হুবহু একই বাটি। উপরে ২টি বিন্দু দিন। বিন্দুই একমাত্র পার্থক্য: বা (নিচে ১), তা (উপরে ২), সা (উপরে ৩)। সঠিকভাবে বসাতে শিখুন।'
  },
  'ث': {
    en: 'Same bowl as Bā and Tā. Add 3 dots in a triangle formation above. Draw the body first, then place all three dots carefully — two on the bottom row, one at the apex.',
    bn: 'বা ও তার মতো একই বাটি। উপরে ৩টি বিন্দু ত্রিভুজাকারে দিন। প্রথমে মূল আকৃতি আঁকুন, তারপর তিনটি বিন্দু সাবধানে বসান — নিচের সারিতে দুটি, শীর্ষে একটি।'
  },
  'ج': {
    en: 'A deep hook: start at the upper-right, curve left and descend well below the baseline, then hook right. Add 1 dot inside or just below the hook. Common mistake: not descending below the baseline, making it look like Ḥā.',
    bn: 'গভীর হুক: উপর-ডান থেকে শুরু করে বাম দিকে বাঁকুন এবং বেসলাইনের অনেক নিচে নামুন, তারপর ডানে বাঁকুন। হুকের ভেতরে বা ঠিক নিচে ১টি বিন্দু দিন। ভুল: বেসলাইনের নিচে না নামলে হার মতো দেখায়।'
  },
  'ح': {
    en: 'Exactly the same hook as Jīm — no dot at all. Students must resist adding a dot. The key to distinguishing Jīm (dot below), Ḥā (no dot), and Khā (dot above) is dot position alone.',
    bn: 'জিমের মতো হুবহু একই হুক — কোনো বিন্দু নেই। বিন্দু না দেওয়ার প্রতি সচেতন থাকুন। জিম (নিচে বিন্দু), হা (কোনো বিন্দু নেই) ও খা (উপরে বিন্দু) আলাদা করতে বিন্দুর অবস্থানই একমাত্র চাবিকাঠি।'
  },
  'خ': {
    en: 'Same hook as Jīm and Ḥā. Add 1 dot above the top of the hook. Common mistake: placing the dot below (making it look like Jīm) — always check whether the dot goes above or below.',
    bn: 'জিম ও হার মতো একই হুক। হুকের শীর্ষের উপরে ১টি বিন্দু দিন। ভুল: নিচে বিন্দু দিলে জিমের মতো দেখায় — সবসময় বিন্দু উপরে না নিচে যাচ্ছে তা পরীক্ষা করুন।'
  },
  'د': {
    en: 'A right-facing wedge: start just above the baseline at the right, curve gently right and down. Non-connector — it does not join to the following letter. Common mistake: adding a leftward tail as if connecting forward.',
    bn: 'ডানমুখী কীলক: বেসলাইনের সামান্য উপরে ডান দিক থেকে শুরু করে মৃদুভাবে ডানে ও নিচে বাঁকুন। নন-কানেক্টর — পরবর্তী অক্ষরের সাথে যুক্ত হয় না। ভুল: বাম দিকে সংযোগের মতো লেজ বাড়ানো।'
  },
  'ذ': {
    en: 'Same wedge as Dāl. Add 1 dot above the body. Non-connector. The dot is the only visible difference from Dāl; do not let it sit to the side — it must be directly above.',
    bn: 'দালের মতো একই কীলক। শরীরের সরাসরি উপরে ১টি বিন্দু দিন। নন-কানেক্টর। দাল থেকে একমাত্র দৃশ্যমান পার্থক্য এই বিন্দু — পাশে নয়, সরাসরি উপরে হতে হবে।'
  },
  'ر': {
    en: 'A smooth downward curve: begin just above the baseline at the upper-right, sweep down and curl right, finishing below the baseline. Non-connector. Common mistake: making it too angular or too shallow.',
    bn: 'মসৃণ নিম্নমুখী বক্ররেখা: উপর-ডানে বেসলাইনের সামান্য উপর থেকে শুরু করে নিচে ও ডানে বাঁকুন, বেসলাইনের নিচে শেষ করুন। নন-কানেক্টর। ভুল: কোণাকুণি করা বা বেশি সমতল করা।'
  },
  'ز': {
    en: 'Same downward curve as Rā — bodies are identical. Add 1 dot above. Non-connector. Rā and Zāy are among the most confused pairs; the single dot on Zāy is the only difference.',
    bn: 'রার মতো হুবহু একই নিম্নমুখী বক্ররেখা। উপরে ১টি বিন্দু যোগ করুন। নন-কানেক্টর। রা ও যাই সবচেয়ে বিভ্রান্তিকর জোড়াগুলির একটি — একটিমাত্র বিন্দুই পার্থক্য।'
  },
  'س': {
    en: 'Three small equal teeth followed by a long sweeping tail curving left and back right. Write right-to-left: start the tail from the right, rise through three even teeth. Common mistake: uneven teeth, or teeth that are too tall.',
    bn: 'তিনটি সমান ছোট দাঁত এবং তারপর বাম দিকে বাঁকানো লম্বা লেজ। ডান থেকে বাম লিখুন: ডান দিক থেকে লেজ শুরু করে তিনটি সমান দাঁতের মধ্য দিয়ে উঠুন। ভুল: অসমান দাঁত বা অতিরিক্ত লম্বা দাঁত।'
  },
  'ش': {
    en: 'Identical three-tooth body to Sīn. Add 3 dots (triangle) above the teeth. Draw the body first, then the dots. Common mistake: mixing up Sīn (no dots) and Shīn (3 dots above).',
    bn: 'সিনের মতো হুবহু একই তিন-দাঁতের আকৃতি। দাঁতের উপরে ৩টি বিন্দু (ত্রিভুজ) দিন। প্রথমে শরীর, তারপর বিন্দু। ভুল: সিন (কোনো বিন্দু নেই) ও শিন (উপরে ৩টি বিন্দু) গুলিয়ে ফেলা।'
  },
  'ص': {
    en: 'An oval open on the right with a small hook at the entry and a tail extending left. Ṣād has an oval body — not teeth like Sīn. No dot. Common mistake: making the oval too closed on the right side.',
    bn: 'ডানে খোলা একটি ডিম্বাকৃতি যার প্রবেশে ছোট হুক এবং বাম দিকে লেজ। সোয়াদের ডিম্বাকৃতি শরীর আছে — সিনের মতো দাঁত নয়। কোনো বিন্দু নেই। ভুল: ডিম্বাকৃতি ডান দিক থেকে বেশি বন্ধ করা।'
  },
  'ض': {
    en: 'Same oval body as Ṣād. Add 1 dot above the oval. Ḍād is historically one of Arabic\'s most distinctive sounds. Common mistake: omitting the dot, or placing it inside the oval.',
    bn: 'সোয়াদের মতো একই ডিম্বাকৃতি। ডিম্বাকৃতির উপরে ১টি বিন্দু দিন। দোয়াদ ঐতিহাসিকভাবে আরবির সবচেয়ে বৈশিষ্ট্যময় শব্দগুলির একটি। ভুল: বিন্দু বাদ দেওয়া, বা ডিম্বাকৃতির ভেতরে দেওয়া।'
  },
  'ط': {
    en: 'A closed oval (loop) with a vertical stroke rising from the right side of the oval. Draw the oval first (right-to-left), then add the upright stroke from inside. Common mistake: making the loop too small relative to the upstroke.',
    bn: 'একটি বন্ধ ডিম্বাকৃতি (লুপ) যার ডান দিক থেকে একটি উল্লম্ব রেখা উপরে উঠছে। প্রথমে লুপ আঁকুন, তারপর ভেতর থেকে উল্লম্ব রেখা যোগ করুন। ভুল: উল্লম্ব রেখার তুলনায় লুপ খুব ছোট করা।'
  },
  'ظ': {
    en: 'Same closed oval and upstroke as Ṭā. Add 1 dot above the vertical stroke. The only visible difference from Ṭā is this single dot — place it clearly above the top of the upstroke.',
    bn: 'তোয়ার মতো হুবহু একই বন্ধ লুপ ও উল্লম্ব রেখা। উল্লম্ব রেখার উপরে ১টি বিন্দু যোগ করুন। তোয়া থেকে একমাত্র দৃশ্যমান পার্থক্য এই একটি বিন্দু — উল্লম্ব রেখার শীর্ষের সুস্পষ্ট উপরে বসান।'
  },
  'ع': {
    en: 'Start with a small upward hook at the top-right, sweep down and around forming a teardrop/eye shape, then extend the tail down-left below the baseline. Common mistake: making the eye too large, or the opening hook too closed.',
    bn: 'উপর-ডানে একটি ছোট উপরমুখী হুক দিয়ে শুরু করুন, নিচে ও চারদিকে বাঁকিয়ে একটি অশ্রু/চোখের আকৃতি তৈরি করুন, তারপর লেজ নিচে-বামে বেসলাইনের নিচে প্রসারিত করুন। ভুল: চোখ খুব বড় করা, বা উপরের হুক বেশি বন্ধ করা।'
  },
  'غ': {
    en: 'Exactly the same shape as ʿAyn. Add 1 dot above the hook opening. The dot must sit clearly above the letter, not inside it. Common mistake: confusing ʿAyn (no dot) with Ghayn (1 dot above).',
    bn: 'আইনের মতো হুবহু একই আকৃতি। হুকের খোলা অংশের উপরে ১টি বিন্দু যোগ করুন। বিন্দুটি অক্ষরের উপরে স্পষ্টভাবে থাকতে হবে, ভেতরে নয়। ভুল: আইন (কোনো বিন্দু নেই) ও গাইন (উপরে ১টি বিন্দু) গুলিয়ে ফেলা।'
  },
  'ف': {
    en: 'A loop/circle sitting on the baseline, with a connecting tail to the left. Add 1 dot above the circle. The circle is shallow and rests on the line. Common mistake: confusing with Qāf — Fā has 1 dot and sits on the baseline; Qāf has 2 dots and descends.',
    bn: 'বেসলাইনের উপরে একটি লুপ/বৃত্ত, বাম দিকে সংযোগকারী লেজ। বৃত্তের উপরে ১টি বিন্দু দিন। বৃত্তটি অগভীর এবং লাইনের উপরে থাকে। ভুল: কাফের সাথে গুলিয়ে ফেলা — ফা-তে ১টি বিন্দু ও বেসলাইনে; কাফে ২টি বিন্দু ও নিচে নামে।'
  },
  'ق': {
    en: 'A deeper, rounder cup that descends below the baseline. Add 2 dots above. Distinguish from Fā: Qāf has 2 dots above and its cup descends; Fā has 1 dot and stays on the baseline.',
    bn: 'একটি গভীর, গোলাকার বাটি যা বেসলাইনের নিচে নামে। উপরে ২টি বিন্দু দিন। ফা থেকে পার্থক্য: কাফে উপরে ২টি বিন্দু এবং বাটি নিচে নামে; ফা-তে ১টি বিন্দু ও বেসলাইনে থাকে।'
  },
  'ك': {
    en: 'A curved arch with a small diagonal inner mark — a stroke unique to Kāf, like a tiny hamza inside. Draw the outer arch first (right-to-left), then add the inner diagonal. Common mistake: forgetting the inner mark entirely.',
    bn: 'একটি বাঁকানো খিলান যার ভেতরে একটি ছোট তির্যক চিহ্ন — কাফের অনন্য বৈশিষ্ট্য। প্রথমে বাইরের খিলান আঁকুন, তারপর ভেতরের তির্যক রেখা যোগ করুন। ভুল: ভেতরের চিহ্ন সম্পূর্ণ ভুলে যাওয়া।'
  },
  'ل': {
    en: 'An upside-down hook: begin at the upper-right, sweep left, rise upward (the tall upstroke), then bring the tail down to the baseline. Common mistake: making the upward portion too short, or skipping the upstroke.',
    bn: 'উল্টো হুক: উপর-ডান থেকে শুরু করে বামে বাঁকুন, উপরে উঠুন (লম্বা উল্লম্ব অংশ), তারপর লেজ বেসলাইনে নামিয়ে আনুন। ভুল: উপরের অংশ খুব ছোট করা, বা উল্লম্ব অংশ বাদ দেওয়া।'
  },
  'م': {
    en: 'A small, tight circle/knot — the tightest loop in the Arabic alphabet — with a tail descending below the baseline. Write the circle clockwise, then bring the tail down. Common mistake: making the circle too large or the tail too short.',
    bn: 'একটি ছোট, শক্ত বৃত্ত/গিঁট — আরবি বর্ণমালার সবচেয়ে শক্ত লুপ — যার লেজ বেসলাইনের নিচে নামে। বৃত্ত ঘড়ির কাঁটার দিকে আঁকুন, তারপর লেজ নামান। ভুল: বৃত্ত খুব বড় করা বা লেজ খুব ছোট করা।'
  },
  'ن': {
    en: 'Similar to Bā but with a deeper, more rounded bowl that dips below the baseline. Add 1 dot above the centre. Common mistake: making it too shallow (it looks like Bā), or placing the dot below.',
    bn: 'বার মতো কিন্তু গভীর ও আরও গোলাকার বাটি যা বেসলাইনের নিচে ডুবে। কেন্দ্রের উপরে ১টি বিন্দু দিন। ভুল: বেশি সমতল করলে বার মতো দেখায়, বা বিন্দু নিচে দেওয়া।'
  },
  'و': {
    en: 'A small rounded head (like a tiny circle) at the top with a tail curving down and to the right. Non-connector. Draw the head first, then sweep the tail downward. Common mistake: making the head too large, or joining it to the next letter.',
    bn: 'উপরে একটি ছোট গোলাকার মাথা এবং নিচে ও ডানে বাঁকানো লেজ। নন-কানেক্টর। প্রথমে মাথা, তারপর লেজ নিচে নামান। ভুল: মাথা খুব বড় করা, বা পরের অক্ষরের সাথে জুড়ে দেওয়া।'
  },
  'ه': {
    en: 'In isolated form: two joined oval loops — a larger upper oval and a smaller lower oval. Write the upper loop first, then close the lower. Common mistake: making both loops the same size (the lower should be smaller and sit inside/below).',
    bn: 'বিচ্ছিন্ন রূপে: দুটি সংযুক্ত ডিম্বাকৃতি লুপ — বড় উপরের ডিম্বাকৃতি ও ছোট নিচের ডিম্বাকৃতি। প্রথমে উপরের লুপ, তারপর নিচেরটি বন্ধ করুন। ভুল: দুটি লুপ একই আকারের করা (নিচেরটি ছোট এবং ভেতরে/নিচে থাকা উচিত)।'
  },
  'ي': {
    en: 'A bowl similar to Bā/Nūn, but with 2 dots below (not above). The bowl descends below the baseline. Common mistake: placing the 2 dots above (making it look like Tā) — always check: Yā dots go below.',
    bn: 'বা/নুনের মতো বাটি, কিন্তু নিচে ২টি বিন্দু (উপরে নয়)। বাটি বেসলাইনের নিচে নামে। ভুল: ২টি বিন্দু উপরে দিলে তার মতো দেখায় — সবসময় মনে রাখুন: ইয়ার বিন্দু নিচে যায়।'
  },
};

/**
 * Groups of visually similar Arabic letters.
 * Students commonly confuse letters within each group;
 * only dots (or their absence) distinguish them.
 */
const HW_CONFUSABLES = [
  {
    letters: ['ب', 'ت', 'ث', 'ن', 'ي'],
    label: { en: 'Bā / Tā / Thā / Nūn / Yā', bn: 'বা / তা / সা / নুন / ইয়া' },
    tip: {
      en: 'All share a curved bowl. Tell them apart by dots: Bā = 1 dot below; Tā = 2 dots above; Thā = 3 dots above; Nūn = 1 dot above (deeper bowl, dips below baseline); Yā = 2 dots below (bowl below baseline).',
      bn: 'সবগুলোর একই বাঁকা বাটি। বিন্দু দিয়ে আলাদা করুন: বা = নিচে ১; তা = উপরে ২; সা = উপরে ৩; নুন = উপরে ১ (গভীর বাটি, বেসলাইনের নিচে); ইয়া = নিচে ২ (বাটি বেসলাইনের নিচে)।'
    }
  },
  {
    letters: ['ج', 'ح', 'خ'],
    label: { en: 'Jīm / Ḥā / Khā', bn: 'জিম / হা / খা' },
    tip: {
      en: 'All share the same deep hook descending below the baseline. Jīm = 1 dot below/inside the hook; Ḥā = no dot at all; Khā = 1 dot above the hook.',
      bn: 'সবগুলোর বেসলাইনের নিচে নামা একই গভীর হুক। জিম = হুকের নিচে/ভেতরে ১টি বিন্দু; হা = কোনো বিন্দু নেই; খা = হুকের উপরে ১টি বিন্দু।'
    }
  },
  {
    letters: ['د', 'ذ'],
    label: { en: 'Dāl / Dhāl', bn: 'দাল / যাল' },
    tip: {
      en: 'Same wedge shape; both are non-connectors. Dhāl has 1 dot directly above; Dāl has none.',
      bn: 'একই কীলক আকৃতি; দুটিই নন-কানেক্টর। যালে সরাসরি উপরে ১টি বিন্দু আছে; দালে নেই।'
    }
  },
  {
    letters: ['ر', 'ز'],
    label: { en: 'Rā / Zāy', bn: 'রা / যায়' },
    tip: {
      en: 'Same downward curve; both are non-connectors descending below the baseline. Zāy has 1 dot above; Rā has none.',
      bn: 'একই নিম্নমুখী বক্ররেখা; দুটিই নন-কানেক্টর, বেসলাইনের নিচে নামে। যায়ে উপরে ১টি বিন্দু আছে; রা-তে নেই।'
    }
  },
  {
    letters: ['س', 'ش'],
    label: { en: 'Sīn / Shīn', bn: 'সিন / শিন' },
    tip: {
      en: 'Both have three teeth and a curved sweeping tail. Shīn adds 3 dots (triangle) above the teeth; Sīn has no dots.',
      bn: 'দুটিতেই তিনটি দাঁত ও বাঁকানো লেজ। শিনে দাঁতের উপরে ৩টি বিন্দু (ত্রিভুজ) যোগ হয়; সিনে কোনো বিন্দু নেই।'
    }
  },
  {
    letters: ['ص', 'ض'],
    label: { en: 'Ṣād / Ḍād', bn: 'সোয়াদ / দোয়াদ' },
    tip: {
      en: 'Both have an oval body (not teeth) open on the right, with a leftward tail. Ḍād adds 1 dot above the oval; Ṣād has none.',
      bn: 'দুটিতেই ডানে খোলা ডিম্বাকৃতি (দাঁত নয়) এবং বামে লেজ। দোয়াদে ডিম্বাকৃতির উপরে ১টি বিন্দু যোগ হয়; সোয়াদে নেই।'
    }
  },
  {
    letters: ['ط', 'ظ'],
    label: { en: 'Ṭā / Ẓā', bn: 'তোয়া / যোয়া' },
    tip: {
      en: 'Both have a closed oval with a vertical stroke rising from its right side. Ẓā adds 1 dot above the vertical stroke; Ṭā has none.',
      bn: 'দুটিতেই বন্ধ ডিম্বাকৃতি এবং ডান দিক থেকে উল্লম্ব রেখা। যোয়াতে উল্লম্ব রেখার উপরে ১টি বিন্দু যোগ হয়; তোয়াতে নেই।'
    }
  },
  {
    letters: ['ع', 'غ'],
    label: { en: 'ʿAyn / Ghayn', bn: 'আইন / গাইন' },
    tip: {
      en: 'Same teardrop/eye shape with a descending tail. Ghayn adds 1 dot above the opening hook; ʿAyn has none.',
      bn: 'একই অশ্রু/চোখের আকৃতি নিম্নমুখী লেজ সহ। গাইনে উপরের খোলা হুকের উপরে ১টি বিন্দু যোগ হয়; আইনে নেই।'
    }
  },
  {
    letters: ['ف', 'ق'],
    label: { en: 'Fā / Qāf', bn: 'ফা / কাফ' },
    tip: {
      en: 'Both have a circular body. Fā: 1 dot above, circle sits on the baseline (shallow cup). Qāf: 2 dots above, deeper cup descends below the baseline.',
      bn: 'দুটিতেই গোলাকার শরীর। ফা: উপরে ১টি বিন্দু, বৃত্ত বেসলাইনের উপরে (অগভীর বাটি)। কাফ: উপরে ২টি বিন্দু, গভীর বাটি বেসলাইনের নিচে নামে।'
    }
  },
];

/**
 * Foundational Arabic writing principles — displayed in the teaching panel
 * as expandable sections. Content is bilingual {en, bn}.
 */
const HW_WRITING_BASICS = [
  {
    icon: '➡️',
    title: { en: 'Right-to-Left Direction', bn: 'ডান থেকে বামে' },
    body: {
      en: 'Arabic is written from right to left. Every letter, word, and line begins at the right margin and flows left. When tracing, always start your pen on the right side of the letter. The numbered guide dots in this app follow this direction — dot ① is always the starting point on the right.',
      bn: 'আরবি ডান থেকে বামে লেখা হয়। প্রতিটি অক্ষর, শব্দ ও বাক্য ডান মার্জিন থেকে শুরু হয়ে বামে যায়। ট্রেস করার সময় সবসময় অক্ষরের ডান দিক থেকে শুরু করুন। এই অ্যাপের সংখ্যাযুক্ত গাইড ডটগুলি এই দিক অনুসরণ করে — ① সবসময় ডানের শুরুর বিন্দু।'
    }
  },
  {
    icon: '📏',
    title: { en: 'Baseline Placement', bn: 'বেসলাইনে অবস্থান' },
    body: {
      en: 'Arabic letters rest on — not below — the baseline, like English print. The body of each letter anchors to this line. Some letters have descending tails or bowls that dip below it (Jīm, Ḥā, Khā, Mīm, Nūn, Qāf, Yā, Rā, Zāy, Wāw), but their heads remain at baseline level. On ruled paper, use the lower rule as your baseline and write upward from it.',
      bn: 'আরবি অক্ষর বেসলাইনের উপরে থাকে — নিচে ঝোলে না, ইংরেজি প্রিন্টের মতো। প্রতিটি অক্ষরের শরীর এই লাইনে নোঙর করে। কিছু অক্ষরের লেজ বা বাটি নিচে নামে (জিম, হা, খা, মিম, নুন, কাফ, ইয়া, রা, যায়, ওয়াও), কিন্তু তাদের মাথা বেসলাইনে থাকে। শাসন কাগজে নিচের রেখাকে বেসলাইন হিসেবে ব্যবহার করুন।'
    }
  },
  {
    icon: '⚫',
    title: { en: 'The Dot System (النقاط)', bn: 'বিন্দু পদ্ধতি (النقاط)' },
    body: {
      en: 'Arabic uses 1, 2, or 3 dots — placed above or below the letter skeleton (rasm) — to distinguish letters that share the same base shape. Nine pairs/groups differ only by dots: Bā·Tā·Thā, Jīm·Ḥā·Khā, Dāl·Dhāl, Rā·Zāy, Sīn·Shīn, Ṣād·Ḍād, Ṭā·Ẓā, ʿAyn·Ghayn, Fā·Qāf. In Quran copying, correct dot placement is a religious and legal obligation.',
      bn: 'আরবিতে ১, ২ বা ৩টি বিন্দু — অক্ষরের কঙ্কালের (রসম) উপরে বা নিচে — একই মূল আকৃতির অক্ষরগুলিকে আলাদা করে। নয়টি জোড়া/গোষ্ঠী শুধুমাত্র বিন্দু দ্বারা আলাদা: বা·তা·সা, জিম·হা·খা, দাল·যাল, রা·যায়, সিন·শিন, সোয়াদ·দোয়াদ, তোয়া·যোয়া, আইন·গাইন, ফা·কাফ। কুরআন অনুলিপিতে সঠিক বিন্দু স্থাপন ধর্মীয় ও আইনগত বাধ্যবাধকতা।'
    }
  },
  {
    icon: '🔗',
    title: { en: 'Connecting Letters', bn: 'অক্ষর সংযোগ' },
    body: {
      en: 'Most Arabic letters connect to both neighbours (they have four shapes: isolated, initial, medial, final). Six letters only connect to the preceding letter — not the following one: Alif (ا), Dāl (د), Dhāl (ذ), Rā (ر), Zāy (ز), Wāw (و). When one appears mid-word, it "breaks" the word into two visual clusters. Practice all four connection shapes in the "Forms" section above.',
      bn: 'বেশিরভাগ আরবি অক্ষর উভয় প্রতিবেশীর সাথে সংযুক্ত হয় (চারটি রূপ: বিচ্ছিন্ন, আদি, মধ্য, অন্তিম)। ছয়টি অক্ষর শুধুমাত্র আগের অক্ষরের সাথে সংযুক্ত হয় — পরেরটির সাথে নয়: আলিফ (ا), দাল (د), যাল (ذ), রা (ر), যায় (ز), ওয়াও (و)। এগুলো শব্দে এলে শব্দটি দুটি দৃশ্যমান গুচ্ছে বিভক্ত হয়। উপরের "ফর্মস" অংশে চারটি সংযোগ রূপ অনুশীলন করুন।'
    }
  },
  {
    icon: '🌟',
    title: { en: 'Essential Ligatures: Lām-Alif & Allāh', bn: 'অপরিহার্য লিগেচার: লাম-আলিফ ও আল্লাহ' },
    body: {
      en: 'Two ligatures are mandatory and must be memorised as single units: (1) Lām-Alif (لا) — whenever Lām (ل) is followed by Alif (ا) they merge into a single joined form. This occurs hundreds of times in the Quran. (2) Allāh (الله) — Lām-Lām-Hā merge into a special calligraphic shape with a shadda and a raised second lām. Never write these as separate strokes; always practise them as one connected unit.',
      bn: 'দুটি লিগেচার বাধ্যতামূলক এবং একক একক হিসেবে মুখস্থ করতে হবে: (১) লাম-আলিফ (لا) — যখনই লাম (ل) এর পরে আলিফ (ا) আসে তারা একটি সংযুক্ত রূপে মিলিত হয়। কুরআনে এটি শত শত বার আসে। (২) আল্লাহ (الله) — লাম-লাম-হা একটি বিশেষ ক্যালিগ্রাফিক আকৃতিতে মিলিত হয়। এগুলি কখনো আলাদা স্ট্রোকে লিখবেন না; সবসময় একটি সংযুক্ত একক হিসেবে অনুশীলন করুন।'
    }
  },
];

/**
 * Recommended practice-word sequence for early learners.
 * Starts with Basmalah components (the most recited phrase in Arabic),
 * then moves to short high-frequency Quran words, building stroke variety.
 */
const HW_PRACTICE_WORDS = [
  { arabic: 'بِ',         translit: 'Bi',        note: { en: 'Bā + kasra — the opening "In"', bn: 'কাসরা সহ বা — শুরুর "বি"' } },
  { arabic: 'اسْمِ',      translit: 'smi',       note: { en: 'Name (Ism) — Alif·Sīn·Mīm', bn: 'নাম (ইসম) — আলিফ·সিন·মিম' } },
  { arabic: 'اللَّهِ',    translit: 'Allāhi',    note: { en: 'Allāh — lām·lām·hā ligature', bn: 'আল্লাহ — লাম·লাম·হা লিগেচার' } },
  { arabic: 'الرَّحْمَٰنِ', translit: 'al-Raḥmāni', note: { en: 'The Most Merciful', bn: 'পরম দয়ালু' } },
  { arabic: 'الرَّحِيمِ', translit: 'al-Raḥīmi', note: { en: 'The Most Compassionate', bn: 'পরম করুণাময়' } },
  { arabic: 'قُلْ',       translit: 'Qul',       note: { en: 'Say! — Qāf·Lām (frequent Quran command)', bn: 'বলুন! — কাফ·লাম (কুরআনের বারবার আদেশ)' } },
  { arabic: 'رَبّ',       translit: 'Rabb',      note: { en: 'Lord — Rā·Bā (with shadda)', bn: 'রব — রা·বা (শাদ্দা সহ)' } },
  { arabic: 'نُور',       translit: 'Nūr',       note: { en: 'Light — Nūn·Wāw·Rā', bn: 'আলো — নুন·ওয়াও·রা' } },
  { arabic: 'بَاب',       translit: 'Bāb',       note: { en: 'Door — Bā·Alif·Bā', bn: 'দরজা — বা·আলিফ·বা' } },
  { arabic: 'دَار',       translit: 'Dār',       note: { en: 'House/abode — Dāl·Alif·Rā', bn: 'ঘর — দাল·আলিফ·রা' } },
  { arabic: 'يَد',        translit: 'Yad',       note: { en: 'Hand — Yā·Dāl', bn: 'হাত — ইয়া·দাল' } },
  { arabic: 'عَيْن',      translit: 'ʿAyn',      note: { en: 'Eye / spring — ʿAyn·Yā·Nūn', bn: 'চোখ/ঝর্ণা — আইন·ইয়া·নুন' } },
  { arabic: 'قَلَم',      translit: 'Qalam',     note: { en: 'Pen — Qāf·Lām·Mīm (Quran 96:4)', bn: 'কলম — কাফ·লাম·মিম (কুরআন ৯৬:৪)' } },
  { arabic: 'كِتَاب',     translit: 'Kitāb',     note: { en: 'Book — Kāf·Tā·Alif·Bā', bn: 'বই — কাফ·তা·আলিফ·বা' } },
  { arabic: 'أَحَد',      translit: 'Aḥad',      note: { en: 'One (Sūrat al-Ikhlāṣ) — Alif·Ḥā·Dāl', bn: 'এক (সূরা ইখলাস) — আলিফ·হা·দাল' } },
  { arabic: 'صَمَد',      translit: 'Ṣamad',     note: { en: 'Eternal (Sūrat al-Ikhlāṣ) — Ṣād·Mīm·Dāl', bn: 'চিরস্থায়ী (সূরা ইখলাস) — সোয়াদ·মিম·দাল' } },
  { arabic: 'سَمَاء',     translit: 'Samāʾ',     note: { en: 'Sky — Sīn·Mīm·Alif·Hamza', bn: 'আকাশ — সিন·মিম·আলিফ·হামযা' } },
  { arabic: 'أَرْض',      translit: 'Arḍ',       note: { en: 'Earth — Alif·Rā·Ḍād', bn: 'পৃথিবী — আলিফ·রা·দোয়াদ' } },
  { arabic: 'مَاء',       translit: 'Māʾ',       note: { en: 'Water — Mīm·Alif·Hamza', bn: 'পানি — মিম·আলিফ·হামযা' } },
  { arabic: 'حَقّ',       translit: 'Ḥaqq',      note: { en: 'Truth/right — Ḥā·Qāf (shadda)', bn: 'সত্য — হা·কাফ (শাদ্দা)' } },
  { arabic: 'سَلَام',     translit: 'Salām',     note: { en: 'Peace — Sīn·Lām·Alif·Mīm', bn: 'শান্তি — সিন·লাম·আলিফ·মিম' } },
  { arabic: 'لا إِلَٰهَ', translit: 'Lā ilāha',  note: { en: 'No deity — Lā·Alif·Lām·Hā (Shahāda)', bn: 'কোনো ইলাহ নেই — শাহাদার প্রথম অংশ' } },
  { arabic: 'إِلَّا اللَّهُ', translit: 'illallāh', note: { en: 'Except Allāh (Shahāda)', bn: 'আল্লাহ ছাড়া (শাহাদা)' } },
];

/**
 * The 8 short-vowel and consonant-rest diacritics (harakat + sukūn + shadda + three tanwīn).
 * Each entry documents: symbol (Unicode combining character), bilingual name, placement rule,
 * the sound produced, and the most common placement mistake made by beginners.
 */
const HW_HARAKAT = [
  {
    symbol: 'بَ',
    mark: '\u064E',
    name: { en: 'Fatḥa (فَتْحَة)', bn: 'ফাতহা (فَتْحَة)' },
    placement: {
      en: 'Placed above the letter it vocalises — a small diagonal stroke slanting right-to-left.',
      bn: 'যে অক্ষরকে স্বরযুক্ত করে তার উপরে — ডান থেকে বামে হেলানো ছোট তির্যক রেখা।'
    },
    sound: {
      en: 'Short /a/ as in "bat". بَ = ba, تَ = ta, كَ = ka.',
      bn: 'সংক্ষিপ্ত /আ/ — "ব্যাট"-এর মতো। بَ = বা, تَ = তা, كَ = কা।'
    },
    mistake: {
      en: 'Written below the letter (swapped with kasra); or drawn too long — making it look like a small alif.',
      bn: 'অক্ষরের নিচে লেখা (কাসরার সাথে অদলবদল); বা অতিরিক্ত লম্বা করা — ছোট আলিফের মতো দেখায়।'
    }
  },
  {
    symbol: 'بِ',
    mark: '\u0650',
    name: { en: 'Kasra (كَسْرَة)', bn: 'কাসরা (كَسْرَة)' },
    placement: {
      en: 'Placed below the letter — a small diagonal stroke slanting right-to-left, mirroring the fatḥa.',
      bn: 'অক্ষরের নিচে — ডান থেকে বামে হেলানো ছোট তির্যক রেখা, ফাতহার প্রতিফলন।'
    },
    sound: {
      en: 'Short /i/ as in "bit". بِ = bi, تِ = ti, كِ = ki.',
      bn: 'সংক্ষিপ্ত /ই/ — "বিট"-এর মতো। بِ = বি, تِ = তি, كِ = কি।'
    },
    mistake: {
      en: 'Written above instead of below; or placed beneath a letter that already has a sub-dot, causing confusion with the dot of Bā, Yā, or Nūn.',
      bn: 'নিচের পরিবর্তে উপরে লেখা; বা নিচে বিন্দু আছে এমন অক্ষরের নিচে (বা, ইয়া, নুনের বিন্দুর সাথে গুলিয়ে ফেলা)।'
    }
  },
  {
    symbol: 'بُ',
    mark: '\u064F',
    name: { en: 'Ḍamma (ضَمَّة)', bn: 'দাম্মা (ضَمَّة)' },
    placement: {
      en: 'Placed above the letter — shaped like a tiny wāw (و), curling to the left.',
      bn: 'অক্ষরের উপরে — ছোট ওয়াওয়ের (و) মতো, বামে বাঁকানো।'
    },
    sound: {
      en: 'Short /u/ as in "put". بُ = bu, تُ = tu, كُ = ku.',
      bn: 'সংক্ষিপ্ত /উ/ — "বুট"-এর মতো। بُ = বু, تُ = তু, كُ = কু।'
    },
    mistake: {
      en: 'Drawn too large — mistaken for the letter wāw itself; or placed to the side of the letter rather than above it.',
      bn: 'অতিরিক্ত বড় আঁকলে ওয়াও অক্ষরের মতো দেখায়; বা অক্ষরের পাশে বসানো, উপরে নয়।'
    }
  },
  {
    symbol: 'بْ',
    mark: '\u0652',
    name: { en: 'Sukūn (سُكُون)', bn: 'সুকুন (سُكُون)' },
    placement: {
      en: 'Placed above the letter — a small hollow circle (◦), indicating no following vowel.',
      bn: 'অক্ষরের উপরে — একটি ছোট ফাঁকা বৃত্ত (◦), পরবর্তী স্বর নেই বলে জানায়।'
    },
    sound: {
      en: 'No vowel — the consonant rests. بْ = B (no vowel follows). Critical for correct tajwīd.',
      bn: 'কোনো স্বর নেই — ব্যঞ্জনধ্বনি বিশ্রামে। بْ = ব্ (পরে কোনো স্বর নেই)। সঠিক তাজওয়ীদের জন্য গুরুত্বপূর্ণ।'
    },
    mistake: {
      en: 'Confused with ḍamma (ḍamma is filled and curls; sukūn is a small open circle). Beginners often omit it entirely, producing incorrect vowel chains.',
      bn: 'দাম্মার সাথে মিলিয়ে ফেলা (দাম্মা ভরা ও বাঁকা; সুকুন ছোট খোলা বৃত্ত)। শিক্ষার্থীরা প্রায়ই এটি সম্পূর্ণ বাদ দেন।'
    }
  },
  {
    symbol: 'بّ',
    mark: '\u0651',
    name: { en: 'Shadda (شَدَّة)', bn: 'শাদ্দা (شَدَّة)' },
    placement: {
      en: 'Placed above the letter (and above any vowel mark on the same letter). Shaped like a small ش without dots.',
      bn: 'অক্ষরের উপরে (এবং একই অক্ষরের অন্য স্বরচিহ্নের উপরে)। ছোট بِدون-বিন্দু শিনের (ش) মতো।'
    },
    sound: {
      en: 'Gemination — the consonant is doubled/held. رَبَّنَا = Rabbanā (held bā). Mispronouncing shadda is a tajwīd error.',
      bn: 'দ্বিগুণ ব্যঞ্জন — অক্ষরটি দীর্ঘক্ষণ ধরা হয়। رَبَّنَا = রাব্বানা (দীর্ঘ বা)। শাদ্দা ভুল উচ্চারণ তাজওয়ীদ ত্রুটি।'
    },
    mistake: {
      en: 'Written below or omitted entirely. When shadda + fatḥa combine (ـَّ), the fatḥa sits above the shadda — beginners often reverse this stack.',
      bn: 'নিচে লেখা বা বাদ দেওয়া। শাদ্দা + ফাতহা একত্রে (ـَّ) হলে ফাতহা শাদ্দার উপরে — শিক্ষার্থীরা প্রায়ই এই ক্রম উল্টে দেন।'
    }
  },
  {
    symbol: 'بً',
    mark: '\u064B',
    name: { en: 'Tanwīn Fatḥa (ـً)', bn: 'তানউইন ফাতহা (ـً)' },
    placement: {
      en: 'Two fatḥa strokes above the letter. In most words, it is written on a final alif (ـاً); the second stroke sits slightly higher.',
      bn: 'অক্ষরের উপরে দুটি ফাতহা রেখা। বেশিরভাগ শব্দে শেষ আলিফে লেখা হয় (ـاً); দ্বিতীয় রেখা সামান্য উঁচুতে।'
    },
    sound: {
      en: 'Indefinite accusative suffix "-an". كِتَاباً = kitāban. Common in Quranic grammar.',
      bn: 'অনির্দিষ্ট প্রত্যয় "-আন"। كِتَاباً = কিতাবান। কুরআনের ব্যাকরণে সাধারণ।'
    },
    mistake: {
      en: 'Writing only one stroke — making it look like a fatḥa. The two strokes must be distinct and parallel.',
      bn: 'একটিমাত্র রেখা লেখা — ফাতহার মতো দেখায়। দুটি রেখা সুস্পষ্ট ও সমান্তরাল হতে হবে।'
    }
  },
  {
    symbol: 'بٍ',
    mark: '\u064D',
    name: { en: 'Tanwīn Kasra (ـٍ)', bn: 'তানউইন কাসরা (ـٍ)' },
    placement: {
      en: 'Two kasra strokes below the letter, mirroring tanwīn fatḥa.',
      bn: 'অক্ষরের নিচে দুটি কাসরা রেখা, তানউইন ফাতহার প্রতিফলন।'
    },
    sound: {
      en: 'Indefinite genitive suffix "-in". كِتَابٍ = kitābin. Marks the noun as indefinite in the genitive case.',
      bn: 'অনির্দিষ্ট প্রত্যয় "-ইন"। كِتَابٍ = কিতাবিন। বিশেষ্যকে অনির্দিষ্ট সম্বন্ধ কারকে চিহ্নিত করে।'
    },
    mistake: {
      en: 'Writing only one stroke (looks like kasra); or placing it above instead of below.',
      bn: 'একটিমাত্র রেখা লেখা (কাসরার মতো দেখায়); বা নিচের পরিবর্তে উপরে বসানো।'
    }
  },
  {
    symbol: 'بٌ',
    mark: '\u064C',
    name: { en: 'Tanwīn Ḍamma (ـٌ)', bn: 'তানউইন দাম্মা (ـٌ)' },
    placement: {
      en: 'Two ḍamma (wāw-like) strokes above the letter, side by side.',
      bn: 'অক্ষরের উপরে পাশাপাশি দুটি দাম্মা (ওয়াওয়ের মতো) রেখা।'
    },
    sound: {
      en: 'Indefinite nominative suffix "-un". كِتَابٌ = kitābun. The subject of a sentence is typically in this case.',
      bn: 'অনির্দিষ্ট প্রত্যয় "-উন"। كِتَابٌ = কিতাবুন। বাক্যের কর্তা সাধারণত এই কারকে থাকে।'
    },
    mistake: {
      en: 'Drawing only one wāw-shape (confused with ḍamma); or placed below instead of above.',
      bn: 'একটিমাত্র ওয়াওয়ের আকৃতি আঁকা (দাম্মার সাথে গুলিয়ে ফেলা); বা উপরের পরিবর্তে নিচে বসানো।'
    }
  },
];

/**
 * Al-Fātiḥa verse-by-verse stroke guide.
 * For each of the 7 verses: Arabic text, transliteration, and 4–6 focus letters
 * with bilingual stroke tips relevant to that verse's specific letter combinations.
 */
const HW_FATIHA_STROKES = [
  {
    verse: 1,
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    translit: 'Bismi llāhi r-raḥmāni r-raḥīm',
    meaning: { en: 'In the name of Allāh, the Most Gracious, the Most Merciful', bn: 'আল্লাহর নামে, যিনি পরম দয়ালু, পরম করুণাময়' },
    focusLetters: [
      {
        letter: 'ب', context: 'بِسْمِ',
        tip: { en: 'The opening Bā carries a kasra below — write the bowl first, add the dot below the centre, then place the kasra beneath that.', bn: 'শুরুর বা-তে নিচে কাসরা — প্রথমে বাটি, তারপর বাটির মাঝের নিচে বিন্দু, তারপর কাসরা নিচে।' }
      },
      {
        letter: 'س', context: 'بِسْمِ',
        tip: { en: 'S\u012Bn\'s three teeth must be equal in height and evenly spaced — rush makes them look like a single zigzag rather than three distinct cusps.', bn: 'সিনের তিনটি দাঁত সমান উচ্চতার ও সমদূরত্বে হতে হবে — তাড়াহুড়ায় তিনটি পরিষ্কার দাঁতের পরিবর্তে একটি জিগজ্যাগ হয়।' }
      },
      {
        letter: 'ل', context: 'اللَّهِ',
        tip: { en: 'The Lām-Alif ligature (لا) in the divine name Allāh is unique: the two lāms merge into a double upstroke before the final hā. Practice the ligature as a single fluid movement.', bn: 'আল্লাহ নামের লাম-আলিফ লিগেচার (لا) অনন্য: দুটি লাম একটি দ্বৈত উল্লম্ব অংশে মিলিত হয় শেষ হার আগে। লিগেচারটি একটি অবিরাম গতিতে অনুশীলন করুন।' }
      },
      {
        letter: 'ح', context: 'الرَّحْمَٰنِ',
        tip: { en: 'Ḥā in Raḥmān: the hook descends below the baseline and the upstroke must be tight. Carrying a sukūn above it (حْ) means the consonant rests — do not add a vowel stroke.', bn: 'রাহমানের হা: হুকটি বেসলাইনের নিচে নামে এবং উপরের অংশটি শক্ত হতে হবে। উপরে সুকুন (حْ) থাকলে স্বর যোগ করবেন না।' }
      },
      {
        letter: 'م', context: 'الرَّحْمَٰنِ',
        tip: { en: 'Mīm at the end of Raḥmān connects medially — its tight knot must be closed cleanly before the tail descends. An open loop makes it look like a reversed nūn.', bn: 'রাহমানের শেষে মিম মধ্যবর্তী সংযুক্ত — শক্ত গিঁট লেজ নামার আগে পরিষ্কারভাবে বন্ধ হতে হবে। খোলা লুপ উল্টো নুনের মতো দেখায়।' }
      },
      {
        letter: 'ي', context: 'الرَّحِيمِ',
        tip: { en: 'Yā in Raḥīm carries a long vowel (ī) expressed by the yā itself. In medial position it has no descending tail — write the curved connector and place the 2 dots below at the end.', bn: 'রাহিমের ইয়া দীর্ঘ স্বর (ঈ) বহন করে। মধ্যবর্তী অবস্থানে নামা লেজ নেই — বাঁকানো সংযোগ লিখুন এবং শেষে নিচে ২টি বিন্দু দিন।' }
      }
    ]
  },
  {
    verse: 2,
    arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    translit: 'Al-ḥamdu lillāhi rabbi l-ʿālamīn',
    meaning: { en: 'All praise is due to Allāh, Lord of all the worlds', bn: 'সমস্ত প্রশংসা আল্লাহর, যিনি সকল জগতের প্রতিপালক' },
    focusLetters: [
      {
        letter: 'ح', context: 'الْحَمْدُ',
        tip: { en: 'Al-Ḥamdu opens with Ḥā carrying a sukūn: ḥ + a-m-d. The Ḥā hook dips well below baseline — give it room or the word looks like Jīm (which has a dot inside).', bn: 'আল-হামদু হা দিয়ে শুরু, সাথে সুকুন। হার হুকটি বেসলাইনের নিচে যথেষ্ট নামতে হবে — জায়গা না দিলে জিমের (ভেতরে বিন্দু আছে) মতো দেখায়।' }
      },
      {
        letter: 'د', context: 'الْحَمْدُ',
        tip: { en: 'Dāl at the end of al-ḥamdu is a non-connector — the wedge stroke ends completely before the next letter Lām begins. Do not extend a forward-join stroke.', bn: 'আল-হামদুর শেষে দাল নন-কানেক্টর — কীলক স্ট্রোক পরবর্তী লামের আগে সম্পূর্ণ শেষ হয়। সামনে জোড়ার স্ট্রোক বাড়াবেন না।' }
      },
      {
        letter: 'ر', context: 'رَبِّ',
        tip: { en: 'Rā in Rabb is a non-connector with a fatḥa above. The smooth downward curve must not become angular. Because the next letter Bā immediately follows, leave a small gap — Rā does not join forward.', bn: 'রাব্বের রা নন-কানেক্টর, উপরে ফাতহা। মসৃণ নিম্নমুখী বক্ররেখা কোণাকুণি হওয়া উচিত নয়। পরের বা-র জন্য ছোট ফাঁক রাখুন — রা সামনে জোড়া লাগে না।' }
      },
      {
        letter: 'ب', context: 'رَبِّ',
        tip: { en: 'Bā in Rabb carries a shadda (doubled) + kasra below. Write the bowl, add the sub-dot, place the shadda above the bowl, then the kasra below the shadda position — three marks stacked precisely.', bn: 'রাব্বের বা-তে শাদ্দা (দ্বিগুণ) + নিচে কাসরা। বাটি লিখুন, উপ-বিন্দু দিন, বাটির উপরে শাদ্দা, তারপর শাদ্দার অবস্থানের নিচে কাসরা — তিনটি চিহ্ন সুনির্দিষ্টভাবে স্ট্যাক করা।' }
      },
      {
        letter: 'ع', context: 'الْعَالَمِينَ',
        tip: { en: 'ʿAyn in ʿĀlamīn: in initial position the eye-opening is wide and the body stays above the baseline. The fatḥa sits above the hook. Do not close the opening — that turns it into Ghayn.', bn: 'আলামিনের আইন: প্রারম্ভিক অবস্থানে চোখের খোলা প্রশস্ত এবং শরীর বেসলাইনের উপরে। ফাতহা হুকের উপরে। খোলা বন্ধ করবেন না — তাহলে গাইন হয়ে যায়।' }
      },
      {
        letter: 'ن', context: 'الْعَالَمِينَ',
        tip: { en: 'Final Nūn in ʿĀlamīn: the bowl dips below the baseline and the single dot sits above. In final position the tail curls right — do not add a forward stroke.', bn: 'আলামিনের শেষ নুন: বাটি বেসলাইনের নিচে ডোবে এবং একটি বিন্দু উপরে। চূড়ান্ত অবস্থানে লেজ ডানে বাঁকে — সামনে স্ট্রোক বাড়াবেন না।' }
      }
    ]
  },
  {
    verse: 3,
    arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
    translit: 'Ar-raḥmāni r-raḥīm',
    meaning: { en: 'The Most Gracious, the Most Merciful', bn: 'পরম দয়ালু, পরম করুণাময়' },
    focusLetters: [
      {
        letter: 'ر', context: 'الرَّحْمَٰنِ',
        tip: { en: 'Rā here carries a shadda (doubled) + fatḥa. Write the Rā curve first, then place the shadda above, then the fatḥa above the shadda — the vowel always tops the shadda stack.', bn: 'এখানে রা-তে শাদ্দা (দ্বিগুণ) + ফাতহা। প্রথমে রার বক্ররেখা, তারপর উপরে শাদ্দা, তারপর শাদ্দার উপরে ফাতহা — স্বর সবসময় শাদ্দার স্ট্যাকের উপরে।' }
      },
      {
        letter: 'ح', context: 'الرَّحْمَٰنِ',
        tip: { en: 'Practice writing the full word ar-raḥmān as one continuous movement: Alif-Lām ligature → Rā curve → Ḥā hook → Mīm knot → Alif māddah. The Ḥā hook must be the deepest point.', bn: 'পুরো শব্দ আর-রাহমান একটি অবিরাম গতিতে লেখার অনুশীলন করুন: আলিফ-লাম লিগেচার → রার বক্ররেখা → হার হুক → মিমের গিঁট → আলিফ মাদ্দাহ। হার হুক সবচেয়ে গভীর বিন্দু হতে হবে।' }
      },
      {
        letter: 'م', context: 'الرَّحْمَٰنِ',
        tip: { en: 'Mīm in Raḥmān is in medial position — it has no descending tail. The knot is tight and the exit stroke connects directly rightward to the alif+mādda.', bn: 'রাহমানের মিম মধ্যবর্তী অবস্থানে — নামা লেজ নেই। গিঁট শক্ত এবং বের হওয়ার স্ট্রোক সরাসরি ডানদিকে আলিফ+মাদ্দাহতে সংযুক্ত।' }
      },
      {
        letter: 'ي', context: 'الرَّحِيمِ',
        tip: { en: 'In Raḥīm the Yā expresses the long /ī/ vowel. Its medial form is a flat curved connector — no dots in this position; dots come only in isolated or final forms.', bn: 'রাহিমে ইয়া দীর্ঘ /ঈ/ স্বর প্রকাশ করে। এর মধ্যবর্তী রূপ একটি সমতল বাঁকা সংযোগকারী — এই অবস্থানে বিন্দু নেই; বিন্দু শুধু বিচ্ছিন্ন বা চূড়ান্ত রূপে।' }
      }
    ]
  },
  {
    verse: 4,
    arabic: 'مَالِكِ يَوْمِ الدِّينِ',
    translit: 'Māliki yawmi d-dīn',
    meaning: { en: 'Master of the Day of Judgement', bn: 'বিচার দিনের মালিক' },
    focusLetters: [
      {
        letter: 'م', context: 'مَالِكِ',
        tip: { en: 'Mālik opens with an initial Mīm carrying a fatḥa. In initial position the Mīm knot has a forward-connecting exit stroke going left — make the knot compact before extending.', bn: 'মালিক প্রারম্ভিক মিম দিয়ে শুরু, উপরে ফাতহা। প্রারম্ভিক অবস্থানে মিমের গিঁটে বামে এগিয়ে যাওয়ার সংযোগ স্ট্রোক আছে — প্রসারিত করার আগে গিঁট শক্ত করুন।' }
      },
      {
        letter: 'ك', context: 'مَالِكِ',
        tip: { en: 'Kāf in Mālik: draw the outer arch first (right-to-left), then add the small diagonal inner mark unique to Kāf. In final position the arch drops to the baseline — do not skip the inner mark.', bn: 'মালিকের কাফ: প্রথমে বাইরের খিলান (ডান থেকে বাম), তারপর কাফের অনন্য ছোট তির্যক ভেতরের চিহ্ন। চূড়ান্ত অবস্থানে খিলান বেসলাইনে নামে — ভেতরের চিহ্ন বাদ দেবেন না।' }
      },
      {
        letter: 'و', context: 'يَوْمِ',
        tip: { en: 'Wāw in Yawm is a non-connector. The small rounded head and the descending tail must be proportionate — a head that is too large unbalances the word. The sukūn above confirms no vowel follows.', bn: 'ইয়াওমের ওয়াও নন-কানেক্টর। ছোট গোলাকার মাথা ও নামা লেজ সামঞ্জস্যপূর্ণ হতে হবে — অতিরিক্ত বড় মাথা শব্দের ভারসাম্য নষ্ট করে। উপরের সুকুন নিশ্চিত করে পরে কোনো স্বর নেই।' }
      },
      {
        letter: 'د', context: 'الدِّينِ',
        tip: { en: 'Dāl in al-Dīn carries a shadda above the Dāl itself (Dīn = Dāl + shadda + long ī). The Dāl wedge is a non-connector; the shadda sits precisely above the peak of the wedge.', bn: 'আদ-দিনের দাল, দালের উপরে শাদ্দা (দিন = দাল + শাদ্দা + দীর্ঘ ঈ)। দালের কীলক নন-কানেক্টর; শাদ্দা সুনির্দিষ্টভাবে কীলকের শীর্ষের উপরে।' }
      },
      {
        letter: 'ن', context: 'الدِّينِ',
        tip: { en: 'Final Nūn in al-Dīn closes the verse. Its bowl descends below the baseline and the tail curls outward. The kasra below the Nūn must not be confused with its sub-dot — they are separate marks.', bn: 'আদ-দিনের শেষ নুন আয়াত শেষ করে। বাটি বেসলাইনের নিচে এবং লেজ বাইরে বাঁকে। নুনের নিচে কাসরা এবং উপ-বিন্দু আলাদা চিহ্ন — গুলিয়ে ফেলবেন না।' }
      }
    ]
  },
  {
    verse: 5,
    arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    translit: 'Iyyāka naʿbudu wa-iyyāka nastaʿīn',
    meaning: { en: 'You alone we worship, and You alone we ask for help', bn: 'আমরা কেবল তোমারই ইবাদত করি এবং কেবল তোমার কাছেই সাহায্য চাই' },
    focusLetters: [
      {
        letter: 'ي', context: 'إِيَّاكَ',
        tip: { en: 'Yā in Iyyāka carries a shadda (doubled Yā) + alif. In initial position after hamza, the Yā body is a short flat curve — the shadda sits above it confirming the geminated yy sound.', bn: 'ইয়্যাকার ইয়া-তে শাদ্দা (দ্বিগুণ ইয়া) + আলিফ। হামযার পরে প্রারম্ভিক অবস্থানে ইয়ার শরীর একটি ছোট সমতল বক্ররেখা — শাদ্দা উপরে দ্বিগুণ yy শব্দ নিশ্চিত করে।' }
      },
      {
        letter: 'ع', context: 'نَعْبُدُ',
        tip: { en: 'ʿAyn in Naʿbudu is medial — in medial position it lacks the descending tail; instead it flows into a connecting exit. The opening of the eye shape must remain visible, not collapsed.', bn: 'নাবুদুর আইন মধ্যবর্তী — মধ্যবর্তী অবস্থানে নামা লেজ নেই; পরিবর্তে সংযোগকারী বের হওয়ার স্ট্রোকে প্রবাহিত হয়। চোখের আকৃতির খোলা অংশ দৃশ্যমান রাখতে হবে, চুপসে যাবে না।' }
      },
      {
        letter: 'ب', context: 'نَعْبُدُ',
        tip: { en: 'Bā in Naʿbudu carries a ḍamma above — the small wāw-like curl sits above the bowl. The sub-dot of Bā and the ḍamma above must both be present; neither can be omitted in careful Quran writing.', bn: 'নাবুদুর বা-তে উপরে দাম্মা — ছোট ওয়াওয়ের মতো বক্ররেখা বাটির উপরে। বা-র নিচের বিন্দু এবং উপরের দাম্মা দুটোই থাকতে হবে; সতর্ক কুরআন লেখায় কোনোটাই বাদ দেওয়া যাবে না।' }
      },
      {
        letter: 'س', context: 'نَسْتَعِينُ',
        tip: { en: 'Sīn in Nastaʿīn carries a sukūn above (سْ) — the three teeth still need to be even; do not rush them because the word is long. The sukūn confirms the Sīn rests without a vowel.', bn: 'নাসতাঈনের সিন উপরে সুকুন (سْ) সহ — তিনটি দাঁত তবুও সমান হতে হবে; শব্দটি লম্বা বলে তাড়াহুড়ো করবেন না। সুকুন নিশ্চিত করে সিন স্বর ছাড়া বিশ্রামে।' }
      },
      {
        letter: 'ن', context: 'نَسْتَعِينُ',
        tip: { en: 'Final Nūn in Nastaʿīn carries a ḍamma (nominative). Its bowl descends below the baseline. The single dot above must be placed after completing the bowl — do not add it mid-stroke.', bn: 'নাসতাঈনের শেষ নুনে দাম্মা (কর্তা কারক)। বাটি বেসলাইনের নিচে। বাটি সম্পূর্ণ করার পরে উপরে একটি বিন্দু দিতে হবে — স্ট্রোকের মাঝখানে দেবেন না।' }
      }
    ]
  },
  {
    verse: 6,
    arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    translit: 'Ihdinā ṣ-ṣirāṭa l-mustaqīm',
    meaning: { en: 'Guide us to the straight path', bn: 'আমাদের সরল পথ দেখাও' },
    focusLetters: [
      {
        letter: 'ص', context: 'الصِّرَاطَ',
        tip: { en: 'Ṣād in aṣ-Ṣirāṭ carries a shadda. The oval of Ṣād is open on the right — keep the opening clean. The shadda sits above the body, not inside the oval.', bn: 'আস-সিরাতের সোয়াদে শাদ্দা। সোয়াদের ডিম্বাকৃতি ডানে খোলা — খোলা অংশ পরিষ্কার রাখুন। শাদ্দা শরীরের উপরে, ডিম্বাকৃতির ভেতরে নয়।' }
      },
      {
        letter: 'ط', context: 'الصِّرَاطَ',
        tip: { en: 'Ṭā in aṣ-Ṣirāṭ: the closed oval loop and the rising vertical stroke are both essential. Draw the loop first (going right-to-left), close it, then add the upward stroke from the right inside the loop.', bn: 'আস-সিরাতের তোয়া: বন্ধ ডিম্বাকৃতি লুপ ও উল্লম্ব রেখা উভয়ই অপরিহার্য। প্রথমে লুপ (ডান থেকে বাম), বন্ধ করুন, তারপর লুপের ভেতর থেকে উপরে উল্লম্ব রেখা।' }
      },
      {
        letter: 'س', context: 'الْمُسْتَقِيمَ',
        tip: { en: 'Sīn in Mustaqīm is in medial position — the teeth are followed immediately by a connecting stroke to the Tā. Keep the teeth small and even; the medial connecting exit is lower than the tooth tops.', bn: 'মুসতাকিমের সিন মধ্যবর্তী অবস্থানে — দাঁতের পরেই তার সাথে সংযোগকারী স্ট্রোক। দাঁত ছোট ও সমান রাখুন; মধ্যবর্তী সংযোগ বের হওয়ার অংশ দাঁতের শীর্ষের নিচে।' }
      },
      {
        letter: 'ق', context: 'الْمُسْتَقِيمَ',
        tip: { en: 'Qāf in Mustaqīm: its deep cup descends below the baseline and carries 2 dots above. In medial position the cup has a forward-connecting exit — ensure the two dots are placed only after the whole medial body is written.', bn: 'মুসতাকিমের কাফ: গভীর বাটি বেসলাইনের নিচে এবং উপরে ২টি বিন্দু। মধ্যবর্তী অবস্থানে বাটিতে সামনে সংযোগকারী বের হওয়ার পথ আছে — পুরো মধ্যবর্তী শরীর লেখার পরেই দুটি বিন্দু দিন।' }
      },
      {
        letter: 'م', context: 'الْمُسْتَقِيمَ',
        tip: { en: 'Final Mīm in Mustaqīm: in final position the Mīm knot has a descending tail going below the baseline (unlike its medial form). The fatḥa above confirms the long ā sound before the final Mīm.', bn: 'মুসতাকিমের শেষ মিম: চূড়ান্ত অবস্থানে মিমের গিঁটে নামা লেজ বেসলাইনের নিচে (মধ্যবর্তী রূপের মতো নয়)। উপরের ফাতহা শেষ মিমের আগে দীর্ঘ আ-ধ্বনি নিশ্চিত করে।' }
      }
    ]
  },
  {
    verse: 7,
    arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    translit: 'Ṣirāṭa lladhīna anʿamta ʿalayhim ghayri l-maghḍūbi ʿalayhim wa-lā ḍ-ḍāllīn',
    meaning: { en: 'The path of those whom You have blessed — not of those who earned anger, nor of those who are astray', bn: 'তাদের পথ যাদের তুমি নেয়ামত দিয়েছ — তাদের নয় যারা গযব পেয়েছে এবং তাদেরও নয় যারা পথভ্রষ্ট' },
    focusLetters: [
      {
        letter: 'ذ', context: 'الَّذِينَ',
        tip: { en: 'Dhāl in alladhīna: same wedge as Dāl, with 1 dot directly above. In connected words the non-connector property means the following Yā begins a new attachment point — leave a clear break.', bn: 'আল্লাযিনার যাল: দালের মতো একই কীলক, উপরে সরাসরি ১টি বিন্দু। সংযুক্ত শব্দে নন-কানেক্টর বৈশিষ্ট্যের কারণে পরের ইয়া নতুন সংযোগ বিন্দুতে শুরু হয় — পরিষ্কার বিরতি রাখুন।' }
      },
      {
        letter: 'ع', context: 'أَنْعَمْتَ',
        tip: { en: 'ʿAyn in Anʿamta is medial: the eye shape is compact and the connecting exit runs left. The fatḥa above the ʿAyn must be written after closing the eye-opening — do not let it drift into the opening.', bn: 'আনআমতার আইন মধ্যবর্তী: চোখের আকৃতি ছোট এবং সংযোগকারী বের হওয়ার পথ বামে। আইনের উপরে ফাতহা চোখের খোলা বন্ধ করার পরে লিখতে হবে — খোলা অংশে যেন না যায়।' }
      },
      {
        letter: 'غ', context: 'غَيْرِ',
        tip: { en: 'Ghayn in Ghayri opens the word. Its hook shape is identical to ʿAyn but carries 1 dot above the hook opening. Make the dot visible above — not inside or beside the hook.', bn: 'গায়রির গাইন শব্দ শুরু করে। হুকের আকৃতি আইনের মতো তবে হুকের খোলার উপরে ১টি বিন্দু। বিন্দু উপরে দৃশ্যমান রাখুন — হুকের ভেতরে বা পাশে নয়।' }
      },
      {
        letter: 'ض', context: 'الْمَغْضُوبِ',
        tip: { en: 'Ḍād in al-Maghḍūb: the oval of Ḍād (like Ṣād) is open on the right, with 1 dot above. In connected position, the exit tail turns left. A common error is placing the dot inside the oval.', bn: 'আল-মাগদুবের দোয়াদ: দোয়াদের ডিম্বাকৃতি (সোয়াদের মতো) ডানে খোলা, উপরে ১টি বিন্দু। সংযুক্ত অবস্থানে বের হওয়ার লেজ বামে ঘোরে। ডিম্বাকৃতির ভেতরে বিন্দু দেওয়া সাধারণ ভুল।' }
      },
      {
        letter: 'ل', context: 'الضَّالِّينَ',
        tip: { en: 'Lām in aḍ-Ḍāllīn carries a shadda — the doubled Lām creates a geminate. Write the Lām upstroke, then place the shadda cleanly above. The kasra below confirms the /i/ vowel before the final Nūn.', bn: 'আদ-দাল্লিনের লামে শাদ্দা — দ্বিগুণ লাম জেমিনেট তৈরি করে। লামের উল্লম্ব রেখা লিখুন, তারপর উপরে শাদ্দা পরিষ্কারভাবে বসান। নিচের কাসরা শেষ নুনের আগে /ই/ স্বর নিশ্চিত করে।' }
      }
    ]
  },
];

/**
 * Overview of the five major Arabic calligraphic scripts encountered in Quranic contexts.
 * Each style includes bilingual notes on its characteristics and typical usage.
 * Sources: standard Arabic calligraphy scholarship; King Fahd Complex mushaf typography notes.
 */
const HW_KHAT_STYLES = [
  {
    name: { en: 'Naskh (نَسْخ)', bn: 'নাসখ (نَسْخ)' },
    emoji: '📄',
    notes: [
      {
        en: 'The dominant script for printed Qurans and modern Arabic typography. Its rounded, upright letterforms and consistent proportions make it the most legible style for extended reading.',
        bn: 'মুদ্রিত কুরআন ও আধুনিক আরবি টাইপোগ্রাফির প্রধান স্ক্রিপ্ট। এর গোলাকার, সোজা অক্ষর এবং সামঞ্জস্যপূর্ণ অনুপাত দীর্ঘ পাঠের জন্য সবচেয়ে সুপাঠ্য শৈলী করে তোলে।'
      },
      {
        en: 'Letters rest clearly on the baseline; ascenders (Alif, Lām, Kāf) are moderate in height. Dots are compact and precisely placed. Beginners learning Quran writing start with Naskh because its proportions are taught systematically in madrasas worldwide.',
        bn: 'অক্ষরগুলি বেসলাইনে স্পষ্টভাবে থাকে; অ্যাসেন্ডার (আলিফ, লাম, কাফ) মাঝারি উচ্চতার। বিন্দুগুলি ছোট ও সুনির্দিষ্টভাবে স্থাপিত। কুরআন লেখা শেখা শুরু হয় নাসখ দিয়ে কারণ বিশ্বব্যাপী মাদ্রাসায় এর অনুপাত পদ্ধতিগতভাবে শেখানো হয়।'
      },
      {
        en: 'Distinguishing trait: the pen angle is held at roughly 45°; bowls (Bā, Nūn, Qāf) are shallow and smooth; the Mīm knot is the tightest loop in the script.',
        bn: 'বৈশিষ্ট্যমূলক বৈশিষ্ট্য: কলমের কোণ প্রায় ৪৫°; বাটি (বা, নুন, কাফ) অগভীর ও মসৃণ; মিমের গিঁট স্ক্রিপ্টের সবচেয়ে শক্ত লুপ।'
      }
    ]
  },
  {
    name: { en: 'Uthmani / Madinah Script (الرسم العثماني)', bn: 'উসমানি / মাদিনা স্ক্রিপ্ট (الرسم العثماني)' },
    emoji: '🕌',
    notes: [
      {
        en: 'The Uthmani script refers to the specific orthographic conventions of the Madinah Mushaf produced by the King Fahd Complex for the Printing of the Holy Quran (مجمع الملك فهد). It preserves spelling conventions from the early caliphal codices that differ from modern standard Arabic orthography.',
        bn: 'উসমানি স্ক্রিপ্ট বলতে মাদিনার কুরআন মুদ্রণ কমপ্লেক্স (মজমাউল মালিক ফাহদ) দ্বারা প্রযুক্ত মাদিনা মুসহাফের নির্দিষ্ট অর্থোগ্রাফিক নিয়ম বোঝায়। এটি আধুনিক আরবি লেখাবিধি থেকে ভিন্ন প্রাচীন খলিফা-যুগের কোডেক্সের বানান রীতি সংরক্ষণ করে।'
      },
      {
        en: 'Distinguishing traits: the māddah sign (آ) appears on Alif as a wavy stroke; certain words are written with an elevated or missing Alif (e.g. الرَّحْمَٰنِ) following early Quranic orthography; colour-coded tajwīd marks (red ḥarakāt, green silent letters) are added on top of the base Naskh letterforms.',
        bn: 'বৈশিষ্ট্যমূলক বৈশিষ্ট্য: আলিফের উপরে মাদ্দাহ চিহ্ন (آ) ঢেউখেলানো রেখা হিসেবে; কিছু শব্দ উঁচু বা বাদ দেওয়া আলিফ সহ লেখা হয় (যেমন الرَّحْمَٰنِ) প্রাচীন কুরআনিক অর্থোগ্রাফি অনুসরণ করে; রঙ-কোডেড তাজওয়ীদ চিহ্ন (লাল হারাকাত, সবুজ নীরব অক্ষর) মূল নাসখ অক্ষরের উপরে যোগ করা হয়।'
      },
      {
        en: 'For handwriting practice: the Uthmani letterforms are identical to Naskh in stroke construction — the differences are in diacritic placement and orthographic conventions, not in the letter shapes themselves. Mastering Naskh strokes gives you the foundation for Uthmani copying.',
        bn: 'হাতের লেখার অনুশীলনের জন্য: স্ট্রোক নির্মাণে উসমানি অক্ষর নাসখের মতোই — পার্থক্য শুধু হারাকাত স্থাপনা ও বানান রীতিতে, অক্ষরের আকৃতিতে নয়। নাসখ স্ট্রোক আয়ত্ত করলে উসমানি অনুলিপির ভিত্তি পাওয়া যায়।'
      }
    ]
  },
  {
    name: { en: 'Kūfī (كُوفِي)', bn: 'কুফি (كُوفِي)' },
    emoji: '🏛️',
    notes: [
      {
        en: 'The earliest formalised Arabic script, named after the city of Kufa (Iraq). It is characterised by angular, geometric letterforms with strong horizontal baselines and bold vertical strokes. The earliest Quranic manuscripts (1st–2nd century AH) were written in Kūfī.',
        bn: 'সবচেয়ে প্রাচীন আনুষ্ঠানিক আরবি স্ক্রিপ্ট, ইরাকের কুফা শহরের নামে। কৌণিক, জ্যামিতিক অক্ষর, শক্তিশালী অনুভূমিক বেসলাইন এবং সাহসী উল্লম্ব স্ট্রোক এর বৈশিষ্ট্য। প্রাচীনতম কুরআনিক পাণ্ডুলিপি (হিজরি ১ম–২য় শতাব্দী) কুফিতে লেখা হয়েছিল।'
      },
      {
        en: 'Distinguishing traits: letters like Alif and Lām are perfectly vertical and meet the baseline at sharp right angles; rounded letters (Mīm, ʿAyn) are squared off; no descenders — even Nūn and Qāf sit on the baseline without a downward curve.',
        bn: 'বৈশিষ্ট্যমূলক বৈশিষ্ট্য: আলিফ ও লামের মতো অক্ষর একদম উল্লম্ব এবং বেসলাইনে সমকোণে মেলে; গোলাকার অক্ষর (মিম, আইন) চতুষ্কোণ; কোনো ডিসেন্ডার নেই — এমনকি নুন ও কাফ বেসলাইনে নিম্নমুখী বক্ররেখা ছাড়াই বসে।'
      },
      {
        en: 'Used today in: mosque tile inscriptions, book covers, national emblems, and decorative architectural friezes. Not the standard for Quran text study — but recognising its forms helps students appreciate the history of Quranic script transmission.',
        bn: 'আজকাল ব্যবহৃত: মসজিদের টাইল শিলালিপি, বইয়ের প্রচ্ছদ, জাতীয় প্রতীক এবং সজ্জামূলক স্থাপত্যিক ফ্রিজ। কুরআন পাঠ অধ্যয়নের মানসম্মত স্ক্রিপ্ট নয় — তবে এর রূপ চেনা শিক্ষার্থীদের কুরআনিক স্ক্রিপ্ট সংক্রমণের ইতিহাস বুঝতে সাহায্য করে।'
      }
    ]
  },
  {
    name: { en: 'Thuluth (ثُلُث)', bn: 'ছুলুছ (ثُلُث)' },
    emoji: '🖊️',
    notes: [
      {
        en: 'Thuluth ("one third") is regarded as the "mother of Arabic scripts" — its proportional system informed all later cursive styles. Characterised by large, sweeping letterforms; tall ascenders; dramatic curves; and elaborate final flourishes.',
        bn: 'ছুলুছ ("এক তৃতীয়াংশ") আরবি স্ক্রিপ্টের "মাতা" হিসেবে বিবেচিত — এর আনুপাতিক পদ্ধতি পরবর্তী সমস্ত কার্সিভ শৈলীকে অবহিত করেছিল। বৈশিষ্ট্য: বড়, প্রবাহমান অক্ষর; লম্বা অ্যাসেন্ডার; নাটকীয় বক্ররেখা; এবং বিস্তৃত শেষের আলঙ্কারিক রেখা।'
      },
      {
        en: 'Distinguishing traits: letters can be stacked vertically (ligature stacking) in ways impossible in Naskh; the pen is held at 45–70° and the nib is broad; serifs and decorative terminals appear on many strokes. Written at one-third the height of the calligrapher\'s reed pen.',
        bn: 'বৈশিষ্ট্যমূলক বৈশিষ্ট্য: নাসখে অসম্ভব উপায়ে অক্ষর উল্লম্বভাবে স্ট্যাক করা যায় (লিগেচার স্ট্যাকিং); কলম ৪৫–৭০° কোণে ধরা হয় এবং নিব প্রশস্ত; অনেক স্ট্রোকে সেরিফ ও আলঙ্কারিক টার্মিনাল। ক্যালিগ্রাফারের রিড কলমের উচ্চতার এক-তৃতীয়াংশে লেখা।'
      },
      {
        en: 'Used for: mosque domes and friezes, Quran chapter headings (surah titles), certificate headings, and any calligraphy where grandeur is intended. Not used for running Quran text due to its complexity — but surah titles in most mushafs are in Thuluth.',
        bn: 'ব্যবহৃত: মসজিদের গম্বুজ ও ফ্রিজ, কুরআনের অধ্যায় শিরোনাম (সূরা শিরোনাম), সনদ শিরোনাম এবং যেকোনো ক্যালিগ্রাফি যেখানে মহত্ত্ব উদ্দেশ্য। জটিলতার কারণে চলমান কুরআন পাঠে ব্যবহৃত হয় না — তবে বেশিরভাগ মুসহাফে সূরা শিরোনাম ছুলুছে।'
      }
    ]
  },
  {
    name: { en: 'Nastaʿlīq (نَسْتَعْلِيق)', bn: 'নাসতালিক (نَسْتَعْلِيق)' },
    emoji: '🌸',
    notes: [
      {
        en: 'A hybrid style combining Naskh and Taʿlīq (an earlier Persian chancellery script). Developed in Persia in the 9th–10th century AH and became the prestige script for Persian, Urdu, and Pashto writing. Its name reflects its dual parentage: Naskh + Taʿlīq.',
        bn: 'নাসখ এবং তালিক (একটি পুরানো পার্সিয়ান চ্যান্সেলারি স্ক্রিপ্ট) একত্রিত একটি হাইব্রিড শৈলী। পার্সিয়ায় হিজরি ৯ম–১০ম শতাব্দীতে বিকশিত এবং পার্সিয়ান, উর্দু ও পাশতু লেখার মর্যাদার স্ক্রিপ্ট হয়ে ওঠে। নামটি এর দ্বৈত উত্সের প্রতিফলন: নাসখ + তালিক।'
      },
      {
        en: 'Distinguishing traits: strong diagonal slant (letters lean toward the lower-left); thick downstrokes contrast with thin horizontal strokes; bowls (Bā, Nūn) are dramatically deep and tilted; words often appear to cascade diagonally across the line.',
        bn: 'বৈশিষ্ট্যমূলক বৈশিষ্ট্য: শক্তিশালী তির্যক হেলান (অক্ষর নিচে-বামে হেলে); মোটা নিচের স্ট্রোক পাতলা অনুভূমিক স্ট্রোকের সাথে বৈপরীত্য তৈরি করে; বাটি (বা, নুন) নাটকীয়ভাবে গভীর ও কাত; শব্দগুলি প্রায়ই লাইনের তির্যকভাবে ঝরে পড়ার মতো দেখায়।'
      },
      {
        en: 'Quranic usage: some Urdu-speaking communities use Nastaʿlīq for Quran printing (the "Taj" mushaf common in South Asia). However, the dominant global standard for the Quran remains Naskh/Uthmani. Recognising Nastaʿlīq is important for South Asian and Iranian Muslims.',
        bn: 'কুরআনিক ব্যবহার: কিছু উর্দুভাষী সম্প্রদায় কুরআন মুদ্রণে নাসতালিক ব্যবহার করে (দক্ষিণ এশিয়ায় সাধারণ "তাজ" মুসহাফ)। তবে বৈশ্বিক কুরআনের প্রধান মান নাসখ/উসমানিই থেকে গেছে। দক্ষিণ এশীয় ও ইরানী মুসলমানদের জন্য নাসতালিক চেনা গুরুত্বপূর্ণ।'
      }
    ]
  },
];

class Handwriting {
  constructor() {
    this.root = document.getElementById('handwriting-root');
    if (!this.root) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.section = 'letters';   // letters | forms | words
    this.form = 'isolated';     // for the forms section
    this.index = 0;
    this.strokes = [];          // [[{x,y}...], ...]
    this.drawing = false;
    this.reveal = false;
    this.guide = false;
    this.progress = this.loadProgress(); // { 'section:target[:form]': bestPct }
    this.brush = this.loadBrush();        // { size, color } — persisted nib
    this._audio = new Audio();
    this._clips = null;
    fetch('audio/qaida/manifest.json').then(r => r.ok ? r.json() : null).then(m => { this._clips = m || {}; }).catch(() => {});

    window.addEventListener('learnModuleSelected', (e) => {
      if (e.detail && e.detail.module === 'handwriting') this.render();
      else this.stopAll(); // another module — or null when going back to the Learn hub
    });
    // Stop audio when the user leaves the Learn tab
    window.addEventListener('tabChanged', (e) => {
      if (e.detail && e.detail.tabId !== 'learn') this.stopAll();
    });
    window.addEventListener('settingChanged', (e) => {
      if (e.detail && e.detail.key === 'language') { this.language = e.detail.value; if (this.root.innerHTML) this.render(); }
    });
    this.root.addEventListener('click', (e) => this.onClick(e));
  }

  targets() {
    if (this.section === 'words') {
      return (typeof QAIDA_WORDS !== 'undefined' ? QAIDA_WORDS : []).map(w => ({ text: w.arabic, label: w.translit, audio: w.arabic }));
    }
    // letters + forms both pick from the 28 letters
    return (typeof QAIDA_LETTERS !== 'undefined' ? QAIDA_LETTERS : []).map(l => ({ text: l.char, label: l.translit + ' · ' + l.name, audio: l.name }));
  }

  current() {
    const list = this.targets();
    return list[Math.min(this.index, list.length - 1)] || { text: '', label: '' };
  }

  /** Which of the 4 forms exist for a letter (non-connectors lack initial/medial). */
  formsFor(char) {
    return HW_NON_CONNECTORS.includes(char) ? ['isolated', 'final'] : HW_FORMS;
  }

  /** The text actually drawn on the canvas — shaped with tatweel for letter forms. */
  glyphText() {
    const ch = this.current().text;
    if (this.section !== 'forms') return ch;
    if (this.form === 'initial') return ch + 'ـ';
    if (this.form === 'medial') return 'ـ' + ch + 'ـ';
    if (this.form === 'final') return 'ـ' + ch;
    return ch;
  }

  /* ---------- progress (localStorage) ---------- */

  loadProgress() {
    try { return JSON.parse(localStorage.getItem('hw_progress') || '{}') || {}; } catch (e) { return {}; }
  }

  saveProgress() {
    try { localStorage.setItem('hw_progress', JSON.stringify(this.progress)); } catch (e) {}
  }

  /* ---------- brush (localStorage) ---------- */

  loadBrush() {
    try {
      const b = JSON.parse(localStorage.getItem('hw_brush') || '{}') || {};
      return {
        size: HW_SIZES.includes(b.size) ? b.size : 6,
        color: (typeof b.color === 'string' && /^#[0-9a-fA-F]{6}$/.test(b.color)) ? b.color : '#111827'
      };
    } catch (e) { return { size: 6, color: '#111827' }; }
  }

  saveBrush() {
    try { localStorage.setItem('hw_brush', JSON.stringify(this.brush)); } catch (e) {}
  }

  progressKey(text, form) {
    return this.section === 'forms' ? `forms:${text}:${form || this.form}` : `${this.section}:${text}`;
  }

  /** Has target i in the current section been passed (all its forms, for the forms section)? */
  isDone(i) {
    const tg = this.targets()[i];
    if (!tg) return false;
    if (this.section === 'forms') {
      return this.formsFor(tg.text).every(f => (this.progress[`forms:${tg.text}:${f}`] || 0) >= HW_PASS_PCT);
    }
    return (this.progress[this.progressKey(tg.text)] || 0) >= HW_PASS_PCT;
  }

  /** { done, total } practiced counter for the current section. */
  sectionProgress() {
    const list = this.targets();
    if (this.section === 'forms') {
      let done = 0, total = 0;
      list.forEach(tg => this.formsFor(tg.text).forEach(f => {
        total++;
        if ((this.progress[`forms:${tg.text}:${f}`] || 0) >= HW_PASS_PCT) done++;
      }));
      return { done, total };
    }
    let done = 0;
    list.forEach((tg, i) => { if (this.isDone(i)) done++; });
    return { done, total: list.length };
  }

  /**
   * Build the teaching panel HTML injected below the canvas card.
   * Pulls from HW_LETTER_TIPS, HW_CONFUSABLES, HW_WRITING_BASICS,
   * and HW_PRACTICE_WORDS. Never touches canvas state.
   */
  teachingHTML() {
    const isBn = this.language === 'bn';
    const ch = this.current().text;

    // Per-letter writing tip
    const tipData = HW_LETTER_TIPS[ch];
    const tipHTML = tipData ? `
      <div class="flex gap-2 items-start">
        <span class="text-base shrink-0">✏️</span>
        <p class="text-sm text-gray-700 dark:text-gray-300 leading-snug">${isBn ? tipData.bn : tipData.en}</p>
      </div>` : '';

    // Confusable-letters warning for this letter
    const confGroup = HW_CONFUSABLES.find(g => g.letters.includes(ch));
    const confHTML = confGroup ? `
      <div class="flex gap-2 items-start mt-2">
        <span class="text-base shrink-0">⚠️</span>
        <div>
          <p class="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-0.5">
            ${isBn ? 'বিভ্রান্তিকর অক্ষর:' : 'Similar letters:'}
            <span dir="rtl" class="ayah-arabic font-normal">${confGroup.letters.join(' ')}</span>
          </p>
          <p class="text-xs text-gray-600 dark:text-gray-400 leading-snug">${isBn ? confGroup.tip.bn : confGroup.tip.en}</p>
        </div>
      </div>` : '';

    // Expandable fundamentals accordion
    const basicsHTML = HW_WRITING_BASICS.map((b, i) => `
      <details class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"${i === 0 ? ' open' : ''}>
        <summary class="flex items-center gap-2 px-3 py-2 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-200 select-none">
          <span>${b.icon}</span>
          <span class="flex-1">${isBn ? b.title.bn : b.title.en}</span>
          <span class="text-gray-400 text-xs">▾</span>
        </summary>
        <p class="px-3 pb-3 pt-1 text-xs text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700">${isBn ? b.body.bn : b.body.en}</p>
      </details>`).join('');

    // Practice-word grid shown only in the Words section
    const wordsHTML = this.section === 'words' ? `
      <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
        <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          📝 ${isBn ? 'অনুশীলন শব্দ ক্রম' : 'Recommended Practice Sequence'}
        </h4>
        <div class="grid grid-cols-2 gap-1.5" dir="rtl">
          ${HW_PRACTICE_WORDS.map(w => `
            <div class="bg-white dark:bg-gray-800 rounded-lg px-2 py-2 border border-gray-100 dark:border-gray-700 text-center">
              <div class="ayah-arabic text-2xl leading-none mb-0.5">${w.arabic}</div>
              <div class="text-xs font-medium text-gray-600 dark:text-gray-400" dir="ltr">${w.translit}</div>
              <div class="text-xs text-gray-400 dark:text-gray-500 mt-0.5 leading-tight" dir="ltr">${isBn ? w.note.bn : w.note.en}</div>
            </div>`).join('')}
        </div>
      </div>` : '';

    return `
      <div class="mt-4 space-y-3">
        ${(tipHTML || confHTML) ? `
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800">
          <h4 class="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide mb-2">
            📖 ${isBn ? 'লেখার টিপস' : 'Writing Tips'} &nbsp;<span dir="rtl" class="ayah-arabic font-normal text-base normal-case">${ch}</span>
          </h4>
          ${tipHTML}${confHTML}
        </div>` : ''}

        <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
          <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            📐 ${isBn ? 'লেখার মূলনীতি' : 'Writing Fundamentals'}
          </h4>
          <div class="space-y-1.5">${basicsHTML}</div>
        </div>

        ${wordsHTML}

        ${this.harakatHTML()}

        ${this.fatihaHTML()}

        ${this.khatStylesHTML()}
      </div>
    `;
  }

  /**
   * Collapsible panel: the 8 harakat (short-vowel marks, sukūn, shadda, tanwīn).
   * Rendered as a grid of <details> cards — blue header card + amber mistake warning per mark.
   */
  harakatHTML() {
    const isBn = this.language === 'bn';
    const cards = HW_HARAKAT.map(h => `
      <details class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <summary class="flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-white dark:bg-gray-800">
          <span class="ayah-arabic text-2xl leading-none w-10 text-center shrink-0">${h.symbol}</span>
          <span class="flex-1 text-sm font-semibold text-blue-700 dark:text-blue-300">${isBn ? h.name.bn : h.name.en}</span>
          <span class="text-gray-400 text-xs shrink-0">▾</span>
        </summary>
        <div class="px-3 pb-3 pt-2 space-y-1.5 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
          <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            <span class="font-medium text-gray-700 dark:text-gray-300">${isBn ? '📍 স্থান:' : '📍 Placement:'}</span>
            ${isBn ? h.placement.bn : h.placement.en}
          </p>
          <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            <span class="font-medium text-gray-700 dark:text-gray-300">${isBn ? '🔊 উচ্চারণ:' : '🔊 Sound:'}</span>
            ${isBn ? h.sound.bn : h.sound.en}
          </p>
          <div class="flex gap-1.5 items-start mt-1 bg-amber-50 dark:bg-amber-900/20 rounded-lg px-2 py-1.5 border border-amber-100 dark:border-amber-800">
            <span class="shrink-0 text-amber-500">⚠️</span>
            <p class="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">${isBn ? h.mistake.bn : h.mistake.en}</p>
          </div>
        </div>
      </details>`).join('');

    return `
      <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800">
        <details>
          <summary class="flex items-center gap-2 cursor-pointer select-none list-none">
            <h4 class="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide flex-1">
              ◌ ${isBn ? 'হারাকাত ও সুকুন (স্বরচিহ্ন)' : 'Harakat & Sukūn (Diacritics)'}
            </h4>
            <span class="text-blue-400 text-xs shrink-0">▾</span>
          </summary>
          <p class="text-xs text-blue-600 dark:text-blue-400 mt-1 mb-3 leading-relaxed">
            ${isBn
              ? 'হারাকাত ছোট চিহ্ন যা অক্ষরের উপরে বা নিচে বসে এবং উচ্চারণ নির্ধারণ করে। সঠিক তাজওয়ীদ ও কুরআন তেলাওয়াতের জন্য এগুলো সঠিকভাবে লেখা আবশ্যক।'
              : 'Harakat are small marks placed above or below letters to specify vowels and consonant states. Writing them correctly is essential for accurate tajwīd and Quranic recitation.'}
          </p>
          <div class="space-y-1.5">${cards}</div>
        </details>
      </div>`;
  }

  /**
   * Collapsible panel: al-Fātiḥa verse-by-verse stroke guide.
   * Shows each verse's Arabic text, transliteration, and focus-letter tips.
   */
  fatihaHTML() {
    const isBn = this.language === 'bn';
    const verses = HW_FATIHA_STROKES.map(v => {
      const focusItems = v.focusLetters.map(fl => `
        <div class="flex gap-2 items-start">
          <span class="ayah-arabic text-xl leading-none shrink-0 w-8 text-center">${fl.letter}</span>
          <div class="flex-1">
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400 font-mono">${fl.context}</span>
            <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mt-0.5">${isBn ? fl.tip.bn : fl.tip.en}</p>
          </div>
        </div>`).join('');

      return `
        <details class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <summary class="flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-white dark:bg-gray-800">
            <span class="text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0 w-5">${v.verse}.</span>
            <span class="ayah-arabic text-base leading-snug flex-1 text-right" dir="rtl">${v.arabic}</span>
            <span class="text-gray-400 text-xs shrink-0">▾</span>
          </summary>
          <div class="px-3 pb-3 pt-2 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
            <p class="text-xs text-gray-500 dark:text-gray-400 italic mb-1">${v.translit}</p>
            <p class="text-xs text-emerald-700 dark:text-emerald-400 mb-3">${isBn ? v.meaning.bn : v.meaning.en}</p>
            <div class="space-y-2">${focusItems}</div>
          </div>
        </details>`;
    }).join('');

    return `
      <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
        <details>
          <summary class="flex items-center gap-2 cursor-pointer select-none list-none">
            <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex-1">
              📖 ${isBn ? 'সূরা আল-ফাতিহা — আয়াত-ভিত্তিক স্ট্রোক গাইড' : 'Sūrat al-Fātiḥa — Verse-by-Verse Stroke Guide'}
            </h4>
            <span class="text-gray-400 text-xs shrink-0">▾</span>
          </summary>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-3 leading-relaxed">
            ${isBn
              ? 'প্রতিটি আয়াতের জন্য মূল অক্ষর এবং সেই প্রসঙ্গে তাদের স্ট্রোক নির্দেশিকা। হারাকাত সহ অনুশীলন করুন।'
              : 'For each verse, key letters and their stroke guidance in that specific context. Practice with harakat applied.'}
          </p>
          <div class="space-y-1.5">${verses}</div>
        </details>
      </div>`;
  }

  /**
   * Collapsible panel: the 5 major Arabic calligraphic scripts.
   * Each style gets a <details> card with bilingual notes.
   */
  khatStylesHTML() {
    const isBn = this.language === 'bn';
    const styleCards = HW_KHAT_STYLES.map(s => {
      const noteItems = s.notes.map(n => `
        <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">${isBn ? n.bn : n.en}</p>`).join('');

      return `
        <details class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <summary class="flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-white dark:bg-gray-800">
            <span class="text-base shrink-0">${s.emoji}</span>
            <span class="flex-1 text-sm font-semibold text-gray-700 dark:text-gray-200">${isBn ? s.name.bn : s.name.en}</span>
            <span class="text-gray-400 text-xs shrink-0">▾</span>
          </summary>
          <div class="px-3 pb-3 pt-2 space-y-2 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
            ${noteItems}
          </div>
        </details>`;
    }).join('');

    return `
      <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
        <details>
          <summary class="flex items-center gap-2 cursor-pointer select-none list-none">
            <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex-1">
              🖋️ ${isBn ? 'আরবি ক্যালিগ্রাফির পাঁচটি প্রধান শৈলী' : 'Five Major Arabic Calligraphic Scripts'}
            </h4>
            <span class="text-gray-400 text-xs shrink-0">▾</span>
          </summary>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-3 leading-relaxed">
            ${isBn
              ? 'বিভিন্ন প্রসঙ্গে ব্যবহৃত আরবি ক্যালিগ্রাফির পাঁচটি প্রধান শৈলী — তাদের বৈশিষ্ট্য এবং কুরআনিক ব্যবহারের নোট সহ।'
              : 'The five major Arabic calligraphic scripts encountered in various contexts — with notes on their distinguishing traits and Quranic usage.'}
          </p>
          <div class="space-y-1.5">${styleCards}</div>
        </details>
      </div>`;
  }

  render() {
    const lang = this.language;
    this.strokes = [];
    this.reveal = false;
    // Keep the chosen form valid for the current letter
    if (this.section === 'forms' && !this.formsFor(this.current().text).includes(this.form)) this.form = 'isolated';
    const prog = this.sectionProgress();

    this.root.innerHTML = `
      <div class="w-full">
        <div class="text-center mb-4">
          <div class="text-4xl mb-1">✍️</div>
          <h2 class="text-xl font-bold cursor-pointer" title="${t('hw_title', lang)}">${t('hw_title', lang)}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">${t('hw_subtitle', lang)}</p>
          <p class="text-xs mt-1 text-emerald-600 dark:text-emerald-400">⭐ ${t('hw_progress', lang)}: <span id="hw-progress-count">${prog.done}</span>/${prog.total}</p>
        </div>

        <div class="flex justify-center gap-2 mb-4">
          ${['letters', 'forms', 'words'].map(s => `
            <button data-hw-section="${s}" class="px-4 py-2 text-sm rounded-full transition-colors ${s === this.section
              ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}">
              ${t(s === 'letters' ? 'kids_letters' : s === 'forms' ? 'hw_forms' : 'kids_words', lang)}
            </button>`).join('')}
        </div>

        <!-- Every target on one page — tap any harf/word to practise it -->
        <div class="flex flex-wrap justify-center gap-1.5 mb-4" dir="rtl">
          ${this.targets().map((tg, i) => `
            <button data-hw-pick="${i}" class="min-w-[2.75rem] px-2 py-2 rounded-lg ayah-arabic !text-xl !leading-none transition-colors ${i === this.index
              ? 'bg-primary text-white shadow'
              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'} ${this.isDone(i) ? 'ring-2 ring-emerald-400/70' : ''}">${tg.text}</button>`).join('')}
        </div>

        ${this.section === 'forms' ? `
        <div class="flex flex-wrap justify-center gap-1.5 mb-4">
          ${HW_FORMS.map(f => {
            const ok = this.formsFor(this.current().text).includes(f);
            return `
            <button data-hw-form="${f}" ${ok ? '' : 'disabled'} class="px-3 py-1.5 text-xs rounded-lg transition-colors ${f === this.form
              ? 'bg-secondary text-white shadow'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'} disabled:opacity-30 disabled:cursor-not-allowed">
              ${t('hw_form_' + f, lang)}
            </button>`;
          }).join('')}
        </div>
        ${this.formsFor(this.current().text).length < 4 ? `<p class="text-center text-xs text-gray-400 -mt-2 mb-3">${t('hw_no_form', lang)}</p>` : ''}` : ''}

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <div class="flex items-center justify-between mb-2">
            <button data-hw-nav="-1" title="${t('previous', lang)}" aria-label="${t('previous', lang)}"
                    class="w-11 h-11 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-xl disabled:opacity-30">‹</button>
            <div class="text-center">
              <div class="text-sm font-medium text-gray-700 dark:text-gray-200">${this.current().label}${this.section === 'forms' ? ' · ' + t('hw_form_' + this.form, lang) : ''}</div>
              <div class="text-xs text-gray-400">${this.index + 1} / ${this.targets().length}</div>
            </div>
            <div class="flex items-center gap-1">
              <button data-hw-play class="w-11 h-11 rounded-full bg-primary text-white hover:bg-primary/80" title="${t('play', lang)}" aria-label="${t('play', lang)}">▶</button>
              <button data-hw-nav="1" title="${t('next', lang)}" aria-label="${t('next', lang)}"
                      class="w-11 h-11 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-xl disabled:opacity-30">›</button>
            </div>
          </div>

          <div class="relative rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-white" style="touch-action:none;">
            <canvas id="hw-canvas" class="w-full block rounded-xl" style="height:clamp(260px, 50vh, 480px);"></canvas>
          </div>

          <div class="flex flex-wrap justify-center gap-2 mt-3">
            <button data-hw-check class="px-4 py-2 text-sm rounded-lg bg-primary text-white hover:bg-primary/80">✔ ${t('hw_check', lang)}</button>
            <button data-hw-guide class="px-4 py-2 text-sm rounded-lg ${this.guide
              ? 'bg-amber-500 text-white' : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'}">① ${t('hw_guide', lang)}</button>
            <button data-hw-reveal class="px-4 py-2 text-sm rounded-lg bg-secondary text-white hover:bg-secondary/80">✨ ${t('hw_reveal', lang)}</button>
            <button data-hw-undo class="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">↶ ${t('hw_undo', lang)}</button>
            <button data-hw-clear class="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">${t('clear', lang)}</button>
          </div>

          <!-- Nib controls: ink colour, brush size, and save-as-PNG -->
          <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-3">
            <div class="flex items-center gap-1.5">
              <span class="text-xs text-gray-500 dark:text-gray-400">${t('hw_color', lang)}</span>
              ${HW_COLORS.map(c => `
                <button data-hw-color="${c}" aria-label="${c}" title="${c}"
                        class="w-6 h-6 rounded-full border-2 transition-transform ${c === this.brush.color ? 'border-primary scale-110' : 'border-transparent'}"
                        style="background:${c}"></button>`).join('')}
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-xs text-gray-500 dark:text-gray-400">${t('hw_brush', lang)}</span>
              ${HW_SIZES.map(s => `
                <button data-hw-size="${s}" aria-label="${s}px"
                        class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${s === this.brush.size
                          ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}">
                  <span style="display:inline-block;width:${Math.max(4, Math.round(s / 1.4))}px;height:${Math.max(4, Math.round(s / 1.4))}px;border-radius:9999px;background:currentColor"></span>
                </button>`).join('')}
            </div>
            <button data-hw-download class="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">⬇ ${t('hw_download', lang)}</button>
          </div>

          <div id="hw-feedback" class="text-center text-sm mt-2 min-h-[1.25rem]"></div>
          <p id="hw-hint" class="text-center text-xs text-gray-400 mt-1">${this.guide ? t('hw_guide_hint', lang) : t('hw_hint', lang)}</p>
        </div>
        ${this.teachingHTML()}
      </div>
    `;

    this.setupCanvas();
  }

  setupCanvas() {
    this.canvas = this.root.querySelector('#hw-canvas');
    if (!this.canvas) return;
    this.cw = 0; this.ch = 0; // fresh canvas — no stroke rescale on first sizing
    this.sizeCanvas();

    const pos = (e) => {
      const r = this.canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const start = (e) => {
      e.preventDefault();
      // Capture the pointer so strokes keep recording past the canvas edge.
      try { this.canvas.setPointerCapture(e.pointerId); } catch (err) {}
      this.drawing = true;
      this.strokes.push([pos(e)]);
    };
    const move = (e) => { if (!this.drawing) return; e.preventDefault(); this.strokes[this.strokes.length - 1].push(pos(e)); this.redraw(); };
    const end = (e) => {
      this.drawing = false;
      try { this.canvas.releasePointerCapture(e.pointerId); } catch (err) {}
    };

    this.canvas.addEventListener('pointerdown', start);
    this.canvas.addEventListener('pointermove', move);
    this.canvas.addEventListener('pointerup', end);
    this.canvas.addEventListener('pointercancel', end);
    // The canvas is recreated each render, but window survives — bind pointerup once (safety net).
    if (!this._pointerUpBound) {
      this._pointerUpBound = true;
      this._onPointerUp = () => { this.drawing = false; };
      window.addEventListener('pointerup', this._onPointerUp);
    }

    // Re-size the backing store on rotation/resize so ink stays under the finger.
    if (typeof ResizeObserver !== 'undefined') {
      if (this._resizeObs) this._resizeObs.disconnect();
      this._resizeObs = new ResizeObserver(() => {
        clearTimeout(this._resizeTimer);
        this._resizeTimer = setTimeout(() => this.sizeCanvas(), 120);
      });
      this._resizeObs.observe(this.canvas);
    }
  }

  /** Match the backing store to the CSS box; rescale existing strokes to the new size. */
  sizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return; // hidden (other tab/module) — keep as-is
    const dpr = window.devicePixelRatio || 1;
    if (this.cw && this.ch && (rect.width !== this.cw || rect.height !== this.ch)) {
      const sx = rect.width / this.cw, sy = rect.height / this.ch;
      this.strokes = this.strokes.map(s => s.map(p => ({ x: p.x * sx, y: p.y * sy })));
    }
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(dpr, dpr);
    this.cw = rect.width; this.ch = rect.height;
    this.redraw();
  }

  /** Set the glyph font on ctx, shrinking to fit wide targets (words, medial forms). */
  fitGlyphFont(ctx) {
    let size = Math.round(this.ch * (this.section === 'words' ? 0.44 : 0.65)); // ≈150/220px at the old 340px height
    ctx.font = `${size}px 'CustomArabic','Amiri',serif`;
    const w = ctx.measureText(this.glyphText()).width;
    const maxW = this.cw * 0.88;
    if (w > maxW) {
      size = Math.max(40, Math.floor(size * maxW / w));
      ctx.font = `${size}px 'CustomArabic','Amiri',serif`;
    }
  }

  redraw() {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.clearRect(0, 0, this.cw, this.ch);
    // Guide glyph (faint) — or solid when "reveal"
    const glyph = this.glyphText();
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    this.fitGlyphFont(ctx);
    ctx.fillStyle = this.reveal ? 'rgba(30,64,175,0.85)' : 'rgba(120,120,120,0.14)';
    ctx.fillText(glyph, this.cw / 2, this.ch / 2 + 10);
    ctx.restore();
    // Numbered stroke-direction dots (right-to-left) when the guide is on
    if (this.guide && !this.reveal) this.drawGuideDots(ctx);
    // User strokes
    ctx.strokeStyle = (this.brush && this.brush.color) || '#111827';
    ctx.lineWidth = (this.brush && this.brush.size) || 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const stroke of this.strokes) {
      if (stroke.length < 1) continue;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      stroke.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.stroke();
    }
  }

  /* ---------- template pixels (offscreen, CSS-pixel space — same as strokes) ---------- */

  /** Render the glyph alone on an offscreen canvas and cache its ImageData. */
  templateData() {
    const W = Math.round(this.cw), H = Math.round(this.ch);
    if (!W || !H) return null;
    const key = this.glyphText() + '|' + W + 'x' + H;
    if (this._tplKey === key && this._tpl) return this._tpl;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const x = c.getContext('2d');
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    this.fitGlyphFont(x);
    x.fillStyle = '#000';
    x.fillText(this.glyphText(), this.cw / 2, this.ch / 2 + 10);
    this._tpl = x.getImageData(0, 0, W, H);
    this._tplKey = key;
    this._guidePts = null; // template changed → recompute dots
    return this._tpl;
  }

  /**
   * Numbered guide dots: scan the template's ink columns right-to-left and place
   * evenly spaced dots on the dominant ink run of each sampled column — the
   * writing path of Arabic body strokes (start right, move left).
   */
  guidePoints() {
    if (this._guidePts && this._tplKey === this.glyphText() + '|' + Math.round(this.cw) + 'x' + Math.round(this.ch)) return this._guidePts;
    const img = this.templateData();
    if (!img) return [];
    const d = img.data, W = img.width, H = img.height;
    const cols = [];
    for (let x = 0; x < W; x += 3) {
      let run = null, best = null;
      for (let y = 0; y < H; y++) {
        if (d[(y * W + x) * 4 + 3] > 60) {
          if (run) run.y1 = y; else run = { y0: y, y1: y };
        } else if (run) {
          if (!best || (run.y1 - run.y0) > (best.y1 - best.y0)) best = run;
          run = null;
        }
      }
      if (run && (!best || (run.y1 - run.y0) > (best.y1 - best.y0))) best = run;
      if (best) cols.push({ x, y: (best.y0 + best.y1) / 2 });
    }
    if (cols.length < 2) { this._guidePts = []; return this._guidePts; }
    const inkWidth = cols.length * 3;
    const n = Math.max(3, Math.min(8, Math.round(inkWidth / 70)));
    const pts = [];
    for (let i = 0; i < n; i++) {
      // rightmost column first — Arabic is written right-to-left
      const idx = Math.round((cols.length - 1) * (1 - i / (n - 1)));
      pts.push(cols[idx]);
    }
    this._guidePts = pts;
    return pts;
  }

  drawGuideDots(ctx) {
    const pts = this.guidePoints();
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    pts.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 11, 0, Math.PI * 2);
      ctx.fillStyle = i === 0 ? 'rgba(217,119,6,0.95)' : 'rgba(245,158,11,0.8)';
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(String(i + 1), p.x, p.y + 0.5);
    });
    ctx.restore();
  }

  /* ---------- coverage check ---------- */

  /** Compare user ink against template pixels; score = % of template covered. */
  check() {
    const fb = this.root.querySelector('#hw-feedback');
    if (!fb) return;
    if (!this.strokes.some(s => s.length > 1)) {
      fb.innerHTML = `<span class="text-gray-500 dark:text-gray-400">${t('hw_draw_first', this.language)}</span>`;
      return;
    }
    const tpl = this.templateData();
    if (!tpl) return;
    const W = tpl.width, H = tpl.height;
    // Render the user's strokes alone, thickened for a forgiving tolerance band.
    const uc = document.createElement('canvas');
    uc.width = W; uc.height = H;
    const ux = uc.getContext('2d');
    ux.strokeStyle = '#000';
    ux.lineWidth = 18;
    ux.lineCap = 'round';
    ux.lineJoin = 'round';
    for (const stroke of this.strokes) {
      if (stroke.length < 1) continue;
      ux.beginPath();
      ux.moveTo(stroke[0].x, stroke[0].y);
      stroke.forEach(p => ux.lineTo(p.x, p.y));
      ux.stroke();
    }
    const ud = ux.getImageData(0, 0, W, H).data;
    const td = tpl.data;
    let total = 0, hit = 0;
    for (let y = 0; y < H; y += 2) {
      for (let x = 0; x < W; x += 2) {
        const a = (y * W + x) * 4 + 3;
        if (td[a] > 60) { total++; if (ud[a] > 0) hit++; }
      }
    }
    const pct = total ? Math.round(hit / total * 100) : 0;
    const pass = pct >= HW_PASS_PCT;
    fb.innerHTML = pass
      ? `<span class="font-semibold text-emerald-600 dark:text-emerald-400">🎉 ${t('hw_pass', this.language)} — ${t('hw_score', this.language)}: ${pct}%</span>`
      : `<span class="text-amber-600 dark:text-amber-400">${t('hw_try_again', this.language)} (${t('hw_score', this.language)}: ${pct}%)</span>`;
    // Persist the best score; badge the picker + counter live (no re-render — keep the ink)
    const key = this.progressKey(this.current().text);
    if (pct > (this.progress[key] || 0)) { this.progress[key] = pct; this.saveProgress(); }
    if (pass) {
      const pick = this.root.querySelector(`[data-hw-pick="${this.index}"]`);
      if (pick && this.isDone(this.index)) pick.classList.add('ring-2', 'ring-emerald-400/70');
      const count = this.root.querySelector('#hw-progress-count');
      if (count) count.textContent = String(this.sectionProgress().done);
    }
  }

  playCurrent() {
    const text = this.current().audio;
    if (this._clips && this._clips[text]) {
      this._audio.src = 'audio/qaida/' + this._clips[text];
      this._audio.play().catch(() => {});
    } else if (window.speechSynthesis && typeof SpeechSynthesisUtterance !== 'undefined') {
      const u = new SpeechSynthesisUtterance(text); u.lang = 'ar-SA'; u.rate = 0.8;
      try { speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {}
    }
  }

  /** Flatten the canvas (guide glyph + ink) onto a white page and download a PNG. */
  downloadPNG() {
    if (!this.canvas || !this.canvas.width) return;
    try {
      const out = document.createElement('canvas');
      out.width = this.canvas.width;
      out.height = this.canvas.height;
      const ox = out.getContext('2d');
      if (!ox) return;
      ox.fillStyle = '#ffffff';
      ox.fillRect(0, 0, out.width, out.height);
      ox.drawImage(this.canvas, 0, 0);
      const safe = String(this.current().label || 'letter').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'letter';
      const a = document.createElement('a');
      a.href = out.toDataURL('image/png');
      a.download = `handwriting_${safe}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {}
  }

  /** Stop the clip + TTS this module owns (called on tab/module leave). */
  stopAll() {
    try { this._audio.pause(); } catch (e) {}
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
  }

  onClick(e) {
    const h2 = e.target.closest('h2');
    if (h2 && this.root.contains(h2)) { this.section = 'letters'; this.form = 'isolated'; this.index = 0; this.render(); return; }
    const pick = e.target.closest('[data-hw-pick]');
    if (pick) { this.index = parseInt(pick.getAttribute('data-hw-pick'), 10); this.render(); return; }
    const sec = e.target.closest('[data-hw-section]');
    if (sec) { this.section = sec.getAttribute('data-hw-section'); this.index = 0; this.form = 'isolated'; this.render(); return; }
    const form = e.target.closest('[data-hw-form]');
    if (form && !form.disabled) { this.form = form.getAttribute('data-hw-form'); this.render(); return; }
    const nav = e.target.closest('[data-hw-nav]');
    if (nav) {
      const d = parseInt(nav.getAttribute('data-hw-nav'), 10);
      const n = this.targets().length;
      this.index = (this.index + d + n) % n;
      this.render();
      return;
    }
    if (e.target.closest('[data-hw-play]')) return this.playCurrent();
    if (e.target.closest('[data-hw-check]')) return this.check();
    if (e.target.closest('[data-hw-guide]')) {
      // Live toggle — no re-render, so in-progress ink survives.
      this.guide = !this.guide;
      const btn = this.root.querySelector('[data-hw-guide]');
      if (btn) {
        btn.classList.toggle('bg-amber-500', this.guide);
        btn.classList.toggle('text-white', this.guide);
        btn.classList.toggle('border', !this.guide);
        btn.classList.toggle('border-gray-300', !this.guide);
        btn.classList.toggle('dark:border-gray-600', !this.guide);
      }
      const hint = this.root.querySelector('#hw-hint');
      if (hint) hint.textContent = t(this.guide ? 'hw_guide_hint' : 'hw_hint', this.language);
      this.redraw();
      return;
    }
    const color = e.target.closest('[data-hw-color]');
    if (color) {
      // Live — no re-render, so in-progress ink survives the colour change.
      this.brush.color = color.getAttribute('data-hw-color');
      this.saveBrush();
      this.root.querySelectorAll('[data-hw-color]').forEach(b => {
        const on = b.getAttribute('data-hw-color') === this.brush.color;
        b.classList.toggle('border-primary', on);
        b.classList.toggle('scale-110', on);
        b.classList.toggle('border-transparent', !on);
      });
      this.redraw();
      return;
    }
    const size = e.target.closest('[data-hw-size]');
    if (size) {
      this.brush.size = parseInt(size.getAttribute('data-hw-size'), 10) || 6;
      this.saveBrush();
      this.root.querySelectorAll('[data-hw-size]').forEach(b => {
        const on = parseInt(b.getAttribute('data-hw-size'), 10) === this.brush.size;
        b.classList.toggle('bg-primary', on);
        b.classList.toggle('text-white', on);
        b.classList.toggle('bg-gray-100', !on);
        b.classList.toggle('dark:bg-gray-800', !on);
        b.classList.toggle('text-gray-600', !on);
        b.classList.toggle('dark:text-gray-300', !on);
      });
      this.redraw();
      return;
    }
    if (e.target.closest('[data-hw-download]')) return this.downloadPNG();
    if (e.target.closest('[data-hw-reveal]')) { this.reveal = !this.reveal; this.redraw(); return; }
    if (e.target.closest('[data-hw-undo]')) { this.strokes.pop(); this.redraw(); return; }
    if (e.target.closest('[data-hw-clear]')) {
      this.strokes = []; this.reveal = false; this.redraw();
      const fb = this.root.querySelector('#hw-feedback');
      if (fb) fb.innerHTML = '';
      return;
    }
  }
}

let handwriting;
document.addEventListener('DOMContentLoaded', () => { handwriting = new Handwriting(); });
