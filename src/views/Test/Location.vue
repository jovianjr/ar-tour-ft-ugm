<script setup>
  import { ref, onMounted } from 'vue';
  import * as turf from '@turf/turf';

  // data
  const data = [
    { name: 'tugu', latitude: -7.765935828923877, longitude: 110.37377191687918 },
    { name: 'sglc', latitude: -7.7654626108352165, longitude: 110.37275629977373 },
    { name: 'sglc2', latitude: -7.765502791644229, longitude: 110.37258355347022 },
    { name: 'perpus', latitude: -7.765809524487331, longitude: 110.37257007483703 },
    { name: 'tamanteti', latitude: -7.7655987483565125, longitude: 110.37153026230358 },
    { name: 'tamansipil', latitude: -7.76436627403477, longitude: 110.37257972122276 }
  ];
  const currentDataIdx = ref(0);

  // location
  const gpsSupport = ref(null);
  const gpsResult = ref(null);
  const gpsCurrent = ref([]);
  const gpsDistance = ref(0);

  // maps
  const map = ref(null);
  const marker = ref(null);
  const circle = ref(null);

  const setupGps = () => {
    const gpsNotGranted = () => {
      gpsSupport.value = false;
    };

    if (navigator.geolocation) {
      gpsSupport.value = true;
      navigator.geolocation.watchPosition(
        (val) => {
          checkGps({
            latitude: val.coords.latitude,
            longitude: val.coords.longitude
          });
        },
        gpsNotGranted,
        {
          enableHighAccuracy: true
        }
      );
    } else gpsNotGranted;
  };

  // check use based on scenario
  const checkGps = ({ latitude, longitude }) => {
    const currentData = data[currentDataIdx.value];
    const point = turf.point([longitude, latitude]);
    let center = [currentData.longitude, currentData.latitude];

    const radius = 15;
    const turfCircle = turf.circle(center, radius, { units: 'meters' });
    const result = turf.pointsWithinPolygon(point, turfCircle);
    if (result.features.length > 0) {
      gpsResult.value = true;
    }

    // current position
    gpsCurrent.value = [longitude, latitude];
    map.value.setView([latitude, longitude]);

    if (marker.value) {
      marker.value.setLatLng([latitude, longitude]);
    } else {
      marker.value = L.marker([latitude, longitude]).addTo(map.value);
    }

    // draw circle
    gpsDistance.value = turf.distance(center, gpsCurrent.value, { units: 'meters' });
    if (circle.value) {
      circle.value.setLatLng([currentData.latitude, currentData.longitude]);
    } else {
      circle.value = L.circle([center[1], center[0]], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: radius
      }).addTo(map.value);
    }
  };

  onMounted(() => {
    setupGps();

    map.value = L.map('map').setView([-7.747949596179932, 110.47409413120432], 20);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map.value);
  });

  // change target
  const changeTarget = (item, idx) => {
    currentDataIdx.value = idx;
    map.value.setView([item.latitude, item.longitude]);
  };
</script>

<template>
  <div
    class="flex items-center justify-center text-sm text-white h-full w-full flex-col gap-4"
    :class="gpsResult ? 'bg-green-700' : 'bg-red-700'"
  >
    <div id="map" class="h-[40vh] w-[80vw] bg-gray-100 rounded-lg"></div>
    <div>{{ gpsCurrent[0] }}, {{ gpsCurrent[1] }}</div>
    <div class="flex items-center gap-4">
      Distance:
      <span class="font-semibold text-xl">{{ gpsDistance.toFixed(4) }}m</span>
    </div>
    <div class="grid grid-cols-2 gap-x-4 gap-y-2">
      <button
        class="rounded px-4 py-1 border border-white text-white"
        v-for="(item, idx) in data"
        :class="item.name === data[currentDataIdx].name ? '!bg-blue-500 !text-white !border-white' : ''"
        @click="changeTarget(item, idx)"
      >
        {{ item.name }}
      </button>
    </div>
  </div>
</template>
