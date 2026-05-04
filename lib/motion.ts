import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const EASE = 'power3.out'; // closest GSAP equivalent to cubic-bezier(0.16, 1, 0.3, 1)
export const DUR_REVEAL = 0.8;
export const DUR_HOVER = 0.5;
export const DUR_GALLERY = 1.2;

export function createRevealAnimation(
  element: Element,
  options?: { delay?: number },
) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 24, filter: 'blur(8px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: DUR_REVEAL,
      ease: EASE,
      delay: options?.delay ?? 0,
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        once: true,
      },
    },
  );
}

export function createStaggerReveal(
  parent: Element,
  children: string,
  options?: { stagger?: number },
) {
  return gsap.fromTo(
    parent.querySelectorAll(children),
    { opacity: 0, y: 24, filter: 'blur(8px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: DUR_REVEAL,
      ease: EASE,
      stagger: options?.stagger ?? 0.1,
      scrollTrigger: {
        trigger: parent,
        start: 'top 90%',
        once: true,
      },
    },
  );
}
