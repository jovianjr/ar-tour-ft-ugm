<script setup>
  import { onMounted, ref } from 'vue';

  const loading = ref(true);

  const props = defineProps({
    active: {
      default: true,
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  });

  onMounted(async () => {
    await import('aframe');
    await import('mind-ar/dist/mindar-image-aframe.prod.js');
    loading.value = false;
  });
</script>

<template>
  <main class="relative h-svh w-svw" v-if="!loading" :class="props.active ? 'z-[-1]' : 'z-[-2]'">
    <div class="ar-wrapper">
      <a-scene
        mindar-image="imageTargetSrc: /marker.mind;uiScanning:no;uiLoading:no;"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
        <a-entity mindar-image-target="targetIndex: 0">
          <a-image position="0 0.5 0" :src="props.data.image" width="1.2" height="0.7"></a-image>
          <a-text position="-0.5 -0.1 0" :value="props.data.name"></a-text>
          <a-gltf-model position="0 -1 0" :src="`/data/${props.data.model}`" scale="0.2 0.2 0.2"></a-gltf-model>
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
