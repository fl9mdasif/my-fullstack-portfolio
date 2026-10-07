import { pageMetadata } from "@/lib/seo";
import Projects from "./projects-view";

// The page body is a client component (./projects-view.tsx). This thin server
// file exists so the route can export its own metadata and canonical.
export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Selected full stack projects by Asif Al Azad: MERN, Next.js, TypeScript and AI-powered web apps, with live demos, source code and the tech behind each one.",
  path: "/projects",
});

export default function Page() {
  return <Projects />;
}
