import Link from "next/link";
import { InnerPageHero } from "../components/InnerPageHero";
import { NewsletterPreview } from "../components/NewsletterPreview";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { journalPosts } from "./journalData";

export default function JournalPage() {
  return (
    <main className="inner-page" id="main-content">
      <SiteHeader active="journal" />
      <InnerPageHero number="05" eyebrow="Behind the work" title="Notes from the in-between." intro="Songwriting, book drafts, influences, and the small moments that become stories." />
      <section className="journal-grid page-shell">
        {journalPosts.map((post, index) => (
          <Link className={`journal-card ${index === 0 ? "featured" : ""}`} href={`/journal/${post.slug}`} key={post.slug}>
            <div className="journal-art" aria-hidden="true">
              <img className="journal-day-clouds clouds-back" src="/day-clouds-wispy.png" alt="" />
              <img className="journal-day-clouds clouds-mid" src="/day-clouds-scattered.png" alt="" />
              <img className="journal-day-clouds clouds-mid-alt" src="/day-clouds-scattered.png" alt="" />
              <img className="journal-day-clouds clouds-front" src="/day-clouds.png" alt="" />
              <span>{String(index + 1).padStart(2, "0")}</span><i /><i /><i />
            </div>
            <div className="journal-card-copy">
              <p className="micro-label">{post.category} · {post.date}</p>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span className="journal-read">Read entry <i>→</i></span>
            </div>
          </Link>
        ))}
      </section>
      <section className="newsletter page-shell">
        <div><p className="micro-label">Join the inner circle</p><h2>Letters for the ones who listen closely.</h2></div>
        <div><p>Occasional notes about new music, the book, and what’s happening behind the scenes. Thoughtful, personal, and never noisy.</p><NewsletterPreview /></div>
      </section>
      <SiteFooter />
    </main>
  );
}
