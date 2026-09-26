import { SectionHead } from "@/components/ui/SectionHead";
import { ServicesGrid } from "@/components/sections/ServiceCard";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section className="section services" id="services">
      <div className="wrap">
        <SectionHead
          eyebrow="What I do"
          title={
            <>
              Services built around <span className="accent">shipping</span>
            </>
          }
          lead="Every project ends with something deployed, documented and fully yours to run."
        />
        <ServicesGrid services={services} />
      </div>
    </section>
  );
}
