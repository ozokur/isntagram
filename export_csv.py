#!/usr/bin/env python3
"""
Ozan Okur Unfollowers - CSV Export Tool
Instagram unfollow results'ını CSV formatında export eder
"""

import csv
import json
import os
from datetime import datetime

def export_to_csv(data, filename=None):
    """
    Instagram unfollow results'ını CSV formatında export eder
    
    Args:
        data: List of user dictionaries
        filename: Output filename (optional)
    
    Returns:
        str: Output file path
    """
    if not filename:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"unfollow_results_{timestamp}.csv"
    
    if not data:
        print("❌ Export edilecek veri yok!")
        return None
    
    try:
        with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
            fieldnames = ['username', 'full_name', 'is_verified', 'is_private', 'follows_viewer']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            writer.writeheader()
            for user in data:
                writer.writerow({
                    'username': user.get('username', ''),
                    'full_name': user.get('full_name', ''),
                    'is_verified': user.get('is_verified', False),
                    'is_private': user.get('is_private', False),
                    'follows_viewer': user.get('follows_viewer', False)
                })
        
        print(f"✅ CSV export tamamlandı: {filename}")
        return filename
    
    except Exception as e:
        print(f"❌ CSV export hatası: {e}")
        return None

def main():
    """Test fonksiyonu"""
    sample_data = [
        {
            'username': 'test_user1',
            'full_name': 'Test User 1',
            'is_verified': False,
            'is_private': True,
            'follows_viewer': False
        },
        {
            'username': 'test_user2',
            'full_name': 'Test User 2',
            'is_verified': True,
            'is_private': False,
            'follows_viewer': False
        }
    ]
    
    export_to_csv(sample_data)

if __name__ == "__main__":
    main()

