<template>
  <img class="loading-icon" src="@/assets/icons/sun.svg" alt="Loading...">
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

.loading-icon {
  block-size: 6rem;
  animation: rotatePulse 3s linear infinite;
}

@keyframes rotatePulse {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(2);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

</style>
