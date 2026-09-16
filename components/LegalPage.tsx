import Link from "next/link";
import { Nav } from "./Nav";
import { Footer } from "./Sections";

type Props = {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
};

/** Shared shell for /privacy and /terms. */
export function LegalPage({ eyebrow, title, updated, children }: Props) {
  return (
    <>
      <Nav solid />
      <main className="flex-1 bg-mist">
        <section className="bg-navy pb-14 pt-32 text-white sm:pb-20 sm:pt-40">
          <div className="container-x">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
            <h1 className="mt-3 text-4xl leading-[1.05] sm:text-6xl">{title}</h1>
            <p className="mt-4 text-sm text-stone">Last updated {updated}</p>
          </div>
        </section>
        <section className="py-14 sm:py-20">
          <div className="container-x">
            <article className="legal mx-auto max-w-3xl rounded-3xl bg-white p-6 sm:p-10">{children}</article>
            <p className="mx-auto mt-8 max-w-3xl text-sm text-slate">
              <Link href="/" className="font-semibold text-navy underline-offset-4 hover:underline">
                ← Back to the trails
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
