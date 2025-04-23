import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { FaEye, FaImages } from "react-icons/fa";
import { PORTFOLIO_CATEGORIES, PORTFOLIO_PROJECTS } from "@/lib/constants";

export const PortfolioSection = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const filteredProjects = activeFilter === "all" 
    ? PORTFOLIO_PROJECTS 
    : PORTFOLIO_PROJECTS.filter(project => project.category === activeFilter);
  
  return (
    <section id="portafolio" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t("portfolio.title")}</h2>
          <div className="w-16 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-neutral-dark">
            {t("portfolio.subtitle")}
          </p>
        </motion.div>
        
        <motion.div 
          className="mb-8 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {PORTFOLIO_CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeFilter === category.id 
                  ? 'bg-primary text-white' 
                  : 'bg-neutral-mid/50 text-primary hover:bg-neutral-mid'
              }`}
              onClick={() => setActiveFilter(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t(category.label)}
            </motion.button>
          ))}
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.1 + (index * 0.05) }}
                layout
              >
                <div className="relative overflow-hidden group rounded-lg shadow-lg h-72">
                  <img 
                    src={project.imageSrc}
                    alt={t(project.title)} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold mb-2">{t(project.title)}</h3>
                    <p className="text-white/80 mb-4">{t(project.description)}</p>
                    <div className="flex space-x-4">
                      <a href={project.detailLink} className="text-white hover:text-secondary transition-colors">
                        <FaEye className="inline mr-1" /> {t("portfolio.viewDetails")}
                      </a>
                      <span className="text-white/60">|</span>
                      <a 
                        href={project.beforeAfterLink || project.galleryLink} 
                        className="text-white hover:text-secondary transition-colors"
                      >
                        <FaImages className="inline mr-1" /> 
                        {project.beforeAfterLink 
                          ? t("portfolio.beforeAfter") 
                          : t("portfolio.gallery")
                        }
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a 
            href="#" 
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-md transition-colors"
          >
            {t("portfolio.viewAllProjects")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};
