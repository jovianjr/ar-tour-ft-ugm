<script setup>
  import { ref, onMounted } from 'vue'
  import { PaperAirplaneIcon } from '@heroicons/vue/24/solid'

  const emit = defineEmits(['startApp'])
  const isIOS = ref()

  onMounted(() => {
    isIOS.value = navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)
  })

  const startOrientation = () => {
    if (isIOS.value) DeviceOrientationEvent.requestPermission()
    emit('startApp')
  }
</script>

<template>
  <div class="h-[100svh]">
    <div
      class="relative flex h-full items-center justify-center bg-slate-300 bg-[url('/images/bg.jpg')] bg-cover md:bg-[url('/images/bg-desktop.jpg')]"
    >
      <div class="absolute left-0 top-0 h-full w-full bg-black/40 backdrop-blur-sm"></div>
      <div class="items-START z-10 flex flex-col gap-5 px-4">
        <h1 class="text-4xl font-semibold text-white md:text-6xl">
          AR Tour <br />
          Fakultas Teknik <br />
          UGM
        </h1>
        <button
          @click="startOrientation"
          class="flex w-fit items-center gap-2 rounded-full border-2 border-slate-700 bg-slate-900 px-6 py-2 text-white transition-all duration-300 hover:border-white"
        >
          Start Now
          <PaperAirplaneIcon class="h-5 w-5 text-inherit" />
        </button>
      </div>
    </div>
    <footer
      class="absolute bottom-0 w-full border-white bg-slate-900/80 py-4 text-center text-xs font-light text-white"
    >
      AR Tour FT UGM - Alphonsus Jovian J R @ 2024
    </footer>
  </div>
</template>
