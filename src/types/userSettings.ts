import type { Language } from '../i18n/translations';

export interface UserSettings {
  name: string;
  country: string;
  city: string;
  language: Language; // UI language
  mainLanguage: string;
  additionalLanguages: string[];
  additional: string;
}

export const DEFAULT_USER_SETTINGS: UserSettings = {
  name: '',
  country: '',
  city: '',
  language: 'en',
  mainLanguage: '',
  additionalLanguages: [],
  additional: '',
};
