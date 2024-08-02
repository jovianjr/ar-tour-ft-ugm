<script setup>
  import { ref } from 'vue';
  // Pages
  import HomeView from '@/views/Home/HomeView.vue';
  import ARView from '@/views/AR/ARView.vue';

  const welcome = ref(true);
</script>

<template>
  <HomeView v-if="welcome" @startApp="welcome = false" />
  <ARView v-if="!welcome" @endApp="welcome = true" />
</template>
