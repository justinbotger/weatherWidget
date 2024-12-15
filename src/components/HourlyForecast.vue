<template>
  <div class="hourly-forecast-timeline">
    <div v-for="weatherHour in weatherData" :key="weatherHour.time" class="hourly-forecast-timeline__hour">
      <div>{{ weatherHour.time }}</div>
      <WeatherIcon :weather-code="weatherHour.values.weatherCode"></WeatherIcon>
      <div>{{  formatTemperature(weatherHour.values.temperature) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeatherForecastResponse, WeatherData } from '@/types/apiResponseTypes';
import { computed, ref } from 'vue';
import WeatherIcon from './WeatherIcon.vue';
import formatTemperature from '@/helpers/temperatureFormatter';

const hourRange = ref({min: 2, max: 9});

const props = defineProps<{
  weatherForecastData: WeatherForecastResponse
}>();

const weatherData = computed<WeatherData[]>(() => {
  let hours = props.weatherForecastData.timelines.hourly.slice(hourRange.value.min, hourRange.value.max) || [];
  hours.forEach(hour => {hour.time = new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
  return hours;
})

</script>

<style scoped lang="scss">

.hourly-forecast-timeline {
  display: none;
  gap: 1rem;
  justify-content: space-between;
  text-align: center;
  margin-block: 1rem;
  flex-wrap: wrap;
  overflow: hidden;
  min-block-size: 130px;
  max-block-size: 130px;
  border-top: 1px solid white;
  padding-block: 1rem;

  @media (min-height: 400px) {
    display: flex;
  }

  @media (min-width: 600px) {
    min-block-size: 150px;
    max-block-size: 150px;
  }

  &__hour {
    display: flex;
    gap: .5rem;
    flex-direction: column;
    justify-content: space-between;
    inline-size: 3rem;

    @media (min-width: 650px) {
      inline-size: 5rem;
    }
  }
}

</style>
