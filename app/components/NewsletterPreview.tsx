"use client";

import { FormEvent, useState } from "react";

export function NewsletterPreview() {
  const [joined, setJoined] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setJoined(true);
  }

  return (
    <form className="newsletter-form" onSubmit={submit}>
      {joined ? (
        <p className="newsletter-success"><span>✦</span> This is how your welcome message will appear. No email was saved yet.</p>
      ) : (
        <>
          <label>
            <span className="sr-only">Email address</span>
            <input type="email" placeholder="Your email address" required />
          </label>
          <button type="submit">Join the circle <span aria-hidden="true">→</span></button>
          <p>Design preview only—this form is not collecting addresses yet.</p>
        </>
      )}
    </form>
  );
}
