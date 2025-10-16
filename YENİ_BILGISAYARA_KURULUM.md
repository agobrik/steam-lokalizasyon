# Yeni Bilgisayara Kurulum - Basit Rehber

## 🚀 3 Adımda Kurulum

### 1️⃣ Projeyi Kopyalayın

Tüm `steam-lokalizasyon` klasörünü yeni bilgisayara kopyalayın.

**Seçenekler**:
- USB bellek ile taşıyın
- Network üzerinden kopyalayın
- Cloud (Google Drive, OneDrive) kullanın
- ZIP ile sıkıştırıp gönderin

### 2️⃣ Gerekli Yazılımları Yükleyin

Yeni bilgisayarda sadece 2 yazılım gerekli:

#### A) Node.js
- İndirin: https://nodejs.org
- **ÖNEMLİ**: "Add to PATH" seçeneğini işaretleyin
- Kurulumdan sonra test edin:
```cmd
node --version
```

#### B) Ollama
- İndirin: https://ollama.ai/download
- Kurun ve bir model indirin:
```cmd
ollama pull llama3
```

### 3️⃣ Uygulamayı Başlatın

Proje klasöründe **install.bat** dosyasına çift tıklayın!

```
steam-lokalizasyon\
├── install.bat  ← BU DOSYAYA ÇİFT TIKLAYIN!
```

İlk çalıştırmada `npm install` otomatik yapılacak (~2-3 dakika).

**Sonraki kullanımlar için**: `start.bat` dosyasına çift tıklayın.

---

## 📁 Neler Taşınmalı?

### MİNİMUM (Önerilen)
```
steam-lokalizasyon\
├── electron/
├── src/
├── test-files/
├── package.json
├── install.bat  ← Önemli!
├── start.bat    ← Önemli!
└── ... (tüm dosyalar)
```
**Boyut**: ~50MB (node_modules hariç)

### TAM PAKET (Hızlı Kurulum)
```
Tüm klasörü kopyalayın (node_modules dahil)
```
**Boyut**: ~350MB
**Avantaj**: `npm install` gerektirmez, direkt `start.bat` çalıştırın

---

## ⚡ Hızlı Başlangıç

1. Projeyi kopyalayın
2. Node.js + Ollama yükleyin
3. `install.bat`'a çift tıklayın
4. **İşte bu kadar!**

---

## 🎯 Kullanım

### İlk Kurulum
```
install.bat'a çift tıklayın
```

### Her Gün
```
start.bat'a çift tıklayın
```

### Manuel Başlatma
```cmd
npm run dev
```

---

## 📋 Kurulum Checklist

Yeni bilgisayarda kontrol edin:

- [ ] Proje klasörü kopyalandı
- [ ] Node.js yüklendi (`node --version` çalışıyor)
- [ ] Ollama yüklendi (http://localhost:11434 erişilebilir)
- [ ] Model indirildi (`ollama list` ile kontrol)
- [ ] `install.bat` çalıştırıldı
- [ ] Uygulama açıldı ve çalışıyor ✓

---

## 🐛 Sorun Çözümleri

### "node komutu bulunamadı"
➤ Node.js'i PATH ile yeniden yükleyin
➤ Komut satırını kapatıp yeniden açın

### "Ollama bağlanamıyor"
➤ Ollama servisini başlatın: `ollama serve`
➤ Model indirin: `ollama pull llama3`

### "npm install hata veriyor"
➤ Cache temizleyin: `npm cache clean --force`
➤ `node_modules` klasörünü doğrudan kopyalayın

---

## 💾 Disk Alanı

```
Minimum: 500 MB
Önerilen: 2 GB
Ollama Model: ~4 GB (llama3)
Toplam: ~6-7 GB
```

---

## ✅ Başarı!

Kurulum tamamlandıysa:

1. `start.bat` ile uygulamayı başlatın
2. Test dosyası yükleyin (`test-files/game_english.json`)
3. Çeviri yapın ve test edin

**Tebrikler!** Artık her bilgisayarda çalışır durumda.

---

## 📖 Daha Fazla Bilgi

- **KURULUM_REHBERI.md** - Detaylı kurulum
- **HIZLI_BASLANGIÇ.md** - 5 dakikalık başlangıç
- **KULLANIM_KILAVUZU.md** - Kullanım kılavuzu
- **README.md** - Genel bakış

---

**İPUCU**: Projeyi cloud'a yükleyin (Google Drive, Dropbox), böylece her yerden erişebilirsiniz!
