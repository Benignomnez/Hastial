import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { FaGlobe, FaBars, FaTimes } from "react-icons/fa";

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
        isScrolled || mobileMenuOpen ? "bg-primary shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <span className="text-2xl font-display font-bold text-secondary">HASTIAL</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item, index) => (
            <a 
              key={index} 
              href={item.href} 
              className="text-white hover:text-secondary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button 
            className="text-white hover:text-secondary transition-colors flex items-center"
            onClick={toggleLanguage}
          >
            <span>{t("nav.language")}</span> <FaGlobe className="ml-1" />
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-primary py-4 px-4"
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
                  className="text-white hover:text-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button 
                className="text-white hover:text-secondary transition-colors text-left flex items-center"
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
