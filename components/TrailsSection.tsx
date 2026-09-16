"use client";

import { useMemo, useState } from "react";
import { regions, trails, difficultyLabel, type Difficulty, type Region, type Trail } from "@/lib/trails";
import { PillGroup } from "./PillGroup";
import { TrailCard } from "./TrailCard";
import { TrailSheet } from "./TrailSheet";

type RegionFilter = "all" | Region;
type DiffFilter = "all" | "1-2" | "3" | "4-5";

const regionOptions: { value: RegionFilter; label: string }[] = [
  { value: "all", label: "All areas" },
  ...regions.map((r) => ({ value: r, label: r })),
];

const diffOptions: { value: DiffFilter; label: string }[] = [
  { value: "all", label: "Any level" },
  { value: "1-2", label: `${difficultyLabel[1]} · ${difficultyLabel[2]}` },
  { value: "3", label: difficultyLabel[3] },
  { value: "4-5", label: `${difficultyLabel[4]} · ${difficultyLabel[5]}` },
];

const diffMatch: Record<DiffFilter, (d: Difficulty) => boolean> = {
  all: () => true,
  "1-2": (d) => d <= 2,
  "3": (d) => d === 3,
  "4-5": (d) => d >= 4,
};

export function TrailsSection() {
  const [region, setRegion] = useState<RegionFilter>("all");
  const [diff, setDiff] = useState<DiffFilter>("all");
  const [openTrail, setOpenTrail] = useState<Trail | null>(null);

  const filtered = useMemo(
    () => trails.filter((t) => (region === "all" || t.region === region) && diffMatch[diff](t.difficulty)),
    [region, diff],
  );

  // Changing the key re-mounts the grid so the stagger replays on filter change.
  const gridKey = `${region}|${diff}`;
  const isFiltered = region !== "all" || diff !== "all";

  return (
    <section id="trails" className="scroll-mt-20 bg-mist py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">The trails</p>
          <h2 className="mt-3 text-4xl leading-[1.05] text-navy sm:text-5xl">
            Pick your mountain. Lenzo handles the rest.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/75 sm:text-lg">
            {trails.length} routes across Table Mountain National Park — from gentle contour walks to
            chains-and-ladders scrambles. Not sure? Enquire anyway and Lenzo will match a trail to your group.
          </p>
        </div>

        <div className="mt-10 flex min-w-0 flex-col gap-5">
          <div className="flex min-w-0 flex-col gap-4">
            <PillGroup label="Area" options={regionOptions} value={region} onChange={setRegion} />
            <PillGroup label="Difficulty" options={diffOptions} value={diff} onChange={setDiff} />
          </div>
          <p className="text-sm text-slate" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "trail" : "trails"}
            {isFiltered && (
              <>
                {" · "}
                <button
                  type="button"
                  onClick={() => {
                    setRegion("all");
                    setDiff("all");
                  }}
                  className="pressable font-semibold text-navy underline-offset-4 hover:underline"
                >
                  Clear filters
                </button>
              </>
            )}
          </p>
        </div>

        {filtered.length > 0 ? (
          <div key={gridKey} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {filtered.map((t, i) => (
              <TrailCard key={t.slug} trail={t} index={i} onOpen={setOpenTrail} />
            ))}
          </div>
        ) : (
          <div className="stagger-item mt-8 rounded-2xl border border-dashed border-stone bg-white/50 p-10 text-center">
            <p className="text-lg text-navy">No trails match that combination.</p>
            <p className="mt-1 text-sm text-slate">Try a different area, or ask Lenzo for a recommendation below.</p>
          </div>
        )}
      </div>

      <TrailSheet trail={openTrail} onClose={() => setOpenTrail(null)} />
    </section>
  );
}
