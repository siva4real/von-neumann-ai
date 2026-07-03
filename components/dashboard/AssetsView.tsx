"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Upload,
  Search,
  Video,
  Image as ImageIcon,
  Music,
  FileText,
  Play,
  X,
  Download,
  Send,
  Clock,
  HardDrive,
  User,
  Calendar,
  Tag,
} from "lucide-react";
import {
  assetsByProject,
  type Asset,
  type AssetType,
  type AssetStatus,
} from "@/lib/dashboardData";
import type { Project } from "@/lib/dashboardData";

const typeIcon: Record<AssetType, typeof Video> = {
  video: Video,
  image: ImageIcon,
  audio: Music,
  doc: FileText,
};

const statusStyle: Record<AssetStatus, string> = {
  ready: "bg-teal/15 text-teal",
  processing: "bg-amber/15 text-amber",
  draft: "bg-muted/15 text-muted",
};

const filters: { key: AssetType | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "video", label: "Videos" },
  { key: "image", label: "Images" },
  { key: "audio", label: "Audio" },
  { key: "doc", label: "Docs" },
];

function AssetThumb({ asset, size = "card" }: { asset: Asset; size?: "card" | "hero" }) {
  const Icon = typeIcon[asset.type];
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${asset.gradient} ${
        size === "hero" ? "aspect-video" : "aspect-[4/3]"
      }`}
    >
      <div className="absolute inset-0 grid-lines opacity-30" />
      {asset.type === "video" ? (
        <span className="grid h-11 w-11 place-items-center rounded-full bg-white/20 text-white backdrop-blur-sm ring-1 ring-white/40">
          <Play size={18} className="translate-x-0.5" fill="currentColor" />
        </span>
      ) : (
        <Icon size={size === "hero" ? 34 : 24} className="text-white/90" />
      )}
      {asset.duration && (
        <span className="absolute bottom-2 right-2 rounded-md bg-black/50 px-1.5 py-0.5 font-mono text-[10px] text-white backdrop-blur-sm">
          {asset.duration}
        </span>
      )}
    </div>
  );
}

function DetailField({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Video;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="inline-flex items-center gap-2 text-[13px] text-secondary">
        <Icon size={14} className="text-muted" />
        {label}
      </span>
      <span className="text-[13px] font-medium text-primary">{value}</span>
    </div>
  );
}

function Drawer({ asset, onClose }: { asset: Asset; onClose: () => void }) {
  return (
    <>
      <div
        className="absolute inset-0 z-20 bg-ink/20 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <aside className="absolute inset-y-0 right-0 z-30 flex w-full max-w-md flex-col border-l border-line bg-surface shadow-2xl shadow-black/10 animate-fade-up">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Asset details
          </span>
          <button
            onClick={onClose}
            className="grid h-7 w-7 place-items-center rounded-lg text-muted transition-colors hover:bg-canvas hover:text-primary"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="p-5">
            <div className="overflow-hidden rounded-xl border border-line">
              <AssetThumb asset={asset} size="hero" />
            </div>

            <div className="mt-4 flex items-start justify-between gap-3">
              <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-primary">
                {asset.title}
              </h3>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${statusStyle[asset.status]}`}
              >
                {asset.status}
              </span>
            </div>

            <p className="mt-2 text-[13.5px] leading-relaxed text-secondary">
              {asset.description}
            </p>

            {/* Platforms + tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {asset.platform.map((p) => (
                <span
                  key={p}
                  className="rounded-pill bg-canvas px-2.5 py-1 text-[11px] font-medium text-secondary"
                >
                  {p}
                </span>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <Tag size={12} className="text-muted" />
              {asset.tags.map((t) => (
                <span key={t} className="font-mono text-[11px] text-muted">
                  #{t}
                </span>
              ))}
            </div>

            {/* Details */}
            <div className="mt-5 rounded-xl border border-line bg-canvas px-4 py-1">
              <DetailField icon={FileText} label="Type" value={asset.type.toUpperCase()} />
              <div className="h-px bg-line" />
              {asset.duration && (
                <>
                  <DetailField icon={Clock} label="Duration" value={asset.duration} />
                  <div className="h-px bg-line" />
                </>
              )}
              <DetailField icon={HardDrive} label="Size" value={asset.size} />
              <div className="h-px bg-line" />
              <DetailField icon={User} label="Added by" value={asset.uploadedBy} />
              <div className="h-px bg-line" />
              <DetailField icon={Calendar} label="Date" value={asset.date} />
            </div>

            {/* Transcript */}
            {asset.transcript && (
              <div className="mt-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Transcript
                </span>
                <div className="mt-2 whitespace-pre-line rounded-xl border border-line bg-surface p-4 text-[13px] leading-relaxed text-primary">
                  {asset.transcript}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-line px-5 py-3.5">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-black active:scale-[0.99]">
            <Send size={14} />
            Schedule post
          </button>
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-line text-secondary transition-colors hover:border-primary/25 hover:text-primary"
            aria-label="Download"
          >
            <Download size={15} />
          </button>
        </div>
      </aside>
    </>
  );
}

export function AssetsView({ project }: { project: Project }) {
  const [filter, setFilter] = useState<AssetType | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Asset | null>(null);

  const all = assetsByProject[project.id] ?? [];

  useEffect(() => {
    setSelected(null);
    setFilter("all");
    setQuery("");
  }, [project.id]);

  const visible = useMemo(
    () =>
      all.filter(
        (a) =>
          (filter === "all" || a.type === filter) &&
          (query === "" ||
            a.title.toLowerCase().includes(query.toLowerCase()) ||
            a.tags.some((t) => t.includes(query.toLowerCase())))
      ),
    [all, filter, query]
  );

  return (
    <div className="relative h-full overflow-hidden">
      <div className="h-full overflow-y-auto">
        <div className="mx-auto max-w-5xl px-6 py-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-primary">
                Assets
              </h2>
              <p className="text-[13px] text-secondary">
                {all.length} items · everything uploaded and generated for {project.name}
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl bg-ink px-3.5 py-2 text-[13px] font-medium text-white transition-all hover:bg-black active:scale-[0.99]">
              <Upload size={15} />
              Upload
            </button>
          </div>

          {/* Toolbar */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1 rounded-xl border border-line bg-surface p-1">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                    filter === f.key
                      ? "bg-canvas text-primary"
                      : "text-secondary hover:text-primary"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-line bg-surface px-2.5 py-2 text-muted">
              <Search size={14} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search assets"
                className="w-40 bg-transparent text-[13px] text-primary placeholder:text-muted focus:outline-none"
              />
            </div>
          </div>

          {/* Grid */}
          {visible.length === 0 ? (
            <div className="mt-16 flex flex-col items-center text-center">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-surface text-muted">
                <Upload size={20} />
              </span>
              <p className="mt-3 text-[14px] font-medium text-primary">No assets here yet</p>
              <p className="text-[13px] text-secondary">
                Upload a file or ask the agent to generate one.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {visible.map((asset) => {
                const Icon = typeIcon[asset.type];
                return (
                  <button
                    key={asset.id}
                    onClick={() => setSelected(asset)}
                    className="group overflow-hidden rounded-xl border border-line bg-surface text-left transition-all hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-lg hover:shadow-black/5"
                  >
                    <AssetThumb asset={asset} />
                    <div className="p-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="line-clamp-2 text-[13px] font-medium leading-snug text-primary">
                          {asset.title}
                        </span>
                        <span
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md ${statusStyle[asset.status]}`}
                        >
                          <Icon size={11} />
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted">
                        <span>{asset.size}</span>
                        <span className="h-0.5 w-0.5 rounded-full bg-muted" />
                        <span>{asset.date}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {selected && <Drawer asset={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
