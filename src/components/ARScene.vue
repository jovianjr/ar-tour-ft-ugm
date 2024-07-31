<script setup>
  import { onMounted, ref } from 'vue'

  const loading = ref(true)

  const props = defineProps({
    active: {
      default: true,
      type: Boolean,
      required: true
    }
  })

  onMounted(async () => {
    await import('aframe')
    await import('mind-ar/dist/mindar-image-aframe.prod.js')
    loading.value = false
  })
</script>

<template>
  <main class="relative h-svh w-svw" v-if="!loading" :class="props.active ? 'z-[-1]' : 'z-[-2]'">
    <div class="ar-wrapper">
      <a-scene
        mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.mind;uiScanning:no;uiLoading:no;"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
        <a-entity mindar-image-target="targetIndex: 0">
          <a-plane color="blue" opaciy="0.5" position="0 0 0" height="0.552" width="1" rotation="0 0 0"></a-plane>
        </a-entity>
      </a-scene>
    </div>
  </main>
</template>

<style>
  .ar-wrapper {
    @apply h-full w-full;
  }

  .ar-wrapper video {
    @apply !left-0;
  }
</style>
