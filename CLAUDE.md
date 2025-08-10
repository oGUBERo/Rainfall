# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a rainfall data visualization web application that displays UK rainfall monitoring data from the government's flood monitoring API. The project consists of two main HTML pages that work together to provide rainfall analytics and station location mapping.

## Architecture

### Main Components

**index.html** - Primary rainfall data dashboard
- Fetches data from UK Environment Agency flood monitoring API (station E14920)
- Displays real-time rainfall statistics and historical data
- Interactive chart visualization using Chart.js with date-fns adapter
- Data processing logic that aggregates readings into daily totals
- User controls for adjusting the number of days to display (default: 30 days)

**Rainfall-station-location.html** - Station location mapper  
- Interactive map using Leaflet.js showing 6 rainfall monitoring stations
- Tabular display of station coordinates and grid references
- Stations cover the Isle of Wight area (coordinates ~50.6-50.7 lat, -1.2 to -1.4 lng)

### Key Technical Details

- **API Integration**: Uses UK Government flood monitoring API at `environment.data.gov.uk/flood-monitoring`
- **Data Processing**: JavaScript functions process API responses into daily rainfall summaries with first readings and cumulative totals
- **Visualization**: Chart.js with time-based x-axis for trend analysis
- **Mapping**: Leaflet.js with OpenStreetMap tiles for station locations

### Data Flow

1. User inputs number of days → API call with date range
2. Raw readings processed into daily aggregates (first reading + daily total)
3. Statistics calculated (averages, totals) and displayed
4. Chart updated with processed daily totals
5. Table populated with detailed daily breakdown

## Development Notes

- All dependencies loaded via CDN (no build process required)
- Self-contained HTML files with embedded CSS and JavaScript
- API calls include error handling for network failures
- Chart destruction/recreation pattern used for updates rather than data updates
- Station E14920 is the primary data source for the main dashboard