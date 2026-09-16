import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site.config";
import { Reveal } from "./Reveal";

/* ── Trust bar ─────────────────────────────────────────────────── */
export function TrustBar() {
  return (
    <section className="bg-navy pb-16 text-white">
      <div className="container-x">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-4">
          {site.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 60} className="bg-navy px-5 py-6 sm:px-7 sm:py-8">
              <dd className="font-display text-3xl text-gold sm:text-4xl">{s.value}</dd>
              <dt className="mt-1 text-sm text-stone">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ── How it works ──────────────────────────────────────────────── */
const steps = [
  {
    n: "01",
    title: "Pick a trail (or don't)",
    body: "Browse the routes above and choose one that suits your group — or leave it to Lenzo and just tell him how far you'd like to walk.",
  },
  {
    n: "02",
    title: "Send an enquiry",
    body: "Two minutes on the form below. Lenzo replies personally within 24 hours with availability, a start time, what to bring and a price.",
  },
  {
    n: "03",
    title: "Meet at the trailhead",
    body: "He'll be there with snacks, a first-aid kit and more stories than you'll have time for. Leave footprints, take memories.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">How it works</p>
            <h2 className="mt-3 text-4xl leading-[1.05] text-navy sm:text-5xl">Three steps to the summit.</h2>
            <p className="mt-4 text-base leading-relaxed text-ink/75">
              No booking portal, no deposits up front. Just a conversation with the person who&apos;ll be walking next to you.
            </p>
          </Reveal>
          <ol className="grid gap-4 sm:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 80} className="relative rounded-2xl bg-mist p-6">
                <span className="font-display text-4xl text-gold">{s.n}</span>
                <h3 className="mt-4 text-xl text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ── About Lenzo ───────────────────────────────────────────────── */
export function AboutLenzo() {
  return (
    <section id="about" className="scroll-mt-20 bg-navy py-20 text-white sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal clip className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-navy-light sm:aspect-[5/4] lg:aspect-[4/5]">
          <Image
            src="/merch-tee.jpg"
            alt="The Hiking with Lenzo and Friends crew tee"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-6 pt-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Official crew tee</p>
            <p className="mt-1 text-sm text-mist/90">Ask Lenzo about one on the day.</p>
          </div>
        </Reveal>

        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Your guide</p>
          <h2 className="mt-3 text-4xl leading-[1.05] sm:text-5xl">
            Meet {site.guide.name}.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mist/85 sm:text-lg">{site.guide.bio}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {site.guide.credentials.map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm text-mist">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-ink" aria-hidden>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#enquire"
              className="pressable inline-flex items-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-gold-deep"
            >
              Hike with Lenzo
            </a>
            <a
              href={site.guide.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="pressable inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Safety ────────────────────────────────────────────────────── */
const included = [
  "A registered, first-aid trained guide",
  "Route planning around weather and wind",
  "Safety briefing before you set off",
  "Trail snacks and a top-up of water",
  "Photos of your group on the summit",
  "Cable car / park fees arranged where needed",
];

const bring = [
  "2 litres of water per person",
  "Closed shoes with grip — trainers are fine on easy routes",
  "A windproof layer, even in summer",
  "Hat, sunblock, sunglasses",
  "A charged phone",
  "Lunch on full-day routes",
];

export function Safety() {
  return (
    <section id="safety" className="scroll-mt-20 bg-mist py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">Safety first</p>
          <h2 className="mt-3 text-4xl leading-[1.05] text-navy sm:text-5xl">The mountain is generous, not forgiving.</h2>
          <p className="mt-4 text-base leading-relaxed text-ink/75 sm:text-lg">
            Weather on Table Mountain can turn in twenty minutes and paths that look obvious on the way up vanish in
            cloud on the way down. SANParks recommends hiking in groups of four or more. Going with a guide is the
            simplest way to keep the day about the views.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal className="rounded-3xl bg-white p-6 sm:p-8">
            <h3 className="text-2xl text-navy">What&apos;s included</h3>
            <ul className="mt-5 space-y-3">
              {included.map((i) => (
                <li key={i} className="flex gap-3 text-sm text-ink/85">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  {i}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} className="rounded-3xl bg-navy p-6 text-white sm:p-8">
            <h3 className="text-2xl">What to bring</h3>
            <ul className="mt-5 space-y-3">
              {bring.map((i) => (
                <li key={i} className="flex gap-3 text-sm text-mist/90">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-relaxed text-stone">
              Emergencies on the mountain: Table Mountain National Park{" "}
              <a href={`tel:${site.emergency.tmnp.replace(/\s/g, "")}`} className="font-semibold text-gold">
                {site.emergency.tmnp}
              </a>{" "}
              · Wilderness Search &amp; Rescue{" "}
              <a href={`tel:${site.emergency.wsar.replace(/\s/g, "")}`} className="font-semibold text-gold">
                {site.emergency.wsar}
              </a>{" "}
              · SAPS{" "}
              <a href={`tel:${site.emergency.saps}`} className="font-semibold text-gold">
                {site.emergency.saps}
              </a>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ──────────────────────────────────────────────── */
const quotes = [
  {
    quote:
      "We'd never have found Tranquility Cracks on our own. Lenzo knew every turn, kept our pace sensible and had a story for every rock.",
    name: "Bear Mdlalose",
    from: "Tranquility Cracks",
  },
  {
    quote:
      "Took my parents up Maclear's Beacon. Patient, funny, and he carried my mom's bag without being asked. Booked again for Lion's Head.",
    name: "Luthando Shaun Nhlabathi",
    from: "Maclear's Beacon",
  },
  {
    quote:
      "India Venster looked terrifying on YouTube. With Lenzo it was the best morning of the year. Zero stress, unreal views.",
    name: "Leeto Lesego Kgati",
    from: "India Venster",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">Footprints left</p>
          <h2 className="mt-3 text-4xl leading-[1.05] text-navy sm:text-5xl">Memories taken.</h2>
        </Reveal>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal as="li" key={q.name} delay={i * 80} className="flex flex-col rounded-3xl bg-mist p-6 sm:p-7">
              <span className="font-display text-5xl leading-none text-gold" aria-hidden>
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 text-base leading-relaxed text-ink/85">{q.quote}</blockquote>
              <footer className="mt-6 text-sm">
                <p className="font-semibold text-navy">{q.name}</p>
                <p className="text-slate">{q.from}</p>
              </footer>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Footer ────────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="bg-navy-deep py-14 text-white">
      <div className="container-x grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image src={site.logoWide} alt={site.name} width={220} height={150} className="h-auto w-[200px]" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone">{site.description}</p>
        </div>
        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.guide.email}`} className="text-mist hover:text-white">
                {site.guide.email}
              </a>
            </li>
            <li>
              <a href={site.guide.whatsappLink} target="_blank" rel="noreferrer" className="text-mist hover:text-white">
                WhatsApp {site.guide.whatsapp}
              </a>
            </li>
            <li>
              <a href={site.guide.instagramLink} target="_blank" rel="noreferrer" className="text-mist hover:text-white">
                Instagram {site.guide.instagram}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["#trails", "Trails"],
              ["#how", "How it works"],
              ["#about", "About Lenzo"],
              ["#safety", "Safety"],
              ["#enquire", "Enquire"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-mist hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-x mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. Cape Town, South Africa.
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          <Link href="/privacy" className="hover:text-white">
            Privacy policy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms &amp; conditions
          </Link>
          <span className="hidden sm:inline">Trails lie within Table Mountain National Park (SANParks).</span>
        </p>
      </div>
    </footer>
  );
}
