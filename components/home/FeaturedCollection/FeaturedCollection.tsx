"use client";

import { useRef, useEffect } from "react";
import SectionLabel from "@/components/ui/SectionLabel/SectionLabel";
import Hairline from "@/components/ui/Hairline/Hairline";
import VehicleCard from "@/components/vehicle/VehicleCard/VehicleCard";
import { gsap, EASE, DUR_REVEAL } from "@/lib/motion";
import type { VehicleCard as VehicleCardType } from "@/lib/sanity/types";
import styles from "./FeaturedCollection.module.scss";

interface FeaturedCollectionProps {
  vehicles: VehicleCardType[];
}

export default function FeaturedCollection({ vehicles }: FeaturedCollectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-fc-header]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        "[data-fc-card]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (vehicles.length === 0) return null;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div data-fc-header>
        <SectionLabel number="— 01" title="Featured Vehicles" right="View the Collection" rightLink="/inventory" />
        <Hairline className={styles.headerDivider} />
      </div>

      <div className={styles.grid}>
        {vehicles.map((v) => (
          <div key={v._id} data-fc-card>
            <VehicleCard vehicle={v} stampPrefix={v.featured ? "— Featured" : "— Now in Showroom"} />
          </div>
        ))}
      </div>
    </section>
  );
}
