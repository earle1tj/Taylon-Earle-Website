import type { Metadata } from "next";
import "./globals.css";
import { MotionEffects } from "./components/MotionEffects";
import { TimeOfDayTheme } from "./components/TimeOfDayTheme";

export const metadata: Metadata = {
  title: {
    default: "Taylon James | Music & Stories",
    template: "%s | Taylon James",
  },
  description:
    "The creative home of Mid-Michigan artist Taylon James—country music, cover songs, original releases, books, photography, and more.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="night" suppressHydrationWarning>
      <body><TimeOfDayTheme /><MotionEffects />{children}</body>
    </html>
  );
}
