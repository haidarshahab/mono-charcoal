import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const SITE_URL = "https://monocharcoal.com";

export type Language = 'en' | 'ar' | 'de' | 'fr' | 'tr' | 'ru' | 'ja';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
];

export const defaultLanguage: Language = 'en';

export const getLanguageByCode = (code: string): LanguageOption => {
  return languages.find(l => l.code === code) || languages[0];
};

export const getLanguageDirection = (code: Language): 'ltr' | 'rtl' => {
  const lang = getLanguageByCode(code);
  return lang.dir;
};

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: defaultLanguage,
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'mono-charcoal-language',
    }
  )
);

export const useLanguage = () => useLanguageStore(state => state.language);
export const useSetLanguage = () => useLanguageStore(state => state.setLanguage);