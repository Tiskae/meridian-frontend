'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import InventoryFilters, {
  type SortOption,
} from '@/components/inventory/InventoryFilters/InventoryFilters';
import VehicleCard from '@/components/vehicle/VehicleCard/VehicleCard';
import { gsap, EASE, DUR_REVEAL } from '@/lib/motion';
import type { VehicleCard as VehicleCardType, SanityMake } from '@/lib/sanity/types';
import styles from './InventoryGrid.module.scss';

interface InventoryGridProps {
  vehicles: VehicleCardType[];
  makes: SanityMake[];
}

export default function InventoryGrid({ vehicles, makes }: InventoryGridProps) {
  const [activeBody, setActiveBody] = useState('All');
  const [activeMake, setActiveMake] = useState('All');
  const [sort, setSort] = useState<SortOption>('price-desc');
  const gridRef = useRef<HTMLDivElement>(null);

  // Derive body types from data
  const bodyTypes = useMemo(() => {
    const types = Array.from(new Set(vehicles.map((v) => v.bodyType).filter(Boolean)));
    types.sort();
    return ['All', ...types];
  }, [vehicles]);

  // Filter + sort
  const filtered = useMemo(() => {
    let result = vehicles.filter(
      (v) =>
        (activeBody === 'All' || v.bodyType === activeBody) &&
        (activeMake === 'All' || v.make.name === activeMake),
    );

    switch (sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case 'mileage':
        result = [...result].sort((a, b) => a.mileage - b.mileage);
        break;
      case 'newest':
      default:
        result = [...result].sort(
          (a, b) =>
            new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime(),
        );
        break;
    }

    return result;
  }, [vehicles, activeBody, activeMake, sort]);

  // GSAP stagger on mount + filter change
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('[data-inv-card]');
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: DUR_REVEAL,
        ease: EASE,
        stagger: 0.08,
      },
    );
  }, [filtered]);

  return (
    <>
      <InventoryFilters
        bodyTypes={bodyTypes}
        activeBody={activeBody}
        onBodyChange={setActiveBody}
        makes={makes.map((m) => ({ name: m.name, slug: m.slug.current }))}
        activeMake={activeMake}
        onMakeChange={setActiveMake}
        sort={sort}
        onSortChange={setSort}
        resultCount={filtered.length}
      />

      <div ref={gridRef} className={styles.gridWrapper}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyTitle}>
              No vehicles match your criteria.
            </div>
            <div className={styles.emptyBody}>Try adjusting your filters.</div>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((v) => (
              <div key={v._id} data-inv-card>
                <VehicleCard vehicle={v} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
