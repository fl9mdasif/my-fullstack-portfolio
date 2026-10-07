import { IconBrandWhatsapp, IconPhone } from "@tabler/icons-react";
import { PHONE } from "@/lib/seo";

/* Outline Call and WhatsApp buttons pinned bottom-right. Call sits at the
   bottom and dials straight away; WhatsApp rises above it (.dock-rise in
   app/sections.css). Plain links, so it stays a server component. */

export default function ContactDock() {
  const base =
    "grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black-100/80 text-white backdrop-blur-md transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400";

  return (
    <nav
      aria-label="Quick contact"
      className="fixed bottom-4 right-4 z-[4000] flex flex-col gap-2.5 sm:bottom-6 sm:right-6"
    >
      <a
        href={`https://wa.me/${PHONE.e164.replace("+", "")}`}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className={`dock-rise ${base} hover:border-emerald-400/70 hover:text-emerald-300 hover:shadow-[0_0_24px_-4px_rgba(52,211,153,.6)]`}
      >
        <IconBrandWhatsapp className="h-5 w-5" stroke={1.6} aria-hidden="true" />
      </a>

      <a
        href={`tel:${PHONE.e164}`}
        aria-label={`Call ${PHONE.display}`}
        title={`Call ${PHONE.display}`}
        className={`${base} hover:border-violet-400/70 hover:text-violet-300 hover:shadow-[0_0_24px_-4px_rgba(167,139,250,.6)]`}
      >
        <IconPhone className="h-5 w-5" stroke={1.6} aria-hidden="true" />
      </a>
    </nav>
  );
}
