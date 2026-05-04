'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Hairline from '@/components/ui/Hairline/Hairline';
import { gsap, EASE, DUR_REVEAL } from '@/lib/motion';
import styles from './AboutHero.module.scss';

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-ah-header]',
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
        '[data-ah-text]',
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
        '[data-ah-image]',
        { opacity: 0, y: 32 },
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
      <div data-ah-header>
        <div className={styles.metaRow}>
          <span className={styles.meta}>— About</span>
          <span className={styles.metaRight}>Est. 2018 · Victoria Island, Lagos</span>
        </div>
        <Hairline />
      </div>

      <div data-ah-text>
        <h1 className={styles.headline}>
          A dealership built on <br />
          <em>intention</em>, not inventory.
        </h1>
        <p className={styles.subtext}>
          We started Meridian Motors because Lagos deserved a dealership that treated every car — and every client — with the care you&apos;d expect from the finest houses anywhere in the world.
        </p>
      </div>

      <div className={styles.imageWrap} data-ah-image>
        <Image
          src="https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=1600&q=80&fit=crop&auto=format"
          alt="Meridian Motors showroom exterior, Victoria Island Lagos"
          fill
          sizes="100vw"
          className={styles.image}
          priority
        />
      </div>
    </section>
  );
}
