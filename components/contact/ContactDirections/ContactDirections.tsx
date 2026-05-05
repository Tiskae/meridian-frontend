"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel/SectionLabel";
import { gsap, EASE, DUR_REVEAL } from "@/lib/motion";
import styles from "./ContactDirections.module.scss";

const STRIP_IMAGES = [
  {
    src: "/images/showroom-with-ceo.jpeg",
    alt: "Luxury vehicle in showroom",
  },
  {
    src: "/images/showroom-with-team.png",
    alt: "Luxury car exterior, side profile",
  },
  // {
  //   src: "/images/showroom-with-hoa.png",
  //   alt: "Luxury vehicle front view at showroom",
  // },
  {
    src: "/images/showroom-with-hcr.png",
    alt: "Prestige vehicle detail, rear view",
  },
];

const DIRECTIONS = [
  {
    from: "From Lekki",
    text: "Take the Lekki-Epe Expressway westbound. Exit at the Ozumba Mbadiwe roundabout. Turn left onto Kofo Abayomi Street. No. 4 is approximately 300m on your right.",
  },
  {
    from: "From Ikoyi",
    text: "Cross the Falomo Bridge onto Victoria Island. Continue straight on Kingsway Road, then turn right onto Kofo Abayomi Street at the first major junction. The showroom is 200m ahead.",
  },
  {
    from: "From the Mainland",
    text: "Cross Carter Bridge or Third Mainland Bridge towards Lagos Island. Continue through Marina, then take Bade Street south onto Victoria Island. Follow Kofo Abayomi Street signs.",
  },
];

export default function ContactDirections() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-cd-left]",
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
        "[data-cd-right]",
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

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.strip}>
        {STRIP_IMAGES.map((img, i) => (
          <div key={i} className={styles.stripImg} data-cg-img>
            <Image src={img.src} alt={img.alt} fill sizes="(max-width: 1023px) 100vw, 33vw" style={{ objectFit: "cover" }} />
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        <div data-cd-left>
          <SectionLabel title="Getting Here" dark />
          <h2 className={styles.headline}>
            No. 4 Kofo Abayomi Street,
            <br />
            <em>Victoria Island</em>.
          </h2>

          {DIRECTIONS.map((d) => (
            <div key={d.from} className={styles.dirRow}>
              <div className={styles.from}>{d.from}</div>
              <p className={styles.directions}>{d.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.imgWrap} data-cd-right>
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80&fit=crop&auto=format"
            alt="Street view near Victoria Island, Lagos, showing the route to Meridian Motors"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
