"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap, EASE, DUR_REVEAL, DUR_GALLERY } from "@/lib/motion";
import styles from "./Testimonial.module.scss";

const TESTIMONIALS = [
  {
    quote:
      "They sourced a spec I couldn't find anywhere on the continent. Two weeks later it was in my garage, <em>perfectly presented</em>.",
    attribution: "Emeka N.",
    location: "Lekki Phase 1, Lagos",
    date: "18 February 2026",
  },
  {
    quote:
      "The paperwork was sorted before I even left the showroom. That kind of <em>quiet efficiency</em> is rare and it says everything about how they operate.",
    attribution: "Ngozi I.",
    location: "Victoria Island, Lagos",
    date: "27 April 2026",
  },
  {
    quote:
      "The only dealership in Lagos that treats the car as something worth <em>contemplating</em>. Every detail, every conversation is considered.",
    attribution: "Adebayo O.",
    location: "Victoria Island, Lagos",
    date: "14 March 2026",
  },
  {
    quote:
      "I've bought from dealers across London and Dubai. Meridian is the first in Lagos to match that <em>standard of discretion</em> no pressure, just precision.",
    attribution: "Funmilayo A.",
    location: "Ikoyi, Lagos",
    date: "2 January 2026",
  },
  {
    quote:
      "What separates Meridian is the <em>edit</em>. There are no bad choices in that showroom. Every car earns its place.",
    attribution: "Chukwuemeka B.",
    location: "Maitama, Abuja",
    date: "5 April 2026",
  },
];

const SLIDE_INTERVAL = 6000;

export default function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const didReveal = useRef(false);
  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      if (!trackRef.current) return;
      const slides = slideRefs.current;

      gsap.to(trackRef.current, {
        x: -(next * 100) + "%",
        duration: DUR_GALLERY,
        ease: EASE,
      });

      // Fade out old, fade in new
      if (slides[current]) {
        gsap.to(slides[current], { opacity: 0, duration: 0.3, ease: EASE });
      }
      if (slides[next]) {
        gsap.fromTo(
          slides[next],
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: DUR_REVEAL, ease: EASE, delay: 0.2 },
        );
      }

      setCurrent(next);
    },
    [current],
  );

  // Auto-advance
  useEffect(() => {
    if (TESTIMONIALS.length <= 1) return;
    const timer = setTimeout(() => goTo((current + 1) % TESTIMONIALS.length), SLIDE_INTERVAL);
    return () => clearTimeout(timer);
  }, [current, goTo]);

  // Scroll-triggered entry reveal
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-t-label]",
        { opacity: 0 },
        {
          opacity: 1,
          duration: DUR_REVEAL,
          ease: EASE,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        },
      );
      gsap.fromTo(
        "[data-t-track]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              didReveal.current = true;
            },
          },
        },
      );
      gsap.fromTo(
        "[data-t-dots]",
        { opacity: 0 },
        {
          opacity: 1,
          duration: DUR_REVEAL,
          ease: EASE,
          delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.label} data-t-label>
        &#8212; Testimonials
      </div>

      <div className={styles.carousel} data-t-track>
        <div ref={trackRef} className={styles.track}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className={styles.slide}
              aria-hidden={i !== current}
            >
              <blockquote className={styles.quote} dangerouslySetInnerHTML={{ __html: `\u201c${t.quote}\u201d` }} />
              <div className={styles.attribution}>
                &#8212; {t.attribution}, {t.location} &middot; {t.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dots} data-t-dots>
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
