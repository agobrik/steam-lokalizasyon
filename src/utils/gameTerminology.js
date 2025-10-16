// Oyun lokalizasyonu için standart terminoloji sözlüğü

export const GAME_TERMINOLOGY = {
  tr: {
    // RPG Stats
    'health': 'Can',
    'hp': 'Can',
    'mana': 'Mana',
    'mp': 'MP',
    'stamina': 'Dayanıklılık',
    'energy': 'Enerji',
    'rage': 'Öfke',

    // Actions
    'attack': 'Saldır',
    'defend': 'Savun',
    'cast': 'Büyü Yap',
    'use': 'Kullan',
    'equip': 'Kuşan',
    'unequip': 'Çıkar',
    'inventory': 'Envanter',
    'quest': 'Görev',
    'quest log': 'Görevler',
    'map': 'Harita',

    // UI
    'start game': 'Oyuna Başla',
    'load game': 'Oyun Yükle',
    'save game': 'Oyunu Kaydet',
    'settings': 'Ayarlar',
    'options': 'Seçenekler',
    'quit': 'Çıkış',
    'exit': 'Çık',
    'continue': 'Devam Et',
    'back': 'Geri',
    'cancel': 'İptal',
    'confirm': 'Onayla',
    'yes': 'Evet',
    'no': 'Hayır',

    // Shop
    'shop': 'Dükkan',
    'buy': 'Satın Al',
    'sell': 'Sat',
    'trade': 'Takas',
    'gold': 'Altın',
    'price': 'Fiyat',

    // Character
    'level': 'Seviye',
    'experience': 'Deneyim',
    'xp': 'XP',
    'skill': 'Yetenek',
    'talent': 'Yetenek',
    'class': 'Sınıf',
    'race': 'Irk',

    // Items
    'weapon': 'Silah',
    'armor': 'Zırh',
    'shield': 'Kalkan',
    'helmet': 'Miğfer',
    'boots': 'Botlar',
    'ring': 'Yüzük',
    'amulet': 'Kolye',
    'potion': 'İksir',

    // Quality
    'common': 'Sıradan',
    'uncommon': 'Nadir',
    'rare': 'Ender',
    'epic': 'Destansı',
    'legendary': 'Efsanevi',

    // Greetings & Shop Dialog (context-aware)
    'hello': 'Selam',
    'hi': 'Merhaba',
    'welcome': 'Hoş geldin',
    'goodbye': 'Hoşça kal',
    'farewell': 'Güle güle',
    'welcome to my shop': 'Hoş geldin! Ne arıyorsun?',
    "what can i get you": 'Ne istersin?',
    'looking for something': 'Bir şey mi arıyorsun?',
    'need anything': 'Bir ihtiyacın var mı?'
  },

  // İngilizce için REVERSE mapping (Türkçe → İngilizce)
  en: {
    // Shop Dialog
    'hoş geldin! ne arıyorsun?': 'Welcome to my shop. What can I get you?',
    'hoş geldin ne arıyorsun': 'Welcome to my shop. What can I get you?',
    'ne istersin': 'What can I get you?',
    'bir şey mi arıyorsun': 'Looking for something?',
    'bir ihtiyacın var mı': 'Need anything?',

    // Stats
    'can': 'Health',
    'mana': 'Mana',
    'dayanıklılık': 'Stamina',
    'enerji': 'Energy',

    // UI
    'oyuna başla': 'Start Game',
    'oyun yükle': 'Load Game',
    'oyunu kaydet': 'Save Game',
    'ayarlar': 'Settings',
    'seçenekler': 'Options',
    'çıkış': 'Quit',
    'çık': 'Exit',
    'devam et': 'Continue',
    'geri': 'Back',
    'iptal': 'Cancel',
    'onayla': 'Confirm',
    'evet': 'Yes',
    'hayır': 'No',

    // Actions
    'saldır': 'Attack',
    'savun': 'Defend',
    'kullan': 'Use',
    'kuşan': 'Equip',
    'çıkar': 'Unequip',
    'envanter': 'Inventory',
    'görevler': 'Quest Log',
    'görev': 'Quest',
    'harita': 'Map',

    // Shop
    'dükkan': 'Shop',
    'satın al': 'Buy',
    'sat': 'Sell',
    'takas': 'Trade',
    'altın': 'Gold',
    'fiyat': 'Price',

    // Items
    'silah': 'Weapon',
    'zırh': 'Armor',
    'kalkan': 'Shield',
    'miğfer': 'Helmet',
    'botlar': 'Boots',
    'yüzük': 'Ring',
    'kolye': 'Amulet',
    'iksir': 'Potion'
  },
  de: {},
  // ...
};

// Metinde terminoloji varsa önce sözlükten kontrol et
export function applyTerminology(text, targetLang = 'tr') {
  if (!GAME_TERMINOLOGY[targetLang]) {
    return null;
  }

  const terminology = GAME_TERMINOLOGY[targetLang];
  const lowerText = text.toLowerCase().trim();

  // TAM EŞLEŞME ZORUNLU - sadece tüm metin eşleşirse
  // "envanter" geçse bile "mana" eşleşmemeli
  if (terminology[lowerText]) {
    return terminology[lowerText];
  }

  return null;
}

// Çeviri önerisi için yakın terimleri bul
export function findSimilarTerms(text, targetLang = 'tr') {
  if (!GAME_TERMINOLOGY[targetLang]) {
    return [];
  }

  const terminology = GAME_TERMINOLOGY[targetLang];
  const lowerText = text.toLowerCase();
  const suggestions = [];

  for (const [key, value] of Object.entries(terminology)) {
    if (key.includes(lowerText) || lowerText.includes(key)) {
      suggestions.push({ key, value });
    }
  }

  return suggestions;
}

// Context-based translation hints
export function getContextHints(text, context = '') {
  const hints = [];

  // Shop context
  if (context.toLowerCase().includes('shop') ||
      context.toLowerCase().includes('merchant') ||
      context.toLowerCase().includes('store')) {
    hints.push('Use casual, friendly shopkeeper tone');
    hints.push('Example: "What are you looking for?" → "Ne arıyorsun?"');
  }

  // NPC dialog
  if (context.toLowerCase().includes('dialog') ||
      context.toLowerCase().includes('npc')) {
    hints.push('Use character-appropriate tone');
    hints.push('Consider formality based on NPC type');
  }

  // UI elements
  if (context.toLowerCase().includes('menu') ||
      context.toLowerCase().includes('ui') ||
      context.toLowerCase().includes('button')) {
    hints.push('Keep it SHORT and clear');
    hints.push('Use imperative form for actions');
  }

  // Quest/Story
  if (context.toLowerCase().includes('quest') ||
      context.toLowerCase().includes('story')) {
    hints.push('Use epic, engaging language');
    hints.push('Maintain narrative flow');
  }

  return hints;
}
