import FinancingHero from '@/components/financing/FinancingHero/FinancingHero';
import FinanceCalculator from '@/components/financing/FinanceCalculator/FinanceCalculator';
import FinanceProcess from '@/components/financing/FinanceProcess/FinanceProcess';
import SubscriptionSection from '@/components/financing/SubscriptionSection/SubscriptionSection';
import FinancePartners from '@/components/financing/FinancePartners/FinancePartners';
import ClosingCTA from '@/components/home/ClosingCTA/ClosingCTA';

export const metadata = { title: 'Financing & Subscription — Meridian Motors' };

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
