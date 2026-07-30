import {
  createHmac,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "taylon_studio_session";
const SESSION_SECONDS = 60 * 60 * 12;

export type StudioUser = {
  displayName: string;
  email: string;
};

type SessionPayload = {
  email: string;
  exp: number;
};

function required(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function signature(encodedPayload: string) {
  return createHmac("sha256", required("SESSION_SECRET"))
    .update(encodedPayload)
    .digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function createToken(email: string) {
  const payload: SessionPayload = {
    email,
    exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );
  return `${encodedPayload}.${signature(encodedPayload)}`;
}

function readToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const [encodedPayload, suppliedSignature, extra] = token.split(".");
  if (!encodedPayload || !suppliedSignature || extra) return null;
  if (!safeEqual(signature(encodedPayload), suppliedSignature)) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    ) as SessionPayload;
    if (
      typeof payload.email !== "string" ||
      typeof payload.exp !== "number" ||
      payload.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function getStudioUser(): Promise<StudioUser | null> {
  const cookieStore = await cookies();
  const payload = readToken(cookieStore.get(COOKIE_NAME)?.value);
  const adminEmail = process.env.JOURNAL_ADMIN_EMAIL?.trim().toLowerCase();
  if (!payload || !adminEmail || payload.email !== adminEmail) return null;

  return {
    email: adminEmail,
    displayName: adminEmail.split("@")[0],
  };
}

export async function requireStudioUser(): Promise<StudioUser> {
  const user = await getStudioUser();
  if (!user) redirect("/studio/login");
  return user;
}

export async function setStudioSession(email: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createToken(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
}

export async function clearStudioSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function verifyStudioCredentials(email: string, password: string) {
  const expectedEmail = required("JOURNAL_ADMIN_EMAIL").toLowerCase();
  const encodedHash = required("JOURNAL_ADMIN_PASSWORD_HASH");
  if (email.trim().toLowerCase() !== expectedEmail) return false;

  const [algorithm, salt, expectedKey, extra] = encodedHash.split("$");
  if (algorithm !== "scrypt" || !salt || !expectedKey || extra) return false;

  const actual = scryptSync(password, salt, 64).toString("base64url");
  return safeEqual(actual, expectedKey);
}
