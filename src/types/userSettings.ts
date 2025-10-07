export interface UserSettings {
  name: string;
  country: string;
  city: string;
  mainLanguage: string;
  additionalLanguages: string[];
  additional: string;
}

export const DEFAULT_USER_SETTINGS: UserSettings = {
  name: '',
  country: '',
  city: '',
  mainLanguage: '',
  additionalLanguages: [],
  additional: '',
};
