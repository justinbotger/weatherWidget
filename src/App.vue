<template>
  <div class="weather-widget">
    <div class="weather-widget__loading" v-if="isLoading">
      <loading-icon></loading-icon>
    </div>
    <div class="weather-widget__error" v-else-if="errorMessage">
      <div class="weather-widget__error__message">{{ errorMessage }}</div>
      <button class="weather-widget__error__refresh-button" @click="refresh()">
        <img src="@/assets/icons/reload.svg" alt="Refresh">
      </button>
    </div>
    <div class="weather-widget__components" v-else>
      <realtime-weather v-if="realTimeWeatherData" :realtimeWeather="realTimeWeatherData"></realtime-weather>
      <hourly-forecast v-if="weatherForecastData" :weatherForecastData="weatherForecastData"></hourly-forecast>
      <daily-forecast v-if="weatherForecastData" :weatherForecastData="weatherForecastData"></daily-forecast>
    </div>
  </div>
</template>

<script setup lang="ts">
import apiClient from './services/apiClient';
import { onMounted, ref } from 'vue';
import RealtimeWeather from './components/RealtimeWeather.vue';
import HourlyForecast from './components/HourlyForecast.vue';
import DailyForecast from './components/DailyForecast.vue';
import LoadingIcon from './components/LoadingIcon.vue';
import type { WeatherForecastResponse, RealtimeWeatherResponse } from './types/apiResponseTypes';
import { handleApiError } from './helpers/apiErrorHandler';

const realTimeWeatherData = ref<RealtimeWeatherResponse | null>(null);
const weatherForecastData = ref<WeatherForecastResponse | null>(null);
const coordinates = ref<{ latitude: string; longitude: string } | null>(null);
const isLoading = ref<boolean>(true);
const errorMessage = ref<string | null>(null);

function getWeatherData() {
  Promise.all([getRealTimeWeather(), getWeatherForecast()])
  .finally(() => {
    isLoading.value = false;
  });
}

function getRealTimeWeather() {
  if(coordinates.value === null) return;

  apiClient.get<RealtimeWeatherResponse>(`realtime?location=${coordinates.value.latitude},${coordinates.value.longitude}`)
    .then(response => {
      realTimeWeatherData.value = response.data as RealtimeWeatherResponse;
    })
    .catch(error => {
      errorMessage.value = handleApiError(error);
    });
}

function getWeatherForecast() {
  if(coordinates.value === null) return;

  apiClient.get<WeatherForecastResponse>(`forecast?location=${coordinates.value.latitude},${coordinates.value.longitude}`)
    .then(response => {
      weatherForecastData.value = response.data as WeatherForecastResponse;
    })
    .catch(error => {
      errorMessage.value = handleApiError(error);
    });
}

function getUserLocation() {
  if (!navigator.geolocation) {
    errorMessage.value = 'Geolocation is not supported by your browser.';
    isLoading.value = false;
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      coordinates.value = {
        latitude: position.coords.latitude.toString(),
        longitude: position.coords.longitude.toString(),
      };
      getWeatherData();
    },
    (error) => {
      errorMessage.value = 'Unable to retrieve your location.';
      isLoading.value = false;
    }
  );
}

function refresh() {
  getUserLocation();
}

onMounted(() => { getUserLocation(); });

</script>

<style scoped lang="scss">


.weather-widget {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: linear-gradient(to bottom, #005EFF, #4B8EDB);
    padding: 2rem;
    min-width: 375px;
    max-width: 1000px;
    height: 100%;
    max-height: 700px;
    flex-grow: 1;
    border-radius: 1rem;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    box-shadow: 0px 0px 25px 2px rgba(0,0,0,1);

    &__components {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;
    }

    &__loading {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__error {
      display: flex;
      gap: 3rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &__message {
        background-color: rgba(250, 147, 147, 0.381);
        text-align: center;
        font-size: 1.2rem;
        padding: 1rem;
        border-radius: .5rem;
      }

      &__refresh-button {
        block-size: 4rem;
        inline-size: 4rem;
        background: transparent;
        outline: none;
        border: none;

        img {
          block-size: 100%;
          inline-size: 100%;
        }
      }
    }
}
</style>
