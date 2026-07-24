/**
 * Islam -> Makruh (Discouraged Acts) module.
 *
 * Renders into #makruh-container (tab "makruh"). Content covers:
 * definition of makruh, the two sub-types (tanzih i vs tahrim i), common
 * examples with rulings, Quranic warnings, and a self-check accordion.
 * Uses the shared bilingual {en, bn} pattern with CI18N fallback.
 */

const MAKRUH_I18N = {
  islam_makruh_title: { en: 'Makruh (Discouraged)', bn: '\u09ae\u09be\u0995\u09b0\u09c2\u09b9 (\u0985\u09aa\u099b\u09a8\u09cd\u09a6\u09a8\u09c0\u09af\u09bc)', zh: '\u5acc\u6076 (Makruh)', ja: '\u5acc\u60aa\u884c\u70ba\uff08\u30de\u30af\u30eb\u30fc\u30d5\uff09', ar: '\u0627\u0644\u0645\u0643\u0631\u0648\u0647', ur: '\u0645\u06a9\u0631\u0648\u06c1', hi: '\u092e\u0915\u0930\u0942\u0939 (\u0905\u092a\u094d\u0930\u093f\u092f)', fa: '\u0645\u06a9\u0631\u0648\u0647', id: 'Makruh', ms: 'Makruh', tr: 'Mekruh', fr: 'Makr\u016bh (D\u00e9conseill\u00e9)', es: 'Makr\u016bh (Desaconsejado)', de: 'Makr\u016bh (Missbilligt)', ru: '\u041c\u0430\u043a\u0440\u0443\u0445 (\u043d\u0435\u0436\u0435\u043b\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0435)' },
  islam_makruh_subtitle: { en: 'Discouraged acts — not forbidden by explicit prohibition, yet Allah and His Messenger dislike them. Committing them does not incur the full punishment of sin but earns displeasure and, in the stronger form (tahrim i), approaches the boundary of haram.', bn: '\u09ae\u09be\u0995\u09b0\u09c2\u09b9 \u0986\u09ae\u09b2 \u09b8\u09c1\u09b8\u09cd\u09aa\u09b7\u09cd\u099f \u09a8\u09bf\u09b7\u09c7\u09a7\u09be\u099c\u09cd\u099e\u09be \u09a6\u09cd\u09ac\u09be\u09b0\u09be \u09b9\u09be\u09b0\u09be\u09ae \u09a8\u09af\u09bc, \u09a4\u09a5\u09be\u09aa\u09bf \u0986\u09b2\u09cd\u09b2\u09be\u09b9 \u0993 \u09a4\u09be\u0981\u09b0 \u09b0\u09be\u09b8\u09c2\u09b2 \u09a4\u09be \u0985\u09aa\u099b\u09a8\u09cd\u09a6 \u0995\u09b0\u09c7\u09a8\u0964 \u0995\u09b0\u09b2\u09c7 \u09aa\u09c2\u09b0\u09cd\u09a3 \u0997\u09c1\u09a8\u09be\u09b9\u09c7\u09b0 \u09b6\u09be\u09b8\u09cd\u09a4\u09bf \u09a8\u09c7\u0987, \u09a4\u09ac\u09c7 \u0985\u09b8\u09a8\u09cd\u09a4\u09c1\u09b7\u09cd\u099f\u09bf \u09a4\u09c8\u09b0\u09bf \u09b9\u09af\u09bc \u0993 \u09b6\u0995\u09cd\u09a4\u09bf\u09b6\u09be\u09b2\u09c0 \u09aa\u09cd\u09b0\u0995\u09be\u09b0\u09c7 (\u09a4\u09be\u09b9\u09b0\u09bf\u09ae\u09bf) \u09b9\u09be\u09b0\u09be\u09ae\u09c7\u09b0 \u09b8\u09c0\u09ae\u09be\u09a8\u09be\u09af\u09bc \u09aa\u09cc\u0981\u099b\u09c7\u0964' },
  islam_makruh_types: { en: 'Two Types of Makruh', bn: '\u09ae\u09be\u0995\u09b0\u09c2\u09b9\u09c7\u09b0 \u09a6\u09c1\u099f\u09bf \u09aa\u09cd\u09b0\u0995\u09be\u09b0' },
};

const MAKRUH_TYPES = [
  { emoji: '\ud83d\udfe1',
    titleEn: 'Makruh Tanzihi (Lightly Discouraged)', titleBn: '\u09ae\u09be\u0995\u09b0\u09c2\u09b9\u09c7 \u09a4\u09be\u09a8\u09af\u09bf\u09b9\u09bf (\u09b9\u09be\u09b2\u0995\u09be \u0985\u09aa\u099b\u09a8\u09cd\u09a6\u09a8\u09c0\u09af\u09bc)',
    descEn: 'An act that is disliked but whose commission carries no real sin or punishment. The person is better off avoiding it but is not blameworthy if he does it. Example: eating with the left hand unnecessarily.',
    descBn: '\u098f\u09ae\u09a8 \u0986\u09ae\u09b2 \u09af\u09be \u0985\u09aa\u099b\u09a8\u09cd\u09a6\u09a8\u09c0\u09af\u09bc \u09a4\u09ac\u09c7 \u0995\u09b0\u09b2\u09c7 \u09aa\u09cd\u09b0\u0995\u09c3\u09a4 \u0997\u09c1\u09a8\u09be\u09b9 \u09ac\u09be \u09b6\u09be\u09b8\u09cd\u09a4\u09bf \u09a8\u09c7\u0987\u0964 \u09ac\u09bf\u09b0\u09a4 \u09a5\u09be\u0995\u09be\u0987 \u0989\u09a4\u09cd\u09a4\u09ae, \u09a4\u09ac\u09c5 \u0995\u09b0\u09b2\u09c7 \u09a6\u09cb\u09b7\u09a8\u09c0\u09af\u09bc \u09a8\u09af\u09bc\u0964 \u0989\u09a6\u09be\u09b9\u09b0\u09a3: \u0985\u09aa\u09cd\u09b0\u09af\u09bc\u09cb\u099c\u09a8\u09c0\u09af\u09bc\u09ad\u09be\u09ac\u09c7 \u09ac\u09be\u0981 \u09b9\u09be\u09a4\u09c7 \u0996\u09be\u0993\u09af\u09bc\u09be\u0964',
  },
  { emoji: '\ud83d\udfe0',
    titleEn: 'Makruh Tahrimi (Strongly Discouraged)', titleBn: '\u09ae\u09be\u0995\u09b0\u09c2\u09b9\u09c7 \u09a4\u09be\u09b9\u09b0\u09bf\u09ae\u09bf (\u09b6\u0995\u09cd\u09a4\u09ad\u09be\u09ac\u09c7 \u0985\u09aa\u099b\u09a8\u09cd\u09a6\u09a8\u09c0\u09af\u09bc)',
    descEn: 'Closer to haram in strength. It is established by a hadith that is not fully unambiguous (zanni) in both chain and text. Committing it habitually is sinful; repentance is recommended. Example (Hanafi): eating with the left hand when the right is functional.',
    descBn: '\u09b6\u0995\u09cd\u09a4\u09bf\u09a4\u09c7 \u09b9\u09be\u09b0\u09be\u09ae\u09c7\u09b0 \u0995\u09be\u099b\u09be\u0995\u09be\u099b\u09bf\u0964 \u09b8\u09a8\u09a6 \u09ac\u09be \u09b9\u09be\u09a6\u09bf\u09b8\u09c7\u09b0 \u09ac\u09be\u0995\u09cd\u09af \u09b8\u09b0\u09cd\u09ac\u09a4\u09cd\u09b0 \u09b8\u09cd\u09aa\u09b7\u09cd\u099f \u09a8\u09af\u09bc (\u099c\u09be\u09a8\u09cd\u09a8\u09bf) \u09a6\u09cd\u09ac\u09be\u09b0\u09be \u09aa\u09cd\u09b0\u09ae\u09be\u09a3\u09bf\u09a4\u0964 \u0985\u09ad\u09cd\u09af\u09be\u09b8\u0997\u09a4\u09ad\u09be\u09ac\u09c7 \u0995\u09b0\u09b2\u09c7 \u0997\u09c1\u09a8\u09be\u09b9; \u09a4\u09be\u0993\u09ac\u09be \u09b8\u09c1\u09aa\u09be\u09b0\u09bf\u09b6\u0964 \u0989\u09a6\u09be\u09b9\u09b0\u09a3 (\u09b9\u09be\u09a8\u09be\u09ab\u09bf): \u09a1\u09be\u09a8 \u09b9\u09be\u09a4 \u09b8\u09a8\u09cd\u09a8\u09bf\u09b9\u09bf\u09a4 \u09a5\u09be\u0995\u09a4\u09c7 \u09ac\u09be\u0981 \u09b9\u09be\u09a4\u09c7 \u0996\u09be\u0993\u09af\u09bc\u09be\u0964',
  },
];

const MAKRUH_ITEMS = [
  { emoji: '\ud83e\udd2b',
    titleEn: 'Eating or Drinking with the Left Hand', titleBn: '\u09ac\u09be\u0981 \u09b9\u09be\u09a4\u09c7 \u0996\u09be\u0993\u09af\u09bc\u09be \u09ac\u09be \u09aa\u09be\u09a8 \u0995\u09b0\u09be',
    descEn: '"Let none of you eat with his left hand or drink with it, for Shaytan eats with his left and drinks with his left." (Muslim 2020) Using the left when the right is able is makruh tahrimi (Hanafi) or forbidden (Shafi\'i/Hanbali).',
    descBn: '\u201c\u09a4\u09cb\u09ae\u09be\u09a6\u09c7\u09b0 \u0995\u09c7\u0989 \u09af\u09c7\u09a8 \u09ac\u09be\u0981 \u09b9\u09be\u09a4\u09c7 \u09a8\u09be \u0996\u09be\u09af\u09bc \u0993 \u09a8\u09be \u09aa\u09be\u09a8 \u0995\u09b0\u09c7, \u0995\u09be\u09b0\u09a3 \u09b6\u09af\u09bc\u09a4\u09be\u09a8 \u09ac\u09be\u0981 \u09b9\u09be\u09a4\u09c7 \u0996\u09be\u09af\u09bc \u0993 \u09aa\u09be\u09a8 \u0995\u09b0\u09c7\u0964\u201d (\u09ae\u09c1\u09b8\u09b2\u09bf\u09ae \u09e8\u09e6\u09e8\u09e6) \u09a1\u09be\u09a8 \u09b9\u09be\u09a4 \u09b8\u09a8\u09cd\u09a8\u09bf\u09b9\u09bf\u09a4 \u09a5\u09be\u0995\u09a4\u09c7 \u09ac\u09be\u0981 \u09b9\u09be\u09a4 \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0 \u09ae\u09be\u0995\u09b0\u09c2\u09b9\u09c7 \u09a4\u09be\u09b9\u09b0\u09bf\u09ae\u09bf (\u09b9\u09be\u09a8\u09be\u09ab\u09bf) \u09ac\u09be \u09a8\u09bf\u09b7\u09bf\u09a6\u09cd\u09a7 (\u09b6\u09be\u09ab\u09bf\u09af\u09bc\u09bf/\u09b9\u09be\u09ae\u09cd\u09ac\u09b2\u09bf)\u0964',
    ref: 'Muslim 2020',
  },
  { emoji: '\ud83e\udd14',
    titleEn: 'Unnecessary Questions in Salah', titleBn: '\u09b8\u09be\u09b2\u09be\u09a4\u09c7 \u09ac\u09be\u09df\u09be\u09b0\u09cd\u09a5\u0995 \u09aa\u09cd\u09b0\u09b6\u09cd\u09a8',
    descEn: 'Asking trivial or excessive questions about rulings before they occur is discouraged. "Do not ask about matters if they are disclosed to you they would distress you." (2:101 context; Bukhari 7289) However, asking to learn obligatory knowledge is itself obligatory.',
    descBn: '\u09b8\u09be\u09b2\u09be\u09a4\u09c7\u09b0 \u09ac\u09bf\u09b7\u09af\u09bc\u09c7 \u0985\u09aa\u09cd\u09b0\u09af\u09bc\u09cb\u099c\u09a8\u09c0\u09af\u09bc \u09ac\u09be \u0985\u09a4\u09bf\u09b0\u09bf\u0995\u09cd\u09a4 \u09aa\u09cd\u09b0\u09b6\u09cd\u09a8 \u0995\u09b0\u09be \u0985\u09aa\u099b\u09a8\u09cd\u09a6\u09a8\u09c0\u09af\u09bc\u0964 \u201c\u09af\u09c7 \u09ac\u09bf\u09b7\u09af\u09bc\u0997\u09c1\u09b2\u09cb \u09a4\u09cb\u09ae\u09be\u09a6\u09c7\u09b0 \u09aa\u09cd\u09b0\u0995\u09be\u09b6 \u0995\u09b0\u09be \u09b9\u09b2\u09c7 \u09a4\u09cb\u09ae\u09be\u09a6\u09c5\u09b0 \u0995\u09b7\u09cd\u099f \u09a6\u09bf\u09b0, \u09b8\u09c7 \u09b8\u09ae\u09cd\u09aa\u09b0\u09cd\u0995\u09c7 \u09aa\u09cd\u09b0\u09b6\u09cd\u09a8 \u0995\u09b0\u09cb \u09a8\u09be\u0964\u201d (\u09ac\u09c1\u0996\u09be\u09b0\u09bf \u09ed\u09e8\u09ee\u09ef) \u09a4\u09ac\u09c7 \u09ab\u09b0\u099c \u0987\u09b2\u09ae \u09b6\u09c7\u0996\u09be\u09b0 \u099c\u09a8\u09cd\u09af \u09aa\u09cd\u09b0\u09b6\u09cd\u09a8 \u09a8\u09bf\u099c\u09c7\u0987 \u09ab\u09b0\u099c\u0964',
    ref: 'Bukhari 7289',
  },
  { emoji: '\ud83e\udd76',
    titleEn: 'Standing While Drinking (Majority View)', titleBn: '\u09a6\u09be\u0981\u09dc\u09bf\u09af\u09bc\u09c7 \u09aa\u09be\u09a8 \u0995\u09b0\u09be (\u0985\u09a7\u09bf\u0995\u09be\u0982\u09b6 \u0986\u09b2\u09c7\u09ae\u09c7\u09b0 \u09ae\u09a4)',
    descEn: '"None of you should drink while standing; whoever forgot and drank must vomit it." (Muslim 2026) Majority position: strongly discouraged (makruh tahrimi). The Prophet himself occasionally drank Zamzam standing, which scholars explain as indicating permissibility in specific situations.',
    descBn: '\u201c\u09a6\u09be\u0981\u09dc\u09bf\u09af\u09bc\u09c7 \u09aa\u09be\u09a8 \u0995\u09b0\u09be \u09a5\u09c5\u0995\u09c7 \u09ac\u09bf\u09b0\u09a4 \u09a5\u09be\u0995\u09cb\u0964\u201d (\u09ae\u09c1\u09b8\u09b2\u09bf\u09ae \u09e8\u09e6\u09e8\u09ec) \u09b6\u0995\u09cd\u09a4\u09ad\u09be\u09ac\u09c7 \u0985\u09aa\u099b\u09a8\u09cd\u09a6\u09a8\u09c0\u09af\u09bc (\u09ae\u09be\u0995\u09b0\u09c2\u09b9\u09c7 \u09a4\u09be\u09b9\u09b0\u09bf\u09ae\u09bf)\u0964 \u09a8\u09ac\u09c0 \u09b8\u09be\u09b2\u09cd\u09b2\u09be\u09b2\u09cd\u09b2\u09be\u09b9\u09c1 \u0986\u09b2\u09be\u0987\u09b9\u09bf \u0993\u09af\u09bc\u09be\u09b8\u09be\u09b2\u09cd\u09b2\u09be\u09ae \u09a8\u09bf\u099c\u09c7 \u09aa\u09cd\u09b0\u09b8\u0999\u09cd\u0997\u09ac\u09b6\u09a4 \u09a6\u09be\u0981\u09dc\u09bf\u09af\u09bc\u09c7 \u09af\u09ae\u09af\u09ae\u09c7\u09b0 \u09aa\u09be\u09a8\u09bf \u09aa\u09bf\u09af\u09bc\u09c7\u099b\u09bf\u09b2\u09c7\u09a8, \u09af\u09be \u0986\u09b2\u09c7\u09ae\u09b0\u09be \u09ac\u09bf\u09b6\u09c7\u09b7 \u09aa\u09cd\u09b0\u09b8\u0999\u09cd\u0997\u09c7 \u09af\u09be\u09af\u09bc\u09c7\u099c \u09b9\u09bf\u09b8\u09c7\u09ac\u09c7 \u09ac\u09cd\u09af\u09be\u0996\u09cd\u09af\u09be \u0995\u09b0\u09c7\u09a8\u0964',
    ref: 'Muslim 2026',
  },
  { emoji: '\ud83d\udc8d',
    titleEn: 'Over-adornment or Showing Off in Salah', titleBn: '\u09b8\u09be\u09b2\u09be\u09a4\u09c7 \u0985\u09a4\u09bf\u09b0\u09bf\u0995\u09cd\u09a4 \u09b8\u09be\u099c\u09b8\u099c\u09cd\u099c\u09be \u09ac\u09be \u09b0\u09bf\u09af\u09bc\u09be',
    descEn: 'Wearing excessive jewellery or clothing to impress others during salah is discouraged (riya\'). Inward sincerity is the pillar of worship. "Whoever prays to be seen by people, he has committed shirk." (Ahmad)',
    descBn: '\u09b8\u09be\u09b2\u09be\u09a4\u09c7 \u09ae\u09be\u09a8\u09c1\u09b7\u0995\u09c7 \u09a6\u09c7\u0996\u09be\u09a8\u09cb\u09b0 \u099c\u09a8\u09cd\u09af \u0985\u09a4\u09bf\u09b0\u09bf\u0995\u09cd\u09a4 \u0997\u09b9\u09a8\u09be \u09ac\u09be \u09aa\u09cb\u09b6\u09be\u0995 \u09aa\u09b0\u09be \u0985\u09aa\u099b\u09a8\u09cd\u09a6\u09a8\u09c0\u09af\u09bc (\u09b0\u09bf\u09af\u09bc\u09be)\u0964 \u0986\u09a8\u09cd\u09a4\u09b0\u09bf\u0995 \u0987\u0996\u09b2\u09be\u09b8 \u0987\u09ac\u09be\u09a6\u09a4\u09c7\u09b0 \u09b8\u09cd\u09a4\u09ae\u09cd\u09ad\u0964 \u201c\u09af\u09c7 \u09ae\u09be\u09a8\u09c1\u09b7\u0995\u09c7 \u09a6\u09c7\u0996\u09be\u09a8\u09cb\u09b0 \u099c\u09a8\u09cd\u09af \u09a8\u09be\u09ae\u09be\u099c \u09aa\u09a1\u09bc\u09c7, \u09b8\u09c7 \u09b6\u09bf\u09b0\u0995 \u0995\u09b0\u09c7\u099b\u09c7\u0964\u201d (\u0986\u09b9\u09ae\u09be\u09a6)',
    ref: '107:4-6',
  },
  { emoji: '\ud83d\ude29',
    titleEn: 'Excessive Worldly Talk in the Masjid', titleBn: '\u09ae\u09b8\u099c\u09bf\u09a6\u09c7 \u0985\u09a4\u09bf\u09b0\u09bf\u0995\u09cd\u09a4 \u09a6\u09c1\u09a8\u09bf\u09af\u09bc\u09be\u09ac\u09bf \u0995\u09a5\u09be',
    descEn: 'Engaging in excessive idle talk about worldly affairs inside the masjid is makruh. The masjid is for dhikr, prayer, and learning. "Idle talk in the masjid consumes good deeds as fire consumes wood." (attributed, weak chain — scholars advise caution regardless)',
    descBn: '\u09ae\u09b8\u099c\u09bf\u09a6\u09c7 \u09a6\u09c1\u09a8\u09bf\u09af\u09bc\u09be\u09ac\u09bf \u09ac\u09bf\u09b7\u09af\u09bc\u09c7 \u0985\u09a4\u09bf\u09b0\u09bf\u0995\u09cd\u09a4 \u09ac\u09be\u099c\u09c7 \u0995\u09a5\u09be \u09ac\u09b2\u09be \u09ae\u09be\u0995\u09b0\u09c2\u09b9\u0964 \u09ae\u09b8\u099c\u09bf\u09a6 \u09af\u09bf\u0995\u09bf\u09b0, \u09a8\u09be\u09ae\u09be\u099c \u0993 \u0987\u09b2\u09ae\u09c7\u09b0 \u099c\u09a8\u09cd\u09af\u0964 \u09b8\u09a4\u09b0\u09cd\u0995\u09a4\u09be \u09b8\u09b0\u09cd\u09ac\u09a6\u09be \u09aa\u09cd\u09b0\u09af\u09bc\u09cb\u099c\u09a8\u0964',
    ref: '9:18',
  },
  { emoji: '\ud83d\udd0a',
    titleEn: 'Raising the Voice Near Someone Praying', titleBn: '\u09a8\u09be\u09ae\u09be\u099c\u09b0\u09a4 \u09ac\u09cd\u09af\u0995\u09cd\u09a4\u09bf\u09b0 \u09aa\u09be\u09b6\u09c7 \u0989\u0981\u099a\u09c1 \u0995\u09a3\u09cd\\u09a0\u09c7 \u0995\u09a5\u09be',
    descEn: '"Do not trouble each other with your recitation." (Abu Dawud 1332) Disturbing a praying person by raising one\'s voice in conversation or Quran recitation is makruh tanzihi.',
    descBn: '\u201c\u09a4\u09cb\u09ae\u09b0\u09be \u09a4\u09bf\u09b2\u09be\u0993\u09af\u09bc\u09be\u09a4 \u09a6\u09bf\u09af\u09bc\u09c7 \u09aa\u09b0\u09b8\u09cd\u09aa\u09b0\u0995\u09c7 \u0995\u09b7\u09cd\u099f \u09a6\u09bf\u0993 \u09a8\u09be\u0964\u201d (\u0986\u09ac\u09c1 \u09a6\u09be\u0989\u09a6 \u09e7\u09e9\u09e9\u09e8) \u09a8\u09be\u09ae\u09be\u099c\u09b0\u09a4 \u09ac\u09cd\u09af\u0995\u09cd\u09a4\u09bf\u09b0 \u09aa\u09be\u09b6\u09c7 \u0989\u0981\u099a\u09c1 \u0995\u09a3\u09cd\u09a0\u09c7 \u0995\u09a5\u09be \u09ac\u09b2\u09be \u09ac\u09be \u0995\u09c1\u09b0\u0986\u09a8 \u09aa\u09a1\u09bc\u09be \u09ae\u09be\u0995\u09b0\u09c2\u09b9\u09c7 \u09a4\u09be\u09a8\u09af\u09bf\u09b9\u09bf\u0964',
    ref: 'Abu Dawud 1332',
  },
  { emoji: '\ud83d\udd70\ufe0f',
    titleEn: 'Praying During the Three Prohibited Times', titleBn: '\u09a4\u09bf\u09a8\u099f\u09bf \u09a8\u09bf\u09b7\u09bf\u09a6\u09cd\u09a7 \u09b8\u09ae\u09af\u09bc\u09c7 \u09a8\u09be\u09ae\u09be\u099c',
    descEn: 'No nafl prayer at sunrise (ishraq exception aside), solar noon, and sunset. "There are three times during which the Prophet \ufdfa forbade us to pray: when the sun is rising, when it is at its zenith, and when it is setting." (Muslim 831)',
    descBn: '\u09b8\u09c2\u09b0\u09cd\u09af\u09cb\u09a6\u09af\u09bc, \u09a0\u09bf\u0995 \u09a6\u09c1\u09aa\u09c1\u09b0 \u0993 \u09b8\u09c2\u09b0\u09cd\u09af\u09be\u09b8\u09cd\u09a4\u09c7 \u09a8\u09ab\u09b2 \u09a8\u09be\u09ae\u09be\u099c \u09a8\u09be\u0964 \u201c\u09a4\u09bf\u09a8\u09a4\u09bf \u09b8\u09ae\u09af\u09bc \u09a8\u09ac\u09c0 \u09b8\u09be\u09b2\u09cd\u09b2\u09be\u09b2\u09cd\u09b2\u09be\u09b9\u09c1 \u0986\u09b2\u09be\u0987\u09b9\u09bf \u0993\u09af\u09bc\u09be\u09b8\u09be\u09b2\u09cd\u09b2\u09be\u09ae \u0986\u09ae\u09be\u09a6\u09c7\u09b0 \u09a8\u09be\u09ae\u09be\u099c \u09aa\u09dc\u09a4\u09c7 \u09a8\u09bf\u09b7\u09c7\u09a7 \u0995\u09b0\u09c7\u099b\u09c7\u09a8: \u09b8\u09c2\u09b0\u09cd\u09af\u09cb\u09a6\u09af\u09bc, \u09b8\u09c2\u09b0\u09cd\u09af\u09c7\u09b0 \u09ae\u09a7\u09cd\u09af\u09a6\u09c1\u09aa\u09c1\u09b0 \u0993 \u09b8\u09c2\u09b0\u09cd\u09af\u09be\u09b8\u09cd\u09a4\u0964\u201d (\u09ae\u09c1\u09b8\u09b2\u09bf\u09ae \u09ee\u09e9\u09e7)',
    ref: 'Muslim 831',
  },
  { emoji: '\ud83d\udcf1',
    titleEn: 'Being Distracted in Salah', titleBn: '\u09b8\u09be\u09b2\u09be\u09a4\u09c7 \u09ae\u09a8\u09cb\u09af\u09cb\u0997 \u09b9\u09be\u09b0\u09be\u09a8\u09cb',
    descEn: 'Turning the head left or right unnecessarily during prayer is makruh. "It is snatching away that Shaytan does from the prayer of a servant." (Bukhari 751) Deep contemplation (khushu) is the spirit of salah.',
    descBn: '\u09a8\u09be\u09ae\u09be\u099c\u09c7 \u0985\u09aa\u09cd\u09b0\u09af\u09bc\u09cb\u099c\u09a8\u09c0\u09af\u09bc\u09ad\u09be\u09ac\u09c7 \u09a1\u09be\u09a8\u09c7-\u09ac\u09be\u0981\u09af\u09bc\u09c7 \u09ae\u09be\u09a5\u09be \u09b8\u09b0\u09be\u09a8\u09cb \u09ae\u09be\u0995\u09b0\u09c2\u09b9\u0964 \u201c\u0993\u099f\u09be \u09b6\u09af\u09bc\u09a4\u09be\u09a8\u09c7\u09b0 \u099b\u09bf\u09a8\u09be\u09a4\u09be\u0987 \u09af\u09be \u09b8\u09c7 \u09ac\u09be\u09a8\u09cd\u09a6\u09be\u09b0 \u09a8\u09be\u09ae\u09be\u099c \u09a5\u09c5\u0995\u09c7 \u0995\u09b0\u09c7\u0964\u201d (\u09ac\u09c1\u0996\u09be\u09b0\u09bf \u09ed\u09eb\u09e7) \u0996\u09c1\u09b6\u09c2 (\u0997\u09ad\u09c0\u09b0 \u09ae\u09a8\u09cb\u09af\u09cb\u0997) \u09b8\u09be\u09b2\u09be\u09a4\u09c7\u09b0 \u09aa\u09cd\u09b0\u09be\u09a3\u0964',
    ref: 'Bukhari 751',
  },
  { emoji: '🚺',
    titleEn: 'Facing or Turning the Back to the Qibla When Relieving Oneself', titleBn: 'পায়খানা-প্রস্রাবের সময় কিবলামুখী বা পিঠ ফিরিয়ে বসা',
    descEn: 'The Prophet ﷺ said, "When you go to relieve yourselves, neither face the qiblah nor turn your back toward it." (Bukhari & Muslim) In open ground the majority hold this prohibited; inside buildings and screened toilets most scholars rule it makruh rather than haram.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন, "তোমরা যখন পায়খানা-প্রস্রাবে যাও, তখন কিবলামুখী হয়ো না এবং কিবলার দিকে পিঠও ফিরিয়ো না।" (বুখারি ও মুসলিম) খোলা মাঠে অধিকাংশ আলেম এটি নিষিদ্ধ বলেছেন; আবদ্ধ ঘর বা আড়ালযুক্ত টয়লেটে অধিকাংশের মতে তা হারাম নয় বরং মাকরূহ।',
    ref: 'Bukhari & Muslim',
  },
  { emoji: '💧',
    titleEn: 'Wasting Water in Wudu (Israf)', titleBn: 'অজুতে পানি অপচয় করা (ইসরাফ)',
    descEn: 'Using excessive water in wudu is makruh even when performed beside a flowing river. The Prophet ﷺ would make wudu with roughly a mudd (a double handful) of water. Allah says, "Eat and drink, but be not excessive." (7:31)',
    descBn: 'অজুতে অতিরিক্ত পানি ব্যবহার করা মাকরূহ, এমনকি প্রবহমান নদীর ধারে হলেও। নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম প্রায় এক মুদ (দুই হাতের অঞ্জলি পরিমাণ) পানি দিয়ে অজু করতেন। আল্লাহ বলেন, "খাও ও পান করো, কিন্তু অপচয় করো না।" (৭:৩১)',
    ref: '7:31',
  },
  { emoji: '🧄',
    titleEn: 'Eating Raw Garlic or Onion Before Congregation', titleBn: 'জামাতের আগে কাঁচা রসুন বা পেঁয়াজ খাওয়া',
    descEn: 'The Prophet ﷺ said, "Whoever eats garlic or onion, let him keep away from our mosque and stay in his house." (Muslim 564) The offensive odour disturbs the worshippers and the angels; the ruling extends to anything with a strong bad smell, such as smoking.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন, "যে ব্যক্তি রসুন বা পেঁয়াজ খায়, সে যেন আমাদের মসজিদ থেকে দূরে থাকে এবং নিজ ঘরে অবস্থান করে।" (মুসলিম ৫৬৪) দুর্গন্ধ মুসল্লি ও ফেরেশতাদের কষ্ট দেয়; এই বিধান তীব্র দুর্গন্ধযুক্ত যেকোনো কিছু, যেমন ধূমপানের ক্ষেত্রেও প্রযোজ্য।',
    ref: 'Muslim 564',
  },
  { emoji: '🕌',
    titleEn: 'Habitually Neglecting the Sunnah Prayers', titleBn: 'অভ্যাসগতভাবে সুন্নত নামাজ ছেড়ে দেওয়া',
    descEn: 'Persistently abandoning the emphasized sunnah (sunnah muakkadah) attached to the five daily prayers is makruh and, in the Hanafi view, blameworthy and near to sin. "Whoever prays twelve rak\'ahs of sunnah in a day and night, a house will be built for him in Paradise." (Muslim 728)',
    descBn: 'পাঁচ ওয়াক্ত নামাজের সাথে সংযুক্ত সুন্নতে মুয়াক্কাদা নিয়মিত পরিত্যাগ করা মাকরূহ এবং হানাফি মতে গুনাহের কাছাকাছি দোষণীয়। "যে ব্যক্তি দিন-রাতে বারো রাকাত সুন্নত নামাজ পড়ে, তার জন্য জান্নাতে একটি ঘর নির্মাণ করা হয়।" (মুসলিম ৭২৮)',
    ref: 'Muslim 728',
  },
  { emoji: '🌙',
    titleEn: 'Sleeping Before Isha and Idle Talk After It', titleBn: 'ইশার আগে ঘুমানো ও পরে অকারণ কথা বলা',
    descEn: 'The Prophet ﷺ disliked sleeping before the Isha prayer and engaging in idle conversation after it. (Bukhari 568) Sleeping beforehand risks missing the prayer; needless talk afterwards wastes the night and weakens the Fajr. Beneficial talk — knowledge, guests, family — is excepted.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম ইশার নামাজের আগে ঘুমানো এবং তার পরে অনর্থক কথাবার্তা অপছন্দ করতেন। (বুখারি ৫৬৮) আগে ঘুমালে নামাজ ছুটে যাওয়ার আশঙ্কা থাকে; পরে অকারণ কথা রাত নষ্ট করে ও ফজর দুর্বল করে। উপকারী আলোচনা — ইলম, মেহমান, পরিবার — এর ব্যতিক্রম।',
    ref: 'Bukhari 568',
  },
  { emoji: '🚽',
    titleEn: 'Praying While Suppressing the Urge to Relieve Oneself', titleBn: 'পেশাব-পায়খানার বেগ চেপে নামাজ পড়া',
    descEn: 'The Prophet ﷺ said, "There is no prayer in the presence of food, nor while one is resisting the two filths (urine and stool)." (Muslim 560) The distraction removes khushu\'; one should relieve oneself first, even if the congregation may thereby be missed.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন, "খাবার সামনে থাকা অবস্থায় নামাজ নেই, আর দুই ময়লা (পেশাব ও পায়খানা) চেপে রাখা অবস্থায়ও নয়।" (মুসলিম ৫৬০) এতে খুশু নষ্ট হয়; আগে হালকা হয়ে নেওয়া উচিত, যদিও তাতে জামাত ছুটে যায়।',
    ref: 'Muslim 560',
  },
  { emoji: '👁️',
    titleEn: 'Raising the Eyes Toward the Sky in Salah', titleBn: 'নামাজে আকাশের দিকে চোখ তোলা',
    descEn: 'The Prophet ﷺ warned, "Let those who raise their eyes to the sky during prayer stop doing so, or their sight will be snatched away." (Bukhari 750) The gaze should rest on the place of prostration to preserve humility.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম সতর্ক করেছেন, "নামাজে যারা আকাশের দিকে চোখ তোলে তারা যেন বিরত হয়, নতুবা তাদের দৃষ্টি ছিনিয়ে নেওয়া হবে।" (বুখারি ৭৫০) খুশু রক্ষার জন্য দৃষ্টি সিজদার স্থানে রাখা উচিত।',
    ref: 'Bukhari 750',
  },
  { emoji: '🥤',
    titleEn: 'Breathing or Blowing Into Food and Drink', titleBn: 'খাবার ও পানীয়ে ফুঁ দেওয়া বা শ্বাস ফেলা',
    descEn: 'The Prophet ﷺ forbade breathing into the drinking vessel and blowing into it. (Bukhari & Muslim) If a drink is too hot one waits for it to cool rather than blowing on it; when drinking, one breathes outside the cup, in three separate sips.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম পানপাত্রে শ্বাস ফেলা ও তাতে ফুঁ দেওয়া নিষেধ করেছেন। (বুখারি ও মুসলিম) পানীয় গরম হলে ফুঁ না দিয়ে ঠান্ডা হওয়ার অপেক্ষা করবে; পান করার সময় পাত্রের বাইরে শ্বাস নিয়ে তিন শ্বাসে পান করবে।',
    ref: 'Bukhari & Muslim',
  },
  { emoji: '🛒',
    titleEn: 'Buying and Selling After the Jumu\'ah Adhan', titleBn: 'জুমার আজানের পর কেনাবেচা করা',
    descEn: 'Allah says, "When the call is made for prayer on Friday, hasten to the remembrance of Allah and leave off trade." (62:9) After the second adhan the majority hold that transacting becomes sinful (haram), though the sale itself remains valid; before it, worldly business at that hour is at least discouraged.',
    descBn: 'আল্লাহ বলেন, "জুমার দিনে যখন নামাজের আহ্বান করা হয়, তখন আল্লাহর স্মরণে দ্রুত এসো এবং কেনাবেচা ছেড়ে দাও।" (৬২:৯) দ্বিতীয় আজানের পর অধিকাংশ আলেমের মতে লেনদেন গুনাহ (হারাম) হয়ে যায়, যদিও বিক্রয় বৈধ থাকে; তার আগে ওই সময়ের দুনিয়াবি ব্যস্ততা অন্তত অপছন্দনীয়।',
    ref: '62:9',
  },
  { emoji: '🥱',
    titleEn: 'Yawning Openly in Salah Without Restraint', titleBn: 'নামাজে অসংযতভাবে হাই তোলা',
    descEn: 'The Prophet ﷺ said, "Yawning is from Shaytan, so when one of you yawns let him restrain it as much as he can." (Bukhari & Muslim) In prayer one should suppress the yawn or cover the mouth with the hand rather than yielding to it loudly.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন, "হাই শয়তানের পক্ষ থেকে, তাই তোমাদের কেউ হাই তুললে সাধ্যমতো তা দমন করুক।" (বুখারি ও মুসলিম) নামাজে হাই দমন করা বা হাত দিয়ে মুখ ঢেকে রাখা উচিত, উচ্চস্বরে ছেড়ে দেওয়া নয়।',
    ref: 'Bukhari & Muslim',
  },
  { emoji: '👕',
    titleEn: 'Praying in a Single Garment With Nothing on the Shoulders', titleBn: 'কাঁধে কিছু না রেখে এক কাপড়ে নামাজ পড়া',
    descEn: 'The Prophet ﷺ said, "None of you should pray in a single garment with no part of it over his shoulders." (Bukhari 359) Where clothing allows, covering the shoulders is required; praying out of negligence in a tight or scanty single cloth is makruh.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন, "তোমাদের কেউ যেন এমন এক কাপড়ে নামাজ না পড়ে যার কোনো অংশ তার কাঁধে নেই।" (বুখারি ৩৫৯) কাপড় থাকলে কাঁধ ঢাকা আবশ্যক; অবহেলায় আঁটসাঁট বা অপ্রতুল এক কাপড়ে নামাজ পড়া মাকরূহ।',
    ref: 'Bukhari 359',
  },
  { emoji: '👟',
    titleEn: 'Walking in a Single Shoe', titleBn: 'এক জুতা পরে হাঁটা',
    descEn: 'The Prophet ﷺ said, "None of you should walk in one sandal; let him wear both or take off both." (Muslim 2097) Walking in a single shoe is discouraged as it is ungainly, unbalanced, and reflects a heedless manner.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন, "তোমাদের কেউ যেন এক জুতা পরে না হাঁটে; হয় উভয়টি পরুক, নতুবা উভয়টি খুলে ফেলুক।" (মুসলিম ২০৯৭) এক জুতা পরে হাঁটা অসুন্দর, ভারসাম্যহীন ও অসতর্ক আচরণের প্রতিফলন হওয়ায় অপছন্দনীয়।',
    ref: 'Muslim 2097',
  },
  { emoji: '🤝',
    titleEn: 'Interlacing the Fingers While Awaiting Prayer', titleBn: 'নামাজের অপেক্ষায় আঙুলে আঙুল ঢোকানো',
    descEn: 'The Prophet ﷺ said, "When one of you performs wudu well and then goes out to the masjid, let him not interlace his fingers, for he is [reckoned to be] in prayer." (Abu Dawud 562, Tirmidhi 386) Doing so while waiting for or walking to the salah is makruh.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন, "তোমাদের কেউ যখন উত্তমরূপে অজু করে মসজিদের দিকে রওনা হয়, তখন সে যেন আঙুলে আঙুল প্রবেশ না করায়, কারণ সে তো নামাজের মধ্যেই গণ্য।" (আবু দাউদ ৫৬২, তিরমিজি ৩৮৬) নামাজের অপেক্ষায় বা মসজিদে যাওয়ার পথে এমন করা মাকরূহ।',
    ref: 'Abu Dawud 562',
  },
  { emoji: '🍚',
    titleEn: 'Eating from the Middle or Top of the Dish', titleBn: 'খাবারের মাঝখান বা উপর থেকে খাওয়া',
    descEn: 'The Prophet ﷺ said, "Blessing descends in the middle of the food, so eat from its edges and do not eat from its middle." (Tirmidhi 1805, Abu Dawud 3772) Beginning from the centre or top of a shared platter is makruh.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন, "খাবারের মাঝখানে বরকত নাজিল হয়, তাই তোমরা এর কিনারা থেকে খাও এবং মাঝখান থেকে খেয়ো না।" (তিরমিজি ১৮০৫, আবু দাউদ ৩৭৭২) সম্মিলিত পাত্রের মাঝখান বা উপর থেকে খাওয়া শুরু করা মাকরূহ।',
    ref: 'Tirmidhi 1805',
  },
  { emoji: '📅',
    titleEn: 'Singling Out Friday for Voluntary Fasting', titleBn: 'কেবল শুক্রবারকে নফল রোজার জন্য নির্দিষ্ট করা',
    descEn: 'The Prophet ﷺ said, "None of you should fast on Friday unless he fasts a day before it or a day after it." (Bukhari 1985, Muslim 1144) Isolating Friday alone for a voluntary fast is makruh; joining it with Thursday or Saturday removes the dislike.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন, "তোমাদের কেউ যেন কেবল শুক্রবারে রোজা না রাখে, তবে তার আগের বা পরের দিনসহ রাখলে ভিন্ন কথা।" (বুখারি ১৯৮৫, মুসলিম ১১৪৪) কেবল শুক্রবারকে নফল রোজার জন্য নির্দিষ্ট করা মাকরূহ; বৃহস্পতিবার বা শনিবারের সাথে মিলিয়ে রাখলে অপছন্দনীয়তা দূর হয়।',
    ref: 'Muslim 1144',
  },
  { emoji: '😂',
    titleEn: 'Excessive Laughter', titleBn: 'অতিরিক্ত হাসি',
    descEn: 'The Prophet ﷺ said, "Do not laugh too much, for excessive laughter deadens the heart." (Tirmidhi 2305; Ibn Majah 4193, hasan) Cheerfulness and a smiling face are praised, but constant loud laughter hardens the heart and is discouraged.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন, "তোমরা বেশি হেসো না, কারণ অতিরিক্ত হাসি অন্তরকে মৃত করে দেয়।" (তিরমিজি ২৩০৫; ইবনে মাজাহ ৪১৯৩, হাসান) হাসিমুখ ও মুচকি হাসি প্রশংসিত, তবে অবিরাম উচ্চহাসি অন্তর কঠিন করে ও অপছন্দনীয়।',
    ref: 'Tirmidhi 2305',
  },
  { emoji: '🧍',
    titleEn: 'Wishing People to Stand Up for You', titleBn: 'নিজের জন্য লোকদের দাঁড়িয়ে থাকা পছন্দ করা',
    descEn: 'The Prophet ﷺ said, "Whoever loves that people stand up for him, let him take his seat in the Fire." (Abu Dawud 5229, Tirmidhi 2755, hasan) Loving or demanding that others rise in one\'s honour out of pride is makruh; a simple respectful greeting is not.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন, "যে ব্যক্তি পছন্দ করে যে লোকেরা তার জন্য দাঁড়িয়ে থাকুক, সে যেন জাহান্নামে তার আসন গ্রহণ করে।" (আবু দাউদ ৫২২৯, তিরমিজি ২৭৫৫, হাসান) অহংকারবশত অন্যরা তার সম্মানে উঠে দাঁড়াক—এমন কামনা করা মাকরূহ; সাধারণ সম্মানজনক অভ্যর্থনা নয়।',
    ref: 'Abu Dawud 5229',
  },
  { emoji: '⛅',
    titleEn: 'Sitting Partly in Sun and Partly in Shade', titleBn: 'আংশিক রোদে ও আংশিক ছায়ায় বসা',
    descEn: 'The Prophet ﷺ forbade sitting between the sun and the shade, calling it the sitting-place of Shaytan. (Abu Dawud 4821, Ibn Majah 3722) When the sun shifts so that part of the body is in sun and part in shade, one should move fully into one or the other.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম রোদ ও ছায়ার মাঝখানে বসতে নিষেধ করেছেন এবং একে শয়তানের বসার স্থান বলেছেন। (আবু দাউদ ৪৮২১, ইবনে মাজাহ ৩৭২২) সূর্য সরে গিয়ে শরীরের কিছু অংশ রোদে ও কিছু ছায়ায় পড়লে সম্পূর্ণভাবে যেকোনো একদিকে সরে যাওয়া উচিত।',
    ref: 'Abu Dawud 4821',
  },
  { emoji: '🛌',
    titleEn: 'Sleeping Face-Down on the Stomach', titleBn: 'উপুড় হয়ে (পেটের উপর) ঘুমানো',
    descEn: 'The Prophet ﷺ saw a man lying on his stomach and said, "Indeed this is a manner of lying that Allah does not love." (Abu Dawud 5040, Tirmidhi 2768, hasan) The recommended posture is on the right side; sleeping prone is discouraged.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম এক ব্যক্তিকে উপুড় হয়ে শুয়ে থাকতে দেখে বলেছেন, "নিশ্চয়ই এটি এমন শোয়া যা আল্লাহ পছন্দ করেন না।" (আবু দাউদ ৫০৪০, তিরমিজি ২৭৬৮, হাসান) উত্তম হলো ডান কাতে শোয়া; উপুড় হয়ে ঘুমানো অপছন্দনীয়।',
    ref: 'Abu Dawud 5040',
  },
  { emoji: '👖',
    titleEn: 'Letting the Garment Hang Below the Ankles (Isbal)', titleBn: 'গোড়ালির নিচে কাপড় ঝুলিয়ে পরা (ইসবাল)',
    descEn: 'The Prophet ﷺ said, "Whatever of the lower garment is below the ankles is in the Fire." (Bukhari 5787) When done out of arrogance it is haram; when without pride, many scholars rule it makruh. Keeping the hem at or above the ankles is the sunnah.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন, "লুঙ্গি-পায়জামার যে অংশ গোড়ালির নিচে থাকে তা জাহান্নামে।" (বুখারি ৫৭৮৭) অহংকারবশত করলে তা হারাম; অহংকার ছাড়া করলে অনেক আলেমের মতে মাকরূহ। কাপড়ের প্রান্ত গোড়ালির উপরে রাখা সুন্নত।',
    ref: 'Bukhari 5787',
  },
  { emoji: '🤫',
    titleEn: 'Talking During the Friday Khutbah', titleBn: 'জুমার খুতবার সময় কথা বলা',
    descEn: 'The Prophet ﷺ said, "If you say to your companion \'Be quiet\' while the imam is delivering the khutbah on Friday, you have engaged in idle talk." (Bukhari 934, Muslim 851) Even hushing another is discouraged; the majority rule ordinary talk during the khutbah makruh tahrimi, and it voids the special reward of the Jumu\'ah.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন, "জুমার দিন ইমাম খুতবা দেওয়ার সময় তুমি যদি তোমার সঙ্গীকে ‘চুপ করো’ বলো, তবে তুমিও অনর্থক কাজ করলে।" (বুখারি ৯৩৪, মুসলিম ৮৫১) অন্যকে চুপ করানোও অপছন্দনীয়; অধিকাংশ আলেমের মতে খুতবার সময় সাধারণ কথা বলা মাকরূহে তাহরিমি এবং তা জুমার বিশেষ সওয়াব নষ্ট করে।',
    ref: 'Bukhari 934',
  },
  { emoji: '🙇',
    titleEn: 'Reciting the Quran in Ruku or Sujud', titleBn: 'রুকু বা সিজদায় কুরআন তিলাওয়াত করা',
    descEn: 'Ali RA reported that the Prophet ﷺ said, "I have been forbidden from reciting the Quran while bowing or prostrating." (Muslim 479) In ruku one glorifies the Lord ("Subhana Rabbiyal-\'Azim") and in sujud one makes du\'a; reciting Quran in these postures is discouraged.',
    descBn: 'আলী রা. বর্ণনা করেন, নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন, "আমাকে রুকু ও সিজদা অবস্থায় কুরআন পড়তে নিষেধ করা হয়েছে।" (মুসলিম ৪৭৯) রুকুতে রবের পবিত্রতা ঘোষণা ("সুবহানা রাব্বিয়াল আজিম") এবং সিজদায় দোয়া করা হয়; এই অবস্থায় কুরআন তিলাওয়াত করা অপছন্দনীয়।',
    ref: 'Muslim 479',
  },
  { emoji: '📆',
    titleEn: 'Singling Out Saturday for Voluntary Fasting', titleBn: 'কেবল শনিবারকে নফল রোজার জন্য নির্দিষ্ট করা',
    descEn: 'The Prophet ﷺ said, "Do not fast on Saturday except for that which has been made obligatory on you." (Abu Dawud 2421, Tirmidhi 744, hasan) Isolating Saturday resembles others\' veneration of it, so it is makruh; joining it with Friday or Sunday, or fasting the Ayyam al-Bid that fall on it, removes the dislike.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন, "ফরজ রোজা ছাড়া তোমরা শনিবারে রোজা রেখো না।" (আবু দাউদ ২৪২১, তিরমিজি ৭৪৪, হাসান) কেবল শনিবারকে আলাদা করা অন্যদের এই দিনকে বিশেষ মর্যাদা দেওয়ার সাদৃশ্য বহন করে, তাই তা মাকরূহ; শুক্রবার বা রবিবারের সাথে মিলিয়ে অথবা আইয়ামে বীযের সাথে পড়লে অপছন্দনীয়তা দূর হয়।',
    ref: 'Tirmidhi 744',
  },
  { emoji: '🚰',
    titleEn: 'Neglecting the Sunnahs of Wudu', titleBn: 'অজুর সুন্নতসমূহ অবহেলা করা',
    descEn: 'Beyond the obligatory washings, the Prophet ﷺ kept sunnahs in wudu: saying Bismillah, using the miswak, rinsing the mouth and nose, washing each limb three times, and starting from the right. Habitually abandoning these recommended acts is makruh, for it forfeits reward and the light (nur) they bring. Uthman RA demonstrated the complete wudu of the Prophet. (Bukhari 159)',
    descBn: 'ফরজ ধোয়া ছাড়াও নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম অজুতে কিছু সুন্নত পালন করতেন: বিসমিল্লাহ বলা, মিসওয়াক করা, কুলি করা ও নাকে পানি দেওয়া, প্রতিটি অঙ্গ তিনবার ধোয়া এবং ডান দিক থেকে শুরু করা। অভ্যাসগতভাবে এই মুস্তাহাব কাজগুলো ছেড়ে দেওয়া মাকরূহ, কারণ এতে সওয়াব ও নূর হারিয়ে যায়। উসমান রা. নবীর পূর্ণ অজু করে দেখিয়েছেন। (বুখারি ১৫৯)',
    ref: 'Bukhari 159',
  },
  { emoji: '🌃',
    titleEn: 'Habitually Sleeping Without Praying Witr', titleBn: 'অভ্যাসগতভাবে বিতর না পড়ে ঘুমানো',
    descEn: 'The Prophet ﷺ said, "Whoever fears he will not rise at the end of the night, let him pray Witr in its first part." (Muslim 755) He advised making Witr the last prayer of the night. (Bukhari 998) Neglecting it habitually is blameworthy — makruh tahrimi in the Hanafi school, which holds Witr wajib, and a neglected muakkadah sunnah for the majority.',
    descBn: 'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন, "যে আশঙ্কা করে সে রাতের শেষে উঠতে পারবে না, সে যেন রাতের প্রথমভাগে বিতর পড়ে নেয়।" (মুসলিম ৭৫৫) তিনি বিতরকে রাতের শেষ নামাজ করার পরামর্শ দিয়েছেন। (বুখারি ৯৯৮) অভ্যাসগতভাবে তা ছেড়ে দেওয়া নিন্দনীয় — হানাফি মতে মাকরূহে তাহরিমি (তাঁরা বিতরকে ওয়াজিব বলেন), আর অধিকাংশের মতে পরিত্যক্ত সুন্নতে মুয়াক্কাদা।',
    ref: 'Muslim 755',
  },
  { emoji: '🪦',
    titleEn: 'Building Over and Plastering Graves', titleBn: 'কবরের উপর নির্মাণ ও পাকা করা',
    descEn: 'Jabir RA said, "The Messenger of Allah ﷺ forbade that graves be plastered, that they be built upon, and that people sit on them." (Muslim 970) Raising elaborate structures, domes, or writing over graves is discouraged and, when tied to veneration, is feared to lead toward the forbidden; a simple raised marker of about a handspan is the sunnah.',
    descBn: 'জাবির রা. বলেন, "আল্লাহর রাসূল সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম কবর পাকা করা, তার উপর নির্মাণ করা ও তাতে বসা নিষেধ করেছেন।" (মুসলিম ৯৭০) কবরের উপর জাঁকজমকপূর্ণ স্থাপনা, গম্বুজ বা লেখা অপছন্দনীয় এবং মর্যাদা দেওয়ার সাথে জড়িত হলে তা নিষিদ্ধের দিকে নিয়ে যাওয়ার আশঙ্কা থাকে; প্রায় এক বিঘত পরিমাণ সাধারণ উঁচু চিহ্নই সুন্নত।',
    ref: 'Muslim 970',
  },
];

const MAKRUH_QUR = [
  { ref: '5:101', en: '"O you who have believed, do not ask about things which, if they are shown to you, will distress you."', bn: '\u201c\u09b9\u09c7 \u0987\u09ae\u09be\u09a8\u09a6\u09be\u09b0\u0997\u09a3! \u09b8\u09c7\u0987 \u09ac\u09bf\u09b7\u09af\u09bc\u0997\u09c1\u09b2\u09cb \u09b8\u09ae\u09cd\u09aa\u09b0\u09cd\u0995\u09c7 \u09aa\u09cd\u09b0\u09b6\u09cd\u09a8 \u0995\u09b0\u09cb \u09a8\u09be \u09af\u09c7\u0997\u09c1\u09b2\u09cb \u09a4\u09cb\u09ae\u09be\u09a6\u09c5\u09b0 \u09b8\u09be\u09ae\u09a8\u09c7 \u09aa\u09cd\u09b0\u0995\u09be\u09b6 \u0995\u09b0\u09b2\u09c7 \u09a4\u09cb\u09ae\u09be\u09a6\u09c7\u09b0 \u0995\u09b7\u09cd\u099f \u09a6\u09c7\u09ac\u09c7\u0964\u201d' },
  { ref: '9:18', en: '"The masjids of Allah are only to be maintained by those who believe in Allah and the Last Day and establish prayer and give zakah and do not fear except Allah."', bn: '\u201c\u0986\u09b2\u09cd\u09b2\u09be\u09b9\u09b0 \u09ae\u09b8\u099c\u09bf\u09a6\u09b8\u09ae\u09c2\u09b9 \u0995\u09c7\u09ac\u09b2 \u09a4\u09be\u09b0\u09be\u0987 \u0986\u09ac\u09be\u09a6 \u0995\u09b0\u09c7 \u09af\u09be\u09b0\u09be \u0986\u09b2\u09cd\u09b2\u09be\u09b9 \u0993 \u0986\u0996\u09c7\u09b0\u09be\u09a4\u09c7 \u09ac\u09bf\u09b6\u09cd\u09ac\u09be\u09b8 \u0995\u09b0\u09c7, \u09a8\u09be\u09ae\u09be\u099c \u0995\u09be\u09af\u09bc\u09c7\u09ae \u09b0\u09be\u0996\u09c7, \u09af\u09be\u0995\u09be\u09a4 \u09a6\u09c7\u09af\u09bc \u0993 \u0986\u09b2\u09cd\u09b2\u09be\u09b9 \u099b\u09be\u09dc\u09be \u0995\u09be\u0989\u0995\u09c7 \u09ad\u09af\u09bc \u09a8\u09be \u0995\u09b0\u09c7\u0964\u201d' },
  { ref: '107:4-6', en: '"So woe to those who pray but are heedless of their prayer — those who make a show [of it] and withhold [simple] assistance."', bn: '\u201c\u09a4\u09be\u09b9\u09b2\u09c7 \u09a6\u09c1\u09b0\u09cd\u09ad\u09cb\u0997 \u09a4\u09be\u09a6\u09c5\u09b0 \u09af\u09be\u09b0\u09be \u09a8\u09be\u09ae\u09be\u099c \u09aa\u09a1\u09bc\u09c7 \u0995\u09bf\u09a8\u09cd\u09a4\u09c1 \u09a4\u09be\u09a6\u09c7\u09b0 \u09a8\u09be\u09ae\u09be\u099c \u09b8\u09ae\u09cd\u09aa\u09b0\u09cd\u0995\u09c7 \u09ac\u09c7\u0996\u09c7\u09af\u09bc\u09be\u09b2 \u2014 \u09af\u09be\u09b0\u09be \u09b2\u09cb\u0995 \u09a6\u09c7\u0996\u09be\u09a8\u09cb\u09b0 \u099c\u09a8\u09cd\u09af \u0995\u09b0\u09c7 \u0993 \u09b8\u09be\u09a7\u09be\u09b0\u09a3 \u09b8\u09be\u09b9\u09be\u09af\u09cd\u09af \u09a6\u09bf\u09a4\u09c7 \u09ac\u09bf\u09b0\u09a4 \u09a5\u09be\u0995\u09c7\u0964\u201d' },
  { ref: '2:267', en: '"O you who have believed, spend from the good things which you have earned and from that which We have produced for you from the earth. And do not aim toward the defective therefrom, spending from it [while] you would not take it [yourself] except with closed eyes."', bn: '\u201c\u09b9\u09c7 \u0987\u09ae\u09be\u09a8\u09a6\u09be\u09b0\u0997\u09a3! \u09a4\u09cb\u09ae\u09b0\u09be \u09af\u09be \u0989\u09aa\u09be\u09b0\u09cd\u099c\u09a8 \u0995\u09b0\u09c7\u099b\u09cb \u09a4\u09be\u09b0 \u09ad\u09be\u09b2\u09cb \u0985\u0982\u09b6 \u09a5\u09c5\u0995\u09c7 \u09ac\u09cd\u09af\u09af\u09bc \u0995\u09b0\u09cb\u0964 \u0996\u09be\u09b0\u09be\u09aa \u0995\u09bf\u099b\u09c1 \u09a6\u09c7\u0993\u09af\u09bc\u09be\u09b0 \u0989\u09a6\u09cd\u09a6\u09c7\u09b6\u09cd\u09af\u09c7 \u0986\u09b2\u09cd\u09b2\u09be\u09b9\u09b0 \u09aa\u09a5\u09c7 \u09ac\u09cd\u09af\u09af\u09bc \u0995\u09b0\u09be\u09b0 \u09b2\u0995\u09cd\u09b7\u09cd\u09af \u0995\u09b0\u09cb \u09a8\u09be\u0964\u201d' },
  { ref: '49:12', en: '"O you who have believed, avoid much [negative] assumption... And do not spy or backbite each other."', bn: '\u201c\u09b9\u09c7 \u0987\u09ae\u09be\u09a8\u09a6\u09be\u09b0\u0997\u09a3! \u0985\u09a8\u09c7\u0995 \u09a7\u09be\u09b0\u09a3\u09be \u09a5\u09c5\u0995\u09c7 \u09ac\u09bf\u09b0\u09a4 \u09a5\u09be\u0995\u09cb... \u09aa\u09b0\u09b8\u09cd\u09aa\u09b0\u09c7\u09b0 \u0997\u09cb\u09df\u09c7\u09a8\u09cd\u09a6\u09be\u0997\u09bf\u09b0\u09bf \u0995\u09b0\u09cb \u09a8\u09be \u0993 \u0997\u09bf\u09ac\u09a4 \u0995\u09b0\u09cb \u09a8\u09be\u0964\u201d' },
  { ref: '7:31', en: '"O children of Adam, take your adornment at every masjid, and eat and drink, but do not be excessive. Indeed He does not like those who are excessive."', bn: '\u201c\u09b9\u09c7 \u0986\u09a6\u09ae-\u09b8\u09a8\u09cd\u09a4\u09be\u09a8! \u09aa\u09cd\u09b0\u09a4\u09bf\u099f\u09bf \u09ae\u09b8\u099c\u09bf\u09a6\u09c7 \u09a4\u09cb\u09ae\u09be\u09a6\u09c5\u09b0 \u09b8\u09be\u099c\u09b8\u099c\u09cd\u099c\u09be \u0997\u09cd\u09b0\u09b9\u09a3 \u0995\u09b0\u09cb, \u0996\u09be\u0993 \u0993 \u09aa\u09be\u09a8 \u0995\u09b0\u09cb, \u0995\u09bf\u09a8\u09cd\u09a4\u09c1 \u0985\u09aa\u099a\u09af\u09bc \u0995\u09b0\u09cb \u09a8\u09be\u0964 \u09a8\u09bf\u09b6\u09cd\u099a\u09af\u09bc\u0987 \u0986\u09b2\u09cd\u09b2\u09be\u09b9 \u0985\u09aa\u099a\u09af\u09bc\u09c0\u09a6\u09c5\u09b0 \u09ad\u09be\u09b2\u09cb\u09ac\u09be\u09b8\u09c7\u09a8 \u09a8\u09be\u0964\u201d' },
];

const MAKRUH_HADITH = [
  { textEn: '"There are three times during which the Prophet \ufdfa forbade us to pray: when the sun is rising until it is fully risen, when it is at its zenith, and when it is setting."', textBn: '\u201c\u09a4\u09bf\u09a8\u09a4\u09bf \u09b8\u09ae\u09af\u09bc \u09a8\u09ac\u09c0 \u09b8\u09be\u09b2\u09cd\u09b2\u09be\u09b2\u09cd\u09b2\u09be\u09b9\u09c1 \u0986\u09b2\u09be\u0987\u09b9\u09bf \u0993\u09af\u09bc\u09be\u09b8\u09be\u09b2\u09cd\u09b2\u09be\u09ae \u0986\u09ae\u09be\u09a6\u09c5\u09b0 \u09a8\u09be\u09ae\u09be\u099c \u09aa\u09dc\u09a4\u09c7 \u09a8\u09bf\u09b7\u09c7\u09a7 \u0995\u09b0\u09c7\u099b\u09c5\u09a8: \u09b8\u09c2\u09b0\u09cd\u09af\u09cb\u09a6\u09af\u09bc (\u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3 \u09b9\u0993\u09af\u09bc\u09be \u09aa\u09b0\u09cd\u09af\u09a8\u09cd\u09a4), \u09a0\u09bf\u0995 \u09a6\u09c1\u09aa\u09c1\u09b0 \u0993 \u09b8\u09c2\u09b0\u09cd\u09af\u09be\u09b8\u09cd\u09a4\u0964\u201d', srcEn: 'Muslim 831', srcBn: '\u09ae\u09c1\u09b8\u09b2\u09bf\u09ae \u09ee\u09e9\u09e7' },
  { textEn: '"Turning during prayer is snatching away that Shaytan does from the prayer of a servant."', textBn: '\u201c\u09a8\u09be\u09ae\u09be\u099c\u09c7 \u09ae\u09be\u09a5\u09be \u0998\u09cb\u09b0\u09be\u09a8\u09cb \u09b6\u09af\u09bc\u09a4\u09be\u09a8\u09c7\u09b0 \u099b\u09bf\u09a8\u09be\u09a4\u09be\u0987 \u09af\u09be \u09b8\u09c7 \u09ac\u09be\u09a8\u09cd\u09a6\u09be\u09b0 \u09a8\u09be\u09ae\u09be\u099c \u09a5\u09c5\u0995\u09c5 \u0995\u09b0\u09c7\u0964\u201d', srcEn: 'Bukhari 751', srcBn: '\u09ac\u09c1\u0996\u09be\u09b0\u09bf \u09ed\u09eb\u09e7' },
  { textEn: '"None of you should eat with his left hand or drink with it, for Shaytan eats with his left and drinks with his left."', textBn: '\u201c\u09a4\u09cb\u09ae\u09be\u09a6\u09c5\u09b0 \u0995\u09c5\u0989 \u09af\u09c5\u09a8 \u09ac\u09be\u0981 \u09b9\u09be\u09a4\u09c5 \u09a8\u09be \u0996\u09be\u09af\u09bc \u0993 \u09a8\u09be \u09aa\u09be\u09a8 \u0995\u09b0\u09c5, \u0995\u09be\u09b0\u09a3 \u09b6\u09af\u09bc\u09a4\u09be\u09a8 \u09ac\u09be\u0981 \u09b9\u09be\u09a4\u09c5 \u0996\u09be\u09af\u09bc \u0993 \u09aa\u09be\u09a8 \u0995\u09b0\u09c5\u0964\u201d', srcEn: 'Muslim 2020', srcBn: '\u09ae\u09c1\u09b8\u09b2\u09bf\u09ae \u09e8\u09e6\u09e8\u09e6' },
  { textEn: '"Do not trouble each other with your recitation."', textBn: '\u201c\u09a4\u09cb\u09ae\u09b0\u09be \u09a4\u09bf\u09b2\u09be\u0993\u09af\u09bc\u09be\u09a4 \u09a6\u09bf\u09af\u09bc\u09c7 \u09aa\u09b0\u09b8\u09cd\u09aa\u09b0\u0995\u09c7 \u0995\u09b7\u09cd\u099f \u09a6\u09bf\u0993 \u09a8\u09be\u0964\u201d', srcEn: 'Abu Dawud 1332', srcBn: '\u0986\u09ac\u09c1 \u09a6\u09be\u0989\u09a6 \u09e7\u09e9\u09e9\u09e8' },
  { textEn: '"Whoever prays to be seen by people, he has committed shirk."', textBn: '\u201c\u09af\u09c7 \u09ae\u09be\u09a8\u09c1\u09b7\u0995\u09c7 \u09a6\u09c5\u0996\u09be\u09a8\u09cb\u09b0 \u099c\u09a8\u09cd\u09af \u09a8\u09be\u09ae\u09be\u099c \u09aa\u09a1\u09bc\u09c5, \u09b8\u09c5 \u09b6\u09bf\u09b0\u0995 \u0995\u09b0\u09c5\u099b\u09c5\u0964\u201d', srcEn: 'Ahmad (authenticated)', srcBn: '\u0986\u09b9\u09ae\u09be\u09a6 (\u09b8\u09b9\u09bf\u09b9)' },
];

class MakruhModule {
  constructor() {
    this.root = document.getElementById('makruh-container');
    this.rendered = false;
    const s = (typeof appSettings !== 'undefined' && appSettings);
    this.language = s ? (s.language || 'en') : 'en';
    if (this.root) {
      this.root.addEventListener('click', (e) => this.handleClick(e));
      window.addEventListener('tabChanged', (e) => { try { if (e && e.detail && e.detail.tabId === 'makruh') this.render(); } catch (_) {} });
      window.addEventListener('settingChanged', (e) => { try { if (e && e.detail && e.detail.key === 'language') { this.language = e.detail.value || 'en'; if (this.rendered) this.render(); } } catch (_) {} });
      if (document.querySelector('#tab-makruh:not(.hidden)')) this.render();
    }
  }
  tt(key) {
    const fb = MAKRUH_I18N[key];
    if (!fb) return key;
    const lang = this.language;
    if (lang && fb[lang]) return fb[lang];
    if (lang === 'bn') return fb.bn || fb.en || key;
    if (lang && lang !== 'en' && typeof CI18N !== 'undefined' && fb.en) { const tr = CI18N.tr(lang, fb.en); if (tr) return tr; }
    return fb.en || key;
  }
  lc(o) {
    if (!o) return '';
    const lang = this.language;
    if (lang && o[lang]) return o[lang];
    if (lang === 'bn') return o.bn || o.en || '';
    if (lang && lang !== 'en' && typeof CI18N !== 'undefined' && o.en) { const tr = CI18N.tr(lang, o.en); if (tr) return tr; }
    return o.en || o.bn || '';
  }
  esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  render() {
    this.rendered = true;
    const L = (o) => this.esc(this.lc(o));
    this.root.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6 py-4">

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="p-6 bg-gradient-to-br from-amber-50 to-transparent dark:from-amber-900/10">
            <div class="text-4xl mb-2" aria-hidden="true">&#9888;&#65039;</div>
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">${this.esc(this.tt('islam_makruh_title'))}</h2>
            <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed" dir="auto">${this.esc(this.tt('islam_makruh_subtitle'))}</p>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">&#128218; ${L({ en: this.tt('islam_makruh_types'), bn: '\u09ae\u09be\u0995\u09b0\u09c2\u09b9\u09c5\u09b0 \u09a6\u09c1\u099f\u09bf \u09aa\u09cd\u09b0\u0995\u09be\u09b0' })}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${MAKRUH_TYPES.map(t => `
              <div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
                <div class="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-1"><span aria-hidden="true">${t.emoji}</span> ${L({ en: t.titleEn, bn: t.titleBn })}</div>
                <p class="text-xs text-amber-700 dark:text-amber-300 leading-relaxed" dir="auto">${L({ en: t.descEn, bn: t.descBn })}</p>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">&#128313; ${L({ en: 'Examples of Makruh Acts', bn: '\u09ae\u09be\u0995\u09b0\u09c2\u09b9 \u0986\u09ae\u09b2\u09c5\u09b0 \u09a6\u09c3\u09b7\u09cd\u099f\u09be\u09a8\u09cd\u09a4' })}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${MAKRUH_ITEMS.map(n => `
              <div class="p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/40">
                <div class="text-sm font-semibold text-orange-800 dark:text-orange-200"><span aria-hidden="true">${n.emoji}</span> ${L({ en: n.titleEn, bn: n.titleBn })}</div>
                <p class="text-xs text-orange-700 dark:text-orange-300 mt-1 leading-relaxed" dir="auto">${L({ en: n.descEn, bn: n.descBn })}</p>
                <button type="button" data-makruh-ayah="${this.esc(n.ref.split(',')[0].trim())}" class="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-700 dark:text-orange-300 text-[0.65rem] font-medium hover:bg-orange-500 hover:text-white transition-colors">&#128214; ${this.esc(n.ref)}</button>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">&#128172; ${L({ en: 'Hadith on Makruh', bn: '\u09ae\u09be\u0995\u09b0\u09c2\u09b9 \u09b8\u09ae\u09cd\u09aa\u09b0\u09cd\u0995\u09c5 \u09b9\u09be\u09a6\u09bf\u09b8' })}</h3>
          <div class="space-y-3">
            ${MAKRUH_HADITH.map(h => `
              <div class="p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/40">
                <p class="text-sm text-yellow-800 dark:text-yellow-200 leading-relaxed" dir="auto">${L({ en: h.textEn, bn: h.textBn })}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">&#8212; ${L({ en: h.srcEn, bn: h.srcBn })}</p>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">&#128214; ${L({ en: 'Quranic Warnings', bn: '\u0995\u09c1\u09b0\u0986\u09a8\u09bf \u09b8\u09a4\u09b0\u09cd\u0995\u09a4\u09be' })}</h3>
          <div class="space-y-3">
            ${MAKRUH_QUR.map(q => `
              <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
                <p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed" dir="auto">${L({ en: q.en, bn: q.bn })}</p>
                <button type="button" data-makruh-ayah="${this.esc(q.ref)}" class="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-medium hover:bg-amber-500 hover:text-white transition-colors">&#128214; ${this.esc(q.ref)} ${L({ en: 'Read', bn: '\u09aa\u09dc\u09c1\u09a8' })}</button>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-amber-200 dark:border-amber-900/40 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">&#129504; ${L({ en: 'Self-check', bn: '\u09a8\u09bf\u099c\u09c5\u0987 \u09af\u09be\u099a\u09be\u0987' })}</h3>
          <div class="space-y-2">
            ${[
              { q: { en: 'What is the main difference between makruh tanzihi and makruh tahrimi?', bn: '\u09ae\u09be\u0995\u09b0\u09c2\u09b9\u09c5 \u09a4\u09be\u09a8\u09af\u09bf\u09b9\u09bf \u0993 \u09a4\u09be\u09b9\u09b0\u09bf\u09ae\u09bf\u09b0 \u09ae\u09c2\u09b2 \u09aa\u09be\u09b0\u09cd\u09a5\u0995\u09cd\u09af \u0995\u09c0?' }, a: { en: 'Tanzihi: lightly disliked, no real sin in committing it. Tahrimi: closer to haram; habitual commission is sinful, though a single act is not as severe as haram. The evidence for tahrimi is a hadith that is probable (zanni) rather than definitive (qat\'i).', bn: '\u09a4\u09be\u09a8\u09af\u09bf\u09b9\u09bf: \u09b9\u09be\u09b2\u0995\u09be \u0985\u09aa\u099b\u09a8\u09cd\u09a6, \u0995\u09b0\u09b2\u09c5 \u09aa\u09cd\u09b0\u0995\u09c3\u09a4 \u0997\u09c1\u09a8\u09be\u09b9 \u09a8\u09c5\u0987\u0964 \u09a4\u09be\u09b9\u09b0\u09bf\u09ae\u09bf: \u09b9\u09be\u09b0\u09be\u09ae\u09c5\u09b0 \u0995\u09be\u099b\u09be\u0995\u09be\u099b\u09bf; \u0985\u09ad\u09cd\u09af\u09be\u09b8\u0997\u09a4\u09ad\u09be\u09ac\u09c5 \u0995\u09b0\u09b2\u09c5 \u0997\u09c1\u09a8\u09be\u09b9, \u09a4\u09ac\u09c5 \u09b9\u09be\u09b0\u09be\u09ae\u09c5\u09b0 \u09ae\u09a4\u09cb \u0997\u09c1\u09b0\u09c1\u09a4\u09b0 \u09a8\u09af\u09bc\u0964 \u09a4\u09be\u09b9\u09b0\u09bf\u09ae\u09bf\u09b0 \u09aa\u09cd\u09b0\u09ae\u09be\u09a3 \u099c\u09be\u09a8\u09cd\u09a8\u09bf (\u09b8\u09ae\u09cd\u09ad\u09be\u09ac\u09cd\u09af) \u09b9\u09be\u09a6\u09bf\u09b8, \u0995\u09be\u09a4\u09cd\u0987 (\u09a8\u09bf\u09b6\u09cd\u099a\u09bf\u09a4) \u09a8\u09af\u09bc\u0964' } },
              { q: { en: 'Is it sinful to pray during the three prohibited times?', bn: '\u09a4\u09bf\u09a8\u099f\u09bf \u09a8\u09bf\u09b7\u09bf\u09a6\u09cd\u09a7 \u09b8\u09ae\u09af\u09bc\u09c5 \u09a8\u09be\u09ae\u09be\u099c \u09aa\u09a1\u09bc\u09be \u0995\u09bf \u0997\u09c1\u09a8\u09be\u09b9?' }, a: { en: 'Performing nafl prayer at these times is makruh tahrimi — sinful if done without need. However, if one enters the masjid during these times, scholars differ: Shafi\'i school allows 2 rak\'ahs of tahiyyat al-masjid even at prohibited times.', bn: '\u098f\u0987 \u09b8\u09ae\u09af\u09bc\u09c5 \u09a8\u09ab\u09b2 \u09a8\u09be\u09ae\u09be\u099c \u09aa\u09a1\u09bc\u09be \u09ae\u09be\u0995\u09b0\u09c2\u09b9\u09c5 \u09a4\u09be\u09b9\u09b0\u09bf\u09ae\u09bf \u2014 \u09aa\u09cd\u09b0\u09af\u09bc\u09cb\u099c\u09a8 \u09a8\u09be \u09a5\u09be\u0995\u09b2\u09c5 \u0997\u09c1\u09a8\u09be\u09b9\u0964 \u09a4\u09ac\u09c5 \u09ae\u09b8\u099c\u09bf\u09a6\u09c5 \u09aa\u09cd\u09b0\u09ac\u09c5\u09b6 \u0995\u09b0\u09b2\u09c5 \u09ae\u09a4\u09ad\u09c5\u09a6 \u0986\u099b\u09c5: \u09b6\u09be\u09ab\u09bf\u09af\u09bc\u09bf \u09ae\u09a4\u09c5 \u09a8\u09bf\u09b7\u09bf\u09a6\u09cd\u09a7 \u09b8\u09ae\u09af\u09bc\u09c5\u0993 \u09a4\u09be\u09b9\u09bf\u09af\u09cd\u09af\u09be\u09a4\u09c1\u09b2 \u09ae\u09b8\u099c\u09bf\u09a6\u09c5\u09b0 ২ \u09b0\u09be\u0995\u09be\u09a4 \u099c\u09be\u09af\u09bc\u09c5\u099c\u0964' } },
              { q: { en: 'Why is using the left hand for food discouraged in Islam?', bn: '\u0987\u09b8\u09b2\u09be\u09ae\u09c5 \u0996\u09be\u0993\u09af\u09bc\u09be\u09b0 \u099c\u09a8\u09cd\u09af \u09ac\u09be\u0981 \u09b9\u09be\u09a4 \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0 \u0995\u09c5\u09a8 \u0985\u09aa\u099b\u09a8\u09cd\u09a6\u09a8\u09c0\u09af\u09bc?' }, a: { en: 'The Prophet explicitly linked eating/drinking with the left hand to the action of Shaytan (Muslim 2020). The right hand is given precedence in honourable acts while the left is used for cleaning and lesser tasks. It also cultivates mindfulness and gratitude.', bn: '\u09a8\u09ac\u09c0 \u09b8\u09be\u09b2\u09cd\u09b2\u09be\u09b2\u09cd\u09b2\u09be\u09b9\u09c1 \u0986\u09b2\u09be\u0987\u09b9\u09bf \u0993\u09af\u09bc\u09be\u09b8\u09be\u09b2\u09cd\u09b2\u09be\u09ae \u09b8\u09c1\u09b8\u09cd\u09aa\u09b7\u09cd\u099f\u09ad\u09be\u09ac\u09c5 \u09ac\u09be\u0981 \u09b9\u09be\u09a4\u09c5 \u0996\u09be\u0993\u09af\u09bc\u09be-\u09aa\u09be\u09a8\u0995\u09c5 \u09b6\u09af\u09bc\u09a4\u09be\u09a8\u09c5\u09b0 \u0995\u09be\u099c\u09c5\u09b0 \u09b8\u09be\u09a5\u09c5 \u09af\u09c1\u0995\u09cd\u09a4 \u0995\u09b0\u09c5\u099b\u09c5\u09a8 (\u09ae\u09c1\u09b8\u09b2\u09bf\u09ae \u09e8\u09e6\u09e8\u09e6)\u0964 \u09b8\u09ae\u09cd\u09ae\u09be\u09a8\u09c0\u09af\u09bc \u0995\u09be\u099c\u09c5 \u09a1\u09be\u09a8 \u09b9\u09be\u09a4\u0995\u09c5 \u09aa\u09cd\u09b0\u09be\u09a7\u09be\u09a8\u09cd\u09af \u09a6\u09c5\u0993\u09af\u09bc\u09be \u09b9\u09af\u09bc \u0993 \u09ac\u09be\u0981 \u09b9\u09be\u09a4 \u09aa\u09b0\u09bf\u09b7\u09cd\u0995\u09be\u09b0 \u0993 \u099b\u09cb\u099f \u0995\u09be\u099c\u09c5\u09b0 \u099c\u09a8\u09cd\u09af\u0964' } },
              { q: { en: 'Does committing makruh break one\'s wudu or invalidate prayer?', bn: '\u09ae\u09be\u0995\u09b0\u09c2\u09b9 \u0995\u09b0\u09b2\u09c5 \u0995\u09bf \u0993\u09af\u09bc\u09c1 \u09ad\u09be\u0999\u09c5 \u09ac\u09be \u09a8\u09be\u09ae\u09be\u099c \u09ac\u09be\u09a4\u09bf\u09b2 \u09b9\u09af\u09bc?' }, a: { en: 'Makruh acts do not nullify wudu or prayer unless the act itself is one of the specific nullifiers (e.g., turning fully away from qiblah). However, performing makruh acts in prayer diminishes its reward and excellence, potentially reducing it from a full to a partial prayer.', bn: '\u09ae\u09be\u0995\u09b0\u09c2\u09b9 \u0986\u09ae\u09b2 \u0993\u09af\u09bc\u09c1 \u09ac\u09be \u09a8\u09be\u09ae\u09be\u099c \u09ac\u09be\u09a4\u09bf\u09b2 \u0995\u09b0\u09c5 \u09a8\u09be, \u09af\u09a6\u09bf \u09a8\u09be \u09b8\u09c5\u099f\u09bf \u09a8\u09bf\u09b0\u09cd\u09a6\u09bf\u09b7\u09cd\u099f \u09ac\u09be\u09a4\u09bf\u09b2\u0995\u09be\u09b0\u09c0 \u09b9\u09af\u09bc (\u09af\u09c5\u09ae\u09a8 \u0995\u09bf\u09ac\u09b2\u09be \u09a5\u09c5\u0995\u09c5 \u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3 \u09b8\u09b0\u09c5 \u09af\u09be\u0993\u09af\u09bc\u09be)\u0964 \u09a4\u09ac\u09c5 \u09a8\u09be\u09ae\u09be\u099c\u09c5 \u09ae\u09be\u0995\u09b0\u09c2\u09b9 \u0995\u09b0\u09b2\u09c5 \u09a4\u09be\u09b0 \u09b8\u0993\u09af\u09bc\u09be\u09ac \u0993 \u09ae\u09be\u09a8 \u0995\u09ae\u09c5, \u09aa\u09c2\u09b0\u09cd\u09a3 \u09a8\u09be\u09ae\u09be\u099c \u0986\u0982\u09b6\u09bf\u0995 \u09b9\u09af\u09bc\u09c5 \u09af\u09c5\u09a4\u09c5 \u09aa\u09be\u09b0\u09c5\u0964' } },
              { q: { en: 'Is riya (showing off) just makruh or something more serious?', bn: '\u09b0\u09bf\u09af\u09bc\u09be (\u09b2\u09cb\u0995 \u09a6\u09c5\u0996\u09be\u09a8\u09cb) \u0995\u09bf \u09b6\u09c1\u09a7\u09c1 \u09ae\u09be\u0995\u09b0\u09c2\u09b9 \u09a8\u09be\u0995\u09bf \u0986\u09b0\u09cb \u0997\u09c1\u09b0\u09c1\u09a4\u09b0?' }, a: { en: 'Riya can escalate to minor shirk. The Prophet said: "What I fear for you most is minor shirk." The Companions asked, "What is minor shirk?" He replied, "Riya\'." (Ahmad) If someone performs an act entirely for show with no sincerity, many scholars classify it as sinful beyond mere makruh.', bn: '\u09b0\u09bf\u09af\u09bc\u09be \u09b8\u09c2\u0995\u09cd\u09b7\u09cd\u09ae \u09b6\u09bf\u09b0\u0995\u09c5 \u09aa\u09b0\u09bf\u09a3\u09a4 \u09b9\u09a4\u09c5 \u09aa\u09be\u09b0\u09c5\u0964 \u09a8\u09ac\u09c0 \u09b8\u09be\u09b2\u09cd\u09b2\u09be\u09b2\u09cd\u09b2\u09be\u09b9\u09c1 \u0986\u09b2\u09be\u0987\u09b9\u09bf \u0993\u09af\u09bc\u09be\u09b8\u09be\u09b2\u09cd\u09b2\u09be\u09ae \u09ac\u09b2\u09c5\u099b\u09c5\u09a8: "\u09a4\u09cb\u09ae\u09be\u09a6\u09c5\u09b0 \u09b8\u09ae\u09cd\u09aa\u09b0\u09cd\u0995\u09c5 \u0986\u09ae\u09bf \u09af\u09be \u09b8\u09ac\u099a\u09c5\u09af\u09bc\u09c5 \u09ac\u09c5\u09b6\u09bf \u09ad\u09af\u09bc \u0995\u09b0\u09bf \u09a4\u09be \u09b9\u09b2\u09cb \u09b8\u09c2\u0995\u09cd\u09b7\u09cd\u09ae \u09b6\u09bf\u09b0\u0995\u0964" \u09b8\u09be\u09b9\u09be\u09ac\u09bf\u0997\u09a3 \u099c\u09bf\u099c\u09cd\u099e\u09c5\u09b8 \u0995\u09b0\u09b2\u09c5\u09a8, \u201c\u09b8\u09c2\u0995\u09cd\u09b7\u09cd\u09ae \u09b6\u09bf\u09b0\u0995 \u0995\u09c0?\u201d \u09a4\u09bf\u09a8\u09bf \u09ac\u09b2\u09b2\u09c5\u09a8, \u201c\u09b0\u09bf\u09af\u09bc\u09be\u0964\u201d (\u0986\u09b9\u09ae\u09be\u09a6)' } },
              { q: { en: 'Can a makruh act become haram in certain contexts?', bn: '\u09a8\u09bf\u09b0\u09cd\u09a6\u09bf\u09b7\u09cd\u099f \u09aa\u09cd\u09b0\u09b8\u0999\u09cd\u0997\u09c5 \u09ae\u09be\u0995\u09b0\u09c2\u09b9 \u0995\u09bf \u09b9\u09be\u09b0\u09be\u09ae \u09b9\u09a4\u09c5 \u09aa\u09be\u09b0\u09c5?' }, a: { en: 'Yes. For instance, turning during prayer is makruh, but fully turning one\'s back on the qiblah invalidates the prayer and is haram. Similarly, talking in prayer is makruh at low levels but deliberately speaking lengthily nullifies the prayer entirely.', bn: '\u09b9\u09af\u09bc\u09be\u09b8\u09be\u09af\u09bc\u09be\u09b8\u09be\u0964 \u09af\u09c5\u09ae\u09a8, \u09a8\u09be\u09ae\u09be\u099c\u09c5 \u09ae\u09be\u09a5\u09be \u09b8\u09b0\u09be\u09a8\u09cb \u09ae\u09be\u0995\u09b0\u09c2\u09b9, \u0995\u09bf\u09a8\u09cd\u09a4\u09c1 \u0995\u09bf\u09ac\u09b2\u09be \u09a5\u09c5\u0995\u09c5 \u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3 \u09aa\u09bf\u09a0 \u09ab\u09bf\u09b0\u09bf\u09af\u09bc\u09c5 \u09a8\u09c5\u0993\u09af\u09bc\u09be \u09a8\u09be\u09ae\u09be\u099c \u09ac\u09be\u09a4\u09bf\u09b2 \u0995\u09b0\u09c5 \u0993 \u09b9\u09be\u09b0\u09be\u09ae\u0964 \u09a4\u09c5\u09ae\u09a8\u09bf, \u09a8\u09be\u09ae\u09be\u099c\u09c5 \u0985\u09b2\u09cd\u09aa \u0995\u09a5\u09be \u09ae\u09be\u0995\u09b0\u09c2\u09b9, \u0995\u09bf\u09a8\u09cd\u09a4\u09c1 \u0987\u099a\u09cd\u099b\u09be\u0995\u09c3\u09a4\u09ad\u09be\u09ac\u09c5 \u09a6\u09c0\u09b0\u09cd\u0998 \u0995\u09a5\u09be \u09ac\u09b2\u09b2\u09c5 \u09a8\u09be\u09ae\u09be\u099c \u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3 \u09ac\u09be\u09a4\u09bf\u09b2 \u09b9\u09af\u09bc\u09c5 \u09af\u09be\u09af\u09bc\u0964' } },
            ].map(item => `
              <details class="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40 overflow-hidden">
                <summary class="flex items-center gap-2 p-3 cursor-pointer list-none hover:bg-amber-100/50 dark:hover:bg-amber-900/30">
                  <span class="text-amber-600 dark:text-amber-400 text-sm">&#10067;</span>
                  <span class="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100" dir="auto">${L(item.q)}</span>
                  <span class="text-amber-500 text-xs">&#9660;</span>
                </summary>
                <div class="px-4 pb-3 pt-1 text-xs text-gray-700 dark:text-gray-200 leading-relaxed border-t border-amber-100 dark:border-amber-900/40" dir="auto">&#9989; ${L(item.a)}</div>
              </details>`).join('')}
          </div>
        </div>

      </div>`;
  }
  handleClick(e) {
    const ayah = e.target.closest('[data-makruh-ayah]');
    if (ayah) { try { if (typeof ayahModal !== 'undefined' && ayahModal && ayahModal.open) ayahModal.open(ayah.getAttribute('data-makruh-ayah')); } catch (_) {} }
  }
}

let makruhModule;
document.addEventListener('DOMContentLoaded', () => { makruhModule = new MakruhModule(); });
