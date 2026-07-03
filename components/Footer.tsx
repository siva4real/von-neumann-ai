export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-white">
            <span className="spectrum-bar h-3 w-3 rounded-[3px]" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            von Neumann
          </span>
        </a>

        <div className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-secondary">
          <span className="h-1.5 w-1.5 animate-pulseline rounded-full bg-emerald-500" />
          All systems operational
        </div>

        <span className="text-sm text-muted">
          © von Neumann 2026 · All rights reserved.
        </span>
      </div>
    </footer>
  );
}
