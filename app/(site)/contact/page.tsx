import ContactHero from '@/components/contact/ContactHero/ContactHero';
import ContactMain from '@/components/contact/ContactMain/ContactMain';
import ContactDirections from '@/components/contact/ContactDirections/ContactDirections';
import ContactGallery from '@/components/contact/ContactGallery/ContactGallery';

export const metadata = { title: 'Contact — Meridian Motors' };

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactMain />
      <ContactDirections />
      <ContactGallery />
    </main>
  );
}
