import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { FaHome, FaBuilding, FaCompass, FaArrowRight, FaCheck } from "react-icons/fa";
import { SERVICES } from "@/lib/constants";

export const ServicesSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Map the icon names to actual components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "home": return <FaHome className="text-secondary text-2xl" />;
      case "building": return <FaBuilding className="text-secondary text-2xl" />;
      case "compass": return <FaCompass className="text-secondary text-2xl" />;
      default: return <FaHome className="text-secondary text-2xl" />;
    }
  };
  
  return (
    <section id="servicios" ref={sectionRef} className="py-20 bg-neutral-mid/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t("services.title")}</h2>
          <div className="w-16 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-neutral-dark">
            {t("services.subtitle")}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={service.id}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                {getIcon(service.icon)}
              </div>
              <h3 className="text-xl font-bold mb-4">{t(service.title)}</h3>
              <p className="text-neutral-dark mb-6">
                {t(service.description)}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <FaCheck className="text-accent mt-1 mr-2" />
                    <span className="text-neutral-dark">{t(feature)}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="#contacto" 
                className="text-secondary font-semibold hover:text-accent flex items-center transition-colors"
              >
                {t("services.cta")} <FaArrowRight className="ml-2" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
