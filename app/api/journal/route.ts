import { NextResponse } from "next/server";
import { getStudioUser } from "../../studio-auth";
import { cleanInput, createPost } from "../../journal/journalStore";

export async function POST(request:Request) { const user=await getStudioUser(); if(!user)return NextResponse.json({error:"Sign in is required."},{status:401}); try { const post=await createPost(user.email,cleanInput(await request.json())); if(!post)throw new Error("The entry could not be saved."); return NextResponse.json({post}); } catch(error) { const message=error instanceof Error?error.message:"The entry could not be saved."; const duplicate=message.includes("Duplicate entry"); return NextResponse.json({error:duplicate?"That journal URL is already in use.":message},{status:duplicate?409:400}); } }