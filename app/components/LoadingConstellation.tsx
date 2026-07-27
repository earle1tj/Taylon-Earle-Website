"use client";

import { useEffect, useState } from "react";

export function LoadingConstellation() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;
  return (
    <div className="constellation-loader" aria-label="Opening Taylon James">
      <svg className="constellation-mark" viewBox="0 0 280 180" aria-hidden="true">
        <defs>
          <linearGradient id="loader-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--orange-bright)" />
            <stop offset=".52" stopColor="var(--cream)" />
            <stop offset="1" stopColor="var(--blue)" />
          </linearGradient>
        </defs>
        <g className="loader-staff">
          <path d="M28 65 C78 46 119 73 164 59 S231 44 255 58" />
          <path d="M24 78 C76 59 120 86 166 72 S232 57 258 71" />
          <path d="M22 91 C77 72 120 99 168 85 S234 70 260 84" />
          <path d="M24 104 C79 85 121 112 169 98 S232 83 258 97" />
          <path d="M28 117 C80 98 123 125 169 111 S230 96 254 110" />
        </g>
        <g className="loader-notes">
          <path className="note-stem note-one" d="M91 98 L91 49 L133 41 L133 84" />
          <ellipse className="note-head note-head-one" cx="80" cy="101" rx="13" ry="9" transform="rotate(-16 80 101)" />
          <ellipse className="note-head note-head-two" cx="122" cy="87" rx="13" ry="9" transform="rotate(-16 122 87)" />
          <path className="note-stem note-two" d="M180 101 L180 55 L216 66 L216 113" />
          <ellipse className="note-head note-head-three" cx="169" cy="104" rx="13" ry="9" transform="rotate(-16 169 104)" />
          <ellipse className="note-head note-head-four" cx="205" cy="116" rx="13" ry="9" transform="rotate(-16 205 116)" />
        </g>
        <path className="loader-melody" d="M39 132 C72 150 105 142 132 128 S187 123 239 139" />
        <g className="loader-stars">
          <circle cx="31" cy="58" r="3.5" /><circle cx="59" cy="115" r="3" />
          <circle cx="91" cy="49" r="3.5" /><circle cx="133" cy="41" r="3" />
          <circle cx="180" cy="55" r="3.5" /><circle cx="216" cy="66" r="3" />
          <circle cx="249" cy="104" r="3.5" />
        </g>
        <g className="loader-spark loader-spark-one" transform="translate(49 45)"><path d="M0 -9 V9 M-9 0 H9" /></g>
        <g className="loader-spark loader-spark-two" transform="translate(238 129)"><path d="M0 -7 V7 M-7 0 H7" /></g>
      </svg>
      <strong>Taylon James</strong>
      <small>Music · stories · one creative life</small>
    </div>
  );
}
