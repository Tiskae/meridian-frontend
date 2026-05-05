import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat/WhatsAppFloat";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollToTop />
      <Header />
      {children}
      <Footer />
      {/* <WhatsAppFloat /> */}
    </>
  );
}
