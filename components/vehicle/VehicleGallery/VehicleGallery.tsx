'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import type { SanityVehicleImage } from '@/lib/sanity/types';
import styles from './VehicleGallery.module.scss';
import clsx from 'clsx';

interface VehicleGalleryProps {
  images: SanityVehicleImage[];
  vehicleName: string;
}

export default function VehicleGallery({ images: rawImages, vehicleName }: VehicleGalleryProps) {
  const images = useMemo(
    () => (rawImages || []).filter((img) => img?.asset),
    [rawImages],
  );

  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [preloaded, setPreloaded] = useState<Set<number>>(new Set([0]));
  const thumbsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Pre-compute all URLs once — single source of truth
  const urls = useMemo(() => {
    return images.map((img) => ({
      full: urlFor(img.asset).width(1400).quality(85).auto('format').url(),
      thumb: urlFor(img.asset).width(200).quality(70).auto('format').url(),
      side: urlFor(img.asset).width(600).quality(80).auto('format').url(),
    }));
  }, [images]);

  // Sequential background preloader — fires when gallery enters viewport
  useEffect(() => {
    if (images.length <= 1 || !galleryRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        // Preload images sequentially starting from index 1 (0 is already loaded via priority)
        let queue = images.map((_, i) => i).filter((i) => i !== 0);
        let cancelled = false;

        function loadNext() {
          if (cancelled || queue.length === 0) return;
          const idx = queue.shift()!;
          const img = new window.Image();
          img.src = urls[idx].full;
          img.onload = () => {
            if (cancelled) return;
            setPreloaded((prev) => new Set(prev).add(idx));
            // Small delay so we don't saturate bandwidth
            setTimeout(loadNext, 100);
          };
          img.onerror = () => {
            if (!cancelled) setTimeout(loadNext, 100);
          };
        }

        loadNext();
        return () => { cancelled = true; };
      },
      { threshold: 0.1 },
    );

    observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, [images, urls]);

  // Touch/swipe state for lightbox
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard nav
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') setLightboxOpen(false);
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowLeft') goPrev();
        return;
      }

      if (
        galleryRef.current?.contains(document.activeElement) ||
        document.activeElement === galleryRef.current
      ) {
        if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, goNext, goPrev]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!thumbsRef.current) return;
    const activeThumb = thumbsRef.current.children[activeIdx] as HTMLElement;
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIdx]);

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) goNext(); else goPrev();
    }
  };

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
    if (Math.abs(delta) > 50) {
      if (delta > 0) goNext(); else goPrev();
    }
  };

  if (images.length === 0) {
    return (
      <div className={styles.emptyGallery}>
        <span>No images available</span>
      </div>
    );
  }

  const sideImages = images.length > 1 ? images.slice(1, 3) : [];

  return (
    <>
      <div className={styles.gallery} ref={galleryRef} tabIndex={0}>
        {/* Asymmetric grid */}
        <div className={clsx(styles.grid, images.length === 1 && styles.gridSingle)}>
          <div
            className={styles.main}
            onClick={() => setLightboxOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="Open image gallery"
          >
            <Image
              src={urls[activeIdx].full}
              alt={images[activeIdx].alt || vehicleName}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className={styles.mainImg}
            />
            <div className={styles.mainOverlay}>
              <span>View Gallery</span>
            </div>
          </div>

          {sideImages.length > 0 && (
            <div className={styles.side}>
              {sideImages.map((img, i) => {
                const realIdx = i + 1;
                return (
                  <div
                    key={img._key || realIdx}
                    className={clsx(
                      styles.sideItem,
                      activeIdx === realIdx && styles.sideItemActive,
                    )}
                    onClick={() => setActiveIdx(realIdx)}
                  >
                    <Image
                      src={urls[realIdx].side}
                      alt={img.alt || `${vehicleName} — ${realIdx + 1}`}
                      fill
                      sizes="33vw"
                      className={styles.sideImg}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Scrollable thumbnail strip */}
        {images.length > 1 && (
          <div className={styles.thumbs} ref={thumbsRef}>
            {images.map((img, i) => (
              <div
                key={img._key || i}
                className={clsx(
                  styles.thumb,
                  activeIdx === i && styles.thumbActive,
                )}
                onClick={() => setActiveIdx(i)}
              >
                <Image
                  src={urls[i].thumb}
                  alt={img.alt || `Thumbnail ${i + 1}`}
                  fill
                  sizes="(max-width: 767px) 80px, (max-width: 1023px) 100px, 120px"
                  className={styles.thumbImg}
                />
                <span className={styles.thumbNum}>{i + 1}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── Lightbox ─────────────────────────────────────────────────── */}
      {lightboxOpen && (
        <div
          className={styles.lightbox}
          onClick={() => setLightboxOpen(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <button
            className={styles.lbClose}
            onClick={() => setLightboxOpen(false)}
            aria-label="Close gallery"
          >
            &times;
          </button>

          <div className={styles.lbCounter}>
            {activeIdx + 1} / {images.length}
          </div>

          {images.length > 1 && (
            <button
              className={clsx(styles.lbArrow, styles.lbArrowLeft)}
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Previous image"
            >
              &#8592;
            </button>
          )}

          {/* All images rendered, only active one visible — instant switching */}
          <div
            className={styles.lbImageWrap}
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, i) => (
              <div
                key={img._key || i}
                className={clsx(
                  styles.lbSlide,
                  i === activeIdx && styles.lbSlideActive,
                )}
              >
                {/* Render if: active, adjacent (for instant swiping), or preloaded */}
                {(i === activeIdx ||
                  i === (activeIdx + 1) % images.length ||
                  i === (activeIdx - 1 + images.length) % images.length ||
                  preloaded.has(i)) && (
                  <Image
                    src={urls[i].full}
                    alt={img.alt || `${vehicleName} — ${i + 1}`}
                    fill
                    sizes="(max-width: 1023px) 85vw, 75vw"
                    className={styles.lbImage}
                    priority={i === activeIdx}
                  />
                )}
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <button
              className={clsx(styles.lbArrow, styles.lbArrowRight)}
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="Next image"
            >
              &#8594;
            </button>
          )}

          {images.length > 1 && (
            <div className={styles.lbDots} onClick={(e) => e.stopPropagation()}>
              {images.map((_, i) => (
                <button
                  key={i}
                  className={clsx(styles.lbDot, activeIdx === i && styles.lbDotActive)}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
