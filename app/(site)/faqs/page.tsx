import FAQHero from '@/components/faqs/FAQHero/FAQHero';
import FAQContent from '@/components/faqs/FAQContent/FAQContent';
import FAQCallout from '@/components/faqs/FAQCallout/FAQCallout';

export const metadata = { title: 'FAQs — Meridian Motors' };

export default function FAQsPage() {
  return (
    <main>
      <FAQHero />
      <FAQContent />
      <FAQCallout />
    </main>
  );
}
