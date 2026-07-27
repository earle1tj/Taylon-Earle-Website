import type { Metadata } from "next";
import Link from "next/link";
import { InnerPageHero } from "../components/InnerPageHero";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "About Taylon",
  description: "Meet Taylon James, a Mid-Michigan country artist, writer, coach, photographer, and arts advocate.",
};

export default function BioPage() {
  return (
    <main id="main-content" className="inner-page">
      <SiteHeader active="bio" />
      <InnerPageHero
        number="03"
        eyebrow="About Taylon"
        title="One life. A lot of ways to tell a story."
        intro="Taylon James is a Mid-Michigan artist whose creative life moves between country music, fiction, photography, performance, and helping other people find their voice."
      />

      <section className="bio-story page-shell">
        <div className="bio-quote bio-portrait">
          <span aria-hidden="true">“</span>
          <p>Country music works best when the story gets there before the polish.</p>
        </div>
        <div className="bio-copy">
          <p className="micro-label">The story so far</p>
          <h2>Artist, writer, coach, and lifelong storyteller.</h2>
          <p>
            Based in Mid-Michigan, Taylon brings a warm baritone and an acoustic-first
            instinct to modern country music. His current work includes country covers
            and original songs rooted in small-town details, complicated hearts, and
            the moments people understand before they can explain them.
          </p>
          <p>
            Away from the microphone, he is writing <em>Whispered Truths</em>, a
            coming-of-age romance about two boys from rival Midwestern towns. He also
            coaches student performers, makes photographs, and stays active in local
            music and the performing arts. Each pursuit feeds the others: listening,
            empathy, performance, and the courage to tell the truth all matter.
          </p>
          <Link className="text-link" href="/books">Explore the writing <span>→</span></Link>
        </div>
      </section>

      <section className="bio-facts page-shell" aria-label="Artist details">
        <div><span>Based in</span><strong>Mid-Michigan</strong></div>
        <div><span>Music</span><strong>Modern country</strong></div>
        <div><span>Writing</span><strong>Young adult fiction</strong></div>
        <div><span>Community</span><strong>Performing arts</strong></div>
      </section>

      <section className="photo-story page-shell">
        <div className="photo-story-copy">
          <p className="micro-label">Behind the lens</p>
          <h2>Photography is another way of paying attention.</h2>
          <p>Taylon&apos;s portrait work is rooted in the same instinct as the songs and fiction: notice the person, find the honest moment, and let it carry the frame.</p>
          <Link className="text-link" href="/photography">View the portfolio <span>→</span></Link>
        </div>
        <div className="photo-grid" aria-label="Selected photography by Taylon">
          <img src="/portfolio-01.jpg" alt="Outdoor portrait photographed by Taylon" />
          <img src="/portfolio-04.jpg" alt="Holiday portrait photographed by Taylon" />
          <img src="/portfolio-05.jpg" alt="Family portrait photographed by Taylon" />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
