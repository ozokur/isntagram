#!/bin/bash

# Ozan Okur Unfollowers - Stop Server Script

echo "⏹️  Ozan Okur Unfollowers - Server Durduruluyor..."
echo "=================================================="

if lsof -Pi :8088 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    pkill -f "python3 -m http.server 8088"
    echo "✅ Server başarıyla durduruldu"
else
    echo "ℹ️  Server zaten çalışmıyor"
fi

echo "=================================================="
echo "Press any key to exit..."
read -n 1

