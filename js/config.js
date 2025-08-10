// Configuration constants
export const CONFIG = {
    API: {
        BASE_URL: 'https://environment.data.gov.uk/flood-monitoring',
        DEFAULT_STATION: 'E7050',
        READINGS_PER_DAY: 96
    },
    MAP: {
        DEFAULT_LAT: 50.691845,
        DEFAULT_LONG: -1.308358,
        DEFAULT_ZOOM: 10,
        TILE_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },
    ICONS: {
        BLUE: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        RED: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        GREEN: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        SHADOW: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'
    },
    CHART: {
        BACKGROUND_COLOR: 'rgba(75, 192, 192, 0.6)',
        BORDER_COLOR: 'rgba(75, 192, 192, 1)',
        BORDER_WIDTH: 1
    },
    SLIDER: {
        MIN_DAYS: 1,
        MAX_DAYS: 30,
        DEFAULT_DAYS: 30
    },
    DISTANCE_OPTIONS: [10, 20, 50, 100]
};