"use client";

import { useRef, useEffect } from "react";
import Button from "@/components/ui/Button/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { gsap, EASE, DUR_REVEAL } from "@/lib/motion";
import { analytics } from "@/lib/analytics";
import styles from "./ClosingCTA.module.scss";

export default function ClosingCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-cta-left]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        "[data-cta-right]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.left} data-cta-left>
        <div className={styles.label}>By Appointment</div>
        <h2 className={styles.headline}>
          Visit us. See the cars
          <br />
          as they deserve to be <em>seen</em>.
        </h2>
      </div>

      <div className={styles.right} data-cta-right>
        <Button as="a" href="/contact" variant="white" onClick={() => analytics.bookViewing("closing_cta")}>
          Book a Private Viewing
        </Button>
        <Button as="a" href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" variant="white_outline" onClick={() => analytics.whatsappEnquiry("general")}>
          Enquire on WhatsApp
        </Button>
      </div>
    </section>
  );
}
