import Link from "next/link";
import { InnerPageHero } from "../components/InnerPageHero";
import { NewsletterPreview } from "../components/NewsletterPreview";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { journalPosts as seedPosts } from "./journalData";
import { listPublishedPosts } from "./journalStore";

export const dynamic = "force-dynamic";
const friendlyDate=(value:string)=>/^\d{4}-\d{2}-\d{2}$/.test(value)?new Date(`${value}T12:00:00`).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}):value;
export default async function JournalPage() {
  let posts: Array<{slug:string;category:string;publishedAt:string;title:string;excerpt:string}>;
  try { const saved=await listPublishedPosts(); posts=saved.map(post=>({...post,publishedAt:post.publishedAt})); }
  catch { posts=seedPosts.map(post=>({...post,publishedAt:post.date})); }
  return <main className="inner-page" id="main-content"><SiteHeader active="journal"/><InnerPageHero number="05" eyebrow="Behind the work" title="Notes from the in-between." intro="Songwriting, book drafts, influences, and the small moments that become stories."/><div className="journal-studio-entry page-shell"><Link href="/studio/journal">Open journal studio <span>→</span></Link></div><section className="journal-grid page-shell">{posts.map((post,index)=><Link className={`journal-card ${index===0?"featured":""}`} href={`/journal/${post.slug}`} key={post.slug}><div className="journal-art" aria-hidden="true"><span>{String(index+1).padStart(2,"0")}</span><i/><i/><i/></div><div className="journal-card-copy"><p className="micro-label">{post.category} · {friendlyDate(post.publishedAt)}</p><h2>{post.title}</h2><p>{post.excerpt}</p><span className="journal-read">Read entry <i>→</i></span></div></Link>)}</section><section className="newsletter page-shell"><div><p className="micro-label">Join the inner circle</p><h2>Letters for the ones who listen closely.</h2></div><div><p>Occasional notes about new music, the book, and what’s happening behind the scenes. Thoughtful, personal, and never noisy.</p><NewsletterPreview/></div></section><SiteFooter/></main>;
}
