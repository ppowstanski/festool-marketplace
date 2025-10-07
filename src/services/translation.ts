// Language code mapping for LibreTranslate
const LANGUAGE_MAP: Record<string, string> = {
  en: 'en',
  de: 'de',
  fr: 'fr',
  it: 'it',
  es: 'es',
  pl: 'pl',
  cs: 'cs',
  nl: 'nl',
  pt: 'pt',
  sv: 'sv',
  da: 'da',
  no: 'no',
  fi: 'fi',
  hu: 'hu',
  ro: 'ro',
  sk: 'sk',
};

export interface TranslationResult {
  language: string;
  text: string;
}

export async function translateText(
  text: string,
  sourceLanguage: string,
  targetLanguages: string[]
): Promise<TranslationResult[]> {
  const results: TranslationResult[] = [];

  // Use auto-detect for source, translate to all selected languages
  const validTargets = targetLanguages
    .map(lang => lang.toLowerCase())
    .filter(lang => LANGUAGE_MAP[lang] && lang !== sourceLanguage.toLowerCase());

  console.log('Translating to languages:', validTargets);

  for (const targetLang of validTargets) {
    try {
      // Using Google Translate unofficial API via translate.googleapis.com
      // This is the same endpoint the Google Translate website uses
      const url = new URL('https://translate.googleapis.com/translate_a/single');
      url.searchParams.set('client', 'gtx');
      url.searchParams.set('sl', sourceLanguage);
      url.searchParams.set('tl', LANGUAGE_MAP[targetLang]);
      url.searchParams.set('dt', 't');
      url.searchParams.set('q', text);

      const response = await fetch(url.toString());

      if (!response.ok) {
        console.error(`Translation API error for ${targetLang}:`, response.status);
        throw new Error(`Translation failed for ${targetLang}: ${response.status}`);
      }

      const data = await response.json();

      // Google Translate returns: [[[translatedText, originalText, null, null, confidence], ...], ...]
      // We need to extract and combine all translated parts
      if (data && data[0] && Array.isArray(data[0])) {
        const translatedText = data[0]
          .map((part: any[]) => part[0])
          .filter(Boolean)
          .join('');

        results.push({
          language: targetLang,
          text: translatedText,
        });

        console.log(`Translation for ${targetLang} completed`);
      } else {
        throw new Error(`Invalid response format for ${targetLang}`);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`Translation error for ${targetLang}:`, error);
      // Continue with other languages even if one fails
    }
  }

  return results;
}

// Helper function to split text into chunks at sentence boundaries
function splitTextIntoChunks(text: string, maxLength: number): string[] {
  if (text.length <= maxLength) {
    return [text];
  }

  const chunks: string[] = [];
  const sentences = text.split(/([.!?]\s+)/); // Split but keep delimiters
  let currentChunk = '';

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];

    if ((currentChunk + sentence).length <= maxLength) {
      currentChunk += sentence;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        // If a single sentence is longer than maxLength, split it forcefully
        const words = sentence.split(' ');
        let wordChunk = '';

        for (const word of words) {
          if ((wordChunk + ' ' + word).length <= maxLength) {
            wordChunk += (wordChunk ? ' ' : '') + word;
          } else {
            if (wordChunk) chunks.push(wordChunk.trim());
            wordChunk = word;
          }
        }

        if (wordChunk) currentChunk = wordChunk;
      }
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

export function detectSourceLanguage(languages: string[]): string {
  // Simply use 'auto' for automatic language detection
  // Google Translate API supports 'auto' as source language
  return 'auto';
}
