<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();
</script>

<template>
  <div class="w-screen h-svh flex items-center justify-center bg-white">
    <button class="bg-black px-4 py-2 text-white font-semibold" @click="router.push('/test/model')">Start Now</button>
  </div>
</template>
