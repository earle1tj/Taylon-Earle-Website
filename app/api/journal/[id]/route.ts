import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { getDb } from "../../../../db";
import { journalPosts } from "../../../../db/schema";
import { cleanInput } from "../../../journal/journalStore";

async function identity(params: Promise<{ id: string }>) { const { id } = await params; return Number(id); }
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getChatGPTUser(); if (!user) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  try { const id = await identity(params); const input = cleanInput(await request.json()); const post = await getDb().update(journalPosts).set({ ...input, updatedAt: new Date().toISOString() }).where(and(eq(journalPosts.id, id), eq(journalPosts.ownerEmail, user.email))).returning().get(); if (!post) return NextResponse.json({ error: "Entry not found." }, { status: 404 }); return NextResponse.json({ post }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "The entry could not be saved." }, { status: 400 }); }
}
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getChatGPTUser(); if (!user) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  const id = await identity(params); const deleted = await getDb().delete(journalPosts).where(and(eq(journalPosts.id, id), eq(journalPosts.ownerEmail, user.email))).returning({ id: journalPosts.id }).get();
  if (!deleted) return NextResponse.json({ error: "Entry not found." }, { status: 404 }); return NextResponse.json({ deleted });
}
