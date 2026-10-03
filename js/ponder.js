/**
 * Ayah to Ponder (Tadabbur)
 * Shows a daily reflection card in the empty reading view: one curated
 * thought-provoking ayah (deterministic per day) with reflection prompts.
 * Disappears naturally once the user loads any verses.
 */

// Curated reflection-worthy ayahs (well-known tadabbur selections)
const PONDER_REFS = [
  '1:1-5', '1:6', '2:2', '2:8-10', '2:14-16', '2:22',
  '2:23-24', '2:30-33', '2:40', '2:45-46', '2:49-50', '2:58-59',
  '2:61', '2:65-66', '2:74', '2:83', '2:84-86', '2:93',
  '2:97-98', '2:102', '2:113-114', '2:125-126', '2:128', '2:132-133',
  '2:143-144', '2:152', '2:153', '2:155-157', '2:163', '2:164',
  '2:165', '2:168-169', '2:177', '2:183', '2:186', '2:196',
  '2:201', '2:203', '2:213', '2:216', '2:222', '2:229',
  '2:238', '2:240-242', '2:249-251', '2:255', '2:257', '2:261',
  '2:264', '2:273', '2:275', '2:281', '2:284', '2:286',
  '3:6', '3:8', '3:14-15', '3:18-19', '3:26-27', '3:31',
  '3:38', '3:45', '3:49', '3:55', '3:64', '3:67-68',
  '3:76-77', '3:81-82', '3:83-85', '3:92', '3:102-103', '3:106-107',
  '3:113-115', '3:116-117', '3:123-126', '3:133-134', '3:139', '3:145',
  '3:146-148', '3:152', '3:159', '3:160', '3:166-168', '3:173',
  '3:180', '3:185', '3:186', '3:189', '3:190-191', '3:200',
  '4:1', '4:11', '4:15-16', '4:19-21', '4:25', '4:36',
  '4:38-40', '4:43', '4:54-55', '4:57', '4:60-63', '4:69-70',
  '4:78', '4:82', '4:88-91', '4:92-93', '4:102-103', '4:109',
  '4:110', '4:116', '4:125', '4:128', '4:135', '4:142-143',
  '4:148', '4:157-159', '4:163', '4:165', '4:171', '5:2',
  '5:8', '5:13', '5:19', '5:25-26', '5:32', '5:41',
  '5:45', '5:54', '5:60', '5:64', '5:72', '5:78-79',
  '5:82-83', '5:90-91', '5:95', '5:97', '5:106', '5:110',
  '5:119', '6:2', '6:6', '6:15', '6:19', '6:25',
  '6:32', '6:38', '6:43', '6:50', '6:54', '6:59',
  '6:68-69', '6:73', '6:80-83', '6:84-87', '6:93', '6:99',
  '6:103', '6:108', '6:112', '6:119', '6:128', '6:130',
  '6:138', '6:146', '6:152', '6:157', '6:160', '6:162-163',
  '7:2', '7:12-13', '7:23', '7:27', '7:31', '7:42-43',
  '7:54', '7:55-56', '7:65', '7:69', '7:74', '7:79',
  '7:85', '7:91', '7:100', '7:105', '7:111', '7:116',
  '7:126', '7:128', '7:137', '7:141', '7:150', '7:156',
  '7:160', '7:166', '7:170', '7:180', '7:184', '7:188',
  '7:195', '7:205', '8:2-4', '8:11', '8:15', '8:19',
  '8:24', '8:29', '8:36', '8:46', '8:47', '8:55',
  '8:58', '8:67', '8:72', '9:5', '9:11-12', '9:18',
  '9:24', '9:31', '9:40', '9:44', '9:51', '9:55',
  '9:60', '9:70', '9:72', '9:79', '9:85', '9:88',
  '9:99', '9:105', '9:111-112', '9:119', '9:124', '10:5',
  '10:11', '10:15', '10:24', '10:28', '10:32', '10:39',
  '10:44', '10:49', '10:57', '10:62-64', '10:68', '10:78',
  '10:81', '10:87', '10:92', '10:99', '10:109', '11:3',
  '11:6', '11:12', '11:18', '11:24', '11:31', '11:40',
  '11:44', '11:47', '11:56', '11:61', '11:67', '11:73',
  '11:81', '11:82', '11:84', '11:88', '11:94', '11:100',
  '11:103', '11:108', '11:112', '11:114', '11:118', '12:5-6',
  '12:16', '12:18', '12:25', '12:30', '12:36', '12:43',
  '12:50', '12:53', '12:64', '12:70', '12:72', '12:76',
  '12:86-87', '12:90', '12:97', '12:101', '12:109', '13:3',
  '13:11', '13:17', '13:24', '13:28', '13:31', '13:38',
  '14:1', '14:7', '14:13', '14:21', '14:24-26', '14:34',
  '14:40-41', '14:49', '15:4', '15:9', '15:16', '15:22',
  '15:26', '15:33', '15:36', '15:45', '15:49', '15:56',
  '15:63', '15:67', '15:74', '15:80', '15:85', '15:88',
  '15:99', '16:4', '16:8', '16:18', '16:22', '16:30',
  '16:36', '16:39', '16:43', '16:53', '16:58', '16:61',
  '16:72', '16:78', '16:80', '16:90', '16:96-97', '16:98',
  '16:106', '16:114', '16:116', '16:125', '16:127', '17:1',
  '17:9', '17:13', '17:23-24', '17:26', '17:33', '17:37',
  '17:44', '17:47', '17:53', '17:60', '17:70', '17:71',
  '17:78-79', '17:80', '17:82', '17:90', '17:97', '17:104',
  '17:110', '18:2', '18:7', '18:18', '18:23-24', '18:29',
  '18:31', '18:37', '18:45', '18:46', '18:50', '18:57',
  '18:63', '18:68', '18:77', '18:82', '18:87', '18:94',
  '18:99', '18:109-110', '19:4', '19:8', '19:16', '19:19',
  '19:25', '19:31', '19:37', '19:49', '19:53', '19:58',
  '19:65', '19:68', '19:75', '19:85-86', '19:96', '20:2',
  '20:7-8', '20:14', '20:22', '20:25-28', '20:30', '20:40',
  '20:42', '20:47', '20:53', '20:59', '20:70-71', '20:82',
  '20:87', '20:90', '20:94', '20:102', '20:106', '20:114',
  '20:120', '20:124', '20:132', '21:3', '21:7', '21:16',
  '21:19', '21:25', '21:30', '21:35', '21:41', '21:47-48',
  '21:54', '21:61', '21:66', '21:72', '21:79', '21:87',
  '21:89', '21:97', '21:105', '21:107', '22:5', '22:7',
  '22:18', '22:23', '22:26', '22:35', '22:40', '22:46',
  '22:53', '22:58', '22:65', '22:71', '22:73', '23:1-3',
  '23:6', '23:14', '23:20', '23:27', '23:32', '23:38',
  '23:45', '23:50', '23:55', '23:62', '23:66', '23:75',
  '23:78', '23:84', '23:91', '23:96', '23:103', '23:111',
  '23:115-116', '23:118', '24:2', '24:6', '24:12', '24:22',
  '24:27', '24:31', '24:35', '24:39', '24:45', '24:50',
  '24:58', '24:61', '25:4', '25:8', '25:15', '25:20',
  '25:25', '25:35', '25:38', '25:47', '25:48', '25:58',
  '25:63', '25:64', '25:70', '25:72', '25:74', '25:77',
  '26:1', '26:10', '26:12', '26:22', '26:26', '26:34',
  '26:36', '26:44', '26:51', '26:57', '26:63', '26:66',
  '26:75', '26:80', '26:83-85', '26:88-89', '26:95', '26:97',
  '26:106', '26:109', '26:115', '26:123', '26:128', '26:133',
  '26:142', '26:146', '26:155', '26:157', '26:165', '26:170',
  '26:178', '26:183', '26:186', '26:193', '26:198', '26:208',
  '26:214', '26:219', '26:227', '27:3', '27:7', '27:12',
  '27:19', '27:24', '27:34', '27:40', '27:42', '27:52',
  '27:54', '27:62', '27:67', '27:75-76', '27:82', '27:92',
  '28:4', '28:8', '28:15', '28:18', '28:24', '28:32',
  '28:41-42', '28:47', '28:56', '28:59', '28:70', '28:76',
  '28:77', '28:88', '29:2-3', '29:8', '29:14', '29:20',
  '29:25', '29:31', '29:39', '29:41', '29:45', '29:47',
  '29:52', '29:60', '29:64', '29:69', '30:3', '30:9',
  '30:18', '30:21', '30:22', '30:30', '30:32', '30:41',
  '30:46', '30:51', '30:60', '31:4', '31:10', '31:14',
  '31:17-19', '31:22', '31:27', '31:34', '32:4', '32:7',
  '32:16', '32:17', '32:23', '32:27', '33:6', '33:9',
  '33:18', '33:21', '33:28', '33:35', '33:41-42', '33:45',
  '33:50', '33:59', '33:63', '33:70', '34:3', '34:12',
  '34:13', '34:21', '34:28', '34:34', '34:39', '34:46',
  '34:49', '35:1', '35:10', '35:15', '35:18', '35:28',
  '35:29-30', '35:34', '35:42', '36:2', '36:11-12', '36:23',
  '36:26', '36:34', '36:36', '36:47', '36:51', '36:55',
  '36:60', '36:69', '36:77', '36:82', '37:5', '37:11',
  '37:16', '37:19', '37:25', '37:35', '37:41', '37:45',
  '37:53', '37:55', '37:63', '37:68', '37:75', '37:79',
  '37:88', '37:97', '37:100', '37:105', '37:112', '37:116',
  '37:125', '37:131', '37:134', '37:142', '37:150', '37:153',
  '37:158', '37:166', '37:173', '37:177', '38:4', '38:11-12',
  '38:18', '38:29', '38:34', '38:37', '38:44', '38:48',
  '38:53', '38:62', '38:65', '38:67-68', '38:76', '38:78',
  '38:85', '39:5', '39:9', '39:10', '39:23', '39:36',
  '39:53', '40:3', '40:44', '40:60', '41:33', '41:34',
  '41:53', '42:19', '42:25', '42:36-38', '42:40', '43:32',
  '44:38', '45:13', '46:15', '47:15', '47:24', '48:4',
  '49:10', '49:11', '49:12-13', '50:16', '50:37', '51:20-21',
  '51:22', '51:47-49', '51:55-56', '52:48', '53:39-42', '54:17',
  '55:13', '55:26-27', '55:46-47', '55:60', '56:60', '57:4',
  '57:16', '57:20', '57:22-23', '58:7', '59:9', '59:18-19',
  '59:21', '59:22-24', '60:8', '61:2', '62:1', '62:8',
  '62:9', '63:9', '63:10', '64:11', '64:15', '65:2-3',
  '66:6', '66:8', '67:1-2', '67:3-4', '67:14', '67:15',
  '68:4', '69:19', '70:22-23', '71:10', '72:18', '73:1-6',
  '73:8', '74:38', '75:36', '76:1', '76:3', '76:12-22',
  '78:9', '79:46', '80:24', '81:26', '82:6', '83:14',
  '84:6', '85:14', '86:5', '87:14-17', '88:17-20', '89:27-30',
  '90:4', '91:9', '92:4', '93:3-5', '93:11', '94:5-6',
  '95:4', '96:1', '97:3', '98:5', '99:7-8', '100:6',
  '102:1-2', '103:1-3', '104:1', '107:1', '110:3', '112:1-4',
];

// Generic, non-doctrinal tadabbur prompt keys (cycled per verse). These never
// assert a specific tafsir — they only invite the reader's own reflection.
const PONDER_PROMPT_KEYS = [
  'ponder_q1', 'ponder_q2', 'ponder_q3', 'ponder_q4',
  'ponder_q5', 'ponder_q6', 'ponder_q7', 'ponder_q8',
  'ponder_q9', 'ponder_q10', 'ponder_q11', 'ponder_q12',
  'ponder_q13', 'ponder_q14', 'ponder_q15', 'ponder_q16'
];

// Themed reflection sets — each draws a relevant subset of the pool above.
// Labels carry their own inline en/bn text (no translation keys needed).
// Every ref below is guaranteed to exist in PONDER_REFS.
const PONDER_THEMES = {
  mercy:      { emoji: '💚', en: 'Mercy & Forgiveness', bn: 'দয়া ও ক্ষমা',
                refs: ['2:186', '2:286', '3:8', '3:133-134', '4:110', '7:23', '12:86-87', '24:22', '39:53', '40:60', '3:31', '15:85', '21:107', '85:14', '2:58-59', '2:196', '3:152', '4:116', '5:45', '8:29', '9:72', '9:99', '10:11', '11:73', '11:94', '11:118', '12:53', '12:97', '16:61', '18:82', '19:25', '19:53', '20:2', '22:65', '23:62', '24:6', '24:61', '26:51', '26:208', '28:47', '29:31', '33:59', '35:34', '36:26', '38:34', '38:44'] },
  patience:   { emoji: '🌱', en: 'Patience & Trials', bn: 'ধৈর্য ও পরীক্ষা',
                refs: ['2:45-46', '2:155-157', '2:216', '3:139', '13:24', '21:87', '29:2-3', '46:15', '94:5-6', '103:1-3', '2:183', '11:112', '52:48', '8:46', '12:18', '30:60', '90:4', '2:61', '2:249-251', '3:146-148', '4:25', '4:19-21', '4:148', '5:25-26', '7:2', '8:15', '7:126', '7:128', '7:137', '10:87', '10:109', '11:12', '11:40', '11:94', '11:108', '12:43', '12:50', '12:90', '13:38', '14:13', '16:106', '17:60', '18:68', '18:77', '19:49', '20:42', '20:40', '20:70-71', '21:41', '22:53', '22:35', '23:111', '23:96', '25:20', '26:63', '28:4', '29:14', '37:75', '37:97', '37:112', '37:173', '38:18', '38:34', '38:44'] },
  gratitude:  { emoji: '🙏', en: 'Gratitude', bn: 'কৃতজ্ঞতা',
                refs: ['2:152', '2:201', '14:7', '14:34', '16:18', '31:14', '55:13', '55:60', '93:3-5', '16:114', '27:40', '93:11', '34:39', '100:6', '2:49-50', '2:61', '2:40', '3:123-126', '4:54-55', '5:64', '5:110', '7:31', '7:69', '7:74', '8:11', '7:160', '7:141', '11:84', '12:5-6', '12:90', '15:22', '15:88', '16:4', '16:8', '16:58', '16:72', '16:80', '21:72', '22:65', '23:20', '23:78', '25:20', '25:48', '26:133', '28:76', '30:46', '30:51', '33:9', '34:12', '35:34', '36:34', '36:47', '37:55', '38:37'] },
  trust:      { emoji: '🕊️', en: 'Trust in God', bn: 'আল্লাহর উপর ভরসা',
                refs: ['3:159', '8:2-4', '9:40', '9:51', '42:36-38', '65:2-3', '3:173', '39:36', '40:44', '51:22', '12:64', '26:80', '31:22', '43:32', '48:4', '2:49-50', '3:55', '4:11', '3:123-126', '5:25-26', '6:80-83', '7:188', '8:11', '8:15', '7:128', '7:137', '8:19', '8:72', '9:44', '10:49', '10:81', '10:99', '10:109', '11:12', '11:40', '11:56', '11:73', '11:81', '12:43', '12:70', '12:76', '13:31', '13:38', '14:13', '16:106', '16:98', '18:18', '18:68', '18:82', '19:8', '19:25', '19:49', '20:22', '20:40', '20:59', '22:58', '22:40', '23:27', '26:12', '26:10', '26:44', '26:63', '26:109', '26:170', '27:7', '28:8', '28:32', '30:3', '33:9', '34:21', '37:41', '37:97', '37:105', '37:116', '37:134', '37:173', '38:11-12'] },
  hereafter:  { emoji: '🌌', en: 'The Hereafter', bn: 'আখিরাত',
                refs: ['3:185', '21:35', '23:115-116', '57:22-23', '59:18-19', '64:11', '87:14-17', '89:27-30', '99:7-8', '2:281', '29:64', '63:10', '84:6', '22:7', '32:17', '69:19', '79:46', '2:203', '3:14-15', '3:55', '3:83-85', '3:106-107', '4:57', '3:180', '4:69-70', '4:109', '5:72', '5:119', '6:2', '6:15', '7:42-43', '8:36', '8:67', '9:55', '9:72', '9:85', '9:88', '9:111-112', '11:103', '11:108', '12:109', '14:21', '14:49', '15:4', '15:45', '16:22', '16:30', '16:39', '17:13', '17:71', '18:2', '17:104', '18:29', '18:31', '18:99', '19:68', '19:37', '19:85-86', '20:102', '20:106', '21:97', '21:105', '22:23', '22:5', '22:58', '23:55', '23:38', '23:111', '25:25', '25:15', '25:38', '26:95', '26:97', '27:3', '27:67', '27:82', '28:41-42', '29:20', '29:25', '31:4', '33:45', '33:28', '33:63', '34:3', '34:21', '35:18', '36:11-12', '36:51', '36:60', '36:55', '36:77', '37:11', '37:16', '37:19', '37:25', '37:41', '37:45', '37:53', '37:63', '37:55', '37:68', '38:62', '38:53', '38:67-68'] },
  character:  { emoji: '🤝', en: 'Character & Conduct', bn: 'চরিত্র ও আচরণ',
                refs: ['4:36', '16:90', '17:23-24', '23:1-3', '25:63', '25:74', '31:17-19', '49:12-13', '73:8', '3:92', '5:8', '16:125', '33:70', '42:40', '49:10', '59:9', '68:4', '4:135', '5:2', '9:119', '33:21', '60:8', '61:2', '91:9', '104:1', '2:83', '2:58-59', '2:65-66', '2:177', '2:14-16', '2:97-98', '2:113-114', '2:229', '2:240-242', '2:264', '2:273', '3:76-77', '3:113-115', '4:1', '4:60-63', '3:166-168', '4:19-21', '4:54-55', '4:88-91', '4:92-93', '4:128', '4:148', '5:13', '5:54', '5:45', '5:78-79', '5:82-83', '5:90-91', '5:106', '5:119', '6:68-69', '6:84-87', '6:152', '7:12-13', '7:27', '7:31', '7:74', '7:166', '7:79', '7:85', '7:105', '7:150', '8:47', '8:55', '8:58', '8:72', '9:11-12', '9:24', '9:44', '9:60', '9:79', '9:88', '9:111-112', '10:78', '11:31', '11:118', '12:5-6', '12:16', '12:25', '12:30', '12:36', '12:50', '12:53', '12:70', '12:72', '12:76', '12:97', '14:49', '15:26', '15:33', '15:67', '15:88', '15:80', '16:30', '16:39', '16:43', '16:58', '17:53', '17:33', '18:18', '18:87', '18:77', '18:94', '20:87', '20:94', '20:120', '21:79', '21:105', '22:35', '23:6', '23:96', '24:2', '24:31', '24:12', '24:27', '25:8', '24:58', '24:50', '24:61', '25:35', '26:10', '26:22', '26:34', '26:36', '26:115', '26:109', '26:128', '26:183', '26:165', '26:178', '26:186', '26:214', '26:227', '27:54', '27:42', '27:34', '28:15', '28:18', '29:8', '28:76', '29:39', '30:32', '33:28', '33:18', '33:6', '33:59', '34:34', '35:42', '35:18', '36:26', '36:47', '37:35', '37:79', '37:88', '37:105', '37:131', '37:153', '38:4', '38:62', '38:48', '38:76', '38:78'] },
  remembrance:{ emoji: '📿', en: 'Remembrance', bn: 'যিকির',
                refs: ['2:152', '13:28', '20:114', '24:35', '33:41-42', '50:16', '87:14-17', '15:99', '20:124', '50:37', '35:10', '97:3', '2:74', '2:203', '4:102-103', '5:13', '5:97', '7:141', '19:16', '19:58', '20:42', '22:40', '26:227', '30:18', '37:166', '38:18'] },
  creation:   { emoji: '🌿', en: 'Signs in Creation', bn: 'সৃষ্টিতে নিদর্শন',
                refs: ['3:190-191', '6:59', '17:44', '30:21', '30:22', '41:53', '55:13', '10:5', '17:70', '36:36', '78:9', '86:5', '23:14', '32:7', '35:28', '44:38', '80:24', '95:4', '2:30-33', '3:6', '4:1', '6:2', '6:38', '6:73', '7:54', '11:61', '13:3', '15:16', '15:22', '16:4', '16:8', '16:80', '18:37', '20:53', '21:16', '21:79', '22:18', '22:5', '23:20', '23:50', '24:45', '25:48', '27:67', '29:20', '30:46', '30:30', '31:10', '32:27', '35:1', '36:34', '36:77', '37:5', '37:11', '39:5'] },
  repentance: { emoji: '🌷', en: 'Repentance & Return', bn: 'তওবা ও প্রত্যাবর্তন',
                refs: ['2:222', '4:110', '7:23', '25:70', '39:53', '66:8', '11:3', '71:10', '83:14', '110:3', '2:74', '2:275', '3:152', '4:15-16', '5:95', '6:43', '7:150', '9:5', '9:11-12', '10:92', '11:47', '11:61', '11:82', '12:16', '15:36', '16:61', '23:75', '24:31', '26:51', '26:157', '28:15', '37:142', '37:177'] },
  prayer:     { emoji: '🤲', en: 'Prayer & Nearness', bn: 'দোয়া ও নৈকট্য',
                refs: ['2:186', '11:88', '27:62', '29:45', '35:15', '2:238', '20:132', '25:77', '32:16', '62:9', '2:125-126', '3:113-115', '4:43', '4:102-103', '5:90-91', '7:170', '9:18', '10:87', '19:31', '19:16', '19:53', '19:58', '20:14', '20:30', '21:19', '22:26', '23:45', '26:170', '26:219', '30:18', '31:4', '37:75'] },
  tawheed:    { emoji: '🕌', en: 'Oneness of God', bn: 'আল্লাহর একত্ব',
                refs: ['2:22', '2:163', '2:255', '2:257', '6:59', '24:35', '59:22-24', '112:1-4', '2:165', '19:65', '67:14', '72:18', '98:5', '2:93', '2:132-133', '2:102', '3:6', '3:18-19', '3:45', '3:49', '3:64', '3:67-68', '3:81-82', '3:83-85', '4:116', '4:125', '4:157-159', '4:171', '5:72', '5:97', '5:110', '6:19', '6:50', '6:80-83', '6:138', '7:54', '7:65', '7:188', '7:195', '7:85', '7:105', '9:31', '10:28', '10:32', '10:68', '10:49', '11:18', '11:31', '11:56', '13:3', '15:16', '16:22', '16:36', '16:72', '18:37', '18:50', '19:19', '19:31', '19:37', '20:14', '20:53', '20:70-71', '20:90', '21:25', '21:19', '21:54', '21:66', '21:61', '22:18', '22:26', '22:71', '23:32', '23:84', '23:78', '23:91', '24:45', '26:1', '26:26', '26:44', '26:75', '26:95', '26:106', '26:97', '26:123', '26:142', '27:24', '28:70', '29:25', '29:52', '30:3', '30:32', '30:30', '31:10', '31:34', '32:4', '34:49', '36:23', '37:5', '37:35', '37:125', '37:150', '37:153', '37:158', '37:166', '38:65', '39:5'] },
  guidance:   { emoji: '🧭', en: 'Guidance & the Qur\'an', bn: 'হেদায়েত ও কুরআন',
                refs: ['1:1-5', '2:2', '4:82', '17:9', '39:23', '47:24', '54:17', '14:1', '76:3', '96:1', '1:6', '28:56', '38:29', '81:26', '2:84-86', '2:93', '2:143-144', '2:168-169', '2:23-24', '2:97-98', '2:213', '3:18-19', '3:64', '3:67-68', '3:81-82', '4:69-70', '4:88-91', '4:125', '4:163', '4:165', '5:54', '5:60', '5:19', '5:41', '5:82-83', '6:25', '6:50', '6:68-69', '6:84-87', '6:119', '6:157', '7:2', '7:27', '7:42-43', '7:170', '7:184', '7:79', '7:100', '7:111', '7:116', '8:29', '9:18', '9:31', '9:70', '9:124', '10:15', '10:39', '10:32', '10:78', '10:99', '11:24', '12:109', '15:63', '15:74', '16:36', '16:116', '16:98', '17:47', '17:90', '17:97', '18:2', '18:29', '18:57', '20:2', '20:47', '20:90', '21:3', '21:7', '21:47-48', '23:38', '23:66', '25:4', '26:1', '26:123', '26:155', '26:198', '26:208', '26:193', '27:3', '27:7', '27:12', '27:42', '27:75-76', '27:92', '29:47', '32:23', '33:45', '34:28', '34:46', '34:49', '35:42', '36:2', '36:11-12', '36:69', '38:67-68'] },
  majesty:    { emoji: '👑', en: 'Divine Majesty & Names', bn: 'আল্লাহর মহিমা ও নামসমূহ',
                refs: ['2:255', '2:284', '3:189', '7:180', '17:110', '59:22-24', '62:1', '112:1-4', '6:103', '28:88', '31:27', '57:4', '58:7', '5:64', '6:73', '10:68', '11:44', '17:1', '27:75-76', '28:8', '28:70', '28:59', '32:4', '35:1'] },
  accountability: { emoji: '⚖️', en: 'Death & Accountability', bn: 'মৃত্যু ও হিসাব',
                refs: ['3:145', '3:185', '4:78', '21:35', '62:8', '89:27-30', '99:7-8', '102:1-2', '6:160', '18:7', '30:41', '75:36', '82:6', '5:32', '10:44', '56:60', '74:38', '92:4', '107:1', '2:84-86', '2:143-144', '2:102', '2:113-114', '2:229', '2:275', '3:76-77', '3:106-107', '3:116-117', '4:11', '4:15-16', '4:38-40', '4:60-63', '3:166-168', '3:180', '4:92-93', '4:109', '4:165', '5:60', '5:78-79', '5:95', '5:106', '6:6', '6:38', '6:43', '6:128', '6:130', '6:146', '6:152', '6:157', '7:12-13', '7:166', '7:91', '7:100', '8:19', '8:36', '8:47', '8:55', '8:58', '8:67', '9:5', '9:24', '9:55', '9:60', '9:70', '9:79', '9:85', '10:28', '10:39', '10:81', '10:92', '11:18', '11:44', '11:67', '11:100', '11:84', '11:82', '11:103', '12:30', '14:21', '17:13', '17:71', '17:33', '17:97', '17:104', '18:57', '18:87', '18:99', '19:68', '19:75', '19:85-86', '21:3', '20:102', '21:47-48', '21:16', '21:97', '23:55', '23:62', '23:66', '23:103', '25:25', '25:38', '26:57', '26:66', '26:146', '26:128', '26:155', '26:157', '26:214', '27:52', '28:4', '28:41-42', '28:59', '28:47', '29:39', '29:31', '30:9', '31:34', '33:63', '34:3', '34:34', '37:53', '37:158', '38:53', '38:85'] },
  parables:   { emoji: '🌳', en: 'Parables of the Qur\'an', bn: 'কুরআনের উপমাসমূহ',
                refs: ['2:261', '13:17', '14:24-26', '24:35', '29:41', '59:21', '10:24', '18:45', '22:73', '24:39', '2:264', '3:116-117', '11:24'] },
  duas:       { emoji: '🌠', en: 'Prophets\' Supplications', bn: 'নবীদের দোয়া',
                refs: ['3:38', '7:23', '12:101', '14:40-41', '20:25-28', '21:87', '21:89', '26:83-85', '2:128', '37:100', '19:4', '23:118', '2:125-126', '2:249-251', '3:146-148', '7:126', '10:11', '11:47', '19:8', '20:30', '21:72', '25:35', '26:12'] }
};

// In-module en/bn fallbacks for NEW UI strings (render before translations.js
// is updated). t() returns the key unchanged when it is not yet merged.
const PONDER_I18N = {
  ponder_themes: { en: 'Reflect by theme', bn: 'থিম অনুযায়ী ভাবুন', zh: '按主题反思', ja: 'テーマ別に振り返る'},
  ponder_all:    { en: 'All', bn: 'সব', zh: '全部', ja: 'すべて'},
  ponder_prev:   { en: 'Previous ayah', bn: 'পূর্ববর্তী আয়াত', zh: '上一节', ja: '前の節'},
  ponder_next:   { en: 'Next ayah', bn: 'পরবর্তী আয়াত', zh: '下一节', ja: '次の節'}
};

class PonderCard {
  constructor() {
    this.container = document.getElementById('ayah-container');
    if (!this.container) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.theme = null;        // active themed set id (null = full pool)
    this.poolPos = null;      // explicit position in current pool (null = today's pick)
    this.promptSeed = 0;      // extra seed for prompt rotation on a random pick
    this.curRef = null;       // ref currently shown in the card (for journaling)
    this.curName = '';        // surah display name of the current verse
    this.journalOpen = false; // reflection editor visibility
    this.editingTs = null;    // ts of the entry being edited (null = new)
    this.pendingDelete = null;// ts of entry awaiting delete confirmation

    // Show only when nothing is being loaded via the URL hash
    if (!window.location.hash.slice(1)) this.render();

    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') {
        this.language = e.detail.value;
        if (this.isShowing()) this.render();
      }
    });

    this.container.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    if (e.target.closest('#ponder-another') || e.target.closest('[data-ponder-next]')) {
      this.poolPos = this.currentIndex() + 1;
      this.promptSeed = 0;
      this.render();
      return;
    }
    if (e.target.closest('[data-ponder-prev]')) {
      this.poolPos = this.currentIndex() - 1;
      this.promptSeed = 0;
      this.render();
      return;
    }
    if (e.target.closest('[data-ponder-random]')) {
      const pool = this.pool();
      this.poolPos = Math.floor(Math.random() * pool.length);
      this.promptSeed = Math.floor(Math.random() * 100000);
      this.render();
      return;
    }
    const themeBtn = e.target.closest('[data-ponder-theme]');
    if (themeBtn) {
      const th = themeBtn.getAttribute('data-ponder-theme');
      this.theme = (th && PONDER_THEMES[th]) ? th : null;
      this.poolPos = null;      // fall back to the day's pick within the new set
      this.promptSeed = 0;
      this.render();
      return;
    }
    const shareBtn = e.target.closest('[data-ponder-share]');
    if (shareBtn) { this.shareCurrent(shareBtn); return; }
    if (e.target.closest('[data-dismiss-dev]')) {
      try { localStorage.setItem('devNoticeDismissed', '1'); } catch (err) {}
      const n = document.getElementById('dev-notice');
      if (n) n.remove();
      return;
    }
    // ---- Reflection journal interactions (only refresh the journal subtree) ----
    if (e.target.closest('[data-ponder-write]')) {
      this.journalOpen = true; this.editingTs = null; this.pendingDelete = null;
      this.refreshJournal();
      const ta = document.getElementById('ponder-note');
      if (ta) ta.focus();
      return;
    }
    if (e.target.closest('[data-ponder-cancel]')) {
      this.journalOpen = false; this.editingTs = null;
      this.refreshJournal();
      return;
    }
    if (e.target.closest('[data-ponder-save]')) { this.saveEntry(); return; }
    if (e.target.closest('[data-ponder-mark]')) { this.logToday(); this.refreshJournal(); return; }
    const editBtn = e.target.closest('[data-ponder-edit]');
    if (editBtn) {
      this.editingTs = Number(editBtn.getAttribute('data-ponder-edit'));
      this.journalOpen = true; this.pendingDelete = null;
      this.refreshJournal();
      return;
    }
    const delBtn = e.target.closest('[data-ponder-del]');
    if (delBtn) { this.pendingDelete = Number(delBtn.getAttribute('data-ponder-del')); this.refreshJournal(); return; }
    if (e.target.closest('[data-ponder-delcancel]')) { this.pendingDelete = null; this.refreshJournal(); return; }
    const okBtn = e.target.closest('[data-ponder-delok]');
    if (okBtn) { this.deleteEntry(Number(okBtn.getAttribute('data-ponder-delok'))); return; }
    const copyBtn = e.target.closest('[data-ponder-copy]');
    if (copyBtn) { this.copyEntry(Number(copyBtn.getAttribute('data-ponder-copy')), copyBtn); return; }
    const expBtn = e.target.closest('[data-ponder-export]');
    if (expBtn) { this.exportAll(expBtn); return; }

    const ql = e.target.closest('[data-ql]');
    if (ql) {
      const tab = ql.getAttribute('data-ql');
      const mod = ql.getAttribute('data-ql-module');
      if (typeof tabSystem !== 'undefined' && tabSystem) tabSystem.switchTab(tab);
      if (mod) window.dispatchEvent(new CustomEvent('learnModuleSelected', { detail: { module: mod } }));
    }
  }

  isShowing() {
    return !!document.getElementById('ponder-card');
  }

  // ---- small utilities -----------------------------------------------------
  esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  todayStr(d) {
    const n = d || new Date();
    return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
  }

  copyText(text, btn) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        if (!btn) return;
        const prev = btn.textContent;
        btn.textContent = '✓';
        setTimeout(() => { btn.textContent = prev; }, 1200);
      }).catch(() => {});
    }
  }

  // ---- localStorage: journal + reflection dates ----------------------------
  loadJournal() {
    try { return JSON.parse(localStorage.getItem('ponderJournal')) || []; } catch (e) { return []; }
  }
  saveJournal(list) {
    try { localStorage.setItem('ponderJournal', JSON.stringify(list)); } catch (e) { /* ignore */ }
  }
  loadDates() {
    try { return JSON.parse(localStorage.getItem('ponderDates')) || []; } catch (e) { return []; }
  }
  logToday() {
    const d = this.todayStr();
    const arr = this.loadDates();
    if (!arr.includes(d)) { arr.push(d); try { localStorage.setItem('ponderDates', JSON.stringify(arr)); } catch (e) {} }
  }
  ponderedToday() { return this.loadDates().includes(this.todayStr()); }

  /** Consecutive-day reflection streak ending today (or yesterday). */
  streak() {
    const set = new Set(this.loadDates());
    let s = 0;
    const d = new Date(); d.setHours(0, 0, 0, 0);
    if (!set.has(this.todayStr(d))) d.setDate(d.getDate() - 1); // grace: today not logged yet
    while (set.has(this.todayStr(d))) { s++; d.setDate(d.getDate() - 1); }
    return s;
  }

  saveEntry() {
    const noteEl = document.getElementById('ponder-note');
    if (!noteEl) return;
    const get = (id) => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
    const note = noteEl.value.trim();
    const divineName = get('ponder-name');
    const dua = get('ponder-dua');
    const action = get('ponder-action');
    if (!note && !divineName && !dua && !action) { this.journalOpen = false; this.refreshJournal(); return; }

    const list = this.loadJournal();
    if (this.editingTs) {
      const it = list.find(x => x.ts === this.editingTs);
      if (it) { it.note = note; it.divineName = divineName; it.dua = dua; it.action = action; it.updated = Date.now(); }
    } else {
      list.unshift({ ts: Date.now(), ref: this.curRef, surahName: this.curName, note, divineName, dua, action });
    }
    this.saveJournal(list);
    this.logToday();
    this.journalOpen = false; this.editingTs = null; this.pendingDelete = null;
    this.refreshJournal();
  }

  deleteEntry(ts) {
    const list = this.loadJournal().filter(x => x.ts !== ts);
    this.saveJournal(list);
    this.pendingDelete = null;
    if (this.editingTs === ts) { this.editingTs = null; this.journalOpen = false; }
    this.refreshJournal();
  }

  entryText(it) {
    const lang = this.language;
    const lines = [`${it.surahName || ''} ${it.ref || ''}`.trim()];
    if (it.note) lines.push(it.note);
    if (it.divineName) lines.push(`${t('ponder_name_label', lang)}: ${it.divineName}`);
    if (it.dua) lines.push(`${t('ponder_dua_label', lang)}: ${it.dua}`);
    if (it.action) lines.push(`${t('ponder_action_label', lang)}: ${it.action}`);
    return lines.join('\n');
  }

  copyEntry(ts, btn) {
    const it = this.loadJournal().find(x => x.ts === ts);
    if (it) this.copyText(this.entryText(it), btn);
  }

  exportAll(btn) {
    const list = this.loadJournal();
    if (!list.length) return;
    const text = list.map(it => this.entryText(it)).join('\n\n───────────\n\n');
    this.copyText(text, btn);
  }

  /** Build shareable text for the verse currently on the card. */
  shareText() {
    const lang = this.language;
    const lines = [];
    if (this.curArabic) lines.push(this.curArabic);
    if (this.curTranslation) lines.push(this.curTranslation);
    lines.push(`— ${this.curName || ''} ${this.curRef || ''}`.trim());
    if (Array.isArray(this.curPrompts) && this.curPrompts.length) {
      lines.push('');
      lines.push(`${t('ponder_title', lang)}:`);
      this.curPrompts.forEach(p => { if (p) lines.push(`• ${p}`); });
    }
    return lines.join('\n');
  }

  /** Share via the native share sheet when available, otherwise copy to clipboard. */
  shareCurrent(btn) {
    if (!this.curRef) return;
    const text = this.shareText();
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
      return;
    }
    this.copyText(text, btn);
  }

  /** Dismissible "under development" notice with a contact email. */
  devBannerHtml(lang) {
    let dismissed = false;
    try { dismissed = localStorage.getItem('devNoticeDismissed') === '1'; } catch (e) {}
    if (dismissed) return '';
    const email = 'shahinbdboy@gmail.com';
    return `
      <div id="dev-notice" class="w-full mt-4 rounded-2xl border border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 px-5 py-4 relative">
        <button data-dismiss-dev class="absolute top-2 right-2 p-1.5 rounded-lg text-amber-700/70 dark:text-amber-300/70 hover:bg-amber-100 dark:hover:bg-amber-500/20" aria-label="${t('close', lang)}">✕</button>
        <div class="flex items-start gap-3 pr-6">
          <span class="text-2xl" aria-hidden="true">🚧</span>
          <div>
            <p class="font-bold text-amber-800 dark:text-amber-200">${t('dev_notice_title', lang)}</p>
            <p class="text-sm text-amber-700 dark:text-amber-300/90 mt-0.5">${t('dev_notice_body', lang)}
              <a href="mailto:${email}" class="font-semibold underline hover:no-underline">${email}</a>.
            </p>
          </div>
        </div>
      </div>`;
  }

  /** Quick-launch cards for the most-used modules (legacy dashboard shortcuts). */
  quickLinksHtml(lang) {
    const QUICK = [
      { tab: 'topics',     emoji: '🗂️', label: 'topics_title',      grad: 'from-sky-400 to-blue-600' },
      { tab: 'quiz',       emoji: '❓', label: 'quiz_center_title',  grad: 'from-purple-400 to-fuchsia-600' },
      { tab: 'wordrepeat', emoji: '🔁', label: 'wr_title',          grad: 'from-amber-400 to-orange-500' },
      { tab: 'sarf',       emoji: '🧬', label: 'sarf_title',        grad: 'from-teal-400 to-emerald-600' },
      { tab: 'memorize',   emoji: '🎙️', label: 'memorize',          grad: 'from-rose-400 to-pink-600' },
      { tab: 'learn', module: 'kids', emoji: '🧒', label: 'learn_kids_title', grad: 'from-yellow-400 to-amber-500' },
      { tab: 'mushaf',     emoji: '📗', label: 'mushaf',            grad: 'from-indigo-400 to-violet-600' },
      { tab: 'audio',      emoji: '🎧', label: 'audio',             grad: 'from-cyan-400 to-sky-600' }
    ];
    return `
      <div class="w-full mt-6">
        <h3 class="text-sm uppercase tracking-wide font-semibold text-gray-400 dark:text-gray-500 mb-3 text-center">${t('quick_links', lang)}</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${QUICK.map(q => `
            <button data-ql="${q.tab}"${q.module ? ` data-ql-module="${q.module}"` : ''}
                    class="group rounded-2xl overflow-hidden shadow hover:shadow-lg hover:-translate-y-0.5 transition-all bg-white dark:bg-gray-800 text-center">
              <div class="h-16 bg-gradient-to-br ${q.grad} flex items-center justify-center text-3xl">${q.emoji}</div>
              <div class="py-2 px-1 text-xs font-semibold text-gray-700 dark:text-gray-200">${t(q.label, lang)}</div>
            </button>`).join('')}
        </div>
      </div>`;
  }

  // ---- i18n fallback for new UI strings ------------------------------------
  L(key) {
    const s = t(key, this.language);
    if (s !== key) return s;
    const fb = PONDER_I18N[key];
    return fb ? (fb[this.language] || fb.en) : key;
  }
  themeLabel(id) {
    const o = PONDER_THEMES[id];
    return o ? (o[this.language] || o.en) : '';
  }

  // ---- pool + position -----------------------------------------------------
  dayNumber() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    return Math.floor((now - start) / 86400000);
  }
  /** The active pool: a themed subset, or the full reflection pool. */
  pool() {
    return (this.theme && PONDER_THEMES[this.theme]) ? PONDER_THEMES[this.theme].refs : PONDER_REFS;
  }
  /** Normalised index into the current pool (day-derived, or explicit). */
  currentIndex() {
    const n = this.pool().length;
    const base = (this.poolPos == null) ? this.dayNumber() : this.poolPos;
    return ((base % n) + n) % n;
  }

  /** Theme picker chips + a heading. */
  themeBarHtml() {
    const chip = (id, label, active) => `
      <button data-ponder-theme="${this.esc(id)}"
              class="px-3 py-1 rounded-full text-xs font-medium border transition-colors ${active
                ? 'bg-primary text-white border-primary'
                : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}">${label}</button>`;
    const chips = [chip('', '🌐 ' + this.esc(this.L('ponder_all')), !this.theme)]
      .concat(Object.keys(PONDER_THEMES).map(id =>
        chip(id, PONDER_THEMES[id].emoji + ' ' + this.esc(this.themeLabel(id)), this.theme === id)));
    return `
      <p class="text-[11px] uppercase tracking-wide font-semibold text-gray-400 mb-2 text-center">${this.esc(this.L('ponder_themes'))}</p>
      <div class="flex flex-wrap justify-center gap-2">${chips.join('')}</div>`;
  }

  /**
   * Three distinct generic prompts for the given rotation seed.
   * If an invented key hasn't been merged into translations.js yet, t() returns
   * the key unchanged — in that case we fall back to the always-present q1..q4.
   */
  promptText(key) {
    const s = t(key, this.language);
    if (s !== key) return s;
    const fb = 'ponder_q' + (((key.match(/\d+/) || [1])[0] - 1) % 4 + 1);
    return t(fb, this.language);
  }
  promptsFor(seed) {
    const n = PONDER_PROMPT_KEYS.length;
    return [0, 1, 2].map(k => this.promptText(PONDER_PROMPT_KEYS[((seed * 3) + k) % n]));
  }

  async render() {
    const lang = this.language;
    const pool = this.pool();
    const total = pool.length;
    const idx = this.currentIndex();
    const ref = pool[idx];
    const m = ref.match(/(\d+):(\d+)(?:-(\d+))?/);
    const surah = parseInt(m[1]);
    const start = parseInt(m[2]);
    const end = m[3] ? parseInt(m[3]) : start;

    this.container.innerHTML = `
      ${this.devBannerHtml(lang)}
      <div id="ponder-card" class="w-full mt-6 rounded-2xl overflow-hidden shadow-lg
                                   bg-gradient-to-br from-indigo-50 via-white to-emerald-50
                                   dark:from-gray-800 dark:via-gray-800 dark:to-gray-800
                                   border border-indigo-100 dark:border-gray-700">
        <div class="px-6 pt-5 pb-2 text-center">
          <div class="text-3xl mb-1">🌅</div>
          <h2 class="text-lg font-bold text-gray-800 dark:text-gray-100">${t('ponder_title', lang)}</h2>
        </div>
        <div class="px-6 pb-2">${this.themeBarHtml()}</div>
        <div id="ponder-body" class="px-6 pb-6 text-center">
          <p class="text-gray-400 py-6">${t('loading', lang)}</p>
        </div>
      </div>
      ${this.quickLinksHtml(lang)}
    `;

    // Rebuilding the container wipes the bookmarks/continue-reading strip
    // bookmarks.js inserted above the card — ask it to re-insert (deferred).
    if (typeof bookmarks !== 'undefined' && bookmarks) bookmarks.scheduleStrip();

    try {
      const verses = await QuranData.fetchRange(surah, start, end, lang);
      if (!this.isShowing() || !verses.length) return; // user loaded something meanwhile

      const arabic = verses.map(v => v.arabic).join(' ۝ ');
      const translation = verses.map(v => v.translation).join(' ');
      const name = verses[0].surahName;

      // Remember the current pick so the journal can attach reflections to it.
      this.curRef = ref;
      this.curName = name;
      this.curArabic = arabic;
      this.curTranslation = translation;

      // Three rotating generic reflection prompts (varies with day / random pick).
      const seed = (this.promptSeed || 0) + idx;
      const [p1, p2, p3] = this.promptsFor(seed);
      this.curPrompts = [p1, p2, p3];

      document.getElementById('ponder-body').innerHTML = `
        <div class="ayah-arabic !text-3xl !leading-loose mb-3" dir="rtl">${arabic}</div>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-2" dir="auto">${translation}</p>
        <p class="text-sm text-gray-400 mb-3">— ${name} ${ref}</p>
        <div class="flex items-center justify-center gap-3 mb-5">
          <button data-ponder-prev aria-label="${this.esc(this.L('ponder_prev'))}" title="${this.esc(this.L('ponder_prev'))}"
                  class="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 text-lg leading-none text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">‹</button>
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400 tabular-nums">${idx + 1} / ${total}${this.theme ? ' · ' + this.esc(this.themeLabel(this.theme)) : ''}</span>
          <button data-ponder-next aria-label="${this.esc(this.L('ponder_next'))}" title="${this.esc(this.L('ponder_next'))}"
                  class="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 text-lg leading-none text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">›</button>
        </div>
        <div class="text-start w-full space-y-2 mb-6">
          <p class="flex gap-2 text-sm text-gray-600 dark:text-gray-300"><span>💭</span><span>${p1}</span></p>
          <p class="flex gap-2 text-sm text-gray-600 dark:text-gray-300"><span>💭</span><span>${p2}</span></p>
          <p class="flex gap-2 text-sm text-gray-600 dark:text-gray-300"><span>💭</span><span>${p3}</span></p>
        </div>
        <div class="flex flex-wrap justify-center gap-3">
          <button onclick="window.location.hash='${ref}'"
                  class="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/80">
            ${t('open_verse', lang)} →
          </button>
          <button id="ponder-another"
                  class="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            🎲 ${t('ponder_another', lang)}
          </button>
          <button data-ponder-random
                  class="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            ✨ ${t('ponder_random', lang)}
          </button>
          <button data-ponder-share
                  class="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            📤 ${t('ponder_share', lang)}
          </button>
        </div>
        <div id="ponder-journal" class="mt-6 pt-5 border-t border-indigo-100 dark:border-gray-700 text-start">
          ${this.journalInnerHtml()}
        </div>
      `;
    } catch (err) {
      const body = document.getElementById('ponder-body');
      if (body) body.innerHTML = `<p class="text-gray-400 py-4">${t('error', lang)}</p>`;
    }
  }

  /** Re-render only the journal subtree (keeps the verse above untouched). */
  refreshJournal() {
    const el = document.getElementById('ponder-journal');
    if (el) el.innerHTML = this.journalInnerHtml();
  }

  /** The full reflection-journal panel: stats, editor, and saved list. */
  journalInnerHtml() {
    const lang = this.language;
    const list = this.loadJournal();
    const streak = this.streak();
    const pondered = this.ponderedToday();

    const inp = 'w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/40 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40';

    // ---- stats + primary actions ----
    const stats = `
      <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div class="flex items-center gap-3 text-sm">
          <span class="inline-flex items-center gap-1 font-semibold text-orange-500 dark:text-orange-400">🔥 ${streak} <span class="font-normal text-gray-500 dark:text-gray-400">${t('ponder_streak', lang)}</span></span>
          <span class="inline-flex items-center gap-1 font-semibold text-indigo-500 dark:text-indigo-300">📔 ${list.length} <span class="font-normal text-gray-500 dark:text-gray-400">${t('ponder_total_label', lang)}</span></span>
        </div>
        <button data-ponder-mark ${pondered ? 'disabled' : ''}
                class="px-3 py-1.5 rounded-lg text-xs font-medium ${pondered
                  ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 cursor-default'
                  : 'border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}">
          ${pondered ? '✓ ' + t('ponder_marked', lang) : t('ponder_mark', lang)}
        </button>
      </div>`;

    // ---- editor (open state) ----
    let editor = '';
    if (this.journalOpen) {
      const editing = this.editingTs ? list.find(x => x.ts === this.editingTs) : null;
      const v = (k) => editing ? this.esc(editing[k] || '') : '';
      const refLabel = editing ? `${this.esc(editing.surahName || '')} ${this.esc(editing.ref || '')}` : `${this.esc(this.curName)} ${this.esc(this.curRef)}`;
      editor = `
        <div class="rounded-xl bg-white/60 dark:bg-gray-900/30 border border-indigo-100 dark:border-gray-700 p-4 mb-4 space-y-3">
          <p class="text-xs font-semibold text-gray-400">${refLabel.trim()}</p>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">${t('ponder_note_label', lang)}</label>
            <textarea id="ponder-note" rows="3" dir="auto" class="${inp}" placeholder="${t('ponder_note_ph', lang)}">${v('note')}</textarea>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">${t('ponder_name_label', lang)}</label>
            <input id="ponder-name" type="text" dir="auto" class="${inp}" placeholder="${t('ponder_name_ph', lang)}" value="${v('divineName')}">
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">${t('ponder_dua_label', lang)}</label>
            <input id="ponder-dua" type="text" dir="auto" class="${inp}" placeholder="${t('ponder_dua_ph', lang)}" value="${v('dua')}">
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">${t('ponder_action_label', lang)}</label>
            <input id="ponder-action" type="text" dir="auto" class="${inp}" placeholder="${t('ponder_action_ph', lang)}" value="${v('action')}">
          </div>
          <div class="flex gap-2 justify-end pt-1">
            <button data-ponder-cancel class="px-4 py-1.5 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">${t('ponder_cancel', lang)}</button>
            <button data-ponder-save class="px-4 py-1.5 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary/80">${this.editingTs ? t('ponder_update', lang) : t('ponder_save', lang)}</button>
          </div>
        </div>`;
    } else {
      editor = `
        <button data-ponder-write class="w-full mb-4 px-4 py-2.5 rounded-xl border border-dashed border-indigo-300 dark:border-gray-600 text-sm font-medium text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700/40">
          ✍️ ${t('ponder_write', lang)}
        </button>`;
    }

    // ---- saved list ----
    let saved = '';
    if (list.length) {
      const items = list.map(it => {
        const date = new Date(it.updated || it.ts);
        const dateStr = date.toLocaleDateString(lang === 'ar' ? 'ar' : (lang === 'bn' ? 'bn-BD' : undefined), { year: 'numeric', month: 'short', day: 'numeric' });
        const chip = (icon, label, val) => val
          ? `<p class="text-xs text-gray-500 dark:text-gray-400 mt-1"><span class="font-medium">${icon} ${label}:</span> <span dir="auto">${this.esc(val)}</span></p>` : '';
        const confirming = this.pendingDelete === it.ts;
        return `
          <div class="rounded-xl bg-white/70 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-3">
            <div class="flex items-center justify-between gap-2 mb-1">
              <p class="text-xs font-semibold text-primary dark:text-blue-300">${this.esc(it.surahName || '')} ${this.esc(it.ref || '')}</p>
              <span class="text-[11px] text-gray-400">${dateStr}</span>
            </div>
            ${it.note ? `<p class="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap" dir="auto">${this.esc(it.note)}</p>` : ''}
            ${chip('🕋', t('ponder_name_label', lang), it.divineName)}
            ${chip('🤲', t('ponder_dua_label', lang), it.dua)}
            ${chip('🎯', t('ponder_action_label', lang), it.action)}
            <div class="flex items-center gap-1 mt-2">
              ${confirming ? `
                <span class="text-xs text-red-500 me-1">${t('ponder_confirm_delete', lang)}</span>
                <button data-ponder-delok="${it.ts}" class="px-2 py-1 rounded text-xs font-medium bg-red-500 text-white hover:bg-red-600">${t('ponder_delete', lang)}</button>
                <button data-ponder-delcancel class="px-2 py-1 rounded text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">${t('ponder_cancel', lang)}</button>
              ` : `
                <button data-ponder-edit="${it.ts}" class="px-2 py-1 rounded text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">✏️ ${t('ponder_edit', lang)}</button>
                <button data-ponder-copy="${it.ts}" class="px-2 py-1 rounded text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700" title="${t('copy', lang)}" aria-label="${t('copy', lang)}">📋</button>
                <button data-ponder-del="${it.ts}" class="px-2 py-1 rounded text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">🗑️ ${t('ponder_delete', lang)}</button>
              `}
            </div>
          </div>`;
      }).join('');
      saved = `
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-sm font-semibold text-gray-600 dark:text-gray-300">${t('ponder_saved_list', lang)}</h4>
          <button data-ponder-export class="px-2 py-1 rounded text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">${t('ponder_export', lang)}</button>
        </div>
        <div class="space-y-2">${items}</div>`;
    } else {
      saved = `<p class="text-xs text-gray-400 text-center py-2">${t('ponder_no_notes', lang)}</p>`;
    }

    return `
      <h3 class="text-sm font-bold text-gray-700 dark:text-gray-200 mb-1">📔 ${t('ponder_journal_title', lang)}</h3>
      <p class="text-xs text-gray-400 mb-4">${t('ponder_journal_subtitle', lang)}</p>
      ${stats}
      ${editor}
      ${saved}`;
  }
}

// Initialize when DOM is ready
let ponderCard;
document.addEventListener('DOMContentLoaded', () => {
  ponderCard = new PonderCard();
});
