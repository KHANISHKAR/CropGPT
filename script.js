// State Management
const state = {
    crops: [],
    currentCropId: null,
    currentStep: 1,
    language: localStorage.getItem('language') || 'en'
};

const translations = {
    en: {
        loading_weather: "Loading Weather...",
        kisan_helpline: "Kisan Helpline",
        call: "Call",
        my_crops: "My Crops",
        no_crops: "No crops added yet.",
        start_farming: "Start Farming",
        new_crop: "New Crop",
        crop_strategy: "Crop Strategy",
        crop_name: "Crop Name",
        select_crop: "Select Crop",
        wheat: "Wheat",
        rice: "Rice",
        tomato: "Tomato",
        potato: "Potato",
        cotton: "Cotton",
        other: "Other",
        variety_hybrid: "Variety / Hybrid",
        sowing_date: "Sowing Date",
        farming_method: "Farming Method",
        organic: "Organic",
        chemical: "Chemical / Conventional",
        mixed: "Mixed",
        previous_crop: "Previous Crop (Rotation)",
        next: "Next",
        field_conditions: "Field Conditions",
        field_name: "Field Name/ID",
        area_acres: "Area (Acres)",
        soil_type: "Soil Type",
        loamy: "Loamy",
        clay: "Clay",
        sandy: "Sandy",
        black_soil: "Black Soil",
        red_soil: "Red Soil",
        irrigation_source: "Irrigation Source",
        rainfed: "Rain-fed",
        borewell: "Borewell",
        canal: "Canal",
        drip: "Drip Irrigation",
        water_source_details: "Water Source Details",
        back: "Back",
        resources: "Resources",
        seed_quantity: "Seed Quantity (kg)",
        seed_treatment_done: "Seed Treatment Done?",
        yes: "Yes",
        no: "No",
        expected_yield: "Expected Yield (Quintals)",
        finish_plant: "Finish & Plant",
        tasks: "Tasks",
        logs: "Logs",
        info: "Info",
        add_daily_log: "Add Daily Log",
        latest_updates: "Latest Agriculture Updates",
        home: "Home",
        updates: "Updates",
        scan_to_view: "Scan to view crop details",
        download: "Download",
        sown: "Sown",
        age: "Age",
        days: "days",
        germination_stage: "Germination Stage",
        ai_advice: "AI Advice",
        crop_added: "Crop added successfully!",
        daily_log_soon: "Daily log feature coming soon!",
        wind: "Wind",
        location_denied: "Location access denied.",
        geo_not_supported: "Geolocation not supported.",
        scheme: "Scheme",
        new_scheme: "New Scheme",
        weather_alert: "Weather Alert",
        market: "Market",
        price_update: "Price Update",
        subsidy: "Subsidy",
        today: "Today",
        one_day_ago: "1 day ago",
        two_days_ago: "2 days ago",
        three_days_ago: "3 days ago",
        four_days_ago: "4 days ago",
        confirm_reset: "Are you sure you want to delete all data?",
        data_cleared: "All data cleared successfully!"
    },
    ta: {
        loading_weather: "வானிலை ஏற்றுகிறது...",
        kisan_helpline: "விவசாயிகள் உதவி மையம்",
        call: "அழைக்க",
        my_crops: "எனது பயிர்கள்",
        no_crops: "பயிர்கள் எதுவும் சேர்க்கப்படவில்லை.",
        start_farming: "விவசாயத்தைத் தொடங்குங்கள்",
        new_crop: "புதிய பயிர்",
        crop_strategy: "பயிர் திட்டம்",
        crop_name: "பயிர் பெயர்",
        select_crop: "பயிரைத் தேர்ந்தெடுக்கவும்",
        wheat: "கோதுமை",
        rice: "நெல்",
        tomato: "தக்காளி",
        potato: "உருளைக்கிழங்கு",
        cotton: "பருத்தி",
        other: "மற்றவை",
        variety_hybrid: "ரகம் / கலப்பினம்",
        sowing_date: "விதைப்பு தேதி",
        farming_method: "விவசாய முறை",
        organic: "இயற்கை விவசாயம்",
        chemical: "ரசாயன முறை",
        mixed: "கலப்பு முறை",
        previous_crop: "முந்தைய பயிர் (சுழற்சி)",
        next: "அடுத்து",
        field_conditions: "நிலத்தின் நிலை",
        field_name: "நிலத்தின் பெயர்/எண்",
        area_acres: "பரப்பளவு (ஏக்கர்)",
        soil_type: "மண் வகை",
        loamy: "வண்டல் மண்",
        clay: "களிமண்",
        sandy: "மணல் பாங்கான மண்",
        black_soil: "கரிசல் மண்",
        red_soil: "செம்மண்",
        irrigation_source: "நீர்ப்பாசன ஆதாரம்",
        rainfed: "மானாவாரி",
        borewell: "ஆழ்துளை கிணறு",
        canal: "கால்வாய்",
        drip: "சொட்டு நீர் பாசனம்",
        water_source_details: "நீர் ஆதாரம் விவரங்கள்",
        back: "பின்செல்ல",
        resources: "வளங்கள்",
        seed_quantity: "விதை அளவு (கிலோ)",
        seed_treatment_done: "விதை நேர்த்தி செய்யப்பட்டதா?",
        yes: "ஆம்",
        no: "இல்லை",
        expected_yield: "எதிர்பார்க்கப்படும் மகசூல் (குவிண்டால்)",
        finish_plant: "முடித்து விதைக்கவும்",
        tasks: "பணிகள்",
        logs: "பதிவுகள்",
        info: "தகவல்",
        add_daily_log: "தினசரி குறிப்பைச் சேர்க்கவும்",
        latest_updates: "சமீபத்திய விவசாய செய்திகள்",
        home: "முகப்பு",
        updates: "செய்திகள்",
        scan_to_view: "பயிர் விவரங்களைக் காண ஸ்கேன் செய்யவும்",
        download: "பதிவிறக்கம்",
        sown: "விதைக்கப்பட்டது",
        age: "வயது",
        days: "நாட்கள்",
        germination_stage: "முளைக்கும் பருவம்",
        ai_advice: "AI ஆலோசனை",
        crop_added: "பயிர் வெற்றிகரமாக சேர்க்கப்பட்டது!",
        daily_log_soon: "தினசரி குறிப்பு வசதி விரைவில் வரும்!",
        wind: "காற்று",
        location_denied: "இருப்பிட அணுகல் மறுக்கப்பட்டது.",
        geo_not_supported: "புவிஇருப்பிடம் ஆதரிக்கப்படவில்லை.",
        scheme: "திட்டம்",
        new_scheme: "புதிய திட்டம்",
        weather_alert: "வானிலை எச்சரிக்கை",
        market: "சந்தை",
        price_update: "விலை நிலவரம்",
        subsidy: "மானியம்",
        today: "இன்று",
        one_day_ago: "1 நாள் முன்பு",
        two_days_ago: "2 நாட்களுக்கு முன்பு",
        three_days_ago: "3 நாட்களுக்கு முன்பு",
        four_days_ago: "4 நாட்களுக்கு முன்பு",
        confirm_reset: "எல்லா தரவையும் நீக்க விரும்புகிறீர்களா?",
        data_cleared: "எல்லா தரவும் வெற்றிகரமாக அழிக்கப்பட்டது!"
    }
};

const newsData = [
    {
        tagKey: "scheme",
        tagClass: "scheme",
        dateKey: "today",
        en: { title: "PM Kisan Samman Nidhi - 18th Installment", desc: "₹2000 direct benefit transfer for eligible farmers. Verify your bank details and KYC status online." },
        ta: { title: "பிஎம் கிசான் சம்மன் நிதி - 18வது தவணை", desc: "தகுதியுள்ள விவசாயிகளுக்கு ₹2000 நேரடி பயன் பரிமாற்றம். உங்கள் வங்கி விவரங்கள் மற்றும் KYC நிலையை ஆன்லைனில் சரிபார்க்கவும்." }
    },
    {
        tagKey: "new_scheme",
        tagClass: "scheme",
        dateKey: "today",
        en: { title: "Digital Agriculture Mission 2024", desc: "Government launches new digital farming initiative with AI-powered crop advisory services for small farmers." },
        ta: { title: "டிஜிட்டல் விவசாய மிஷன் 2024", desc: "சிறு விவசாயிகளுக்கான AI-இயங்கும் பயிர் ஆலோசனை சேவைகளுடன் புதிய டிஜிட்டல் விவசாய முயற்சியை அரசாங்கம் அறிமுகப்படுத்துகிறது." }
    },
    {
        tagKey: "weather_alert",
        tagClass: "weather",
        dateKey: "one_day_ago",
        en: { title: "Favorable Conditions for Rabi Crops", desc: "IMD predicts good winter rainfall. Ideal conditions expected for wheat and mustard cultivation." },
        ta: { title: "ராபி பயிர்களுக்கு சாதகமான சூழ்நிலை", desc: "IMD நல்ல குளிர்கால மழையை முன்னறிவிக்கிறது. கோதுமை மற்றும் கடுகு சாகுபடிக்கு ஏற்ற சூழல் எதிர்பார்க்கப்படுகிறது." }
    },
    {
        tagKey: "market",
        tagClass: "market",
        dateKey: "two_days_ago",
        en: { title: "Rice Procurement at MSP Extended", desc: "Government extends paddy procurement deadline. MSP set at ₹2183/quintal for common variety." },
        ta: { title: "MSP-ல் நெல் கொள்முதல் நீட்டிப்பு", desc: "அரசாங்கம் நெல் கொள்முதல் காலக்கெடுவை நீட்டித்துள்ளது. பொது ரகத்திற்கு குவிண்டால் ஒன்றுக்கு ₹2183 என MSP நிர்ணயிக்கப்பட்டுள்ளது." }
    },
    {
        tagKey: "price_update",
        tagClass: "market",
        dateKey: "three_days_ago",
        en: { title: "Vegetable Prices Surge in Markets", desc: "Tomato prices reach ₹80/kg due to supply shortage. Potato and onion prices remain stable." },
        ta: { title: "சந்தைகளில் காய்கறி விலைகள் உயர்வு", desc: "வரத்து குறைவால் தக்காளி விலை கிலோ ₹80ஐ எட்டியது. உருளைக்கிழங்கு மற்றும் வெங்காய விலைகள் சீராக உள்ளன." }
    },
    {
        tagKey: "subsidy",
        tagClass: "scheme",
        dateKey: "four_days_ago",
        en: { title: "Fertilizer Subsidy Approved", desc: "₹38,000 crore subsidy approved for Rabi season. DAP and NPK fertilizers to be available at subsidized rates." },
        ta: { title: "உர மானியம் ஒப்புதல்", desc: "ராபி பருவத்திற்கு ₹38,000 கோடி மானியம் ஒப்புதல். DAP மற்றும் NPK உரங்கள் மானிய விலையில் கிடைக்கும்." }
    }
];

// DOM Elements (Initialized in setup)
let views = {};
let navItems = [];

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM references
    views = {
        home: document.getElementById('view-home'),
        addCrop: document.getElementById('view-add-crop'),
        cropDetails: document.getElementById('view-crop-details'),
        updates: document.getElementById('view-updates')
    };
    navItems = document.querySelectorAll('.nav-item');

    // Load crops from localStorage
    loadCrops();

    // Initialize weather
    initWeather();

    // Initialize Language
    setLanguage(state.language);

    // Language Toggle Listener
    document.getElementById('lang-toggle').addEventListener('click', () => {
        const newLang = state.language === 'en' ? 'ta' : 'en';
        setLanguage(newLang);
    });

    // Reset Data Listener
    document.getElementById('reset-btn').addEventListener('click', () => {
        if (confirm(translations[state.language].confirm_reset)) {
            localStorage.removeItem('crops');
            state.crops = [];
            renderCropsList();
            alert(translations[state.language].data_cleared);
            navigateTo('home');
        }
    });

    // Show home by default
    navigateTo('home');
});

function setLanguage(lang) {
    state.language = lang;
    localStorage.setItem('language', lang);

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update button text
    document.getElementById('lang-toggle').textContent = lang === 'en' ? 'தமிழ்' : 'English';

    // Re-render dynamic content if needed
    renderCropsList();
    if (state.currentCropId) {
        openCropDetails(state.currentCropId);
    }

    // Re-render News
    renderNews();

    // Re-render Weather (to update text)
    initWeather();
}

function renderNews() {
    const container = document.getElementById('news-container');
    if (!container) return;

    container.innerHTML = '';
    const lang = state.language;

    newsData.forEach(news => {
        const card = document.createElement('div');
        card.className = 'news-card glass-panel';
        card.innerHTML = `
            <span class="tag ${news.tagClass}">${translations[lang][news.tagKey]}</span>
            <h3>${news[lang].title}</h3>
            <p>${news[lang].desc}</p>
            <span class="date">${translations[lang][news.dateKey]}</span>
        `;
        container.appendChild(card);
    });
}

async function initWeather() {
    const widget = document.getElementById('weather-widget');
    if (!widget) return;

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const weather = await fetchWeather(latitude, longitude);

            if (weather) {
                const iconClass = getWeatherIcon(weather.weathercode);
                widget.innerHTML = `
                    <div class="weather-icon"><i class="fa-solid ${iconClass}"></i></div>
                    <div class="weather-info">
                        <div class="temp">${weather.temperature}°C</div>
                        <div class="desc">${translations[state.language].wind}: ${weather.windspeed} km/h</div>
                    </div>
                `;
            }
        }, (error) => {
            widget.innerHTML = `<p>${translations[state.language].location_denied}</p>`;
        });
    } else {
        widget.innerHTML = `<p>${translations[state.language].geo_not_supported}</p>`;
    }
}

// Navigation
function navigateTo(viewName) {
    // Hide all views
    Object.values(views).forEach(view => view.classList.remove('active'));

    // Show target view
    if (viewName === 'home') views.home.classList.add('active');
    if (viewName === 'add-crop') {
        resetWizard();
        views.addCrop.classList.add('active');
    }
    if (viewName === 'crop-details') views.cropDetails.classList.add('active');
    if (viewName === 'updates') {
        views.updates.classList.add('active');
        renderNews(); // Render news when updates view is shown
    }

    // Update Bottom Nav
    navItems.forEach(item => {
        if (item.dataset.target === viewName) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    window.scrollTo(0, 0);
}

// Wizard Logic
function nextStep(step) {
    document.getElementById(`step-${state.currentStep}`).classList.remove('active');
    document.querySelector(`.step[data-step="${state.currentStep}"]`).classList.remove('active');

    state.currentStep = step;

    document.getElementById(`step-${step}`).classList.add('active');
    document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
}

function prevStep(step) {
    nextStep(step);
}

function resetWizard() {
    state.currentStep = 1;
    document.getElementById('add-crop-form').reset();
    document.querySelectorAll('.wizard-step').forEach(el => el.classList.remove('active'));
    document.getElementById('step-1').classList.add('active');
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    document.querySelector('.step[data-step="1"]').classList.add('active');
}

// Form Submission (Add Crop)
document.getElementById('add-crop-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const newCrop = {
        id: Date.now().toString(),
        name: document.getElementById('crop-name').value,
        variety: document.getElementById('crop-variety').value,
        sowing_date: document.getElementById('crop-sowing-date').value,
        method: document.getElementById('crop-method').value,
        previous_crop: document.getElementById('crop-prev').value,

        field_name: document.getElementById('field-name').value,
        field_area: parseFloat(document.getElementById('field-area').value) || 0,
        field_soil: document.getElementById('field-soil').value,
        field_irrigation: document.getElementById('field-irrigation').value,
        water_source_details: document.getElementById('field-water-details').value,

        seed_quantity: parseFloat(document.getElementById('resource-seeds').value) || 0,
        seed_treated: document.querySelector('input[name="seed-treat"]:checked').value === 'yes',
        expected_yield: parseFloat(document.getElementById('resource-yield').value) || 0,

        created_at: new Date().toISOString()
    };

    saveCrop(newCrop);
    navigateTo('home');
});

// Data Management (localStorage)
function saveCrop(crop) {
    // Get existing crops
    const crops = JSON.parse(localStorage.getItem('crops') || '[]');

    // Add new crop
    crops.push(crop);

    // Save back to localStorage
    localStorage.setItem('crops', JSON.stringify(crops));

    // Update state
    state.crops = crops;
    renderCropsList();

    alert(translations[state.language].crop_added);
}

function loadCrops() {
    // Load from localStorage
    const crops = JSON.parse(localStorage.getItem('crops') || '[]');
    state.crops = crops;
    renderCropsList();
}

function renderCropsList() {
    const list = document.getElementById('crops-list');
    list.innerHTML = '';

    if (state.crops.length === 0) {
        list.innerHTML = `
            <div class="empty-state" style="text-align: center; padding: 2rem;">
                <p style="color: var(--text-light); margin-bottom: 1rem;" data-i18n="no_crops">${translations[state.language].no_crops}</p>
                <button class="btn-primary" onclick="navigateTo('add-crop')" data-i18n="start_farming">${translations[state.language].start_farming}</button>
            </div>
        `;
        return;
    }

    state.crops.forEach(crop => {
        const age = calculateAge(crop.sowing_date);
        const card = document.createElement('div');
        card.className = 'crop-card glass-panel';
        card.onclick = () => openCropDetails(crop.id);
        card.innerHTML = `
            <div class="crop-header">
                <span class="crop-name">${crop.name}</span>
                <span class="crop-status">${age} ${translations[state.language].days}</span>
            </div>
            <div class="crop-details-row">
                <span><i class="fa-solid fa-location-dot"></i> ${crop.field_name}</span>
                <span><i class="fa-solid fa-seedling"></i> ${crop.variety}</span>
            </div>
        `;
        list.appendChild(card);
    });
}

function calculateAge(dateString) {
    const start = new Date(dateString);
    const now = new Date();
    const diff = now - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Crop Details
function openCropDetails(id) {
    const crop = state.crops.find(c => c.id === id);
    if (!crop) return;

    state.currentCropId = id;

    document.getElementById('detail-crop-name').textContent = crop.name;
    document.getElementById('detail-sown-date').textContent = new Date(crop.sowing_date).toLocaleDateString();

    const age = calculateAge(crop.sowing_date);
    document.getElementById('detail-age').textContent = age;

    // Progress
    const progress = Math.min((age / 120) * 100, 100);
    document.getElementById('detail-progress').style.width = `${progress}%`;

    // AI Suggestion
    const suggestion = getAISuggestion(crop.name, age, 0);
    document.getElementById('detail-stage').textContent = suggestion.title;

    // Populate Info Tab
    const infoGrid = document.getElementById('detail-info-grid');
    infoGrid.innerHTML = `
        <div class="info-item"><strong>Variety:</strong> ${crop.variety}</div>
        <div class="info-item"><strong>Method:</strong> ${crop.method}</div>
        <div class="info-item"><strong>Previous Crop:</strong> ${crop.previous_crop || 'N/A'}</div>
        <div class="info-item"><strong>Field:</strong> ${crop.field_name} (${crop.field_area} acres)</div>
        <div class="info-item"><strong>Soil:</strong> ${crop.field_soil}</div>
        <div class="info-item"><strong>Irrigation:</strong> ${crop.field_irrigation}</div>
        <div class="info-item"><strong>Water Source:</strong> ${crop.water_source_details || 'N/A'}</div>
        <div class="info-item"><strong>Seeds Used:</strong> ${crop.seed_quantity} kg</div>
        <div class="info-item"><strong>Seed Treatment:</strong> ${crop.seed_treated ? 'Yes' : 'No'}</div>
        <div class="info-item"><strong>Expected Yield:</strong> ${crop.expected_yield} quintals</div>
    `;

    // Populate Tasks (AI Driven)
    const tasksContainer = document.getElementById('tab-tasks');
    tasksContainer.innerHTML = `
        <div class="task-item" style="border-left: 4px solid var(--accent-color);">
            <div class="task-content">
                <h4><i class="fa-solid fa-robot"></i> ${translations[state.language].ai_advice}</h4>
                <p>${suggestion.message}</p>
            </div>
        </div>
    `;

    navigateTo('crop-details');
}

function switchDetailTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.detail-tab-content').forEach(content => content.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-btn');
    if (tabName === 'tasks') buttons[0].classList.add('active');
    if (tabName === 'logs') buttons[1].classList.add('active');
    if (tabName === 'info') buttons[2].classList.add('active');

    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// QR Code
function showQRCode() {
    const crop = state.crops.find(c => c.id === state.currentCropId);
    if (!crop) return;

    const modal = document.getElementById('qr-modal');
    const container = document.getElementById('qrcode-container');
    container.innerHTML = '';

    const data = `
CropGPT Passport
----------------
Crop: ${crop.name}
Variety: ${crop.variety}
Sown: ${crop.sowing_date}
Field: ${crop.field_name}
ID: ${crop.id}
    `.trim();

    new QRCode(container, {
        text: data,
        width: 180,
        height: 180,
        colorDark: "#0f5132",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('qr-modal').classList.add('hidden');
}

function downloadQR() {
    const img = document.querySelector('#qrcode-container img');
    if (img) {
        const link = document.createElement('a');
        link.download = `crop-${state.currentCropId}-qr.png`;
        link.href = img.src;
        link.click();
    }
}

// Placeholder for addLog function
function addLog() {
    alert(translations[state.language].daily_log_soon);
}

// Modal close on outside click
window.onclick = function (event) {
    const modal = document.getElementById('qr-modal');
    if (event.target === modal) {
        closeModal();
    }
};
