import ContactHero from "@/components/contact/ContactHero/ContactHero";
import ContactMain from "@/components/contact/ContactMain/ContactMain";
import ContactDirections from "@/components/contact/ContactDirections/ContactDirections";
import ContactMap from "@/components/contact/ContactMap/ContactMap";

export const metadata = { title: "Contact — Meridian Motors" };

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
