@echo off
REM Ozan Okur Unfollowers - Windows Startup Script
REM Tek tuşla server başlatma ve durum gösterme

echo.
echo ==================================================
echo    Ozan Okur Unfollowers - Starting...
echo ==================================================
echo.

REM Port kontrolü
netstat -ano | findstr :8088 >nul
if %errorlevel% equ 0 (
    echo Port 8088 zaten kullanimda!
    echo Mevcut server durduruluyor...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8088') do taskkill /F /PID %%a >nul 2>&1
    timeout /t 2 /nobreak >nul
)

REM Server başlat
cd /d "%~dp0InstagramUnfollowers\public"
echo Directory: %CD%
echo Server baslatiliyor: http://localhost:8088
echo.
echo Browser otomatik acilacak...
echo ==================================================
echo.

REM Browser'ı aç
timeout /t 1 /nobreak >nul
start http://localhost:8088

REM Server başlat
python -m http.server 8088

pause

