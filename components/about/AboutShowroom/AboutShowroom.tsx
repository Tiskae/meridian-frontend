'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel';
import Hairline from '@/components/ui/Hairline/Hairline';
import { gsap, EASE, DUR_REVEAL } from '@/lib/motion';
import styles from './AboutShowroom.module.scss';

export default function AboutShowroom() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-show-header]',
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
        '[data-show-content]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      );

      gsap.fromTo(
        '[data-show-strip]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div data-show-header>
        <SectionLabel title="The Showroom" right="No. 4 Kofo Abayomi Street" />
        <Hairline className={styles.headerDivider} />
      </div>

      <div className={styles.grid}>
        <div data-show-content>
          <p className={styles.subheadline}>
            Our Victoria Island showroom is designed for <em>consideration</em>, not impulse.
          </p>
          <p className={styles.body}>
            The space is quiet, uncluttered, and arranged so that each vehicle has room to make its case. No queues. No pressure. Just the cars, properly lit, with room to walk around them.
          </p>
          <p className={styles.hours}>
            Monday – Friday: 10:00 – 18:00<br />
            Saturday: 10:00 – 16:00 (by appointment)<br />
            Sunday: Closed<br />
            <br />
            All visits are by appointment to ensure dedicated attention.
          </p>
        </div>

        <div className={styles.mainImgWrap} data-show-content>
          <Image
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=900&q=80&fit=crop&auto=format"
            alt="Meridian Motors showroom interior with luxury vehicles on display"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      <div className={styles.stripGrid}>
        {[
          {
            src: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80&fit=crop&auto=format',
            alt: 'Luxury vehicle parked in showroom bay',
          },
          {
            src: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=600&q=80&fit=crop&auto=format',
            alt: 'Showroom reception and client area',
          },
          {
            src: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80&fit=crop&auto=format',
            alt: 'Vehicle interior detail, driver seat view',
          },
        ].map((img, i) => (
          <div key={i} className={styles.stripImg} data-show-strip>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
