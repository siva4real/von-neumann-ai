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
  Trash2,
  Library,
  FileUp,
} from "lucide-react";
import type { Asset, AssetType, AssetStatus, Project } from "@/lib/types";
import { useAuth } from "@/components/AuthProvider";
import {
  useAssets,
  useInternalAssets,
  createAsset,
  deleteAsset,
} from "@/lib/db";
import {
  uploadUserAsset,
  assetTypeFromFile,
  formatBytes,
  type StoredFile,
} from "@/lib/storage";
import { Modal, Field, inputClass } from "@/components/dashboard/Modal";

type Scope = "mine" | "internal";

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
  // Real image files render their own preview; everything else falls back to the
  // gradient + type-icon placeholder.
  const showImage = asset.type === "image" && !!asset.downloadURL;
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${asset.gradient} ${
        size === "hero" ? "aspect-video" : "aspect-[4/3]"
      }`}
    >
      <div className="absolute inset-0 grid-lines opacity-30" />
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset.downloadURL}
          alt={asset.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : asset.type === "video" ? (
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

function Drawer({
  asset,
  onClose,
  onDelete,
  readOnly = false,
}: {
  asset: Asset;
  onClose: () => void;
  onDelete: () => void;
  readOnly?: boolean;
}) {
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
          {asset.downloadURL ? (
            <a
              href={asset.downloadURL}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="grid h-10 w-10 place-items-center rounded-xl border border-line text-secondary transition-colors hover:border-primary/25 hover:text-primary"
              aria-label="Download"
            >
              <Download size={15} />
            </a>
          ) : (
            <button
              disabled
              className="grid h-10 w-10 place-items-center rounded-xl border border-line text-muted opacity-40"
              aria-label="No file to download"
            >
              <Download size={15} />
            </button>
          )}
          {!readOnly && (
            <button
              onClick={onDelete}
              className="grid h-10 w-10 place-items-center rounded-xl border border-line text-secondary transition-colors hover:border-coral/40 hover:text-coral"
              aria-label="Delete asset"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

export function AssetsView({ project }: { project: Project }) {
  const { user } = useAuth();
  const { data: mine } = useAssets(project.id);
  const { data: internal } = useInternalAssets();
  const [scope, setScope] = useState<Scope>("mine");
  const [filter, setFilter] = useState<AssetType | "all">("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const all = scope === "mine" ? mine : internal;
  const selected = all.find((a) => a.id === selectedId) ?? null;

  useEffect(() => {
    setSelectedId(null);
    setFilter("all");
    setQuery("");
  }, [project.id]);

  // Selection is keyed to the active scope; clear it when switching libraries.
  useEffect(() => {
    setSelectedId(null);
  }, [scope]);

  const removeAsset = async (asset: Asset) => {
    if (!user) return;
    setSelectedId(null);
    await deleteAsset(user.uid, project.id, asset.id, asset.storagePath);
  };

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
                {scope === "mine"
                  ? `${all.length} items · everything uploaded and generated for ${project.name}`
                  : `${all.length} items · shared library available to your whole team`}
              </p>
            </div>
            {scope === "mine" && (
              <button
                onClick={() => setShowUpload(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-3.5 py-2 text-[13px] font-medium text-white transition-all hover:bg-black active:scale-[0.99]"
              >
                <Upload size={15} />
                Upload
              </button>
            )}
          </div>

          {/* Scope: personal project assets vs. the shared internal library */}
          <div className="mt-4 flex items-center gap-1 rounded-xl border border-line bg-surface p-1 sm:inline-flex">
            {(
              [
                { key: "mine", label: "My assets", icon: HardDrive },
                { key: "internal", label: "Internal library", icon: Library },
              ] as const
            ).map((s) => (
              <button
                key={s.key}
                onClick={() => setScope(s.key)}
                className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-colors sm:flex-none ${
                  scope === s.key
                    ? "bg-canvas text-primary"
                    : "text-secondary hover:text-primary"
                }`}
              >
                <s.icon size={13} />
                {s.label}
              </button>
            ))}
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
                {scope === "mine" ? <Upload size={20} /> : <Library size={20} />}
              </span>
              <p className="mt-3 text-[14px] font-medium text-primary">
                {query || filter !== "all"
                  ? "Nothing matches"
                  : scope === "mine"
                  ? "No assets here yet"
                  : "The internal library is empty"}
              </p>
              <p className="text-[13px] text-secondary">
                {scope === "mine"
                  ? "Upload a file or ask the agent to generate one."
                  : "Shared assets are added by your team from the admin tools."}
              </p>
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {visible.map((asset) => {
                const Icon = typeIcon[asset.type];
                return (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedId(asset.id)}
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

      {selected && (
        <Drawer
          asset={selected}
          readOnly={scope === "internal"}
          onClose={() => setSelectedId(null)}
          onDelete={() => removeAsset(selected)}
        />
      )}

      {showUpload && user && (
        <UploadAssetModal
          onClose={() => setShowUpload(false)}
          upload={(file, onProgress) =>
            uploadUserAsset(user.uid, project.id, file, onProgress)
          }
          onCreate={async (input) => {
            await createAsset(user.uid, project.id, input);
            setShowUpload(false);
          }}
        />
      )}
    </div>
  );
}

const gradientChoices = [
  "from-amber to-coral",
  "from-coral to-violet",
  "from-violet to-cyan",
  "from-cyan to-teal",
  "from-teal to-amber",
];

function UploadAssetModal({
  onClose,
  onCreate,
  upload,
}: {
  onClose: () => void;
  onCreate: (input: Omit<Asset, "id" | "createdAt">) => void | Promise<void>;
  upload: (
    file: File,
    onProgress: (fraction: number) => void
  ) => Promise<StoredFile>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<AssetType>("image");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onPick = (f: File | null) => {
    if (!f) return;
    setFile(f);
    setError(null);
    setType(assetTypeFromFile(f));
    // Prefill the title from the filename (sans extension) if untouched.
    setTitle((cur) => cur || f.name.replace(/\.[^.]+$/, ""));
  };

  const submit = async () => {
    if (!title.trim() || saving) return;
    setSaving(true);
    setError(null);
    try {
      // Upload the file first (if one was chosen), then persist metadata that
      // points at the stored object. No file → a metadata-only draft, matching
      // the previous behavior.
      const stored = file ? await upload(file, setProgress) : null;
      await onCreate({
        title: title.trim(),
        type,
        gradient:
          gradientChoices[Math.floor(Math.random() * gradientChoices.length)],
        status: stored ? "ready" : "draft",
        size: stored ? stored.size : "—",
        uploadedBy: "You",
        date: new Date().toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        platform: [],
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        description: description.trim() || "Uploaded asset.",
        ...(stored
          ? {
              storagePath: stored.storagePath,
              downloadURL: stored.downloadURL,
              contentType: stored.contentType,
            }
          : {}),
      });
    } catch (err) {
      console.error("[assets] upload failed", err);
      setError("Upload failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const types: AssetType[] = ["video", "image", "audio", "doc"];
  const pct = Math.round(progress * 100);

  return (
    <Modal title="Upload asset" onClose={onClose}>
      <Field label="File">
        <label
          className={`flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-3.5 py-3 text-[13px] transition-colors ${
            file
              ? "border-primary/30 bg-canvas text-primary"
              : "border-line text-secondary hover:border-primary/25 hover:text-primary"
          }`}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-surface text-muted">
            <FileUp size={16} />
          </span>
          <span className="min-w-0 flex-1">
            {file ? (
              <>
                <span className="block truncate font-medium">{file.name}</span>
                <span className="text-[11px] text-muted">
                  {formatBytes(file.size)} · {type}
                </span>
              </>
            ) : (
              <>
                <span className="block font-medium">Choose a file</span>
                <span className="text-[11px] text-muted">
                  Video, image, audio or document · up to 500 MB
                </span>
              </>
            )}
          </span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => onPick(e.target.files?.[0] ?? null)}
          />
        </label>
      </Field>
      <Field label="Title">
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Launch teaser — rough cut"
          className={inputClass}
        />
      </Field>
      <Field label="Type">
        <div className="flex gap-1.5">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`flex-1 rounded-lg border px-2 py-1.5 text-[12.5px] font-medium capitalize transition-colors ${
                type === t
                  ? "border-primary/30 bg-canvas text-primary"
                  : "border-line text-secondary hover:text-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Tags (comma-separated)">
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="launch, teaser"
          className={inputClass}
        />
      </Field>
      <Field label="Description (optional)">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="What is this asset?"
          className={`${inputClass} resize-none`}
        />
      </Field>

      {saving && file && (
        <div className="mt-1">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-canvas">
            <div
              className="h-full rounded-full bg-ink transition-[width] duration-150"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-1 text-[11px] text-muted">Uploading… {pct}%</p>
        </div>
      )}
      {error && <p className="mt-1 text-[12px] text-coral">{error}</p>}

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="rounded-xl border border-line px-3.5 py-2 text-[13px] font-medium text-secondary transition-colors hover:text-primary"
        >
          Cancel
        </button>
        <button
          onClick={submit}
          disabled={!title.trim() || saving}
          className="rounded-xl bg-ink px-3.5 py-2 text-[13px] font-medium text-white transition-all hover:bg-black active:scale-[0.99] disabled:opacity-40"
        >
          {saving ? "Uploading…" : file ? "Upload asset" : "Add asset"}
        </button>
      </div>
    </Modal>
  );
}
