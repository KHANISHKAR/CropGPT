// Weather Service using Open-Meteo (Free, No Key)

async function fetchWeather(lat, lon) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const response = await fetch(url);
        const data = await response.json();
        return data.current_weather;
    } catch (error) {
        console.error("Weather fetch failed:", error);
        return null;
    }
}

function getWeatherIcon(code) {
    // WMO Weather interpretation codes (http://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM)
    const icons = {
        0: 'fa-sun', // Clear sky
        1: 'fa-cloud-sun', // Mainly clear
        2: 'fa-cloud-sun', // Partly cloudy
        3: 'fa-cloud', // Overcast
        45: 'fa-smog', // Fog
        48: 'fa-smog', // Depositing rime fog
        51: 'fa-cloud-rain', // Drizzle: Light
        53: 'fa-cloud-rain', // Drizzle: Moderate
        55: 'fa-cloud-showers-heavy', // Drizzle: Dense
        61: 'fa-cloud-rain', // Rain: Slight
        63: 'fa-cloud-showers-heavy', // Rain: Moderate
        65: 'fa-cloud-showers-heavy', // Rain: Heavy
        80: 'fa-cloud-showers-heavy', // Rain showers: Slight
        81: 'fa-cloud-showers-heavy', // Rain showers: Moderate
        82: 'fa-cloud-showers-heavy', // Rain showers: Violent
        95: 'fa-bolt', // Thunderstorm: Slight or moderate
        96: 'fa-bolt', // Thunderstorm with slight hail
        99: 'fa-bolt' // Thunderstorm with heavy hail
    };
    return icons[code] || 'fa-cloud';
}

// initWeatherWidget removed. Logic moved to script.js for localization support.
