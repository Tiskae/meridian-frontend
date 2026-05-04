"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Crosshair from "@/components/ui/Crosshair/Crosshair";
import Button from "@/components/ui/Button/Button";
import Hairline from "@/components/ui/Hairline/Hairline";
import { gsap, EASE, DUR_REVEAL, DUR_GALLERY } from "@/lib/motion";
import { urlFor } from "@/lib/sanity/image";
import { formatPrice, formatMileage } from "@/lib/format";
import type { VehicleCard } from "@/lib/sanity/types";
import styles from "./Hero.module.scss";

const SLIDE_INTERVAL = 6000;
const KEN_BURNS_DURATION = 8;

interface HeroProps {
  vehicles: VehicleCard[];
}

export default function Hero({ vehicles }: HeroProps) {
  const slides = vehicles.slice(0, 5);

  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const specRef = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  const goTo = useCallback((nextIdx: number) => {
    if (!sectionRef.current || !stripRef.current) return;

    const heroWidth = sectionRef.current.offsetWidth;

    gsap.to(stripRef.current, {
      x: -(nextIdx * heroWidth),
      duration: DUR_GALLERY,
      ease: EASE,
    });

    const imgs = stripRef.current.querySelectorAll<HTMLElement>("[data-hero-img]");
    imgs.forEach((img, i) => {
      gsap.killTweensOf(img);
      if (i === nextIdx) {
        gsap.fromTo(img, { scale: 1 }, { scale: 1.05, duration: KEN_BURNS_DURATION, ease: "none" });
      } else {
        gsap.set(img, { scale: 1 });
      }
    });

    if (specRef.current) {
      gsap.to(specRef.current, {
        opacity: 0,
        y: -12,
        duration: 0.25,
        ease: EASE,
        onComplete: () => {
          setCurrentIdx(nextIdx);
          gsap.fromTo(specRef.current!, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: DUR_REVEAL, ease: EASE });
        },
      });
    } else {
      setCurrentIdx(nextIdx);
    }
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setTimeout(() => goTo((currentIdx + 1) % slides.length), SLIDE_INTERVAL);
    return () => clearTimeout(timer);
  }, [currentIdx, slides.length, goTo]);

  useEffect(() => {
    if (didMount.current) return;
    didMount.current = true;
    if (!sectionRef.current) return;

    sectionRef.current.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      const delay = parseFloat(el.getAttribute("data-reveal") || "0");
      gsap.fromTo(
        el,
        { opacity: 0, y: 24, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: DUR_REVEAL, ease: EASE, delay },
      );
    });

    const firstImg = stripRef.current?.querySelector<HTMLElement>('[data-hero-img="0"]');
    if (firstImg) {
      gsap.fromTo(firstImg, { scale: 1 }, { scale: 1.05, duration: KEN_BURNS_DURATION, ease: "none" });
    }
  }, []);

  const v = slides[currentIdx];

  const specs: [string, string][] = v
    ? [
        ["Year", String(v.year)],
        ["Mileage", formatMileage(v.mileage, v.mileageUnit)],
        ["Condition", v.condition],
        ["Price", formatPrice(v.price, v.currency)],
      ]
    : [
        ["Year", "2024"],
        ["Engine", "6.0L W12 TSI"],
        ["Mileage", "4,200 km"],
        ["Price", "&#x20A6;520,000,000"],
      ];

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.bgWrap}>
        <div ref={stripRef} className={styles.bgStrip}>
          {slides.map((slide, i) => {
            const url = slide?.image ? urlFor(slide.image).width(1440).quality(80).auto("format").url() : null;
            return (
              <div key={slide?._id ?? i} className={styles.bgSlide}>
                {url ? (
                  <Image
                    src={url}
                    alt={slide ? `${slide.make?.name ?? ""} ${slide.model}` : "Featured vehicle"}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    style={{ objectFit: "cover", transformOrigin: "center center" }}
                    data-hero-img={i}
                  />
                ) : (
                  <div className={styles.bgPlaceholder} data-hero-img={i} />
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.bgOverlay} />
      </div>

      <Crosshair
        topLeft="6.453&#176;N  3.396&#176;E"
        bottomLeft="Victoria Island, Lagos"
        topRight="Vol. 01 &#8212; Spring 2026"
      />

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.sectionLabel} data-reveal="0.1">
            &#8212; Now in Showroom
          </div>
          <h1 className={styles.headline} data-reveal="0.2">
            Welcome to
            <em> Meridian Motors</em>
          </h1>
          <p className={styles.subline} data-reveal="0.35">
            Meridian Motors presents the finest brand new and clean foreign-used automobiles in Lagos, sourced,
            inspected, and presented with singular intention.
          </p>
          <div className={styles.ctaRow} data-reveal="0.45">
            <Button as="a" href="/inventory">
              View the Collection
            </Button>
            <Button as="a" href="/contact" variant="secondary">
              Book a Private Viewing
            </Button>
          </div>
        </div>

        <div className={styles.right} data-reveal="0.5">
          <div ref={specRef} className={styles.specPanel}>
            <div className={styles.featuredLabel}>&#8212; Featured Vehicle</div>
            <div className={styles.featuredName}>
              {v ? (
                <>
                  {v.make?.name}{" "}
                  <em>
                    {v.model}
                    {v.trim ? ` ${v.trim}` : ""}
                  </em>
                </>
              ) : (
                <>
                  Bentley <em>Bentayga EWB</em>
                </>
              )}
            </div>
            <Hairline className={styles.featuredDivider} />
            <div className={styles.specList}>
              {specs.map(([k, val]) => (
                <div key={k} className={styles.specRow}>
                  <span className={styles.specKey}>{k}</span>
                  <span className={styles.specSep}>&#8212;</span>
                  <span className={styles.specVal}>{val}</span>
                </div>
              ))}
            </div>
            {v?.slug?.current && (
              <Link href={`/vehicle/${v.slug.current}`} className={styles.featuredLink}>
                View Details
              </Link>
            )}
          </div>

          {slides.length > 1 && (
            <div className={styles.dots}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === currentIdx ? styles.dotActive : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
