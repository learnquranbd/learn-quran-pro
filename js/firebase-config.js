/**
 * Firebase configuration — SCAFFOLD for accounts + progress cloud sync.
 *
 * While FIREBASE_CONFIG is null the whole account feature (js/account.js) is
 * COMPLETELY INVISIBLE: no UI is injected and no network request is made.
 *
 * HOW TO ENABLE  (project: learn-quran-pro)
 * -----------------------------------------
 * 1. Open https://console.firebase.google.com → "Add project".
 *      - Project name:  Learn Quran — Multi-Language
 *      - Project ID:    learn-quran-pro   (permanent; Firebase may append a
 *                       suffix like -1a2b3 if taken — that's fine, just use
 *                       whatever ID it gives you in the config below)
 *      - Google Analytics: optional (not required for accounts/sync).
 *
 * 2. In the project, click the Web icon (</>) to "Add app":
 *      - App nickname:  learn-quran-pro-web
 *      - Register app → copy the firebaseConfig object it shows.
 *
 * 3. Fill in the REAL values below (from that firebaseConfig). Replace every
 *    "PASTE_..." placeholder AND flip USE_FIREBASE to true. If your project ID
 *    got a suffix, update authDomain/projectId/storageBucket accordingly.
 *
 * 4. In the Firebase console enable:
 *      - Build → Authentication → Get started → Sign-in method → Google → Enable
 *      - Build → Firestore Database → Create database → Production mode
 *      - Authentication → Settings → Authorized domains → add "localhost"
 *        (and your real domain when you deploy)
 *
 * 5. SECURITY — Firestore console → Rules → paste, then Publish:
 *
 *      rules_version = '2';
 *      service cloud.firestore {
 *        match /databases/{database}/documents {
 *          match /users/{userId}/{document=**} {
 *            allow read, write: if request.auth != null
 *                               && request.auth.uid == userId;
 *          }
 *        }
 *      }
 *
 * That's it — the 👤 sign-in button appears automatically once the values
 * are real and USE_FIREBASE is true. Until then the account feature stays
 * completely dormant (no UI, no network).
 */

// Flip to true ONLY after replacing the PASTE_... placeholders with real values.
const USE_FIREBASE = false;

const FIREBASE_CONFIG_PREFILLED = {
  apiKey: "PASTE_API_KEY",                              // e.g. "AIzaSy...."
  authDomain: "learn-quran-pro.firebaseapp.com",
  projectId: "learn-quran-pro",
  storageBucket: "learn-quran-pro.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",                // numeric, e.g. "1234567890"
  appId: "PASTE_APP_ID"                                // e.g. "1:1234567890:web:abcdef123456"
};

// Kept null (feature dormant) until you complete the steps above.
const FIREBASE_CONFIG = USE_FIREBASE ? FIREBASE_CONFIG_PREFILLED : null;
