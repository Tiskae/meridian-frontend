'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, EASE } from '@/lib/motion';
import styles from './SplashScreen.module.scss';

const SESSION_KEY = 'meridian_splash_seen';

const WORD1 = 'MERIDIAN';
const WORD2 = 'MOTORS';

export default function SplashScreen() {
  // ssr:false guarantees this only runs on the client, so sessionStorage is
  // always available here. active=false on repeat visits → returns null
  // immediately, zero flash.
  const [active] = useState<boolean>(() => !sessionStorage.getItem(SESSION_KEY));
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    // Mark seen before anything async can interrupt
    sessionStorage.setItem(SESSION_KEY, '1');

    // Restore page visibility (hidden by the inline <script> in layout)
    // The white overlay is already painted, so the page beneath stays hidden.
    document.documentElement.style.visibility = 'visible';
    document.body.style.overflow = 'hidden';

    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // ── 1. Hairline draws out from centre ─────────────────────────────
      tl.fromTo(
        '[data-s-line]',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.9, ease: 'power2.out' },
        0,
      );

      // ── 2. "MERIDIAN" — each char rises from below with blur ──────────
      tl.fromTo(
        '[data-s-w1] [data-s-char]',
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.75,
          ease: EASE,
          stagger: { amount: 0.45, from: 'start' },
        },
        0.3,
      );

      // ── 3. "MOTORS" — settles in with letter-spacing collapsing ───────
      tl.fromTo(
        '[data-s-w2] [data-s-char]',
        { opacity: 0, y: 18, filter: 'blur(4px)', letterSpacing: '1em' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          letterSpacing: '0.55em',
          duration: 0.65,
          ease: EASE,
          stagger: { amount: 0.35, from: 'start' },
        },
        0.85,
      );

      // ── 4. Tagline fades in ────────────────────────────────────────────
      tl.fromTo(
        '[data-s-tag]',
        { opacity: 0 },
        { opacity: 0.45, duration: 0.6, ease: 'power1.out' },
        1.5,
      );

      // ── 5. Hold ───────────────────────────────────────────────────────
      tl.to({}, { duration: 1.1 });

      // ── 6. Inner content blurs out ────────────────────────────────────
      tl.to('[data-s-inner]', {
        opacity: 0,
        y: -32,
        filter: 'blur(6px)',
        duration: 0.55,
        ease: 'power2.in',
      });

      // ── 7. Curtain lifts — reveals page beneath ───────────────────────
      tl.to(
        el,
        {
          y: '-100%',
          duration: 0.75,
          ease: 'power3.inOut',
          onComplete: () => {
            document.body.style.overflow = '';
          },
        },
        '-=0.1',
      );
    }, el);

    return () => ctx.revert();
  }, [active]);

  if (!active) return null;

  return (
    <div ref={rootRef} className={styles.splash} aria-hidden="true">
      <div className={styles.inner} data-s-inner>

        <div className={styles.lineWrap}>
          <div className={styles.line} data-s-line />
        </div>

        <div className={styles.wordmark}>
          <div className={styles.word1} data-s-w1>
            {WORD1.split('').map((c, i) => (
              <span key={i} className={styles.char} data-s-char>
                {c}
              </span>
            ))}
          </div>
          <div className={styles.word2} data-s-w2>
            {WORD2.split('').map((c, i) => (
              <span key={i} className={styles.char} data-s-char>
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.tagline} data-s-tag>
          Est. 2018 &nbsp;&middot;&nbsp; Victoria Island, Lagos
        </div>

      </div>
    </div>
  );
}
