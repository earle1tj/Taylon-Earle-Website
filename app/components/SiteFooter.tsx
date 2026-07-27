import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div>
          <Link className="wordmark" href="/">Taylon James</Link>
          <p>Country songs and heartfelt stories from Mid-Michigan.</p>
        </div>
        <div className="footer-nav">
          <Link href="/releases">Releases</Link>
          <Link href="/covers">Covers</Link>
          <Link href="/books">Books</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/bio">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-note">
          <span>Follow Taylon</span>
          <div className="footer-socials"><a href="https://open.spotify.com/artist/7zK9hcVbswawtVXa3lqEO9" target="_blank" rel="noreferrer">Spotify ↗</a><a href="https://music.apple.com/us/artist/taylon-james/6786917415" target="_blank" rel="noreferrer">Apple Music ↗</a><a href="https://www.instagram.com/TaylonJamesHE/" target="_blank" rel="noreferrer">Instagram ↗</a></div>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <p>© 2026 Taylon James. All rights reserved.</p>
        <p>Michigan, USA</p>
      </div>
    </footer>
  );
}
