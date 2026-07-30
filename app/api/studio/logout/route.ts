import { NextResponse } from "next/server";
import { clearStudioSession } from "../../../studio-auth";

export async function POST(request: Request) {
  await clearStudioSession();
  return NextResponse.redirect(new URL("/", request.url), 303);
}
