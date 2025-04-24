import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import hastialLogoPath from "@assets/hastial.jpeg";

type HeaderProps = {
  isTopOfPage: boolean;
};

export const Header = ({ isTopOfPage }: HeaderProps) => {
  const { t, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(!isTopOfPage);
  const { scrollY } = useScroll();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Control background opacity
  const headerBgOpacity = useTransform(scrollY, [0, 80], [0, 0.98]);

  // Control logo size
  const logoScale = useTransform(scrollY, [0, 80], [1, 0.9]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsScrolled(!isTopOfPage);
  }, [isTopOfPage]);

  const navItems = [
    { href: "#inicio", label: t("nav.home") },
    { href: "#acerca", label: t("nav.about") },
    { href: "#servicios", label: t("nav.services") },
    { href: "#portafolio", label: t("nav.portfolio") },
    { href: "#contacto", label: t("nav.contact") },
  ];

  // Determine text color based on scroll position
  const textColor = useTransform(scrollY, [0, 80], ["white", "#333333"]);

  return (
    <header ref={ref} className="fixed w-full z-50 transition-all duration-300">
      {/* Header background - white with shadow when scrolled */}
      <motion.div
        className="absolute inset-0 w-full h-full shadow-lg"
        style={{
          opacity: headerBgOpacity,
          backgroundColor: "white",
        }}
      />

      {/* Mobile menu background */}
      {mobileMenuOpen && (
        <motion.div
          className="absolute inset-0 w-full h-full bg-white shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      <div className="container mx-auto px-4 py-3 flex justify-between items-center relative z-10">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center"
          whileHover={{ scale: 1.03 }}
          style={{ scale: logoScale }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src={hastialLogoPath}
            alt="Hastial Logo"
            className="h-16 object-contain"
            style={{ width: "auto", maxWidth: "200px" }}
          />
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              style={{ color: isScrolled ? "#333333" : "white" }}
              className="text-lg font-medium hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
              }}
            >
              {item.label}
            </motion.a>
          ))}
          <motion.button
            style={{ color: isScrolled ? "#333333" : "white" }}
            className="hover:text-primary transition-colors flex items-center font-medium text-lg"
            onClick={toggleLanguage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: navItems.length * 0.1,
              type: "spring",
              stiffness: 300,
            }}
          >
            <span className="mr-1">{t("nav.language")}</span> <FaGlobe />
          </motion.button>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          style={{ color: isScrolled || mobileMenuOpen ? "#333333" : "white" }}
          className="md:hidden z-20"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden py-6 px-4 relative z-10"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-6 items-center">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="text-gray-800 text-xl font-medium hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.button
                className="text-gray-800 hover:text-primary text-xl font-medium flex items-center"
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ delay: navItems.length * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{t("nav.language")}</span> <FaGlobe />
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
