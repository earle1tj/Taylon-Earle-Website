"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionEffects() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("motion-ready");
    const items = Array.from(document.querySelectorAll<HTMLElement>("main > section:not(.hero-shell), .inner-hero, .book-cover, .bio-portrait, .photo-grid img, .cover-row"));
    items.forEach((item, index) => { item.classList.add("scroll-reveal"); item.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 70}ms`); });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("in-view"); observer.unobserve(entry.target); } }), { threshold: .12, rootMargin: "0px 0px -6%" });
    items.forEach((item) => observer.observe(item));
    const hero = document.querySelector<HTMLElement>(".hero-portrait");
    const onPointer = (event: PointerEvent) => { if (!hero || window.innerWidth < 900) return; hero.style.setProperty("--portrait-x", `${(event.clientX / window.innerWidth - .5) * 10}px`); hero.style.setProperty("--portrait-y", `${(event.clientY / window.innerHeight - .5) * 8}px`); };
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("pointermove", onPointer); document.documentElement.classList.remove("motion-ready"); };
  }, [pathname]);
  return null;
}
