'use client';

import { useRef, useEffect } from 'react';
import { gsap, EASE, DUR_REVEAL } from '@/lib/motion';
import styles from './FinancePartners.module.scss';

const PARTNERS = ['Stanbic IBTC', 'Access Bank', 'GTBank', 'First Bank'];

export default function FinancePartners() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-partners-reveal]',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.strip} data-partners-reveal>
        <span className={styles.label}>— Finance Partners</span>
        <div className={styles.partners}>
          {PARTNERS.map((partner) => (
            <span key={partner} className={styles.partner}>{partner}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
