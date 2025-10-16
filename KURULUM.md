# Steam Lokalizasyon - Kurulum Kılavuzu

## 📥 İndirme ve Kurulum

Steam Lokalizasyon uygulamasını kullanmak için **2 farklı seçenek** bulunmaktadır:

---

## 🚀 Seçenek 1: Portable Versiyon (Önerilen - Hızlı Başlangıç)

### Nedir?
Portable versiyon, **kurulum gerektirmeyen**, çift tıklamayla direkt çalışan bir uygulamadır. USB belleğe atıp farklı bilgisayarlarda da kullanabilirsiniz.

### Kurulum Adımları

#### 1. Dosyayı İndirin
- `Steam Lokalizasyon-1.0.0-Portable.exe` dosyasını indirin
- İstediğiniz bir klasöre kaydedin (örn: `C:\Uygulamalar\`)

#### 2. Çalıştırın
- İndirdiğiniz `.exe` dosyasına **çift tıklayın**
- Uygulama direkt açılacaktır
- ✅ **Kurulum YOK, Hemen başlayın!**

#### 3. İlk Kullanım
- Uygulama açıldığında Ollama kontrol edilecektir
- Eğer Ollama kurulu değilse uyarı göreceksiniz

### Avantajları
✅ Anında kullanıma hazır
✅ Kurulum gerektirmez
✅ Taşınabilir (USB'de kullanılabilir)
✅ Sistem kayıt defterine müdahale etmez
✅ Silmek için dosyayı silmeniz yeterli

### Dezavantajları
❌ Masaüstü kısayolu yok (manuel oluşturabilirsiniz)
❌ Başlat menüsünde görünmez

---

## 💾 Seçenek 2: Installer Versiyon (Klasik Kurulum)

### Nedir?
Installer versiyon, **geleneksel kurulum sihirbazı** ile bilgisayarınıza profesyonel şekilde kurulan uygulamadır.

### Kurulum Adımları

#### 1. Kurulum Dosyasını İndirin
- `Steam Lokalizasyon-Setup-1.0.0.exe` dosyasını indirin

#### 2. Kurulumu Başlatın
- İndirdiğiniz `.exe` dosyasına **çift tıklayın**
- Windows SmartScreen uyarısı çıkarsa: **"Ek bilgi"** → **"Yine de çalıştır"**

#### 3. Kurulum Sihirbazını Takip Edin

**Adım 1: Hoş Geldiniz**
- "İleri" butonuna tıklayın

**Adım 2: Kurulum Konumu Seçin**
- Varsayılan: `C:\Users\[KullanıcıAdı]\AppData\Local\Programs\steam-lokalizasyon`
- İsterseniz "Gözat" ile farklı konum seçebilirsiniz
- "İleri" butonuna tıklayın

**Adım 3: Kısayollar**
- ☑ Masaüstü kısayolu oluştur (önerilen)
- ☑ Başlat menüsüne ekle (önerilen)
- "İleri" butonuna tıklayın

**Adım 4: Kurulumu Tamamla**
- "Kur" butonuna tıklayın
- Kurulum tamamlanana kadar bekleyin (~30 saniye)
- "Bitir" butonuna tıklayın

#### 4. Uygulamayı Başlatın
- Masaüstünde **"Steam Lokalizasyon"** kısayoluna çift tıklayın
- VEYA Başlat menüsünden **"Steam Lokalizasyon"** yazıp Enter'a basın

### Avantajları
✅ Profesyonel kurulum deneyimi
✅ Masaüstü kısayolu otomatik oluşturulur
✅ Başlat menüsünde görünür
✅ Kolay güncelleme (eski versiyonun üzerine kurabilirsiniz)
✅ Temiz kaldırma (Programlar ve Özellikler'den)

### Dezavantajları
❌ Kurulum gerektirir (~1 dakika)
❌ Taşınabilir değil
❌ Sistem kayıt defterine bilgi yazar

---

## ⚙️ Gereksinimler (Her İki Versiyon İçin)

### 1. Ollama Kurulumu (ZORUNLU)

Steam Lokalizasyon, **Ollama** üzerinden AI çevirileri yapar. Ollama **ÜCRETSİZ** ve **yerel çalışan** bir AI motorudur.

#### Ollama Kurulum Adımları:

**Adım 1: Ollama'yı İndirin**
```
https://ollama.com/download
```
- Windows için `.exe` dosyasını indirin
- Kurulumu yapın (1-2 dakika)

**Adım 2: Ollama'nın Çalıştığını Kontrol Edin**
- Kurulumdan sonra Ollama otomatik başlar
- Görev çubuğunun yanında **Ollama simgesi** görünecektir
- Terminal/CMD açıp şu komutu çalıştırın:
  ```bash
  ollama list
  ```
  Eğer hata vermezse Ollama çalışıyor demektir ✅

**Adım 3: Çeviri Modelini İndirin**

Ollama kurulduktan sonra bir **AI modeli** indirmeniz gerekir:

```bash
# Türkçe için en iyi seçenek (önerilen)
ollama pull mistral

# Alternatif (hızlı ama daha az kaliteli)
ollama pull llama3
```

Model indirme süresi:
- **mistral**: ~4.1 GB (10-20 dakika)
- **llama3**: ~4.7 GB (15-25 dakika)

İndirme tamamlandığında:
```bash
ollama list
```
Komutunu çalıştırıp modelinizi görebilirsiniz.

---

## 🎮 İlk Kullanım

### 1. Uygulamayı Başlatın
- Portable veya Installer versiyonunu açın

### 2. Ollama Durumunu Kontrol Edin
- Sağ üst köşede **"Ollama: Çevrimiçi"** yazmalı
- Eğer **"Çevrimdışı"** yazıyorsa:
  - Ollama'nın çalıştığından emin olun
  - Terminal'de `ollama serve` komutunu çalıştırın

### 3. Dosya Yükleyin
- **"Dosya Yükle"** butonuna tıklayın
- Steam oyununuzdan bir lokalizasyon dosyası seçin
  - Desteklenen formatlar: `.json`, `.vdf`, `.txt`, `.xml`, `.po`

### 4. Hedef Dili Seçin
- Sol sidebar'dan hedef dili seçin (örn: 🇹🇷 Türkçe)

### 5. Çeviri Yapın

**Tekli Çeviri:**
- Listedeki bir metne tıklayın
- Sağ panelde "AI ile Çevir" butonuna basın
- 10-30 saniye içinde çeviri gelecektir

**Toplu Çeviri:**
- Üst menüden **"Tümünü Çevir"** butonuna basın
- Onay verin
- Tüm metinler sırayla çevrilecektir

### 6. Dosyayı Kaydedin
- Çeviriler tamamlandığında **"Export"** butonuna basın
- Dosya adı ve konumu seçin
- Kaydedin! 🎉

---

## 🛠️ Sorun Giderme

### ❌ "Ollama is not available" Hatası

**Sebep:** Ollama servisi çalışmıyor.

**Çözüm:**
```bash
# Terminal/CMD açın ve şunu çalıştırın:
ollama serve
```
Veya bilgisayarı yeniden başlatın (Ollama otomatik başlar).

---

### ❌ "AI Çinceyi Latin harflerle (pinyin) yazdı" Hatası

**Sebep:** Kullandığınız model Çince desteklemiyor veya yetersiz.

**Çözüm:**
```bash
# Daha iyi bir model kullanın:
ollama pull qwen:7b
```
Sonra ayarlardan modeli değiştirin.

---

### ❌ "Çeviri zaman aşımına uğradı" Hatası

**Sebep:** Model çok yavaş veya Ollama yanıt vermiyor.

**Çözüm:**
1. Ollama'nın çalıştığından emin olun:
   ```bash
   ollama list
   ```
2. Daha hafif bir model deneyin:
   ```bash
   ollama pull llama3
   ```
3. Bilgisayarı yeniden başlatın

---

### ❌ Port 5173 Kullanımda Hatası

**Sebep:** Başka bir uygulama aynı portu kullanıyor.

**Çözüm:**
- Diğer uygulamaları kapatın (özellikle Vite/React uygulamaları)
- Veya görev yöneticisinden Node.js işlemlerini sonlandırın

---

### ❌ Windows SmartScreen Uyarısı

**Sebep:** Uygulama dijital olarak imzalanmamış (normal, ücretsiz uygulama).

**Çözüm:**
1. **"Ek bilgi"** linkine tıklayın
2. **"Yine de çalıştır"** butonuna basın
3. Uygulama güvenlidir, kaynak kodları açık

---

## 🗑️ Kaldırma

### Portable Versiyonu Kaldırma
1. Uygulamayı kapatın
2. `.exe` dosyasını silin
3. Bitir! ✅

### Installer Versiyonunu Kaldırma

**Yöntem 1: Programlar ve Özellikler**
1. Başlat menüsünü açın
2. "Programlar ve Özellikler" yazın
3. "Steam Lokalizasyon" uygulamasını bulun
4. Sağ tık → **"Kaldır"**
5. Kaldırma sihirbazını takip edin

**Yöntem 2: Ayarlar**
1. Windows Ayarlar'ı açın (Win + I)
2. **Uygulamalar** → **Uygulamalar ve özellikler**
3. "Steam Lokalizasyon" uygulamasını bulun
4. **"Kaldır"** butonuna basın

---

## 📞 Destek ve İletişim

### Hata Bildirme
Eğer bir hata bulursanız:
1. Hatanın ekran görüntüsünü alın
2. Terminal/Console çıktılarını kaydedin
3. GitHub Issues sayfasından bildirim yapın

### Özellik İsteği
Yeni özellik önerileri için GitHub Issues'da "Feature Request" etiketi ile paylaşın.

---

## 📝 Ek Notlar

- **Tüm çeviriler yerel olarak yapılır** - İnternet bağlantısı gerekmez (Ollama indirdikten sonra)
- **Hiçbir veri harici servislere gönderilmez** - %100 gizlilik
- **Tamamen ücretsiz** - Hiçbir ücretli API kullanılmaz
- **Açık kaynak** - Kaynak kodları GitHub'da mevcut

---

## ✨ İyi Kullanımlar!

Steam Lokalizasyon ekibini tercih ettiğiniz için teşekkürler! 🎮🌍

**Version:** 1.0.0
**License:** MIT
**Platform:** Windows 10/11 (x64)
