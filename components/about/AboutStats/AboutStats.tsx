'use client';

import { useRef, useEffect } from 'react';
import { gsap, EASE, DUR_REVEAL } from '@/lib/motion';
import styles from './AboutStats.module.scss';

const STATS = [
  { num: '120+', label: 'Vehicles presented since 2018' },
  { num: '₦18B', label: 'In total transaction value' },
  { num: '94%', label: 'Client return rate' },
  { num: '6', label: 'Days average time to delivery' },
];

export default function AboutStats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-stat]',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.grid}>
        {STATS.map((stat, i) => (
          <div key={i} className={styles.stat} data-stat data-index={i}>
            <div className={styles.num}>{stat.num}</div>
            <div className={styles.label}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
