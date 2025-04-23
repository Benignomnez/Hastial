import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { FaFacebookF, FaInstagram, FaPinterestP, FaLinkedinIn } from "react-icons/fa";
import { 
  COMPANY_FOUNDING_YEAR, 
  FOOTER_LINKS, 
  SOCIAL_LINKS 
} from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

export const Footer = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !email.includes('@')) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    // Here we would normally submit to the server
    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter"
    });
    
    setEmail("");
  };
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <a href="#" className="flex items-center mb-6">
              <span className="text-2xl font-display font-bold text-secondary">HASTIAL</span>
            </a>
            <p className="text-white/80 mb-6">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href={SOCIAL_LINKS.facebook} 
                className="text-white/80 hover:text-secondary transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <FaFacebookF />
              </motion.a>
              <motion.a 
                href={SOCIAL_LINKS.instagram} 
                className="text-white/80 hover:text-secondary transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <FaInstagram />
              </motion.a>
              <motion.a 
                href={SOCIAL_LINKS.pinterest} 
                className="text-white/80 hover:text-secondary transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <FaPinterestP />
              </motion.a>
              <motion.a 
                href={SOCIAL_LINKS.linkedin} 
                className="text-white/80 hover:text-secondary transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <FaLinkedinIn />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">{t("footer.quickLinks.title")}</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-white/80 hover:text-secondary transition-colors"
                  >
                    {t(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">{t("footer.services.title")}</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href} 
                    className="text-white/80 hover:text-secondary transition-colors"
                  >
                    {t(service.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">{t("footer.newsletter.title")}</h3>
            <p className="text-white/80 mb-4">
              {t("footer.newsletter.description")}
            </p>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <input 
                  type="email" 
                  placeholder={t("footer.newsletter.placeholder")} 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors text-white placeholder-white/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 rounded-md transition-colors"
              >
                {t("footer.newsletter.submit")}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              © {currentYear} HASTIAL. {t("footer.copyright")}
            </p>
            <div className="flex space-x-6">
              {FOOTER_LINKS.legal.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="text-white/60 hover:text-secondary transition-colors text-sm"
                >
                  {t(link.label)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
