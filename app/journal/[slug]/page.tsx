import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { journalPosts } from "../journalData";

export default async function JournalPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = journalPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  return (
    <main className="inner-page" id="main-content">
      <SiteHeader active="journal" />
      <article className="journal-entry page-shell">
        <Link href="/journal">← Back to journal</Link>
        <p className="micro-label">{post.category} · {post.date} · {post.read}</p>
        <h1>{post.title}</h1>
        <p className="journal-deck">{post.excerpt}</p>
        <div className="journal-entry-art" aria-hidden="true"><i /><i /><i /><span>✦</span></div>
        <div className="journal-prose">{post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <footer><span>Written by</span><strong>Taylon James</strong></footer>
      </article>
      <SiteFooter />
    </main>
  );
}
