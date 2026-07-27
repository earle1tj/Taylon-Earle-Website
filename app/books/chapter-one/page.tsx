import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

export const metadata: Metadata = { title: "Whispered Truths — Chapter One", description: "Read a preview of Chapter One from Whispered Truths by Taylon Honeman-Earle." };

export default function ChapterOnePage() {
  return <main id="main-content" className="inner-page chapter-page">
    <SiteHeader active="books" />
    <header className="chapter-heading page-shell"><Link href="/books">← Back to books</Link><p className="micro-label">Whispered Truths · Preview</p><h1>Chapter One</h1><p>Tyler&apos;s Story</p></header>
    <article className="chapter-body page-shell">
      <p className="chapter-drop">Fall is here, with leaves drifting downward in a symphony of colors—it&apos;s the Midwest at its most picture-perfect. Tyler is heading into his third bowling season, his junior year, and there is a lot to think about.</p>
      <p>Where is he going to apply to college? What more can he do to strengthen an application already crowded with music, drama, and the familiar faces of his wonderfully nerdy circle? Could bowling finally help him fit in with the jocks? It is hard to know what this year will bring. Tyler only knows that something big feels close.</p>
      <p>More than anything, he is looking for love.</p>
      <p>The closest thing Tyler has had to a relationship was a fleeting moment with a girl during freshman year, just before he was pulled abruptly from the closet. Coming out was not easy, but he does not regret it. Even in a small town, amid the microaggressions and passing homophobia, life is not always terrible. Still, love feels impossibly far away.</p>
      <p>On the first day of tryouts, Tyler rolls his bowling bag into the old local alley wearing a retro-inspired outfit and trying to contain his excitement. The machines date back to the nineties. The scoring system feels ancient next to the polished alleys in larger cities. Somehow, the place survives because every surrounding town still loves it.</p>
      <p>Then Tyler notices another school practicing nearby—and one boy in particular.</p>
      <p>Tall. Blond. Glasses. Everything Tyler loves. The feeling in his chest arrives before he can name it: nerves, attraction, or the ridiculous hope of love at first sight. The boy is from the rival school and is talking to Tyler&apos;s teammate Brendon. Tyler tells himself he will learn the stranger&apos;s name later, though experience says he will probably also learn that the boy is straight.</p>
      <blockquote>“Who was that you were just talking to?” Tyler asks, aiming for casual and missing by a mile.</blockquote>
      <p>Brendon glances toward the neighboring lanes. “That boy? His name is Hunter. And I know what you&apos;re thinking, Tyler. He&apos;s straight. Trust me.”</p>
      <p>Hunter. Even the name lands perfectly.</p><p>Tyler insists he only wants to make friends. Neither of them believes him.</p>
      <div className="chapter-end"><span>End of preview</span><p><em>Whispered Truths</em> is currently in progress.</p><Link className="button button-primary" href="/books">Return to the book <span>→</span></Link></div>
    </article><SiteFooter />
  </main>;
}
