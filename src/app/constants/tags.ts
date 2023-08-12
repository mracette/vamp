export const TAGS = [
  "electronic",
  "house",
  "techno",
  "drum and bass",
  "dnb",
] as const;
export type Tag = (typeof TAGS)[number];
