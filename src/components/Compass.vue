<script setup>
  import { ref, onMounted } from 'vue';

  const compassVal = ref('0px');

  onMounted(() => {
    startCompass();
  });

  const startCompass = () => {
    const isIOS = navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/);
    if (isIOS) {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', compassHandler, true);
          } else {
            alert('has to be allowed!');
          }
        })
        .catch(() => {});
    } else {
      window.addEventListener('deviceorientationabsolute', compassHandler, true);
    }
  };

  const compassHandler = (e) => {
    const compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    const compassPercent = (compass / 360) * 100;
    compassVal.value = `${0 - compassPercent * 6.7}px`;
  };
</script>

<template>
  <div class="compass relative h-6 w-[50svw] overflow-hidden rounded-full text-white">
    <div class="points">
      <div class="point">NW</div>
      <div class="point">330</div>
      <div class="point">345</div>
      <div class="point">N</div>
      <div class="point">15</div>
      <div class="point">30</div>
      <div class="point">NE</div>
      <div class="point">60</div>
      <div class="point">75</div>
      <div class="point">E</div>
      <div class="point">105</div>
      <div class="point">120</div>
      <div class="point">SE</div>
      <div class="point">150</div>
      <div class="point">165</div>
      <div class="point">S</div>
      <div class="point">195</div>
      <div class="point">210</div>
      <div class="point">SW</div>
      <div class="point">240</div>
      <div class="point">255</div>
      <div class="point">W</div>
      <div class="point">285</div>
      <div class="point">300</div>
      <div class="point">NW</div>
      <div class="point">330</div>
      <div class="point">345</div>
      <div class="point">N</div>
      <div class="point">15</div>
      <div class="point">30</div>
      <div class="point">NE</div>
      <div class="point">60</div>
      <div class="point">75</div>
      <div class="point">E</div>
      <div class="point">105</div>
      <div class="point">120</div>
      <div class="point">SE</div>
      <div class="point">150</div>
      <div class="point">165</div>
      <div class="point">S</div>
    </div>
  </div>
</template>

<style>
  .points {
    @apply absolute top-0 flex h-full w-full gap-1;
    left: v-bind(compassVal);
  }

  .point {
    @apply relative flex h-full w-6 flex-shrink-0 items-end justify-center text-xs;
  }

  .point::before {
    @apply absolute left-1/2 top-0 z-[100] h-1.5 w-[1px] -translate-x-1/2 bg-white content-[''];
  }
</style>
