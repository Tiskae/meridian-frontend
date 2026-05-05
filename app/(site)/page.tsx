import { client } from "@/lib/sanity/client";
import { featuredVehiclesQuery, makesWithLogosQuery } from "@/lib/sanity/queries";
import type { VehicleCard } from "@/lib/sanity/types";
import Hero from "@/components/home/Hero/Hero";
import BrandsMarquee from "@/components/home/BrandsMarquee/BrandsMarquee";
import FeaturedCollection from "@/components/home/FeaturedCollection/FeaturedCollection";
import ProcessSection from "@/components/home/ProcessSection/ProcessSection";
import Testimonial from "@/components/home/Testimonial/Testimonial";
import ClosingCTA from "@/components/home/ClosingCTA/ClosingCTA";

import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Meridian Motors: Luxury Cars in Lagos",
  description:
    "Shop the finest brand new and clean foreign-used luxury automobiles in Lagos. Meridian Motors on Victoria Island offers a curated selection of premium vehicles sourced and inspected with singular intention.",
  keywords: [
    "luxury cars Lagos",
    "buy luxury car Lagos",
    "foreign used cars Nigeria",
    "premium car dealership Victoria Island",
    "Bentley Lagos",
    "Porsche Lagos",
    "Range Rover Lagos",
    "Meridian Motors Lagos",
  ],
  alternates: { canonical: "https://meridian.tiskae.dev" },
  openGraph: {
    title: "Meridian Motors: Luxury Cars in Lagos",
    description:
      "The finest brand new and clean foreign-used automobiles in Lagos. Curated, inspected, and presented with singular intention on Victoria Island.",
    url: "https://meridian.tiskae.dev",
    type: "website",
  },
};

export default async function HomePage() {
  const [vehicles, makes] = await Promise.all([
    client.fetch<VehicleCard[]>(featuredVehiclesQuery),
    client.fetch(makesWithLogosQuery),
  ]);

  return (
    <main>
      <Hero vehicles={vehicles} />
      <BrandsMarquee makes={makes} />
      <FeaturedCollection vehicles={vehicles} />
      <ProcessSection />
      <Testimonial />
      <ClosingCTA />
    </main>
  );
}
