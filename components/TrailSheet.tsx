"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Trail } from "@/lib/trails";
import { DifficultyPips } from "./DifficultyPips";
import { formatDuration } from "./TrailCard";
import { selectTrailAndScroll } from "@/lib/select-trail";

type Props = {
  trail: Trail | null;
  onClose: () => void;
};

/**
 * Bottom sheet on mobile, side panel on desktop.
 * Enter: 320ms drawer curve. Exit: 200ms — faster than enter.
 * Escape closes instantly (keyboard actions never animate).
 */
export function TrailSheet({ trail, onClose }: Props) {
  const [shown, setShown] = useState<Trail | null>(null);
  const [mounted, setMounted] = useState(false);
  const [instant, setInstant] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  // Keep the last non-null trail so content stays put during the exit animation.
  if (trail && trail !== shown) setShown(trail);

  // Open = parent still wants it AND we've had a frame to paint the hidden state.
  const open = trail !== null && mounted;

  const finishClose = () => {
    setShown(null);
    setMounted(false);
    setInstant(false);
    restoreFocus.current?.focus({ preventScroll: true });
  };

  // Two frames after mount, flip to open so the transform actually transitions.
  useEffect(() => {
    if (!trail) return;
    restoreFocus.current = document.activeElement as HTMLElement;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setMounted(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [trail]);

  // Body scroll lock — released as soon as closing starts so a follow-up
  // scrollIntoView (e.g. "Enquire about this trail") isn't blocked.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape closes instantly (keyboard actions never animate) and unmounts
  // right away, since a 0ms transition never fires transitionend.
  useEffect(() => {
    if (!shown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setInstant(true);
        onClose();
        finishClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shown, onClose]);

  const onPanelTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    if (!open) finishClose();
  };

  if (!shown) return null;

  const t = shown;
  const dur = instant ? "0ms" : open ? "320ms" : "200ms";

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
      {/* Scrim */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]"
        style={{
          opacity: open ? 1 : 0,
          transition: `opacity ${dur} var(--ease)`,
        }}
      />

      {/* Panel */}
      <div
        onTransitionEnd={onPanelTransitionEnd}
        className="sheet-panel absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[min(520px,92vw)] sm:rounded-none sm:rounded-l-3xl"
        style={{
          transform: open ? "translate3d(0,0,0)" : "var(--sheet-hidden)",
          transition: `transform ${dur} var(--ease-drawer)`,
        }}
      >

        <div className="relative aspect-[16/10] w-full shrink-0 sm:aspect-[4/3]">
          <Image src={t.image} alt={t.name} fill unoptimized sizes="(min-width: 640px) 520px, 100vw" className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" aria-hidden />
          <div className="absolute inset-x-5 bottom-5">
            <span className="mb-2 inline-block rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-mist backdrop-blur-sm">
              {t.region}
            </span>
            <h2 id="sheet-title" className="text-3xl leading-tight text-white">
              {t.name}
            </h2>
          </div>
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="pressable absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy/70 text-white backdrop-blur-sm hover:bg-navy"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
          <span className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-white/60 sm:hidden" aria-hidden />
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <DifficultyPips level={t.difficulty} />
            <Meta label="Time" value={formatDuration(t)} />
            <Meta label="Distance" value={`${t.distanceKm} km`} />
            <Meta label="Climb" value={`${t.elevationM} m`} />
          </div>

          <p className="mt-5 text-base leading-relaxed text-ink/85">{t.summary}</p>

          <h3 className="mt-6 font-sans text-[11px] font-semibold uppercase tracking-wider text-slate">Highlights</h3>
          <ul className="mt-2 space-y-2">
            {t.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm text-ink/85">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                {h}
              </li>
            ))}
          </ul>

          <dl className="mt-6 grid gap-4 rounded-2xl bg-mist p-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate">Starts at</dt>
              <dd className="mt-1 text-ink/85">{t.start}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate">Best for</dt>
              <dd className="mt-1 text-ink/85">{t.bestFor}</dd>
            </div>
            {t.notes && (
              <div className="sm:col-span-2">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate">Good to know</dt>
                <dd className="mt-1 text-ink/85">{t.notes}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="shrink-0 border-t border-stone/50 bg-white p-4 sm:p-5">
          <button
            type="button"
            onClick={() => {
              onClose();
              selectTrailAndScroll(t.slug);
            }}
            className="pressable flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-ink shadow-[0_10px_28px_-10px_rgba(227,187,71,0.8)] hover:bg-gold-deep"
          >
            Enquire about {t.name}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <span className="text-sm">
      <span className="text-slate">{label} </span>
      <span className="font-semibold text-ink">{value}</span>
    </span>
  );
}
