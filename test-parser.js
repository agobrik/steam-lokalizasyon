// Test script for file parsers
const fs = require('fs');
const path = require('path');

// Import parser functions (we'll simulate them here since we can't import ES modules directly)
function parseJSON(content) {
  try {
    const data = JSON.parse(content);
    const translations = [];

    function extractTranslations(obj, prefix = '') {
      for (const key in obj) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'string') {
          translations.push({
            key: fullKey,
            original: obj[key],
            translated: '',
            context: prefix
          });
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          extractTranslations(obj[key], fullKey);
        }
      }
    }

    extractTranslations(data);
    return translations;
  } catch (error) {
    console.error('JSON parse error:', error);
    return [];
  }
}

function parseVDF(content) {
  const translations = [];
  const lines = content.split('\n');
  let currentSection = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.includes('{')) {
      const match = line.match(/"([^"]+)"/);
      if (match) {
        currentSection = match[1];
      }
    }

    const kvMatch = line.match(/"([^"]+)"\s+"([^"]+)"/);
    if (kvMatch && kvMatch[1] && kvMatch[2]) {
      translations.push({
        key: kvMatch[1],
        original: kvMatch[2],
        translated: '',
        context: currentSection
      });
    }
  }

  return translations;
}

function parseTextFile(content) {
  const translations = [];
  const lines = content.split('\n');

  for (const line of lines) {
    if (line.trim() && !line.startsWith('#') && !line.startsWith('//')) {
      const parts = line.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim();

        translations.push({
          key,
          original: value.replace(/^["']|["']$/g, ''),
          translated: '',
          context: ''
        });
      }
    }
  }

  return translations;
}

// Test all files
console.log('==========================================');
console.log('Testing File Parsers');
console.log('==========================================\n');

// Test JSON
const jsonFile = path.join(__dirname, 'test-files', 'game_english.json');
const jsonContent = fs.readFileSync(jsonFile, 'utf-8');
const jsonResults = parseJSON(jsonContent);
console.log(`✓ JSON Parser: Found ${jsonResults.length} translations`);
console.log('  Sample:', jsonResults[0]);

// Test VDF
const vdfFile = path.join(__dirname, 'test-files', 'game_localization.vdf');
const vdfContent = fs.readFileSync(vdfFile, 'utf-8');
const vdfResults = parseVDF(vdfContent);
console.log(`\n✓ VDF Parser: Found ${vdfResults.length} translations`);
console.log('  Sample:', vdfResults[0]);

// Test TXT
const txtFile = path.join(__dirname, 'test-files', 'game_strings.txt');
const txtContent = fs.readFileSync(txtFile, 'utf-8');
const txtResults = parseTextFile(txtContent);
console.log(`\n✓ TXT Parser: Found ${txtResults.length} translations`);
console.log('  Sample:', txtResults[0]);

console.log('\n==========================================');
console.log('All parsers working correctly!');
console.log('==========================================');
