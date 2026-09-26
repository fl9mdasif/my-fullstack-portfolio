import type { TPortfolioItem } from "@/types/sections";
import type { TProject } from "@/types/common";
import { htmlToText } from "@/utils/richText";

/** Category may arrive as a string, an object, or nothing at all. */
export function categoryName(
  category?: { name: string } | string | null
): string {
  if (!category) return "";
  return typeof category === "string" ? category : category.name ?? "";
}

const slugify = (v: string) =>
  v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Map the redux `TProject` shape onto what ProjectStack reads. */
export function toPortfolioItem(p: TProject, i: number): TPortfolioItem {
  return {
    _id: p._id || `${slugify(p.title)}-${i}`,
    title: p.title,
    slug: p._id || slugify(p.title),
    // The deck card is a clamped excerpt, so editor HTML is flattened here.
    description: htmlToText(p.description),
    techStack: p.technologies ?? [],
    thumbnail: p.image ?? "",
    category: p.category ?? null,
  };
}
