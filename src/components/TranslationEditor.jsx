import React, { useState, useEffect } from 'react';
import './TranslationEditor.css';
import ollamaService from '../services/ollamaService';
import { exportFile } from '../utils/fileParser';
import translationMemory from '../services/translationMemory';

function TranslationEditor({ file, translations, setTranslations, targetLanguage, temperature, onBack }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, translated, untranslated
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState(0);
  const [ollamaStatus, setOllamaStatus] = useState('checking');
  const [translationStatus, setTranslationStatus] = useState('');

  useEffect(() => {
    checkOllama();
  }, []);

  const checkOllama = async () => {
    const available = await ollamaService.checkAvailability();
    setOllamaStatus(available ? 'online' : 'offline');
  };

  const filteredTranslations = translations.filter(t => {
    const matchesSearch = t.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.original.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'translated' && t.translated) ||
                         (filterStatus === 'untranslated' && !t.translated);

    return matchesSearch && matchesFilter;
  });

  const handleTranslateSingle = async () => {
    if (!filteredTranslations[selectedIndex]) return;

    setIsTranslating(true);
    setTranslationStatus('Çeviri başlatılıyor...');

    try {
      const item = filteredTranslations[selectedIndex];

      // Translation memory'de var mı kontrol et
      setTranslationStatus('Translation memory kontrol ediliyor...');
      const cachedEntry = translationMemory.get(item.original, targetLanguage);

      let translation;
      if (cachedEntry) {
        setTranslationStatus('Önbellekten yükleniyor...');
        translation = cachedEntry.translation;
      } else {
        setTranslationStatus('AI ile çevriliyor... (Bu işlem 10-30 saniye sürebilir)');

        // Timeout ekle
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Çeviri zaman aşımına uğradı. Ollama çalışıyor mu kontrol edin.')), 45000)
        );

        const translationPromise = ollamaService.translate(item.original, targetLanguage, item.context, temperature);

        translation = await Promise.race([translationPromise, timeoutPromise]);
        translationMemory.add(item.original, translation, targetLanguage);
      }

      setTranslationStatus('Kaydediliyor...');
      const newTranslations = [...translations];
      const originalIndex = translations.findIndex(t => t.key === item.key);
      newTranslations[originalIndex] = { ...item, translated: translation };

      setTranslations(newTranslations);
      setTranslationStatus('Başarıyla tamamlandı!');

      // Başarı mesajını 2 saniye sonra temizle
      setTimeout(() => setTranslationStatus(''), 2000);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslationStatus(`HATA: ${error.message}`);

      // Daha detaylı hata mesajı göster
      let errorMessage = error.message;
      if (error.message.includes('timeout') || error.message.includes('zaman aşımı')) {
        errorMessage = 'Çeviri çok uzun sürdü! Ollama çalışıyor mu? Terminal\'de "ollama list" komutunu çalıştırıp kontrol edin.';
      } else if (error.message.includes('not available')) {
        errorMessage = 'Ollama çalışmıyor! Terminal\'de "ollama serve" komutunu çalıştırın.';
      }

      alert(`Çeviri hatası:\n\n${errorMessage}`);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTranslateAll = async () => {
    const untranslated = translations.filter(t => !t.translated);

    if (untranslated.length === 0) {
      alert('Tüm metinler zaten çevrilmiş!');
      return;
    }

    if (!confirm(`${untranslated.length} metin çevrilecek. Devam edilsin mi?`)) {
      return;
    }

    setIsTranslating(true);
    setTranslationProgress(0);

    try {
      const translated = await ollamaService.translateBatch(
        untranslated,
        targetLanguage,
        (progress) => setTranslationProgress(progress),
        temperature
      );

      // Translation memory'ye ekle
      translated.forEach(t => {
        if (t.translated && !t.error) {
          translationMemory.add(t.original, t.translated, targetLanguage);
        }
      });

      // Mevcut translations array'ini güncelle
      const newTranslations = [...translations];
      translated.forEach(translatedItem => {
        const index = newTranslations.findIndex(t => t.key === translatedItem.key);
        if (index !== -1) {
          newTranslations[index] = translatedItem;
        }
      });

      setTranslations(newTranslations);
      alert('Toplu çeviri tamamlandı!');
    } catch (error) {
      alert(`Toplu çeviri hatası: ${error.message}`);
    }

    setIsTranslating(false);
    setTranslationProgress(0);
  };

  const handleManualEdit = (value) => {
    const item = filteredTranslations[selectedIndex];
    const newTranslations = [...translations];
    const originalIndex = translations.findIndex(t => t.key === item.key);
    newTranslations[originalIndex] = { ...item, translated: value };
    setTranslations(newTranslations);
  };

  const handleExport = async () => {
    try {
      const exportedContent = exportFile(file.name, translations);
      const result = await window.electronAPI.saveFile({
        content: exportedContent,
        defaultPath: file.name.replace(/(\.[^.]+)$/, '_translated$1')
      });

      if (result) {
        alert('Dosya başarıyla kaydedildi!');
      }
    } catch (error) {
      alert(`Export hatası: ${error.message}`);
    }
  };

  const stats = {
    total: translations.length,
    translated: translations.filter(t => t.translated).length,
    untranslated: translations.filter(t => !t.translated).length
  };

  const currentItem = filteredTranslations[selectedIndex];

  return (
    <div className="translation-editor">
      <div className="editor-toolbar">
        <button onClick={onBack} className="back-button">
          ← Geri
        </button>

        <div className="file-info">
          <span className="file-name">{file.name}</span>
          <span className="file-stats">
            {stats.translated} / {stats.total} çevrildi
          </span>
        </div>

        <div className="ollama-status">
          <span className={`status-indicator ${ollamaStatus}`}></span>
          Ollama: {ollamaStatus === 'online' ? 'Çevrimiçi' : 'Çevrimdışı'}
        </div>

        <button
          onClick={handleTranslateAll}
          disabled={isTranslating || ollamaStatus === 'offline' || stats.untranslated === 0}
          className="translate-all-button"
        >
          Tümünü Çevir
        </button>

        <button onClick={handleExport} className="export-button">
          Export
        </button>
      </div>

      {isTranslating && translationProgress > 0 && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${translationProgress}%` }}>
            {Math.round(translationProgress)}%
          </div>
        </div>
      )}

      <div className="editor-controls">
        <input
          type="text"
          placeholder="Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">Tümü ({stats.total})</option>
          <option value="translated">Çevrilmiş ({stats.translated})</option>
          <option value="untranslated">Çevrilmemiş ({stats.untranslated})</option>
        </select>
      </div>

      <div className="editor-content">
        <div className="items-list">
          {filteredTranslations.map((item, index) => (
            <div
              key={item.key}
              className={`item-card ${index === selectedIndex ? 'selected' : ''} ${item.translated ? 'translated' : ''}`}
              onClick={() => setSelectedIndex(index)}
            >
              <div className="item-key">{item.key}</div>
              <div className="item-text">{item.original}</div>
              {item.translated && (
                <div className="item-translation">{item.translated}</div>
              )}
            </div>
          ))}
        </div>

        <div className="translation-panel">
          {currentItem && (
            <>
              <div className="panel-section">
                <label>Anahtar</label>
                <div className="key-display">{currentItem.key}</div>
                {currentItem.context && (
                  <div className="context-display">Context: {currentItem.context}</div>
                )}
              </div>

              <div className="panel-section">
                <label>Orijinal Metin</label>
                <textarea
                  value={currentItem.original}
                  readOnly
                  rows={4}
                  className="original-text"
                />
              </div>

              <div className="panel-section">
                <label>Çeviri</label>
                <textarea
                  value={currentItem.translated || ''}
                  onChange={(e) => handleManualEdit(e.target.value)}
                  placeholder="Çeviri buraya yazılacak..."
                  rows={6}
                  className="translation-text"
                />
              </div>

              <div className="panel-actions">
                <button
                  onClick={handleTranslateSingle}
                  disabled={isTranslating || ollamaStatus === 'offline'}
                  className="translate-button"
                >
                  {isTranslating ? 'Çevriliyor...' : 'AI ile Çevir'}
                </button>

                {translationStatus && (
                  <div className={`translation-status ${translationStatus.includes('HATA') ? 'error' : translationStatus.includes('Başarıyla') ? 'success' : 'info'}`}>
                    {translationStatus}
                  </div>
                )}

                <div className="navigation-buttons">
                  <button
                    onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
                    disabled={selectedIndex === 0}
                  >
                    ← Önceki
                  </button>
                  <button
                    onClick={() => setSelectedIndex(Math.min(filteredTranslations.length - 1, selectedIndex + 1))}
                    disabled={selectedIndex === filteredTranslations.length - 1}
                  >
                    Sonraki →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TranslationEditor;
