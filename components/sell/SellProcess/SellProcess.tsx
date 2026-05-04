'use client';

import { useRef, useEffect } from 'react';
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel';
import Hairline from '@/components/ui/Hairline/Hairline';
import { gsap, EASE, DUR_REVEAL } from '@/lib/motion';
import styles from './SellProcess.module.scss';

const STEPS = [
  {
    num: '— 01',
    title: 'Submit',
    body: 'Complete the form below with your vehicle details. Photographs and service records are welcome but not required at this stage.',
  },
  {
    num: '— 02',
    title: 'Evaluate',
    body: 'Our acquisitions team reviews your submission within 24 hours and provides a preliminary valuation based on market data, condition, and demand.',
  },
  {
    num: '— 03',
    title: 'Inspect',
    body: 'If both parties agree, we arrange an in-person inspection at our Victoria Island facility or at your preferred location within Lagos.',
  },
  {
    num: '— 04',
    title: 'Present',
    body: 'Your vehicle is professionally photographed, listed on our platform, and shown to our client base. Consignment or outright — you choose.',
  },
];

export default function SellProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-sp-header]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      );

      gsap.fromTo(
        '[data-sp-step]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div data-sp-header>
        <SectionLabel title="How It Works" right="Four steps" dark />
        <Hairline dark className={styles.headerDivider} />
      </div>

      <div className={styles.grid}>
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            className={styles.step}
            data-sp-step
            data-index={i}
          >
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
