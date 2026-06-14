import { create } from 'zustand';
import { Lang } from '@/i18n/translations';

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

function getInitialLang(): Lang {
  const saved = localStorage.getItem('hotupdate_lang');
  if (saved === 'en' || saved === 'zh-TW') return saved;
  return 'en';
}

export const useLangStore = create<LangState>((set) => ({
  lang: getInitialLang(),
  setLang: (lang: Lang) => {
    localStorage.setItem('hotupdate_lang', lang);
    set({ lang });
  },
}));
