'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Hairline from '@/components/ui/Hairline/Hairline';
import { gsap, EASE, DUR_REVEAL } from '@/lib/motion';
import styles from './FinancingHero.module.scss';

export default function FinancingHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-fih-header]',
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
        '[data-fih-content]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          stagger: 0.15,
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
      <div data-fih-header>
        <div className={styles.metaRow}>
          <span className={styles.meta}>— Financing & Subscription</span>
          <span className={styles.metaRight}>Structured acquisition</span>
        </div>
        <Hairline />
      </div>

      <div className={styles.grid}>
        <div data-fih-content>
          <h1 className={styles.headline}>
            Two ways to drive <br />
            <em>exceptionally</em>.
          </h1>
          <p className={styles.body}>
            Vehicle financing with partner institutions, or a flexible subscription that puts you in a prestige vehicle without the commitment of ownership. Both are straightforward. Both are handled by us, end to end.
          </p>
        </div>

        <div className={styles.imgWrap} data-fih-content>
          <Image
            src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=700&q=80&fit=crop&auto=format"
            alt="Luxury vehicle interior, representing Meridian's financing and subscription options"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
}
