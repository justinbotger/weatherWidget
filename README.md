# Weather Widget

A modern weather widget built with Vue 3 and TypeScript, designed to provide real-time weather data and forecasts in the web browser. This project demonstrates code quality, extensibility, and usability while adhering to best practices in frontend development.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Setup](#project-setup)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [Linting and Type Checking](#linting-and-type-checking)
  - [Building for Production](#building-for-production)
- [Weather Data](#weather-data)
- [Key Components](#key-components)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Recommended IDE Setup](#recommended-ide-setup)
- [Future Improvements](#future-improvements)

## Overview

The Weather Widget is a responsive and accessible web-based application that fetches and displays real-time weather data and forecasts for any specified location. It was developed as part of an assessment to showcase skills in:

- Frontend architecture
- TypeScript integration with Vue 3
- Error handling
- Usability and visual appeal

## Features

- **Real-Time Weather**: Displays the current weather conditions.
- **Hourly and Daily Forecasts**: Provides weather predictions for upcoming hours and days.
- **Loading State**: Displays a loading spinner while fetching data.
- **Error State**: Shows meaningful error messages when API requests fail.
- **Geolocation Support**: Automatically fetches the user's current location for weather updates.
- **Reusable Components**: Built with a modular and reusable component structure.
- **Accessible UI**: Designed with accessibility in mind.

## Tech Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety and scalability
- **Vite** for fast development and builds
- **SCSS** for styling
- **Tomorrow's Weather API'** for weather data (using a CORS proxy)

## Project Setup

### Installation

Install project dependencies:

```sh
npm install
```

### Running the Project

Start the development server:

```sh
npm run dev
```

### Linting and Type Checking

Run ESLint to check for code issues:

```sh
npm run lint
```

Run TypeScript for type checking:

```sh
npm run type-check
```

### Building for Production

Compile and minify the project for production:

```sh
npm run build
```

## Weather Data

This application fetches weather data from the [Tomorrow's weather api'](https://www.tomorrow.io/weather-api/).

## Key Components

### `App.vue`

The main application file that:
- Fetches weather data from APIs.
- Manages application state (loading, error messages, weather data).
- Dynamically renders components based on the data.

### `RealtimeWeather.vue`

Displays real-time weather data such as temperature, humidity, and conditions.

### `HourlyForecast.vue`

Renders hourly weather forecasts.

### `DailyForecast.vue`

Shows weather predictions for upcoming days.

### `LoadingIcon.vue`

A reusable loading spinner with combined pulse and rotation animations.

### `WeatherIcon.vue`

A reusable icon that displays the weather condition in recognisable ways.

### `helpers/apiErrorHandler.ts`

Handles API errors gracefully by interpreting HTTP status codes and returning user-friendly error messages.

### `helpers/temperatureFormatter.ts`

Formats the temperature to the right locale and appends the temperature unit.

### `helpers/weatherCodes.ts`

Returns the right weather description based on the provided weather code.

### `services/apiClient.ts`

A configured Axios instance for making API requests.

### `types/apiResponseTypes.ts`

Contains all types that represent the responses of Tomorrow's weather api.

## Error Handling

Error handling is implemented via a reusable `handleApiError` helper function. This function interprets HTTP status codes and returns appropriate error messages for display in the UI. For example:

- **400**: "Invalid request. Please try again."
- **401**: "Unauthorized. Check your API key."
- **404**: "Location not found."
- **500**: "Server error. Please try again later."

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) with the [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension (disable Vetur).
- Optional: Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for linting support.

## Future Improvements

Here are some potential improvements for this project:

- **Caching**: Store weather data in local storage or IndexedDB for offline access.
- **End-to-End Testing**: Add Cypress tests to verify user flows.
- **Localization**: Support multiple languages.
- **Unit Conversion**: Provide options for Fahrenheit/Celsius and imperial/metric units.
- **Progressive Web App**: Convert the app into a PWA for better performance and offline capabilities.
- **Enhanced Accessibility**: Add support for screen readers and keyboard navigation.

---