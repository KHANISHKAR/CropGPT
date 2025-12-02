# 🌾 CropGPT - Smart Farming Companion

A beautiful, bilingual (English/Tamil) web application designed to help farmers manage their crops effectively with AI-powered suggestions, daily activity logging, and comprehensive crop tracking.

![Version](https://img.shields.io/badge/version-1.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## 📋 Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Code Explanation](#code-explanation)
- [Usage Guide](#usage-guide)
- [Data Storage](#data-storage)

---

## ✨ Features

### Core Functionality
- **Crop Management** - Track multiple crops with detailed information
- **3-Step Wizard** - Easy crop registration (Strategy → Environment → Resources)
- **Daily Logs** - Record farming activities with timestamps
- **AI Suggestions** - Crop-specific advice based on growth stage
- **Weather Integration** - Real-time weather updates using geolocation
- **QR Code Export** - Generate comprehensive crop data as JSON QR codes
- **Bilingual Support** - Full English and Tamil translations
- **Offline-First** - All data stored in browser localStorage

### Tracking Capabilities
- Crop name, variety, and farming method
- Sowing date and crop age calculation
- Field information (location, area, soil type)
- Irrigation and water source details
- Seed quantity and treatment status
- Expected yield tracking
- Daily activity logs (sowing, irrigation, notes)

---

## 🛠 Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with glassmorphism effects
- **JavaScript (ES6+)** - Vanilla JavaScript, no frameworks

### External Libraries
- **Font Awesome 6.4.0** - Icons
- **Google Fonts (Outfit)** - Typography
- **QRCode.js** - QR code generation

### APIs
- **Open-Meteo** - Free weather data (no API key required)

---

## 📁 Project Structure

```
CropGPT/
│
├── index.html          # Main HTML structure
├── style.css           # Application styles
├── script.js           # Core application logic
├── ai.js              # AI suggestion engine
├── weather.js         # Weather service integration
└── README.md          # This file
```

---

## 🚀 Setup Instructions

### Option 1: Direct Open
1. Clone or download the repository
2. Open `index.html` in any modern web browser
3. That's it! No server required.

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using VS Code Live Server
# Right-click index.html → "Open with Live Server"
```

Then navigate to `http://localhost:8000`

### Browser Compatibility
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (responsive design)

---

## 📚 Code Explanation

### 1. **index.html** (Main Structure)
**Purpose:** Defines the application's HTML structure and UI components.

**Key Sections:**
- **Header** (Lines 28-39): Logo, language toggle, reset button
- **View: Home** (Lines 41-70): Weather widget, helpline, crops list
- **View: Add Crop Wizard** (Lines 72-197): 3-step form for adding crops
  - Step 1: Crop Strategy (name, variety, method, sowing date)
  - Step 2: Field Conditions (location, area, soil, irrigation)
  - Step 3: Resources (seeds, treatment, expected yield)
- **View: Crop Details** (Lines 199-244): Tabs for Tasks, Logs, Info
- **View: Updates** (Lines 246-254): Agriculture news feed
- **Bottom Navigation** (Lines 259-268): Home and Updates buttons
- **Modals** (Lines 272-313):
  - QR Code Modal: Display and download QR codes
  - Daily Log Modal: Form for adding activity logs

**Why this structure?**
- Single-page application with view switching
- No page reloads for better UX
- Mobile-first responsive design

---

### 2. **style.css** (Application Styling)
**Purpose:** Complete visual design with modern aesthetics.

**Design System:**
```css
/* Color Palette (Lines 1-22) */
--primary-color: #0f5132      /* Deep Emerald */
--accent-color: #ffc107       /* Gold/Amber */
--glass-bg: rgba(255,255,255,0.85)  /* Glassmorphism */
```

**Key Style Components:**

**Glassmorphism Effect** (Lines 140-149)
```css
.glass-panel {
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
}
```
- Creates frosted glass effect
- Used for cards and panels

**Responsive Layout** (Lines 40-48)
- Max-width: 480px for mobile-first design
- Centered container
- Adaptive padding

**Weather Widget** (Lines 151-179)
- Gradient background (blue tones)
- Circular icon container
- Responsive text sizing

**Form Components** (Lines 421-461)
- Consistent input styling
- Focus states with primary color
- Radio and checkbox groups

**Daily Log Styles** (Lines 715-800)
- Checkbox labels with icons
- Log cards with timestamps
- Activity tags (color-coded)
- Textarea with auto-resize

**Why these styles?**
- Premium, modern appearance
- High readability for farmers
- Consistent color coding (green=farming, blue=water)

---

### 3. **script.js** (Core Application Logic)
**Purpose:** Main application controller handling all user interactions and data management.

**File Size:** ~700 lines of code

#### A. State Management (Lines 1-7)
```javascript
const state = {
    crops: [],              // All crops data
    currentCropId: null,    // Currently viewing crop
    currentStep: 1,         // Wizard step (1-3)
    language: localStorage.getItem('language') || 'en'
};
```
**Why?** Centralized state makes data flow predictable.

#### B. Translations (Lines 9-172)
**English & Tamil Objects:**
- 80+ translation keys
- Covers all UI text
- Uses i18n attribute matching

**Example:**
```javascript
en: {
    crop_name: "Crop Name",
    sowing_date: "Sowing Date",
    // ...80 more keys
},
ta: {
    crop_name: "பயிர் பெயர்",
    sowing_date: "விதைப்பு தேதி",
    // ...80 more keys
}
```

**Why bilingual?**
- Accessibility for Tamil-speaking farmers
- Local language increases adoption

#### C. News Data (Lines 174-217)
Static agriculture updates with translations:
- Government schemes
- Weather alerts
- Market prices
- Subsidies

**Why static?**
- Works offline
- No API dependency
- Localized content

#### D. Initialization (Lines 223-262)
```javascript
document.addEventListener('DOMContentLoaded', () => {
    loadCrops();        // From localStorage
    initWeather();      // Fetch current weather
    setLanguage();      // Apply translations
    navigateTo('home'); // Show home view
});
```

#### E. Navigation System (Lines 339-366)
```javascript
function navigateTo(viewName) {
    // Hide all views
    Object.values(views).forEach(view => 
        view.classList.remove('active')
    );
    
    // Show target view
    views[viewName].classList.add('active');
    
    // Update bottom nav
    // ...
}
```
**Why?** SPA-style navigation without page reloads.

#### F. Wizard Logic (Lines 368-390)
- `nextStep(step)`: Progress to next wizard step
- `prevStep(step)`: Go back to previous step
- `resetWizard()`: Clear form and start over

**Visual Progress:** Updates step indicators (1→2→3)

#### G. Crop CRUD Operations

**saveCrop()** (Lines 422-437)
- Adds new crop to localStorage
- Updates state.crops array
- Triggers re-render

**loadCrops()** (Lines 439-444)
- Loads all crops from localStorage on startup

**renderCropsList()** (Lines 446-477)
- Displays crop cards on home screen
- Shows empty state if no crops
- Calculates crop age dynamically

**openCropDetails()** (Lines 608-651)
- Loads comprehensive crop info
- Renders AI suggestions
- Calls `renderLogs()`

#### H. Daily Log Functions (Lines 500-606)

**addLog()** (Lines 500-506)
```javascript
function addLog() {
    const modal = document.getElementById('daily-log-modal');
    modal.classList.remove('hidden');
    document.getElementById('daily-log-form').reset();
}
```
**Purpose:** Opens the log entry modal.

**submitDailyLog()** (Lines 508-552)
```javascript
function submitDailyLog(event) {
    event.preventDefault();
    
    const logEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        sowed: document.getElementById('log-sowed').checked,
        irrigated: document.getElementById('log-irrigated').checked,
        description: document.getElementById('log-description').value
    };
    
    crop.logs.unshift(logEntry);  // Add to beginning
    saveCropUpdate(crop);          // Persist to localStorage
    renderLogs();                  // Update UI
}
```
**Purpose:** Captures form data and saves timestamped log.

**renderLogs()** (Lines 564-606)
```javascript
function renderLogs() {
    // Show empty state if no logs
    if (!crop.logs || crop.logs.length === 0) {
        container.innerHTML = '<div class="empty-state">...</div>';
        return;
    }
    
    // Render each log as a card
    crop.logs.forEach(log => {
        const logCard = document.createElement('div');
        logCard.className = 'log-card glass-panel';
        
        // Format date/time
        const logDate = new Date(log.date);
        const formattedDate = logDate.toLocaleDateString();
        const formattedTime = logDate.toLocaleTimeString();
        
        // Build activity tags
        if (log.sowed) activities.push('<span class="activity-tag sowed">...</span>');
        if (log.irrigated) activities.push('<span class="activity-tag irrigated">...</span>');
        
        // Inject HTML
        logCard.innerHTML = `...`;
        container.appendChild(logCard);
    });
}
```
**Purpose:** Displays all logs with formatted timestamps and activity indicators.

#### I. QR Code Generation (Lines 671-735)

**Enhanced QR with JSON:**
```javascript
function showQRCode() {
    const crop = state.crops.find(c => c.id === state.currentCropId);
    
    // Build comprehensive data object
    const cropData = {
        app: "CropGPT",
        version: "1.0",
        cropId: crop.id,
        cropInfo: {
            name, variety, sowingDate, age, progress, method
        },
        fieldInfo: {
            name, area, soil, irrigation, waterSource
        },
        resources: {
            seedQuantity, seedTreated, expectedYield
        },
        recentLogs: crop.logs.slice(0, 5),  // Last 5 logs
        totalLogs: crop.logs.length,
        createdAt: crop.created_at,
        exportedAt: new Date().toISOString()
    };
    
    // Generate QR from JSON
    new QRCode(container, {
        text: JSON.stringify(cropData),
        width: 200,
        height: 200,
        correctLevel: QRCode.CorrectLevel.M
    });
}
```

**Why JSON QR?**
- Machine-readable format
- Comprehensive data export
- Can be imported by other systems
- Includes activity history

---

### 4. **ai.js** (AI Suggestion Engine)
**Purpose:** Provides crop-specific recommendations based on growth stage and weather.

**File Size:** 57 lines

**Knowledge Base Structure (Lines 3-29):**
```javascript
const KNOWLEDGE_BASE = {
    'Wheat': {
        stages: [
            { maxAge: 21, stage: 'Crown Root Initiation', 
              advice: 'Critical stage for irrigation. Apply first dose of Nitrogen.' },
            { maxAge: 60, stage: 'Tillering', 
              advice: 'Keep field weed-free. Monitor for termite attack.' },
            // ... more stages
        ]
    },
    'Rice': { stages: [...] },
    'Tomato': { stages: [...] }
};
```

**How it works:**
1. Takes crop name and age as input
2. Finds matching stage from knowledge base
3. Returns stage name and advice
4. Overlays weather warnings (e.g., "Rain expected, delay irrigation")

**getAISuggestion(cropName, cropAge, weatherCode)** (Lines 30-56)
```javascript
function getAISuggestion(cropName, cropAge, weatherCode) {
    // 1. Find crop stage based on age
    const stageInfo = cropData.stages.find(s => cropAge <= s.maxAge);
    
    // 2. Base suggestion
    suggestion.title = stageInfo.stage;
    suggestion.message = stageInfo.advice;
    
    // 3. Weather override
    if (rainCodes.includes(weatherCode)) {
        suggestion.message += ' Rain is expected. Delay irrigation.';
    }
    
    return suggestion;
}
```

**Why this approach?**
- Simple rule-based AI (no ML needed)
- Offline-capable
- Easily extensible (add more crops)
- Context-aware (weather integration)

---

### 5. **weather.js** (Weather Service)
**Purpose:** Fetches real-time weather data using geolocation.

**File Size:** 41 lines

**fetchWeather(lat, lon)** (Lines 3-13)
```javascript
async function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const response = await fetch(url);
    const data = await response.json();
    return data.current_weather;
}
```

**Returns:**
- `temperature` (°C)
- `windspeed` (km/h)
- `weathercode` (WMO code)

**getWeatherIcon(code)** (Lines 15-38)
Maps WMO weather codes to Font Awesome icons:
```javascript
const icons = {
    0: 'fa-sun',           // Clear sky
    51: 'fa-cloud-rain',   // Drizzle
    95: 'fa-bolt',         // Thunderstorm
    // ...30 more codes
};
```

**Why Open-Meteo?**
- Free, no API key required
- Reliable weather data
- Global coverage
- No rate limits for personal use

**Integration Flow:**
1. User lands on home page
2. Browser requests geolocation permission
3. `fetchWeather()` called with coordinates
4. Weather widget updates with current conditions
5. Weather code passed to AI for suggestions

---

## 📖 Usage Guide

### Adding Your First Crop

1. **Click "Start Farming"** or the "+" button
2. **Step 1: Crop Strategy**
   - Select crop name (Wheat, Rice, Tomato, etc.)
   - Enter variety/hybrid
   - Choose sowing date
   - Select farming method (Organic/Chemical/Mixed)
3. **Step 2: Field Conditions**
   - Enter field name/ID
   - Specify area in acres
   - Select soil type
   - Choose irrigation source
4. **Step 3: Resources**
   - Input seed quantity (kg)
   - Mark seed treatment status
   - Enter expected yield (quintals)
5. **Click "Finish & Plant"**

### Recording Daily Activities

1. **Open a crop** from the home screen
2. **Click "Logs" tab**
3. **Click "Add Daily Log"**
4. **Fill the form:**
   - ✓ Check "Sowed Today?" if applicable
   - ✓ Check "Irrigated Today?" if applicable
   - Type notes in "Description" field
5. **Click "Submit Log"**
6. Log appears with timestamp

### Generating QR Codes

1. Open any crop details
2. Click the **QR icon** (📱) in header
3. QR code generates instantly
4. **Scan with phone** to get JSON data
5. **Click "Download"** to save QR image

### Switching Languages

- Click the **தமிழ்/English** button in header
- Entire app switches instantly
- Preference saved in localStorage

---

## 💾 Data Storage

### localStorage Schema

**Key:** `crops`
**Value:** JSON array of crop objects

**Single Crop Structure:**
```json
{
  "id": "1701512345678",
  "name": "Wheat",
  "variety": "Sharbati",
  "sowing_date": "2024-12-01",
  "method": "Organic",
  "previous_crop": "Mustard",
  
  "field_name": "East Plot",
  "field_area": 2.5,
  "field_soil": "Loamy",
  "field_irrigation": "Drip",
  "water_source_details": "Borewell 200ft",
  
  "seed_quantity": 50,
  "seed_treated": true,
  "expected_yield": 20,
  
  "logs": [
    {
      "id": "1701598745678",
      "date": "2024-12-02T07:30:00.000Z",
      "sowed": false,
      "irrigated": true,
      "description": "Applied organic fertilizer"
    }
  ],
  
  "created_at": "2024-12-01T10:25:45.678Z"
}
```

### Data Persistence
- All data stored in **browser localStorage**
- No server/database required
- Data survives page refreshes
- Persists until manually cleared
- **Limitation:** Data tied to single browser

### Clearing Data
- Click **trash icon** (🗑️) in header
- Confirms deletion
- Removes all crops and logs
- Cannot be undone

---

## 🎨 Design Philosophy

### Color Coding
- **Green (#0f5132)** - Primary (farming/growth)
- **Blue (#3b82f6)** - Water/irrigation
- **Gold (#ffc107)** - Accent/highlights
- **Glass effect** - Modern, clean aesthetic

### User Experience
- **Minimal clicks** - 3-step wizard vs long forms
- **Visual feedback** - Progress bars, animations
- **Offline-first** - Works without internet
- **Mobile-friendly** - Touch-optimized

---

## 🔧 Customization

### Adding New Crops to AI
Edit `ai.js`:
```javascript
'Potato': {
    stages: [
        { maxAge: 15, stage: 'Planting', advice: 'Your advice here' },
        { maxAge: 60, stage: 'Vegetative', advice: '...' },
        // Add more stages
    ]
}
```

### Adding Translations
Edit `script.js` translations object:
```javascript
en: {
    your_key: "English text"
},
ta: {
    your_key: "தமிழ் உரை"
}
```

Then use in HTML:
```html
<span data-i18n="your_key">English text</span>
```

---

## 📱 Mobile Experience

- Responsive design (max-width: 480px)
- Touch-friendly tap targets
- Bottom navigation for thumb reach
- Glassmorphism works on all devices
- PWA-ready (can be installed on home screen)

---

## 🤝 Contributing

This is an educational project. Feel free to:
- Fork and modify
- Add new features
- Create pull requests
- Report issues

---

## 📄 License

MIT License - Free to use and modify

---

## 👨‍💻 Developer Notes

### No Build Process
- Pure vanilla JavaScript
- No npm, webpack, or build tools
- Just open index.html

### Browser DevTools
- Check `localStorage` in Application tab
- Console logs for debugging
- Network tab for weather API calls

### Future Enhancements
- [ ] Cloud sync (Firebase)
- [ ] Photo uploads for logs
- [ ] Export to Excel/PDF
- [ ] Push notifications for tasks
- [ ] Multi-user support
- [ ] Offline-first PWA manifest

---

## 📞 Support

For questions or issues:
- Check code comments
- View walkthrough.md for feature demos
- Contact: Kisan Helpline 1800-180-1551

---

**Built with ❤️ for farmers**
