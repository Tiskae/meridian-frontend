"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, EASE, DUR_REVEAL } from "@/lib/motion";
import styles from "./AboutStory.module.scss";

export default function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-story-left]",
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
        "[data-story-right]",
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
      <div className={styles.sectionLabel}>— Our Story</div>
      <div className={styles.grid}>
        <div data-story-left>
          <p className={styles.p1}>
            Chukwuemeka Adeyemi spent twelve years as an investment banker before he bought his first collector vehicle
            (a 2009 Porsche 911 Carrera S) from a dealer in Lekki who could not tell him its{" "}
            <em>full service history</em>.
          </p>
          <p className={styles.p2}>
            That gap between the price asked and the information offered became the founding problem of Meridian. Not a
            gap in supply, Lagos has always had cars. A gap in <em>trust</em>.
          </p>
          <p className={styles.p3}>
            We built Meridian Motors to close it. Every vehicle we list has been independently inspected, fully
            documented, and personally approved. We are small by design, rigorous by principle, and accountable in every
            transaction we take on.
          </p>
        </div>

        <div className={styles.imageStack} data-story-right>
          <div className={styles.mainImg}>
            <Image
              src="https://images.unsplash.com/photo-1614026480209-cd9934144671?w=900&q=80&fit=crop&auto=format"
              alt="Interior of a luxury vehicle, illustrating Meridian's attention to detail"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.subGrid}>
            <div className={styles.subImg}>
              <Image
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80&fit=crop&auto=format"
                alt="Close-up of vehicle steering wheel and dashboard"
                fill
                sizes="(max-width: 1024px) 50vw, 20vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.subImg}>
              <Image
                src="https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500&q=80&fit=crop&auto=format"
                alt="Luxury car detail, side profile view"
                fill
                sizes="(max-width: 1024px) 50vw, 20vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
