import { z } from "zod";
import { trails } from "./trails";

const slugs = trails.map((t) => t.slug) as [string, ...string[]];

export const fitnessLevels = ["easy", "moderate", "fit"] as const;
export type Fitness = (typeof fitnessLevels)[number];

export const fitnessLabel: Record<Fitness, string> = {
  easy: "Easy pace",
  moderate: "Moderate",
  fit: "Very fit",
};

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(80),
  email: z.email("That email doesn't look right").trim(),
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .or(z.literal("")),
  trailSlug: z.enum([...slugs, "undecided"], {
    message: "Pick a trail (or 'Not sure yet')",
  }),
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use the date picker")
    .optional()
    .or(z.literal("")),
  groupSize: z.coerce
    .number()
    .int()
    .min(1, "At least one hiker")
    .max(30, "For groups over 30, WhatsApp Lenzo directly"),
  fitness: z.enum(fitnessLevels, { message: "Choose a fitness level" }),
  message: z
    .string()
    .trim()
    .min(10, "Tell Lenzo a little more (10+ characters)")
    .max(1500, "Keep it under 1,500 characters"),
  /** Honeypot — real users never see or fill this. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;
