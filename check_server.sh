#!/bin/bash

# Ozan Okur Unfollowers - Server Status Check

echo "🔍 Server Durum Kontrolü"
echo "=================================================="

if lsof -Pi :8088 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "✅ Server ÇALIŞIYOR"
    echo "🌐 URL: http://localhost:8088"
    echo ""
    
    # Pid bul (ilk olanı al)
    PID=$(lsof -ti:8088 | head -n 1)
    echo "📊 Process ID: $PID"
    
    # Memory kullanımı
    if [ ! -z "$PID" ]; then
        MEM=$(ps -o rss= -p $PID 2>/dev/null)
        if [ ! -z "$MEM" ]; then
            MEM_MB=$((MEM / 1024))
            echo "💾 Memory: ${MEM_MB} MB"
        fi
        
        # Uptime
        START=$(ps -o lstart= -p $PID 2>/dev/null)
        if [ ! -z "$START" ]; then
            echo "⏰ Started: $START"
        fi
    fi
    
    echo ""
    echo "💡 Server'i durdurmak için: ./stop_server.command"
else
    echo "❌ Server ÇALIŞMIYOR"
    echo ""
    echo "💡 Server'i başlatmak için: ./start_server.command"
fi

echo "=================================================="

