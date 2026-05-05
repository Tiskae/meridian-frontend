'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button/Button';
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel';
import Hairline from '@/components/ui/Hairline/Hairline';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { gsap, EASE, DUR_REVEAL } from '@/lib/motion';
import styles from './SellForm.module.scss';

const NEXT_STEPS = [
  'Your submission is reviewed by our acquisitions team within 24 hours.',
  'If the vehicle meets our criteria, we will contact you to discuss preliminary valuation.',
  'We arrange an inspection at our Victoria Island showroom or at your location.',
  'Once agreed, we photograph the vehicle and prepare the listing.',
  'Your vehicle is presented to our qualified buyer base.',
  'We handle all negotiations, documentation, and payment processing.',
];

const MAKES = [
  'Mercedes-Benz', 'BMW', 'Porsche', 'Range Rover', 'Lexus',
  'Rolls-Royce', 'Bentley', 'Ferrari', 'Lamborghini', 'Aston Martin',
  'Toyota', 'Other',
];

export default function SellForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    colour: '',
    condition: '',
    askingPrice: '',
    saleType: '',
    fullName: '',
    phone: '',
    email: '',
    notes: '',
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-sf-reveal]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          stagger: 0.1,
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section ref={sectionRef} className={styles.section}>
      <div data-sf-reveal>
        <SectionLabel title="Submit Your Vehicle" />
        <Hairline className={styles.headerDivider} />
      </div>

      {submitted ? (
        <div className={styles.submitted} data-sf-reveal>
          <p className={styles.submittedHead}>
            Submission <em>received</em>.
          </p>
          <p className={styles.submittedBody}>
            Thank you. Our acquisitions team will review your vehicle details and be in touch within 24 hours. If you would like to speak directly, please message us on WhatsApp.
          </p>
          <a
            href={buildWhatsAppUrl('Hello, I have just submitted a vehicle for consignment and would like to follow up.')}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.waLink}
          >
            Continue on WhatsApp →
          </a>
        </div>
      ) : (
        <div className={styles.formGrid}>
          {/* Form */}
          <form onSubmit={handleSubmit} data-sf-reveal>
            {/* Section 01 */}
            <div className={styles.formSection}>
              <div className={styles.sectionLabel}>— 01 / Vehicle Information</div>
              <div className={styles.form2col}>
                <div>
                  <label className={styles.label} htmlFor="sf-make">Make</label>
                  <select
                    id="sf-make"
                    name="make"
                    className={styles.select}
                    value={form.make}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select make</option>
                    {MAKES.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={styles.label} htmlFor="sf-model">Model</label>
                  <input
                    id="sf-model"
                    name="model"
                    type="text"
                    className={styles.input}
                    value={form.model}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 911 Carrera S"
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="sf-year">Year</label>
                  <input
                    id="sf-year"
                    name="year"
                    type="number"
                    className={styles.input}
                    value={form.year}
                    onChange={handleChange}
                    required
                    min={2005}
                    max={2026}
                    placeholder="e.g. 2022"
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="sf-mileage">Mileage (km)</label>
                  <input
                    id="sf-mileage"
                    name="mileage"
                    type="text"
                    className={styles.input}
                    value={form.mileage}
                    onChange={handleChange}
                    placeholder="e.g. 24,000"
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="sf-colour">Colour</label>
                  <input
                    id="sf-colour"
                    name="colour"
                    type="text"
                    className={styles.input}
                    value={form.colour}
                    onChange={handleChange}
                    placeholder="e.g. Agate Grey Metallic"
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="sf-condition">Condition</label>
                  <select
                    id="sf-condition"
                    name="condition"
                    className={styles.select}
                    value={form.condition}
                    onChange={handleChange}
                  >
                    <option value="">Select condition</option>
                    <option value="excellent">Excellent</option>
                    <option value="very-good">Very Good</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.sectionDivider} />

            {/* Section 02 */}
            <div className={styles.formSection}>
              <div className={styles.sectionLabel}>— 02 / Pricing & Preference</div>
              <div className={styles.form2col}>
                <div>
                  <label className={styles.label} htmlFor="sf-price">Asking Price (₦)</label>
                  <input
                    id="sf-price"
                    name="askingPrice"
                    type="text"
                    className={styles.input}
                    value={form.askingPrice}
                    onChange={handleChange}
                    placeholder="e.g. 95,000,000"
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="sf-saleType">Sale Type</label>
                  <select
                    id="sf-saleType"
                    name="saleType"
                    className={styles.select}
                    value={form.saleType}
                    onChange={handleChange}
                  >
                    <option value="">Select type</option>
                    <option value="consignment">Consignment</option>
                    <option value="outright">Outright Sale</option>
                    <option value="either">Either</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.sectionDivider} />

            {/* Section 03 */}
            <div className={styles.formSection}>
              <div className={styles.sectionLabel}>— 03 / Your Details</div>
              <div className={styles.form2col}>
                <div>
                  <label className={styles.label} htmlFor="sf-fullName">Full Name</label>
                  <input
                    id="sf-fullName"
                    name="fullName"
                    type="text"
                    className={styles.input}
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="sf-phone">Phone</label>
                  <input
                    id="sf-phone"
                    name="phone"
                    type="tel"
                    className={styles.input}
                    value={form.phone}
                    onChange={handleChange}
                    required
                    autoComplete="tel"
                  />
                </div>
                <div className={styles.fieldFull}>
                  <label className={styles.label} htmlFor="sf-email">Email</label>
                  <input
                    id="sf-email"
                    name="email"
                    type="email"
                    className={styles.input}
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
                <div className={styles.fieldFull}>
                  <label className={styles.label} htmlFor="sf-notes">Additional Notes</label>
                  <textarea
                    id="sf-notes"
                    name="notes"
                    className={styles.textarea}
                    value={form.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Service history, known issues, modifications, or anything else we should know."
                  />
                </div>
                <div className={styles.fieldFull}>
                  <Button type="submit">Submit for Valuation</Button>
                </div>
              </div>
            </div>
          </form>

          {/* Sidebar */}
          <aside data-sf-reveal>
            <div className={styles.sideImgWrap}>
              <Image
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&q=80&fit=crop&auto=format"
                alt="Vehicle keys and documentation, representing the Meridian consignment process"
                fill
                sizes="(max-width: 1023px) 100vw, 42vw"
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div className={styles.sideTitle}>— What Happens Next</div>
            <div className={styles.nextSteps}>
              {NEXT_STEPS.map((step, i) => (
                <div key={i} className={styles.nextStep}>
                  <span className={styles.stepNum}>0{i + 1}</span>
                  <p className={styles.stepText}>{step}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
