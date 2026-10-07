import { pageMetadata } from "@/lib/seo";
import Contact from "./contact-view";

// The page body is a client component (./contact-view.tsx). This thin server
// file exists so the route can export its own metadata and canonical.
export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Asif Al Azad, a Full Stack Developer in Dhaka, Bangladesh, to discuss a project, a collaboration or a job opportunity. Replies come with a clear plan.",
  path: "/contact",
});

export default function Page() {
  return <Contact />;
}
