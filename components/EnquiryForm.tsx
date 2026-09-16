"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { trails, regions, trailBySlug } from "@/lib/trails";
import { enquirySchema, fitnessLevels, fitnessLabel, type Fitness } from "@/lib/enquiry-schema";
import { onTrailSelected } from "@/lib/select-trail";
import { site } from "@/lib/site.config";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<string, string>>;

const field =
  "w-full rounded-xl border border-stone bg-white px-4 py-3 text-ink placeholder:text-slate/80 transition-[border-color,box-shadow] duration-150 focus:border-navy focus:outline-none focus:ring-4 focus:ring-navy/10";
const label = "mb-1.5 block text-sm font-semibold text-navy";

export function EnquiryForm() {
  const [trailSlug, setTrailSlug] = useState<string>("undecided");
  const [fitness, setFitness] = useState<Fitness>("moderate");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Pre-select from ?trail=slug (after hydration, so server and client HTML match)
  // and whenever a trail card / sheet fires "Enquire".
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("trail");
    const raf = fromUrl && trailBySlug(fromUrl) ? requestAnimationFrame(() => setTrailSlug(fromUrl)) : 0;
    const unsubscribe = onTrailSelected((slug) => {
      if (trailBySlug(slug)) {
        setTrailSlug(slug);
        setStatus((s) => (s === "sent" ? "idle" : s));
        // brief highlight so the user sees what changed
        setFlash(true);
        window.setTimeout(() => setFlash(false), 900);
      }
    });
    return () => {
      cancelAnimationFrame(raf);
      unsubscribe();
    };
  }, []);

  const selected = trailSlug !== "undecided" ? trailBySlug(trailSlug) : undefined;
  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setServerError(null);

    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = enquirySchema.safeParse(raw);

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0] ?? "form");
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; fieldErrors?: Errors };
      if (!res.ok || !json.ok) {
        if (json.fieldErrors) setErrors(json.fieldErrors);
        setServerError(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
      formRef.current?.reset();
      setTrailSlug("undecided");
      setFitness("moderate");
    } catch {
      setServerError("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <section id="enquire" className="scroll-mt-20 bg-navy py-20 text-white sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Enquire</p>
          <h2 className="mt-3 text-4xl leading-[1.05] sm:text-5xl">Tell Lenzo about your hike.</h2>
          <p className="mt-5 text-base leading-relaxed text-mist/85 sm:text-lg">
            Share a few details and he&apos;ll reply within {site.replyWithin} with availability, a start time and a
            price. No deposit, no obligation.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            <div className="flex gap-4">
              <dt className="w-24 shrink-0 text-stone">From</dt>
              <dd>
                <span className="font-display text-2xl text-gold">{site.pricing.from}</span>{" "}
                <span className="text-mist">{site.pricing.unit}</span>
                <p className="mt-1 text-xs text-stone">{site.pricing.note}</p>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-24 shrink-0 text-stone">Prefer chat?</dt>
              <dd>
                <a href={site.guide.whatsappLink} target="_blank" rel="noreferrer" className="font-semibold text-white underline-offset-4 hover:underline">
                  WhatsApp {site.guide.whatsapp}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          noValidate
          className="rounded-3xl bg-mist p-5 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] sm:p-8"
        >
          {/* Honeypot — hidden from humans, tempting to bots */}
          <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" error={errors.name}>
              <input name="name" type="text" autoComplete="name" required className={field} placeholder="Jane Hiker" />
            </Field>
            <Field label="Email" error={errors.email}>
              <input name="email" type="email" autoComplete="email" required className={field} placeholder="jane@example.com" />
            </Field>
            <Field label="WhatsApp / phone" hint="optional" error={errors.phone}>
              <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="+27 …" />
            </Field>
            <Field label="Preferred date" hint="optional" error={errors.date}>
              <input name="date" type="date" min={today} className={field} />
            </Field>

            <Field label="Trail" error={errors.trailSlug} className="sm:col-span-2">
              <div className={`rounded-xl transition-shadow duration-300 ${flash ? "ring-4 ring-gold/60" : "ring-0 ring-gold/0"}`}>
                <select
                  name="trailSlug"
                  value={trailSlug}
                  onChange={(e) => setTrailSlug(e.target.value)}
                  className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2332364F%22 stroke-width=%222.2%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_14px_center] bg-no-repeat pr-10`}
                >
                  <option value="undecided">Not sure yet — recommend one for us</option>
                  {regions.map((r) => (
                    <optgroup key={r} label={r}>
                      {trails
                        .filter((t) => t.region === r)
                        .map((t) => (
                          <option key={t.slug} value={t.slug}>
                            {t.name}
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              {selected && (
                <p className="mt-2 text-xs text-slate">
                  {selected.durationHours[0]}–{selected.durationHours[1]} h · {selected.distanceKm} km · {selected.elevationM} m climb ·
                  starts {selected.start}
                </p>
              )}
            </Field>

            <Field label="Group size" error={errors.groupSize}>
              <input name="groupSize" type="number" inputMode="numeric" min={1} max={30} defaultValue={2} required className={field} />
            </Field>

            <Field label="Fitness level" error={errors.fitness}>
              <div role="radiogroup" aria-label="Fitness level" className="grid grid-cols-3 gap-1 rounded-xl bg-white p-1 shadow-[inset_0_0_0_1px_rgba(50,54,79,0.12)]">
                {fitnessLevels.map((f) => (
                  <label key={f} className="cursor-pointer">
                    <input
                      type="radio"
                      name="fitness"
                      value={f}
                      checked={fitness === f}
                      onChange={() => setFitness(f)}
                      className="peer sr-only"
                    />
                    <span className="pressable flex h-[42px] items-center justify-center rounded-lg text-center text-xs font-semibold leading-tight text-navy/70 peer-checked:bg-navy peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-gold sm:text-[13px]">
                      {fitnessLabel[f]}
                    </span>
                  </label>
                ))}
              </div>
            </Field>

            <Field label="Anything Lenzo should know?" error={errors.message} className="sm:col-span-2">
              <textarea
                name="message"
                rows={4}
                required
                className={`${field} resize-y`}
                placeholder="Who's coming, how experienced you are, sunrise or sunset, dietary needs, anything else…"
              />
            </Field>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate" aria-live="polite">
              {status === "sent"
                ? `Sent. Check your inbox for a confirmation — Lenzo replies within ${site.replyWithin}.`
                : serverError ?? (
                    <>
                      By sending, you agree to our{" "}
                      <Link href="/terms" className="font-semibold text-navy underline-offset-4 hover:underline">
                        terms
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="font-semibold text-navy underline-offset-4 hover:underline">
                        privacy policy
                      </Link>
                      . Your details go to Lenzo and nowhere else.
                    </>
                  )}
            </p>
            <SubmitButton status={status} />
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label: text,
  hint,
  error,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className={label}>
        {text}
        {hint && <span className="ml-1.5 font-normal text-slate">({hint})</span>}
        <span className="mt-1.5 block font-normal">{children}</span>
      </label>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Idle → Sending → Sent. Content crossfades with a 2px blur so the
 * two states read as one object changing, not two objects swapping.
 */
function SubmitButton({ status }: { status: Status }) {
  const sending = status === "sending";
  const sent = status === "sent";
  return (
    <button
      type="submit"
      disabled={sending}
      className={`pressable relative inline-flex h-[52px] min-w-[200px] items-center justify-center overflow-hidden rounded-full px-7 text-base font-semibold shadow-[0_12px_32px_-10px_rgba(227,187,71,0.8)] disabled:cursor-progress ${
        sent ? "bg-navy text-white" : "bg-gold text-ink hover:bg-gold-deep"
      }`}
    >
      <Layer active={status === "idle" || status === "error"}>Send enquiry</Layer>
      <Layer active={sending}>
        <span className="flex items-center gap-2.5">
          <Spinner />
          Sending…
        </span>
      </Layer>
      <Layer active={sent}>
        <span className="flex items-center gap-2.5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12l5 5L20 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              className={sent ? "check-draw" : ""}
            />
          </svg>
          Sent to Lenzo
        </span>
      </Layer>
    </button>
  );
}

function Layer({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <span
      aria-hidden={!active}
      className="absolute inset-0 flex items-center justify-center transition-[opacity,filter,transform] duration-200 [transition-timing-function:var(--ease-out)]"
      style={{
        opacity: active ? 1 : 0,
        filter: active ? "blur(0)" : "blur(2px)",
        transform: active ? "scale(1)" : "scale(0.96)",
      }}
    >
      {children}
    </span>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin [animation-duration:650ms]" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
