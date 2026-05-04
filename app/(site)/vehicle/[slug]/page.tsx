import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/lib/sanity/client";
import { vehicleBySlugQuery, vehicleSlugsQuery, relatedVehiclesQuery } from "@/lib/sanity/queries";
import { formatPrice } from "@/lib/format";
import { buildVehicleWhatsAppUrl } from "@/lib/whatsapp";
import type { SanityVehicle, VehicleCard } from "@/lib/sanity/types";
import VehicleGallery from "@/components/vehicle/VehicleGallery/VehicleGallery";
import VehicleSpecs from "@/components/vehicle/VehicleSpecs/VehicleSpecs";
import FinanceCalculator from "@/components/vehicle/FinanceCalculator/FinanceCalculator";
import VehicleCardComponent from "@/components/vehicle/VehicleCard/VehicleCard";
import SectionLabel from "@/components/ui/SectionLabel/SectionLabel";
import Hairline from "@/components/ui/Hairline/Hairline";
import ClosingCTA from "@/components/home/ClosingCTA/ClosingCTA";
import styles from "./detail.module.scss";
import Button from "@/components/ui/Button/Button";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(vehicleSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await client.fetch<SanityVehicle | null>(vehicleBySlugQuery, {
    slug,
  });

  if (!vehicle) {
    return { title: "Vehicle Not Found — Meridian Motors" };
  }

  const name = `${vehicle.make.name} ${vehicle.model}${vehicle.trim ? ` ${vehicle.trim}` : ""}`;
  return {
    title: `${vehicle.year} ${name} — Meridian Motors`,
    description:
      vehicle.shortIntro ||
      `${vehicle.year} ${name} — ${formatPrice(vehicle.price, vehicle.currency)}. Available at Meridian Motors, Lagos.`,
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [vehicle, related] = await Promise.all([
    client.fetch<SanityVehicle | null>(vehicleBySlugQuery, { slug }),
    client.fetch<VehicleCard[]>(relatedVehiclesQuery, { slug }),
  ]);

  if (!vehicle) notFound();

  const vehicleName = `${vehicle.make.name} ${vehicle.model}${vehicle.trim ? ` ${vehicle.trim}` : ""}`;
  const whatsappUrl = buildVehicleWhatsAppUrl(vehicle.make.name, vehicle.model, vehicle.year);

  return (
    <main>
      {/* Header strip */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.stockLabel}>
            Stock No. {vehicle._id.slice(-6).toUpperCase()} &middot; {vehicle.condition}
          </div>
          <h1 className={styles.title}>
            {vehicle.make.name}{" "}
            <em>
              {vehicle.model}
              {vehicle.trim ? ` ${vehicle.trim}` : ""}
            </em>
          </h1>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.priceLabel}>Price</div>
          <div className={styles.price}>{formatPrice(vehicle.price, vehicle.currency)}</div>
        </div>
      </div>

      {/* Gallery */}
      <VehicleGallery images={vehicle.images} vehicleName={vehicleName} />

      {/* Content: specs + sticky CTA rail */}
      <div className={styles.content}>
        <div className={styles.specsCol}>
          <VehicleSpecs vehicle={vehicle} />
        </div>

        {/* Sticky CTA Rail */}
        <aside className={styles.ctaRail}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
            Enquire on WhatsApp
          </a>
          <button className={styles.ctaSecondary}>Book a Test Drive</button>
          {vehicle.inspectionReportAvailable && (
            <button className={styles.ctaSecondary}>Request Inspection Report</button>
          )}

          <div className={styles.ctaDivider} />

          <div className={styles.ctaMeta}>
            {vehicle.availability === "Available" ? "Available in showroom" : vehicle.availability}
            <br />
            By appointment
            {vehicle.location && (
              <>
                <br />
                {vehicle.location.address}
              </>
            )}
          </div>

          {/* Finance calculator */}
          {vehicle.price && <FinanceCalculator price={vehicle.price} currency={vehicle.currency} />}
        </aside>
      </div>

      {/* More from the Collection */}
      {related.length > 0 && (
        <section className={styles.related}>
          <Hairline className={styles.relatedDivider} />
          <SectionLabel title="Further Consideration" right="View full collection →" />
          <div className={styles.relatedGrid}>
            {related.map((v) => (
              <VehicleCardComponent key={v._id} vehicle={v} />
            ))}
          </div>
        </section>
      )}

      {/* Back link */}
      <div className={styles.backBar}>
        <Button as="a" href="/inventory" className={styles.backLink}>
          &larr; Back to Collection
        </Button>
      </div>

      <ClosingCTA />
    </main>
  );
}
