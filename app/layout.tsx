import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "./sections.css";
import { Providers } from "./provider";
import Footer from "@/components/shared/Footer";
import NavBar from "@/components/shared/Navbar";
import ContactDock from "@/components/shared/ContactDock";
import { Toaster } from "sonner";
import { JsonLd } from "@/components/seo/json-ld";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  OG_IMAGE,
  PERSON_NAME,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
// import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

// Used by the hero for "Md Asif" (Tailwind `font-serif`).
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// Homepage metadata. Pages with their own title/description use pageMetadata()
// from lib/seo.ts. The preview image is OG_IMAGE (public/portfolio_preview.jpg).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    // Next fills %s with a page's own title: "Blog | Asif Al Azad".
    template: `%s | ${PERSON_NAME}`,
  },
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  creator: PERSON_NAME,
  publisher: PERSON_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    // SVG first for modern browsers; PNG is the fallback (Safari, old browsers)
    // and the Apple touch icon, which iOS only reads as PNG.
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The design is dark-only: `dark` is set in the markup so every dark:
    // variant applies on first paint, whatever the OS or a saved theme says.
    <html lang="en" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <body className={`${inter.className} ${instrumentSerif.variable}`}>
        <JsonLd />
        <Providers
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NavBar />
          {children}
          <Footer />
          <ContactDock />
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
