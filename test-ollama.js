// Test script for Ollama integration
const axios = require('axios');

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';

async function checkOllama() {
  try {
    const response = await axios.get('http://localhost:11434/api/tags', { timeout: 2000 });
    console.log('✓ Ollama is running');

    if (response.data && response.data.models) {
      const models = response.data.models.map(m => m.name);
      console.log(`✓ Available models: ${models.join(', ')}`);
      return models[0];
    }
  } catch (error) {
    console.error('✗ Ollama is not available');
    return null;
  }
}

async function testTranslation(model) {
  console.log(`\nTesting translation with model: ${model}`);

  const testText = "Start Game";
  const targetLanguage = "Turkish";

  const prompt = `Translate the following game text to ${targetLanguage}. Keep the same tone and style. Do not add explanations, only provide the translation.\n\nText: "${testText}"\n\nTranslation:`;

  try {
    console.log(`  Translating: "${testText}" to ${targetLanguage}...`);

    const response = await axios.post(OLLAMA_API_URL, {
      model: model,
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
      translation = translation.replace(/^(Translation|Çeviri|Tercüme):\s*/i, '');

      console.log(`✓ Translation: "${translation}"`);
      console.log(`✓ Response time: ${response.data.total_duration ? (response.data.total_duration / 1000000000).toFixed(2) + 's' : 'N/A'}`);

      return true;
    }
  } catch (error) {
    console.error(`✗ Translation failed: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('==========================================');
  console.log('Testing Ollama Integration');
  console.log('==========================================\n');

  const model = await checkOllama();

  if (!model) {
    console.log('\n✗ Cannot proceed without Ollama');
    return;
  }

  const success = await testTranslation(model);

  console.log('\n==========================================');
  if (success) {
    console.log('✓ All Ollama tests passed!');
  } else {
    console.log('✗ Some tests failed');
  }
  console.log('==========================================');
}

runTests();
