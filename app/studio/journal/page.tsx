import type { Metadata } from "next";
import { chatGPTSignOutPath, requireChatGPTUser } from "../../chatgpt-auth";
import { listOwnerPosts } from "../../journal/journalStore";
import { JournalStudio } from "./JournalStudio";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Journal Studio", robots: { index: false, follow: false } };
export default async function JournalStudioPage() { const user=await requireChatGPTUser("/studio/journal"); const posts=await listOwnerPosts(user.email); return <JournalStudio initialPosts={posts} displayName={user.displayName} signOutPath={chatGPTSignOutPath("/")} />; }
