type Stat = { value: number | string; suffix?: string; label: string };

export function Stats({ items }: { items: Stat[] }) {
  return (
    <section className="section flush-top" aria-label="Key numbers">
      <div className="wrap">
        <div className="stats reveal">
          {items.map((s) => (
            <div key={s.label}>
              {typeof s.value === "number" ? (
                <b data-count={s.value} data-suffix={s.suffix}>
                  {s.value}
                  {s.suffix}
                </b>
              ) : (
                <b>{s.value}</b>
              )}
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
