<template>
  <div class="daily-forecast-timeline">
    <div v-for="weatherDay in weatherData" :key="weatherDay.time" class="daily-forecast-timeline__day">
      <div class="daily-forecast-timeline__day__dayname">{{ weatherDay.time }}</div>
      <div class="daily-forecast-timeline__day__weather-icon-wrapper">
        <WeatherIcon :weather-code="weatherDay.values.weatherCodeMin"></WeatherIcon>
        <div>{{ formatTemperature(weatherDay.values.temperatureMin) }}</div>
      </div>
      <div class="daily-forecast-timeline__day__weather-icon-wrapper">
        <WeatherIcon :weather-code="weatherDay.values.weatherCodeMax"></WeatherIcon>
        <div>{{ formatTemperature(weatherDay.values.temperatureMax) }}</div>
      </div>
      <div class="daily-forecast-timeline__day__icon-wrapper">
        <img src="@/assets/icons/cloud-rain.svg" alt="average precipitation probability">
        <div>{{ weatherDay.values.precipitationProbabilityAvg }}%</div>
      </div>
      <div class="daily-forecast-timeline__day__icon-wrapper">
        <img src="@/assets/icons/droplet.svg" alt="average humidity">
        <div>{{ weatherDay.values.humidityAvg }}%</div>
      </div>
      <div class="daily-forecast-timeline__day__icon-wrapper">
        <img src="@/assets/icons/wind.svg" alt="average wind speed">
        <div>{{ weatherDay.values.windSpeedAvg }}m/s</div>
      </div>
      <div class="daily-forecast-timeline__day__icon-wrapper">
        <img src="@/assets/icons/compass.svg" alt="average wind direction">
        <div>{{ weatherDay.values.windDirectionAvg }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeatherForecastResponse, WeatherDataDaily } from '@/types/apiResponseTypes';
import { computed } from 'vue';
import WeatherIcon from './WeatherIcon.vue';
import formatTemperature from '@/helpers/temperatureFormatter';

const props = defineProps<{
  weatherForecastData: WeatherForecastResponse
}>();

const weatherData = computed<WeatherDataDaily[]>(() => {
  let days = props.weatherForecastData.timelines.daily.slice(0, 3) || [];
  days.forEach(day => {day.time = new Date(day.time).toLocaleDateString(undefined, { weekday: 'short' })})
  return days;
})

</script>

<style scoped lang="scss">

.daily-forecast-timeline {
  display: none;
  flex-wrap: wrap;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  border-top: 1px solid white;
  padding-block: 1rem;

  @media (min-height: 500px) {
    display: flex;
  }

  &__day {
    display: flex;
    flex-wrap: wrap;
    block-size: 4rem;
    overflow: hidden;
    align-items: center;
    justify-content: space-between;
    inline-size: 100%;

    &__dayname {
      font-weight: bold;
      max-inline-size: 2rem;
    }

    &__weather-icon-wrapper {
      text-align: center;
      inline-size: 4rem;
      block-size: 4rem;
    }

    &__icon-wrapper {
      display: flex;
      gap: .5rem;
      align-items: center;
      justify-content: start;
      text-align: left;
      inline-size: 6rem;
      block-size: 4rem;

      img {
        inline-size: 30px;
      }
    }

    .icon {
      inline-size: 30px;
    }
  }
}

</style>
