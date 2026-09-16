/**
 * Everything Lenzo will want to change lives here.
 * Swap the placeholders below for his real details — nothing else needs editing.
 */
export const site = {
  name: "Hiking with Lenzo & Friends",
  shortName: "Hiking with Lenzo",
  tagline: "Leave footprints, take memories.",
  description:
    "Guided hikes on Table Mountain, Lion's Head, the Twelve Apostles and the Cape Peninsula with Lenzo — a local guide who knows every route, every viewpoint and every safe way down.",
  url: "https://hikingwithlenzo.co.za",
  logo: "/hiking-with-lenzo-logo-flat.png",
  logoWide: "/hiking-with-lenzo-logo.png",

  guide: {
    name: "Lenzo",
    fullName: "Lenzo",
    email: "lenzo@example.com", // ← Lenzo's real inbox (also set ENQUIRY_TO_EMAIL)
    whatsapp: "+27 00 000 0000", // ← placeholder
    whatsappLink: "https://wa.me/27000000000",
    instagram: "@hikingwithlenzo",
    instagramLink: "https://instagram.com/hikingwithlenzo",
    bio: "Born and raised at the foot of Table Mountain, Lenzo has spent more than a decade walking its ravines, ridges and contour paths. He guides small groups because the mountain is better shared — and safer that way. Expect stories, snacks, the odd detour to a secret viewpoint, and someone who will always know the way home.",
    credentials: [
      "Wilderness First Aid certified",
      "Registered SATSA-compliant guide",
      "10+ years on Table Mountain National Park trails",
      "Groups of 2–12 hikers",
    ],
  },

  stats: [
    { value: "20+", label: "Trails guided" },
    { value: "10 yrs", label: "On the mountain" },
    { value: "2–12", label: "Hikers per group" },
    { value: "100%", label: "Safe returns" },
  ],

  pricing: {
    from: "R450",
    unit: "per person",
    note: "Indicative. Final price depends on trail, group size and duration — Lenzo confirms it in his reply.",
  },

  emergency: {
    tmnp: "086 110 6417",
    saps: "10111",
    wsar: "021 937 0300",
  },

  replyWithin: "24 hours",
} as const;
