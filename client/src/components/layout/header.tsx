import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import hastialLogoPath from "@assets/hastial.jpeg";

type HeaderProps = {
  isTopOfPage: boolean;
};

export const Header = ({ isTopOfPage }: HeaderProps) => {
  const { t, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(!isTopOfPage);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  useEffect(() => {
    setIsScrolled(!isTopOfPage);
  }, [isTopOfPage]);

  const navItems = [
    { href: "#inicio", label: t("nav.home") },
    { href: "#acerca", label: t("nav.about") },
    { href: "#servicios", label: t("nav.services") },
    { href: "#portafolio", label: t("nav.portfolio") },
    { href: "#contacto", label: t("nav.contact") }
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen 
          ? "bg-background/95 backdrop-blur-sm shadow-lg border-b border-border" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <div className="relative flex items-center gap-3">
            {/* Logo wrapper with proper size constraints */}
            <div className="h-10 w-10 relative overflow-hidden rounded-md border border-primary/10">
              <img 
                src={hastialLogoPath} 
                alt="Hastial Logo" 
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
            <span className={`text-xl font-semibold tracking-tight ${
              isScrolled || mobileMenuOpen ? "text-primary" : "text-white"
            }`}>
              HASTIAL
            </span>
          </div>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <a 
              key={index} 
              href={item.href} 
              className={`hover:text-secondary transition-colors font-medium ${
                isScrolled || mobileMenuOpen ? "text-foreground" : "text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
          <button 
            className={`hover:text-secondary transition-colors flex items-center font-medium ${
              isScrolled || mobileMenuOpen ? "text-foreground" : "text-white"
            }`}
            onClick={toggleLanguage}
          >
            <span>{t("nav.language")}</span> <FaGlobe className="ml-1" />
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden ${
            isScrolled || mobileMenuOpen ? "text-foreground" : "text-white"
          }`}
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-background py-4 px-4 border-t border-border"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <a 
                  key={index} 
                  href={item.href} 
                  className="text-foreground hover:text-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button 
                className="text-foreground hover:text-secondary transition-colors text-left flex items-center"
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
              >
                <span>{t("nav.language")}</span> <FaGlobe className="ml-1" />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
