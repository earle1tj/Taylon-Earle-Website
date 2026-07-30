import { NextResponse } from "next/server";
import { getChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { journalPosts } from "../../../db/schema";
import { cleanInput } from "../../journal/journalStore";

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  try {
    const input = cleanInput(await request.json()); const now = new Date().toISOString();
    const post = await getDb().insert(journalPosts).values({ ...input, ownerEmail: user.email, createdAt: now, updatedAt: now }).returning().get();
    return NextResponse.json({ post });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "The entry could not be saved." }, { status: 400 }); }
}
