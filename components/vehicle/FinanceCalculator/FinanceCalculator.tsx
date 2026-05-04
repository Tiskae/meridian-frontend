"use client";

import { useState, useMemo } from "react";
import { formatPrice } from "@/lib/format";
import styles from "./FinanceCalculator.module.scss";

interface FinanceCalculatorProps {
  price: number;
  currency?: string;
}

const DEPOSIT_OPTIONS = [10, 20, 30, 40, 50, 60, 70, 80];
const TERM_OPTIONS = [12, 24, 36, 48, 60];
const INTEREST_RATE = 0.18; // 18% annual — representative Nigerian auto finance

export default function FinanceCalculator({ price, currency = "NGN" }: FinanceCalculatorProps) {
  const [depositPct, setDepositPct] = useState(20);
  const [termMonths, setTermMonths] = useState(48);

  const monthly = useMemo(() => {
    const principal = price * (1 - depositPct / 100);
    const monthlyRate = INTEREST_RATE / 12;
    const n = termMonths;

    if (monthlyRate === 0) return principal / n;

    return (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  }, [price, depositPct, termMonths]);

  const deposit = price * (depositPct / 100);

  return (
    <div className={styles.calculator}>
      <div className={styles.label}>— Finance Estimate</div>

      <div className={styles.monthly}>From {formatPrice(Math.round(monthly), currency)} / month</div>

      <div className={styles.terms}>
        {termMonths} months &middot; {depositPct}% deposit &middot; subject to approval
      </div>

      {/* Deposit slider */}
      <div className={styles.sliderGroup}>
        <div className={styles.sliderHeader}>
          <span className={styles.sliderLabel}>Deposit</span>
          <span className={styles.sliderValue}>
            {depositPct}% — {formatPrice(Math.round(deposit), currency)}
          </span>
        </div>
        <input
          type="range"
          min={10}
          max={80}
          step={5}
          value={depositPct}
          onChange={(e) => setDepositPct(Number(e.target.value))}
          className={styles.slider}
        />
        <div className={styles.sliderTicks}>
          {DEPOSIT_OPTIONS.map((d) => (
            <span key={d}>{d}%</span>
          ))}
        </div>
      </div>

      {/* Term slider */}
      <div className={styles.sliderGroup}>
        <div className={styles.sliderHeader}>
          <span className={styles.sliderLabel}>Term</span>
          <span className={styles.sliderValue}>{termMonths} months</span>
        </div>
        <input
          type="range"
          min={12}
          max={60}
          step={12}
          value={termMonths}
          onChange={(e) => setTermMonths(Number(e.target.value))}
          className={styles.slider}
        />
        <div className={styles.sliderTicks}>
          {TERM_OPTIONS.map((t) => (
            <span key={t}>{t}mo</span>
          ))}
        </div>
      </div>

      <div className={styles.disclaimer}>
        Representative example. Rates subject to credit assessment and lender terms.
      </div>
    </div>
  );
}
