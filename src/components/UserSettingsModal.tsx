import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useUserSettings } from '../hooks/useUserSettings';
import { COUNTRIES, LANGUAGES } from '../constants/listing';
import { MaterialInput } from './ListingForm/MaterialInput';
import { MaterialSelect } from './ListingForm/MaterialSelect';
import { MaterialTextarea } from './ListingForm/MaterialTextarea';

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserSettingsModal({ isOpen, onClose }: UserSettingsModalProps) {
  const { settings, updateSettings } = useUserSettings();
  const [formData, setFormData] = useState(settings);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    onClose();
  };

  const handleAdditionalLanguageToggle = (langCode: string) => {
    setFormData(prev => ({
      ...prev,
      additionalLanguages: (prev.additionalLanguages || []).includes(langCode)
        ? (prev.additionalLanguages || []).filter(l => l !== langCode)
        : [...(prev.additionalLanguages || []), langCode],
    }));
  };

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-start justify-center p-4 pt-20 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#141414] border border-[#262626] rounded-2xl max-w-2xl w-full mb-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#141414] border-b border-[#262626] px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-[#ededed]">User Settings</h2>
          <button
            onClick={onClose}
            className="p-2 text-[#a3a3a3] hover:text-[#ededed] hover:bg-[#262626] rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Name */}
          <MaterialInput
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />

          {/* Country */}
          <MaterialSelect
            label="Country"
            value={formData.country}
            onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
            required
          >
            <option value="">Select your country</option>
            {COUNTRIES.map(country => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </MaterialSelect>

          {/* City */}
          <MaterialInput
            label="City"
            value={formData.city}
            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
            required
          />

          {/* Interface Language */}
          <MaterialSelect
            label="Interface Language"
            value={formData.language}
            onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value as any }))}
            required
          >
            <option value="en">🇬🇧 English</option>
            <option value="de">🇩🇪 Deutsch (German)</option>
            <option value="pl">🇵🇱 Polski (Polish)</option>
          </MaterialSelect>

          {/* Main Language */}
          <MaterialSelect
            label="Main Language"
            value={formData.mainLanguage}
            onChange={(e) => setFormData(prev => ({ ...prev, mainLanguage: e.target.value }))}
            required
          >
            <option value="">Select your main language</option>
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </MaterialSelect>

          {/* Additional Languages */}
          <div>
            <label className="block text-sm font-medium text-[#ededed] mb-3">
              Additional Languages (optional)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {LANGUAGES.filter(lang => lang.code !== formData.mainLanguage).map(lang => (
                <label
                  key={lang.code}
                  className="flex items-center gap-2 cursor-pointer text-[#ededed] hover:bg-[#262626] p-2 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.additionalLanguages?.includes(lang.code) || false}
                    onChange={() => handleAdditionalLanguageToggle(lang.code)}
                    className="w-4 h-4 text-[#39b54a] bg-[#0a0a0a] border-[#262626] rounded focus:ring-[#39b54a]"
                  />
                  <span className="text-sm">{lang.flag} {lang.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <MaterialTextarea
            label="Additional Information (optional)"
            value={formData.additional}
            onChange={(e) => setFormData(prev => ({ ...prev, additional: e.target.value }))}
            rows={4}
            placeholder="Any additional details you'd like to share..."
          />

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#262626]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-sm font-medium text-[#a3a3a3] hover:text-[#ededed] hover:bg-[#262626] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#39b54a] text-white font-semibold rounded-lg hover:bg-[#39b54a]/90 transition-colors shadow-lg shadow-[#39b54a]/20"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
