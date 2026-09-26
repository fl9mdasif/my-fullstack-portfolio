import type { TService } from "@/types/sections";

export const services: TService[] = [
  {
    _id: "svc-fullstack",
    title: "Full Stack Web Applications",
    slug: "fullstack-web-application",
    shortDescription:
      "Production ready apps on Next.js, backed by Node.js or Python Django, PostgreSQL or MongoDB, secure role based auth and an admin dashboard your team owns.",
    icon: "fullstack",
  },
  {
    _id: "svc-saas",
    title: "SaaS Product Development",
    slug: "saas-product-development",
    shortDescription:
      "Multi tenant SaaS from first commit to paying users: subscription billing, background jobs, usage limits and a dashboard that grows with your customer base.",
    icon: "saas",
  },
  {
    _id: "svc-chatbot",
    title: "AI Chatbots & Booking Assistants",
    slug: "ai-chatbot-booking-assistant",
    shortDescription:
      "AI chat and voice agents that answer every message and call, qualify the lead and book the job while you are still out on site.",
    icon: "chatbot", // new icon key, see note
  },
  {
    _id: "svc-ai-automation",
    title: "AI Automation & Integrations",
    slug: "ai-automation",
    shortDescription:
      "LLM features and n8n pipelines wired into your real workflows: document Q&A, smart search, automated reporting and the manual steps taken off your week.",
    icon: "ai",
  },
  {
    _id: "svc-ecommerce",
    title: "E-commerce Platforms",
    slug: "ecommerce-platform",
    shortDescription:
      "Product catalogue, cart, secure checkout and order tracking, with inventory and sales reporting that replace the spreadsheet you are still maintaining.",
    icon: "ecommerce",
  },
  {
    _id: "svc-api",
    title: "Backend & API Engineering",
    slug: "backend-api-engineering",
    shortDescription:
      "Typed REST APIs on Node or Django, clean data models, Zod validation, tested endpoints and documentation your team can actually read.",
    icon: "backend", // new icon key, see note
  },
  {
    _id: "svc-frontend",
    title: "Frontend & UI Engineering",
    slug: "frontend-ui-engineering",
    shortDescription:
      "Responsive, accessible interfaces in React and Tailwind. Fast on mobile, consistent on every screen, and easy for the next developer to extend.",
    icon: "uiux",
  },
  {
    _id: "svc-devops",
    title: "DevOps & Deployment",
    slug: "devops-deployment",
    shortDescription:
      "AWS, Hostinger deployment, CI/CD pipelines, error monitoring with Sentry and environment setup that turns releases into a routine instead of an event.",
    icon: "web",
  },
];