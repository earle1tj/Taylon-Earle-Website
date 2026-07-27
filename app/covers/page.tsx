import type { Metadata } from "next";
import { InnerPageHero } from "../components/InnerPageHero";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { StreamingPlatforms } from "../components/StreamingPlatforms";
import { coverProjects } from "../musicData";

export const metadata: Metadata = {
  title: "Cover Songs",
  description: "Explore country cover projects from Taylon James.",
};

export default function CoversPage() {
  return (
    <main id="main-content" className="inner-page">
      <SiteHeader active="covers" />
      <InnerPageHero
        number="02"
        eyebrow="Cover songs"
        title="The songs that shaped the sound."
        intro="Familiar country songs, rebuilt around Taylon’s baritone voice—from finished covers already out in the world to the next performances taking shape."
      />

      <section className="covers-list page-shell" aria-label="Cover projects">
        {coverProjects.map((cover) => (
          <article className="cover-row" key={cover.title}>
            <span className="cover-number">{cover.number}</span>
            <div className="cover-title">
              <p>Originally by {cover.artist}</p>
              <h2>{cover.title}</h2>
            </div>
            <p className="cover-note">{cover.note}</p>
            <span className={`status-chip ${cover.status === "Planned" ? "planned" : ""}`}>
              <i aria-hidden="true" />{cover.status}
            </span>
          </article>
        ))}
      </section>

      <section className="cover-cta page-shell">
        <div>
          <p className="micro-label">Watch this space</p>
          <h2>More songs are on the way.</h2>
        </div>
        <div><p>Follow the official streaming profiles now and return as each project goes live.</p><StreamingPlatforms /></div>
      </section>
      <SiteFooter />
    </main>
  );
}
