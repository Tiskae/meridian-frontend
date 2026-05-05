import FAQHero from "@/components/faqs/FAQHero/FAQHero";
import FAQContent from "@/components/faqs/FAQContent/FAQContent";
import FAQCallout from "@/components/faqs/FAQCallout/FAQCallout";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs: Meridian Motors",
  description:
    "Answers to common questions about buying, financing, inspecting, and selling luxury vehicles through Meridian Motors in Lagos. Learn about our process, vehicle sourcing, warranties, and how we work.",
  keywords: [
    "luxury car buying FAQ Lagos",
    "how to buy foreign used car Nigeria",
    "car financing questions Nigeria",
    "Meridian Motors FAQ",
    "used luxury car inspection Lagos",
  ],
  alternates: { canonical: "https://meridian.tiskae.dev/faqs" },
  openGraph: {
    title: "FAQs: Meridian Motors",
    description:
      "Common questions about buying, financing, and selling luxury vehicles through Meridian Motors, Lagos.",
    url: "https://meridian.tiskae.dev/faqs",
    type: "website",
  },
};

export default function FAQsPage() {
  return (
    <main>
      <FAQHero />
      <FAQContent />
      <FAQCallout />
    </main>
  );
}
