#!/usr/bin/env python3
"""
Instagram Unfollow Tool - Basit Versiyon
Sadece JSON dosyalarını okuyup unfollow listesi oluşturur
"""

import json
import time
import random
from typing import List, Dict

def load_json_file(filename: str) -> List[Dict]:
    """JSON dosyasını yükle"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Instagram export formatını kontrol et
        if isinstance(data, list):
            return data
        elif isinstance(data, dict) and 'relationships_followers' in data:
            return data['relationships_followers']
        else:
            print(f"❌ {filename} dosyası geçersiz format!")
            return []
    except Exception as e:
        print(f"❌ {filename} dosyası okunamadı: {e}")
        return []

def find_non_followers(followers_file: str, following_file: str) -> List[str]:
    """Takip etmeyenleri bul"""
    print("📁 Dosyalar yükleniyor...")
    
    # Followers yükle
    followers = load_json_file(followers_file)
    if not followers:
        return []
    
    # Following yükle  
    following = load_json_file(following_file)
    if not following:
        return []
    
    print(f"✅ {len(followers)} takipçi yüklendi")
    print(f"✅ {len(following)} takip edilen yüklendi")
    
    # Username'leri çıkar
    follower_usernames = set()
    for user in followers:
        username = user.get('string_list_data', [{}])[0].get('value', '').lower()
        if username:
            follower_usernames.add(username)
    
    following_usernames = set()
    for user in following:
        username = user.get('string_list_data', [{}])[0].get('value', '').lower()
        if username:
            following_usernames.add(username)
    
    # Non-followers bul (seni takip etmeyenler)
    non_followers = following_usernames - follower_usernames
    
    print(f"🔍 {len(non_followers)} takip etmeyen bulundu!")
    return list(non_followers)

def save_unfollow_list(non_followers: List[str], filename: str = "unfollow_list.txt"):
    """Unfollow listesini dosyaya kaydet"""
    with open(filename, 'w', encoding='utf-8') as f:
        for username in non_followers:
            f.write(f"{username}\n")
    print(f"💾 Unfollow listesi {filename} dosyasına kaydedildi")

def main():
    print("🎯 Instagram Unfollow Tool - Basit Versiyon")
    print("=" * 50)
    
    # Örnek dosya yolları
    followers_file = "followers_1.json"
    following_file = "following.json"
    
    print(f"📁 Followers dosyası: {followers_file}")
    print(f"📁 Following dosyası: {following_file}")
    print("\n💡 İpucu: Instagram export'undan gelen dosyaları bu isimlerle kaydedin")
    print("   - followers_1.json (takipçiler)")
    print("   - following.json (takip edilenler)")
    
    # Dosya varlığını kontrol et
    import os
    if not os.path.exists(followers_file):
        print(f"❌ {followers_file} dosyası bulunamadı!")
        print("📥 Instagram'dan export yapın: Settings → Download Your Information")
        return
        
    if not os.path.exists(following_file):
        print(f"❌ {following_file} dosyası bulunamadı!")
        print("📥 Instagram'dan export yapın: Settings → Download Your Information")
        return
    
    # Non-followers bul
    non_followers = find_non_followers(followers_file, following_file)
    
    if not non_followers:
        print("✅ Takip etmeyen bulunamadı!")
        return
    
    # Listeyi göster
    print(f"\n📋 Takip Etmeyenler ({len(non_followers)} kişi):")
    print("-" * 30)
    for i, username in enumerate(non_followers[:20], 1):  # İlk 20'yi göster
        print(f"{i:2d}. {username}")
    
    if len(non_followers) > 20:
        print(f"... ve {len(non_followers) - 20} kişi daha")
    
    # Otomatik kaydet
    print(f"\n💾 {len(non_followers)} kişiyi unfollow listesine kaydediliyor...")
    save_unfollow_list(non_followers)
    
    print("\n🎯 Sonraki Adımlar:")
    print("1. Instagram'a giriş yap")
    print("2. unfollow_list.txt dosyasındaki kullanıcıları manuel olarak unfollow et")
    print("3. Veya Instagram'ın 'Following' sayfasından kontrol et")
    print("\n✅ İşlem tamamlandı!")

if __name__ == "__main__":
    main()
