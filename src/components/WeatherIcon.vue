<template>
  <img v-if="props.weatherCode" class="icon" :src="iconSource" :alt="getWeatherDescription(props.weatherCode, 'general')">
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getWeatherDescription } from '@/helpers/weatherCodes';

const props = defineProps({
  weatherCode: Number
})

const iconSource = computed(() => {
  if(props.weatherCode) {
    const paddedCode = props.weatherCode.toString().padEnd(5, '0');
    return `src/assets/tomorrow-icons/${paddedCode}.png`;
  }
})

</script>

<style scoped lang="scss">

.icon {
  max-width: 100px;
}
</style>
