import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SEO, { organizationSchema } from "@/components/SEO";

const Index = () => {
  return (
    <>
      <SEO 
        title="Premium Shisha BBQ Briquettes Coconut Charcoal Factory" 
        description="Premium coconut shell charcoal manufacturer Indonesia. Shisha & BBQ charcoal factory. ISO certified. Global shipping. OEM available."
        keywords="shisha charcoal, BBQ charcoal, coconut charcoal, charcoal factory Indonesia, hookah charcoal, charcoal manufacturer, charcoal exporter"
        schema={organizationSchema}
      />
      <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <WhyChooseUsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
    </>
  );
};

export default Index;
