export type Difficulty = 1 | 2 | 3 | 4 | 5;

export const regions = [
  "Table Mountain",
  "Twelve Apostles & Atlantic",
  "Lion's Head & Signal Hill",
  "Devil's Peak & Newlands",
  "Silvermine & South Peninsula",
  "Hout Bay & Chapman's Peak",
  "Cape Point",
] as const;

export type Region = (typeof regions)[number];

export type Trail = {
  slug: string;
  name: string;
  region: Region;
  difficulty: Difficulty;
  /** [min, max] hours, round trip unless `oneWay` is set */
  durationHours: [number, number];
  oneWay?: boolean;
  distanceKm: number;
  elevationM: number;
  start: string;
  summary: string;
  highlights: string[];
  bestFor: string;
  notes?: string;
  /** Unsplash photo URL. Drop `public/trails/<slug>.jpg` in and point here to override. */
  image: string;
};

export const difficultyLabel: Record<Difficulty, string> = {
  1: "Easy",
  2: "Moderate",
  3: "Challenging",
  4: "Hard",
  5: "Extreme",
};

// Unsplash resizes + serves webp/avif itself, so these are used with `unoptimized`.
const unsplash = (token: string, w = 1000) =>
  `https://images.unsplash.com/${token}?auto=format&fit=crop&w=${w}&q=80`;

export const trails: Trail[] = [
  // ── Table Mountain ───────────────────────────────────────────────
  {
    slug: "platteklip-gorge",
    name: "Platteklip Gorge",
    region: "Table Mountain",
    difficulty: 3,
    durationHours: [2, 3],
    oneWay: true,
    distanceKm: 4.3,
    elevationM: 650,
    start: "Tafelberg Road, 1.5 km past the Lower Cableway",
    summary:
      "The most direct route to the top of Table Mountain — a giant stone staircase straight up the gorge that splits the front face.",
    highlights: [
      "Stand on the summit plateau in under three hours",
      "City-bowl and Robben Island views the whole way up",
      "Ride the cable car back down",
    ],
    bestFor: "First-timers who want the summit and a real workout",
    notes:
      "Fully exposed to sun — start early in summer. Bring 2 L of water per person.",
    image: unsplash("photo-1751473681036-fa181075d22d"),
  },
  {
    slug: "india-venster",
    name: "India Venster",
    region: "Table Mountain",
    difficulty: 5,
    durationHours: [3, 4],
    oneWay: true,
    distanceKm: 4.3,
    elevationM: 720,
    start: "Lower Cableway station, Tafelberg Road",
    summary:
      "Table Mountain's most thrilling route: a scramble beneath the cable car with chains, staples and ledges above the Camps Bay side.",
    highlights: [
      "The 'window' viewpoint — Lion's Head framed by rock",
      "Hands-on scrambling with fixed chains and staples",
      "The best views on the mountain, bar none",
    ],
    bestFor: "Fit, confident hikers with a head for heights",
    notes:
      "Not suitable for children or anyone uneasy with exposure. Lenzo guides this route in small groups only.",
    image: unsplash("photo-1755251415391-68613a7c4f38"),
  },
  {
    slug: "skeleton-gorge",
    name: "Skeleton Gorge to Maclear's Beacon",
    region: "Table Mountain",
    difficulty: 3,
    durationHours: [4, 5],
    distanceKm: 7,
    elevationM: 600,
    start: "Kirstenbosch National Botanical Garden (entry fee applies)",
    summary:
      "A shaded climb through indigenous forest and up wooden ladders beside a mountain stream, emerging on the back table beside the reservoirs.",
    highlights: [
      "Yellowwood forest, ferns and waterfalls",
      "Hely-Hutchinson reservoir and the 'beach' on the back table",
      "Maclear's Beacon — the highest point in Cape Town (1,086 m)",
    ],
    bestFor: "Anyone who likes green, shade and a bit of a ladder",
    notes: "Rocks are slippery after rain. Usually descended via Nursery Ravine.",
    image: unsplash("photo-1680547904325-f83361232bbe"),
  },
  {
    slug: "nursery-ravine",
    name: "Nursery Ravine Loop",
    region: "Table Mountain",
    difficulty: 3,
    durationHours: [4, 5],
    distanceKm: 8,
    elevationM: 600,
    start: "Kirstenbosch National Botanical Garden",
    summary:
      "Skeleton Gorge's quieter neighbour. Climb one, descend the other — thousands of stone and timber steps through a cool, mossy ravine.",
    highlights: [
      "The classic Kirstenbosch loop",
      "Contour Path along the eastern buttresses",
      "Finish with a picnic in the gardens",
    ],
    bestFor: "A full-day loop without needing the cable car",
    image: unsplash("photo-1600450575711-12205d5a259d"),
  },
  {
    slug: "maclears-beacon",
    name: "Maclear's Beacon from the Cableway",
    region: "Table Mountain",
    difficulty: 1,
    durationHours: [1.5, 2],
    distanceKm: 5.4,
    elevationM: 150,
    start: "Upper Cableway station",
    summary:
      "Ride up, walk across the summit plateau to the highest point, and back. Gentle, spectacular, and doable for almost everyone.",
    highlights: [
      "Sandstone rock gardens and endemic fynbos",
      "Views over False Bay, Hout Bay and Cape Point",
      "Perfect for families and visitors short on time",
    ],
    bestFor: "Families, mixed-fitness groups, half-day visitors",
    notes: "No shade on the plateau — hats and sunblock essential.",
    image: unsplash("photo-1591296795955-92a580509b82"),
  },
  {
    slug: "kloof-corner",
    name: "Kloof Corner",
    region: "Table Mountain",
    difficulty: 2,
    durationHours: [1, 1.5],
    distanceKm: 2,
    elevationM: 250,
    start: "Kloof Corner, Tafelberg Road",
    summary:
      "A short, punchy climb to a beacon on the contour path with the whole Atlantic seaboard laid out beneath you. Cape Town's favourite sunset spot.",
    highlights: [
      "Sunrise or sunset over Lion's Head and Camps Bay",
      "Only 1 km to the viewpoint",
      "Picnic-friendly ledges",
    ],
    bestFor: "Sunset picnics, first evenings in the city",
    image: unsplash("photo-1516273766481-41f278b6d72f"),
  },

  // ── Twelve Apostles & Atlantic ───────────────────────────────────
  {
    slug: "kasteelspoort",
    name: "Kasteelspoort & the Diving Board",
    region: "Twelve Apostles & Atlantic",
    difficulty: 3,
    durationHours: [4, 5],
    distanceKm: 11,
    elevationM: 680,
    start: "Theresa Avenue, Camps Bay (Pipe Track trailhead)",
    summary:
      "Up the Twelve Apostles via a wide ravine to the famous rock ledge that juts out over Camps Bay — the most photographed spot in Cape Town.",
    highlights: [
      "The Diving Board photo ledge",
      "Old cableway ruins on the back table",
      "Loop back down via Woody Ravine or the Pipe Track",
    ],
    bestFor: "That one photo everyone wants, plus a proper day out",
    image: unsplash("photo-1652099809254-bb0e484772cb"),
  },
  {
    slug: "tranquility-cracks",
    name: "Tranquility Cracks via Corridor Ravine",
    region: "Twelve Apostles & Atlantic",
    difficulty: 4,
    durationHours: [5, 6],
    distanceKm: 10,
    elevationM: 700,
    start: "Theresa Avenue, Camps Bay",
    summary:
      "A hidden maze of narrow sandstone cracks and secret yellowwood groves on top of the Twelve Apostles. You'd never find it without a guide.",
    highlights: [
      "Wander through cool, mossy rock corridors",
      "Hidden pocket forests inside the mountain",
      "Far from the crowds",
    ],
    bestFor: "Repeat visitors who've done the classics",
    notes: "Route-finding is tricky — this is exactly why Lenzo exists.",
    image: unsplash("photo-1639172111914-904750e933ae"),
  },
  {
    slug: "pipe-track",
    name: "The Pipe Track",
    region: "Twelve Apostles & Atlantic",
    difficulty: 1,
    durationHours: [2, 3],
    distanceKm: 6,
    elevationM: 100,
    start: "Kloof Nek",
    summary:
      "A near-level contour walk built in 1887 to service the city's water pipeline, running beneath the Twelve Apostles above Camps Bay.",
    highlights: [
      "Almost no climbing, all the views",
      "Wild flowers in spring",
      "Ocean on one side, cliffs on the other",
    ],
    bestFor: "Easy mornings, older hikers, recovery days",
    image: unsplash("photo-1543261534-09e5f83a86c2"),
  },

  // ── Lion's Head & Signal Hill ────────────────────────────────────
  {
    slug: "lions-head",
    name: "Lion's Head",
    region: "Lion's Head & Signal Hill",
    difficulty: 2,
    durationHours: [1.5, 2.5],
    distanceKm: 5,
    elevationM: 350,
    start: "Signal Hill Road car park",
    summary:
      "The spiral path up Cape Town's iconic peak, with chains and ladders near the top and a 360° view of city, mountain and both oceans.",
    highlights: [
      "360° panorama from the 669 m summit",
      "Optional chains-and-ladders section (there's a walk-around)",
      "Full-moon and sunrise hikes",
    ],
    bestFor: "Sunrise, sunset and full-moon outings",
    notes: "Busy on weekends — Lenzo picks quieter start times.",
    image: unsplash("photo-1504197644482-b75213e44ea9"),
  },
  {
    slug: "wallys-cave",
    name: "Wally's Cave",
    region: "Lion's Head & Signal Hill",
    difficulty: 2,
    durationHours: [1.5, 2],
    distanceKm: 3,
    elevationM: 200,
    start: "Signal Hill Road car park",
    summary:
      "A short detour off the Lion's Head path to a cave whose mouth perfectly frames Table Mountain and the Twelve Apostles.",
    highlights: [
      "The 'cave window' photo",
      "Quick and rewarding",
      "Combine with a Lion's Head summit",
    ],
    bestFor: "Photographers, short mornings",
    notes: "Please take all litter out with you — this spot suffers from its fame.",
    image: unsplash("photo-1613926156179-abf7cc9e0f33"),
  },
  {
    slug: "signal-hill",
    name: "Signal Hill Sunset Walk",
    region: "Lion's Head & Signal Hill",
    difficulty: 1,
    durationHours: [1, 1.5],
    distanceKm: 3,
    elevationM: 80,
    start: "Kloof Nek",
    summary:
      "A gentle stroll along the ridge of Signal Hill to watch the sun sink into the Atlantic. No scrambling, no stress.",
    highlights: [
      "Cape Town's easiest sunset",
      "Sea Point and the harbour lights",
      "Great for larger, mixed groups",
    ],
    bestFor: "Team outings, kids, visiting parents",
    image: unsplash("photo-1501664201380-78af13a2783e"),
  },

  // ── Devil's Peak & Newlands ──────────────────────────────────────
  {
    slug: "devils-peak",
    name: "Devil's Peak via Mowbray Ridge",
    region: "Devil's Peak & Newlands",
    difficulty: 4,
    durationHours: [4, 5],
    distanceKm: 7,
    elevationM: 750,
    start: "Rhodes Memorial car park",
    summary:
      "Up past the King's Blockhouse, along Mowbray Ridge and across the Knife Edge to the 1,000 m summit that towers over the city bowl.",
    highlights: [
      "The Knife Edge traverse",
      "Historic blockhouses from the 1790s",
      "Look down on Table Mountain's front face",
    ],
    bestFor: "Fit hikers wanting something less crowded than the Table",
    notes: "Avoid in strong south-easter wind.",
    image: unsplash("photo-1733371021248-0986ef2ceeba"),
  },
  {
    slug: "woodstock-cave",
    name: "Woodstock Cave",
    region: "Devil's Peak & Newlands",
    difficulty: 2,
    durationHours: [2, 2.5],
    distanceKm: 4,
    elevationM: 300,
    start: "Rhodes Memorial or Tafelberg Road",
    summary:
      "A vast rock overhang on the flank of Devil's Peak, visible from the highway, with the whole city and harbour spread out below.",
    highlights: [
      "Huge sheltered cave mouth",
      "City and harbour views",
      "Combine with Rhodes Memorial for coffee",
    ],
    bestFor: "Half-day adventures, cloudy days",
    image: unsplash("photo-1557077590-f7cc67c1a101"),
  },
  {
    slug: "newlands-forest",
    name: "Newlands Forest & Contour Path",
    region: "Devil's Peak & Newlands",
    difficulty: 1,
    durationHours: [1.5, 2],
    distanceKm: 5,
    elevationM: 200,
    start: "Newlands Forest car park, M3",
    summary:
      "Shaded pine and indigenous forest trails with streams, boardwalks and a gentle climb to the contour path.",
    highlights: [
      "Cool and shaded even in summer",
      "Streams and moss-covered boulders",
      "Dog- and kid-friendly",
    ],
    bestFor: "Easy mornings, hot days, families",
    image: unsplash("photo-1635872671071-74716350b06c"),
  },

  // ── Silvermine & South Peninsula ─────────────────────────────────
  {
    slug: "elephants-eye",
    name: "Elephant's Eye Cave",
    region: "Silvermine & South Peninsula",
    difficulty: 2,
    durationHours: [2.5, 3],
    distanceKm: 6,
    elevationM: 300,
    start: "Silvermine Nature Reserve (Gate 1)",
    summary:
      "Fynbos-covered slopes lead to a cave shaped like an elephant's eye, with False Bay and the Constantia winelands below.",
    highlights: [
      "Swim in Silvermine Dam afterwards",
      "Proteas, sugarbirds and sunbirds",
      "Panoramas of both coasts",
    ],
    bestFor: "Families, nature lovers, a dam swim",
    notes: "SANParks conservation fee at the gate.",
    image: unsplash("photo-1580644906000-6e953181e153"),
  },
  {
    slug: "boomslang-cave",
    name: "Kalk Bay Boomslang Cave",
    region: "Silvermine & South Peninsula",
    difficulty: 3,
    durationHours: [3, 3.5],
    distanceKm: 6,
    elevationM: 400,
    start: "Boyes Drive, Kalk Bay",
    summary:
      "Climb the Kalk Bay mountains and crawl through a 150 m sandstone cave that opens out over the fishing village and False Bay.",
    highlights: [
      "Headlamp cave traverse",
      "Echo Valley and Spes Bona forest",
      "Finish with fish and chips in Kalk Bay harbour",
    ],
    bestFor: "Adventurous groups who don't mind tight spaces",
    notes: "Headlamps provided.",
    image: unsplash("photo-1604763655221-b98ebdac6ddf"),
  },

  // ── Hout Bay & Chapman's Peak ────────────────────────────────────
  {
    slug: "chapmans-peak",
    name: "Chapman's Peak",
    region: "Hout Bay & Chapman's Peak",
    difficulty: 4,
    durationHours: [3, 3.5],
    distanceKm: 5,
    elevationM: 500,
    start: "Chapman's Peak Drive, Hout Bay side",
    summary:
      "A steep stone staircase up from the famous coastal drive to a summit with Hout Bay on one side and Noordhoek's long beach on the other.",
    highlights: [
      "Sheer cliffs dropping into the Atlantic",
      "Views to Cape Point on clear days",
      "Quieter than the city-side peaks",
    ],
    bestFor: "Strong hikers wanting dramatic coastal scenery",
    image: unsplash("photo-1587032044508-f13ba5cd6a0a"),
  },
  {
    slug: "little-lions-head",
    name: "Little Lion's Head",
    region: "Hout Bay & Chapman's Peak",
    difficulty: 3,
    durationHours: [2, 2.5],
    distanceKm: 3,
    elevationM: 300,
    start: "Suikerbossie Road, Hout Bay",
    summary:
      "Lion's Head's overlooked little sibling — a short hike with a fun rock scramble to the top and Llandudno's beach shining below.",
    highlights: [
      "Rock scrambling without the crowds",
      "Llandudno and Sandy Bay views",
      "Silver trees on the lower slopes",
    ],
    bestFor: "A quick adrenaline fix with a view",
    image: unsplash("photo-1602622752584-f61bce0e2af7"),
  },

  // ── Cape Point ───────────────────────────────────────────────────
  {
    slug: "shipwreck-trail",
    name: "Cape of Good Hope Shipwreck Trail",
    region: "Cape Point",
    difficulty: 1,
    durationHours: [3, 4],
    distanceKm: 5,
    elevationM: 50,
    start: "Olifantsbos car park, Cape of Good Hope section",
    summary:
      "A wild coastal ramble past the rusting hull of the Thomas T. Tucker and the Nolloth wreck, with ostriches, bontebok and baboons for company.",
    highlights: [
      "Two shipwrecks on the beach",
      "Wildlife — ostrich, bontebok, eland",
      "WWII observation post",
    ],
    bestFor: "Wildlife, history, an easy full-day trip from the city",
    notes: "Park entry fee applies. Bring lunch; nothing is sold at Olifantsbos.",
    image: unsplash("photo-1663582068240-1ffb66021ac7"),
  },
  {
    slug: "cape-point-lighthouse",
    name: "Cape Point Lighthouse Keeper's Trail",
    region: "Cape Point",
    difficulty: 2,
    durationHours: [2, 2.5],
    distanceKm: 4,
    elevationM: 200,
    start: "Cape Point car park",
    summary:
      "Skip the funicular and walk the old lighthouse keeper's path along the cliff edge to the new lighthouse at the tip of the peninsula.",
    highlights: [
      "Diaz Beach from above",
      "The old and new lighthouses",
      "Where two oceans meet (sort of)",
    ],
    bestFor: "Visitors combining Cape Point with a proper walk",
    notes: "Park entry fee applies.",
    image: unsplash("photo-1603114976874-de6a1ca6d92c"),
  },
];

export const trailBySlug = (slug: string) => trails.find((t) => t.slug === slug);

export const heroImage = unsplash("photo-1585896162053-6ae8d00f6b25", 2000);
