import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguageStore, Language } from './useLanguage';
import { getTranslation, TranslationStrings } from './translations';

export const usePageTranslation = (): { t: TranslationStrings; lang: Language } => {
  const location = useLocation();
  const storeLang = useLanguageStore((s) => s.language);
  const setStoreLanguage = useLanguageStore((s) => s.setLanguage);
  const [t, setT] = useState<TranslationStrings>(getTranslation('en'));

  useEffect(() => {
    // Detect language from URL path
    const path = location.pathname;
    const pathParts = path.split('/').filter(Boolean);
    const urlLang = pathParts[0];
    
    // Map URL lang code to Language type
    const langMap: Record<string, Language> = {
      'ar': 'ar',
      'de': 'de', 
      'fr': 'fr',
      'tr': 'tr',
      'ru': 'ru',
      'ja': 'ja',
    };
    
    const detectedLang = langMap[urlLang] || 'en';
    
    // Update store if different
    if (detectedLang !== storeLang) {
      setStoreLanguage(detectedLang);
    }
    
    // Get translations
    setT(getTranslation(detectedLang));
  }, [location.pathname, storeLang, setStoreLanguage]);

  return { t, lang: storeLang };
};

export default usePageTranslation;