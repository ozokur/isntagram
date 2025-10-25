<!-- c3d3bc1c-61a7-47b8-b0c0-e41f442092d2 97084b1c-6e8a-4476-b41b-11fb430cce5b -->
# Instagram Unfollow Tool - Manual File Based Approach

## Overview

Replace the problematic Selenium-based login and data extraction with a simpler manual approach:

- User manually exports followers/following from Instagram
- Application imports from JSON/CSV files
- Selenium only used for controlled unfollow actions

## Implementation Plan

### 1. Remove Complex Login Logic

**File: `instagram_api.py`**

- Remove all login-related code (Selenium driver initialization, stealth mode, 2FA)
- Keep only simple session management
- Add file import methods for followers/following data

### 2. Add File Import Functionality

**New File: `data_importer.py`**

```python
class DataImporter:
    def import_followers(self, file_path):
        # Import from JSON/CSV
        # Format: [{"username": "user1", "full_name": "Name"}, ...]
        
    def import_following(self, file_path):
        # Same format as followers
        
    def export_instructions():
        # Show user how to export from Instagram
```

### 3. Simplify GUI

**File: `main.py`**

- Remove login section completely
- Add "Import Followers" button (file picker for JSON/CSV)
- Add "Import Following" button
- Keep the rest of the UI (non-followers list, unfollow controls)
- Add instructions panel explaining how to export from Instagram

### 4. Keep Only Unfollow Automation

**File: `instagram_api.py` (simplified)**

- Remove: login, 2FA, data scraping
- Keep: unfollow_user() method using Selenium
- Only initialize Selenium when actually unfollowing

### 5. Add Instagram Export Instructions

**New File: `EXPORT_GUIDE.md`**

- Step-by-step guide to export followers/following from Instagram
- Instructions for both mobile and desktop
- Mention third-party tools like "Instagram Data Download" feature

## Files to Modify

- **`instagram_api.py`**: Drastically simplify, remove login/scraping
- **`main.py`**: Remove login UI, add file import buttons
- **`data_importer.py`**: NEW - Handle file imports
- **`requirements.txt`**: Can remove selenium-stealth, fake-useragent if only using for unfollow
- **`EXPORT_GUIDE.md`**: NEW - User instructions

## Benefits

- No more Selenium login issues
- No bot detection problems
- Faster data loading
- More reliable
- User has full control

### To-dos

- [ ] Create project structure, virtual environment, and requirements.txt
- [ ] Implement Instagram API wrapper with authentication and data retrieval methods
- [ ] Create SMS 2FA handler for automatic code retrieval
- [ ] Implement logic to compare followers/following and identify non-followers
- [ ] Build Tkinter desktop GUI with login, user list, and controls
- [ ] Implement unfollow automation with 10-minute delays and progress tracking
- [ ] Add comprehensive error handling, logging, and session persistence
- [ ] Test complete workflow and create usage documentation