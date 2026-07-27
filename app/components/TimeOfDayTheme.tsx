"use client";

import { useEffect } from "react";

const DAY_START = 7;
const NIGHT_START = 19;

export function TimeOfDayTheme() {
  useEffect(() => {
    const applyTheme = () => {
      const hour = new Date().getHours();
      document.documentElement.dataset.theme =
        hour >= DAY_START && hour < NIGHT_START ? "day" : "night";
    };

    applyTheme();
    const timer = window.setInterval(applyTheme, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return null;
}
