import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
];

function Sidebar({ selectedLanguage, onLanguageChange, temperature, onTemperatureChange }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Hedef Dil</h3>
      </div>

      <div className="language-list">
        {languages.map(lang => (
          <div
            key={lang.code}
            className={`language-item ${selectedLanguage === lang.code ? 'active' : ''}`}
            onClick={() => onLanguageChange(lang.code)}
          >
            <span className="language-flag">{lang.flag}</span>
            <span className="language-name">{lang.name}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="temperature-control">
          <h4>AI Temperature</h4>
          <div className="temperature-info">
            <span className="temp-label">Tutarlı</span>
            <span className="temp-value">{temperature.toFixed(1)}</span>
            <span className="temp-label">Yaratıcı</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
            className="temperature-slider"
          />
          <div className="temperature-description">
            {temperature <= 0.3 && (
              <small>Çok tutarlı - Her seferinde aynı çeviri</small>
            )}
            {temperature > 0.3 && temperature <= 0.6 && (
              <small>Dengeli - Tutarlı ama biraz varyasyon</small>
            )}
            {temperature > 0.6 && (
              <small>Yaratıcı - Her seferinde farklı yorumlar</small>
            )}
          </div>
        </div>

        <div className="info-box">
          <p>Ollama gereklidir</p>
          <small>localhost:11434</small>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
