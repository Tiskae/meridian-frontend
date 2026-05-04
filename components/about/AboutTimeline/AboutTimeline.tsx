'use client';

import { useRef, useEffect } from 'react';
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel';
import Hairline from '@/components/ui/Hairline/Hairline';
import { gsap, EASE, DUR_REVEAL } from '@/lib/motion';
import styles from './AboutTimeline.module.scss';

const MILESTONES = [
  {
    year: '2018',
    text: 'Founded on Victoria Island with a three-car collection and a conviction.',
  },
  {
    year: '2020',
    text: 'Expanded to a dedicated showroom on Kofo Abayomi Street. Launched the 187-point inspection programme.',
  },
  {
    year: '2022',
    text: 'Introduced vehicle financing partnerships and the subscription programme for executives.',
  },
  {
    year: '2024',
    text: 'Surpassed ₦18 billion in total transaction value. Opened consignment services to private sellers.',
  },
  {
    year: '2026',
    text: 'Digital platform launched — bringing the showroom experience to clients across Nigeria.',
  },
];

export default function AboutTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-tl-header]',
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
        '[data-tl-row]',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div data-tl-header>
        <SectionLabel title="Milestones" />
        <Hairline className={styles.headerDivider} />
      </div>

      {MILESTONES.map((m) => (
        <div key={m.year} className={styles.row} data-tl-row>
          <div className={styles.year}>{m.year}</div>
          <p className={styles.text}>{m.text}</p>
        </div>
      ))}
    </section>
  );
}
