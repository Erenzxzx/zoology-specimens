import specimensJson from "@/data/specimens.json";
import { BASE_PATH } from "@/lib/site-config";

export type Specimen = {
  id: string;
  common_name: string;
  scientific_name: string;
  class_phylum: string;
  collection_date: string;
  location: string;
  description: string;
  habitat: string;
  diet: string;
  conservation_status: string;
  notes: string;
  sources: string;
  /**
   * Either a filename living in public/specimens/ (e.g. "001.jpg") or a
   * full https:// URL. Leave blank until you've photographed the specimen.
   */
  image: string;
};

export const specimens = specimensJson as Specimen[];

export function getSpecimen(id: string): Specimen | undefined {
  return specimens.find((s) => s.id === id);
}

export function getAllSpecimenIds(): string[] {
  return specimens.map((s) => s.id);
}

/**
 * Resolves a specimen's `image` field into a usable <img src>.
 * - A full URL (https://...) is used as-is.
 * - A bare filename (e.g. "001.jpg") is looked up in public/specimens/.
 * - Blank returns "".
 */
export function resolveImageSrc(image: string): string {
  if (!image) return "";
  if (/^https?:\/\//i.test(image)) return image;
  return `${BASE_PATH}/specimens/${image}`;
}

/**
 * Turns a free-text "Class / Phylum" field into an ordered breadcrumb,
 * higher rank (phylum) first.
 */
export function taxonTrail(classPhylum: string): string[] {
  if (!classPhylum) return [];
  const parts = classPhylum
    .replace(/,/g, "/")
    .split("/")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length < 2) return parts;

  const knownPhyla = [
    "chordata",
    "arthropoda",
    "mollusca",
    "annelida",
    "cnidaria",
    "echinodermata",
    "porifera",
    "nematoda",
  ];
  let [a, b] = parts;
  if (knownPhyla.includes(b.toLowerCase()) && !knownPhyla.includes(a.toLowerCase())) {
    [a, b] = [b, a];
  }
  return [a, b, ...parts.slice(2)];
}