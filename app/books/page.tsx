import type { Metadata } from "next";
import Link from "next/link";
import { InnerPageHero } from "../components/InnerPageHero";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Books & Writing",
  description: "Explore Whispered Truths, Taylon James's heartfelt Midwestern LGBTQ+ young adult romance.",
};

export default function BooksPage() {
  return (
    <main id="main-content" className="inner-page">
      <SiteHeader active="books" />
      <InnerPageHero
        number="03"
        eyebrow="Books & writing"
        title="Some stories need more than three minutes."
        intro="Taylon's fiction carries the same emotional honesty as his music—small-town lives, complicated hearts, and the courage it takes to be known."
      />

      <section className="book-feature page-shell">
        <div className="book-cover" aria-label="Whispered Truths book cover concept">
          <img className="static-falling-leaves" src="/static-falling-leaves.png" alt="" aria-hidden="true" />
          <span>A novel by Taylon Honeman-Earle</span>
          <strong className="book-cover-title" aria-label="Whispered Truths">
            <span className="book-title-line">Whispered</span>
            <span className="book-title-line">Truths</span>
          </strong>
          <small>A young adult romance</small>
        </div>
        <div className="book-copy">
          <p className="micro-label">Featured work · In progress</p>
          <h2>Whispered Truths</h2>
          <p className="book-lede">Two rival towns. Two teenage boys. One truth neither of them is ready to say out loud.</p>
          <p>
            Tyler and Hunter meet across the lanes of a worn-in Midwestern bowling
            alley. What begins as a glance grows into a tender story of first love,
            identity, secrets, and what happens when the future refuses to follow the
            version you imagined.
          </p>
          <div className="book-themes" aria-label="Book themes">
            <span>First love</span><span>Small-town life</span><span>Self-discovery</span><span>Chosen family</span>
          </div>
          <Link className="button button-primary" href="/books/chapter-one">Read chapter one <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="writing-note page-shell">
        <p className="micro-label">Why it belongs here</p>
        <h2>The thread connecting every project is story.</h2>
        <p>Whether it becomes a song, a novel, a photograph, or a performance, Taylon&apos;s work is interested in the moment someone finally feels seen.</p>
        <Link className="text-link" href="/contact">Talk about the work <span>→</span></Link>
      </section>
      <SiteFooter />
    </main>
  );
}
