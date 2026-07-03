# Asset Storage — Cloud Storage buckets

File uploads for the dashboard's **Assets** view are wired into Firebase Cloud
Storage. The **code** is done; there are one-time **Firebase console / CLI**
steps to enable the bucket and publish the security rules.

## Design — two logical buckets

There is one physical bucket (`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`). It's split
into two logical buckets by path prefix, each with its own rule in
`storage.rules` — mirroring the Firestore `users/{uid}/…` model:

| Bucket       | Path prefix                                   | Access                                                            |
| ------------ | --------------------------------------------- | ---------------------------------------------------------------- |
| **User**     | `users/{uid}/projects/{pid}/assets/…`         | Private. A signed-in user reads/writes only their own path.      |
| **Internal** | `internal/assets/…`                           | Shared. Any signed-in user can **read**; client **writes denied**. |

Metadata lives in Firestore alongside the file:

- User assets → `users/{uid}/projects/{pid}/assets` (existing per-user tree)
- Internal assets → top-level `internalAssets` collection (authed read, no client write)

Each asset doc carries `storagePath`, `downloadURL`, and `contentType` pointing
at the stored object. See `lib/storage.ts` for the upload/delete helpers and
`firestore.rules` / `storage.rules` for the enforcement.

## One-time setup

1. **Enable Cloud Storage** (creates the default bucket, if not already done)
   Open: https://console.firebase.google.com/project/von-neumann-ai/storage
   → **Get started** → accept the default rules prompt (they're replaced below).

2. **Publish the security rules**

   ```bash
   firebase deploy --only storage,firestore:rules
   ```

   This pushes `storage.rules` (the new bucket) and `firestore.rules` (which now
   includes the `internalAssets` collection).

## Uploading internal assets

Client writes to the internal library are denied by design. Populate it from a
trusted context:

- **Firebase console** — upload files under `internal/assets/…` in the Storage
  browser, then add a matching doc to the `internalAssets` collection, **or**
- **Admin SDK script** — upload the object and write the `internalAssets` doc
  server-side (bypasses rules). `uploadInternalAsset` in `lib/storage.ts` is the
  client-shaped equivalent for an admin-privileged context.

Each `internalAssets` doc should follow the `Asset` shape in `lib/types.ts`
(`title`, `type`, `gradient`, `status`, `size`, `uploadedBy`, `date`,
`platform`, `tags`, `description`, plus `storagePath` / `downloadURL` /
`contentType` and a `createdAt` timestamp).

## Local dev

```bash
npm run dev
# open the dashboard → Assets → "Upload" to store a file in your own bucket,
# or toggle to "Internal library" to browse shared assets.
```
