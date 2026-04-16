import { useState } from 'react';
import { useLanguageStore, useSetLanguage, languages, Language } from '@/hooks/useLanguage';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSwitcher = ({ className = "text-white" }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = useLanguageStore(s => s.language);
  const setLanguage = useSetLanguage();
  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  // Determine colors based on className
  const textColor = className.includes("white") ? "text-white" : "text-foreground";
  const hoverBg = className.includes("white") ? "hover:bg-white/10" : "hover:bg-accent/5";
  const dropdownBg = className.includes("white") ? "bg-slate-800" : "bg-background";
  const dropdownBorder = className.includes("white") ? "border-slate-700" : "border-border";
  const dropdownHover = className.includes("white") ? "hover:bg-slate-700" : "hover:bg-accent/5";
  const dropdownText = className.includes("white") ? "text-white" : "text-foreground";
  const subTextColor = className.includes("white") ? "text-slate-400" : "text-muted-foreground";

  const handleLanguageChange = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
    
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    
    const existingLangCode = pathParts[0];
    const hasLangPrefix = languages.some(l => l.code === existingLangCode);
    
    let newPath: string;
    if (code === 'en') {
      newPath = hasLangPrefix ? '/' + pathParts.slice(1).join('/') : currentPath;
    } else {
      if (hasLangPrefix) {
        pathParts[0] = code;
        newPath = '/' + pathParts.join('/');
      } else {
        newPath = `/${code}${currentPath === '/' ? '' : currentPath}`;
      }
    }
    
    window.location.href = newPath || '/';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 ${textColor} ${hoverBg} transition-colors py-2 px-3 rounded-lg`}
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm hidden sm:inline">{currentLanguage.nativeName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className={`absolute right-0 mt-2 w-48 ${dropdownBg} border ${dropdownBorder} rounded-lg shadow-xl z-50 overflow-hidden`}>
            <div className="py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-left ${dropdownHover} transition-colors ${
                    currentLang === lang.code 
                      ? 'text-accent bg-accent/10' 
                      : dropdownText
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{lang.nativeName}</div>
                    <div className={`text-xs ${subTextColor}`}>{lang.name}</div>
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