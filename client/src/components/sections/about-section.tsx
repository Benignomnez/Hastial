import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram 
} from "react-icons/fa";
import { 
  COMPANY_FOUNDING_YEAR, 
  YEARS_OF_EXPERIENCE, 
  TEAM_MEMBERS 
} from "@/lib/constants";

export const AboutSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  return (
    <section id="acerca" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t("about.title")}</h2>
          <div className="w-16 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-neutral-dark">
            {t("about.subtitle")}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Equipo de profesionales de construcción" 
                className="rounded-lg shadow-xl w-full"
              />
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-secondary text-white p-6 rounded-lg shadow-lg hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="font-mono text-sm">{t("about.badge.since")}</p>
                <p className="text-3xl font-display font-bold">{YEARS_OF_EXPERIENCE} AÑOS</p>
                <p className="font-mono text-sm">{t("about.badge.excellence")}</p>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-display font-bold mb-6">{t("about.history.title")}</h3>
            <p className="mb-6 text-neutral-dark">
              {t("about.history.p1")}
            </p>
            <p className="mb-8 text-neutral-dark">
              {t("about.history.p2")}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {TEAM_MEMBERS.map((member, index) => (
                <motion.div 
                  key={member.id} 
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                >
                  <h4 className="text-xl font-bold mb-3">{member.name}</h4>
                  <p className="text-neutral-dark mb-2">{t(member.title)}</p>
                  <p className="text-neutral-dark mb-4">{t(member.experience)}</p>
                  <div className="flex space-x-3 mt-auto">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="text-primary hover:text-secondary transition-colors">
                        <FaLinkedin />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="text-primary hover:text-secondary transition-colors">
                        <FaTwitter />
                      </a>
                    )}
                    {member.social.instagram && (
                      <a href={member.social.instagram} className="text-primary hover:text-secondary transition-colors">
                        <FaInstagram />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
