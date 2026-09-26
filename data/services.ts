import type { TService } from "@/types/sections";

export const services: TService[] = [
  {
    _id: "svc-fullstack",
    title: "Full Stack Web Applications",
    slug: "fullstack-web-application",
    shortDescription:
      "End-to-end products on Next.js, Node and MongoDB — auth, dashboards, payments and an admin panel you actually own.",
    icon: "fullstack",
  },
  {
    _id: "svc-ai",
    title: "AI Integration",
    slug: "ai-integration",
    shortDescription:
      "LLM features wired into real workflows: resume analysis, document Q&A, smart search and automated reporting.",
    icon: "ai",
  },
  {
    _id: "svc-ecommerce",
    title: "E-commerce Platforms",
    slug: "ecommerce-platform",
    shortDescription:
      "Product catalogue, cart, checkout and order management built to handle inventory without spreadsheets.",
    icon: "ecommerce",
  },
  {
    _id: "svc-api",
    title: "Backend & API Engineering",
    slug: "backend-api-engineering",
    shortDescription:
      "Typed REST APIs, clean data models, validation with Zod and documentation your team can read.",
    icon: "saas",
  },
  {
    _id: "svc-frontend",
    title: "Frontend & UI Engineering",
    slug: "frontend-ui-engineering",
    shortDescription:
      "Responsive, accessible interfaces in React and Tailwind — fast on mobile, consistent on every screen.",
    icon: "uiux",
  },
  {
    _id: "svc-devops",
    title: "DevOps & Automation",
    slug: "devops-automation",
    shortDescription:
      "Docker, AWS deployment, CI pipelines and n8n workflows that remove the manual steps from your week.",
    icon: "web",
  },
];
