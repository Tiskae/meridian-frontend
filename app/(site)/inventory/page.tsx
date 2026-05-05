import { client } from "@/lib/sanity/client";
import { allVehiclesQuery, makesQuery } from "@/lib/sanity/queries";
import type { VehicleCard, SanityMake } from "@/lib/sanity/types";
import InventoryGrid from "@/components/inventory/InventoryGrid/InventoryGrid";
import ClosingCTA from "@/components/home/ClosingCTA/ClosingCTA";
import styles from "./inventory.module.scss";

export const revalidate = 60;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Collection: Meridian Motors",
  description:
    "Browse Meridian Motors' considered collection of brand new and clean foreign-used luxury vehicles in Lagos. Filter by make, body type, and price. Every car sourced, inspected, and presented with singular intention.",
  keywords: [
    "luxury cars for sale Lagos",
    "buy foreign used car Lagos",
    "premium SUV Lagos",
    "clean used luxury cars Nigeria",
    "Bentley for sale Lagos",
    "Porsche for sale Lagos",
    "Range Rover for sale Lagos",
    "Mercedes for sale Lagos",
  ],
  alternates: { canonical: "https://meridian.tiskae.dev/inventory" },
  openGraph: {
    title: "Our Collection: Meridian Motors",
    description:
      "Brand new and clean foreign-used luxury vehicles in Lagos. Every car sourced, inspected, and presented with singular intention.",
    url: "https://meridian.tiskae.dev/inventory",
    type: "website",
  },
};

export default async function InventoryPage() {
  const [vehicles, makes] = await Promise.all([
    client.fetch<VehicleCard[]>(allVehiclesQuery),
    client.fetch<SanityMake[]>(makesQuery),
  ]);

  return (
    <main>
      {/* Page header */}
      <div className={styles.header}>
        <div className={styles.label}>— The Collection</div>
        <h1 className={styles.title}>
          Every car, <em>considered</em>.
        </h1>
        <p className={styles.subtitle}>
          Sourced with intention. Inspected without compromise. Presented as they deserve.
        </p>
      </div>

      <InventoryGrid vehicles={vehicles} makes={makes} />
      <ClosingCTA />
    </main>
  );
}
