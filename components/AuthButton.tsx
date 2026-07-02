"use client";

import { useEffect, useRef, useState } from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "./AuthProvider";

function GoogleG({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden
      className="shrink-0"
    >
      <path
        fill="#FFC107"
        d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.5 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.5 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 43.5c5.4 0 10.3-2.1 14-5.4l-6.5-5.5c-2 1.5-4.6 2.4-7.5 2.4-5.2 0-9.6-3.3-11.2-8l-6.6 5.1C9.6 39 16.2 43.5 24 43.5z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.5 5.5c-.5.4 7.2-5.2 7.2-15.5 0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}

export function AuthButton() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const handleSignIn = async () => {
    setBusy(true);
    try {
      await signInWithGoogle();
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return <span className="h-9 w-9 animate-pulse rounded-full bg-black/5" />;
  }

  if (!user) {
    return (
      <button onClick={handleSignIn} disabled={busy} className="btn-ghost">
        <GoogleG />
        {busy ? "Signing in…" : "Sign in"}
      </button>
    );
  }

  const initial = (user.displayName || user.email || "?")
    .charAt(0)
    .toUpperCase();

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-pill border border-line bg-surface py-1 pl-1 pr-3 transition-all hover:border-primary/30 hover:shadow-sm active:scale-[0.98]"
        aria-label="Account menu"
      >
        {user.photoURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.photoURL}
            alt=""
            className="h-7 w-7 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-[12px] font-semibold text-white">
            {initial}
          </span>
        )}
        <span className="max-w-[9rem] truncate text-sm font-medium text-primary">
          {user.displayName || user.email}
        </span>
      </button>

      {open && (
        <div className="card absolute right-0 mt-2 w-64 overflow-hidden p-1 shadow-xl shadow-black/5">
          <div aria-hidden className="spectrum-bar h-0.5 w-full rounded-full" />
          <div className="px-3 py-3">
            <p className="truncate text-sm font-medium text-primary">
              {user.displayName || "Signed in"}
            </p>
            <p className="truncate font-mono text-[12px] text-muted">
              {user.email}
            </p>
          </div>
          <div className="h-px bg-line" />
          <button
            onClick={() => {
              setOpen(false);
              void signOut();
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-secondary transition-colors hover:bg-black/5 hover:text-primary"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
