import React, { useState } from 'react';
import './App.css';
import FileLoader from './components/FileLoader';
import TranslationEditor from './components/TranslationEditor';
import Sidebar from './components/Sidebar';

function App() {
  const [currentFile, setCurrentFile] = useState(null);
  const [translations, setTranslations] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('tr');
  const [temperature, setTemperature] = useState(() => {
    const saved = localStorage.getItem('aiTemperature');
    return saved ? parseFloat(saved) : 0.2;
  });

  const handleTemperatureChange = (newTemp) => {
    setTemperature(newTemp);
    localStorage.setItem('aiTemperature', newTemp.toString());
  };

  const handleFileLoad = (file, parsedTranslations) => {
    setCurrentFile(file);
    setTranslations(parsedTranslations);
  };

  return (
    <div className="app">
      <Sidebar
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        temperature={temperature}
        onTemperatureChange={handleTemperatureChange}
      />
      <div className="main-content">
        <header className="app-header">
          <h1>Steam Lokalizasyon</h1>
          <p>Ücretsiz Oyun Çeviri Aracı</p>
        </header>

        {!currentFile ? (
          <FileLoader onFileLoad={handleFileLoad} />
        ) : (
          <TranslationEditor
            file={currentFile}
            translations={translations}
            setTranslations={setTranslations}
            targetLanguage={selectedLanguage}
            temperature={temperature}
            onBack={() => setCurrentFile(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
