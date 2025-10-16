# Steam Lokalizasyon Uygulaması

Steam oyunları için **tamamen ücretsiz**, yerel çalışan lokalizasyon desktop uygulaması.

## 🎯 Özellikler

- ✅ **Tamamen Ücretsiz** - Hiçbir ücretli servis kullanmadan
- ✅ **Profesyonel Lokalizasyon** - Dümdüz çeviri değil, gerçek oyun lokalizasyonu!
- ✅ **Akıllı Terminoloji** - "Mana" → "Mana" (oyun terimleri korunur)
- ✅ **Context-Aware** - Shop, NPC, UI için farklı ton
- ✅ **Translation Memory** - Akıllı çeviri hafızası sistemi
- ✅ **Çoklu Format** - JSON, VDF, TXT, XML, PO desteği
- ✅ **12+ Dil** - Türkçe dahil birçok dil desteği
- ✅ **Modern UI** - Kullanıcı dostu arayüz
- ✅ **Toplu Çeviri** - Tüm metinleri bir tıkla çevir
- ✅ **Export/Import** - Kolay dosya yönetimi

## 🚀 Hızlı Başlangıç

### Seçenek 1: Hazır Kurulum (Önerilen)

**📥 İki Kurulum Seçeneği:**

1. **🚀 Portable Versiyon** (Anında Kullanım)
   - Dosya: `Steam Lokalizasyon-1.0.0-Portable.exe`
   - Kurulum gerektirmez, çift tıkla çalışır
   - Taşınabilir (USB'de kullanılabilir)

2. **💾 Installer Versiyon** (Klasik Kurulum)
   - Dosya: `Steam Lokalizasyon-Setup-1.0.0.exe`
   - Kurulum sihirbazı ile profesyonel kurulum
   - Masaüstü ve Başlat menüsü kısayolu

📖 **Detaylı Kurulum Talimatları:** [`KURULUM.md`](KURULUM.md) dosyasına bakın

**Hızlı Başlangıç Adımları:**

1. **Uygulamayı indir** ve çalıştır (yukarıdaki seçeneklerden birini)
2. **Ollama'yı kur**: https://ollama.com/download
3. **Model indir**:
   ```bash
   ollama pull mistral
   ```
4. **Çeviriye başla!** 🎮

### Seçenek 2: Geliştirici Modu

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Uygulamayı başlat
npm run dev

# 3. Production build
npm run build:win
```

## 📋 Gereksinimler

- **Node.js** (v16+)
- **Ollama** (https://ollama.ai)
- **LLM Model** (llama3 veya mistral önerilir)

### Ollama Kurulumu

```bash
# Model indirme (birini seçin)
ollama pull llama3        # Hızlı ve kaliteli
ollama pull mistral       # Türkçe için daha iyi
```

## 📚 Desteklenen Formatlar

| Format | Uzantı | Açıklama |
|--------|---------|----------|
| JSON | `.json` | Standart JSON lokalizasyon |
| VDF | `.vdf` | Valve Data Format (Steam) |
| Text | `.txt` | Key=Value formatı |
| XML | `.xml` | XML string resources |
| PO | `.po` | GNU gettext |

## 💡 Kullanım

### Temel Kullanım

1. **Dosya Yükle**: Steam oyununuzdan lokalizasyon dosyasını seçin
2. **Dil Seç**: Sol sidebar'dan hedef dili seçin (🇹🇷 Türkçe)
3. **Çevir**:
   - Tekli: Metin seçip "AI ile Çevir"
   - Toplu: "Tümünü Çevir" butonu
4. **Export**: Çevrilmiş dosyayı kaydedin

### Test Dosyaları

Uygulamayı denemek için `test-files/` klasöründe örnek dosyalar bulunur:
- `game_english.json` - JSON formatı
- `game_strings.txt` - Text formatı
- `game_localization.vdf` - VDF formatı

## 🧪 Testler

```bash
# Parser testleri
node test-parser.js

# Ollama çeviri testi
node test-ollama.js
```

## 📖 Dokümantasyon

- **Kurulum Kılavuzu**: [`KURULUM.md`](KURULUM.md) - Detaylı kurulum ve kullanım talimatları
- **Hızlı Başlangıç**: `HIZLI_BASLANGIÇ.md` - 5 dakikada başla
- **Kullanım Kılavuzu**: `KULLANIM_KILAVUZU.md` - Detaylı rehber

## 🎮 Steam Oyun Dosyaları Nerede?

Lokalizasyon dosyaları genellikle şuralarda bulunur:

```
[Oyun Klasörü]/localization/
[Oyun Klasörü]/languages/
[Oyun Klasörü]/data/strings/
[Oyun Klasörü]/resources/
```

## ⚙️ Teknik Detaylar

- **Frontend**: React + Vite
- **Desktop**: Electron
- **AI**: Ollama (Llama3/Mistral)
- **Storage**: LocalStorage (Translation Memory)
- **Diller**: JavaScript/JSX

## 🐛 Sorun Giderme

### Ollama bağlanamıyor?
```bash
# Kontrol et
curl http://localhost:11434/api/tags

# Servisi başlat
ollama serve
```

### Port hatası?
Port 5173 kullanımda olabilir. Diğer uygulamaları kapatıp tekrar deneyin.

### Daha fazla yardım?
[`KURULUM.md`](KURULUM.md) dosyasındaki "Sorun Giderme" bölümüne bakın veya `KULLANIM_KILAVUZU.md` dosyasını inceleyin.

## 📊 Performans

- **Parser hızı**: ~1000 metin/saniye
- **AI çeviri**: ~3-5 saniye/metin (model boyutuna bağlı)
- **Translation Memory**: Anında (cache)
- **Bellek kullanımı**: ~200-300 MB

## 🤝 Katkıda Bulunma

Bu proje açık kaynaklı ve topluluk katkılarına açıktır!

## 📄 Lisans

MIT License - Özgürce kullanın, değiştirin, paylaşın!

## ⭐ Özellikler Yol Haritası

- [ ] Batch export (çoklu dosya)
- [ ] Terminoloji sözlüğü
- [ ] Çeviri kalite skoru
- [ ] Otomatik yedekleme
- [ ] Plugin sistemi

---

**Not**: Bu uygulama tamamen ücretsizdir ve hiçbir ücretli servis kullanmaz. Tüm çeviriler bilgisayarınızda yerel olarak yapılır.
