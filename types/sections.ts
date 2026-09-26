export type TService = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  /** Icon key from `components/ui/Icon.tsx`, or an https:// image URL. */
  icon?: string;
};

export type TPortfolioItem = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  thumbnail: string;
  category?: { name: string } | string | null;
};
