import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/hooks/use-language";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export const WhatsAppWidget = () => {
  const { t } = useLanguage();
  
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`}
      className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg z-50 hover:scale-110 transition-transform duration-300"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp.ariaLabel")}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 1.5
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaWhatsapp className="text-white text-3xl" />
    </motion.a>
  );
};
