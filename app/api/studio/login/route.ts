import { NextResponse } from "next/server";
import {
  setStudioSession,
  verifyStudioCredentials,
} from "../../../studio-auth";

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function clientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const attempt = attempts.get(key);
  if (!attempt || attempt.resetAt <= now) {
    attempts.set(key, { count: 0, resetAt: now + WINDOW_MS });
    return false;
  }
  return attempt.count >= MAX_ATTEMPTS;
}

function recordFailure(key: string) {
  const attempt = attempts.get(key);
  if (attempt) attempt.count += 1;
}

export async function POST(request: Request) {
  const key = clientKey(request);
  if (isRateLimited(key)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in 15 minutes." },
      { status: 429 },
    );
  }

  try {
    const value = (await request.json()) as {
      email?: unknown;
      password?: unknown;
    };
    const email = typeof value.email === "string" ? value.email : "";
    const password = typeof value.password === "string" ? value.password : "";

    if (!verifyStudioCredentials(email, password)) {
      recordFailure(key);
      return NextResponse.json(
        { error: "Email or password is incorrect." },
        { status: 401 },
      );
    }

    attempts.delete(key);
    await setStudioSession(email.trim().toLowerCase());
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Sign in is temporarily unavailable." },
      { status: 500 },
    );
  }
}
