import Link from "next/link";

type PageKey = "home" | "releases" | "covers" | "books" | "journal" | "shop" | "bio" | "contact";

const links: Array<{ href: string; label: string; key: PageKey }> = [
  { href: "/", label: "Home", key: "home" },
  { href: "/releases", label: "Releases", key: "releases" },
  { href: "/covers", label: "Covers", key: "covers" },
  { href: "/books", label: "Books", key: "books" },
  { href: "/journal", label: "Journal", key: "journal" },
  { href: "/bio", label: "About", key: "bio" },
  { href: "/contact", label: "Contact", key: "contact" },
];

export function SiteHeader({ active }: { active: PageKey }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header page-shell">
        <Link className="wordmark" href="/" aria-label="Taylon James home">
          Taylon James
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              className={active === link.key ? "active" : ""}
              href={link.href}
              key={link.key}
              aria-current={active === link.key ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <details className="mobile-nav">
          <summary aria-label="Toggle navigation">
            <span className="menu-icon" aria-hidden="true" />
            <span className="menu-label" aria-hidden="true"><i>Menu</i><i>Close</i></span>
          </summary>
          <nav aria-label="Mobile navigation">
            {links.map((link) => (
              <Link
                className={active === link.key ? "active" : ""}
                href={link.href}
                key={link.key}
                aria-current={active === link.key ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </details>
      </header>
    </>
  );
}
