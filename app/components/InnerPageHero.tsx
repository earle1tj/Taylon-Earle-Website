export function InnerPageHero({
  number,
  eyebrow,
  title,
  intro,
}: {
  number: string;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="inner-hero page-shell">
      <div className="inner-number" aria-hidden="true">{number}</div>
      <div className="inner-title">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </div>
      <p className="inner-intro">{intro}</p>
      <div className="inner-glow" aria-hidden="true" />
    </section>
  );
}
