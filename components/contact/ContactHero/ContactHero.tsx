"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, EASE, DUR_REVEAL } from "@/lib/motion";
import styles from "./ContactHero.module.scss";

export default function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-ch-header]",
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
        "[data-ch-left]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        "[data-ch-right]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          delay: 0.3,
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
      {/* <div data-ch-header>
        <div className={styles.metaRow}>
          <span className={styles.meta}>— Contact</span>
          <span className={styles.metaRight}>Victoria Island, Lagos</span>
        </div>
        <Hairline />
      </div> */}

      <div className={styles.grid}>
        <div data-ch-left>
          <h1 className={styles.headline}>
            We&apos;d be glad to <br />
            <em>hear</em> from you.
          </h1>
          <p className={styles.body}>
            Whether you&apos;re enquiring about a specific vehicle, booking a private viewing, or simply curious,
            we&apos;re here. Response within one business day, or within the hour on WhatsApp.
          </p>
        </div>

        <div className={styles.imgWrap} data-ch-right>
          <Image
            src="https://images.unsplash.com/photo-1587560699334-bea93391dcef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Luxury vehicle interior, representing attentive Meridian service"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
