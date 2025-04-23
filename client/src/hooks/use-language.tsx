import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language } from "../lib/translations";

type LanguageContextType = {
  language: Language;
  t: (key: string) => string;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check if we're in the browser and if there's a saved preference
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language;
      return savedLanguage || getBrowserLanguage() || "es";
    }
    return "es";
  });

  // Get the user's browser language
  function getBrowserLanguage(): Language | null {
    if (typeof window === "undefined") return null;
    
    const browserLang = navigator.language.split('-')[0];
    return browserLang === "es" || browserLang === "en" 
      ? browserLang as Language 
      : null;
  }

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => prev === "es" ? "en" : "es");
  };

  const t = (key: string): string => {
    // Parse keys with <accent> tags for highlighting
    if (translations[language][key]?.includes("<accent>")) {
      return translations[language][key];
    }
    
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
