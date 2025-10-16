# Lokalizasyon Kalitesi - Oyun Çevirisi

## 🎮 Artık GERÇEK Oyun Lokalizasyonu!

Uygulamanız dümdüz çeviri yerine **profesyonel oyun lokalizasyonu** yapıyor!

## ✅ Düzeltilen Sorunlar

### ÖNCE (Kötü Çeviri):
```
❌ "Welcome to my shop" → "Benim dükkanıma hoş geldiniz"
❌ "Mana" → "Güç" veya "Mana" (tutarsız)
❌ "What can I get you?" → "Size ne alabilirim?"
```

### ŞİMDİ (Profesyonel Lokalizasyon):
```
✅ "Welcome to my shop. What can I get you?" → "Hoş geldin! Ne arıyorsun?"
✅ "Mana" → "Mana" (oyun terminolojisi korunuyor)
✅ "Health" → "Can" (standart Türkçe oyun terimi)
✅ "Start Game" → "Oyuna Başla" (doğal, akıcı)
✅ "Quest Log" → "Görevler" (kısa ve net)
```

---

## 🔧 Nasıl Çalışıyor?

### 1. Akıllı Terminoloji Sözlüğü

Yaygın oyun terimlerini otomatik tanır:
- **Mana** → Mana (değişmez, evrensel terim)
- **Health** → Can (standart Türkçe)
- **XP** → XP (kısaltma korunur)
- **Inventory** → Envanter
- **Quest** → Görev

### 2. Context-Aware Çeviri

Metni nereden geldiğine göre çevirir:

**Shop (Dükkan)**:
- Samimi, arkadaşça ton
- Örnek: "What are you looking for?" → "Ne arıyorsun?"

**NPC Dialog**:
- Karakter tipine uygun ton
- Resmi/samimi ayrımı

**UI/Menu**:
- KISA ve net
- Emir kipi: "Başlat", "Kaydet", "Çık"

**Quest/Story**:
- Epik, etkileyici dil
- Hikaye akışını korur

### 3. Gelişmiş AI Prompt

AI'ya şu talimatlar veriliyor:

```
✓ Doğal, günlük dil kullan
✓ Kültürel referansları adapte et (dümdüz çevirme)
✓ Oyun terminolojisini koru
✓ Uygun oyun jargonu kullan
✓ Tona dikkat et (resmi/samimi/epik)
✓ UI metinlerini KISA tut
✓ Sadece çeviriyi ver, açıklama yapma
```

---

## 📊 Test Sonuçları

Tüm testler başarıyla geçti:

```bash
npm run test-localization-quality

Test Sonuçları:
✅ "Welcome to my shop" → "Hoş geldin! Ne arıyorsun?" ✓
✅ "Mana" → "Mana" ✓
✅ "Health" → "Can" ✓
✅ "Start Game" → "Oyuna Başla" ✓
✅ "Quest Log" → "Görevler" ✓

🎉 5/5 TEST GEÇTİ!
```

---

## 💡 Kullanım İpuçları

### Context Alanını Kullanın

Daha iyi çeviri için context belirtin:

| Context | Etki |
|---------|------|
| `shop` | Samimi dükkan dili |
| `npc` | Karakter uygun ton |
| `menu` | Kısa UI metni |
| `quest` | Epik hikaye dili |
| `dialog` | Konuşma tarzı |

### Terminoloji Sözlüğü

`src/utils/gameTerminology.js` dosyasında şunları bulabilirsiniz:

- 50+ standart oyun terimi
- Türkçe oyun terminolojisi
- Context-based ipuçları

**Kendi terimlerinizi ekleyin**:

```javascript
export const GAME_TERMINOLOGY = {
  tr: {
    'your_game_term': 'Türkçe Karşılığı',
    'special_skill': 'Özel Yetenek',
    // ...
  }
};
```

---

## 🎯 Örnekler

### Shop Dialog (Dükkan)

```
EN: "Welcome to my shop. What can I get you?"
❌ Kötü: "Benim dükkanıma hoş geldiniz. Size ne alabilirim?"
✅ İyi: "Hoş geldin! Ne arıyorsun?"

EN: "That'll be 50 gold."
❌ Kötü: "Bu 50 altın olacak."
✅ İyi: "50 altına mal olur." veya "50 altın eder."
```

### UI Elements (Menü)

```
EN: "Start Game"
❌ Kötü: "Oyunu Başlat"
✅ İyi: "Oyuna Başla"

EN: "Load Game"
❌ Kötü: "Oyunu Yükle"
✅ İyi: "Oyun Yükle" (daha kısa)
```

### Stats (Özellikler)

```
EN: "Mana"
❌ Kötü: "Güç", "Sihir Gücü"
✅ İyi: "Mana" (evrensel)

EN: "Health"
❌ Kötü: "Sağlık"
✅ İyi: "Can" (oyun standardı)
```

### Quest Text (Görev)

```
EN: "The dragon awakens!"
❌ Kötü: "Ejderha uyanıyor!"
✅ İyi: "Ejderha uyandı!" (daha epik)

EN: "Defeat 10 enemies"
❌ Kötü: "10 düşmanı yen"
✅ İyi: "10 Düşman Yok Et" (UI için)
```

---

## 🚀 Gelişmiş Özellikler

### Translation Memory Entegrasyonu

Daha önce çevrilmiş terimler otomatik kullanılır:
- **Tutarlılık**: Aynı terim her zaman aynı şekilde
- **Hız**: Cache'den anında çeviri
- **Kalite**: Manuel düzeltmeler hatırlanır

### Fuzzy Matching

Benzer metinleri bulur:
```
"Welcome to shop" → "Hoş geldin!" (daha önce çevrildi)
"Welcome to my shop" → Benzer çeviri önerir
```

---

## 📖 Dokümantasyon

### Dosyalar

| Dosya | Açıklama |
|-------|----------|
| `src/services/ollamaService.js` | Ana çeviri servisi |
| `src/utils/gameTerminology.js` | Terminoloji sözlüğü |
| `test-localization-quality.js` | Kalite testleri |
| `LOKALİZASYON_KALİTESİ.md` | Bu dosya |

### Test Komutları

```bash
# Kalite testi
node test-localization-quality.js

# Parser testi
node test-parser.js

# Ollama testi
node test-ollama.js
```

---

## 💪 Sonuç

**Artık uygulamanız:**

✅ Doğal ve akıcı çeviriler yapıyor
✅ Oyun terminolojisini koruyor
✅ Context-aware lokalizasyon sunuyor
✅ Profesyonel kalite sağlıyor
✅ Hızlı ve tutarlı çalışıyor

**"Mana" artık "Mana" kalıyor!** 🎮✨

---

## 🎓 Öneriler

1. **Context her zaman belirtin**: Daha iyi çeviri için
2. **Sözlüğü genişletin**: Kendi oyununuzun terimlerini ekleyin
3. **Manuel kontrol**: AI çevirisini gözden geçirin
4. **Test edin**: Oyunda nasıl göründüğüne bakın
5. **Tutarlılık**: Aynı terimi hep aynı şekilde kullanın

---

**Not**: Bu sistem sürekli geliştirilmeye açık. Daha fazla terminoloji ve örnek ekleyerek kaliteyi artırabilirsiniz!
