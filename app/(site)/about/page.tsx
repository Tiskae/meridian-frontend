import AboutHero from "@/components/about/AboutHero/AboutHero";
import AboutStory from "@/components/about/AboutStory/AboutStory";
import AboutPrinciples from "@/components/about/AboutPrinciples/AboutPrinciples";
import AboutStats from "@/components/about/AboutStats/AboutStats";
import AboutShowroom from "@/components/about/AboutShowroom/AboutShowroom";
import AboutTimeline from "@/components/about/AboutTimeline/AboutTimeline";
import AboutTeam from "@/components/about/AboutTeam/AboutTeam";
import ClosingCTA from "@/components/home/ClosingCTA/ClosingCTA";

export const metadata = {
  title: "About — Meridian Motors",
  description:
    "Meridian Motors is a curated luxury car dealership on Victoria Island, Lagos. Founded in 2018 on principles of selectivity, independence, transparency, and patience.",
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
