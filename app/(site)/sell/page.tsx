import SellHero from '@/components/sell/SellHero/SellHero';
import SellProcess from '@/components/sell/SellProcess/SellProcess';
import SellProof from '@/components/sell/SellProof/SellProof';
import SellForm from '@/components/sell/SellForm/SellForm';

export const metadata = { title: 'Sell Your Car — Meridian Motors' };

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
