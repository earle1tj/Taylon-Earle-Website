import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { journalPosts as journalTable } from "../../../db/schema";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { journalPosts as seedPosts } from "../journalData";

export const dynamic = "force-dynamic";
export default async function JournalPost({params}:{params:Promise<{slug:string}>}) { const {slug}=await params; let post:{category:string;publishedAt:string;title:string;excerpt:string;body:string}|null=null; try { const saved=await getDb().select().from(journalTable).where(eq(journalTable.slug,slug)).get(); if(saved?.status==="published")post=saved; } catch { const seed=seedPosts.find(item=>item.slug===slug); if(seed)post={...seed,publishedAt:seed.date,body:seed.body.join("\n\n")}; } if(!post)notFound(); const date=/^\d{4}-\d{2}-\d{2}$/.test(post.publishedAt)?new Date(`${post.publishedAt}T12:00:00`).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}):post.publishedAt; const paragraphs=post.body.split(/\n\s*\n/).filter(Boolean); const read=`${Math.max(1,Math.ceil(post.body.trim().split(/\s+/).length/220))} min read`; return <main className="inner-page" id="main-content"><SiteHeader active="journal"/><article className="journal-entry page-shell"><Link href="/journal">← Back to journal</Link><p className="micro-label">{post.category} · {date} · {read}</p><h1>{post.title}</h1><p className="journal-deck">{post.excerpt}</p><div className="journal-entry-art" aria-hidden="true"><i/><i/><i/><span>✦</span></div><div className="journal-prose">{paragraphs.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div><footer><span>Written by</span><strong>Taylon James</strong></footer></article><SiteFooter/></main> }
