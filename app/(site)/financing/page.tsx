import FinancingHero from "@/components/financing/FinancingHero/FinancingHero";
import FinanceCalculator from "@/components/financing/FinanceCalculator/FinanceCalculator";
import FinanceProcess from "@/components/financing/FinanceProcess/FinanceProcess";
import SubscriptionSection from "@/components/financing/SubscriptionSection/SubscriptionSection";
import FinancePartners from "@/components/financing/FinancePartners/FinancePartners";
import ClosingCTA from "@/components/home/ClosingCTA/ClosingCTA";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicle Financing and Subscription: Meridian Motors",
  description:
    "Finance your next luxury vehicle through Meridian Motors with competitive rates and flexible loan terms. Explore our subscription plans for premium cars in Lagos, or use our live finance calculator to estimate your monthly payment.",
  keywords: [
    "car financing Lagos",
    "luxury car loan Nigeria",
    "vehicle subscription Lagos",
    "car finance calculator Nigeria",
    "hire purchase luxury car Lagos",
    "Meridian Motors financing",
  ],
  alternates: { canonical: "https://meridian.tiskae.dev/financing" },
  openGraph: {
    title: "Vehicle Financing and Subscription: Meridian Motors",
    description:
      "Competitive rates, flexible loan terms, and subscription options for premium cars in Lagos. Calculate your monthly payment instantly.",
    url: "https://meridian.tiskae.dev/financing",
    type: "website",
  },
};

export default function FinancingPage() {
  return (
    <main>
      <FinancingHero />
      <FinanceCalculator />
      <FinanceProcess />
      <SubscriptionSection />
      <FinancePartners />
      <ClosingCTA />
    </main>
  );
}
