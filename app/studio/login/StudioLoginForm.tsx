"use client";

import { FormEvent, useState } from "react";

export function StudioLoginForm() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/studio/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    const result = (await response.json()) as { error?: string };
    if (!response.ok) {
      setMessage(result.error ?? "Sign in failed.");
      setBusy(false);
      return;
    }

    window.location.assign("/studio/journal");
  }

  return (
    <form className="studio-login-form" onSubmit={submit}>
      <label>
        <span>Email</span>
        <input
          autoComplete="username"
          name="email"
          required
          type="email"
        />
      </label>
      <label>
        <span>Password</span>
        <input
          autoComplete="current-password"
          minLength={12}
          name="password"
          required
          type="password"
        />
      </label>
      <button disabled={busy} type="submit">
        {busy ? "Signing in…" : "Sign in"}
      </button>
      <p aria-live="polite">{message}</p>
    </form>
  );
}
