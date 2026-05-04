import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat/WhatsAppFloat";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      {/* <WhatsAppFloat /> */}
    </>
  );
}
