# Steam Lokalizasyon - Kullanım Kılavuzu

## İçindekiler
1. [Kurulum](#kurulum)
2. [İlk Başlangıç](#ilk-başlangıç)
3. [Dosya Yükleme](#dosya-yükleme)
4. [Çeviri Yapma](#çeviri-yapma)
5. [Export İşlemleri](#export-işlemleri)
6. [İpuçları](#ipuçları)
7. [Sorun Giderme](#sorun-giderme)

---

## Kurulum

### Gereksinimler
- Node.js (v16 veya üstü)
- Ollama (https://ollama.ai)

### Adımlar

1. **Proje bağımlılıklarını yükleyin:**
```bash
cd C:\Projects\steam-lokalizasyon
npm install
```

2. **Ollama'yı yükleyin ve bir model indirin:**
```bash
# Ollama kurulumu sonrası
ollama pull llama3
# veya Türkçe için daha iyi
ollama pull mistral
```

3. **Uygulamayı başlatın:**
```bash
npm run dev
```

---

## İlk Başlangıç

Uygulama başladığında:

1. **Ana Ekran**: Dosya yükleme ekranı gösterilir
2. **Sol Sidebar**: Hedef dil seçimi için dil listesi
3. **Ollama Durumu**: Sağ üstte Ollama bağlantı durumu

### Hedef Dil Seçimi

Sol sidebar'dan çevirmek istediğiniz dili seçin:
- 🇹🇷 Türkçe
- 🇬🇧 English
- 🇩🇪 Deutsch
- 🇫🇷 Français
- ve daha fazlası...

---

## Dosya Yükleme

### Desteklenen Formatlar

| Format | Uzantı | Açıklama |
|--------|---------|----------|
| JSON | .json | Standart JSON lokalizasyon dosyaları |
| VDF | .vdf | Valve Data Format (Steam'in kendi formatı) |
| Text | .txt | Key=Value formatı |
| XML | .xml | XML string resources |
| PO | .po | GNU gettext Portable Object |

### Dosya Yükleme Adımları

1. **"Dosya Seç" butonuna** tıklayın
2. Steam oyun klasörünüzden lokalizasyon dosyasını seçin
3. Dosya otomatik olarak parse edilecek
4. Çeviri editörü açılacak

### Örnek Dosya Yerleri

Steam oyunlarında lokalizasyon dosyaları genellikle şu klasörlerde bulunur:

```
[Oyun Klasörü]/localization/
[Oyun Klasörü]/languages/
[Oyun Klasörü]/data/strings/
[Oyun Klasörü]/resources/
```

---

## Çeviri Yapma

### Arayüz Bölümleri

#### 1. Üst Toolbar
- **Geri butonu**: Ana ekrana dön
- **Dosya bilgisi**: Yüklenen dosya adı ve ilerleme
- **Ollama durumu**: Çevrimiçi/Çevrimdışı göstergesi
- **"Tümünü Çevir"**: Tüm metinleri toplu çevir
- **"Export"**: Çevrilmiş dosyayı kaydet

#### 2. Kontrol Alanı
- **Arama kutusu**: Metin veya anahtar arama
- **Filtre**: Tümü / Çevrilmiş / Çevrilmemiş

#### 3. Sol Panel - Metin Listesi
- Tüm çeviri metinleri liste halinde
- Yeşil kenar = Çevrilmiş
- Mavi kenar = Seçili
- Tıklayarak seçim yapın

#### 4. Sağ Panel - Çeviri Editörü
- **Anahtar**: Metin anahtarı (değiştirilemez)
- **Context**: Metin bağlamı
- **Orijinal Metin**: Kaynak metin (değiştirilemez)
- **Çeviri**: Hedef dil metni (düzenlenebilir)

### Tekli Çeviri

1. Sol panelden bir metin seçin
2. Sağ panelde orijinal metni görüntüleyin
3. İki seçenek:
   - **"AI ile Çevir"** butonuna tıklayın (Ollama ile otomatik çeviri)
   - **Manuel olarak** çeviri alanına yazın
4. Çeviri otomatik kaydedilir
5. "Sonraki" butonu ile devam edin

### Toplu Çeviri

1. **"Tümünü Çevir"** butonuna tıklayın
2. Onay dialogunda "Evet" seçin
3. İlerleme çubuğunu takip edin
4. Çeviri tamamlandığında bildirim alın

**Not**: Toplu çeviri sırasında:
- Her metin sırayla çevrilir
- Translation Memory'ye eklenir
- Hata olan metinler atlanır
- Ortalama hız: ~3-5 saniye/metin

---

## Translation Memory

Translation Memory, daha önce çevrilmiş metinleri hatırlar ve tekrar kullanır.

### Özellikler
- Otomatik kayıt
- LocalStorage ile kalıcı
- Dil bazlı saklama
- Fuzzy matching

### Avantajlar
- Tutarlı çeviriler
- Hızlı çeviri (cache'den)
- İnternet gerekmez
- Proje arası paylaşım

---

## Export İşlemleri

### Export Adımları

1. Çevirileri tamamlayın
2. **"Export"** butonuna tıklayın
3. Kayıt yerini seçin
4. Dosya adını girin (varsayılan: `[dosya-adı]_translated.[uzantı]`)
5. Kaydet

### Export Formatları

Export otomatik olarak orijinal format ile aynı yapıda çıkar:

- **JSON**: Hiyerarşik yapı korunur
- **VDF**: Steam formatında
- **TXT**: Key=Value formatında
- **XML**: XML string resource
- **PO**: gettext formatında

---

## İpuçları

### En İyi Pratikler

1. **Önce test edin**: Küçük bir dosya ile başlayın
2. **Yedek alın**: Orijinal dosyaları yedekleyin
3. **Context kontrol edin**: Bağlam bilgisini inceleyin
4. **Manuel düzenleme**: AI çevirisini kontrol edin
5. **Düzenli kayıt**: Export ile düzenli yedek alın

### Hız İpuçları

- **Klavye kısayolları**: Önceki/Sonraki için ok tuşları kullanılabilir
- **Toplu çeviri**: Büyük dosyalar için "Tümünü Çevir"
- **Arama**: Hızlı erişim için arama kullanın
- **Filtreler**: Sadece çevrilmemiş metinleri gösterin

### Kalite İpuçları

- **Oyun bağlamı**: Oyunun türüne göre ton ayarlayın
- **Karakter limiti**: UI metinleri için kısa tutun
- **Tutarlılık**: Aynı terimleri aynı şekilde çevirin
- **Test edin**: Çeviriyi oyunda test edin

---

## Sorun Giderme

### Ollama Bağlanamıyor

**Semptom**: "Ollama: Çevrimdışı" göstergesi

**Çözümler**:
1. Ollama servisinin çalıştığını kontrol edin:
   ```bash
   curl http://localhost:11434/api/tags
   ```
2. Ollama'yı yeniden başlatın
3. Port 11434'ün açık olduğundan emin olun

### Dosya Parse Edilemiyor

**Semptom**: "Dosyadan çeviri metni çıkarılamadı" hatası

**Çözümler**:
1. Dosya formatının desteklendiğinden emin olun
2. Dosya encoding'ini kontrol edin (UTF-8 olmalı)
3. Dosya yapısının doğru olduğunu kontrol edin
4. Test dosyaları ile deneyin

### Çeviri Çok Yavaş

**Nedeni**: Ollama model boyutuna bağlı

**Çözümler**:
1. Daha küçük model kullanın (llama3 yerine llama2)
2. GPU kullanımını etkinleştirin
3. Ollama ayarlarını optimize edin
4. Toplu çeviri kullanın (daha verimli)

### Uygulama Başlamıyor

**Çözümler**:
1. Node.js versiyonunu kontrol edin: `node --version` (v16+)
2. Bağımlılıkları yeniden yükleyin:
   ```bash
   rm -rf node_modules
   npm install
   ```
3. Port 5173'ün kullanımda olmadığını kontrol edin
4. Hata loglarını inceleyin

### Export Başarısız

**Çözümler**:
1. Yazma izninin olduğunu kontrol edin
2. Disk alanını kontrol edin
3. Farklı bir klasöre kayıt deneyin
4. Dosya adında geçersiz karakter olmamalı

---

## Test Komutları

Projeyi test etmek için:

```bash
# Parser testleri
node test-parser.js

# Ollama testleri
node test-ollama.js
```

---

## Destek ve Geri Bildirim

Sorun yaşarsanız veya öneriniz varsa:

1. GitHub Issues: [Proje Repository]
2. Hata loglarını paylaşın
3. Örnek dosya ekleyin (mümkünse)

---

## Lisans

MIT License - Ücretsiz ve açık kaynak

**Yapımcı**: Steam Lokalizasyon Ekibi
**Versiyon**: 1.0.0
**Son Güncelleme**: 2025
