import { pageMetadata } from "@/lib/seo";
import BlogsPage from "./blog-view";

// The page body is a client component (./blog-view.tsx). This thin server
// file exists so the route can export its own metadata and canonical.
export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Articles by Asif Al Azad on web development, Node.js, Next.js and the tools behind shipping full stack products. Practical notes from real projects.",
  path: "/blog",
});

export default function Page() {
  return <BlogsPage />;
}
