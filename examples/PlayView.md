<script setup>
// Library
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";
import * as turf from "@turf/turf";
import { ref, onMounted } from "vue";
// Component
import AudioPlayer from "../components/AudioPlayer.vue";
import Compass from "../components/Compass.vue";

import dataDepartment from "../data/ft-ugm";

const gpsSupport = ref(null);
const currentDepartment = ref(dataDepartment[0]);

onMounted(() => {
  setupGps();
});

const setupGps = () => {
  if (navigator.geolocation) {
    gpsSupport.value = true;
    navigator.geolocation.watchPosition((val) => {
      // // Check If you inside polygon
      // checkGps({
      //   latitude: val.coords.latitude,
      //   longitude: val.coords.longitude,
      // });
    });
  } else {
    gpsSupport.value = false;
  }
};

const checkGps = ({ latitude, longitude }) => {
  const point = turf.point([latitude, longitude]);

  let findDepartment = null;
  for (const department of dataDepartment) {
    const area = turf.polygon([department.coordinates]);
    const result = turf.pointsWithinPolygon(point, area);
    if (result.features.length > 0) {
      findDepartment = department;
      break;
    }
  }
  currentDepartment.value = findDepartment;
};

const changeDepartment = () => {
  currentDepartment.value = dataDepartment[Math.floor(Math.random() * 9)];
};
</script>

<template>
  <div
    v-if="gpsSupport == true"
    class="relative h-[100svh] w-[100svw] bg-gray-600"
  >
    <!-- Title -->
    <div
      class="absolute left-1/2 top-0 flex w-full -translate-x-1/2 flex-col items-center gap-2 bg-gradient-to-b from-black/40 via-black/10 pb-4"
    >
      <Compass />
      <button @click="changeDepartment" class="text-xs text-red-500">
        Change Department
      </button>
      <!-- <h1
        v-if="currentDepartment"
        class="w-fit rounded-full bg-slate-900 px-5 py-1 text-xs text-white"
      >
        {{ currentDepartment.name }}
      </h1> -->
    </div>

    <!-- Information -->
    <div
      v-if="currentDepartment"
      class="absolute bottom-0 left-1/2 w-full max-w-[512px] -translate-x-1/2 p-4"
    >
      <div class="flex flex-col gap-2 rounded-2xl bg-white px-4 py-3">
        <div class="flex w-full flex-col gap-2">
          <img
            :src="currentDepartment.image"
            class="aspect-video h-28 rounded-lg bg-slate-900 object-contain"
          />
          <div class="flex flex-col items-center py-2">
            <h2 class="text-sm font-semibold">
              {{ currentDepartment.name }}
            </h2>
            <p class="flex-grow text-xs">{{ currentDepartment.description }}</p>
          </div>
        </div>

        <AudioPlayer
          :key="currentDepartment.name"
          :src="`/data/${currentDepartment.audioTranscript}.mp3`"
        />
      </div>
    </div>

    <!-- Menu Bottom -->
    <!-- <div
      class="group absolute bottom-4 left-1/2 z-10 flex h-auto -translate-x-1/2 gap-4 rounded-2xl bg-slate-900 px-4 py-2 text-white"
    >
      <AcademicCapIcon
        class="h-10 w-10 cursor-pointer text-inherit transition-all hover:scale-[1.15]"
      />
      <ArchiveBoxIcon
        class="h-10 w-10 cursor-pointer text-inherit transition-all hover:scale-[1.15]"
      />
      <BanknotesIcon
        class="h-10 w-10 cursor-pointer text-inherit transition-all hover:scale-[1.15]"
      />
      <CameraIcon
        class="h-10 w-10 cursor-pointer text-inherit transition-all hover:scale-[1.15]"
      />
      <GifIcon
        class="h-10 w-10 cursor-pointer text-inherit transition-all hover:scale-[1.15]"
      />
    </div> -->

    <!-- AR Main scene -->
    <!-- <div class="ar-wrapper h-[100svh] w-[100svw]">
      <a-scene
        mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.mind; uiScanning:no"
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
    </div> -->
  </div>
  <div v-if="gpsSupport == false" class="text-red-500">
    This Browser Doesn't support GPS. Please Check Your Permission or Change
    Your Browser
  </div>
</template>

<style>
.ar-wrapper video {
  @apply !left-0 !top-0 !aspect-auto !h-full !w-full !object-cover;
}
</style>
