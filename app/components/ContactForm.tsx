"use client";

import { useEffect, useRef } from "react";

export function ContactForm({ status }: { status?: string }) {
  const startedAtRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startedAtRef.current) {
      startedAtRef.current.value = String(Date.now());
    }
  }, []);

  return (
    <div className="contact-form-wrap">
      {status === "success" && <p className="form-alert success" role="status">Thanks—your message has been sent.</p>}
      {status === "error" && <p className="form-alert error" role="alert">That message could not be sent. Please try again or email directly.</p>}
      <form className="contact-form" action="/contact.php" method="post">
        <div className="form-row">
          <label><span>Name</span><input name="name" type="text" autoComplete="name" required maxLength={100} /></label>
          <label><span>Email</span><input name="email" type="email" autoComplete="email" required maxLength={160} /></label>
        </div>
        <label><span>Subject</span><select name="subject" defaultValue="General inquiry"><option>General inquiry</option><option>Music collaboration</option><option>Booking or performance</option><option>Press or media</option><option>Writing or photography</option></select></label>
        <label><span>Message</span><textarea name="message" rows={7} required maxLength={5000} /></label>
        <div className="form-honeypot" aria-hidden="true">
          <label>Company website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
          <label>Fax number<input name="fax_number" type="text" tabIndex={-1} autoComplete="off" /></label>
        </div>
        <input ref={startedAtRef} name="form_started_at" type="hidden" defaultValue="" />
        <button className="button button-primary" type="submit">Send message <span aria-hidden="true">→</span></button>
        <p className="form-note">Protected from automated spam. Your information is used only to reply to your message.</p>
      </form>
    </div>
  );
}
