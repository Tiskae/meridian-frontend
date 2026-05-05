"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, EASE, DUR_REVEAL } from "@/lib/motion";
import styles from "./FinancingHero.module.scss";

export default function FinancingHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-fih-header]",
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
        "[data-fih-content]",
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
      {/* <div data-fih-header>
        <div className={styles.metaRow}>
          <span className={styles.meta}>— Financing & Subscription</span>
          <span className={styles.metaRight}>Structured acquisition</span>
        </div>
        <Hairline />
      </div> */}

      <div className={styles.grid}>
        <div data-fih-content>
          <h1 className={styles.headline}>
            Two ways to drive <br />
            <em>exceptionally</em>.
          </h1>
          <p className={styles.body}>
            Vehicle financing with partner institutions, or a flexible subscription that puts you in a prestige vehicle
            without the commitment of ownership. Both are straightforward. Both are handled by us, end to end.
          </p>
        </div>

        <div className={styles.imgWrap} data-fih-content>
          <Image
            src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Financing options at Meridian Motors"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
