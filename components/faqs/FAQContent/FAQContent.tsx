"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { gsap, EASE, DUR_REVEAL } from "@/lib/motion";
import styles from "./FAQContent.module.scss";

const CATEGORIES = [
  {
    label: "Buying & Viewing",
    items: [
      {
        question: "How do I arrange a viewing of a vehicle?",
        answer:
          "All viewings are by private appointment. You can request a viewing through our contact page, by calling us directly, or by messaging on WhatsApp. We will arrange a time that suits you, typically within 24–48 hours.",
      },
      {
        question: "Can I test drive a vehicle before purchasing?",
        answer:
          "Yes. All vehicles are available for a supervised test drive during your appointment. We ask that you bring a valid driving licence. For higher-value vehicles, we may request proof of purchase intent.",
      },
      {
        question: "Do you offer independent inspection reports?",
        answer:
          "Every vehicle in our collection has been inspected against our 187-point checklist by independent engineers. The full report is available on request before your visit, and a copy is provided with every purchase.",
      },
      {
        question: "What documentation comes with a vehicle?",
        answer:
          "All vehicles come with their service history (where available), the independent inspection report, proof of ownership documentation, and assistance with Lagos state registration transfer.",
      },
    ],
  },
  {
    label: "Financing & Payments",
    items: [
      {
        question: "Do you offer vehicle financing?",
        answer:
          "Yes. We work with partner institutions including Stanbic IBTC, Access Bank, GTBank, and First Bank to offer structured financing arrangements. Use the calculator on our financing page for an indicative monthly figure, then submit an enquiry to begin the process.",
      },
      {
        question: "What deposit is required for financing?",
        answer:
          "Minimum deposit is typically 20% of the vehicle value, though this varies by institution and applicant profile. Pre-approval takes 3–5 business days.",
      },
      {
        question: "Can I pay in full without financing?",
        answer:
          "Yes, and this is the most straightforward path. We accept bank transfers. Full payment details are provided at the point of agreement — we do not accept cash transactions above ₦5 million.",
      },
    ],
  },
  {
    label: "Selling & Consignment",
    items: [
      {
        question: "How does consignment work?",
        answer:
          "You submit your vehicle details through our Sell page. Our acquisitions team reviews the submission, arranges an inspection if the vehicle meets our criteria, then manages the listing, viewings, and sale on your behalf. Our commission is agreed upfront and deducted from the sale proceeds.",
      },
      {
        question: "Do you buy vehicles outright?",
        answer:
          "Yes, in select cases. If your vehicle fits our current acquisition focus and the valuation is agreed, we can purchase outright. This is typically faster than consignment but the offer will reflect the market and our own resale margin.",
      },
      {
        question: "What vehicles do you accept for consignment?",
        answer:
          "We focus on European prestige marques (Mercedes-Benz, BMW, Porsche, Range Rover, Bentley, Rolls-Royce, Aston Martin) and select Japanese luxury vehicles. Age, condition, and service history are key factors. Fewer than one in eight vehicles submitted meets our standard.",
      },
    ],
  },
  {
    label: "Delivery & After-Sale",
    items: [
      {
        question: "Do you deliver vehicles outside Lagos?",
        answer:
          "Yes. We deliver nationwide and to some select African cities outside of Nigeria. Delivery is at the buyer's cost and arranged through insured logistics partners. Estimated transit time is 2–4 business days for most destinations.",
      },
      {
        question: "What after-sale support do you provide?",
        answer:
          "We maintain a relationship with every client after purchase. If you encounter any issue with a vehicle in the 30 days following handover that was not disclosed at the time of sale, we will work to resolve it at our cost.",
      },
      {
        question: "Do you handle insurance?",
        answer:
          "We can introduce you to specialist motor insurance providers and assist with the process, but we are not an insurance broker. Comprehensive insurance is strongly recommended for all vehicles in our collection.",
      },
    ],
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.item}>
      <button className={styles.itemBtn} onClick={onToggle} aria-expanded={isOpen}>
        <span className={styles.question}>{question}</span>
        <span
          className={styles.chevron}
          style={{ transform: isOpen ? "rotate(-135deg)" : "rotate(45deg)", marginTop: isOpen ? "6px" : "0" }}
        />
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? (contentRef.current?.scrollHeight ?? 400) + "px" : "0px",
          overflow: "hidden",
          transition: "max-height 500ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className={styles.answer}>
          <p className={styles.answerText}>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-faq-accordion]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        "[data-faq-sidebar]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  let globalIdx = 0;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.grid}>
        {/* Accordion */}
        <div data-faq-accordion>
          {CATEGORIES.map((cat, catIdx) => {
            return (
              <div key={cat.label}>
                <div className={`${styles.catLabel} ${catIdx === 0 ? styles.catLabelFirst : ""}`}>{cat.label}</div>
                <div className={styles.border}>
                  {cat.items.map((item) => {
                    const idx = globalIdx++;
                    return (
                      <FAQItem
                        key={item.question}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openIdx === idx}
                        onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar} data-faq-sidebar>
          <div className={styles.sideImgWrap}>
            <Image
              src="/images/showroom-with-ceo.jpeg"
              alt="Meridian Motors showroom, available for private viewing appointments"
              fill
              sizes="(max-width: 1023px) 100vw, 42vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className={styles.sideLabel}>— Still Have Questions?</div>
          <p className={styles.sideBody}>
            Our team is available Monday to Friday, 10:00–18:00, and by appointment on Saturdays.
          </p>

          <div className={styles.sideContacts}>
            <div className={styles.sideContactRow}>
              <div className={styles.sideLabel}>WhatsApp</div>
              <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={styles.sideLink}>
                +234 912 044 8767
              </a>
            </div>
            <div className={styles.sideContactRow}>
              <div className={styles.sideLabel}>Telephone</div>
              <div className={styles.sideValue}>+234 912 044 8767</div>
            </div>
            <div className={styles.sideContactRow}>
              <div className={styles.sideLabel}>Email</div>
              <div className={styles.sideValue}>hello@meridianmotors.ng</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
