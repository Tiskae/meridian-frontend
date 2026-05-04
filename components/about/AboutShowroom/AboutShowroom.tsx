"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel/SectionLabel";
import Hairline from "@/components/ui/Hairline/Hairline";
import { gsap, EASE, DUR_REVEAL } from "@/lib/motion";
import styles from "./AboutShowroom.module.scss";

export default function AboutShowroom() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-show-header]",
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
        "[data-show-content]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        "[data-show-strip]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div data-show-header>
        <SectionLabel title="The Showroom" right="No. 4 Kofo Abayomi Street" />
        <Hairline className={styles.headerDivider} />
      </div>

      <div className={styles.grid}>
        <div data-show-content>
          <p className={styles.subheadline}>
            Our Victoria Island showroom is designed for <em>consideration</em>, not impulse.
          </p>
          <p className={styles.body}>
            The space is quiet, uncluttered, and arranged so that each vehicle has room to make its case. No queues. No
            pressure. Just the cars, properly lit, with room to walk around them.
          </p>
          <p className={styles.hours}>
            Monday - Friday: 8:00 - 21:00
            <br />
            Saturday: 8:00 - 20:00 (by appointment)
            <br />
            Sunday: Closed
            <br />
            <br />
            All visits are by appointment to ensure dedicated attention.
          </p>
        </div>

        <div className={styles.mainImgWrap} data-show-content>
          <Image
            src="/images/showroom-with-ceo.jpeg"
            alt="Meridian Motors showroom interior with luxury vehicles on display"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className={styles.stripGrid}>
        {[
          {
            src: "/images/showroom-with-team.png",
            alt: "The team at Meridian Motors showroom",
          },
          {
            src: "/images/showroom-with-hcr.png",
            alt: "The Head of Client Relations at Meridian Motors showroom",
          },
          {
            src: "/images/showroom-with-hoa.png",
            alt: "The Head of Acquisitions at Meridian Motors showroom",
          },
        ].map((img, i) => (
          <div key={i} className={styles.stripImg} data-show-strip>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
