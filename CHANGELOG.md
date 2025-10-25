# Changelog

All notable changes to the Ozan Okur Unfollowers project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-25

### Added
- ✨ **Ozan Okur Unfollowers v1.0** - Özel Instagram unfollow aracı
- 🌐 **InstagramUnfollowers Integration** - GitHub'dan 4k+ star alan popüler araç entegrasyonu
- 🎨 **Custom Branding** - "Ozan Okur Unfollowers" özel markalaştırma
- 🖥️ **Mac Support** - `.command` dosyaları ile tek tıkla başlatma
- 🪟 **Windows Support** - `.bat` dosyaları ile tek tıkla başlatma
- 📊 **Server Status Monitoring** - Server durumunu kontrol etme scripti
- 🛑 **Stop Server Scripts** - Mac ve Windows için server kapatma scriptleri
- 📚 **Turkish Documentation** - `KULLANIM.md` Türkçe kullanım kılavuzu
- 🚀 **Auto Browser Open** - Server başlatınca otomatik browser açılması
- 🔧 **Port Management** - Port 8088 otomatik yönetimi
- 💡 **Process Monitoring** - PID, memory ve uptime gösterimi

### Features
- **Browser-Based Tool** - Kurulum gerektirmez, sadece tarayıcı
- **Instagram API Integration** - Instagram'ın kendi API'sini kullanır
- **Whitelist System** - Önemli kişileri koruma
- **Filter Options** - Verified, Private, Without Profile Picture filtreleri
- **Progress Tracking** - Real-time ilerleme takibi
- **Pause/Resume** - İşlemi duraklat/devam ettir
- **Export List** - Liste kopyalama özelliği
- **Settings Menu** - Özelleştirilebilir ayarlar

### Technical
- TypeScript/React based frontend
- Node.js build system
- Python HTTP server for local hosting
- Cross-platform support (Mac/Windows)

### Repository
- GitHub: https://github.com/ozokur/isntagram
- Based on: https://github.com/davidarroyo1234/InstagramUnfollowers

### Security
- ✅ Instagram kurallarına uygun
- ✅ Bot tespit riski yok
- ✅ Manuel unfollow sistemi
- ✅ Hesap kapatma riski yok

---

## [1.1.0] - 2025-10-25

### Added
- 🎯 **Advanced Filtering Options** - Ana sayfada gelişmiş filtreleme
  - ✅ Hesap türü filtreleri (Business, Personal, Creator)
  - ✅ Son post aktivitesi filtreleme (son 1 hafta, 1 ay, 3 ay, 6 ay)
  - ✅ İnaktif hesap filtreleme
- 📊 **Enhanced User Profile Fields** - Kullanıcı profillerinde ekstra bilgiler
  - Last post timestamp
  - Account type detection
  - Inactive account detection
- 🌍 **Multi-language Infrastructure** - TR/EN dil desteği altyapısı
- 📄 **CSV Export Infrastructure** - CSV dışa aktarma altyapısı
- 📈 **Analytics Dashboard** - İstatistikler için ayrı sayfa (`analytics.html`)

### Changed
- 🔄 **Filter State Management** - Filtreleme state yönetimi iyileştirildi
- 🎨 **UI Improvements** - Filter sidebar'da advanced filters bölümü eklendi
- 📱 **Responsive Design** - Enhanced filtering için responsive tasarım

### Technical
- Updated `ScanningFilter` interface with new fields
- Updated `UserNode` interface with metadata fields
- Enhanced `handleScanFilter` function for nested properties
- TypeScript type safety improvements

### Files Changed
- `InstagramUnfollowers/src/model/scanning-filter.ts` - Added advanced filter fields
- `InstagramUnfollowers/src/model/user.ts` - Added user metadata fields
- `InstagramUnfollowers/src/components/Searching.tsx` - Added advanced filter UI
- `InstagramUnfollowers/src/main.tsx` - Updated filter state management
- `analytics.html` - Created analytics dashboard
- `filtering.html` - Created standalone filtering page
- `languages/tr.json` - Turkish translations
- `languages/en.json` - English translations

---

## Upcoming Features

### Planned for v1.2.0
- [ ] Full scheduled unfollow implementation
- [ ] Real-time CSV export functionality
- [ ] Advanced analytics integration
- [ ] Mobile app version
- [ ] Cloud sync
- [ ] Multi-account support
- [ ] Advanced reporting

---

**Note:** This project is not affiliated with Instagram or Meta. Use at your own risk.

