# GitHub'a Yükleme Kılavuzu

Bu kılavuz, **Steam Lokalizasyon** projesini GitHub'a yüklemek için adım adım talimatlar içerir.

---

## 📋 Ön Kontrol Listesi

Yüklemeden önce aşağıdakilerin tamamlandığından emin olun:

- ✅ Proje test edildi ve çalışıyor
- ✅ Build dosyaları oluşturuldu (`release/` klasöründe)
- ✅ Dokümantasyon tamamlandı
- ✅ `.gitignore` dosyası güncel
- ✅ `package.json` düzenlendi

---

## 🚀 Adım 1: Git Kurulumu Kontrolü

### Windows'ta Git Kontrolü

Terminalde şu komutu çalıştırın:

```bash
git --version
```

**Eğer "command not found" hatası alırsanız:**
1. Git'i indirin: https://git-scm.com/download/win
2. Kurulumu yapın (Next, Next, Next)
3. Bilgisayarı yeniden başlatın
4. Komutu tekrar deneyin

---

## 🔧 Adım 2: Git Yapılandırması

İlk kez Git kullanıyorsanız, kullanıcı bilgilerinizi ayarlayın:

```bash
# Adınızı ve e-postanızı ayarlayın
git config --global user.name "Adınız Soyadınız"
git config --global user.email "email@example.com"

# Kontrol edin
git config --list
```

---

## 📦 Adım 3: GitHub Repository Oluşturma

### GitHub'da Yeni Repository Oluşturma

1. **GitHub'a gidin**: https://github.com
2. **Giriş yapın** (yoksa kayıt olun)
3. Sağ üst köşeden **"+"** → **"New repository"** tıklayın

### Repository Ayarları

**Repository Name:** `steam-lokalizasyon`

**Description:**
```
Steam oyunları için ücretsiz, yerel çalışan lokalizasyon desktop uygulaması
```

**Public/Private:**
- ✅ **Public** seçin (açık kaynak için)
- Veya **Private** seçin (gizli tutmak için)

**Initialize repository:**
- ❌ **README EKLEME!** (zaten var)
- ❌ **.gitignore EKLEME!** (zaten var)
- ✅ **License: MIT** seçin (veya zaten LICENSE.txt var)

**"Create repository" butonuna basın**

---

## 💻 Adım 4: Yerel Git Repository'yi Hazırlama

Proje klasörüne gidin ve şu komutları sırayla çalıştırın:

### 4.1. Proje Klasörüne Gidin

```bash
cd C:\Projects\steam-lokalizasyon
```

### 4.2. Git Repository'yi Başlatın

```bash
# Git repository'yi başlat
git init

# Hangi branch'tesiniz kontrol edin
git branch
```

Eğer `master` görüyorsanız, `main` olarak değiştirin:

```bash
git branch -M main
```

### 4.3. Dosyaları Stage'e Ekleyin

```bash
# Tüm dosyaları ekle (gitignore kurallarına uygun olarak)
git add .

# Hangi dosyaların eklendiğini kontrol edin
git status
```

**Önemli:** Release klasörü ve node_modules **EKLENMEMELİ**. Eğer görüyorsanız:
```bash
git reset HEAD release
git reset HEAD node_modules
```

### 4.4. İlk Commit'i Yapın

```bash
# İlk commit'i oluşturun
git commit -m "Initial commit: Steam Lokalizasyon v1.0.0

- Electron + React + Vite tabanlı desktop uygulama
- Ollama ile yerel AI çeviri
- 12+ dil desteği
- Translation Memory sistemi
- JSON, VDF, TXT, XML, PO formatları
- Portable ve Installer build sistemleri
- Detaylı dokümantasyon"
```

---

## 🔗 Adım 5: GitHub'a Bağlanma

### 5.1. Remote Repository Ekleyin

GitHub'da oluşturduğunuz repository'nin URL'sini kullanın:

```bash
# HTTPS ile (önerilen - kolay)
git remote add origin https://github.com/KULLANICI_ADINIZ/steam-lokalizasyon.git

# VEYA SSH ile (daha güvenli ama setup gerektirir)
git remote add origin git@github.com:KULLANICI_ADINIZ/steam-lokalizasyon.git
```

**Not:** `KULLANICI_ADINIZ` yerine kendi GitHub kullanıcı adınızı yazın!

### 5.2. Remote'u Kontrol Edin

```bash
git remote -v
```

Şöyle bir çıktı görmelisiniz:
```
origin  https://github.com/KULLANICI_ADINIZ/steam-lokalizasyon.git (fetch)
origin  https://github.com/KULLANICI_ADINIZ/steam-lokalizasyon.git (push)
```

---

## ⬆️ Adım 6: GitHub'a Push (Yükleme)

### 6.1. İlk Push

```bash
# main branch'ini GitHub'a yükle
git push -u origin main
```

**İlk kez push yapıyorsanız, GitHub kimlik doğrulama isteyecektir:**

#### HTTPS Kullanıyorsanız:
- Kullanıcı adı: `github_kullanici_adiniz`
- Şifre: **GitHub Personal Access Token** (PAT) girin

**Personal Access Token nasıl oluşturulur?**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token (classic)" tıklayın
3. Note: "Steam Lokalizasyon"
4. Expiration: 90 days veya No expiration
5. Scope: `repo` seçin
6. "Generate token" tıklayın
7. Token'ı kopyalayın (**BİR DAHA GÖREMEZSİNİZ!**)
8. Push yaparken şifre olarak bu token'ı kullanın

#### SSH Kullanıyorsanız:
- Önceden SSH key eklemiş olmalısınız
- Yoksa: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### 6.2. Push Başarılı mı Kontrol Edin

```bash
# Son commit'i göster
git log --oneline -1

# Remote'taki durumu göster
git remote show origin
```

---

## ✅ Adım 7: GitHub'da Kontrolü

1. Tarayıcınızda GitHub repository'nize gidin:
   ```
   https://github.com/KULLANICI_ADINIZ/steam-lokalizasyon
   ```

2. Şunları kontrol edin:
   - ✅ README.md görünüyor mu?
   - ✅ Dosya sayısı doğru mu? (~40-50 dosya)
   - ✅ `release/` klasörü YOK mu? (olmamalı)
   - ✅ `node_modules/` klasörü YOK mu? (olmamalı)

---

## 🎨 Adım 8: Repository Özelleştirme (İsteğe Bağlı)

### 8.1. About Bölümünü Düzenleyin

GitHub repository sayfasında:
1. Sağ tarafta **⚙️ (Settings simgesi)** → **"Edit repository details"**
2. **Website:** `https://github.com/KULLANICI_ADINIZ/steam-lokalizasyon`
3. **Topics:** `electron`, `react`, `ollama`, `localization`, `translation`, `steam`, `ai`, `turkish`
4. **Save changes**

### 8.2. Releases Oluşturun (Önemli!)

Build dosyalarını kullanıcılara sunmak için:

1. Repository ana sayfasında **"Releases"** → **"Create a new release"**
2. **Tag:** `v1.0.0`
3. **Release title:** `v1.0.0 - İlk Sürüm`
4. **Description:**
   ```markdown
   ## 🎉 Steam Lokalizasyon v1.0.0

   İlk kararlı sürüm!

   ### 📥 İndirme Seçenekleri

   - **Portable:** Kurulum gerektirmez, direkt çalışır
   - **Installer:** Klasik kurulum sihirbazı

   ### 🎯 Özellikler

   - ✅ Profesyonel oyun lokalizasyonu
   - ✅ 12+ dil desteği
   - ✅ AI destekli çeviri (Ollama)
   - ✅ Translation Memory
   - ✅ Çoklu format desteği (JSON, VDF, TXT, XML, PO)

   ### 📋 Gereksinimler

   - Windows 10/11 (x64)
   - Ollama (https://ollama.com/download)
   - Mistral veya Llama3 modeli

   ### 📖 Kurulum

   Detaylı kurulum talimatları için [KURULUM.md](KURULUM.md) dosyasına bakın.
   ```

5. **Attach binaries:**
   - `release/Steam Lokalizasyon-1.0.0-Portable.exe` dosyasını sürükleyip bırakın
   - `release/Steam Lokalizasyon-Setup-1.0.0.exe` dosyasını sürükleyip bırakın

6. **"Publish release"** butonuna basın

---

## 🔄 Adım 9: Gelecekteki Güncellemeler

### Değişiklik Yaptığınızda

```bash
# Değişiklikleri kontrol edin
git status

# Değişiklikleri ekleyin
git add .

# Commit yapın
git commit -m "Açıklama mesajı"

# GitHub'a gönderin
git push
```

### Yeni Özellik Eklerken (Branch Kullanımı)

```bash
# Yeni branch oluştur
git checkout -b feature/yeni-ozellik

# Çalışmalarınızı yapın...
git add .
git commit -m "Yeni özellik eklendi"

# GitHub'a push
git push -u origin feature/yeni-ozellik

# GitHub'da Pull Request oluşturun
# Merge ettikten sonra main'e geri dönün
git checkout main
git pull
```

### Yeni Release Oluştururken

```bash
# Version'ı güncelleyin
# package.json içinde "version": "1.0.1" yapın

# Build'leri yeniden oluşturun
npm run build:portable
npm run build:installer

# Commit ve push
git add package.json
git commit -m "Bump version to 1.0.1"
git push

# GitHub'da yeni release oluşturun
# Tag: v1.0.1
# Build dosyalarını yükleyin
```

---

## 🐛 Sorun Giderme

### ❌ "fatal: not a git repository"

**Çözüm:**
```bash
git init
```

### ❌ "remote origin already exists"

**Çözüm:**
```bash
git remote remove origin
git remote add origin https://github.com/KULLANICI_ADINIZ/steam-lokalizasyon.git
```

### ❌ "failed to push some refs"

**Çözüm:**
```bash
# Önce remote'taki değişiklikleri çek
git pull origin main --rebase

# Sonra tekrar push et
git push -u origin main
```

### ❌ "Authentication failed"

**HTTPS kullanıyorsanız:**
- Personal Access Token kullanın (yukarıdaki talimatlar)

**SSH kullanıyorsanız:**
- SSH key'inizi GitHub'a ekleyin

### ❌ ".gitignore çalışmıyor"

Eğer zaten tracked dosyaları kaldırmak istiyorsanız:

```bash
# Git cache'ini temizle
git rm -r --cached .

# Tekrar ekle (gitignore kurallarıyla)
git add .

# Commit et
git commit -m "Fix .gitignore"
```

---

## 📊 Commit Mesajı Kuralları (Best Practices)

İyi commit mesajları yazmak için:

```bash
# ✅ İYİ ÖRNEKLER
git commit -m "Add Chinese language support"
git commit -m "Fix translation timeout error"
git commit -m "Update README with installation steps"

# ❌ KÖTÜ ÖRNEKLER
git commit -m "fix"
git commit -m "update"
git commit -m "asdasd"
```

**Format:**
```
[Type] Short description (max 50 chars)

Detailed explanation (optional)
- What changed
- Why it changed
```

**Types:**
- `feat:` Yeni özellik
- `fix:` Bug düzeltme
- `docs:` Dokümantasyon
- `style:` Kod formatı
- `refactor:` Kod yeniden yapılandırma
- `test:` Test ekleme
- `chore:` Rutin işler

---

## 🎯 Özet - Hızlı Komutlar

```bash
# İlk setup (bir kez)
cd C:\Projects\steam-lokalizasyon
git init
git branch -M main
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/KULLANICI_ADINIZ/steam-lokalizasyon.git
git push -u origin main

# Günlük kullanım
git add .
git commit -m "Değişiklik açıklaması"
git push

# Durumu kontrol
git status
git log --oneline -5
```

---

## 🎉 Tebrikler!

Projeniz artık GitHub'da! 🚀

**Sırada ne var?**
- ⭐ README'nizde güzel bir banner ekleyin
- 📝 CONTRIBUTING.md dosyası oluşturun
- 🏷️ GitHub Topics ekleyin
- 🐛 Issues bölümünü aktif edin
- 👥 Katkıda bulunacak kişileri bekleyin!

**Projenizi paylaşın:**
- Reddit (r/gamedev, r/localization)
- Twitter/X
- LinkedIn
- Discord sunucuları
- Steam geliştirici forumları

---

**Not:** Bu kılavuz Windows için hazırlanmıştır. Linux/Mac kullanıcıları komutlarda ufak farklılıklar görebilir.
