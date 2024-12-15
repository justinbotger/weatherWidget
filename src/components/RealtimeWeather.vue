<template>
  <div v-if="realtimeWeather">
    <div class="location">
      {{ realtimeWeather.location.name }}
    </div>
    <div class="realtime-info">
      <div class="realtime-info__temperature">
        <div class="realtime-info__temperature__actual">{{  formatTemperature(realtimeWeather.data.values.temperature) }}</div>
        <div class="realtime-info__temperature__apparent">Feels like {{ formatTemperature(realtimeWeather.data.values.temperatureApparent) }}</div>
      </div>
      <div class="realtime-info__description">
        <weather-icon :weather-code="realtimeWeather.data.values.weatherCode"></weather-icon>
        <span>{{  weatherDescription }}</span>
      </div>
      <div class="realtime-info__values">
        <div class="realtime-info__values__value">
          <img src="@/assets/icons/droplet.svg" alt="humidity">
          <span>{{ realtimeWeather.data.values.humidity }}%</span>
        </div>
        <div class="realtime-info__values__value">
          <img src="@/assets/icons/cloud-rain.svg" alt="precipitation probability">
          <span>{{  realtimeWeather.data.values.precipitationProbability }}%</span>
        </div>
        <div class="realtime-info__values__value">
          <img src="@/assets/icons/wind.svg" alt="wind speed">
          <span>{{  realtimeWeather.data.values.windSpeed }} m/s</span>
        </div>
        <div class="realtime-info__values__value">
          <img src="@/assets/icons/compass.svg" alt="wind direction">
          <span>{{  realtimeWeather.data.values.windDirection }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import WeatherIcon from './WeatherIcon.vue';
import { getWeatherDescription } from '@/helpers/weatherCodes';
import formatTemperature from '@/helpers/temperatureFormatter';
import type { RealtimeWeatherResponse } from '@/types/apiResponseTypes';

const props = defineProps<{
  realtimeWeather: RealtimeWeatherResponse
}>();

const weatherDescription = computed(() => {
  return getWeatherDescription(props.realtimeWeather.data.values.weatherCode, "general");
})

</script>

<style scoped lang="scss">

.location {
  text-align: center;
  margin-block-end: 1rem;
}

.realtime-info {
  display: flex;
  column: 1rem;
  justify-content: space-between;
  padding-block-end: 1rem;

  &__temperature {
    font-size: .85rem;
    width: 33.3%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (min-width: 600px) {
      font-size: 1.4rem;
    }

    &__apparent {

    }

    &__actual {
      font-size: 2.4rem;

      @media (min-width: 600px) {
        font-size: 4rem;
      }
    }
  }

  &__description {
    width: 33.3%;
    display: flex;
    flex-direction: column;
    font-size: .85rem;
    align-items: center;
    text-align: center;

    @media (min-width: 600px) {
      font-size: 1.4rem;
    }
  }

  &__values {
    max-width: 33.3%;
    width: fit-content;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 1rem;

    @media (min-width: 800px) {
      font-size: 1.4rem;
    }

    &__value {
      width: 100%;
      display: flex;
      justify-content: end;

      span {
        min-width: 4rem;
      }

      @media (min-width: 800px) {
        width: 50%;
        justify-content: start;
      }
    }

    img {
      height: 1.1rem;
      margin-inline-end: 1rem;

      @media (min-width: 800px) {
        height: 1.5rem;
        margin-inline-end: 1rem;
      }
    }
  }

}
</style>
