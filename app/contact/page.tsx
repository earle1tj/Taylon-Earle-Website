import type { Metadata } from "next";
import { InnerPageHero } from "../components/InnerPageHero";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { ContactForm } from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact and inquiry information for country artist Taylon James.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  return (
    <main id="main-content" className="inner-page">
      <SiteHeader active="contact" />
      <InnerPageHero
        number="04"
        eyebrow="Contact"
        title="Let’s make something worth replaying."
        intro="For collaboration, performance, press, writing, photography, or general inquiries, send a note directly or connect through Taylon’s official profiles."
      />

      <section className="contact-grid page-shell">
        <div className="contact-lead">
          <p className="micro-label">Get in touch</p>
          <h2>Start the conversation.</h2>
          <p>Use the form and your message will be delivered to Taylon&apos;s official inbox. For a quick follow, the official music and social profiles are ready too.</p>
          <div className="contact-socials"><a href="https://open.spotify.com/artist/7zK9hcVbswawtVXa3lqEO9" target="_blank" rel="noreferrer">Spotify ↗</a><a href="https://music.apple.com/us/artist/taylon-james/6786917415" target="_blank" rel="noreferrer">Apple Music ↗</a><a href="https://www.instagram.com/TaylonJamesHE/" target="_blank" rel="noreferrer">Instagram ↗</a></div>
        </div>
        <ContactForm status={status} />
      </section>

      <section className="contact-note page-shell">
        <span aria-hidden="true">✦</span>
        <p>Prefer email? Write directly to <a href="mailto:info@taylonearle.com">info@taylonearle.com</a>.</p>
      </section>
      <SiteFooter />
    </main>
  );
}
