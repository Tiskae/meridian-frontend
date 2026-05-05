"use client";

import { useRef, useEffect } from "react";
import SectionLabel from "@/components/ui/SectionLabel/SectionLabel";
import Hairline from "@/components/ui/Hairline/Hairline";
import { gsap, EASE, DUR_REVEAL } from "@/lib/motion";
import styles from "./FinanceProcess.module.scss";

const STEPS = [
  {
    num: "— 01",
    title: "Estimate",
    body: "Use the calculator to get an indicative monthly figure. This is not a commitment, it is just a starting point for conversation.",
  },
  {
    num: "— 02",
    title: "Apply",
    body: "Submit the enquiry form above. Our team connects you with the most suitable partner institution based on your profile and preferred terms.",
  },
  {
    num: "— 03",
    title: "Approve",
    body: "Pre-approval typically takes 3-5 business days. We handle all coordination between you and the finance partner. No paperwork on your end until signing.",
  },
  {
    num: "— 04",
    title: "Drive",
    body: "Once approved, we arrange handover at the showroom. Documentation, registration, and insurance are finalised before you leave with the keys.",
  },
];

export default function FinanceProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-fp-header]",
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
        "[data-fp-step]",
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
      <div data-fp-header>
        <SectionLabel title="How Financing Works" right="Four steps to ownership" dark />
        <Hairline dark className={styles.headerDivider} />
      </div>

      <div className={styles.grid}>
        {STEPS.map((step, i) => (
          <div key={step.num} className={styles.step} data-fp-step data-index={i}>
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
