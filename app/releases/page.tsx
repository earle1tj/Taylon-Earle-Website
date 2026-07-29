import type { Metadata } from "next";
import Link from "next/link";
import { InnerPageHero } from "../components/InnerPageHero";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { releaseSteps } from "../musicData";

export const metadata: Metadata = {
  title: "Releases",
  description: "Follow Backroads & Broken Hearts, the debut original single from country artist Taylon James.",
};

export default function ReleasesPage() {
  return (
    <main id="main-content" className="inner-page">
      <SiteHeader active="releases" />
      <InnerPageHero
        number="01"
        eyebrow="Original music"
        title="The first chapter is being recorded."
        intro="Backroads & Broken Hearts is officially in the studio. Follow the debut single from the first take to its estimated September release."
      />

      <section className="release-feature page-shell">
        <div className="release-art release-cover">
          <img
            src="/backroads-broken-hearts-cover.webp"
            alt="Backroads & Broken Hearts cover artwork by Taylon James, set on a misty forest road"
          />
        </div>
        <div className="release-copy">
          <p className="micro-label">Next release</p>
          <h2>Backroads &amp;<br />Broken Hearts</h2>
          <p className="release-status">Recording <span aria-hidden="true">·</span> Estimated release: September 2026</p>
          <p>
            A small-town country song about growing up gay, finding a voice, and
            carrying every backroad and broken heart into the person you become.
          </p>
          <Link className="text-link" href="/contact">Ask about the single <span>→</span></Link>
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
