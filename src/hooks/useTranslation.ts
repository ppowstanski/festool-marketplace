import { useUserSettings } from './useUserSettings';
import { translations, type TranslationKey } from '../i18n/translations';

export function useTranslation() {
  const { settings } = useUserSettings();
  const currentLanguage = settings.language || 'en';

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    let translation = translations[currentLanguage][key] || translations.en[key] || key;

    // Replace parameters like {count}, {time}, etc.
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, String(value));
      });
    }

    return translation;
  };

  return { t, currentLanguage };
}
