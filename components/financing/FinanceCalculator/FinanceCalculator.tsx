"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import SectionLabel from "@/components/ui/SectionLabel/SectionLabel";
import Hairline from "@/components/ui/Hairline/Hairline";
import { gsap, EASE, DUR_REVEAL } from "@/lib/motion";
import { analytics } from "@/lib/analytics";
import styles from "./FinanceCalculator.module.scss";

function formatNaira(value: number): string {
  if (value >= 1_000_000_000) return `₦${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}M`;
  return `₦${value.toLocaleString()}`;
}

export default function FinanceCalculator() {
  const sectionRef = useRef<HTMLElement>(null);

  const [vehiclePrice, setVehiclePrice] = useState(200_000_000);
  const [depositPct, setDepositPct] = useState(20);
  const [term, setTerm] = useState(24);
  const [formData, setFormData] = useState({ name: "", phone: "", vehicle: "", deposit: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const annualRate = 0.18;
  const monthlyRate = annualRate / 12;
  const loanAmount = vehiclePrice * (1 - depositPct / 100);
  const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  const totalCost = monthlyPayment * term + vehiclePrice * (depositPct / 100);
  const totalInterest = totalCost - vehiclePrice;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-fc-reveal]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          stagger: 0.15,
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

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    analytics.financeEnquiry();
    setFormSubmitted(true);
  }

  return (
    <section ref={sectionRef} className={styles.section}>
      <div data-fc-reveal>
        <SectionLabel title="Vehicle Financing" number="— 01" />
        <Hairline className={styles.headerDivider} />
      </div>

      <div className={styles.grid}>
        {/* Left — Calculator */}
        <div data-fc-reveal>
          <div className={styles.sliderRow}>
            <div className={styles.sliderMeta}>
              <span className={styles.sliderLabel}>Vehicle Price</span>
              <span className={styles.sliderValue}>{formatNaira(vehiclePrice)}</span>
            </div>
            <input
              type="range"
              className={styles.slider}
              min={20_000_000}
              max={1_500_000_000}
              step={5_000_000}
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(Number(e.target.value))}
              aria-label="Vehicle price"
            />
          </div>

          <div className={styles.sliderRow}>
            <div className={styles.sliderMeta}>
              <span className={styles.sliderLabel}>Deposit</span>
              <span className={styles.sliderValue}>
                {depositPct}%{" "}
                <span className={styles.sliderSub}>({formatNaira((vehiclePrice * depositPct) / 100)})</span>
              </span>
            </div>
            <input
              type="range"
              className={styles.slider}
              min={20}
              max={80}
              step={5}
              value={depositPct}
              onChange={(e) => setDepositPct(Number(e.target.value))}
              aria-label="Deposit percentage"
            />
          </div>

          <div className={styles.sliderRow}>
            <div className={styles.sliderMeta}>
              <span className={styles.sliderLabel}>Loan Term</span>
              <span className={styles.sliderValue}>{term} months</span>
            </div>
            <input
              type="range"
              className={styles.slider}
              min={12}
              max={60}
              step={6}
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              aria-label="Loan term in months"
            />
          </div>

          <div className={styles.resultDivider}>
            <div className={styles.resultLabel}>Estimated Monthly Payment</div>
            <div className={styles.resultAmount}>{formatNaira(monthlyPayment)}</div>
            <div className={styles.resultMeta}>
              18% p.a. · {term} months · {depositPct}% deposit · Subject to approval
            </div>

            <div className={styles.breakdown}>
              <div className={styles.breakStat}>
                <div className={styles.breakLabel}>Loan Amount</div>
                <div className={styles.breakValue}>{formatNaira(loanAmount)}</div>
              </div>
              <div className={styles.breakStat}>
                <div className={styles.breakLabel}>Total Interest</div>
                <div className={styles.breakValue}>{formatNaira(totalInterest)}</div>
              </div>
              <div className={styles.breakStat}>
                <div className={styles.breakLabel}>Total Cost</div>
                <div className={styles.breakValue}>{formatNaira(totalCost)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Image + Form */}
        <div data-fc-reveal>
          <div className={styles.imgWrap}>
            <Image
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Calculator image"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className={styles.formLabel}>— Enquire About Financing</div>

          {formSubmitted ? (
            <div className={styles.submitted}>
              <p className={styles.submittedHead}>
                Enquiry <em>received</em>.
              </p>
              <p className={styles.submittedBody}>
                Our team will be in touch within one business day to discuss your financing options.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div className={styles.formGrid}>
                <div>
                  <label className={styles.label} htmlFor="fc-name">
                    Full Name
                  </label>
                  <input
                    id="fc-name"
                    name="name"
                    type="text"
                    className={styles.input}
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="fc-phone">
                    Phone
                  </label>
                  <input
                    id="fc-phone"
                    name="phone"
                    type="tel"
                    className={styles.input}
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className={styles.fieldFull}>
                  <label className={styles.label} htmlFor="fc-vehicle">
                    Vehicle of Interest
                  </label>
                  <input
                    id="fc-vehicle"
                    name="vehicle"
                    type="text"
                    className={styles.input}
                    value={formData.vehicle}
                    onChange={handleFormChange}
                    placeholder="e.g. 2022 Porsche 911 Carrera S"
                  />
                </div>
                <div className={styles.fieldFull}>
                  <label className={styles.label} htmlFor="fc-deposit">
                    Preferred Deposit %
                  </label>
                  <input
                    id="fc-deposit"
                    name="deposit"
                    type="text"
                    className={styles.input}
                    value={formData.deposit}
                    onChange={handleFormChange}
                    placeholder={`${depositPct}%(from calculator)`}
                  />
                </div>
                <div className={styles.fieldFull}>
                  <Button type="submit" className={styles.submitBtn}>
                    Submit Finance Enquiry
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
