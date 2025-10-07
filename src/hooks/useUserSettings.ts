import { useState, useEffect } from 'react';
import type { UserSettings } from '../types/userSettings';
import { DEFAULT_USER_SETTINGS } from '../types/userSettings';

const STORAGE_KEY = 'festool-user-settings';

const loadSettings = (): UserSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_USER_SETTINGS;

    const parsed = JSON.parse(stored);

    // Migration: convert old 'languages' to new structure
    if (parsed.languages && !parsed.mainLanguage) {
      return {
        ...DEFAULT_USER_SETTINGS,
        ...parsed,
        mainLanguage: parsed.languages[0] || '',
        additionalLanguages: parsed.languages.slice(1) || [],
      };
    }

    // Ensure additionalLanguages exists
    return {
      ...DEFAULT_USER_SETTINGS,
      ...parsed,
      additionalLanguages: parsed.additionalLanguages || [],
    };
  } catch (error) {
    console.error('Error loading user settings:', error);
    return DEFAULT_USER_SETTINGS;
  }
};

export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings>(loadSettings);

  // Save to localStorage when settings change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('userSettingsChanged', { detail: settings }));
    } catch (error) {
      console.error('Error saving user settings:', error);
    }
  }, [settings]);

  // Listen for settings changes from other components
  useEffect(() => {
    const handleSettingsChange = (e: Event) => {
      const customEvent = e as CustomEvent<UserSettings>;
      setSettings(customEvent.detail);
    };

    window.addEventListener('userSettingsChanged', handleSettingsChange);
    return () => window.removeEventListener('userSettingsChanged', handleSettingsChange);
  }, []);

  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_USER_SETTINGS);
  };

  return {
    settings,
    updateSettings,
    resetSettings,
  };
}
