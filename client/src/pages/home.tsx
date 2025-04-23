import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { StatsSection } from "@/components/sections/stats-section";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  
  // Handle scroll events to detect when page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsTopOfPage(window.scrollY <= 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Check initial scroll position
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header isTopOfPage={isTopOfPage} />
      
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </motion.div>
  );
}
