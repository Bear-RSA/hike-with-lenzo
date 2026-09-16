import Image from "next/image";
import { heroImage } from "@/lib/trails";
import { site } from "@/lib/site.config";

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100dvh] items-end overflow-hidden bg-navy text-white">
      <Image
        src={heroImage}
        alt="Table Mountain rising above Cape Town's city bowl"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="hero-gradient absolute inset-0" aria-hidden />
      <div className="grain absolute inset-0" aria-hidden />

      <div className="container-x relative pb-14 pt-32 sm:pb-20 md:pb-24">
        <p className="reveal mb-4 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium tracking-wide text-mist backdrop-blur-sm" data-in="true">
          Cape Town · Table Mountain National Park
        </p>

        <h1 className="max-w-4xl text-[2.75rem] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.25rem]">
          Cape Town&apos;s mountains,{" "}
          <span className="text-gold">with someone who knows them.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-white sm:text-lg [text-shadow:0_1px_12px_rgba(50,54,79,0.6)]">
          Guided hikes up Table Mountain, Lion&apos;s Head, the Twelve Apostles and the wild
          Cape Peninsula — small groups, real stories, and a safe way down every time.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#enquire"
            className="pressable inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-ink shadow-[0_12px_32px_-10px_rgba(227,187,71,0.8)] hover:bg-gold-deep"
          >
            Plan my hike
            <ArrowIcon />
          </a>
          <a
            href="#trails"
            className="pressable inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/10"
          >
            Browse the trails
          </a>
        </div>

        <p className="mt-8 text-sm text-stone">
          <span className="text-gold">{site.tagline}</span> · Groups of 4+ recommended by SANParks — never hike alone.
        </p>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
