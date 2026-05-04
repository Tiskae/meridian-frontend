'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, EASE, DUR_REVEAL } from '@/lib/motion';
import styles from './AboutFounderQuote.module.scss';

export default function AboutFounderQuote() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-fq-img]',
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
        '[data-fq-text]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          delay: 0.2,
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
        <div className={styles.imgWrap} data-fq-img>
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80&fit=crop&auto=format"
            alt="Chukwuemeka Adeyemi, Founder of Meridian Motors"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div data-fq-text>
          <div className={styles.attribution}>— Chukwuemeka Adeyemi, Founder</div>
          <blockquote className={styles.quote}>
            &ldquo;I didn&apos;t want to build the biggest dealership in Lagos. I wanted to build the one where every car told you something about the person who chose it — and the people who prepared it for you.&rdquo;
          </blockquote>
          <div className={styles.citation}>Interview, BusinessDay Nigeria · March 2024</div>
        </div>
      </div>
    </section>
  );
}
