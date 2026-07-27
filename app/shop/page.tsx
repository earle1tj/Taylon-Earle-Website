import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { ShopMockup } from "./ShopMockup";

export const metadata: Metadata = { title: "Shop Preview", description: "A preview of the future Taylon James merchandise shop." };

export default function ShopPage() {
  return (
    <main id="main-content" className="inner-page shop-page">
      <SiteHeader active="shop" />
      <section className="inner-hero page-shell shop-hero">
        <div className="inner-glow" aria-hidden="true" />
        <span className="inner-number">06 / 08</span>
        <div className="inner-title"><p className="eyebrow">Wear the story</p><h1>The merch table, <em>reimagined.</em></h1></div>
        <p className="inner-intro">A first look at how future Taylon James tees, hats, and limited-edition pieces could live right alongside the music.</p>
      </section>
      <div className="shop-preview-banner"><span>Concept shop</span><p>Nothing here is actually for sale—yet.</p></div>
      <ShopMockup />
      <SiteFooter />
    </main>
  );
}
