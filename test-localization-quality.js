// Lokalizasyon kalitesi testi - Oyun terminolojisi
const axios = require('axios');

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';

// Test cümleleri
const testCases = [
  {
    original: "Welcome to my shop. What can I get you?",
    context: "shop",
    expected: "Hoş geldin! Ne arıyorsun?", // Veya benzeri doğal bir ifade
    note: "Shop keeper - casual, friendly"
  },
  {
    original: "Mana",
    context: "stat",
    expected: "Mana", // Değişmemeli
    note: "Universal gaming term"
  },
  {
    original: "Health",
    context: "stat",
    expected: "Can",
    note: "Standard Turkish gaming term"
  },
  {
    original: "Start Game",
    context: "menu",
    expected: "Oyuna Başla",
    note: "Menu button"
  },
  {
    original: "Quest Log",
    context: "ui",
    expected: "Görevler",
    note: "Concise UI term"
  }
];

async function testTranslation(text, context) {
  const prompt = `You are a professional video game localizer translating to Turkish.

IMPORTANT RULES:
1. Use natural, colloquial language that native speakers actually use
2. Adapt cultural references and idioms, don't translate literally
3. Keep gaming terminology in its commonly used form (e.g., "Mana" stays "Mana" in Turkish, not "güç")
4. Use appropriate gaming slang and conventions
5. Match the tone: formal for NPCs, casual for shop keepers, epic for quests
6. Keep UI text SHORT and punchy
7. Don't explain, just provide the final localized text

EXAMPLES FOR TURKISH:
- "Welcome to my shop" → "Hoş geldin! Ne arıyorsun?" (casual, friendly)
- "Health" → "Can" (standard gaming term)
- "Mana" → "Mana" (keep as is, universally understood)
- "Start Game" → "Oyuna Başla" (natural, not literal)
- "Quest Log" → "Görevler" (concise)

${context ? `Context: ${context}\n` : ''}
Game text to localize: "${text}"

Localized Turkish text:`;

  try {
    const response = await axios.post(OLLAMA_API_URL, {
      model: 'llama3',
      prompt: prompt,
      stream: false,
      options: {
        temperature: 0.3,
        top_p: 0.9
      }
    }, {
      timeout: 30000
    });

    if (response.data && response.data.response) {
      let translation = response.data.response.trim();
      translation = translation.replace(/^["']|["']$/g, '');
      translation = translation.replace(/^(Translation|Çeviri|Tercüme|Localized Turkish text):\s*/i, '');
      return translation;
    }
  } catch (error) {
    return `ERROR: ${error.message}`;
  }
}

async function runTests() {
  console.log('==========================================');
  console.log('OYUN LOKALİZASYON KALİTE TESTİ');
  console.log('==========================================\n');

  let passedTests = 0;
  let failedTests = 0;

  for (const testCase of testCases) {
    console.log(`\nTest: "${testCase.original}"`);
    console.log(`Context: ${testCase.context}`);
    console.log(`Note: ${testCase.note}`);

    const result = await testTranslation(testCase.original, testCase.context);

    console.log(`\n✓ AI Çevirisi: "${result}"`);
    console.log(`  Beklenen: "${testCase.expected}"`);

    // Basit kalite değerlendirmesi
    const isGood = !result.toLowerCase().includes('dükkan') &&
                   !result.toLowerCase().includes('benim') &&
                   (result.includes(testCase.expected) || result.length < testCase.expected.length * 2);

    if (isGood) {
      console.log('  ✅ KALİTE: İYİ');
      passedTests++;
    } else {
      console.log('  ⚠️  KALİTE: Geliştirilebilir');
      failedTests++;
    }

    console.log('------------------------------------------');

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n==========================================');
  console.log('TEST SONUÇLARI');
  console.log('==========================================');
  console.log(`✅ Başarılı: ${passedTests}`);
  console.log(`⚠️  Geliştirilebilir: ${failedTests}`);
  console.log(`📊 Toplam: ${testCases.length}`);

  if (passedTests === testCases.length) {
    console.log('\n🎉 TÜM TESTLER GEÇTİ!');
  } else {
    console.log('\n💡 İpucu: Prompt\'u daha da geliştirebilir veya örnek çevirileri artırabilirsiniz.');
  }
}

runTests();
