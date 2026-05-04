'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Hairline from '@/components/ui/Hairline/Hairline';
import { gsap, EASE, DUR_REVEAL } from '@/lib/motion';
import styles from './SellHero.module.scss';

export default function SellHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-sh-header]',
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
        '[data-sh-left]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      );

      gsap.fromTo(
        '[data-sh-right]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          delay: 0.3,
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
      <div data-sh-header>
        <div className={styles.metaRow}>
          <span className={styles.meta}>— Sell Your Car</span>
          <span className={styles.metaRight}>Consignment & Acquisition</span>
        </div>
        <Hairline />
      </div>

      <div className={styles.grid}>
        <div data-sh-left>
          <h1 className={styles.headline}>
            Present your car to<br />
            the right <em>audience</em>.
          </h1>
          <p className={styles.body}>
            The Meridian client base is curated. When your vehicle is listed with us, it is seen by buyers who are ready, qualified, and serious. We handle photography, documentation, viewings, and negotiation.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNum}>22</div>
              <div className={styles.statLabel}>Days average time to sale</div>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.stat}>
              <div className={styles.statNum}>₦2.1B</div>
              <div className={styles.statLabel}>Consignment value 2025</div>
            </div>
          </div>
        </div>

        <div className={styles.imgWrap} data-sh-right>
          <Image
            src="https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=700&q=80&fit=crop&auto=format"
            alt="Prestige vehicle presented for sale at Meridian Motors"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
}
