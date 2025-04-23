import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { STATS } from "@/lib/constants";

export const StatsSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  return (
    <motion.section 
      ref={sectionRef}
      className="py-12 bg-primary text-white"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
            <CounterItem 
              key={stat.id}
              count={stat.count} 
              label={t(stat.label)} 
              delay={index * 0.1}
              startCounting={isInView}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

type CounterItemProps = {
  count: number;
  label: string;
  delay: number;
  startCounting: boolean;
};

const CounterItem = ({ count, label, delay, startCounting }: CounterItemProps) => {
  const [displayCount, setDisplayCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!startCounting) return;
    
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds for the animation
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * count);
      
      setDisplayCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayCount(count);
      }
    };
    
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);
    
    return () => clearTimeout(timeoutId);
  }, [count, delay, startCounting]);

  return (
    <motion.div 
      className="text-center"
      initial={{ y: 20, opacity: 0 }}
      animate={startCounting ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: delay + 0.3 }}
      ref={counterRef}
    >
      <span className="block text-4xl font-bold text-secondary mb-2">{displayCount}</span>
      <span className="text-lg">{label}</span>
    </motion.div>
  );
};
