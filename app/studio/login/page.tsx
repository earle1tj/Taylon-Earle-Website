import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getStudioUser } from "../../studio-auth";
import { StudioLoginForm } from "./StudioLoginForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Journal Studio Login",
  robots: { index: false, follow: false },
};

export default async function StudioLoginPage() {
  if (await getStudioUser()) redirect("/studio/journal");

  return (
    <main className="studio-login-page">
      <section className="studio-login-panel">
        <Link className="wordmark" href="/">Taylon James</Link>
        <p className="micro-label">Journal Studio</p>
        <h1>Welcome back.</h1>
        <p className="studio-login-intro">
          Sign in to write, edit, and publish journal entries.
        </p>
        <StudioLoginForm />
        <Link className="studio-login-return" href="/">← Return to the website</Link>
      </section>
    </main>
  );
}
