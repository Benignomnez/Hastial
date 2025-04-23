import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { TESTIMONIALS } from "@/lib/constants";

export const TestimonialsSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Function to render the rating stars
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" />);
    }
    
    return stars;
  };
  
  return (
    <section ref={sectionRef} className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t("testimonials.title")}</h2>
          <div className="w-16 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-white/80">
            {t("testimonials.subtitle")}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-6">
                <div className="text-secondary flex">
                  {renderRating(testimonial.rating)}
                </div>
              </div>
              <p className="text-white/90 mb-6 italic">
                {t(testimonial.text)}
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-secondary font-bold">{testimonial.author.initials}</span>
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.author.name}</h4>
                  <p className="text-white/60 text-sm">{t(testimonial.author.position)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
