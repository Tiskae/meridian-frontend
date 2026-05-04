'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button/Button';
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel';
import Hairline from '@/components/ui/Hairline/Hairline';
import { gsap, EASE, DUR_REVEAL } from '@/lib/motion';
import styles from './SubscriptionSection.module.scss';

const TIERS = [
  {
    name: 'Select',
    price: 'From ₦3.5M / month',
    type: 'SUVs & Saloons',
    minimum: '12-month minimum',
    includes: 'Insurance, maintenance, servicing, 3,000 km/month',
  },
  {
    name: 'Prestige',
    price: 'From ₦5.5M / month',
    type: 'Premium & Performance',
    minimum: '6-month minimum',
    includes: 'Insurance, maintenance, servicing, 5,000 km/month, vehicle swaps',
  },
  {
    name: 'Reserve',
    price: 'By arrangement',
    type: 'Exotics & Collectors',
    minimum: 'Flexible',
    includes: 'Fully bespoke terms, dedicated concierge, unlimited kilometres',
  },
];

export default function SubscriptionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', tier: '', duration: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-ss-left]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      );

      gsap.fromTo(
        '[data-ss-right]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          delay: 0.2,
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section ref={sectionRef} className={styles.section}>
      <div data-ss-left>
        <SectionLabel title="Subscription Programme" number="— 02" />
        <Hairline className={styles.headerDivider} />
      </div>

      <div className={styles.grid}>
        {/* Left */}
        <div data-ss-left>
          <h2 className={styles.headline}>
            Drive without <em>ownership</em>.
          </h2>
          <p className={styles.body}>
            The Meridian subscription gives you access to a prestige vehicle on a flexible monthly arrangement. Insurance, maintenance, and servicing are included. You choose the tier, the term, and when you want to change.
          </p>
          <div className={styles.imgWrap}>
            <Image
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80&fit=crop&auto=format"
              alt="Luxury vehicle on open road, representing Meridian subscription programme"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Right */}
        <div data-ss-right>
          {TIERS.map((tier) => (
            <div key={tier.name} className={styles.tierRow}>
              <div className={styles.tierHeader}>
                <span className={styles.tierName}>{tier.name}</span>
                <span className={styles.tierPrice}>{tier.price}</span>
              </div>
              <div className={styles.tierMeta}>
                <div className={styles.tierMetaItem}>
                  <span className={styles.tierMetaKey}>Type</span>
                  <span className={styles.tierMetaDash}>—</span>
                  <span className={styles.tierMetaVal}>{tier.type}</span>
                </div>
                <div className={styles.tierMetaItem}>
                  <span className={styles.tierMetaKey}>Minimum</span>
                  <span className={styles.tierMetaDash}>—</span>
                  <span className={styles.tierMetaVal}>{tier.minimum}</span>
                </div>
              </div>
              <p className={styles.tierIncludes}>{tier.includes}</p>
            </div>
          ))}

          {submitted ? (
            <div className={styles.submitted}>
              <p className={styles.submittedHead}>Enquiry <em>received</em>.</p>
              <p className={styles.submittedBody}>
                Our team will be in touch within one business day to discuss subscription options.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.formWrap}>
              <div className={styles.formGrid}>
                <div>
                  <label className={styles.label} htmlFor="ss-name">Full Name</label>
                  <input
                    id="ss-name"
                    name="name"
                    type="text"
                    className={styles.input}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="ss-phone">Phone</label>
                  <input
                    id="ss-phone"
                    name="phone"
                    type="tel"
                    className={styles.input}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="ss-tier">Preferred Tier</label>
                  <select
                    id="ss-tier"
                    name="tier"
                    className={styles.select}
                    value={formData.tier}
                    onChange={handleChange}
                  >
                    <option value="">Select a tier</option>
                    <option value="select">Select</option>
                    <option value="prestige">Prestige</option>
                    <option value="reserve">Reserve</option>
                  </select>
                </div>
                <div>
                  <label className={styles.label} htmlFor="ss-duration">Duration</label>
                  <select
                    id="ss-duration"
                    name="duration"
                    className={styles.select}
                    value={formData.duration}
                    onChange={handleChange}
                  >
                    <option value="">Select duration</option>
                    <option value="6">6 months</option>
                    <option value="12">12 months</option>
                    <option value="24">24 months</option>
                    <option value="flexible">Flexible (discuss)</option>
                  </select>
                </div>
                <div className={styles.fieldFull}>
                  <Button type="submit" variant="secondary" className={styles.submitBtn}>
                    Submit Subscription Enquiry
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
