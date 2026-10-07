import {
  HOME_DESCRIPTION,
  KNOWS_ABOUT,
  LOCATION,
  PERSON_ALIASES,
  PERSON_NAME,
  ROLE,
  SITE_URL,
  SOCIAL,
} from "@/lib/seo";

/**
 * Structured data for the name query. Only facts that are already public on
 * the site: no employer, degree or contact details.
 */
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PERSON_NAME,
      alternateName: PERSON_ALIASES,
      url: SITE_URL,
      image: `${SITE_URL}/hero-image2.png`,
      jobTitle: ROLE,
      description: HOME_DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        addressLocality: LOCATION.city,
        addressCountry: LOCATION.countryCode,
      },
      // Every profile listed in lib/seo.ts SOCIAL.
      sameAs: Object.values(SOCIAL),
      knowsAbout: KNOWS_ABOUT,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${PERSON_NAME} | Portfolio`,
      alternateName: [PERSON_NAME, "Asif Al Azad Portfolio"],
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // Static, server-built JSON. `<` is escaped so no string can close the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
