# Rainfall Data Application - Refactored Structure

## Overview
This application has been refactored from a single monolithic HTML file into a modular, maintainable structure with separation of concerns.

## File Structure

```
/Rainfall/
├── index.html                 # Original monolithic file
├── index-refactored.html      # New modular entry point
├── README.md                  # This documentation
├── css/
│   └── styles.css            # All application styles
└── js/
    ├── app.js                # Main application bootstrap
    ├── config.js             # Configuration constants
    ├── api-service.js        # API data fetching and processing
    ├── rainfall-chart.js     # Chart functionality
    └── map-manager.js        # Map and location functionality
```

## Modules

### 1. `config.js`
- Contains all configuration constants
- API endpoints, map settings, chart colors, etc.
- Centralized configuration management

### 2. `api-service.js`
- Handles all API communications with UK Environment Agency
- Data processing and transformation functions
- Error handling for network requests

### 3. `rainfall-chart.js`
- Chart creation and management using Chart.js
- Slider controls for time period selection
- Data visualization and summary display

### 4. `map-manager.js`
- Leaflet map initialization and management
- Station marker handling
- Geolocation and user interaction features
- Icon management for different marker types

### 5. `app.js`
- Application bootstrap and initialization
- Coordinates between modules
- DOM ready state handling

## Key Improvements

### Modularity
- Single responsibility principle applied to each module
- Clear separation between data, UI, and business logic
- Easier to test individual components

### Maintainability
- Configuration centralized in one location
- Easier to modify API endpoints, styling, or behavior
- Code is self-documenting with clear module boundaries

### Reusability
- Components can be easily reused or extended
- API service can be used by other applications
- Map and chart components are decoupled

### Performance
- ES6 modules with tree-shaking potential
- Better browser caching with separate files
- Easier to implement code splitting if needed

## Usage

Open `index-refactored.html` instead of the original `index.html`. The functionality remains identical but the code is now properly organized and maintainable.

## Dependencies

External dependencies remain the same:
- Chart.js for data visualization
- Leaflet.js for mapping
- Date-fns for date handling
- UK Environment Agency Flood Monitoring API

## Browser Support

Requires modern browser with ES6 module support (all current browsers).