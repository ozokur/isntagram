# 🚀 Ozan Okur Unfollowers - Kullanım Kılavuzu

## 📋 Tek Tuşla Başlatma

### 🍎 Mac Kullanıcıları:

#### **Server Başlatma:**
```
./start_server.command
```
veya Finder'da çift tıkla!

#### **Server Durumunu Kontrol:**
```
./check_server.sh
```

#### **Server'i Durdurma:**
```
./stop_server.command
```

### 🪟 Windows Kullanıcıları:

#### **Server Başlatma:**
```
start_server.bat
```
veya dosyaya çift tıkla!

#### **Server'i Durdurma:**
```
stop_server.bat
```

## 📊 Server Durum Bilgileri

### Mac İçin Detaylı Bilgi:
```bash
./check_server.sh
```

**Çıktı:**
```
🔍 Server Durum Kontrolü
==================================================
✅ Server ÇALIŞIYOR
🌐 URL: http://localhost:8088
📊 Process ID: 12345
💾 Memory: 25 MB
⏰ Started: Mon Oct 25 10:30:00 2025
==================================================
```

## 🎯 Kullanım Adımları

### 1. **Server'i Başlat**
```bash
# Mac
./start_server.command

# Windows
start_server.bat
```

### 2. **Browser Otomatik Açılacak**
- URL: http://localhost:8088
- "Copy code" butonuna tıkla

### 3. **Instagram'a Git**
- Instagram.com → Giriş yap
- Profil sayfanızda olun

### 4. **F12 → Console**
- Kodu yapıştır
- Enter → RUN

### 5. **Server'i Durdur**
```bash
# Mac
./stop_server.command

# Windows
stop_server.bat
```

## ⚙️ Port Ayarları

**Varsayılan Port:** 8088

**Port değiştirmek için:**
- `start_server.command` (Mac) veya `start_server.bat` (Windows) dosyasını aç
- `8088` yerine istediğiniz port numarasını yazın

## 🔧 Troubleshooting

### Port Zaten Kullanımda:
Script otomatik olarak eski server'ı durdurur ve yeniden başlatır.

### Browser Açılmıyor:
Manuel olarak http://localhost:8088 adresine gidin.

### Memory Hatası:
Server'i durdurup yeniden başlatın:
```bash
./stop_server.command
./start_server.command
```

## 📞 Destek

Sorun yaşarsanız:
1. `./check_server.sh` ile durumu kontrol edin
2. Server'i durdurup yeniden başlatın
3. Port 8088'in kullanılabilir olduğundan emin olun

---

**Ozan Okur Unfollowers v1.0** 🎯

