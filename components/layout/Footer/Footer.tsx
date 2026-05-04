import Link from "next/link";
import { SOCIAL_LINKS } from "@/components/ui/SocialIcons/SocialIcons";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import styles from "./Footer.module.scss";

type FooterItem = { label: string; href?: string; external?: boolean };

const COLUMNS: { heading: string; items: FooterItem[] }[] = [
  {
    heading: "Showroom",
    items: [
      { label: "No. 4 Kofo Abayomi St" },
      { label: "Victoria Island, Lagos" },
      { label: "Mon - Sat, 9am - 6pm" },
      { label: "By Appointment" },
    ],
  },
  {
    heading: "Collection",
    items: [
      { label: "Inventory", href: "/inventory" },
      { label: "Financing", href: "/financing" },
      { label: "Sell Your Car", href: "/sell" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    heading: "Contact",
    items: [
      { label: "Enquire on WhatsApp", href: buildWhatsAppUrl(), external: true },
      { label: "+234 912 044 8767", href: "tel:+2349120448767" },
      { label: "hello@meridianmotors.ng", href: "mailto:hello@meridianmotors.ng" },
      { label: "Book a Private Viewing", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <span className={styles.brandLine} />
          <div className={styles.brandName}>MERIDIAN MOTORS</div>
          <div className={styles.brandSub}>Est. 2018 &middot; Lagos, Nigeria</div>

          <div className={styles.socials}>
            {SOCIAL_LINKS.map(({ Icon, label }) => (
              <a key={label} href="#" target="_blank" aria-label={label} className={styles.socialLink}>
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.columns}>
          {COLUMNS.map((col) => (
            <div key={col.heading} className={styles.column}>
              <div className={styles.columnHeading}>{col.heading}</div>
              {col.items.map((item) => (
                <div key={item.label} className={styles.columnItem}>
                  {item.href ? (
                    item.external ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href}>{item.label}</Link>
                    )
                  ) : (
                    item.label
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.bottom}>
        <span className={styles.bottomText}>Vol. 01 — Spring 2026</span>
        <span className={styles.bottomText}>&copy; 2026 Meridian Motors. All rights reserved.</span>
        <span className={styles.bottomText}>
          Designed &amp; developed by{" "}
          <a href="https://tiskae.dev" target="_blank" rel="noopener noreferrer" className={styles.credit}>
            Tiskae
          </a>
        </span>
      </div>
    </footer>
  );
}
