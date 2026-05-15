import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Share2, Link2, Check, Twitter, Send, MessageCircle, Mail } from "lucide-react";
import { toast } from "sonner";

interface Props {
  url: string;
  title: string;
  text?: string;
  /** "icon" = single 32px icon, "compact" = small bar with copy+share */
  variant?: "icon" | "compact" | "pill";
  className?: string;
}

function absoluteUrl(url: string) {
  if (typeof window === "undefined") return url;
  try {
    return new URL(url, window.location.origin).href;
  } catch {
    return url;
  }
}

export function ShareButton({ url, title, text, variant = "compact", className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!ref.current?.contains(t) && !document.getElementById("share-menu-portal")?.contains(t)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onScrollOrResize = () => updatePos();
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open]);

  const updatePos = () => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const menuW = 200;
    const left = Math.min(window.innerWidth - menuW - 8, Math.max(8, r.right - menuW));
    setPos({ top: r.bottom + 6, left });
  };

  useLayoutEffect(() => {
    if (open) updatePos();
  }, [open]);

  const fullUrl = absoluteUrl(url);
  const shareText = text || title;

  const copy = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success("Link copied", { description: fullUrl });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  const nativeShare = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    if (typeof navigator !== "undefined" && (navigator as Navigator & { share?: (d: ShareData) => Promise<void> }).share) {
      try {
        await (navigator as Navigator & { share: (d: ShareData) => Promise<void> }).share({ title, text: shareText, url: fullUrl });
        return;
      } catch { /* user cancelled */ }
    }
    setOpen((v) => !v);
  };

  const shareTo = (target: "twitter" | "telegram" | "whatsapp" | "email") => (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const u = encodeURIComponent(fullUrl);
    const t = encodeURIComponent(`${shareText} — via Russify`);
    const map = {
      twitter: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
      telegram: `https://t.me/share/url?url=${u}&text=${t}`,
      whatsapp: `https://wa.me/?text=${t}%20${u}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${t}%20${u}`,
    };
    window.open(map[target], "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  const menu = open && pos && typeof document !== "undefined"
    ? createPortal(
        <div
          id="share-menu-portal"
          role="menu"
          style={{ position: "fixed", top: pos.top, left: pos.left, width: 200, zIndex: 9999 }}
          className="animate-in fade-in slide-in-from-top-1 border-2 border-ink bg-card brutal-shadow-sm dark:border-cream"
          onClick={stop}
        >
          <Menu copy={copy} copied={copied} shareTo={shareTo} />
        </div>,
        document.body
      )
    : null;

  if (variant === "icon") {
    return (
      <div ref={ref} className={`relative ${className}`} onClick={stop}>
        <button
          ref={triggerRef}
          onClick={nativeShare}
          aria-label="Share"
          className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-signal"
        >
          <Share2 className="h-4 w-4" />
        </button>
        {menu}
      </div>
    );
  }

  if (variant === "pill") {
    return (
      <div ref={ref} className={`relative ${className}`} onClick={stop}>
        <button
          ref={triggerRef}
          onClick={nativeShare}
          className="group inline-flex items-center gap-2 border-2 border-ink bg-background px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 dark:border-cream"
        >
          <Share2 className="h-3.5 w-3.5" /> Share page
        </button>
        {menu}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative flex items-center gap-1 ${className}`} onClick={stop}>
      <button
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy link"}
        title={copied ? "Copied!" : "Copy link"}
        className={`flex h-7 w-7 items-center justify-center transition-colors ${
          copied ? "text-emerald-500" : "text-muted-foreground hover:text-signal"
        }`}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
      <button
        ref={triggerRef}
        onClick={nativeShare}
        aria-label="Share"
        title="Share"
        className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-signal"
      >
        <Share2 className="h-4 w-4" />
      </button>
      {menu}
    </div>
  );
}

function Menu({
  copy, copied, shareTo,
}: {
  copy: (e?: React.MouseEvent) => void;
  copied: boolean;
  shareTo: (t: "twitter" | "telegram" | "whatsapp" | "email") => (e: React.MouseEvent) => void;
}) {
  const items: Array<[string, React.ReactNode, (e: React.MouseEvent) => void]> = [
    [copied ? "Copied!" : "Copy link", copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />, (e) => copy(e)],
    ["Twitter / X", <Twitter className="h-3.5 w-3.5" key="x" />, shareTo("twitter")],
    ["Telegram", <Send className="h-3.5 w-3.5" key="tg" />, shareTo("telegram")],
    ["WhatsApp", <MessageCircle className="h-3.5 w-3.5" key="wa" />, shareTo("whatsapp")],
    ["Email", <Mail className="h-3.5 w-3.5" key="em" />, shareTo("email")],
  ];
  return (
    <>
      {items.map(([label, icon, onClick]) => (
        <button
          key={label}
          onClick={onClick}
          className="flex w-full items-center gap-2.5 border-b border-ink/10 px-3 py-2.5 text-left font-mono text-[11px] uppercase tracking-wider text-foreground transition-colors last:border-b-0 hover:bg-signal hover:text-cream"
        >
          {icon} {label}
        </button>
      ))}
    </>
  );
}
