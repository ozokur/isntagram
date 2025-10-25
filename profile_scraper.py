#!/usr/bin/env python3
"""
Ozan Okur Unfollowers - Profile Scraper
Instagram profil verilerini scrape ederek ek bilgiler elde eder
"""

import time
import json
import random
from datetime import datetime, timedelta
from typing import Dict, List, Optional
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager


class ProfileScraper:
    def __init__(self):
        self.driver = None
        self.wait_timeout = 10
        self.rate_limit_delay = (1, 3)  # 1-3 seconds between requests
        
    def _setup_driver(self):
        """Chrome driver setup"""
        if self.driver:
            return
            
        chrome_options = Options()
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('useAutomationExtension', False)
        
        try:
            self.driver = webdriver.Chrome(
                service=Service(ChromeDriverManager().install()),
                options=chrome_options
            )
            self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        except Exception as e:
            print(f"Driver setup hatası: {e}")
            raise
    
    def _random_delay(self):
        """Random delay for rate limiting"""
        delay = random.uniform(*self.rate_limit_delay)
        time.sleep(delay)
    
    def get_last_post_date(self, username: str) -> Optional[int]:
        """
        Son post tarihini scrape eder
        
        Args:
            username: Instagram kullanıcı adı
            
        Returns:
            Unix timestamp veya None
        """
        if not self.driver:
            self._setup_driver()
        
        try:
            self.driver.get(f"https://www.instagram.com/{username}/")
            self._random_delay()
            
            # Son post elementini bul
            try:
                first_post = WebDriverWait(self.driver, self.wait_timeout).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "article div[role='button']"))
                )
                first_post.click()
                self._random_delay()
                
                # Post timestamp'ini bul
                time_elements = self.driver.find_elements(By.CSS_SELECTOR, "time")
                if time_elements:
                    timestamp_str = time_elements[0].get_attribute("datetime")
                    if timestamp_str:
                        timestamp = datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
                        return int(timestamp.timestamp() * 1000)
                
                # Close modal
                close_button = self.driver.find_element(By.CSS_SELECTOR, "svg[aria-label='Close']")
                close_button.click()
                
            except (TimeoutException, NoSuchElementException):
                pass
            
            return None
            
        except Exception as e:
            print(f"Hata ({username}): {e}")
            return None
    
    def get_account_type(self, username: str) -> Optional[str]:
        """
        Hesap türünü tespit eder
        
        Args:
            username: Instagram kullanıcı adı
            
        Returns:
            'business', 'creator', veya 'personal'
        """
        if not self.driver:
            self._setup_driver()
        
        try:
            self.driver.get(f"https://www.instagram.com/{username}/")
            self._random_delay()
            
            # Bio'dan keywords kontrol et
            try:
                bio = self.driver.find_element(By.CSS_SELECTOR, "div[dir='auto']")
                bio_text = bio.text.lower()
                
                business_keywords = ['business', 'company', 'brand', 'shop', 'store', 'official']
                creator_keywords = ['creator', 'influencer', 'content creator', 'youtuber']
                
                if any(keyword in bio_text for keyword in business_keywords):
                    return 'business'
                if any(keyword in bio_text for keyword in creator_keywords):
                    return 'creator'
                    
            except NoSuchElementException:
                pass
            
            # Default olarak personal
            return 'personal'
            
        except Exception as e:
            print(f"Hata ({username}): {e}")
            return None
    
    def is_inactive(self, username: str, days_threshold: int = 30) -> bool:
        """
        Hesabın aktif olup olmadığını kontrol eder
        
        Args:
            username: Instagram kullanıcı adı
            days_threshold: Kaç gün önce son post atılmışsa inaktif sayılır
            
        Returns:
            True eğer inaktifse
        """
        last_post = self.get_last_post_date(username)
        
        if not last_post:
            return True  # Post bulunamazsa inaktif say
        
        days_ago = (datetime.now() - datetime.fromtimestamp(last_post / 1000)).days
        return days_ago > days_threshold
    
    def scrape_profile_batch(self, usernames: List[str], callback=None) -> List[Dict]:
        """
        Birden fazla kullanıcıyı scrape eder
        
        Args:
            usernames: Kullanıcı adları listesi
            callback: İlerleme callback fonksiyonu
            
        Returns:
            Scraped data listesi
        """
        results = []
        total = len(usernames)
        
        if not self.driver:
            self._setup_driver()
        
        for i, username in enumerate(usernames):
            print(f"Processing {i+1}/{total}: {username}")
            
            data = {
                'username': username,
                'last_post_timestamp': self.get_last_post_date(username),
                'account_type': self.get_account_type(username),
                'is_inactive': None
            }
            
            # Inactive kontrolü için last_post gerekiyor
            if data['last_post_timestamp']:
                data['is_inactive'] = self.is_inactive(username)
            
            results.append(data)
            
            # Callback çağır
            if callback:
                callback(i + 1, total, data)
            
            # Rate limiting
            self._random_delay()
        
        return results
    
    def close(self):
        """Driver'ı kapat"""
        if self.driver:
            self.driver.quit()
            self.driver = None


def main():
    """Test fonksiyonu"""
    scraper = ProfileScraper()
    
    test_users = ['ozokur', 'instagram']
    
    def progress_callback(current, total, data):
        print(f"Progress: {current}/{total} - {data}")
    
    results = scraper.scrape_profile_batch(test_users, progress_callback)
    
    print("\nResults:")
    print(json.dumps(results, indent=2))
    
    # Save to file
    with open('scraped_profiles.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)
    
    scraper.close()


if __name__ == "__main__":
    main()

