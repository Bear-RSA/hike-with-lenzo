"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** ms — used for light stagger between siblings */
  delay?: number;
  as?: ElementType;
  /** Use the clip-path image reveal instead of fade-up */
  clip?: boolean;
  id?: string;
};

/**
 * Fades content in (opacity + 12px) once it enters the viewport. Runs once.
 * Purely decorative: content is fully interactive from the first frame.
 */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div", clip = false, id }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.in = "true";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.dataset.in = "true";
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`${clip ? "clip-reveal" : "reveal"} ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {/* The clip lives on an inner layer: a fully clipped target never
          "intersects" for IntersectionObserver, so it would never reveal. */}
      {clip ? <div className="clip-reveal-inner absolute inset-0">{children}</div> : children}
    </Tag>
  );
}
