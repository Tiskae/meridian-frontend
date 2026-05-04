"use client";

import { useRef, useEffect } from "react";
import SectionLabel from "@/components/ui/SectionLabel/SectionLabel";
import Hairline from "@/components/ui/Hairline/Hairline";
import { gsap, EASE, DUR_REVEAL } from "@/lib/motion";
import styles from "./ProcessSection.module.scss";

const STEPS = [
  {
    num: "— 01",
    title: "Source",
    body: "Every vehicle is personally evaluated before it enters our collection. We acquire from official automobile companies, verified private sellers, and select international partners.",
  },
  {
    num: "— 02",
    title: "Inspect",
    body: "Independent inspection by certified engineers. Mechanical, electrical, and cosmetic assessments. Full report made available on every vehicle detail page.",
  },
  {
    num: "— 03",
    title: "Present",
    body: "Photographed against clean grounds. Described with precision, without embellishment. Every specification cross-verified before publication.",
  },
  {
    num: "— 04",
    title: "Deliver",
    body: "White-glove handover at our showroom. Documentation, financing, and Nigeria registration handled end-to-end, at your pace.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-ps-header]",
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
        "[data-ps-step]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div data-ps-header>
        <SectionLabel number="— 02" title="The Process" right="How we work" rightLink="/about" dark />
        <Hairline dark className={styles.headerDivider} />
      </div>

      <div className={styles.grid}>
        {STEPS.map((step, i) => (
          <div key={step.num} className={styles.step} data-ps-step data-index={i}>
            <div className={styles.stepNum}>{step.num}</div>
            <div className={styles.stepTitle}>
              <em>{step.title}</em>
            </div>
            <div className={styles.stepBody}>{step.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
