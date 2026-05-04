'use client';

import { useRef, useEffect } from 'react';
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel';
import Hairline from '@/components/ui/Hairline/Hairline';
import { gsap, EASE, DUR_REVEAL } from '@/lib/motion';
import styles from './AboutPrinciples.module.scss';

const PRINCIPLES = [
  {
    num: '— 01',
    title: 'Selectivity',
    body: 'We do not list everything we see. Fewer than one in eight vehicles evaluated meets our standard. The collection stays small because that is the point.',
  },
  {
    num: '— 02',
    title: 'Independence',
    body: 'Every vehicle is inspected by engineers we do not employ, against a 187-point checklist we publish. The report is available before you visit.',
  },
  {
    num: '— 03',
    title: 'Transparency',
    body: 'Provenance, service history, and known imperfections — all disclosed upfront. We have never delisted a question we couldn\'t answer.',
  },
  {
    num: '— 04',
    title: 'Patience',
    body: 'We do not chase. The showroom is open by appointment so you can consider each car without pressure, at your own pace.',
  },
];

export default function AboutPrinciples() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-ap-header]',
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
        '[data-ap-lead]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      );

      gsap.fromTo(
        '[data-ap-card]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          stagger: 0.12,
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
      <div data-ap-header>
        <SectionLabel title="What We Believe" right="Four principles" dark />
        <Hairline dark className={styles.headerDivider} />
      </div>

      <div className={styles.lead} data-ap-lead>
        <p className={styles.leadHeadline}>
          The way we work is <em>deliberate</em>.
        </p>
        <p className={styles.leadBody}>
          These four principles have governed every vehicle we have sourced, every inspection we have commissioned, and every client relationship we have built since 2018.
        </p>
      </div>

      <div className={styles.grid}>
        {PRINCIPLES.map((p, i) => (
          <div
            key={p.num}
            className={styles.card}
            data-ap-card
            data-index={i}
          >
            <div className={styles.cardNum}>{p.num}</div>
            <div className={styles.cardTitle}>
              <em>{p.title}</em>
            </div>
            <p className={styles.cardBody}>{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
