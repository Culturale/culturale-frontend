import type React from 'react';
import { createContext, useContext, useState } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string | null>>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguageContext = () => {
  const languageContext = useContext(LanguageContext);
  if (languageContext === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return languageContext;
};

export const LanguageProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState<string | null>('es');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
