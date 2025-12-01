// CropGPT AI Suggestion Engine

const KNOWLEDGE_BASE = {
    'Wheat': {
        stages: [
            { maxAge: 21, stage: 'Crown Root Initiation', advice: 'Critical stage for irrigation. Apply first dose of Nitrogen.' },
            { maxAge: 60, stage: 'Tillering', advice: 'Keep field weed-free. Monitor for termite attack.' },
            { maxAge: 90, stage: 'Flowering', advice: 'Avoid water stress. Check for rust diseases.' },
            { maxAge: 120, stage: 'Maturity', advice: 'Stop irrigation. Prepare for harvest.' }
        ]
    },
    'Rice': {
        stages: [
            { maxAge: 30, stage: 'Seedling/Transplanting', advice: 'Maintain 2-3cm water level. Apply basal fertilizer.' },
            { maxAge: 60, stage: 'Tillering', advice: 'Drain water for 2-3 days to aerate soil.' },
            { maxAge: 90, stage: 'Panicle Initiation', advice: 'Apply top dressing of Urea.' },
            { maxAge: 120, stage: 'Ripening', advice: 'Drain field completely 10 days before harvest.' }
        ]
    },
    'Tomato': {
        stages: [
            { maxAge: 20, stage: 'Transplanting', advice: 'Stake plants for support. Water immediately after planting.' },
            { maxAge: 45, stage: 'Vegetative', advice: 'Prune suckers. Apply balanced NPK.' },
            { maxAge: 70, stage: 'Flowering/Fruiting', advice: 'Ensure consistent moisture to prevent blossom end rot.' },
            { maxAge: 100, stage: 'Harvesting', advice: 'Pick fruits at breaker stage for transport.' }
        ]
    }
};

function getAISuggestion(cropName, cropAge, weatherCode) {
    let suggestion = {
        title: 'General Advice',
        message: 'Monitor crop health regularly.',
        type: 'info' // info, warning, alert
    };

    // 1. Crop Stage Advice
    const cropData = KNOWLEDGE_BASE[cropName];
    if (cropData) {
        const stageInfo = cropData.stages.find(s => cropAge <= s.maxAge);
        if (stageInfo) {
            suggestion.title = stageInfo.stage;
            suggestion.message = stageInfo.advice;
        }
    }

    // 2. Weather Overrides (Simple Logic)
    // Rain codes: 51-67, 80-82
    const rainCodes = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99];
    if (rainCodes.includes(weatherCode)) {
        suggestion.type = 'warning';
        suggestion.message += ' Rain is expected. Delay irrigation and pesticide spraying.';
    }

    return suggestion;
}
