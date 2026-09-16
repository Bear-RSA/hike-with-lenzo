"use client";

import Image from "next/image";
import type { Trail } from "@/lib/trails";
import { DifficultyPips } from "./DifficultyPips";
import { selectTrailAndScroll } from "@/lib/select-trail";

type Props = {
  trail: Trail;
  index: number;
  onOpen: (trail: Trail) => void;
};

export function formatDuration(t: Trail) {
  const [a, b] = t.durationHours;
  const fmt = (n: number) => (Number.isInteger(n) ? `${n}` : n.toFixed(1).replace(/\.0$/, ""));
  return `${fmt(a)}–${fmt(b)} h${t.oneWay ? " up" : ""}`;
}

export function TrailCard({ trail, index, onOpen }: Props) {
  return (
    <article
      className="stagger-item group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(44,42,48,0.06),0_8px_24px_-12px_rgba(50,54,79,0.25)]"
      style={{ "--i": Math.min(index, 8) } as React.CSSProperties}
    >
      <button
        type="button"
        onClick={() => onOpen(trail)}
        className="pressable-lift relative block aspect-[4/3] w-full overflow-hidden text-left"
        aria-label={`View details for ${trail.name}`}
      >
        <Image
          src={trail.image}
          alt={trail.name}
          fill
          unoptimized
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy/80 to-transparent" aria-hidden />
        <span className="absolute left-3 top-3 rounded-full bg-navy/80 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-mist backdrop-blur-sm">
          {trail.region}
        </span>
        <div className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3">
          <h3 className="text-xl leading-tight text-white drop-shadow-sm">{trail.name}</h3>
          <DifficultyPips level={trail.difficulty} tone="dark" showLabel={false} className="shrink-0 pb-1" />
        </div>
      </button>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <p className="text-sm leading-relaxed text-ink/80">{trail.summary}</p>

        <dl className="grid grid-cols-3 gap-2 text-xs">
          <Stat label="Time" value={formatDuration(trail)} />
          <Stat label="Distance" value={`${trail.distanceKm} km`} />
          <Stat label="Climb" value={`${trail.elevationM} m`} />
        </dl>

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={() => onOpen(trail)}
            className="pressable text-sm font-semibold text-navy underline-offset-4 hover:underline"
          >
            Details
          </button>
          <button
            type="button"
            onClick={() => selectTrailAndScroll(trail.slug)}
            className="pressable inline-flex items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-light"
          >
            Enquire
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-mist px-2.5 py-2">
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-ink">{value}</dd>
    </div>
  );
}
