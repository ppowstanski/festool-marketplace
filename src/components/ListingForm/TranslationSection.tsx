import { useState, useEffect, useRef } from 'react';
import { translateText, detectSourceLanguage, type TranslationResult } from '../../services/translation';
import { LANGUAGES } from '../../constants/listing';

interface TranslationSectionProps {
  description: string;
  includedItems: string;
  selectedLanguages: string[];
  onTranslationsChange?: (translations: {
    description: TranslationResult[];
    includedItems: TranslationResult[];
  } | null) => void;
}

export function TranslationSection({ description, includedItems, selectedLanguages, onTranslationsChange }: TranslationSectionProps) {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translations, setTranslations] = useState<{
    description: TranslationResult[];
    includedItems: TranslationResult[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Track the original text that was translated
  const lastTranslatedRef = useRef<{ description: string; includedItems: string } | null>(null);

  // Invalidate translations when text changes
  useEffect(() => {
    if (lastTranslatedRef.current) {
      if (
        lastTranslatedRef.current.description !== description ||
        lastTranslatedRef.current.includedItems !== includedItems
      ) {
        setTranslations(null);
        lastTranslatedRef.current = null;
        onTranslationsChange?.(null);
      }
    }
  }, [description, includedItems, onTranslationsChange]);

  // Notify parent when translations change
  useEffect(() => {
    onTranslationsChange?.(translations);
  }, [translations, onTranslationsChange]);

  const handleTranslate = async () => {
    console.log('handleTranslate called', { description, includedItems, selectedLanguages });

    if (!description || !includedItems || selectedLanguages.length === 0) {
      setError('Please fill in description, included items, and select languages first');
      return;
    }

    setIsTranslating(true);
    setError(null);

    try {
      const sourceLanguage = detectSourceLanguage(selectedLanguages);
      console.log('Source language detected:', sourceLanguage);

      const [descTranslations, includedTranslations] = await Promise.all([
        translateText(description, sourceLanguage, selectedLanguages),
        translateText(includedItems, sourceLanguage, selectedLanguages),
      ]);

      console.log('Translations received:', { descTranslations, includedTranslations });

      const newTranslations = {
        description: descTranslations,
        includedItems: includedTranslations,
      };

      setTranslations(newTranslations);
      lastTranslatedRef.current = { description, includedItems };
    } catch (err) {
      setError('Translation failed. Please try again.');
      console.error('Translation error:', err);
    } finally {
      setIsTranslating(false);
    }
  };

  const getLanguageName = (code: string) => {
    const lang = LANGUAGES.find(l => l.code === code);
    return lang ? `${lang.flag} ${lang.name}` : code;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const copyAllTranslations = () => {
    if (!translations) return;

    let fullText = '=== TRANSLATED LISTING ===\n\n';

    translations.description.forEach((trans, index) => {
      const includedTrans = translations.includedItems[index];
      fullText += `--- ${getLanguageName(trans.language)} ---\n\n`;
      fullText += `Description:\n${trans.text}\n\n`;
      fullText += `What's Included:\n${includedTrans.text}\n\n`;
      fullText += '---\n\n';
    });

    navigator.clipboard.writeText(fullText);
  };

  return (
    <section className="bg-[#141414] border border-[#262626] rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#ededed]">🌍 Translations</h2>
        <button
          type="button"
          onClick={handleTranslate}
          disabled={isTranslating || !description || !includedItems || selectedLanguages.length === 0}
          className="px-4 py-2 bg-[#39b54a] text-white font-medium rounded-lg hover:bg-[#39b54a]/90 disabled:bg-[#262626] disabled:text-[#a3a3a3] disabled:cursor-not-allowed transition-colors text-sm"
        >
          {isTranslating ? (
            <>
              <svg className="inline w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Translating...
            </>
          ) : (
            <>
              <svg className="inline w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              Translate to All Languages
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3">
          <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {!translations && !isTranslating && (
        <div className="text-center py-8 text-[#a3a3a3]">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <p className="text-sm">Click "Translate to All Languages" to generate translations</p>
        </div>
      )}

      {translations && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#262626]">
            <p className="text-sm text-[#a3a3a3]">
              Translated into {translations.description.length} language(s)
            </p>
            <button
              type="button"
              onClick={copyAllTranslations}
              className="px-3 py-1 text-xs text-[#39b54a] hover:bg-[#39b54a]/10 rounded transition-colors"
            >
              Copy All
            </button>
          </div>

          {translations.description.map((trans, index) => (
            <div
              key={trans.language}
              className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[#ededed]">
                  {getLanguageName(trans.language)}
                </h3>
                <button
                  type="button"
                  onClick={() => copyToClipboard(`${trans.text}\n\n${translations.includedItems[index].text}`)}
                  className="p-1 text-[#a3a3a3] hover:text-[#39b54a] transition-colors"
                  title="Copy this translation"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>

              <div>
                <p className="text-xs text-[#a3a3a3] mb-1">Description:</p>
                <p className="text-sm text-[#ededed] whitespace-pre-wrap">{trans.text}</p>
              </div>

              <div>
                <p className="text-xs text-[#a3a3a3] mb-1">What's Included:</p>
                <p className="text-sm text-[#ededed] whitespace-pre-wrap">
                  {translations.includedItems[index].text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
