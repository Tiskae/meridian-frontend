"use client";

import { useRef, useEffect } from "react";
import Button from "@/components/ui/Button/Button";
import Hairline from "@/components/ui/Hairline/Hairline";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { gsap, EASE, DUR_REVEAL } from "@/lib/motion";
import styles from "./FAQHero.module.scss";

export default function FAQHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-fh-header]",
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
        "[data-fh-content]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          stagger: 0.15,
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
      {/* <div data-fh-header>
        <div className={styles.metaRow}>
          <span className={styles.meta}>— Frequently Asked Questions</span>
          <span className={styles.metaRight}>13 questions answered</span>
        </div>
        <Hairline />
      </div> */}

      <div className={styles.grid}>
        <div data-fh-content>
          <h1 className={styles.headline}>
            What you might want <br />
            to <em>know</em>.
          </h1>
          <p className={styles.body}>
            We have answered the questions we hear most often. If yours is not here, we are always available on WhatsApp
            or by appointment at the showroom.
          </p>
        </div>

        <div className={styles.actions} data-fh-content>
          <Button
            as="a"
            href={buildWhatsAppUrl("Hello, I have a question about Meridian Motors.")}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            Ask on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
