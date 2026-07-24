/**
 * Handwriting — DATA MODULE
 * Extracted from js/handwriting.js.
 * Globals: HW_LETTER_TIPS, HW_CONFUSABLES, HW_WRITING_BASICS, HW_PRACTICE_WORDS,
 *   HW_HARAKAT, HW_FATIHA_STROKES, HW_KHAT_STYLES.
 * Loaded BEFORE js/handwriting.js in index.html.
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
  {
    letters: ['ك', 'ل'],
    label: { en: 'Kāf / Lām', bn: 'কাফ / লাম' },
    tip: {
      en: 'Both are tall letters that rise well above the line, and in their initial/medial forms both begin as a tall upright stroke — so beginners confuse them. Kāf has a bent "shoulder" at the top and a small diagonal hamza-like mark inside; Lām is a plain smooth upstroke with no inner mark, ending in a rounded tail that curls below the baseline in isolated/final form.',
      bn: 'দুটিই লম্বা অক্ষর যা লাইনের অনেক উপরে ওঠে, এবং আদি/মধ্য রূপে দুটিই লম্বা খাড়া রেখা হিসেবে শুরু হয় — তাই শিক্ষার্থীরা গুলিয়ে ফেলে। কাফের (ك) উপরে একটি বাঁকানো "কাঁধ" ও ভেতরে ছোট তির্যক হামযার মতো চিহ্ন থাকে; লাম (ل) মসৃণ খাড়া রেখা, কোনো ভেতরের চিহ্ন নেই, বিচ্ছিন্ন/অন্তিম রূপে বেসলাইনের নিচে বাঁকানো লেজে শেষ হয়।'
    }
  },
  {
    letters: ['ا', 'ل'],
    label: { en: 'Alif / Lām', bn: 'আলিফ / লাম' },
    tip: {
      en: 'Both are tall vertical strokes. Alif (ا) is perfectly straight and is a non-connector — it never joins the following letter. Lām (ل) connects on both sides and, in isolated/final form, sweeps into a rounded bowl-tail at the base, whereas Alif has no tail at all.',
      bn: 'দুটিই লম্বা উল্লম্ব রেখা। আলিফ (ا) পুরোপুরি সোজা এবং নন-কানেক্টর — পরের অক্ষরের সাথে কখনো যুক্ত হয় না। লাম (ل) উভয় দিকে সংযুক্ত হয় এবং বিচ্ছিন্ন/অন্তিম রূপে নিচে গোলাকার লেজে বাঁকে, যেখানে আলিফের কোনো লেজ নেই।'
    }
  },
  {
    letters: ['ه', 'ة'],
    label: { en: 'Hā / Tā marbūṭa', bn: 'হা / তা মারবূতা' },
    tip: {
      en: 'Tā marbūṭa (ة) is the Hā (ه) shape with 2 dots added above; it appears only at the end of a word to mark the feminine, and is read as "t" (or a soft "h" when pausing). Hā (ه) has no dots and can occur anywhere in a word. The two dots are the only difference.',
      bn: 'তা মারবূতা (ة) হলো হা-এর (ه) আকৃতির উপরে ২টি বিন্দু যোগ করা রূপ; এটি শুধু শব্দের শেষে স্ত্রীলিঙ্গ বোঝাতে আসে এবং "ত" (বা থামলে নরম "হ") হিসেবে পড়া হয়। হা-তে (ه) কোনো বিন্দু নেই এবং শব্দের যেকোনো স্থানে বসে। ২টি বিন্দুই একমাত্র পার্থক্য।'
    }
  },
  {
    letters: ['ى', 'ي'],
    label: { en: 'Alif maqṣūra / Yā', bn: 'আলিফ মাকসূরা / ইয়া' },
    tip: {
      en: 'Both share the same final bowl that dips below the baseline. Yā (ي) carries 2 dots below; alif maqṣūra (ى) — a final "long-a" written like a dotless yā — has no dots. The presence or absence of the two lower dots is the only thing that tells them apart.',
      bn: 'দুটিতেই একই অন্তিম বাটি যা বেসলাইনের নিচে নামে। ইয়া-তে (ي) নিচে ২টি বিন্দু থাকে; আলিফ মাকসূরা (ى) — বিন্দুহীন ইয়ার মতো লেখা অন্তিম দীর্ঘ "আ" — এর কোনো বিন্দু নেই। নিচের দুটি বিন্দুর উপস্থিতি বা অনুপস্থিতিই এদের আলাদা করার একমাত্র উপায়।'
    }
  },
  {
    letters: ['و', 'ر', 'ز'],
    label: { en: 'Wāw / Rā / Zāy', bn: 'ওয়াও / রা / যায়' },
    tip: {
      en: 'All three have a tail curving down and to the right, and all are non-connectors. Wāw (و) begins with a small closed rounded head at the top before the tail; Rā (ر) and Zāy (ز) have no head — just a plain downward curve (Zāy adds 1 dot above, Rā none). A poorly-closed wāw head is easily mistaken for a rā.',
      bn: 'তিনটিরই নিচে ও ডানে বাঁকানো লেজ আছে এবং তিনটিই নন-কানেক্টর। ওয়াও (و) লেজের আগে উপরে একটি ছোট বন্ধ গোলাকার মাথা দিয়ে শুরু হয়; রা (ر) ও যায় (ز)-এর কোনো মাথা নেই — শুধু একটি নিম্নমুখী বক্ররেখা (যায়ে উপরে ১টি বিন্দু, রা-তে নেই)। খারাপভাবে বন্ধ করা ওয়াওয়ের মাথা সহজেই রা-এর সাথে গুলিয়ে যায়।'
    }
  },
  {
    letters: ['ء', 'ع'],
    label: { en: 'Hamza / ʿAyn', bn: 'হামযা / আইন' },
    tip: {
      en: 'The hamza (ء) is a small standalone glottal-stop mark shaped like the head of ʿAyn (ع) — historically it derives from a miniature ʿayn. ʿAyn is a full-size letter with a teardrop/eye head and a descending tail that connects to its neighbours; hamza is tiny, sits above or beside its carrier, and never connects.',
      bn: 'হামযা (ء) একটি ছোট স্বতন্ত্র গলদেশীয়-বিরতি চিহ্ন যা আইনের (ع) মাথার মতো আকৃতির — ঐতিহাসিকভাবে এটি একটি ক্ষুদ্র আইন থেকে এসেছে। আইন একটি পূর্ণ আকারের অক্ষর, অশ্রু/চোখের মাথা ও নিম্নমুখী লেজ সহ যা প্রতিবেশীর সাথে যুক্ত হয়; হামযা ক্ষুদ্র, তার বাহকের উপরে বা পাশে বসে এবং কখনো যুক্ত হয় না।'
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
  { arabic: 'أُمّ',        translit: 'Umm',       note: { en: 'Mother — Alif·Mīm (shadda)', bn: 'মা — আলিফ·মিম (শাদ্দা)' } },
  { arabic: 'قَمَر',      translit: 'Qamar',     note: { en: 'Moon — Qāf·Mīm·Rā', bn: 'চাঁদ — কাফ·মিম·রা' } },
  { arabic: 'شَمْس',      translit: 'Shams',     note: { en: 'Sun — Shīn·Mīm·Sīn', bn: 'সূর্য — শিন·মিম·সিন' } },
  { arabic: 'نَجْم',      translit: 'Najm',      note: { en: 'Star — Nūn·Jīm·Mīm', bn: 'তারা — নুন·জিম·মিম' } },
  { arabic: 'جَنَّة',      translit: 'Jannah',    note: { en: 'Garden / Paradise — Jīm·Nūn·tā marbūṭa (shadda)', bn: 'বাগান/জান্নাত — জিম·নুন·তা মারবূতা (শাদ্দা)' } },
  { arabic: 'نَار',       translit: 'Nār',       note: { en: 'Fire — Nūn·Alif·Rā', bn: 'আগুন — নুন·আলিফ·রা' } },
  { arabic: 'عِلْم',      translit: 'ʿIlm',      note: { en: 'Knowledge — ʿAyn·Lām·Mīm', bn: 'জ্ঞান — আইন·লাম·মিম' } },
  { arabic: 'دِين',       translit: 'Dīn',       note: { en: 'Religion / way of life — Dāl·Yā·Nūn', bn: 'ধর্ম/জীবনব্যবস্থা — দাল·ইয়া·নুন' } },
  { arabic: 'مَلِك',      translit: 'Malik',     note: { en: 'King — Mīm·Lām·Kāf (Quran 114:2)', bn: 'রাজা — মিম·লাম·কাফ (কুরআন ১১৪:২)' } },
  { arabic: 'حَمْد',      translit: 'Ḥamd',      note: { en: 'Praise — Ḥā·Mīm·Dāl (al-ḥamdu lillāh)', bn: 'প্রশংসা — হা·মিম·দাল (আলহামদুলিল্লাহ)' } },
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
      },
      {
        letter: 'ن', context: 'الرَّحْمَٰنِ',
        tip: { en: 'Final Nūn in Raḥmān carries a kasra (ni). Write the bowl so it dips clearly below the baseline, add the single dot above, then place the kasra beneath — three marks in precise sequence. Students often place the kasra before the dot, which crowds the area below the letter.', bn: 'রাহমানের শেষ নুনে কাসরা (নি)। বাটি স্পষ্টভাবে বেসলাইনের নিচে নামিয়ে লিখুন, উপরে একটি বিন্দু, তারপর নিচে কাসরা — সুনির্দিষ্ট ক্রমে তিনটি চিহ্ন। শিক্ষার্থীরা প্রায়ই বিন্দুর আগে কাসরা দেয়, যা অক্ষরের নিচের জায়গা সংকুচিত করে।' }
      },
      {
        letter: 'ل', context: 'الرَّحْمَٰنِ',
        tip: { en: 'The article Lām connects directly to the following Rā — but Rā is a non-connector, so Lām must complete its forward stroke and stop. Lām provides the connection outward; Rā refuses a backward join. Practice the Lām-to-Rā hand movement as a deliberate pen-lift at the junction.', bn: 'আর্টিকেল লাম সরাসরি পরবর্তী রার সাথে সংযুক্ত হয় — কিন্তু রা নন-কানেক্টর, তাই লামকে তার সামনের স্ট্রোক সম্পন্ন করে থামতে হয়। লাম বাইরের সংযোগ দেয়; রা পেছন থেকে সংযোগ নেয় না। লাম-থেকে-রা হাতের চলন সংযোগস্থলে ইচ্ছাকৃত কলম তোলা হিসেবে অনুশীলন করুন।' }
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

/**
 * Tips for writing in the Kūfī calligraphic style.
 * Kūfī is angular and geometric — no curves, all strokes are straight lines at 90° or 45°.
 * Each entry covers one letter or ligature with bilingual guidance.
 */
const HW_KUFI_TIPS = [
  {
    letter: 'ا',
    tipEn: 'Kufi Alif is a perfectly vertical stroke with a flat horizontal serif at the base and a flat cap at the top — no curves at all. Height equals the module unit (rhombus dot) repeated five times. Common mistake: curving the foot, which makes it look like a Naskh Alif.',
    tipBn: 'কুফি আলিফ সম্পূর্ণ উল্লম্ব রেখা — নিচে সমতল অনুভূমিক সেরিফ ও উপরে সমতল ক্যাপ, কোনো বক্ররেখা নেই। উচ্চতা মডিউল একক (রম্বাস বিন্দু) পাঁচ গুণ সমান। ভুল: পাদস্থান বাঁকালে নাসখ আলিফের মতো দেখায়।'
  },
  {
    letter: 'ب',
    tipEn: 'Kufi Ba is a flat horizontal bar on the baseline with strict right angles at both ends — no curved bowl. The bar should be slightly wider than one module unit. Place the sub-dot directly below the centre of the bar.',
    tipBn: 'কুফি বা বেসলাইনে সমতল অনুভূমিক বার, উভয় প্রান্তে সমকোণ — কোনো বাঁকা বাটি নেই। বার একটি মডিউল এককের চেয়ে সামান্য চওড়া হওয়া উচিত। উপ-বিন্দু সরাসরি বারের কেন্দ্রের নিচে।'
  },
  {
    letter: 'ل',
    tipEn: 'Kufi Lam is a tall, perfectly straight vertical stroke with a clear horizontal foot extending slightly left. All joints are 90° — no curves anywhere. Height is typically double the module width. The foot must not taper or curve.',
    tipBn: 'কুফি লাম লম্বা, সম্পূর্ণ সোজা উল্লম্ব রেখা, সামান্য বামে প্রসারিত স্পষ্ট অনুভূমিক পাদস্থান সহ। সমস্ত কোণ ৯০° — কোথাও বক্ররেখা নেই। উচ্চতা সাধারণত মডিউল প্রস্থের দ্বিগুণ। পাদস্থান সরু বা বাঁকা হওয়া উচিত নয়।'
  },
  {
    letter: 'م',
    tipEn: 'Kufi Mim is a closed diamond or compact square on the baseline, built in four straight strokes: top bar (right-to-left), left vertical (down), base bar (left-to-right), right vertical (up to close). No rounded loops at all.',
    tipBn: 'কুফি মিম বেসলাইনে বন্ধ হীরা বা সংহত বর্গ, চারটি সোজা রেখায়: উপরের বার (ডান থেকে বাম), বাম উল্লম্ব (নিচে), ভিত্তি বার (বাম থেকে ডান), ডান উল্লম্ব (বন্ধ করতে উপরে)। কোনো গোলাকার লুপ নেই।'
  },
  {
    letter: 'ن',
    tipEn: 'Kufi Nun is a flat horizontal bar on the baseline — like Ba but slightly shorter. It does not descend below the baseline as in Naskh. The single sub-dot sits below the centre of the bar. Keep the bar perfectly level.',
    tipBn: 'কুফি নুন বেসলাইনে সমতল অনুভূমিক বার — বার মতো কিন্তু সামান্য ছোট। নাসখের মতো বেসলাইনের নিচে নামে না। একটি উপ-বিন্দু বারের কেন্দ্রের নিচে। বার সম্পূর্ণ সমতল রাখুন।'
  },
  {
    letter: 'ع',
    tipEn: 'Kufi Ayn is an angular bracket or sharp V-shape — not a curved eye as in Naskh. The opening faces right; both arms meet at a pointed apex. All joints are 90° or 45°. The medial Kufi form is a simple right-angle connector.',
    tipBn: 'কুফি আইন কোণাকুণি বন্ধনী বা তীক্ষ্ণ V-আকৃতি — নাসখের মতো বাঁকা চোখ নয়। খোলা মুখ ডানদিকে, উভয় বাহু একটি তীক্ষ্ণ শীর্ষে মেলে। সমস্ত কোণ ৯০° বা ৪৫°। মধ্যবর্তী কুফি রূপ একটি সরল সমকোণ সংযোগকারী।'
  },
  {
    letter: 'ص',
    tipEn: 'Kufi Sad is a rectangle open on the right side, built entirely with straight horizontal and vertical lines. The right-side entry is a short vertical tab — not a curve. The exit tail is a short horizontal bar extending left at baseline level.',
    tipBn: 'কুফি সোয়াদ ডান দিকে খোলা আয়তক্ষেত্র, সম্পূর্ণ সোজা অনুভূমিক ও উল্লম্ব রেখায়। ডান প্রবেশ একটি ছোট উল্লম্ব ট্যাব — বক্ররেখা নয়। বের হওয়ার লেজ বেসলাইন স্তরে বামে প্রসারিত ছোট অনুভূমিক বার।'
  },
  {
    letter: 'لا',
    tipEn: 'The Kufi Lam-Alif ligature forms a symmetrical open triangle. Both strokes rise from a shared baseline point: Lam rises straight up and Alif leans slightly outward. Both arms must be equal in length. No cross-bar — it is an open V.',
    tipBn: 'কুফি লাম-আলিফ লিগেচার প্রতিসমতিক খোলা ত্রিভুজ তৈরি করে। উভয় রেখা একটি ভাগ করা বেসলাইন বিন্দু থেকে ওঠে: লাম সরাসরি উপরে, আলিফ সামান্য বাইরে হেলে। উভয় বাহু দৈর্ঘ্যে সমান। কোনো ক্রস-বার নেই — এটি একটি খোলা V।'
  },
  {
    letter: 'ك',
    tipEn: 'Kufi Kaf is a stepped double-bar form: a wide horizontal base topped by a shorter bar at mid-height, joined on the right by a right-angle vertical. The inner diagonal mark of Naskh Kaf does not appear in Kufi — only the two stepped bars.',
    tipBn: 'কুফি কাফ ধাপযুক্ত দ্বি-বার আকৃতি: মধ্য-উচ্চতায় ছোট বার সহ প্রশস্ত অনুভূমিক ভিত্তি, ডান দিকে সমকোণ উল্লম্ব দ্বারা সংযুক্ত। নাসখ কাফের ভেতরের তির্যক চিহ্ন কুফিতে দেখা যায় না — কেবল দুটি ধাপযুক্ত বার।'
  },
  {
    letter: 'ه',
    tipEn: 'Kufi Ha in isolated form is a small closed square above the baseline, drawn in four straight strokes. No rounded loops. In connected forms it reduces to a small square tab attached to the connecting line. Keep all four sides equal in length.',
    tipBn: 'বিচ্ছিন্ন রূপে কুফি হা বেসলাইনের উপরে ছোট বন্ধ বর্গ, চারটি সোজা রেখায়। কোনো গোলাকার লুপ নেই। সংযুক্ত রূপে এটি সংযোগকারী রেখার সাথে সংযুক্ত ছোট বর্গাকার ট্যাবে পরিণত হয়। চারটি বাহু সমান রাখুন।'
  },
];

/**
 * Arabic-Indic numerals (٠–٩) as used in Quran verse markers and traditional Arabic texts.
 * Each entry includes the digit (0–9), the Arabic-Indic glyph, bilingual names, and a writing tip.
 */
const HW_NUMBERS = [
  {
    digit: 0,
    arabicNumeral: '٠',
    name_en: 'Sifr (zero)',
    name_bn: 'সিফর (শূন্য)',
    tip_en: 'A small open oval, noticeably narrower than the Western zero. It must be visibly smaller than the surrounding letter-height. Common mistake: drawing it so large it is confused with the letter Mim or Waw.',
    tip_bn: 'ছোট খোলা ডিম্বাকৃতি, পশ্চিমা শূন্যের চেয়ে স্পষ্টভাবে সরু। পার্শ্ববর্তী অক্ষরের উচ্চতার চেয়ে ছোট হতে হবে। ভুল: এত বড় করা যে মিম বা ওয়াওয়ের সাথে গুলিয়ে যায়।'
  },
  {
    digit: 1,
    arabicNumeral: '١',
    name_en: 'Wahid (one)',
    name_bn: 'ওয়াহিদ (এক)',
    tip_en: 'A short vertical stroke, similar to Alif but much smaller and without serifs. Keep it straight and compact — it should be clearly shorter than any Alif beside it.',
    tip_bn: 'ছোট উল্লম্ব রেখা, আলিফের মতো কিন্তু অনেক ছোট ও সেরিফ ছাড়া। সোজা ও সংহত রাখুন — পাশের যেকোনো আলিফের চেয়ে স্পষ্টভাবে ছোট হওয়া উচিত।'
  },
  {
    digit: 2,
    arabicNumeral: '٢',
    name_en: 'Ithnan (two)',
    name_bn: 'ইছনান (দুই)',
    tip_en: 'A compact shape like a reversed Z: a short top bar, a diagonal descending connector, then a base bar. In Quran printing it often appears as a small stylised shape with a flat base. Keep all three elements proportionate.',
    tip_bn: 'উল্টো Z-এর মতো সংহত আকৃতি: ছোট উপরের বার, তির্যক অবরোহী সংযোগকারী, তারপর ভিত্তি বার। কুরআন মুদ্রণে প্রায়ই সমতল ভিত্তিসহ ছোট শৈলীযুক্ত আকৃতিতে দেখায়। তিনটি উপাদান সামঞ্জস্যপূর্ণ রাখুন।'
  },
  {
    digit: 3,
    arabicNumeral: '٣',
    name_en: 'Thalatha (three)',
    name_bn: 'ছালাছা (তিন)',
    tip_en: 'Three short horizontal strokes stacked vertically — like three equal shelves of the same length. Common mistake: making them different lengths or tilting them; they must be parallel and equal.',
    tip_bn: 'তিনটি ছোট অনুভূমিক রেখা উল্লম্বভাবে স্ট্যাক করা — একই দৈর্ঘ্যের তিনটি সমান তাকের মতো। ভুল: বিভিন্ন দৈর্ঘ্য বা কাত করা; সমান্তরাল ও সমান হতে হবে।'
  },
  {
    digit: 4,
    arabicNumeral: '٤',
    name_en: 'Arba\u02BFa (four)',
    name_bn: 'আরবাআ (চার)',
    tip_en: 'Resembles a backwards-3 or rotated epsilon: a concave arc opening left, with a small horizontal notch at the midpoint. In Quran verse markers it is often stylised — keep the two arcs equal in size.',
    tip_bn: 'উল্টো-৩ বা ঘোরানো এপসিলনের মতো: বাম দিকে খোলা অবতল চাপ, মধ্যবিন্দুতে ছোট অনুভূমিক খাঁজ সহ। কুরআন আয়াত চিহ্নে প্রায়ই শৈলীযুক্ত — দুটি চাপ সমান আকারের রাখুন।'
  },
  {
    digit: 5,
    arabicNumeral: '٥',
    name_en: 'Khamsa (five)',
    name_bn: 'খামসা (পাঁচ)',
    tip_en: 'A small circle or teardrop with a distinct hook or short tail at the top. The circle must be clean and fully closed. The top hook is the only visible difference from zero — do not omit it.',
    tip_bn: 'উপরে স্বতন্ত্র হুক বা ছোট লেজ সহ ছোট বৃত্ত বা অশ্রু আকৃতি। বৃত্ত পরিষ্কার ও সম্পূর্ণ বন্ধ হতে হবে। উপরের হুকই শূন্য থেকে একমাত্র দৃশ্যমান পার্থক্য — এটি বাদ দেবেন না।'
  },
  {
    digit: 6,
    arabicNumeral: '٦',
    name_en: 'Sitta (six)',
    name_bn: 'সিত্তা (ছয়)',
    tip_en: 'A backwards-6 shape: a curved head at the top opening to the right, with a tail that descends and curves left to end on the baseline. Draw the head first, then bring the stroke down and left.',
    tip_bn: 'উল্টো-৬ আকৃতি: উপরে ডানদিকে খোলা বাঁকা মাথা, বেসলাইনে শেষ হওয়া বামে বাঁকা নামা লেজ সহ। প্রথমে মাথা আঁকুন, তারপর রেখাটি নিচে ও বামে আনুন।'
  },
  {
    digit: 7,
    arabicNumeral: '٧',
    name_en: 'Sab\u02BFa (seven)',
    name_bn: 'সাব্আ (সাত)',
    tip_en: 'A V-shape with a horizontal bar across the top. Draw the top bar first (right-to-left), then the left arm descending diagonally, then the right arm. Keep the V balanced and the top bar centred above the apex.',
    tip_bn: 'উপরে অনুভূমিক বার সহ V-আকৃতি। প্রথমে উপরের বার (ডান থেকে বাম), তারপর তির্যকভাবে নামা বাম বাহু, তারপর ডান বাহু। V সুষম এবং উপরের বার শীর্ষের উপরে কেন্দ্রীভূত রাখুন।'
  },
  {
    digit: 8,
    arabicNumeral: '٨',
    name_en: 'Thamaniya (eight)',
    name_bn: 'ছামানিয়া (আট)',
    tip_en: 'A wide V or downward-opening arc — not two loops like Western 8. Draw a smooth downward arc like a cup or bowl shape. Both upper endpoints must be at the same height.',
    tip_bn: 'প্রশস্ত V বা নিম্নমুখী চাপ — পশ্চিমা ৮-এর মতো দুটি লুপ নয়। কাপ বা বাটির মতো মসৃণ নিম্নমুখী চাপ আঁকুন। দুটি উপরের শেষ বিন্দু একই উচ্চতায় হতে হবে।'
  },
  {
    digit: 9,
    arabicNumeral: '٩',
    name_en: 'Tis\u02BFa (nine)',
    name_bn: 'তিস্আ (নয়)',
    tip_en: 'A reversed-9 shape: a curved head opening to the left, with a tail extending rightward and down to the baseline. The head must be fully closed — an open head is confused with the numeral 4.',
    tip_bn: 'উল্টো-৯ আকৃতি: বাম দিকে খোলা বাঁকা মাথা, ডানে ও বেসলাইনে প্রসারিত লেজ সহ। মাথা সম্পূর্ণ বন্ধ হতে হবে — খোলা মাথা চার সংখ্যার সাথে গুলিয়ে যায়।'
  },
];

/**
 * Common Quranic words for handwriting practice.
 * Each entry includes the Arabic word, transliteration, bilingual meaning,
 * an array of constituent letter names, and bilingual stroke tips.
 */
const HW_COMMON_WORDS = [
  {
    word: '\u0627\u0644\u0644\u0647',
    translit: 'All\u0101h',
    meaningEn: 'God; the one God',
    meaningBn: 'আল্লাহ; একমাত্র ঈশ্বর',
    letters: ['Alif', 'Lam', 'Lam', 'Ha'],
    tipEn: 'The divine name contains a unique double-Lam cluster before the final Ha. Practice the two Lams as one continuous upward movement. The final Ha is small and sits tightly after the second Lam. The raised stroke in the Uthmani mushaf is a maddah variant — write it as a slight upward curve above the second Lam.',
    tipBn: 'দিব্য নামে চূড়ান্ত হার আগে একটি অনন্য দ্বৈত-লাম গুচ্ছ। দুটি লাম একটি অবিরাম উপরমুখী গতি হিসেবে অনুশীলন করুন। চূড়ান্ত হা ছোট এবং দ্বিতীয় লামের পরে শক্তভাবে বসে। উসমানি মুসহাফে উঁচু রেখাটি একটি মাদ্দাহ রূপ — দ্বিতীয় লামের উপরে সামান্য উপরমুখী বক্ররেখা হিসেবে লিখুন।'
  },
  {
    word: '\u0631\u064e\u0628\u0651',
    translit: 'Rabb',
    meaningEn: 'Lord; Sustainer',
    meaningBn: 'রব; প্রতিপালক',
    letters: ['Ra', 'Ba (shadda)'],
    tipEn: 'A very short word: Ra (non-connector) followed by Ba with shadda. Because Ra does not connect forward, Ba begins a fresh stroke. Write the Ba bowl, add the sub-dot, then place the shadda above the bowl. Do not let the gap between Ra and Ba become too wide.',
    tipBn: 'অত্যন্ত ছোট শব্দ: রা (নন-কানেক্টর) তারপর শাদ্দাযুক্ত বা। রা সামনে সংযুক্ত না হওয়ায় বা তাজা স্ট্রোকে শুরু হয়। বার বাটি লিখুন, উপ-বিন্দু দিন, তারপর বাটির উপরে শাদ্দা। রা ও বার মধ্যের ফাঁক খুব বেশি হতে দেবেন না।'
  },
  {
    word: '\u0643\u0650\u062a\u064e\u0627\u0628',
    translit: 'Kit\u0101b',
    meaningEn: 'Book; scripture',
    meaningBn: 'কিতাব; গ্রন্থ',
    letters: ['Kaf', 'Ta', 'Alif', 'Ba'],
    tipEn: 'The Kaf arch must include its inner diagonal mark — beginners often omit it. Ta body is identical to Ba; distinguish them by the two dots above (Ta) versus one dot below (Ba). The long Alif in the middle is a non-connector. Final Ba closes with its sub-dot.',
    tipBn: 'কাফের খিলানে ভেতরের তির্যক চিহ্ন থাকতে হবে — শিক্ষার্থীরা প্রায়ই এটি বাদ দেন। তার শরীর বার মতো; উপরে দুটি বিন্দু (তা) বনাম নিচে একটি বিন্দু (বা) দিয়ে আলাদা করুন। মাঝের দীর্ঘ আলিফ নন-কানেক্টর। চূড়ান্ত বা উপ-বিন্দু দিয়ে শেষ হয়।'
  },
  {
    word: '\u0631\u064e\u0633\u064f\u0648\u0644',
    translit: 'Ras\u016Bl',
    meaningEn: 'Messenger; prophet sent with scripture',
    meaningBn: 'রাসুল; শরিয়তসহ প্রেরিত নবি',
    letters: ['Ra', 'Sin', 'Waw', 'Lam'],
    tipEn: 'The word has two non-connectors (Ra and Waw), breaking it into three segments: Ra | Sin-Waw | Lam. Pay attention to Sin\'s three even teeth before Waw. Because Waw also does not connect forward, the final Lam begins as an isolated-to-final form.',
    tipBn: 'শব্দে দুটি নন-কানেক্টর (রা ও ওয়াও), তিনটি খণ্ডে ভাগ হয়: রা | সিন-ওয়াও | লাম। ওয়াওয়ের আগে সিনের তিনটি সমান দাঁতে মনোযোগ দিন। ওয়াওও সামনে সংযুক্ত না হওয়ায় চূড়ান্ত লাম বিচ্ছিন্ন-থেকে-চূড়ান্ত রূপে শুরু হয়।'
  },
  {
    word: '\u0646\u064e\u0628\u0650\u064a\u0651',
    translit: 'Nab\u012By\u0304',
    meaningEn: 'Prophet',
    meaningBn: 'নবি; আল্লাহর বার্তাবাহক',
    letters: ['Nun', 'Ba', 'Ya (shadda)'],
    tipEn: 'Nun bowl descends below the baseline with one dot above. Ba in medial position has no descending tail. Final Ya carries a shadda — write the Ya bowl with two dots below, then add the shadda above the bowl. The shadda confirms the geminated yy sound.',
    tipBn: 'নুনের বাটি বেসলাইনের নিচে, উপরে একটি বিন্দু। মধ্যবর্তী বার নামা লেজ নেই। চূড়ান্ত ইয়া-তে শাদ্দা — নিচে দুটি বিন্দু দিয়ে ইয়ার বাটি লিখুন, তারপর উপরে শাদ্দা। শাদ্দা দ্বিগুণ yy শব্দ নিশ্চিত করে।'
  },
  {
    word: '\u0645\u064f\u0624\u0645\u0650\u0646',
    translit: 'Mu\u02BEmin',
    meaningEn: 'Believer; one who has faith',
    meaningBn: 'মুমিন; বিশ্বাসী',
    letters: ['Mim', 'Hamza on Waw', 'Mim', 'Nun'],
    tipEn: 'The hamza rests on a Waw seat (\u0624) — draw the small Waw body first, then add the hamza above it. The second Mim is in medial position with no tail. Final Nun bowl dips below the baseline. Both Mims must look identical: compact closed knots.',
    tipBn: 'হামযা ওয়াও আসনে (\u0624) থাকে — প্রথমে ছোট ওয়াওর শরীর, তারপর উপরে হামযা। দ্বিতীয় মিম মধ্যবর্তী, কোনো লেজ নেই। চূড়ান্ত নুনের বাটি বেসলাইনের নিচে। দুটি মিম একই দেখাতে হবে: সংহত বন্ধ গিঁট।'
  },
  {
    word: '\u0645\u064f\u0633\u0652\u0644\u0650\u0645',
    translit: 'Muslim',
    meaningEn: 'Muslim; one who submits to God',
    meaningBn: 'মুসলিম; আল্লাহর কাছে আত্মসমর্পণকারী',
    letters: ['Mim', 'Sin', 'Lam', 'Mim'],
    tipEn: 'Sin in medial position has three small teeth connecting directly to Lam. Keep the teeth even — do not let them blur into a single horizontal bar. Lam connects to the final Mim whose knot descends below the baseline.',
    tipBn: 'মধ্যবর্তী সিনের তিনটি ছোট দাঁত সরাসরি লামের সাথে যুক্ত। দাঁত সমান রাখুন — একটি অনুভূমিক বারে ঝাপসা হতে দেবেন না। লাম চূড়ান্ত মিমের সাথে যুক্ত যার গিঁট বেসলাইনের নিচে।'
  },
  {
    word: '\u0635\u064e\u0644\u064e\u0627\u0629',
    translit: '\u1E62al\u0101t',
    meaningEn: 'Prayer; the ritual salah',
    meaningBn: 'সালাত; নামাজ',
    letters: ['Sad', 'Lam', 'Alif', 'Ta marbuta'],
    tipEn: 'Sad opens with its oval open on the right. Lam rises tall from the Sad exit. The long Alif is a non-connector. The Ta marbuta (\u0629) looks like Ha with two dots above — draw the Ha-shape first, then add both dots.',
    tipBn: 'সোয়াদ ডানে খোলা ডিম্বাকৃতি দিয়ে শুরু। লাম সোয়াদের বের হওয়ার পথ থেকে লম্বা হয়ে ওঠে। দীর্ঘ আলিফ নন-কানেক্টর। তা-মারবুতা (\u0629) উপরে দুটি বিন্দু সহ হার মতো — প্রথমে হার আকৃতি, তারপর উভয় বিন্দু।'
  },
  {
    word: '\u0635\u064e\u0648\u0652\u0645',
    translit: '\u1E62awm',
    meaningEn: 'Fasting; the act of sawm',
    meaningBn: 'সওম; রোজা',
    letters: ['Sad', 'Waw', 'Mim'],
    tipEn: 'Sad connects to Waw, which is a non-connector. Because Waw does not connect forward, the final Mim begins as an isolated form. The final Mim tail descends below the baseline. Practice the Sad-to-Waw connection as a single fluid movement.',
    tipBn: 'সোয়াদ ওয়াওয়ের সাথে সংযুক্ত, যা নন-কানেক্টর। ওয়াও সামনে সংযুক্ত না হওয়ায় চূড়ান্ত মিম বিচ্ছিন্ন রূপে শুরু হয়। চূড়ান্ত মিমের লেজ বেসলাইনের নিচে। সোয়াদ-থেকে-ওয়াও সংযোগ একটি অবিরাম গতি হিসেবে অনুশীলন করুন।'
  },
  {
    word: '\u0632\u064e\u0643\u064e\u0627\u0629',
    translit: 'Zak\u0101t',
    meaningEn: 'Almsgiving; obligatory charity',
    meaningBn: 'যাকাত; বাধ্যতামূলক দান',
    letters: ['Zay', 'Kaf', 'Alif', 'Ta marbuta'],
    tipEn: 'Zay is a non-connector, so Kaf begins fresh as an initial form. The Kaf inner diagonal mark is often omitted by beginners — include it every time. Kaf connects to the long Alif (non-connector). Ta marbuta closes the word.',
    tipBn: 'যাই নন-কানেক্টর, তাই কাফ প্রারম্ভিক রূপে তাজাভাবে শুরু হয়। কাফের ভেতরের তির্যক চিহ্ন শিক্ষার্থীরা প্রায়ই বাদ দেন — প্রতিবার অন্তর্ভুক্ত করুন। কাফ দীর্ঘ আলিফের (নন-কানেক্টর) সাথে যুক্ত। তা-মারবুতা শব্দ বন্ধ করে।'
  },
  {
    word: '\u062d\u064e\u062c\u0651',
    translit: '\u1E24ajj',
    meaningEn: 'Pilgrimage; the Hajj',
    meaningBn: 'হজ; মক্কার তীর্থযাত্রা',
    letters: ['Ha', 'Jim (shadda)'],
    tipEn: 'Only two letters. Ha hook dips below the baseline with no dot — adding a dot would make it Jim or Kha. Jim carries a shadda and one dot below the hook: write the hook body first, add the dot inside, then the shadda above the hook opening.',
    tipBn: 'মাত্র দুটি অক্ষর। হার হুক বেসলাইনের নিচে, কোনো বিন্দু নেই — বিন্দু দিলে জিম বা খা হয়ে যায়। জিমে শাদ্দা ও হুকের নিচে একটি বিন্দু: প্রথমে হুকের শরীর, হুকের ভেতরে বিন্দু, তারপর হুকের খোলার উপরে শাদ্দা।'
  },
  {
    word: '\u0635\u064e\u0628\u0652\u0631',
    translit: '\u1E62abr',
    meaningEn: 'Patience; steadfast endurance',
    meaningBn: 'সবর; ধৈর্য',
    letters: ['Sad', 'Ba', 'Ra'],
    tipEn: 'Sad connects to Ba (medial), which connects to the non-connector Ra. Ra ends the word with its downward curve below the baseline. The Ba carries a sukun above — draw the bowl and sub-dot, then place the sukun above the bowl confirming no vowel follows Ba.',
    tipBn: 'সোয়াদ মধ্যবর্তী বার সাথে যুক্ত, যা নন-কানেক্টর রার সাথে যুক্ত। রা বেসলাইনের নিচে অবরোহী বক্ররেখা দিয়ে শেষ করে। বা-তে সুকুন — বাটি ও উপ-বিন্দু লিখুন, তারপর বাটির উপরে সুকুন দিয়ে নিশ্চিত করুন বার পরে কোনো স্বর নেই।'
  },
  {
    word: '\u062a\u064e\u0642\u0652\u0648\u064e\u0649',
    translit: 'Taqw\u0101',
    meaningEn: 'God-consciousness; piety',
    meaningBn: 'তাকওয়া; আল্লাহভীতি',
    letters: ['Ta', 'Qaf', 'Waw', 'Alif maqsura'],
    tipEn: 'Ta (two dots above) connects to Qaf. Qaf bowl descends below the baseline and has two dots above; in medial position it has a forward-connecting exit. Waw is a non-connector. The final Alif maqsura (\u0649) looks like Ya without dots — do not add dots or it becomes Ya.',
    tipBn: 'তা (উপরে দুটি বিন্দু) কাফের সাথে যুক্ত। কাফের বাটি বেসলাইনের নিচে, উপরে দুটি বিন্দু; মধ্যবর্তী অবস্থানে সামনে সংযোগের পথ। ওয়াও নন-কানেক্টর। চূড়ান্ত আলিফ-মাকসুরা (\u0649) বিন্দু ছাড়া ইয়ার মতো — বিন্দু দিলে ইয়া হয়ে যাবে।'
  },
  {
    word: '\u0625\u064a\u0645\u064e\u0627\u0646',
    translit: '\u012Am\u0101n',
    meaningEn: 'Faith; sincere belief',
    meaningBn: 'ইমান; বিশ্বাস',
    letters: ['Alif with hamza below', 'Ya', 'Mim', 'Alif', 'Nun'],
    tipEn: 'Opens with Alif + hamza below (\u0625): write the Alif stroke, add the hamza beneath it, then the kasra under the hamza. The Ya in medial position is a flat connector with no dots. Mim connects to the long Alif (non-connector). Final Nun closes with its bowl below the baseline.',
    tipBn: 'আলিফ + নিচে হামযা (\u0625) দিয়ে শুরু: আলিফের রেখা, নিচে হামযা, হামযার নিচে কাসরা। মধ্যবর্তী ইয়া বিন্দু ছাড়া সমতল সংযোগকারী। মিম দীর্ঘ আলিফের সাথে (নন-কানেক্টর) যুক্ত। চূড়ান্ত নুন বেসলাইনের নিচের বাটি দিয়ে শেষ।'
  },
  {
    word: '\u0639\u0650\u0644\u0652\u0645',
    translit: '\u02BFilm',
    meaningEn: 'Knowledge; learning',
    meaningBn: 'ইলম; জ্ঞান',
    letters: ['Ayn', 'Lam', 'Mim'],
    tipEn: 'Opens with Ayn in initial position — the eye-opening faces right, wide and clear. The kasra below Ayn confirms the /i/ vowel. Lam rises tall from the medial exit. Final Mim tail descends below the baseline. This three-letter root is one of the most important in Quranic vocabulary.',
    tipBn: 'প্রারম্ভিক আইন দিয়ে শুরু — চোখের খোলা ডানদিকে, প্রশস্ত ও স্পষ্ট। আইনের নিচের কাসরা /ই/ স্বর নিশ্চিত করে। মধ্যবর্তী বের হওয়ার পথ থেকে লাম লম্বা হয়ে ওঠে। চূড়ান্ত মিমের লেজ বেসলাইনের নিচে। এই তিন-অক্ষরের মূল কুরআনিক শব্দভাণ্ডারের সবচেয়ে গুরুত্বপূর্ণগুলির একটি।'
  },
  {
    word: '\u0631\u064e\u062d\u0652\u0645\u064e\u0629',
    translit: 'Ra\u1E25ma',
    meaningEn: 'Mercy; compassion',
    meaningBn: 'রহমত; দয়া',
    letters: ['Ra', 'Ha', 'Mim', 'Ta marbuta'],
    tipEn: 'Ra (non-connector) is followed by Ha — because Ra does not connect forward, Ha begins as an initial form. The Ha hook descends below the baseline with no dot. Mim connects to the Ta marbuta. The two dots of Ta marbuta must sit above the Ha-shaped body, not inside it.',
    tipBn: 'রা (নন-কানেক্টর) তারপর হা — রা সামনে যুক্ত না হওয়ায় হা প্রারম্ভিক রূপে শুরু। হার হুক বেসলাইনের নিচে, কোনো বিন্দু নেই। মিম তা-মারবুতার সাথে যুক্ত। তা-মারবুতার দুটি বিন্দু হার মতো শরীরের ভেতরে নয়, উপরে বসতে হবে।'
  },
  {
    word: '\u0642\u064f\u0631\u0652\u0622\u0646',
    translit: 'Qur\u02BE\u0101n',
    meaningEn: 'The Quran; the recitation',
    meaningBn: 'কুরআন; আল্লাহর বাণী',
    letters: ['Qaf', 'Ra', 'Alif with maddah', 'Nun'],
    tipEn: 'Qaf bowl descends below the baseline with two dots above. Ra (non-connector) follows with a sukun. The Alif with maddah (\u0622) indicates the long /\u0101/ sound after hamza — draw the Alif, then add the wavy maddah stroke above it. Final Nun closes with its bowl below the baseline.',
    tipBn: 'কাফের বাটি বেসলাইনের নিচে, উপরে দুটি বিন্দু। রা (নন-কানেক্টর) সুকুন সহ অনুসরণ করে। মাদ্দাহ সহ আলিফ (\u0622) হামযার পরে দীর্ঘ /আ/ নির্দেশ করে — আলিফ আঁকুন, তারপর উপরে ঢেউখেলানো মাদ্দাহ রেখা। চূড়ান্ত নুন বেসলাইনের নিচের বাটি দিয়ে শেষ।'
  },
  {
    word: '\u0630\u0650\u0643\u0652\u0631',
    translit: 'Dhikr',
    meaningEn: 'Remembrance of God',
    meaningBn: 'যিকর; আল্লাহর স্মরণ',
    letters: ['Dhal', 'Kaf', 'Ra'],
    tipEn: 'Dhal (non-connector) is the same wedge as Dal but with one dot directly above. Because Dhal does not connect forward, Kaf begins as an initial form. Kaf connects to the non-connector Ra. With two non-connectors, this short word is written in three separate strokes.',
    tipBn: 'যাল (নন-কানেক্টর) দালের মতো কীলক কিন্তু সরাসরি উপরে একটি বিন্দু। যাল সামনে যুক্ত না হওয়ায় কাফ প্রারম্ভিক রূপে শুরু। কাফ নন-কানেক্টর রার সাথে যুক্ত। দুটি নন-কানেক্টর সহ এই ছোট শব্দ তিনটি আলাদা স্ট্রোকে লেখা হয়।'
  },
  {
    word: '\u062f\u064f\u0639\u064e\u0627\u0621',
    translit: 'Du\u02BF\u0101\u02BE',
    meaningEn: 'Supplication; personal prayer',
    meaningBn: 'দুআ; মোনাজাত',
    letters: ['Dal', 'Ayn', 'Alif', 'Hamza'],
    tipEn: 'Dal (non-connector) is followed by Ayn in initial form — wide eye-opening facing right. The long Alif (non-connector) follows. The final standalone hamza (\u0621) is a small curved mark on the baseline — do not confuse it with Ayn or Waw. The word has two non-connectors, producing three stroke-groups.',
    tipBn: 'দাল (নন-কানেক্টর) তারপর প্রারম্ভিক আইন — ডানদিকে প্রশস্ত খোলা চোখ। দীর্ঘ আলিফ (নন-কানেক্টর) অনুসরণ করে। চূড়ান্ত একা হামযা (\u0621) বেসলাইনে ছোট বাঁকা চিহ্ন — আইন বা ওয়াওয়ের সাথে গুলিয়ে ফেলবেন না। দুটি নন-কানেক্টর সহ তিনটি স্ট্রোক গ্রুপ।'
  },
  {
    word: '\u0623\u064e\u062f\u064e\u0628',
    translit: '\u02BEAdab',
    meaningEn: 'Etiquette; proper conduct',
    meaningBn: 'আদব; শিষ্টাচার',
    letters: ['Alif with hamza above', 'Dal', 'Ba'],
    tipEn: 'Alif carries a hamza above (\u0623): write the Alif stroke, then add the hamza at the very top — keep it small and clearly above the Alif tip. Dal (non-connector) follows. Because Dal does not connect forward, Ba begins as a final-form stroke. Final Ba sub-dot closes the word.',
    tipBn: 'আলিফে উপরে হামযা (\u0623): আলিফের রেখা, তারপর একদম উপরে হামযা — ছোট ও আলিফের শীর্ষের সুস্পষ্ট উপরে রাখুন। দাল (নন-কানেক্টর) অনুসরণ করে। দাল সামনে যুক্ত না হওয়ায় বা চূড়ান্ত রূপে শুরু হয়। চূড়ান্ত বার উপ-বিন্দু শব্দ বন্ধ করে।'
  },
  {
    word: '\u0646\u064f\u0648\u0631',
    translit: 'N\u016Br',
    meaningEn: 'Light; divine light',
    meaningBn: 'নুর; আলো',
    letters: ['Nun', 'Waw', 'Ra'],
    tipEn: 'Nun bowl descends below the baseline with one dot above. Waw (non-connector) follows — a small rounded head with a descending tail. Ra (non-connector) ends the word. With two non-connectors (Waw, Ra), the word is written in three separate strokes: Nun | Waw | Ra.',
    tipBn: 'নুনের বাটি বেসলাইনের নিচে, উপরে একটি বিন্দু। ওয়াও (নন-কানেক্টর) অনুসরণ করে — ছোট গোলাকার মাথা ও নামা লেজ। রা (নন-কানেক্টর) শব্দ শেষ করে। দুটি নন-কানেক্টর (ওয়াও, রা) সহ তিনটি আলাদা স্ট্রোক: নুন | ওয়াও | রা।'
  },
  {
    word: '\u0647\u064f\u062f\u064e\u0649',
    translit: 'Hud\u0101',
    meaningEn: 'Guidance; divine guidance',
    meaningBn: 'হুদা; সঠিক পথ দেখানো',
    letters: ['Ha', 'Dal', 'Alif maqsura'],
    tipEn: 'Ha in initial position has a forward-connecting exit stroke. Dal (non-connector) follows. The final Alif maqsura (\u0649) looks exactly like Ya without dots — write the Ya-shaped body but add no dots at all. Adding dots incorrectly produces Ya.',
    tipBn: 'প্রারম্ভিক হার সামনে সংযোগকারী বের হওয়ার পথ আছে। দাল (নন-কানেক্টর) অনুসরণ করে। চূড়ান্ত আলিফ-মাকসুরা (\u0649) বিন্দু ছাড়া ইয়ার মতো — ইয়ার আকৃতির শরীর লিখুন কিন্তু কোনো বিন্দু দেবেন না। বিন্দু দিলে ভুলভাবে ইয়া হবে।'
  },
  {
    word: '\u0634\u064f\u0643\u0652\u0631',
    translit: 'Shukr',
    meaningEn: 'Gratitude; thankfulness',
    meaningBn: 'শুকর; কৃতজ্ঞতা',
    letters: ['Shin', 'Kaf', 'Ra'],
    tipEn: 'Shin has the same three-tooth body as Sin but with three dots above in a triangular formation — two on the lower row, one at the apex. In initial position the teeth connect forward to Kaf. Kaf connects to the non-connector Ra.',
    tipBn: 'শিনের তিন-দাঁতের শরীর সিনের মতো কিন্তু উপরে ত্রিভুজাকারে তিনটি বিন্দু — নিচের সারিতে দুটি, শীর্ষে একটি। প্রারম্ভিক অবস্থানে দাঁত কাফের সাথে যুক্ত। কাফ নন-কানেক্টর রার সাথে যুক্ত।'
  },
  {
    word: '\u0639\u0650\u0628\u064e\u0627\u062f\u064e\u0629',
    translit: '\u02BFIb\u0101da',
    meaningEn: 'Worship; servitude to God',
    meaningBn: 'ইবাদাত; আল্লাহর উপাসনা',
    letters: ['Ayn', 'Ba', 'Alif', 'Dal', 'Ta marbuta'],
    tipEn: 'Ayn (initial) connects to Ba (medial). The long Alif (non-connector) then splits the word. Dal (non-connector) follows, and Ta marbuta closes. With two non-connectors, the word breaks into three segments: Ayn-Ba | Alif | Dal-Ta marbuta.',
    tipBn: 'আইন (প্রারম্ভিক) মধ্যবর্তী বার সাথে যুক্ত। দীর্ঘ আলিফ (নন-কানেক্টর) শব্দ বিভাজন করে। দাল (নন-কানেক্টর) অনুসরণ করে, তা-মারবুতা বন্ধ করে। দুটি নন-কানেক্টর সহ তিনটি খণ্ড: আইন-বা | আলিফ | দাল-তা মারবুতা।'
  },
  {
    word: '\u0625\u0650\u0633\u0652\u0644\u064e\u0627\u0645',
    translit: 'Isl\u0101m',
    meaningEn: 'Islam; submission to God',
    meaningBn: 'ইসলাম; আল্লাহর কাছে আত্মসমর্পণের ধর্ম',
    letters: ['Alif with hamza below', 'Sin', 'Lam', 'Alif', 'Mim'],
    tipEn: 'Opens with Alif + hamza below (\u0625) + kasra. Sin in initial position has three even teeth connecting forward to Lam. Lam connects to the long Alif (non-connector). Final Mim closes with the knot descending below the baseline. Both Alifs in the word must be perfectly vertical.',
    tipBn: 'আলিফ + নিচে হামযা (\u0625) + কাসরা দিয়ে শুরু। প্রারম্ভিক সিনের তিনটি সমান দাঁত লামের সাথে যুক্ত। লাম দীর্ঘ আলিফের (নন-কানেক্টর) সাথে যুক্ত। চূড়ান্ত মিম বেসলাইনের নিচে নামা গিঁট দিয়ে শেষ। শব্দের উভয় আলিফ নিখুঁতভাবে উল্লম্ব হতে হবে।'
  },
];

/**
 * Common mistakes children make when learning to write Arabic letters.
 * Each entry describes the mistake and its correction, bilingually.
 */
const HW_MISTAKES_KIDS = [
  {
    mistakeEn: 'Writing from left to right instead of right to left.',
    mistakeBn: 'ডান থেকে বামের পরিবর্তে বাম থেকে ডানে লেখা।',
    correctEn: 'Arabic is always written from right to left. Start at the right edge of the line and move leftward. Use pre-ruled practice sheets with the right margin clearly marked until the direction feels natural.',
    correctBn: 'আরবি সবসময় ডান থেকে বামে লেখা হয়। লাইনের ডান প্রান্ত থেকে শুরু করে বামে সরুন। যতক্ষণ দিকটি স্বাভাবিক না লাগে ততক্ষণ ডান মার্জিন চিহ্নিত প্রি-রুলড শিট ব্যবহার করুন।'
  },
  {
    mistakeEn: 'Omitting dots entirely — writing Ba, Ta, and Tha as the same bare shape.',
    mistakeBn: 'বিন্দু সম্পূর্ণ বাদ দেওয়া — বা, তা ও সাকে একই বিন্দুবিহীন আকৃতি হিসেবে লেখা।',
    correctEn: 'Dots are not optional decoration — they distinguish entirely different letters and change word meanings. Always complete the letter body first, then add dots as the final step before moving to the next letter.',
    correctBn: 'বিন্দু ঐচ্ছিক সজ্জা নয় — সম্পূর্ণ ভিন্ন অক্ষর আলাদা করে ও শব্দের অর্থ পরিবর্তন করে। সর্বদা প্রথমে অক্ষরের শরীর সম্পূর্ণ করুন, তারপর পরের অক্ষরে যাওয়ার আগে বিন্দু যোগ করুন।'
  },
  {
    mistakeEn: 'Placing dots in the wrong position: above Ba instead of below, or below Ta instead of above.',
    mistakeBn: 'বিন্দু ভুল অবস্থানে: বার নিচের পরিবর্তে উপরে, বা তার উপরের পরিবর্তে নিচে।',
    correctEn: 'Ba has exactly 1 dot below the bowl. Ta has exactly 2 dots above. Tha has exactly 3 dots above. Remember: Ba = 1 below; Ta = 2 above; Tha = 3 above. Never mix these up — the dot count and position are the only difference between these three letters.',
    correctBn: 'বার ঠিক ১টি বিন্দু বাটির নিচে। তার ঠিক ২টি উপরে। সার ঠিক ৩টি উপরে। মনে রাখুন: বা = ১ নিচে; তা = ২ উপরে; সা = ৩ উপরে। এই তিনটির মধ্যে বিন্দুর সংখ্যা ও অবস্থানই একমাত্র পার্থক্য।'
  },
  {
    mistakeEn: 'Making Ha, Jim, and Kha all look identical by misplacing or forgetting their dots.',
    mistakeBn: 'বিন্দু ভুল জায়গায় দিয়ে বা ভুলে গিয়ে হা, জিম ও খাকে একই রকম দেখানো।',
    correctEn: 'All three share the same hook body. Ha has no dot at all. Jim has 1 dot below (inside or just under the hook). Kha has 1 dot above the hook opening. Write the hook first, then decide: zero dots, one below, or one above.',
    correctBn: 'তিনটিরই হুকের শরীর একই। হার কোনো বিন্দু নেই। জিমের ১টি বিন্দু নিচে। খার ১টি বিন্দু হুকের উপরে। প্রথমে হুক লিখুন, তারপর সিদ্ধান্ত নিন: শূন্য বিন্দু, একটি নিচে, বা একটি উপরে।'
  },
  {
    mistakeEn: 'Connecting non-connector letters (Alif, Dal, Dhal, Ra, Zay, Waw) to the following letter.',
    mistakeBn: 'নন-কানেক্টর অক্ষর (আলিফ, দাল, যাল, রা, যাই, ওয়াও) পরবর্তী অক্ষরের সাথে সংযুক্ত করা।',
    correctEn: 'Six Arabic letters never connect to the letter after them. After writing any of these six, lift the pen completely and begin the next letter as if starting fresh. A connecting stroke after these letters is always an error.',
    correctBn: 'আরবিতে ছয়টি অক্ষর কখনো পরবর্তী অক্ষরের সাথে সংযুক্ত হয় না। এই ছয়টির যেকোনোটি লেখার পরে কলম সম্পূর্ণভাবে তুলুন এবং পরের অক্ষর তাজাভাবে শুরু করুন। এই অক্ষরের পরে সংযোগকারী রেখা সবসময় ভুল।'
  },
  {
    mistakeEn: 'Making Alif slanted or curved instead of keeping it perfectly vertical.',
    mistakeBn: 'আলিফ নিখুঁতভাবে উল্লম্ব রাখার পরিবর্তে কাত বা বাঁকা করা।',
    correctEn: 'Alif must be a perfectly vertical stroke. Use the edge of a ruler or the margin line as a visual guide. A slanted Alif looks like a Waw tail or an Alif maqsura. Check vertical alignment after every single Alif until the habit is formed.',
    correctBn: 'আলিফ অবশ্যই নিখুঁতভাবে উল্লম্ব রেখা। দৃশ্যমান গাইড হিসেবে রুলার বা মার্জিন লাইন ব্যবহার করুন। কাত আলিফ ওয়াওয়ের লেজ বা আলিফ-মাকসুরার মতো দেখায়। অভ্যাস তৈরি না হওয়া পর্যন্ত প্রতিটি আলিফের পরে উল্লম্ব সারিবদ্ধতা পরীক্ষা করুন।'
  },
  {
    mistakeEn: 'Drawing the teeth of Sin and Shin unevenly — different heights or spacing.',
    mistakeBn: 'সিন ও শিনের দাঁত অসমানভাবে আঁকা — বিভিন্ন উচ্চতা বা ব্যবধান।',
    correctEn: 'Sin and Shin each have exactly three teeth of equal height and equal spacing. Draw them slowly and deliberately. A useful drill: draw three tiny equal humps as a warm-up before writing the full letter. Uneven teeth are one of the most common errors in early Arabic writing.',
    correctBn: 'সিন ও শিনের প্রতিটিতে ঠিক তিনটি সমান উচ্চতার ও সমব্যবধানের দাঁত। ধীরে ও ইচ্ছাকৃতভাবে আঁকুন। দরকারি অনুশীলন: পুরো অক্ষর লেখার আগে ওয়ার্মআপ হিসেবে তিনটি ছোট সমান কুঁজ আঁকুন। অসমান দাঁত আরবি লেখার শুরুতে সবচেয়ে সাধারণ ভুলগুলির একটি।'
  },
  {
    mistakeEn: 'Using the isolated letter form everywhere, regardless of position in a word.',
    mistakeBn: 'শব্দে অবস্থান নির্বিশেষে সর্বত্র বিচ্ছিন্ন অক্ষর রূপ ব্যবহার করা।',
    correctEn: 'Most Arabic letters have four forms: isolated, initial (start of word), medial (middle), and final (end). Using the isolated form mid-word breaks the word apart and looks unnatural. Learn and practise all four forms of every letter from the beginning.',
    correctBn: 'বেশিরভাগ আরবি অক্ষরের চারটি রূপ আছে: বিচ্ছিন্ন, প্রারম্ভিক (শব্দের শুরু), মধ্যবর্তী এবং চূড়ান্ত (শেষ)। শব্দের মাঝে বিচ্ছিন্ন রূপ ব্যবহার শব্দ ভেঙে দেয় ও অস্বাভাবিক দেখায়। শুরু থেকেই প্রতিটি অক্ষরের চারটি রূপ শিখুন ও অনুশীলন করুন।'
  },
  {
    mistakeEn: 'Omitting the hamza mark on Alif, writing plain Alif where hamzated Alif is required.',
    mistakeBn: 'আলিফে হামযা চিহ্ন বাদ দেওয়া, হামযাযুক্ত আলিফ প্রয়োজন হলে সাদা আলিফ লেখা।',
    correctEn: 'Hamza changes both the pronunciation and the meaning of a word. A plain Alif (ا) is different from Alif with hamza above (أ) or below (إ). In Quran copying, omitting hamza is a serious error. Practice writing the hamza as a small backward-c shape, clearly separate from the Alif body.',
    correctBn: 'হামযা শব্দের উচ্চারণ ও অর্থ উভয়ই পরিবর্তন করে। সাদা আলিফ (ا) উপরে হামযা (أ) বা নিচে হামযা (إ) সহ আলিফ থেকে আলাদা। কুরআন অনুলিপিতে হামযা বাদ দেওয়া গুরুতর ভুল। হামযাকে একটি ছোট উল্টো-c আকৃতি হিসেবে অনুশীলন করুন, আলিফের শরীর থেকে স্পষ্টভাবে আলাদা।'
  },
  {
    mistakeEn: 'Placing harakat (vowel marks) on top of each other in the wrong order.',
    mistakeBn: 'ভুল ক্রমে হারাকাত (স্বর চিহ্ন) একটির উপর আরেকটি বসানো।',
    correctEn: 'When a letter has both a shadda and a vowel, the shadda is written first (closest to the letter) and the vowel sits above the shadda. The correct stack from bottom to top is: letter — shadda — vowel. A kasra always goes below the letter; fatha and damma go above.',
    correctBn: 'কোনো অক্ষরে শাদ্দা ও স্বর উভয়ই থাকলে শাদ্দা প্রথমে (অক্ষরের সবচেয়ে কাছে) এবং স্বর শাদ্দার উপরে। নিচ থেকে উপরে সঠিক স্ট্যাক: অক্ষর — শাদ্দা — স্বর। কাসরা সবসময় অক্ষরের নিচে; ফাতহা ও দাম্মা উপরে।'
  },
  {
    mistakeEn: 'Leaving the Mim knot open so it looks like a reversed Nun or a Qaf.',
    mistakeBn: 'মিমের গিঁট খোলা রেখে দেওয়া, যাতে উল্টো নুন বা কাফের মতো দেখায়।',
    correctEn: 'The Mim knot must be a fully closed loop in all its forms. An open or gap-showing loop is one of the most common Mim errors. After completing the circular stroke, close it deliberately before drawing the connecting tail or exit stroke.',
    correctBn: 'মিমের গিঁট সব রূপেই সম্পূর্ণ বন্ধ লুপ হতে হবে। খোলা বা ফাঁক-দেখানো লুপ মিমের সবচেয়ে সাধারণ ভুলগুলির একটি। গোলাকার স্ট্রোক সম্পূর্ণ করার পরে সংযোগকারী লেজ বা বের হওয়ার স্ট্রোক আঁকার আগে ইচ্ছাকৃতভাবে বন্ধ করুন।'
  },
  {
    mistakeEn: 'Confusing Nun and Ba because their bowls look similar — forgetting that Nun\'s bowl is deeper and its dot is above.',
    mistakeBn: 'নুন ও বার বাটি একই রকম দেখানোর কারণে গুলিয়ে ফেলা — নুনের বাটি গভীর ও বিন্দু উপরে তা ভুলে যাওয়া।',
    correctEn: 'Ba has a shallow bowl resting on the baseline with 1 dot below. Nun has a deeper bowl that dips below the baseline with 1 dot above. The dot position (above vs below) and the bowl depth are the two reliable differences. Always check both before moving on.',
    correctBn: 'বার অগভীর বাটি বেসলাইনে বসে, নিচে ১টি বিন্দু। নুনের গভীর বাটি বেসলাইনের নিচে ডোবে, উপরে ১টি বিন্দু। বিন্দুর অবস্থান (উপরে বনাম নিচে) ও বাটির গভীরতা দুটি নির্ভরযোগ্য পার্থক্য। এগিয়ে যাওয়ার আগে সবসময় দুটোই পরীক্ষা করুন।'
  },
  {
    mistakeEn: 'Writing the Sin/Shin teeth as a single zigzag line instead of three distinct rounded cusps.',
    mistakeBn: 'সিন/শিনের দাঁত তিনটি স্বতন্ত্র গোলাকার কাস্পের পরিবর্তে একটি জিগজ্যাগ রেখা হিসেবে লেখা।',
    correctEn: 'Each tooth of Sin and Shin is a small gentle curve with a clear valley between it and its neighbour. A zigzag produces angular points rather than smooth cusps, which is wrong in Naskh. Slow down and draw each cusp separately: up, over the top, down into the valley, up again.',
    correctBn: 'সিন ও শিনের প্রতিটি দাঁত একটি ছোট মৃদু বক্ররেখা যার পাশের দাঁতের সাথে স্পষ্ট উপত্যকা। জিগজ্যাগে মসৃণ কাস্পের পরিবর্তে কোণাকুণি বিন্দু তৈরি হয়, যা নাসখে ভুল। ধীর হোন এবং প্রতিটি কাস্প আলাদাভাবে আঁকুন: উপরে, শীর্ষ পার হয়ে, উপত্যকায় নিচে, আবার উপরে।'
  },
];
