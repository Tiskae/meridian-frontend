import AboutHero from "@/components/about/AboutHero/AboutHero";
import AboutStory from "@/components/about/AboutStory/AboutStory";
import AboutPrinciples from "@/components/about/AboutPrinciples/AboutPrinciples";
import AboutStats from "@/components/about/AboutStats/AboutStats";
import AboutShowroom from "@/components/about/AboutShowroom/AboutShowroom";
import AboutTimeline from "@/components/about/AboutTimeline/AboutTimeline";
import AboutTeam from "@/components/about/AboutTeam/AboutTeam";
import ClosingCTA from "@/components/home/ClosingCTA/ClosingCTA";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us: Meridian Motors",
  description:
    "Meridian Motors is a curated luxury car dealership on Victoria Island, Lagos. Founded in 2018 on principles of selectivity, independence, and transparency, we present only vehicles that meet our exacting standard.",
  keywords: [
    "about Meridian Motors",
    "luxury car dealership Lagos history",
    "Victoria Island car showroom",
    "premium car dealership Nigeria",
    "trusted car dealer Lagos",
  ],
  alternates: { canonical: "https://meridian.tiskae.dev/about" },
  openGraph: {
    title: "About Us: Meridian Motors",
    description:
      "Founded in 2018 on Victoria Island, Lagos. A curated luxury car dealership built on selectivity, independence, and transparency.",
    url: "https://meridian.tiskae.dev/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutShowroom />
      <AboutTimeline />
      <AboutTeam />
      <AboutPrinciples />
      <AboutStats />
      <AboutStory />
      <ClosingCTA />
    </main>
  );
}
