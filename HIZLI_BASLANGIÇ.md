# Hızlı Başlangıç - Steam Lokalizasyon

5 dakikada uygulamayı çalıştırın ve ilk çevirinizi yapın!

## 1. Kurulum (2 dakika)

```bash
# 1. Proje klasörüne gidin
cd C:\Projects\steam-lokalizasyon

# 2. Bağımlılıkları yükleyin
npm install

# 3. Ollama'yı kontrol edin
curl http://localhost:11434/api/tags
```

**Ollama yoksa**: https://ollama.ai adresinden indirip kurun, sonra:
```bash
ollama pull llama3
```

## 2. Başlatma (30 saniye)

```bash
npm run dev
```

Uygulama otomatik olarak açılacak!

## 3. İlk Çeviri (2 dakika)

### Adım 1: Test Dosyası Yükle
1. Açılan uygulamada **"Dosya Seç"** butonuna tıklayın
2. `test-files/game_english.json` dosyasını seçin
3. Dosya otomatik parse edilecek

### Adım 2: Hedef Dil Seç
Sol sidebar'dan **🇹🇷 Türkçe** seçin

### Adım 3: Çevir
- **Tek metin**: Bir metin seçin → "AI ile Çevir"
- **Tümü**: "Tümünü Çevir" butonuna tıklayın

### Adım 4: Export
1. **"Export"** butonuna tıklayın
2. Dosya adını girin: `game_turkish.json`
3. Kaydet!

## Tamamlandı!

İlk çevirinizi yaptınız. Artık kendi Steam oyun dosyalarınızı çevirebilirsiniz.

---

## Test Komutları

Herhangi bir sorun varsa testleri çalıştırın:

```bash
# Parser'ları test et
node test-parser.js

# Ollama'yı test et
node test-ollama.js
```

---

## Sorun mu Yaşıyorsunuz?

### Ollama bağlanamıyor?
```bash
# Ollama durumunu kontrol et
ollama list

# Model indir
ollama pull llama3
```

### Port hatası?
Port 5173 kullanımda olabilir. Uygulamayı kapatıp yeniden başlatın.

### Daha fazla yardım?
`KULLANIM_KILAVUZU.md` dosyasına bakın!

---

**İpucu**: `test-files` klasöründe örnek dosyalar bulunur. Önce bunlarla pratik yapın!
