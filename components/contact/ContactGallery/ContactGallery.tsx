'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, EASE, DUR_REVEAL } from '@/lib/motion';
import styles from './ContactGallery.module.scss';

const STRIP_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&q=80&fit=crop&auto=format',
    alt: 'Luxury vehicle in showroom',
  },
  {
    src: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&q=80&fit=crop&auto=format',
    alt: 'Luxury car exterior, side profile',
  },
  {
    src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&q=80&fit=crop&auto=format',
    alt: 'Luxury vehicle front view at showroom',
  },
  {
    src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&q=80&fit=crop&auto=format',
    alt: 'Prestige vehicle detail, rear view',
  },
];

export default function ContactGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-cg-img]',
        { opacity: 0 },
        {
          opacity: 1,
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
    <div ref={sectionRef}>
      <div className={styles.strip}>
        {STRIP_IMAGES.map((img, i) => (
          <div key={i} className={styles.stripImg} data-cg-img>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="25vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      <div
        className={styles.map}
        aria-label="Map location — No. 4 Kofo Abayomi Street, Victoria Island, Lagos"
        role="img"
      >
        <div className={styles.pinLine} />
        <div className={styles.pin} />
        <div className={styles.mapLabel}>6.4281°N, 3.4219°E — Victoria Island, Lagos</div>
        <div className={styles.mapCoord}>No. 4 Kofo Abayomi Street</div>
      </div>
    </div>
  );
}
