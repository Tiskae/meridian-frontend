"use client";

import { useRef, useEffect } from "react";
import Button from "@/components/ui/Button/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { gsap, EASE, DUR_REVEAL } from "@/lib/motion";
import styles from "./FAQCallout.module.scss";

export default function FAQCallout() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-fco-left]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        "[data-fco-right]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.grid}>
        <div data-fco-left>
          <h2 className={styles.headline}>
            Prefer to speak <em>directly</em>?
          </h2>
          <p className={styles.body}>
            Our team is available for private viewings by appointment. Every visit is dedicated. No queues, no pressure,
            just attentive service and the cars.
          </p>
        </div>

        <div className={styles.actions} data-fco-right>
          <Button as="a" href="/contact" variant="white">
            Book a Private Viewing
          </Button>
          <Button
            as="a"
            href={buildWhatsAppUrl("Hello, I would like to book a private viewing at Meridian Motors.")}
            target="_blank"
            rel="noopener noreferrer"
            variant="white_outline"
          >
            Message on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
