"use client";

import { useRef, useEffect } from "react";
import { gsap, EASE, DUR_REVEAL } from "@/lib/motion";
import styles from "./ContactMap.module.scss";
import Button from "@/components/ui/Button/Button";

export default function ContactMap() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-cg-img]",
        { opacity: 0 },
        {
          opacity: 1,
          duration: DUR_REVEAL,
          ease: EASE,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <div className={styles.mapWrap}>
        <iframe
          className={styles.mapFrame}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7213!2d3.4196!3d6.4281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53aec4dd92f%3A0x9c1a4e8e3e3e3e3e!2sKofo%20Abayomi%20Street%2C%20Victoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1683000000000!5m2!1sen!2sng"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Meridian Motors — No. 4 Kofo Abayomi Street, Victoria Island, Lagos"
        />
        <Button
          href="https://www.google.com/maps/dir/?api=1&destination=Kofo+Abayomi+Street,+Victoria+Island,+Lagos,+Nigeria"
          as="a"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.directions}
        >
          <span className={styles.directionsIcon}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6.375 12c-0.027 0-0.054-0.003-0.081-0.009-0.172-0.038-0.294-0.19-0.294-0.366v-5.625h-5.625c-0.176 0-0.328-0.122-0.366-0.294s0.048-0.347 0.208-0.421l11.25-5.25c0.143-0.067 0.312-0.037 0.424 0.075s0.141 0.281 0.075 0.424l-5.25 11.25c-0.063 0.134-0.197 0.216-0.34 0.216zM2.065 5.25h4.31c0.207 0 0.375 0.168 0.375 0.375v4.31l4.099-8.784-8.784 4.099z"></path>
            </svg>
          </span>
          Get Directions
        </Button>
      </div>
    </div>
  );
}
