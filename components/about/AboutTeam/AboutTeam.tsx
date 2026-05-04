'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel';
import Hairline from '@/components/ui/Hairline/Hairline';
import { gsap, EASE, DUR_REVEAL } from '@/lib/motion';
import styles from './AboutTeam.module.scss';

const TEAM = [
  {
    name: 'Chukwuemeka Adeyemi',
    role: 'Founder & Principal',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80&fit=crop&auto=format',
    bio: 'Former investment banker at Stanbic IBTC. Started Meridian in 2018 to address the trust deficit in Lagos luxury auto sales. Personally approves every vehicle before listing.',
  },
  {
    name: 'Aisha Bello',
    role: 'Head of Acquisitions',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80&fit=crop&auto=format',
    bio: 'Sources every vehicle personally. 14 years in automotive consulting across West Africa, formerly with Coscharis Motors. Specialist in European marques.',
  },
  {
    name: 'Tunde Okonkwo',
    role: 'Client Relations',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80&fit=crop&auto=format',
    bio: 'Manages the end-to-end client experience from first enquiry to handover. Previously at The Wheatbaker hotel group. Obsessed with the details others overlook.',
  },
];

export default function AboutTeam() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-team-header]',
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
        '[data-team-card]',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div data-team-header>
        <SectionLabel title="The Team" right="Three people. Every decision." />
        <Hairline className={styles.headerDivider} />
      </div>

      <div className={styles.grid}>
        {TEAM.map((member) => (
          <div key={member.name} className={styles.card} data-team-card>
            <div className={styles.portraitWrap}>
              <Image
                src={member.image}
                alt={`Portrait of ${member.name}, ${member.role} at Meridian Motors`}
                fill
                sizes="(max-width: 1024px) 80vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.name}>{member.name}</div>
            <div className={styles.role}>{member.role}</div>
            <Hairline className={styles.cardDivider} />
            <p className={styles.bio}>{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
