import type { Metadata } from "next";
import Link from "next/link";
import { InnerPageHero } from "../components/InnerPageHero";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { releaseSteps } from "../musicData";

export const metadata: Metadata = {
  title: "Releases",
  description: "Follow upcoming original music and releases from country artist Taylon James.",
};

export default function ReleasesPage() {
  return (
    <main id="main-content" className="inner-page">
      <SiteHeader active="releases" />
      <InnerPageHero
        number="01"
        eyebrow="Original music"
        title="The first chapter is being written."
        intro="There isn’t a made-up discography hiding here. Taylon’s debut original music is still taking shape—and this page will grow with every real release."
      />

      <section className="release-feature page-shell">
        <div className="release-art" aria-label="Debut release artwork placeholder">
          <img className="release-day-clouds clouds-back" src="/day-clouds-wispy.png" alt="" aria-hidden="true" />
          <img className="release-day-clouds clouds-mid" src="/day-clouds-scattered.png" alt="" aria-hidden="true" />
          <img className="release-day-clouds clouds-mid-alt" src="/day-clouds-scattered.png" alt="" aria-hidden="true" />
          <img className="release-day-clouds clouds-front" src="/day-clouds.png" alt="" aria-hidden="true" />
          <span>Original music</span>
          <strong>Taylon<br />James</strong>
          <i>Coming soon</i>
        </div>
        <div className="release-copy">
          <p className="micro-label">Next release</p>
          <h2>Debut single</h2>
          <p className="release-status">Title and release date to be announced</p>
          <p>
            The goal is simple: honest country storytelling, a voice that feels
            lived-in, and production that knows when to get out of the song’s way.
          </p>
          <Link className="text-link" href="/contact">Ask about the project <span>→</span></Link>
        </div>
      </section>

      <section className="roadmap-section page-shell">
        <div className="section-heading">
          <p className="micro-label">Along the way</p>
          <h2>From idea to release.</h2>
        </div>
        <ol className="release-roadmap">
          {releaseSteps.map((step, index) => (
            <li className={step.active ? "active" : ""} key={step.label}>
              <span>0{index + 1}</span>
              <div>
                <strong>{step.label}</strong>
                <p>{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <SiteFooter />
    </main>
  );
}
