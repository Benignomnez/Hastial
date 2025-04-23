import { useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { FaChevronDown } from "react-icons/fa";

export const HeroSection = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  
  const heroTitle = t("hero.title");
  // Process the title to add styling to <accent> tags
  const formattedTitle = heroTitle.replace(/<accent>(.*?)<\/accent>/g, 
    (_, p1) => `<span class="text-secondary">${p1}</span>`
  );
  
  return (
    <section id="inicio" ref={heroRef} className="relative h-screen flex items-center">
      {/* Background image with modern architecture */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Modern architectural design" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-black/70"></div>
      </div>
      
      <div className="container mx-auto px-6 z-10">
        <motion.div 
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 0.2
          }}
        >
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: formattedTitle }}
          />
          <motion.p 
            className="text-white/90 text-lg md:text-xl mb-10 font-light max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a 
              href="#contacto" 
              className="inline-block bg-secondary hover:bg-secondary/90 text-white font-medium py-4 px-8 rounded-md transition-all text-center shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              {t("hero.cta.quote")}
            </a>
            <a 
              href="#portafolio" 
              className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 font-medium py-4 px-8 rounded-md transition-all text-center shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              {t("hero.cta.portfolio")}
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5,
          delay: 1.2,
        }}
      >
        <motion.a 
          href="#acerca" 
          className="flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            y: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }
          }}
        >
          <span className="text-sm mb-2 opacity-80">{t("hero.scrollDown")}</span>
          <FaChevronDown className="text-secondary" />
        </motion.a>
      </motion.div>
    </section>
  );
};
