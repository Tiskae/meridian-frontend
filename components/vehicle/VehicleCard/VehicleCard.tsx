"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Hairline from "@/components/ui/Hairline/Hairline";
import { urlFor } from "@/lib/sanity/image";
import { formatPrice, formatMileage } from "@/lib/format";
import type { VehicleCard as VehicleCardType } from "@/lib/sanity/types";
import { analytics } from "@/lib/analytics";
import styles from "./VehicleCard.module.scss";
import clsx from "clsx";

interface VehicleCardProps {
  vehicle: VehicleCardType;
  stampPrefix?: string;
}

const MAX_SLIDES = 5;

export default function VehicleCard({ vehicle: v, stampPrefix }: VehicleCardProps) {
  const rawImages = (v.images || []).filter((img) => img?.asset);
  const hasCarousel = rawImages.length > 1;
  const totalImages = v.imageCount ?? rawImages.length;
  const hasOverflow = totalImages > MAX_SLIDES;
  const slides = rawImages.slice(0, MAX_SLIDES);
  const slideCount = slides.length + (hasOverflow ? 1 : 0);

  const [activeIdx, setActiveIdx] = useState(0);
  const suppressClick = useRef(false);

  // Single-image fallback URL
  const singleUrl = v.image
    ? urlFor(v.image).width(600).quality(80).auto("format").url()
    : null;

  const goNext = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setActiveIdx((prev) => Math.min(prev + 1, slideCount - 1));
    },
    [slideCount],
  );

  const goPrev = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setActiveIdx((prev) => Math.max(prev - 1, 0));
    },
    [],
  );

  // Touch swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 40) {
      e.preventDefault();
      suppressClick.current = true;
      if (delta > 0 && activeIdx < slideCount - 1) setActiveIdx((p) => p + 1);
      if (delta < 0 && activeIdx > 0) setActiveIdx((p) => p - 1);
      setTimeout(() => { suppressClick.current = false; }, 100);
    }
  };

  // Mouse drag
  const mouseStartX = useRef(0);
  const isDragging = useRef(false);

  const onMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    isDragging.current = true;
  };
  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = mouseStartX.current - e.clientX;
    if (Math.abs(delta) > 40) {
      suppressClick.current = true;
      if (delta > 0 && activeIdx < slideCount - 1) setActiveIdx((p) => p + 1);
      if (delta < 0 && activeIdx > 0) setActiveIdx((p) => p - 1);
      setTimeout(() => { suppressClick.current = false; }, 100);
    }
  };

  // Keyboard on image area
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" && activeIdx < slideCount - 1) {
      e.preventDefault();
      setActiveIdx((p) => p + 1);
    }
    if (e.key === "ArrowLeft" && activeIdx > 0) {
      e.preventDefault();
      setActiveIdx((p) => p - 1);
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (suppressClick.current) {
      e.preventDefault();
      suppressClick.current = false;
      return;
    }
    analytics.vehicleCardClick(`${v.year} ${v.make.name} ${v.model}`);
  };

  const stamp = stampPrefix ? `${stampPrefix} · ${v.year}` : `${v.year} · ${v.bodyType}`;
  const href = `/vehicle/${v.slug.current}`;

  return (
    <Link href={href} className={styles.card} onClick={handleLinkClick}>
      <div
        className={styles.imageWrap}
        onTouchStart={hasCarousel ? onTouchStart : undefined}
        onTouchMove={hasCarousel ? onTouchMove : undefined}
        onTouchEnd={hasCarousel ? onTouchEnd : undefined}
        onMouseDown={hasCarousel ? onMouseDown : undefined}
        onMouseUp={hasCarousel ? onMouseUp : undefined}
        onKeyDown={hasCarousel ? onKeyDown : undefined}
        tabIndex={hasCarousel ? 0 : undefined}
      >
        {hasCarousel ? (
          <>
            {/* Slide track */}
            <div
              className={styles.slideTrack}
              style={{ transform: `translateX(-${activeIdx * 100}%)` }}
            >
              {slides.map((img, i) => (
                <div key={img._key || i} className={styles.slide}>
                  <Image
                    src={urlFor(img.asset).width(600).quality(80).auto("format").url()}
                    alt={`${v.make.name} ${v.model} — ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.slideImg}
                  />
                </div>
              ))}
              {hasOverflow && (
                <div className={styles.slide}>
                  <Image
                    src={urlFor(slides[0].asset).width(600).quality(60).auto("format").url()}
                    alt={`${v.make.name} ${v.model}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.slideImg}
                  />
                  <div className={styles.viewAllSlide}>
                    <span className={styles.viewAllCount}>+{totalImages - MAX_SLIDES}</span>
                    <span className={styles.viewAllText}>View all photos</span>
                  </div>
                </div>
              )}
            </div>

            {/* Arrows — desktop hover only */}
            {activeIdx > 0 && (
              <button
                className={clsx(styles.arrow, styles.arrowLeft)}
                onClick={goPrev}
                aria-label="Previous image"
              >
                &#8592;
              </button>
            )}
            {activeIdx < slideCount - 1 && (
              <button
                className={clsx(styles.arrow, styles.arrowRight)}
                onClick={goNext}
                aria-label="Next image"
              >
                &#8594;
              </button>
            )}

            {/* Dots */}
            <div className={styles.dots}>
              {Array.from({ length: slideCount }).map((_, i) => (
                <span
                  key={i}
                  className={clsx(styles.dot, activeIdx === i && styles.dotActive)}
                />
              ))}
            </div>
          </>
        ) : singleUrl ? (
          <Image
            src={singleUrl}
            alt={`${v.make.name} ${v.model}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>
            <span>Photography</span>
          </div>
        )}
      </div>

      <div className={styles.stamp}>{stamp}</div>

      <div className={styles.name}>
        {v.make.name}{" "}
        <em>
          {v.model}
          {v.trim ? ` ${v.trim}` : ""}
        </em>
      </div>

      <div className={styles.price}>{formatPrice(v.price, v.currency)}</div>

      <Hairline className={styles.divider} />

      <div className={styles.meta}>
        <div className={styles.specGroup}>
          <div className={styles.specRow}>
            <span className={styles.specKey}>Mileage</span>
            <span className={styles.specSep}>—</span>
            <span className={styles.specVal}>{formatMileage(v.mileage, v.mileageUnit)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
