@echo off
REM Ozan Okur Unfollowers - Stop Server Script

echo.
echo ==================================================
echo    Ozan Okur Unfollowers - Server Durduruluyor...
echo ==================================================
echo.

REM Port kontrolü
netstat -ano | findstr :8088 >nul
if %errorlevel% equ 0 (
    echo Server durduruluyor...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8088') do taskkill /F /PID %%a >nul 2>&1
    echo Basariyla durduruldu
) else (
    echo Server zaten calismiyor
)

echo.
echo ==================================================
pause

