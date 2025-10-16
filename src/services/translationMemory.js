// Translation Memory - Çeviri hafızası sistemi
// Daha önce çevrilmiş metinleri hatırlar ve tekrar kullanır

class TranslationMemory {
  constructor() {
    this.storage = this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem('translationMemory');
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load translation memory:', error);
      return {};
    }
  }

  saveToLocalStorage() {
    try {
      localStorage.setItem('translationMemory', JSON.stringify(this.storage));
    } catch (error) {
      console.error('Failed to save translation memory:', error);
    }
  }

  generateKey(original, targetLanguage) {
    return `${targetLanguage}:${original.toLowerCase().trim()}`;
  }

  get(original, targetLanguage) {
    const key = this.generateKey(original, targetLanguage);
    return this.storage[key] || null;
  }

  add(original, translation, targetLanguage, sourceLanguage = 'en') {
    // Forward direction (source → target)
    const forwardKey = this.generateKey(original, targetLanguage);
    this.storage[forwardKey] = {
      original,
      translation,
      targetLanguage,
      sourceLanguage,
      timestamp: Date.now(),
      useCount: (this.storage[forwardKey]?.useCount || 0) + 1
    };

    // Reverse direction (target → source) for bidirectional lookup
    const reverseKey = this.generateKey(translation, sourceLanguage);
    this.storage[reverseKey] = {
      original: translation,
      translation: original,
      targetLanguage: sourceLanguage,
      sourceLanguage: targetLanguage,
      timestamp: Date.now(),
      useCount: (this.storage[reverseKey]?.useCount || 0) + 1,
      isReverse: true
    };

    this.saveToLocalStorage();
  }

  remove(original, targetLanguage) {
    const key = this.generateKey(original, targetLanguage);
    delete this.storage[key];
    this.saveToLocalStorage();
  }

  clear() {
    this.storage = {};
    this.saveToLocalStorage();
  }

  getAll(targetLanguage = null) {
    if (!targetLanguage) {
      return Object.values(this.storage);
    }

    return Object.values(this.storage).filter(
      item => item.targetLanguage === targetLanguage
    );
  }

  getStats() {
    const entries = Object.values(this.storage);
    const byLanguage = {};

    entries.forEach(entry => {
      if (!byLanguage[entry.targetLanguage]) {
        byLanguage[entry.targetLanguage] = 0;
      }
      byLanguage[entry.targetLanguage]++;
    });

    return {
      total: entries.length,
      byLanguage,
      lastUpdated: Math.max(...entries.map(e => e.timestamp), 0)
    };
  }

  // Fuzzy match - benzer çevirileri bul
  findSimilar(original, targetLanguage, threshold = 0.7) {
    const normalizedOriginal = original.toLowerCase().trim();
    const results = [];

    for (const key in this.storage) {
      const item = this.storage[key];

      if (item.targetLanguage !== targetLanguage) continue;

      const normalizedStored = item.original.toLowerCase().trim();
      const similarity = this.calculateSimilarity(normalizedOriginal, normalizedStored);

      if (similarity >= threshold) {
        results.push({
          ...item,
          similarity
        });
      }
    }

    return results.sort((a, b) => b.similarity - a.similarity);
  }

  calculateSimilarity(str1, str2) {
    // Basit Levenshtein mesafesi benzeri bir benzerlik hesaplama
    if (str1 === str2) return 1.0;

    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1.0;

    // Basit substring kontrolü
    if (longer.includes(shorter)) {
      return shorter.length / longer.length;
    }

    // Kelime bazlı benzerlik
    const words1 = str1.split(/\s+/);
    const words2 = str2.split(/\s+/);
    const commonWords = words1.filter(w => words2.includes(w));

    return commonWords.length / Math.max(words1.length, words2.length);
  }

  // Export translation memory to file
  exportToJSON() {
    return JSON.stringify(this.storage, null, 2);
  }

  // Import translation memory from file
  importFromJSON(jsonString) {
    try {
      const imported = JSON.parse(jsonString);

      // Mevcut hafıza ile birleştir
      this.storage = { ...this.storage, ...imported };
      this.saveToLocalStorage();

      return Object.keys(imported).length;
    } catch (error) {
      console.error('Failed to import translation memory:', error);
      throw new Error('Invalid translation memory format');
    }
  }
}

export default new TranslationMemory();
