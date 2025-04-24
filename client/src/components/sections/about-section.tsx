import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaBriefcase,
  FaAward,
  FaBuilding,
  FaTools,
} from "react-icons/fa";
import {
  COMPANY_FOUNDING_YEAR,
  YEARS_OF_EXPERIENCE,
  TEAM_MEMBERS,
} from "@/lib/constants";

export const AboutSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="acerca"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-neutral-dark">
            {t("about.title")}
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-neutral-dark">
            {t("about.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Modern architecture and construction team at work"
                className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
              />
              <motion.div
                className="absolute -bottom-8 -right-8 bg-secondary text-white p-8 rounded-xl shadow-2xl hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="font-mono text-sm uppercase tracking-wider">
                  {t("about.badge.since")}
                </p>
                <p className="text-4xl font-display font-bold my-1">
                  {YEARS_OF_EXPERIENCE} AÑOS
                </p>
                <p className="font-mono text-sm uppercase tracking-wider">
                  {t("about.badge.excellence")}
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-3xl font-display font-bold mb-6 text-primary flex items-center">
              <FaBuilding className="mr-3 text-secondary" />
              {t("about.history.title")}
            </h3>
            <p className="mb-6 text-neutral-dark text-lg leading-relaxed">
              {t("about.history.p1")}
            </p>
            <p className="mb-10 text-neutral-dark text-lg leading-relaxed">
              {t("about.history.p2")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {TEAM_MEMBERS.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="flex flex-col bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <h4 className="text-xl font-bold mb-3 text-secondary">
                    {member.name}
                  </h4>
                  <p className="text-neutral-dark mb-2 flex items-center">
                    <FaBriefcase className="mr-2 text-primary text-sm" />
                    {t(member.title)}
                  </p>
                  <p className="text-neutral-dark mb-4 flex items-center">
                    <FaAward className="mr-2 text-primary text-sm" />
                    {t(member.experience)}
                  </p>
                  <div className="flex space-x-4 mt-auto">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="text-primary hover:text-secondary transition-colors text-xl"
                      >
                        <FaLinkedin />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        className="text-primary hover:text-secondary transition-colors text-xl"
                      >
                        <FaTwitter />
                      </a>
                    )}
                    {member.social.instagram && (
                      <a
                        href={member.social.instagram}
                        className="text-primary hover:text-secondary transition-colors text-xl"
                      >
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
