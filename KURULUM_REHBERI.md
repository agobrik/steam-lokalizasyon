# Steam Lokalizasyon - Kurulum Rehberi

## 🎯 Kolay Kurulum (Herhangi Bir Bilgisayara)

### Seçenek 1: Portable Kullanım (ÖNERİLEN)

Bu yöntemle uygulamayı kurulum gerektirmeden çalıştırabilirsiniz!

#### Adım 1: Projeyi Kopyalayın

Tüm proje klasörünü istediğiniz bilgisayara kopyalayın:
```
C:\Projects\steam-lokalizasyon\
```

#### Adım 2: Node.js Yükleyin

Hedef bilgisayara Node.js yükleyin:
- https://nodejs.org/en/download
- **Önemli**: "Add to PATH" seçeneğini işaretleyin

#### Adım 3: Ollama Yükleyin

Ollama AI servisini yükleyin:
- https://ollama.ai/download
- Kurulumdan sonra bir model indirin:

```cmd
ollama pull llama3
```

veya Türkçe için daha iyi:
```cmd
ollama pull mistral
```

#### Adım 4: Bağımlılıkları Yükleyin

Proje klasöründe komut satırını açın ve çalıştırın:
```cmd
cd C:\Projects\steam-lokalizasyon
npm install
```

#### Adım 5: Uygulamayı Başlatın

```cmd
npm run dev
```

**İşte bu kadar!** Uygulama otomatik olarak açılacak.

---

### Seçenek 2: Manuel Paketleme (Gelişmiş)

Eğer tam bağımsız .exe dosyası istiyorsanız:

#### 1. Production Build

```cmd
npm run build
```

#### 2. Unpacked Klasör

`release\win-unpacked` klasörü oluştu ama electron-builder symbolic link hatası veriyor.

#### Geçici Çözüm:

1. Projeyi tamamen kopyalayın
2. Her bilgisayarda `npm install` ve `npm run dev` çalıştırın
3. Veya Docker image kullanın (alternatif)

---

## 🔧 Başka Bilgisayara Taşıma

### Yöntem 1: Tüm Proje

1. Tüm `C:\Projects\steam-lokalizasyon` klasörünü ZIP ile sıkıştırın
2. Hedef bilgisayara taşıyın
3. ZIP'i açın
4. Node.js ve Ollama yükleyin
5. `npm install` ve `npm run dev` çalıştırın

### Yöntem 2: node_modules Dahil

Daha hızlı kurulum için `node_modules` dahil taşıyın:

1. Tüm projeyi (node_modules dahil) kopyalayın (~300MB)
2. Hedef bilgisayarda sadece Node.js ve Ollama yükleyin
3. Direkt `npm run dev` çalıştırın

---

## 📦 Gereksinimler

Her bilgisayarda şunlar gerekli:

| Yazılım | Link | Not |
|---------|------|-----|
| Node.js v16+ | https://nodejs.org | "Add to PATH" ile yükleyin |
| Ollama | https://ollama.ai | Model indirmeyi unutmayın |
| Llama3 Model | `ollama pull llama3` | veya mistral |

---

## 🚀 Hızlı Başlangıç Scripti

Yeni bir bilgisayarda hızlı kurulum için bu script'i kullanın:

**start.bat** (Proje klasörüne kaydedin):

```batch
@echo off
echo ====================================
echo Steam Lokalizasyon Baslat
echo ====================================

echo.
echo [1/3] Node.js kontrol ediliyor...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo HATA: Node.js bulunamadi!
    echo Lutfen Node.js yukleyin: https://nodejs.org
    pause
    exit /b 1
)
echo ✓ Node.js bulundu

echo.
echo [2/3] Ollama kontrol ediliyor...
curl -s http://localhost:11434/api/tags >nul 2>&1
if %errorlevel% neq 0 (
    echo UYARI: Ollama calisiyor gibi gorunmuyor
    echo Ollama'yi baslatin veya yukleyin: https://ollama.ai
)
echo ✓ Ollama kontrol edildi

echo.
echo [3/3] Uygulama baslatiliyor...
npm run dev

pause
```

Kullanım:
1. `start.bat` dosyasına çift tıklayın
2. Uygulama otomatik açılır!

---

## 🐛 Sorun Giderme

### "node komutu bulunamadı"

**Çözüm**:
- Node.js'i yeniden yükleyin
- "Add to PATH" seçeneğini işaretleyin
- Komut satırını kapatıp yeniden açın

### "Ollama bağlanamıyor"

**Çözüm**:
```cmd
# Ollama servisini başlat
ollama serve

# Başka bir terminal'de model kontrol et
ollama list
```

### "npm install çok yavaş"

**Çözüm**:
- `node_modules` klasörünü doğrudan kopyalayın
- Veya NPM cache temizleyin: `npm cache clean --force`

### "Port 5173 kullanımda"

**Çözüm**:
- Diğer Vite uygulamalarını kapatın
- Veya portu değiştirin `vite.config.js` dosyasında

---

## 💡 İpuçları

### Hız için

- `node_modules` klasörünü de taşıyın (300MB ama `npm install` gerekmez)
- SSD kullanın
- Ollama için GPU desteğini etkinleştirin

### Güvenlik

- Windows Defender, Electron uygulamasını engelleyebilir
- İlk çalıştırmada "Run anyway" seçin
- Veya klasörü güvenilir listesine ekleyin

### Disk Alanı

```
Minimum: 500 MB (proje + node_modules)
Önerilen: 2 GB (cache ve models için)
Ollama Models: ~4GB (llama3)
```

---

## 📖 Ek Dokümantasyon

- **HIZLI_BASLANGIÇ.md** - 5 dakikalık başlangıç
- **KULLANIM_KILAVUZU.md** - Detaylı kullanım
- **README.md** - Genel bakış

---

## ✅ Kurulum Checklist

- [ ] Node.js yüklendi
- [ ] Ollama yüklendi
- [ ] Llama3 veya Mistral modeli indirildi
- [ ] Proje klasörü kopyalandı
- [ ] `npm install` çalıştırıldı
- [ ] `npm run dev` ile test edildi
- [ ] Uygulama açıldı ve çalışıyor

---

**Not**: Şu anda electron-builder'da symbolic link izin sorunu var. Bu yüzden şimdilik portable kullanım öneriyoruz. Gelecek güncellemede NSIS installer eklenecek.

**Alternatif**: Docker image kullanarak tam izolasyonlu çalıştırma (geliştirilme aşamasında)
