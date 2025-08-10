import { RainfallChart } from './rainfall-chart.js';
import { MapManager } from './map-manager.js';

class RainfallApp {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        // Initialize rainfall chart
        this.rainfallChart = new RainfallChart('rainfallChart', 'rainfall-container');
        
        // Initialize map manager
        this.mapManager = new MapManager('map', this.rainfallChart);
    }
}

// Initialize the application
new RainfallApp();