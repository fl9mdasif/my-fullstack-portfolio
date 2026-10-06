import type { MetadataRoute } from "next";

// Canonical host is www (asifalazad.com redirects to www.asifalazad.com).
const base = "https://www.asifalazad.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];
  // When blog posts exist, map them here:
  // ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.updatedAt), changeFrequency: "monthly", priority: 0.6 })),
}