<template>
  <img class="icon" :src="iconSource" :alt="getWeatherDescription(props.weatherCode, 'general')">
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getWeatherDescription } from '@/helpers/weatherCodes';

const props = defineProps({
  weatherCode: Number
})

const iconSource = computed(() => {
  const paddedCode = props.weatherCode.toString().padEnd(5, '0');
  return `src/assets/tomorrow-icons/${paddedCode}.png`;
})

</script>

<style scoped lang="scss">

.icon {
  max-width: 100px;
}
</style>
