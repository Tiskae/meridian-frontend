import type { SanityVehicle, SanityFeature } from "@/lib/sanity/types";
import { formatMileage, formatPrice } from "@/lib/format";
import styles from "./VehicleSpecs.module.scss";

const CATEGORY_ORDER = [
  "Interior",
  "Exterior",
  "Performance",
  "Safety",
  "Technology",
  "Comfort",
  "Convenience",
] as const;

function groupFeaturesByCategory(features: SanityFeature[]) {
  const grouped = new Map<string, SanityFeature[]>();

  for (const feature of features) {
    const cat = feature.category || "Other";
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)!.push(feature);
  }

  // Return in editorial order, skipping empty categories
  return CATEGORY_ORDER.filter((cat) => grouped.has(cat)).map((cat) => ({ category: cat, items: grouped.get(cat)! }));
}

interface VehicleSpecsProps {
  vehicle: SanityVehicle;
}

export default function VehicleSpecs({ vehicle: v }: VehicleSpecsProps) {
  const specs: [string, string | undefined][] = [
    ["Make", v.make.name],
    ["Model", v.model],
    ["Trim", v.trim],
    ["Year", String(v.year)],
    ["Engine", v.engineDescription],
    ["Engine Layout", v.engineLayout],
    ["Power", v.horsepower ? `${v.horsepower} bhp` : undefined],
    ["Transmission", v.transmissionDetails || v.transmission],
    ["Drivetrain", v.drivetrain],
    ["Fuel", v.fuel],
    ["Mileage", formatMileage(v.mileage, v.mileageUnit)],
    ["Exterior", v.exteriorColor],
    ["Interior", v.interiorColor],
    ["Condition", v.condition],
    ["Customs", v.customsStatus],
    ["Price", formatPrice(v.price, v.currency)],
    ["Stock No.", v._id.slice(-6).toUpperCase()],
  ];

  const visibleSpecs = specs.filter(([, val]) => val && val !== "—");

  const features: SanityFeature[] = v.features || [];

  return (
    <div className={styles.wrapper}>
      {/* Description blockquote */}
      {v.description && <blockquote className={styles.description}>&ldquo;{v.description}&rdquo;</blockquote>}

      {/* Highlights */}
      {v.highlights && v.highlights.length > 0 && (
        <>
          <div className={styles.sectionLabel}>— Highlights</div>
          <div className={styles.highlights}>
            {v.highlights.map((h, i) => (
              <div key={i} className={styles.highlightItem}>
                {h}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Specifications */}
      <div className={styles.sectionLabel}>— Specifications</div>
      <div className={styles.specList}>
        {visibleSpecs.map(([key, val]) => (
          <div key={key} className={styles.specRow}>
            <span className={styles.specKey}>{key}</span>
            <span className={styles.specSep}>—</span>
            <span className={styles.specVal}>{val}</span>
          </div>
        ))}
      </div>

      {/* Features — grouped by category */}
      {features.length > 0 && (
        <div className={styles.featuresSection}>
          <div className={styles.sectionLabel}>— Features &amp; Equipment</div>
          {groupFeaturesByCategory(features).map(({ category, items }) => (
            <div key={category} className={styles.featureGroup}>
              <div className={styles.featureCategoryLabel}>{category}</div>
              <div className={styles.featureGrid}>
                {items.map((f, i) => (
                  <div key={f._id || i} className={styles.featureItem} data-index={i}>
                    {f.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
