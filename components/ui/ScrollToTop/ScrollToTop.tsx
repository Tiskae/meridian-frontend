'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from '@/lib/motion';

/**
 * Kills all active GSAP ScrollTrigger instances and resets the window
 * scroll position on every client-side route change.
 *
 * Root cause without this: Next.js App Router keeps the layout mounted
 * across navigations, so ScrollTrigger instances from the previous page
 * remain alive and hold a stale scroll offset that fights window.scrollTo.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Kill every active ScrollTrigger so stale page triggers can't
    //    interfere with the incoming page's scroll position.
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // 2. Reset to top — do this after kills so nothing can override it.
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
