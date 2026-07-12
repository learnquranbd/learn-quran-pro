# Build Notes

## Email Subscribe (js/subscribe.js)

The footer "Get updates" form writes one document per subscriber to the
Firestore collection `subscribers` (doc id = URL-encoded email, fields:
`email`, `lang`, `createdAt`, `ua`). No Google sign-in is required — the write
is an anonymous **create-only**. Firebase stays dormant until
`js/firebase-config.js` provides a real `FIREBASE_CONFIG`; while it is `null`
submissions are queued in `localStorage['pendingSubscribers']` and flushed
automatically once Firebase becomes available (a submission is never lost).

### Firestore security rule (create-only)

Add this block alongside the existing `users/{userId}` rule in
Firestore console -> Rules, then Publish. It allows anonymous document
creation but forbids reads, updates and deletes, and validates the shape so
the collection cannot be used as arbitrary storage:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Per-user private sync (accounts) — unchanged.
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }

    // Newsletter signups — anonymous CREATE ONLY, no read/update/delete.
    match /subscribers/{docId} {
      allow create: if request.resource.data.email is string
                    && request.resource.data.email.size() > 3
                    && request.resource.data.email.size() < 255
                    && request.resource.data.keys().hasOnly(
                         ['email', 'lang', 'createdAt', 'ua']);
      allow read, update, delete: if false;
    }
  }
}
```

Note: the client writes with `set(..., { merge: true })`, which is a create on
a first-time doc id. Because re-subscribes are gated client-side (the
`subscribed` flag flips the modal to its confirmation state), each email is
only ever created once under normal use.
