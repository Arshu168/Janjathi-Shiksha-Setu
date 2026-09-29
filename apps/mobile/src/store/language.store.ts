import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TRANSLATIONS, LanguageCode } from '../constants/translations';

interface LanguageState {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => Promise<void>;
  initLanguage: () => Promise<void>;
  t: (key: string, fallback?: string) => string;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: 'en',

  initLanguage: async () => {
    try {
      const savedLang = await AsyncStorage.getItem('app_language');
      if (savedLang && (savedLang in TRANSLATIONS)) {
        set({ language: savedLang as LanguageCode });
      }
    } catch (e) {
      console.warn('Failed to load language preference', e);
    }
  },

  setLanguage: async (lang: LanguageCode) => {
    try {
      await AsyncStorage.setItem('app_language', lang);
      set({ language: lang });
    } catch (e) {
      console.warn('Failed to persist language preference', e);
      set({ language: lang });
    }
  },

  t: (key: string, fallback?: string) => {
    const currentLang = get().language;
    const currentDict = TRANSLATIONS[currentLang];
    if (currentDict && currentDict[key]) {
      return currentDict[key];
    }
    // Fallback to English
    const enDict = TRANSLATIONS['en'];
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return fallback || key;
  },
}));

// Initialize language on import
useLanguageStore.getState().initLanguage();
