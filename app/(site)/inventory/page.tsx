import { client } from "@/lib/sanity/client";
import { allVehiclesQuery, makesQuery } from "@/lib/sanity/queries";
import type { VehicleCard, SanityMake } from "@/lib/sanity/types";
import InventoryGrid from "@/components/inventory/InventoryGrid/InventoryGrid";
import ClosingCTA from "@/components/home/ClosingCTA/ClosingCTA";
import styles from "./inventory.module.scss";

export const revalidate = 60;

export const metadata = {
  title: "Inventory — Meridian Motors",
  description: "Browse our considered collection of pre-owned luxury automobiles in Lagos.",
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
