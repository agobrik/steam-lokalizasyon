// Steam oyun dosyalarını parse etmek için yardımcı fonksiyonlar

// JSON dosyası parse
export function parseJSON(content) {
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

// VDF (Valve Data Format) parse - Steam'in kendi formatı
export function parseVDF(content) {
  const translations = [];
  const lines = content.split('\n');
  let currentSection = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Section başlangıcı
    if (line.includes('{')) {
      const match = line.match(/"([^"]+)"/);
      if (match) {
        currentSection = match[1];
      }
    }

    // Key-value pair
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

// Plain text parse (key=value formatı)
export function parseTextFile(content) {
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

// XML dosyası parse
export function parseXML(content) {
  const translations = [];
  const stringRegex = /<string[^>]*name=["']([^"']+)["'][^>]*>([^<]*)<\/string>/g;

  let match;
  while ((match = stringRegex.exec(content)) !== null) {
    translations.push({
      key: match[1],
      original: match[2],
      translated: '',
      context: 'xml'
    });
  }

  return translations;
}

// PO (Portable Object) dosyası parse - gettext formatı
export function parsePO(content) {
  const translations = [];
  const entries = content.split('\n\n');

  for (const entry of entries) {
    const lines = entry.split('\n');
    let msgid = '';
    let msgstr = '';
    let context = '';

    for (const line of lines) {
      if (line.startsWith('msgctxt')) {
        context = line.match(/"([^"]*)"/)?.[1] || '';
      } else if (line.startsWith('msgid')) {
        msgid = line.match(/"([^"]*)"/)?.[1] || '';
      } else if (line.startsWith('msgstr')) {
        msgstr = line.match(/"([^"]*)"/)?.[1] || '';
      }
    }

    if (msgid) {
      translations.push({
        key: msgid,
        original: msgid,
        translated: msgstr,
        context
      });
    }
  }

  return translations;
}

// Ana parse fonksiyonu - dosya uzantısına göre uygun parser'ı seçer
export function parseFile(fileName, content) {
  const extension = fileName.split('.').pop().toLowerCase();

  switch (extension) {
    case 'json':
      return parseJSON(content);
    case 'vdf':
      return parseVDF(content);
    case 'xml':
      return parseXML(content);
    case 'po':
      return parsePO(content);
    case 'txt':
    default:
      return parseTextFile(content);
  }
}

// Çevrilmiş dosyayı export et
export function exportFile(fileName, translations) {
  const extension = fileName.split('.').pop().toLowerCase();

  switch (extension) {
    case 'json':
      return exportJSON(translations);
    case 'vdf':
      return exportVDF(translations);
    case 'xml':
      return exportXML(translations);
    case 'po':
      return exportPO(translations);
    case 'txt':
    default:
      return exportTextFile(translations);
  }
}

function exportJSON(translations) {
  const result = {};

  for (const t of translations) {
    const keys = t.key.split('.');
    let current = result;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = t.translated || t.original;
  }

  return JSON.stringify(result, null, 2);
}

function exportVDF(translations) {
  let output = '"lang"\n{\n';
  let currentContext = '';

  for (const t of translations) {
    if (t.context && t.context !== currentContext) {
      if (currentContext) {
        output += '}\n';
      }
      currentContext = t.context;
      output += `  "${currentContext}"\n  {\n`;
    }

    const value = t.translated || t.original;
    output += `    "${t.key}"\t\t"${value}"\n`;
  }

  if (currentContext) {
    output += '  }\n';
  }
  output += '}\n';

  return output;
}

function exportTextFile(translations) {
  return translations
    .map(t => `${t.key}=${t.translated || t.original}`)
    .join('\n');
}

function exportXML(translations) {
  let output = '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n';

  for (const t of translations) {
    const value = t.translated || t.original;
    output += `  <string name="${t.key}">${value}</string>\n`;
  }

  output += '</resources>\n';
  return output;
}

function exportPO(translations) {
  let output = '';

  for (const t of translations) {
    if (t.context) {
      output += `msgctxt "${t.context}"\n`;
    }
    output += `msgid "${t.original}"\n`;
    output += `msgstr "${t.translated || ''}"\n\n`;
  }

  return output;
}
