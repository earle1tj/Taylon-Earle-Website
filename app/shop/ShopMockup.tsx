"use client";

import { useState } from "react";

const products = [
  { name: "Backroads Tee", type: "Washed black heavyweight tee", price: 32, art: "tee", badge: "First edition" },
  { name: "Midnight Roads Crewneck", type: "Navy fleece crewneck", price: 54, art: "crew", badge: "Fan favorite" },
  { name: "Taylon James Trucker Hat", type: "Navy and cream embroidered cap", price: 28, art: "hat", badge: "New" },
];

export function ShopMockup() {
  const [size, setSize] = useState("L");
  const [cart, setCart] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  function addItem(name: string) {
    setCart((items) => [...items, name]);
    setNotice(`${name} added to your mock cart.`);
    window.setTimeout(() => setNotice(""), 2600);
  }

  return (
    <>
      <div className="shop-toolbar page-shell">
        <p><span>{products.length}</span> pieces in the first drop</p>
        <button className="mock-cart" type="button" onClick={() => setNotice(cart.length ? `${cart.length} mock item${cart.length === 1 ? "" : "s"} in your cart.` : "Your mock cart is empty.")}>
          Bag <span>{cart.length}</span>
        </button>
      </div>

      <section className="shop-grid page-shell" aria-label="Mock merchandise collection">
        {products.map((product) => (
          <article className="product-card" key={product.name}>
            <div className={`product-art product-${product.art}`}>
              <span className="product-badge">{product.badge}</span>
              <div className="merch-object" aria-hidden="true">
                <i>TJ</i><strong>{product.art === "hat" ? "TAYLON JAMES" : "BACKROADS"}</strong><small>{product.art === "crew" ? "MID-MICHIGAN · 2026" : "SONGS & STORIES"}</small>
              </div>
              <button type="button" className="quick-add" onClick={() => addItem(product.name)}>Quick add +</button>
            </div>
            <div className="product-info">
              <div><p>{product.type}</p><h2>{product.name}</h2></div>
              <strong>${product.price}.00</strong>
            </div>
            {product.art !== "hat" && (
              <div className="size-picker" aria-label={`Select size for ${product.name}`}>
                {['S','M','L','XL','2XL'].map((item) => <button type="button" className={size === item ? "selected" : ""} onClick={() => setSize(item)} key={item}>{item}</button>)}
              </div>
            )}
          </article>
        ))}
      </section>

      <section className="shop-note page-shell">
        <p className="micro-label">A future Shopify storefront</p>
        <h2>Made for the songs you take with you.</h2>
        <p>This is a visual preview only. When the real shop launches, Shopify will securely handle checkout, shipping, inventory, taxes, and order updates right here.</p>
        <div className="shop-perks"><span>✦ Secure checkout</span><span>✦ Size-inclusive options</span><span>✦ Shipped with tracking</span></div>
      </section>

      <div className={`shop-toast ${notice ? "visible" : ""}`} role="status" aria-live="polite">{notice}</div>
    </>
  );
}
