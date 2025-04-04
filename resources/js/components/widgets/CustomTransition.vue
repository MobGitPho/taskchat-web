<script setup lang="ts">
  type Animation = 'fade' | 'slide-fade' | 'bounce'
  type Mode = 'default' | 'in-out' | 'out-in' | undefined

  interface Props {
    name?: Animation
    mode?: Mode
    appear?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    name: 'fade',
    mode: 'out-in',
    appear: false,
  })
</script>

<template>
  <Transition :name="props.name" :mode="props.mode" :appear="props.appear">
    <slot />
  </Transition>
</template>

<style scoped>
  /* Fade Animation */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  /* Slide Fade Animation */
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }

  /* Bounce Animation */
  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
