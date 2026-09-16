"use client";

import { useLayoutEffect, useRef, useState } from "react";

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
};

/**
 * Wrapping pills with a sliding gold highlight.
 * Two copies of the pill row are stacked: the base (navy text) and an
 * "active" copy (gold bg, ink text) clipped to the selected pill with
 * clip-path. Animating the clip gives a seamless colour hand-off that
 * transitioning individual pills' colours never achieves. The clip is
 * computed in both axes so it follows pills that wrap onto new lines.
 */
export function PillGroup<T extends string>({ label, options, value, onChange }: Props<T>) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [clip, setClip] = useState<string>("inset(0 100% 100% 0 round 9999px)");
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const measure = () => {
      const active = row.querySelector<HTMLElement>(`[data-value="${CSS.escape(value)}"]`);
      if (!active) return;
      const top = active.offsetTop;
      const left = active.offsetLeft;
      const right = row.offsetWidth - (left + active.offsetWidth);
      const bottom = row.offsetHeight - (top + active.offsetHeight);
      setClip(`inset(${top}px ${right}px ${bottom}px ${left}px round 9999px)`);
      setReady(true);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    return () => ro.disconnect();
  }, [value, options.length]);

  const pill = "whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium";

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate">{label}</span>
      <div ref={rowRef} className="relative">
        {/* Base layer — interactive */}
        <div role="radiogroup" aria-label={label} className="relative z-10 flex flex-wrap gap-1.5">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={o.value === value}
              data-value={o.value}
              onClick={() => onChange(o.value)}
              className={`pressable ${pill} bg-white text-navy/80 shadow-[inset_0_0_0_1px_rgba(50,54,79,0.08)] hover:text-navy`}
            >
              {o.label}
            </button>
          ))}
        </div>

        {/* Active layer — decorative copy, clipped to the selected pill */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 flex flex-wrap gap-1.5"
          style={{
            clipPath: clip,
            transition: ready ? "clip-path 260ms var(--ease-out)" : "none",
          }}
        >
          {options.map((o) => (
            <span key={o.value} className={`${pill} flex items-center bg-gold text-ink`}>
              {o.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
