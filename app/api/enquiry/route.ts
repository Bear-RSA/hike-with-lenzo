import { NextResponse } from "next/server";
import { Resend } from "resend";
import { enquirySchema } from "@/lib/enquiry-schema";
import { trailBySlug } from "@/lib/trails";
import { site } from "@/lib/site.config";
import EnquiryToLenzo from "@/emails/EnquiryToLenzo";
import ConfirmationToHiker from "@/emails/ConfirmationToHiker";

export const runtime = "nodejs";

/* ── Tiny in-memory rate limit: 5 enquiries per IP per 10 minutes ── */
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries from this connection. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ ok: false, error: "Please check the form.", fieldErrors }, { status: 400 });
  }

  const enquiry = parsed.data;

  // Honeypot filled → pretend success, send nothing.
  if (enquiry.website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL || site.guide.email;
  const from = process.env.ENQUIRY_FROM_EMAIL || "Hiking with Lenzo <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("[enquiry] RESEND_API_KEY is not set. Enquiry:", enquiry);
    return NextResponse.json(
      { ok: false, error: "Email isn't configured yet. Please WhatsApp Lenzo directly." },
      { status: 503 },
    );
  }

  const trailName =
    enquiry.trailSlug === "undecided"
      ? "Not sure yet — needs a recommendation"
      : (trailBySlug(enquiry.trailSlug)?.name ?? enquiry.trailSlug);
  const firstName = enquiry.name.split(" ")[0];

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.batch.send([
      {
        from,
        to: [to],
        replyTo: enquiry.email,
        subject: `New enquiry: ${trailName} · ${enquiry.name} · ${enquiry.groupSize} ${
          enquiry.groupSize === 1 ? "hiker" : "hikers"
        }`,
        react: EnquiryToLenzo({ enquiry, trailName }),
      },
      {
        from,
        to: [enquiry.email],
        replyTo: to,
        subject: `Got your enquiry — ${trailName}`,
        react: ConfirmationToHiker({ firstName, trailName, groupSize: enquiry.groupSize }),
      },
    ]);

    if (error) {
      console.error("[enquiry] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your enquiry. Please try again or WhatsApp Lenzo." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[enquiry] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our side. Please try again." },
      { status: 500 },
    );
  }
}
