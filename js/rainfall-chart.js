import { ApiService } from './api-service.js';
import { CONFIG } from './config.js';

export class RainfallChart {
    constructor(canvasId, containerId) {
        this.ctx = document.getElementById(canvasId).getContext('2d');
        this.container = document.getElementById(containerId);
        this.chart = null;
        this.daysSlider = document.getElementById('days-slider');
        this.daysValue = document.getElementById('days-value');
        
        this.initializeSlider();
        this.loadInitialData();
    }

    initializeSlider() {
        this.daysSlider.addEventListener('input', () => {
            this.daysValue.textContent = this.daysSlider.value;
            this.updateRainfallData();
        });
    }

    async loadInitialData() {
        await this.updateRainfallData();
    }

    async updateRainfallData(stationId = CONFIG.API.DEFAULT_STATION) {
        try {
            const days = parseInt(this.daysSlider.value);
            const rawData = await ApiService.fetchRainfallData(stationId, days);
            const processedData = ApiService.processRainfallData(rawData);
            
            this.createChart(processedData, `Rainfall at Station ${stationId}`);
            this.updateSummary(stationId, days, processedData);
        } catch (error) {
            console.error('Error updating rainfall data:', error);
            this.container.innerHTML = '<p>Error loading rainfall data. Please try again.</p>';
        }
    }

    createChart(data, label = 'Daily Rainfall (mm)') {
        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item.date),
                datasets: [{
                    label: label,
                    data: data.map(item => item.value),
                    backgroundColor: CONFIG.CHART.BACKGROUND_COLOR,
                    borderColor: CONFIG.CHART.BORDER_COLOR,
                    borderWidth: CONFIG.CHART.BORDER_WIDTH
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Rainfall (mm)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    }
                }
            }
        });
    }

    updateSummary(stationId, days, processedData) {
        const totalRainfall = ApiService.calculateTotalRainfall(processedData);
        this.container.innerHTML = `<p>Total rainfall at Station ${stationId} for the last ${days} days: ${totalRainfall} mm</p>`;
    }

    async updateStationChart(stationReference) {
        await this.updateRainfallData(stationReference);
    }
}