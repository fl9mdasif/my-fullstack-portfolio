import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { contactLinks } from "@/lib/contact";
import { SITE } from "@/lib/site";
import type { TSettings } from "@/types";

type Props = {
  settings: TSettings;
  title?: string;
  text?: string;
  href?: string;
};

export function CTA({
  settings,
  title = "Have a project in mind?",
  text = "Tell us what you're building. You'll get a clear scope and timeline back within one business day, not a sales pitch.",
  href = "/contact",
}: Props) {
  const c = contactLinks(settings);
  return (
    <section className="section flush-top" id="contact">
      <div className="wrap">
        <div className="cta reveal">
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="cta-row">
            <Link href={href} className="btn btn-solid">
              Get a free quote
              <Icon name="arrow" strokeWidth={2} />
            </Link>
            {c.whatsapp && (
              <a href={c.whatsapp.href} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                WhatsApp us
              </a>
            )}
          </div>
          <div className="cta-contacts">
            {c.email && (
              <a href={c.email.href}>
                <Icon name="mail" />
                {c.email.label}
              </a>
            )}
            {c.phone && (
              <a href={c.phone.href}>
                <Icon name="phone" />
                {c.phone.label}
              </a>
            )}
            <a href={SITE.url}>
              <Icon name="globe" />
              {SITE.domain}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
