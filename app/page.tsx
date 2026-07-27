import Link from "next/link";
import type { CSSProperties } from "react";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { Starfield } from "./components/Starfield";
import { NewsletterPreview } from "./components/NewsletterPreview";
import { LoadingConstellation } from "./components/LoadingConstellation";
import { StreamingPlatforms } from "./components/StreamingPlatforms";

export default function Home() {
  return (
    <main id="main-content">
      <LoadingConstellation />
      <section className="hero-shell">
        <div className="hero-road" aria-hidden="true" />
        <div className="hero-aurora" aria-hidden="true" />
        <Starfield />
        <div className="hero-portrait" role="img" aria-label="Portrait of Taylon James" />
        <div className="hero-vignette" aria-hidden="true" />
        <SiteHeader active="home" />

        <div className="hero-content page-shell">
          <div className="hero-copy">
            <p className="eyebrow reveal reveal-one">
              Country music <span>•</span> Midwest stories <span>•</span> One creative life
            </p>
            <h1 className="reveal reveal-two">
              Songs built for <em>backroads</em> and broken hearts.
            </h1>
            <div className="headline-rule" aria-hidden="true" />
            <p className="hero-intro reveal reveal-three">
              Taylon James is a Mid-Michigan artist and writer pairing honest
              country music with heartfelt stories about identity, connection,
              and finding where you belong.
            </p>
            <div className="hero-actions reveal reveal-four">
              <Link className="button button-primary" href="/covers">
                Hear the covers
                <span aria-hidden="true">↗</span>
              </Link>
              <Link className="button button-secondary" href="/bio">
                Meet Taylon
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <Link className="coming-soon reveal reveal-five" href="/releases">
              <span className="coming-icon" aria-hidden="true">✦</span>
              <span className="coming-divider" aria-hidden="true" />
              <span>
                <strong>Coming soon</strong>
                <small>Original music is on the way.</small>
              </span>
              <span className="coming-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <a className="scroll-cue" href="#start-here">
          <span>Explore</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <section className="home-intro page-shell" id="start-here">
        <div className="section-kicker">
          <span>01</span>
          <p>Start here</p>
        </div>
        <div className="home-intro-copy">
          <h2>Stories you can hear—and stories you can read.</h2>
          <p>
            From familiar songs reimagined in a baritone voice to an LGBTQ+
            coming-of-age novel set in the Midwest, every project begins with
            a character, a feeling, and something honest to say.
          </p>
        </div>
        <div className="home-links">
          <Link href="/covers">
            <span>Watch & listen</span>
            <strong>Cover songs</strong>
            <i aria-hidden="true">↗</i>
          </Link>
          <Link href="/releases">
            <span>What’s next</span>
            <strong>Original releases</strong>
            <i aria-hidden="true">→</i>
          </Link>
          <Link href="/books">
            <span>On the page</span>
            <strong>Books & writing</strong>
            <i aria-hidden="true">→</i>
          </Link>
        </div>
      </section>

      <section className="creative-split page-shell">
        <div className="section-kicker"><span>02</span><p>Beyond the songs</p></div>
        <div className="creative-feature">
          <p className="micro-label">Featured writing project</p>
          <h2>Whispered Truths</h2>
          <p>A heartfelt YA romance about Tyler and Hunter—two boys from rival towns navigating secrets, self-discovery, and first love.</p>
          <Link className="text-link" href="/books">Discover the story <span>→</span></Link>
        </div>
        <div className="creative-note">
          <span>Also part of the picture</span>
          <p>Forensics coaching, community music, photography, and arts advocacy all shape the way Taylon tells stories.</p>
          <Link href="/bio">Read the full story →</Link>
        </div>
      </section>

      <section className="listening-room page-shell">
        <div className="section-kicker"><span>03</span><p>Now playing</p></div>
        <div className="spotify-visual" aria-hidden="true">
          <div className="record"><div className="record-label"><span>TJ</span></div></div>
          <div className="waveform">{Array.from({ length: 28 }).map((_, index) => <i key={index} style={{ "--bar": `${12 + ((index * 17) % 48)}px`, "--delay": `${index * -70}ms` } as CSSProperties} />)}</div>
        </div>
        <div className="listening-copy">
          <p className="micro-label">The Taylon James listening room</p>
          <h2>Stay for a song.</h2>
          <p>Listen without leaving the story. This player follows Taylon’s Spotify profile and will reflect new music as it is released.</p>
          <iframe className="spotify-embed" src="https://open.spotify.com/embed/artist/7zK9hcVbswawtVXa3lqEO9?utm_source=generator&theme=0" title="Taylon James on Spotify" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
          <StreamingPlatforms />
        </div>
      </section>

      <section className="home-journal page-shell">
        <div><p className="micro-label">From the journal</p><h2>The story behind the story.</h2></div>
        <div className="home-journal-feature"><span>Songwriting · 4 min read</span><h3>Where a song begins</h3><p>Sometimes it starts with a melody. More often, it starts with the sentence someone almost said.</p><Link className="text-link" href="/journal/where-a-song-begins">Read the first entry <span>→</span></Link></div>
        <Link className="journal-orbit" href="/journal" aria-label="Explore the journal"><span>Explore<br />the journal</span><i>↗</i></Link>
      </section>

      <section className="newsletter page-shell home-newsletter">
        <div><p className="micro-label">Join the inner circle</p><h2>Music, stories, and notes from the road.</h2></div>
        <div><p>Be first to hear about releases, book progress, journal entries, and the occasional behind-the-scenes moment.</p><NewsletterPreview /></div>
      </section>

      <SiteFooter />
    </main>
  );
}
