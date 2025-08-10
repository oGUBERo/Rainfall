import { ApiService } from './api-service.js';
import { CONFIG } from './config.js';

export class MapManager {
    constructor(mapId, rainfallChart) {
        this.mapId = mapId;
        this.rainfallChart = rainfallChart;
        this.map = null;
        this.markers = [];
        this.userLocation = null;
        this.searchLocation = null;
        this.icons = {};
        
        this.createIcons();
        this.initializeMap();
        this.setupEventListeners();
    }

    createIcons() {
        const iconConfig = {
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
            shadowUrl: CONFIG.ICONS.SHADOW
        };

        this.icons.blue = new L.Icon({
            ...iconConfig,
            iconUrl: CONFIG.ICONS.BLUE
        });

        this.icons.red = new L.Icon({
            ...iconConfig,
            iconUrl: CONFIG.ICONS.RED
        });

        this.icons.green = new L.Icon({
            ...iconConfig,
            iconUrl: CONFIG.ICONS.GREEN
        });
    }

    initializeMap() {
        try {
            console.log('Initializing map...');
            this.map = L.map(this.mapId);
            
            L.tileLayer(CONFIG.MAP.TILE_URL, {
                attribution: CONFIG.MAP.ATTRIBUTION
            }).addTo(this.map);

            this.map.setView([CONFIG.MAP.DEFAULT_LAT, CONFIG.MAP.DEFAULT_LONG], CONFIG.MAP.DEFAULT_ZOOM);

            // Add default search location marker
            this.searchLocation = L.marker([CONFIG.MAP.DEFAULT_LAT, CONFIG.MAP.DEFAULT_LONG], {
                icon: this.icons.green
            }).addTo(this.map).bindPopup('Default Search Location');

            console.log('Map initialized successfully');
            
            // Hide loading screen after a short delay to ensure map is fully loaded
            setTimeout(() => {
                const loadingElement = document.getElementById('map-loading');
                if (loadingElement) {
                    loadingElement.style.display = 'none';
                }
            }, 1000);
        } catch (error) {
            console.error('Error initializing map:', error);
            const loadingElement = document.getElementById('map-loading');
            if (loadingElement) {
                loadingElement.innerHTML = 'Error loading map. Please refresh the page.';
            }
        }

        // Add click event to map
        this.map.on('click', (e) => {
            const clickedLat = e.latlng.lat;
            const clickedLng = e.latlng.lng;
            
            this.searchLocation.setLatLng([clickedLat, clickedLng]);
            this.searchLocation.setPopupContent(`Search Location<br>Lat: ${clickedLat.toFixed(4)}, Lng: ${clickedLng.toFixed(4)}`);
            this.searchLocation.openPopup();

            this.fetchAndDisplayStations(clickedLat, clickedLng);
        });

        // Initial fetch
        this.fetchAndDisplayStations(CONFIG.MAP.DEFAULT_LAT, CONFIG.MAP.DEFAULT_LONG);
    }

    setupEventListeners() {
        // Distance change listener
        document.getElementById('distance').addEventListener('change', () => {
            const latlng = this.searchLocation.getLatLng();
            this.fetchAndDisplayStations(latlng.lat, latlng.lng);
        });

        // Near me button
        document.getElementById('nearMeBtn').addEventListener('click', () => {
            this.getUserLocation();
        });
    }

    async fetchAndDisplayStations(lat, lng) {
        try {
            const distance = document.getElementById('distance').value;
            
            // Clear existing markers
            this.clearStationMarkers();

            // Fetch stations
            const stations = await ApiService.fetchStations(lat, lng, distance);

            // Add markers for each station
            stations.forEach(station => {
                const marker = L.marker([station.lat, station.long], {
                    icon: this.icons.red
                }).addTo(this.map).bindPopup(station.label + ' (' + station.stationReference + ')');
                
                // Add click event to marker
                marker.on('click', () => {
                    this.rainfallChart.updateStationChart(station.stationReference);
                });
                
                this.markers.push(marker);
            });

            // Center map on search location
            this.map.setView([lat, lng], CONFIG.MAP.DEFAULT_ZOOM);

        } catch (error) {
            console.error('Error fetching and displaying stations:', error);
        }
    }

    clearStationMarkers() {
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];
    }

    getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => this.updateMapToUserLocation(position),
                (error) => this.showLocationError(error)
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    updateMapToUserLocation(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Update map view
        this.map.setView([lat, lng], CONFIG.MAP.DEFAULT_ZOOM);

        // Update search location marker
        this.searchLocation.setLatLng([lat, lng]);
        this.searchLocation.setPopupContent('Your Location');
        this.searchLocation.openPopup();

        // Add or update user location marker
        if (this.userLocation) {
            this.userLocation.setLatLng([lat, lng]);
        } else {
            this.userLocation = L.marker([lat, lng], {
                icon: this.icons.blue
            }).addTo(this.map).bindPopup('Your Location');
        }

        // Fetch stations for the new location
        this.fetchAndDisplayStations(lat, lng);
    }

    showLocationError(error) {
        let message;
        switch(error.code) {
            case error.PERMISSION_DENIED:
                message = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                message = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                message = "The request to get user location timed out.";
                break;
            default:
                message = "An unknown error occurred.";
                break;
        }
        alert(message);
    }
}