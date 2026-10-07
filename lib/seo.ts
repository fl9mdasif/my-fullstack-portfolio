import type { Metadata } from "next";

/* One place for everything search engines and link previews read. Layout,
   sitemap, robots, the JSON-LD block and every page's metadata import from
   here, so the domain and the name can never drift apart. */

/** Canonical host: asifalazad.com redirects to www. */
export const SITE_URL = "https://www.asifalazad.com";

/** The string people search for. Keep it first in the homepage title. */
export const PERSON_NAME = "Asif Al Azad";
export const PERSON_FULL_NAME = "Md Asif Al Azad";
export const PERSON_ALIASES = [PERSON_FULL_NAME, "Md. Asif Al Azad", "fl9mdasif"];

export const SITE_NAME = "Asif Al Azad | Portfolio";
export const ROLE = "Full Stack Developer";
export const LOCATION = { city: "Dhaka", country: "Bangladesh", countryCode: "BD" };

export const HOME_TITLE = `${PERSON_NAME} | ${ROLE} (MERN, Next.js)`;
export const HOME_DESCRIPTION = `${PERSON_NAME} (${PERSON_FULL_NAME}) is a ${ROLE} from ${LOCATION.city}, ${LOCATION.country}. Explore MERN, Next.js and AI projects, then get in touch to build yours.`;

/** International format, digits only after "+": used for tel:, sms: and wa.me links. */
export const PHONE = { display: "+880 1605 855 875", e164: "+8801605855875" } as const;

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/fl9mdasif/",
  github: "https://github.com/fl9mdasif",
  facebook: "https://www.facebook.com/omitoteja",
} as const;

export const KNOWS_ABOUT = [
  "Full Stack Development",
  "MERN Stack",
  "Next.js",
  "React",
  "Node.js",
  "TypeScript",
  "MongoDB",
  "RAG",
  "DJANGO",
  "SQL",
  "noSQL",
  "REST APIs",
  "AI Integration",
  "AI Engineering",
  "AI CHATBOT",
  
];

/**
 * Share-preview card: public/portfolio_preview.jpg, 1200x630 JPEG. Pages that
 * restate `openGraph` do not inherit the root image, so every page lists it.
 */
export const OG_IMAGE = {
  url: "/portfolio_preview.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: `${PERSON_NAME} - ${ROLE}`,
} as const;

/**
 * Metadata for a list page. `title` goes through the root title template
 * ("%s | Asif Al Azad"). `openGraph` and `twitter` are restated in full on
 * purpose: Next replaces a child's `openGraph` object instead of merging it.
 * The preview image is OG_IMAGE for every route.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** Route path, e.g. "/blog". Resolved against metadataBase. */
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${PERSON_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
