'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel';
import Hairline from '@/components/ui/Hairline/Hairline';
import { gsap, EASE, DUR_REVEAL } from '@/lib/motion';
import styles from './SellProof.module.scss';

const CONSIGNMENTS = [
  {
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&q=80&fit=crop&auto=format',
    alt: 'Porsche 911 Carrera S 2022 at Meridian Motors',
    year: '2022',
    condition: 'Excellent condition',
    name: 'Porsche 911 Carrera S',
    result: 'Sold in 18 days',
  },
  {
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&q=80&fit=crop&auto=format',
    alt: 'Range Rover Autobiography 2023 at Meridian Motors',
    year: '2023',
    condition: 'Excellent condition',
    name: 'Range Rover Autobiography',
    result: 'Sold in 9 days',
  },
  {
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&q=80&fit=crop&auto=format',
    alt: 'Mercedes-Benz S 580 2022 at Meridian Motors',
    year: '2022',
    condition: 'Very good condition',
    name: 'Mercedes-Benz S 580',
    result: 'Sold in 23 days',
  },
];

export default function SellProof() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-spr-header]',
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
        '[data-spr-card]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      );

      gsap.fromTo(
        '[data-spr-testimonial]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div data-spr-header>
        <SectionLabel title="Recent Consignments" right="Results speak" />
        <Hairline className={styles.headerDivider} />
      </div>

      <div className={styles.grid3}>
        {CONSIGNMENTS.map((car) => (
          <div key={car.name} className={styles.card} data-spr-card>
            <div className={styles.cardImg}>
              <Image
                src={car.image}
                alt={car.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.cardMeta}>{car.year} · {car.condition}</div>
            <div className={styles.cardName}>{car.name}</div>
            <div className={styles.cardResult}>{car.result}</div>
          </div>
        ))}
      </div>

      <div className={styles.testimonialGrid}>
        <div data-spr-testimonial>
          <div className={styles.testimonialLabel}>— Seller Testimonial</div>
          <blockquote className={styles.quote}>
            &ldquo;I listed my 911 with three dealers before coming to Meridian. The difference wasn&apos;t just the price they achieved — it was that they treated the car, and me, as if both mattered.&rdquo;
          </blockquote>
          <div className={styles.citation}>A. Osei-Bonsu · Lagos · 2024</div>
        </div>

        <div className={styles.testimonialImg} data-spr-testimonial>
          <Image
            src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80&fit=crop&auto=format"
            alt="Luxury vehicle presented at Meridian Motors consignment service"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
}
