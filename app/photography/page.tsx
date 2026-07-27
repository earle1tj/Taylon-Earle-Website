import type { Metadata } from "next";
import Link from "next/link";
import { InnerPageHero } from "../components/InnerPageHero";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = { title: "Photography", description: "Selected portrait photography by Mid-Michigan artist Taylon James." };
const photos = [["/portfolio-01.jpg", "Outdoor portrait among summer greenery"], ["/portfolio-04.jpg", "Winter portrait of a couple"], ["/portfolio-05.jpg", "Holiday family portrait"], ["/portfolio-06.jpg", "Large family holiday portrait"]];

export default function PhotographyPage() {
  return <main id="main-content" className="inner-page">
    <SiteHeader active="bio" />
    <InnerPageHero number="04" eyebrow="Photography" title="Stories held still." intro="A selected portfolio of portrait work focused on personality, connection, and the small details that make an image feel lived-in." />
    <section className="portfolio-gallery page-shell" aria-label="Photography portfolio">
      {photos.map(([src, alt], index) => <figure className={index === 0 ? "portfolio-wide" : ""} key={src}><img src={src} alt={alt} /><figcaption>Portrait study <span>0{index + 1}</span></figcaption></figure>)}
    </section>
    <section className="portfolio-cta page-shell"><p className="micro-label">Photography inquiries</p><h2>Looking for more of the portfolio?</h2><p>This is a selected collection. Additional corporate and private work can be shared when releases permit.</p><Link className="text-link" href="/contact">Start a conversation <span>→</span></Link></section>
    <SiteFooter />
  </main>;
}
