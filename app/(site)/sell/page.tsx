import SellHero from "@/components/sell/SellHero/SellHero";
import SellProcess from "@/components/sell/SellProcess/SellProcess";
import SellProof from "@/components/sell/SellProof/SellProof";
import SellForm from "@/components/sell/SellForm/SellForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sell Your Car: Meridian Motors",
  description:
    "Sell your luxury vehicle through Meridian Motors. We offer honest valuations, professional presentation, and access to a network of discerning buyers across Lagos and Nigeria. Simple process, no hidden fees.",
  keywords: [
    "sell luxury car Lagos",
    "sell foreign used car Nigeria",
    "car consignment Lagos",
    "sell premium car Victoria Island",
    "Meridian Motors sell your car",
    "car valuation Lagos",
  ],
  alternates: { canonical: "https://meridian.tiskae.dev/sell" },
  openGraph: {
    title: "Sell Your Car: Meridian Motors",
    description:
      "Honest valuations, professional presentation, and a network of discerning buyers. Sell your luxury vehicle through Meridian Motors.",
    url: "https://meridian.tiskae.dev/sell",
    type: "website",
  },
};

export default function SellPage() {
  return (
    <main>
      <SellHero />
      <SellProcess />
      <SellProof />
      <SellForm />
    </main>
  );
}
