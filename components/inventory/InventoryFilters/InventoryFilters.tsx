"use client";

import styles from "./InventoryFilters.module.scss";
import clsx from "clsx";

export type SortOption = "newest" | "price-asc" | "price-desc" | "mileage";

interface InventoryFiltersProps {
  bodyTypes: string[];
  activeBody: string;
  onBodyChange: (body: string) => void;
  makes: { name: string; slug: string }[];
  activeMake: string;
  onMakeChange: (make: string) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
}

export default function InventoryFilters({
  bodyTypes,
  activeBody,
  onBodyChange,
  makes,
  activeMake,
  onMakeChange,
  sort,
  onSortChange,
  resultCount,
}: InventoryFiltersProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        {/* Body type pills */}
        <div className={styles.group}>
          <span className={styles.groupLabel}>Body</span>
          <div className={styles.pills}>
            {bodyTypes.map((t) => (
              <button
                key={t}
                className={clsx(styles.pill, activeBody === t && styles.pillActive)}
                onClick={() => onBodyChange(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.separator} />

        {/* Make dropdown */}
        <div className={styles.group}>
          <span className={styles.groupLabel}>Make</span>
          <select
            value={activeMake}
            onChange={(e) => onMakeChange(e.target.value)}
            className={clsx(styles.select, activeMake !== "All" && styles.selectActive)}
          >
            <option value="All">All</option>
            {makes.map((m) => (
              <option key={m.slug} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort — pushed right */}
        <div className={styles.sortGroup}>
          <span className={styles.groupLabel}>Sort</span>
          <select value={sort} onChange={(e) => onSortChange(e.target.value as SortOption)} className={styles.select}>
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="mileage">Lowest Mileage</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className={styles.count}>
        <span>
          {resultCount} vehicle{resultCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
