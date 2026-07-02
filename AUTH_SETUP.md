# Authentication — Google Sign-In (Firebase)

Google sign-in is fully wired into the app. The **code** is done; there is one
one-time **Firebase console** step that cannot be automated via the CLI (the
free-tier auth provisioning + Google OAuth client are created by Firebase
internally, not exposed through the public API).

## What's already set up (via Firebase CLI)

- Firebase project: **von-neumann-ai** (`229459574858`)
- Web app registered; SDK config committed in `lib/firebase.ts`
  (these values are public client identifiers, safe to commit — not secrets)
- `firebase` SDK installed
- `AuthProvider` (React context) wrapping the app in `app/layout.tsx`
- `AuthButton` in the navbar (desktop + mobile): Google "Sign in" →
  avatar + dropdown with "Sign out" when authenticated
- Sign-in uses `signInWithPopup` with `prompt: "select_account"`

## One-time console step (~1 minute)

1. **Enable Google provider**
   Open: https://console.firebase.google.com/project/von-neumann-ai/authentication/providers
   → Click **Get started** (if prompted) → **Google** → toggle **Enable**
   → set the **support email** → **Save**.
   (This auto-creates the Google OAuth client behind the scenes.)

2. **Add authorized domains** (so sign-in works on the live site)
   Open: https://console.firebase.google.com/project/von-neumann-ai/authentication/settings
   → **Authorized domains** → **Add domain** → `von-neumann-ai.vercel.app`
   (`localhost` is already authorized for local dev.)

That's it — after saving, the "Sign in" button works both locally and on
Vercel. No environment variables or redeploy required for the config itself.

## Local dev

```bash
npm run dev
# open http://localhost:3000 and click "Sign in"
```
