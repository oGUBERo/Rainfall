import { CONFIG } from './config.js';

export class ApiService {
    static async fetchRainfallData(stationId, days) {
        const limit = days * CONFIG.API.READINGS_PER_DAY;
        const url = `${CONFIG.API.BASE_URL}/id/stations/${stationId}/readings?_sorted&_limit=${limit}&parameter=rainfall`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.items;
        } catch (error) {
            console.error('Error fetching rainfall data:', error);
            throw error;
        }
    }

    static async fetchStations(lat, long, distance) {
        const url = `${CONFIG.API.BASE_URL}/id/stations?parameter=rainfall&lat=${lat}&long=${long}&dist=${distance}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.items;
        } catch (error) {
            console.error('Error fetching stations:', error);
            throw error;
        }
    }

    static processRainfallData(data) {
        const dailyRainfall = {};
        
        data.forEach(item => {
            const date = new Date(item.dateTime).toLocaleDateString();
            const value = parseFloat(item.value);
            
            if (!dailyRainfall[date]) {
                dailyRainfall[date] = 0;
            }
            dailyRainfall[date] += value;
        });

        return Object.entries(dailyRainfall).map(([date, value]) => ({
            date,
            value: value.toFixed(2)
        }));
    }

    static calculateTotalRainfall(processedData) {
        return processedData.reduce((sum, item) => sum + parseFloat(item.value), 0).toFixed(2);
    }
}