"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site.config";

const links = [
  { href: "/#trails", label: "Trails" },
  { href: "/#how", label: "How it works" },
  { href: "/#about", label: "About Lenzo" },
  { href: "/#safety", label: "Safety" },
];

/** `solid` — always show the navy bar (pages without a hero behind it). */
export function Nav({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape — instantly, no animation.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        solid || scrolled || open
          ? "bg-navy/90 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container-x flex h-[72px] items-center justify-between gap-4">
        <Link href="/#top" className="pressable flex items-center gap-3" aria-label={`${site.name} — home`}>
          <Image
            src={site.logo}
            alt=""
            width={44}
            height={44}
            priority
            className="h-11 w-11 rounded-full object-contain"
          />
          <span className="font-display text-lg leading-none text-white">
            Hiking <span className="text-gold">with Lenzo</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="pressable rounded-full px-3.5 py-2 text-sm font-medium text-mist/85 hover:bg-white/10 hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/#enquire"
            className="pressable hidden rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_6px_20px_-8px_rgba(227,187,71,0.7)] hover:bg-gold-deep sm:inline-flex"
          >
            Enquire
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="pressable inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition-transform duration-200 [transition-timing-function:var(--ease-out)] ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 rounded bg-current transition-opacity duration-150 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 rounded bg-current transition-transform duration-200 [transition-timing-function:var(--ease-out)] ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu — grid-rows trick so height animates via transform-free layout */}
      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows] duration-250 [transition-timing-function:var(--ease-out)] md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="container-x flex flex-col gap-1 pb-4 pt-1">
            {links.map((l, i) => (
              <li
                key={l.href}
                className={`transition-[opacity,transform] duration-200 [transition-timing-function:var(--ease-out)] ${
                  open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${40 + i * 35}ms` : "0ms" }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="pressable block rounded-xl px-3 py-3 text-base font-medium text-mist hover:bg-white/10"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/#enquire"
                onClick={() => setOpen(false)}
                className="pressable flex items-center justify-center rounded-full bg-gold px-5 py-3 text-base font-semibold text-ink"
              >
                Enquire about a hike
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
