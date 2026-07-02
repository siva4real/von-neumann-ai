import { footer } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-white">
                <span className="spectrum-bar h-3 w-3 rounded-[3px]" />
              </span>
              <span className="text-[15px] font-semibold tracking-tight">
                von Neumann
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-secondary">
              An AI automation agency building self-replicating systems that run
              your work end to end.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-secondary">
              <span className="h-1.5 w-1.5 animate-pulseline rounded-full bg-emerald-500" />
              All systems operational
            </div>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                {col.title}
              </div>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-secondary transition-colors hover:text-primary"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row">
          <span>© von Neumann 2026 · All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">
              Terms
            </a>
            <a href="#" className="hover:text-primary">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
