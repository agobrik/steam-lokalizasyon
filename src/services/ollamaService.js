import axios from 'axios';
import { applyTerminology, getContextHints } from '../utils/gameTerminology.js';

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';

class OllamaService {
  constructor() {
    this.model = 'mistral'; // Default model
    this.isAvailable = false;
    this.checkAvailability();
  }

  async checkAvailability() {
    try {
      const response = await axios.get('http://localhost:11434/api/tags', { timeout: 2000 });
      this.isAvailable = true;

      // Mevcut modelleri kontrol et
      if (response.data && response.data.models) {
        const models = response.data.models.map(m => m.name);

        // Tercih sırasına göre model seç
        if (models.some(m => m.includes('mistral'))) {
          this.model = models.find(m => m.includes('mistral'));
        } else if (models.some(m => m.includes('llama'))) {
          this.model = models.find(m => m.includes('llama'));
        } else if (models.length > 0) {
          this.model = models[0];
        }
      }

      return true;
    } catch (error) {
      this.isAvailable = false;
      return false;
    }
  }

  async translate(text, targetLanguage = 'Turkish', context = '', temperature = 0.2) {
    if (!this.isAvailable) {
      await this.checkAvailability();
      if (!this.isAvailable) {
        throw new Error('Ollama is not available. Please make sure Ollama is running.');
      }
    }

    // Önce terminoloji sözlüğünden kontrol et
    const directTranslation = applyTerminology(text, targetLanguage);
    if (directTranslation) {
      return directTranslation;
    }

    const languageNames = {
      'tr': 'Turkish',
      'en': 'English',
      'de': 'German',
      'fr': 'French',
      'es': 'Spanish',
      'it': 'Italian',
      'ru': 'Russian',
      'zh': 'Chinese',
      'ja': 'Japanese',
      'ko': 'Korean',
      'pt': 'Portuguese',
      'ar': 'Arabic'
    };

    const langName = languageNames[targetLanguage] || targetLanguage;

    // Context-based hints al
    const contextHints = getContextHints(text, context);

    // Oyun lokalizasyonuna özel detaylı prompt
    let prompt = `You are an EXPERT video game localizer, NOT a translator. Your job is LOCALIZATION, not direct translation.

IMPORTANT: You are localizing FROM ENGLISH to ${langName}. The source text is in ENGLISH.

CRITICAL RULES - READ CAREFULLY:
1. 🚫 DO NOT DO WORD-BY-WORD TRANSLATION! This is localization!
2. ✅ Use natural, native-speaker language (like a real gamer would speak)
3. ✅ Adapt the meaning, not the words
4. ✅ For WELL-KNOWN international gaming terms (like "HP", "Boss", "Level"), you MAY keep them if commonly used
5. ✅ Match the tone and personality of the original
6. ✅ Be concise for UI elements
7. ✅ Cultural adaptation is KEY - make it feel native!
8. ✅ When in doubt, LOCALIZE - don't just keep English words

SOURCE LANGUAGE: English
TARGET LANGUAGE: ${langName}

LOCALIZATION EXAMPLES (English → ${langName}):
English: "Health"
❌ BAD (for Turkish): "Sağlık" (too formal)
✅ GOOD (for Turkish): "Can" (natural gaming term)

English: "Welcome to my shop"
❌ BAD (for Turkish): "Mağazama hoş geldiniz" (too formal)
✅ GOOD (for Turkish): "Hoş geldin! Ne arıyorsun?" (natural, casual)

English: "Inventory"
❌ BAD (for Turkish): "Inventory" (keeping English word)
✅ GOOD (for Turkish): "Envanter" (proper localization)

English: "Mana"
❌ BAD (for Chinese): "mana" (keeping English)
✅ GOOD (for Chinese): "法力" or "魔力" (proper Chinese term)

English: "Start Game"
❌ BAD: Lowercase or literal word-by-word
✅ GOOD: Natural, properly capitalized for target language

CONSISTENCY RULES - VERY IMPORTANT:
- If you localize "A" as "B", then reverse localization of "B" MUST return to "A"
- Example: "Welcome to my shop" → "Hoş geldin! Ne arıyorsun?"
  Then: "Hoş geldin! Ne arıyorsun?" → "Welcome to my shop"
- DO NOT create random alternatives - be CONSISTENT!
- Check if this text might be a reverse translation of your previous work
- Maintain MEANING equivalence even if words differ

REMEMBER:
- Localize FROM English TO ${langName} (or reverse if source is ${langName})
- Make it feel NATIVE to ${langName} speakers
- Think like a gamer, not a dictionary!
- BE CONSISTENT across translations!

`;

    if (context) {
      prompt += `Context: ${context}\n`;
    }

    // Context hints ekle
    if (contextHints.length > 0) {
      prompt += `\nAdditional hints:\n${contextHints.join('\n')}\n`;
    }

    prompt += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOW LOCALIZE THIS TEXT:

Original: "${text}"

CRITICAL INSTRUCTIONS:
❌ DO NOT write "Localized text:" or any prefix
❌ DO NOT add notes or explanations
❌ DO NOT add anything in parentheses like "(Note: ...)"
❌ DO NOT use quotation marks in your answer
❌ DO NOT ADD EMOJIS unless they exist in the original text
❌ For Chinese: Use Chinese characters (汉字), NOT pinyin
❌ For Russian: Use Cyrillic (кириллица), NOT Latin
❌ For Japanese: Use proper Japanese script (漢字/ひらがな/カタカナ), NOT romaji
❌ For Korean: Use Hangul (한글), NOT romanization
✅ ONLY output the final localized ${langName} text
✅ Nothing else, just the text itself
✅ Keep the same punctuation style as the original
✅ Use the NATIVE script of the target language

Your ${langName} localization:`;


    try {
      // Çince için özel sistem mesajı
      let system = '';
      if (targetLanguage === 'zh' || langName === 'Chinese') {
        system = 'You MUST output in Chinese characters (汉字), NOT pinyin or romanization. If you cannot write Chinese characters, say "I cannot write Chinese" instead of using pinyin.';
      } else if (targetLanguage === 'ja' || langName === 'Japanese') {
        system = 'You MUST output in Japanese script (漢字/ひらがな/カタカナ), NOT romaji.';
      } else if (targetLanguage === 'ko' || langName === 'Korean') {
        system = 'You MUST output in Hangul (한글), NOT romanization.';
      } else if (targetLanguage === 'ru' || langName === 'Russian') {
        system = 'You MUST output in Cyrillic (кириллица), NOT Latin alphabet.';
      }

      const requestBody = {
        model: this.model,
        prompt: prompt,
        stream: false,
        options: {
          temperature: temperature, // Kullanıcı tarafından ayarlanabilir
          top_p: 0.85,
          top_k: 30,
          repeat_penalty: 1.1 // Tutarlılık için
        }
      };

      if (system) {
        requestBody.system = system;
      }

      const response = await axios.post(OLLAMA_API_URL, requestBody, {
        timeout: 30000 // 30 saniye timeout
      });

      if (response.data && response.data.response) {
        // Çeviriyi temizle
        let translation = response.data.response.trim();

        // "Localized text:" gibi prefix'leri kaldır (case insensitive)
        translation = translation.replace(/^(Localized text|Translation|Çeviri|Tercüme|Localized|German|Turkish|Chinese|French|Spanish|Italian|Russian|Japanese|Korean|Portuguese|Arabic|English):\s*/gi, '');

        // Tırnak işaretlerini kaldır (başta ve sonda)
        translation = translation.replace(/^["'`]+|["'`]+$/g, '');

        // Parantez içindeki notları kaldır (Note: ...), (Anmerkung: ...) vs.
        translation = translation.replace(/\s*\([^)]*Note[^)]*\)/gi, '');
        translation = translation.replace(/\s*\([^)]*Anmerkung[^)]*\)/gi, '');
        translation = translation.replace(/\s*\([^)]*注意[^)]*\)/gi, '');

        // Eğer orijinal metinde emoji yoksa, çıktıdan emoji'leri kaldır
        const hasEmojiInOriginal = /[\p{Emoji}]/u.test(text);
        if (!hasEmojiInOriginal) {
          // Emoji'leri kaldır
          translation = translation.replace(/[\p{Emoji}\p{Emoji_Presentation}\p{Emoji_Modifier}\p{Emoji_Modifier_Base}\p{Emoji_Component}]/gu, '').trim();
        }

        // Script validation - doğru alfabeyi kullanıyor mu kontrol et
        if (targetLanguage === 'zh' || langName === 'Chinese') {
          // Çince için: Çince karakterler olmalı, pinyin olmamalı
          const hasChinese = /[\u4e00-\u9fff]/.test(translation);
          const isPinyin = /^[a-zA-Z\s!?.,:;]+$/.test(translation);
          if (!hasChinese || isPinyin) {
            throw new Error('AI Çinceyi Latin harflerle (pinyin) yazdı. Çince karakterler bekleniyor. Model Çince desteklemiyor olabilir.');
          }
        }

        if (targetLanguage === 'ru' || langName === 'Russian') {
          // Rusça için: Kiril alfabesi olmalı
          const hasCyrillic = /[\u0400-\u04FF]/.test(translation);
          if (!hasCyrillic && translation.length > 3) {
            throw new Error('AI Rusçayı Latin harflerle yazdı. Kiril alfabesi bekleniyor.');
          }
        }

        if (targetLanguage === 'ja' || langName === 'Japanese') {
          // Japonca için: Hiragana, Katakana veya Kanji olmalı
          const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4e00-\u9fff]/.test(translation);
          if (!hasJapanese && translation.length > 3) {
            throw new Error('AI Japoncayı romaji ile yazdı. Japonca karakterler bekleniyor.');
          }
        }

        if (targetLanguage === 'ko' || langName === 'Korean') {
          // Korece için: Hangul olmalı
          const hasHangul = /[\uac00-\ud7af]/.test(translation);
          if (!hasHangul && translation.length > 3) {
            throw new Error('AI Korece\'yi Latin harflerle yazdı. Hangul bekleniyor.');
          }
        }

        // Eğer çeviri sadece tırnak işaretlerinden ibaretse veya boşsa
        if (!translation || translation.match(/^["'`\s]*$/)) {
          throw new Error('AI boş çeviri döndürdü. Lütfen tekrar deneyin.');
        }

        // Son temizlik
        translation = translation.trim();

        return translation;
      }

      throw new Error('Invalid response from Ollama');
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error(`Translation failed: ${error.message}`);
    }
  }

  async translateBatch(texts, targetLanguage = 'Turkish', onProgress = null, temperature = 0.2) {
    const results = [];
    const total = texts.length;

    for (let i = 0; i < total; i++) {
      try {
        const translation = await this.translate(
          texts[i].original,
          targetLanguage,
          texts[i].context,
          temperature
        );

        results.push({
          ...texts[i],
          translated: translation
        });

        if (onProgress) {
          onProgress((i + 1) / total * 100);
        }
      } catch (error) {
        console.error(`Failed to translate item ${i}:`, error);
        results.push({
          ...texts[i],
          translated: texts[i].original,
          error: error.message
        });
      }

      // Rate limiting - Ollama'yı boğmamak için kısa bekleme
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return results;
  }

  setModel(modelName) {
    this.model = modelName;
  }

  getModel() {
    return this.model;
  }

  async getAvailableModels() {
    try {
      const response = await axios.get('http://localhost:11434/api/tags', { timeout: 2000 });
      if (response.data && response.data.models) {
        return response.data.models.map(m => m.name);
      }
      return [];
    } catch (error) {
      console.error('Failed to get models:', error);
      return [];
    }
  }
}

export default new OllamaService();
