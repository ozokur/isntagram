#!/bin/bash

# Ozan Okur Unfollowers - Server Status Check

echo "🔍 Server Durum Kontrolü"
echo "=================================================="

if lsof -Pi :8088 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "✅ Server ÇALIŞIYOR"
    echo "🌐 URL: http://localhost:8088"
    echo ""
    
    # Pid bul
    PID=$(lsof -ti:8088)
    echo "📊 Process ID: $PID"
    
    # Memory kullanımı
    MEM=$(ps -o rss= -p $PID)
    MEM_MB=$((MEM / 1024))
    echo "💾 Memory: ${MEM_MB} MB"
    
    # Uptime
    START=$(ps -o lstart= -p $PID)
    echo "⏰ Started: $START"
    
    echo ""
    echo "💡 Server'i durdurmak için: ./stop_server.command"
else
    echo "❌ Server ÇALIŞMIYOR"
    echo ""
    echo "💡 Server'i başlatmak için: ./start_server.command"
fi

echo "=================================================="

