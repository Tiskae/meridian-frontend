import { client } from "@/lib/sanity/client";
import { featuredVehiclesQuery, makesWithLogosQuery } from "@/lib/sanity/queries";
import type { VehicleCard } from "@/lib/sanity/types";
import Hero from "@/components/home/Hero/Hero";
import BrandsMarquee from "@/components/home/BrandsMarquee/BrandsMarquee";
import FeaturedCollection from "@/components/home/FeaturedCollection/FeaturedCollection";
import ProcessSection from "@/components/home/ProcessSection/ProcessSection";
import Testimonial from "@/components/home/Testimonial/Testimonial";
import ClosingCTA from "@/components/home/ClosingCTA/ClosingCTA";

export const revalidate = 60;

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
