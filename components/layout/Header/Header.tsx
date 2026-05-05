"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import styles from "./Header.module.scss";
import clsx from "clsx";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/about", label: "About" },
  { href: "/financing", label: "Financing" },
  { href: "/faqs", label: "FAQs" },
  // { href: "/sell", label: "Sell Your Car" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile nav open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav className={clsx(styles.nav, scrolled && styles.scrolled)}>
      <Link href="/" className={styles.wordmark}>
        <span className={styles.wordmarkLine} />
        <span className={styles.wordmarkText}>MERIDIAN MOTORS</span>
      </Link>

      <button
        className={clsx(styles.burger, mobileOpen && styles.burgerOpen)}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
      </button>

      {/* Desktop inline links */}
      <div className={styles.links}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(styles.link, pathname === link.href && styles.linkActive)}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile overlay */}
      <div className={clsx(styles.mobileNav, mobileOpen && styles.mobileNavOpen)}>
        <div className={styles.mobileLinks}>
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(styles.mobileLink, pathname === link.href && styles.mobileLinkActive)}
              style={{ transitionDelay: mobileOpen ? `${80 + i * 50}ms` : "0ms" }}
            >
              <span className={styles.mobileLinkText}>{link.label}</span>
            </Link>
          ))}
        </div>

        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mobileCta}
          style={{ transitionDelay: mobileOpen ? `${80 + NAV_LINKS.length * 50}ms` : "0ms" }}
        >
          Enquire on WhatsApp
        </a>
      </div>

      <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={styles.cta}>
        Enquire on WhatsApp
      </a>
    </nav>
  );
}
