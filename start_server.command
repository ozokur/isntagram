#!/bin/bash

# Ozan Okur Unfollowers - Mac Startup Script
# Tek tuşla server başlatma ve durum gösterme

echo "🚀 Ozan Okur Unfollowers - Starting..."
echo "=================================================="

# Terminal penceresini açık tut
function cleanup() {
    echo ""
    echo "⏹️  Server durduruluyor..."
    pkill -f "python3 -m http.server 8088"
    echo "✅ Server durduruldu"
    echo "Press any key to exit..."
    read -n 1
}

trap cleanup EXIT INT TERM

# Port kontrolü
if lsof -Pi :8088 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Port 8088 zaten kullanımda!"
    echo "Mevcut server durduruluyor..."
    pkill -f "python3 -m http.server 8088"
    sleep 2
fi

# Server başlat
cd "$(dirname "$0")/InstagramUnfollowers/public"
echo "📁 Directory: $(pwd)"
echo "🌐 Starting server on http://localhost:8088"
echo ""
echo "💡 Browser will open automatically..."
echo "=================================================="
echo ""

# Browser'ı aç
sleep 1
open http://localhost:8088

# Server başlat
python3 -m http.server 8088

