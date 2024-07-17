<template>
  <div class="test-wrwap">
    <a-scene
      mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.mind; "
      device-orientation-permission-ui="enabled: false"
    >
      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
      <a-entity mindar-image-target="targetIndex: 0">
        <a-plane
          color="blue"
          opaciy="0.5"
          position="0 0 0"
          height="0.552"
          width="1"
          rotation="0 0 0"
        ></a-plane>
      </a-entity>
    </a-scene>
  </div>
</template>

<style>
/* .test-wrwap video {
  @apply !left-0 !top-0 !h-screen !w-screen bg-red-500 !object-cover;
} */
</style>
