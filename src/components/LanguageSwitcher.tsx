import { useState } from 'react';
import { useLanguageStore, useSetLanguage, languages, Language } from '@/hooks/useLanguage';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = useLanguageStore(s => s.language);
  const setLanguage = useSetLanguage();
  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  const handleLanguageChange = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
    
    // Get current path
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    
    // Check if already has language prefix
    const existingLangCode = pathParts[0];
    const hasLangPrefix = languages.some(l => l.code === existingLangCode);
    
    // Build new URL
    let newPath: string;
    if (code === 'en') {
      // Remove language prefix for English
      newPath = hasLangPrefix ? '/' + pathParts.slice(1).join('/') : currentPath;
    } else {
      if (hasLangPrefix) {
        // Replace existing language code
        pathParts[0] = code;
        newPath = '/' + pathParts.join('/');
      } else {
        // Add language prefix
        newPath = `/${code}${currentPath === '/' ? '' : currentPath}`;
      }
    }
    
    // Navigate to new URL
    window.location.href = newPath || '/';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/10"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm hidden sm:inline">{currentLanguage.nativeName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
            <div className="py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-slate-700 transition-colors ${
                    currentLang === lang.code 
                      ? 'text-accent bg-slate-700/50' 
                      : 'text-white'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{lang.nativeName}</div>
                    <div className="text-xs text-slate-400">{lang.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;