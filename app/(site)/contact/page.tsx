import ContactHero from "@/components/contact/ContactHero/ContactHero";
import ContactMain from "@/components/contact/ContactMain/ContactMain";
import ContactDirections from "@/components/contact/ContactDirections/ContactDirections";
import ContactMap from "@/components/contact/ContactMap/ContactMap";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us: Meridian Motors",
  description:
    "Visit the Meridian Motors showroom at No. 4 Kofo Abayomi Street, Victoria Island, Lagos. Open Monday to Saturday, 9am to 6pm. Enquire by WhatsApp, phone, or email, or book a private viewing.",
  keywords: [
    "contact Meridian Motors",
    "car showroom Victoria Island Lagos",
    "book private car viewing Lagos",
    "luxury car enquiry Lagos",
    "Kofo Abayomi Street showroom",
  ],
  alternates: { canonical: "https://meridian.tiskae.dev/contact" },
  openGraph: {
    title: "Contact Us: Meridian Motors",
    description:
      "Visit our showroom at No. 4 Kofo Abayomi Street, Victoria Island, Lagos. Open Monday to Saturday, 9am to 6pm.",
    url: "https://meridian.tiskae.dev/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactMain />
      <ContactDirections />
      <ContactMap />
    </main>
  );
}
