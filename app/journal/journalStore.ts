import { and, desc, eq } from "drizzle-orm";
import { getDb } from "../../db";
import { journalPosts } from "../../db/schema";

export type StudioPost = Omit<typeof journalPosts.$inferSelect, "ownerEmail" | "createdAt" | "updatedAt">;
export type StudioInput = Omit<StudioPost, "id">;

export async function listOwnerPosts(email: string) {
  return getDb().select({ id: journalPosts.id, title: journalPosts.title, slug: journalPosts.slug, category: journalPosts.category, publishedAt: journalPosts.publishedAt, excerpt: journalPosts.excerpt, body: journalPosts.body, status: journalPosts.status }).from(journalPosts).where(eq(journalPosts.ownerEmail, email)).orderBy(desc(journalPosts.updatedAt));
}

export async function listPublishedPosts() {
  return getDb().select({ id: journalPosts.id, title: journalPosts.title, slug: journalPosts.slug, category: journalPosts.category, publishedAt: journalPosts.publishedAt, excerpt: journalPosts.excerpt, body: journalPosts.body, status: journalPosts.status }).from(journalPosts).where(eq(journalPosts.status, "published")).orderBy(desc(journalPosts.publishedAt));
}

export async function findOwnerPost(id: number, email: string) {
  return getDb().select().from(journalPosts).where(and(eq(journalPosts.id, id), eq(journalPosts.ownerEmail, email))).get();
}

export function cleanInput(value: unknown): StudioInput {
  const item = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
  const status = item.status === "published" ? "published" : "draft";
  const text = (key: string) => typeof item[key] === "string" ? item[key].trim() : "";
  const title = text("title"); const slug = text("slug").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (!title || !slug || !text("category") || !text("publishedAt") || !text("excerpt") || !text("body")) throw new Error("Complete every field before saving.");
  return { title, slug, category: text("category"), publishedAt: text("publishedAt"), excerpt: text("excerpt"), body: text("body"), status };
}
