import React, { useState } from 'react';
import './FileLoader.css';
import { parseFile } from '../utils/fileParser';

function FileLoader({ onFileLoad }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = async () => {
    setLoading(true);
    setError('');

    try {
      const file = await window.electronAPI.selectFile();

      if (file) {
        const translations = parseFile(file.name, file.content);

        if (translations.length === 0) {
          setError('Dosyadan çeviri metni çıkarılamadı. Desteklenen format: JSON, VDF, TXT, XML, PO');
          setLoading(false);
          return;
        }

        onFileLoad(file, translations);
      }
    } catch (err) {
      setError(`Dosya yüklenirken hata oluştu: ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="file-loader">
      <div className="loader-content">
        <div className="loader-icon">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <path
              d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10Z"
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M35 50L45 60L65 40"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#764ba2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h2>Lokalizasyon Dosyası Yükle</h2>
        <p>Steam oyununuzdan bir lokalizasyon dosyası seçin</p>

        <div className="supported-formats">
          <h4>Desteklenen Formatlar:</h4>
          <div className="format-tags">
            <span className="format-tag">.json</span>
            <span className="format-tag">.vdf</span>
            <span className="format-tag">.txt</span>
            <span className="format-tag">.xml</span>
            <span className="format-tag">.po</span>
          </div>
        </div>

        <button
          onClick={handleFileSelect}
          disabled={loading}
          className="load-button"
        >
          {loading ? 'Yükleniyor...' : 'Dosya Seç'}
        </button>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="tips">
          <h4>İpuçları:</h4>
          <ul>
            <li>Steam oyun klasöründeki lokalizasyon dosyalarını bulun</li>
            <li>Genellikle /localization veya /languages klasöründe bulunur</li>
            <li>Ollama servisinin çalıştığından emin olun (localhost:11434)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FileLoader;
